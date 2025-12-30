/**
 * StoryEngine Unit Tests
 * Tests story progression, choice handling, and state management
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { StoryEngine } from "./StoryEngine";
import {
  createStoryState,
  applyPathShift,
  getDominantPath,
  type StoryState,
  type Chapter,
  type Scene,
  type Choice,
} from "../../types/story";

// =============================================================================
// TEST FIXTURES
// =============================================================================

function createMockChapter(overrides: Partial<Chapter> = {}): Chapter {
  return {
    id: "test-chapter",
    number: 1,
    title: "Test Chapter",
    scenes: [
      createMockScene({ id: "scene-1", nextScene: "scene-2" }),
      createMockScene({ id: "scene-2", nextScene: "scene-3" }),
      createMockScene({ id: "scene-3" }),
    ],
    startScene: "scene-1",
    endScenes: ["scene-3"],
    ...overrides,
  };
}

function createMockScene(overrides: Partial<Scene> = {}): Scene {
  return {
    id: "test-scene",
    title: "Test Scene",
    type: "interactive",
    content: [
      {
        type: "content",
        lines: [{ type: "narration", text: "Test narration." }],
      },
    ],
    ...overrides,
  };
}

function createMockChoice(overrides: Partial<Choice> = {}): Choice {
  return {
    id: "choice-1",
    label: "Test Choice",
    ...overrides,
  };
}

// =============================================================================
// STORY STATE HELPER TESTS (from story.ts)
// =============================================================================

describe("createStoryState", () => {
  it("should create initial state with default values", () => {
    const state = createStoryState();

    expect(state.currentChapter).toBe("prologue");
    expect(state.currentScene).toBe("p1-void");
    expect(state.contentIndex).toBe(0);
    expect(state.flags).toEqual({});
    expect(state.relationships).toEqual({});
    expect(state.completedScenes).toEqual([]);
  });

  it("should initialize path percentages to ~33% each", () => {
    const state = createStoryState();
    const total =
      state.pathPercentages.blade +
      state.pathPercentages.stream +
      state.pathPercentages.shadow;

    expect(total).toBeCloseTo(100, 1);
    expect(state.pathPercentages.blade).toBeCloseTo(33.33, 1);
    expect(state.pathPercentages.stream).toBeCloseTo(33.33, 1);
    expect(state.pathPercentages.shadow).toBeCloseTo(33.34, 1);
  });
});

describe("applyPathShift", () => {
  it("should increase target path and decrease others", () => {
    const initial = { blade: 33.33, stream: 33.33, shadow: 33.34 };
    const result = applyPathShift(initial, "blade", 10);

    expect(result.blade).toBeGreaterThan(initial.blade);
    expect(result.stream).toBeLessThan(initial.stream);
    expect(result.shadow).toBeLessThan(initial.shadow);
  });

  it("should maintain total of 100%", () => {
    const initial = { blade: 33.33, stream: 33.33, shadow: 33.34 };
    const result = applyPathShift(initial, "blade", 10);

    const total = result.blade + result.stream + result.shadow;
    expect(total).toBeCloseTo(100, 1);
  });

  it("should not exceed 100% for any path", () => {
    const initial = { blade: 90, stream: 5, shadow: 5 };
    const result = applyPathShift(initial, "blade", 20);

    expect(result.blade).toBeLessThanOrEqual(100);
  });

  it("should not go below 0% for any path", () => {
    const initial = { blade: 90, stream: 5, shadow: 5 };
    const result = applyPathShift(initial, "blade", 20);

    expect(result.stream).toBeGreaterThanOrEqual(0);
    expect(result.shadow).toBeGreaterThanOrEqual(0);
  });

  it("should handle negative shifts (decreasing a path)", () => {
    const initial = { blade: 50, stream: 25, shadow: 25 };
    const result = applyPathShift(initial, "blade", -10);

    expect(result.blade).toBeLessThan(initial.blade);
  });
});

describe("getDominantPath", () => {
  it("should return 'blade' when blade is highest", () => {
    expect(getDominantPath({ blade: 50, stream: 25, shadow: 25 })).toBe(
      "blade",
    );
  });

  it("should return 'stream' when stream is highest", () => {
    expect(getDominantPath({ blade: 25, stream: 50, shadow: 25 })).toBe(
      "stream",
    );
  });

  it("should return 'shadow' when shadow is highest", () => {
    expect(getDominantPath({ blade: 25, stream: 25, shadow: 50 })).toBe(
      "shadow",
    );
  });

  it("should return 'balanced' when paths are within 5% of each other", () => {
    expect(getDominantPath({ blade: 34, stream: 33, shadow: 33 })).toBe(
      "balanced",
    );
    expect(
      getDominantPath({ blade: 33.33, stream: 33.33, shadow: 33.34 }),
    ).toBe("balanced");
  });

  it("should not return 'balanced' when difference exceeds 5%", () => {
    expect(getDominantPath({ blade: 40, stream: 30, shadow: 30 })).toBe(
      "blade",
    );
  });
});

// =============================================================================
// STORY ENGINE CLASS TESTS
// =============================================================================

describe("StoryEngine", () => {
  let engine: StoryEngine;

  beforeEach(() => {
    engine = new StoryEngine();
  });

  describe("chapter registration", () => {
    it("should register a chapter", () => {
      const chapter = createMockChapter();
      engine.registerChapter(chapter);

      expect(engine.getChapter("test-chapter")).toBe(chapter);
    });

    it("should validate chapter scene references", () => {
      const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      const badChapter = createMockChapter({
        startScene: "non-existent",
        endScenes: ["also-non-existent"],
      });
      engine.registerChapter(badChapter);

      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe("scene retrieval", () => {
    it("should find scene by ID", () => {
      const chapter = createMockChapter();
      engine.registerChapter(chapter);

      const scene = engine.getScene("scene-1");
      expect(scene?.id).toBe("scene-1");
    });

    it("should return undefined for unknown scene", () => {
      const chapter = createMockChapter();
      engine.registerChapter(chapter);

      expect(engine.getScene("unknown")).toBeUndefined();
    });
  });

  describe("state management", () => {
    it("should return state copy", () => {
      const state1 = engine.getState();
      const state2 = engine.getState();

      // Should be equal but not same reference
      expect(state1).toEqual(state2);
      expect(state1).not.toBe(state2);
    });

    it("should allow setting state", () => {
      const newState: StoryState = {
        ...createStoryState(),
        currentScene: "custom-scene",
      };
      engine.setState(newState);

      expect(engine.getState().currentScene).toBe("custom-scene");
    });
  });

  describe("flags", () => {
    it("should set and get flags", () => {
      engine.setFlag("test-flag", true);
      expect(engine.getFlag("test-flag")).toBe(true);

      engine.setFlag("numeric-flag", 42);
      expect(engine.getFlag("numeric-flag")).toBe(42);

      engine.setFlag("string-flag", "value");
      expect(engine.getFlag("string-flag")).toBe("value");
    });

    it("should return undefined for unset flags", () => {
      expect(engine.getFlag("non-existent")).toBeUndefined();
    });
  });

  describe("relationships", () => {
    it("should return 0 for unknown relationships", () => {
      expect(engine.getRelationship("unknown-character")).toBe(0);
    });
  });

  describe("scene completion tracking", () => {
    it("should track completed scenes", () => {
      expect(engine.hasCompletedScene("test-scene")).toBe(false);

      // Manually mark completed (normally done by story progression)
      const state = engine.getState();
      state.completedScenes.push("test-scene");
      engine.setState(state);

      expect(engine.hasCompletedScene("test-scene")).toBe(true);
    });
  });

  describe("dominant path", () => {
    it("should calculate dominant path from state", () => {
      // Blade-dominant
      const bladeState: StoryState = {
        ...createStoryState(),
        pathPercentages: { blade: 50, stream: 25, shadow: 25 },
      };
      engine.setState(bladeState);
      expect(engine.getDominantPath()).toBe("blade");

      // Stream-dominant
      const streamState: StoryState = {
        ...createStoryState(),
        pathPercentages: { blade: 25, stream: 50, shadow: 25 },
      };
      engine.setState(streamState);
      expect(engine.getDominantPath()).toBe("stream");

      // Shadow-dominant
      const shadowState: StoryState = {
        ...createStoryState(),
        pathPercentages: { blade: 25, stream: 25, shadow: 50 },
      };
      engine.setState(shadowState);
      expect(engine.getDominantPath()).toBe("shadow");
    });

    it("should return 'balanced' when all paths are exactly equal", () => {
      // StoryEngine.getDominantPath() only returns 'balanced' when exactly equal
      const balancedState: StoryState = {
        ...createStoryState(),
        pathPercentages: { blade: 33.33, stream: 33.33, shadow: 33.34 },
      };
      engine.setState(balancedState);
      // Note: This returns 'shadow' because shadow (33.34) is highest
      // The StoryEngine's implementation only returns 'balanced' if all are exactly equal
      expect(engine.getDominantPath()).toBe("shadow");

      // Truly balanced
      const trulyBalanced: StoryState = {
        ...createStoryState(),
        pathPercentages: { blade: 33, stream: 33, shadow: 33 },
      };
      engine.setState(trulyBalanced);
      expect(engine.getDominantPath()).toBe("balanced");
    });
  });
});

// =============================================================================
// STORY PROGRESSION TESTS
// =============================================================================

describe("Story Progression", () => {
  let engine: StoryEngine;

  beforeEach(() => {
    engine = new StoryEngine();
  });

  describe("jumpToScene", () => {
    it("should jump to specified scene", () => {
      const chapter = createMockChapter();
      engine.registerChapter(chapter);

      const result = engine.jumpToScene("scene-2");

      expect(engine.getState().currentScene).toBe("scene-2");
      expect(result.state.currentScene).toBe("scene-2");
    });

    it("should throw for unknown scene", () => {
      const chapter = createMockChapter();
      engine.registerChapter(chapter);

      expect(() => engine.jumpToScene("unknown")).toThrow("Scene not found");
    });

    it("should reset content index to 0", () => {
      const chapter = createMockChapter();
      engine.registerChapter(chapter);

      // Set content index to something other than 0
      const state = engine.getState();
      state.contentIndex = 5;
      engine.setState(state);

      engine.jumpToScene("scene-1");

      expect(engine.getState().contentIndex).toBe(0);
    });
  });

  describe("advance", () => {
    it("should increment content index", () => {
      const chapter = createMockChapter({
        scenes: [
          createMockScene({
            id: "scene-1",
            content: [
              {
                type: "content",
                lines: [{ type: "narration", text: "Line 1" }],
              },
              {
                type: "content",
                lines: [{ type: "narration", text: "Line 2" }],
              },
            ],
            nextScene: "scene-2",
          }),
          createMockScene({ id: "scene-2" }),
        ],
        startScene: "scene-1",
        endScenes: ["scene-2"],
      });
      engine.registerChapter(chapter);
      engine.jumpToScene("scene-1");

      const initialIndex = engine.getState().contentIndex;
      engine.advance();

      expect(engine.getState().contentIndex).toBe(initialIndex + 1);
    });
  });

  describe("makeChoice", () => {
    it("should record choice in history", () => {
      const chapter = createMockChapter({
        scenes: [
          createMockScene({
            id: "choice-scene",
            content: [
              {
                type: "choice",
                choices: [
                  createMockChoice({ id: "option-a", label: "Option A" }),
                  createMockChoice({ id: "option-b", label: "Option B" }),
                ],
              },
              {
                type: "content",
                lines: [{ type: "narration", text: "After choice" }],
              },
            ],
            nextScene: "scene-2",
          }),
          createMockScene({ id: "scene-2" }),
        ],
        startScene: "choice-scene",
        endScenes: ["scene-2"],
      });
      engine.registerChapter(chapter);
      engine.jumpToScene("choice-scene");

      engine.makeChoice("option-a");

      const history = engine.getState().choiceHistory;
      expect(history).toContainEqual({
        sceneId: "choice-scene",
        choiceId: "option-a",
      });
    });

    it("should apply choice effects", () => {
      const chapter = createMockChapter({
        scenes: [
          createMockScene({
            id: "choice-scene",
            content: [
              {
                type: "choice",
                choices: [
                  createMockChoice({
                    id: "blade-choice",
                    label: "Attack!",
                    effects: [{ type: "path", path: "blade", delta: 5 }],
                  }),
                ],
              },
              {
                type: "content",
                lines: [{ type: "narration", text: "After choice" }],
              },
            ],
            nextScene: "scene-2",
          }),
          createMockScene({ id: "scene-2" }),
        ],
        startScene: "choice-scene",
        endScenes: ["scene-2"],
      });
      engine.registerChapter(chapter);
      engine.jumpToScene("choice-scene");

      const initialBlade = engine.getState().pathPercentages.blade;
      engine.makeChoice("blade-choice");

      expect(engine.getState().pathPercentages.blade).toBeGreaterThan(
        initialBlade,
      );
    });

    it("should apply relationship effects", () => {
      const chapter = createMockChapter({
        scenes: [
          createMockScene({
            id: "choice-scene",
            content: [
              {
                type: "choice",
                choices: [
                  createMockChoice({
                    id: "friendly",
                    label: "Help them",
                    effects: [
                      {
                        type: "relationship",
                        character: "elder-chen",
                        delta: 10,
                      },
                    ],
                  }),
                ],
              },
              {
                type: "content",
                lines: [{ type: "narration", text: "After" }],
              },
            ],
            nextScene: "scene-2",
          }),
          createMockScene({ id: "scene-2" }),
        ],
        startScene: "choice-scene",
        endScenes: ["scene-2"],
      });
      engine.registerChapter(chapter);
      engine.jumpToScene("choice-scene");

      engine.makeChoice("friendly");

      expect(engine.getRelationship("elder-chen")).toBe(10);
    });

    it("should apply flag effects", () => {
      const chapter = createMockChapter({
        scenes: [
          createMockScene({
            id: "choice-scene",
            content: [
              {
                type: "choice",
                choices: [
                  createMockChoice({
                    id: "secret",
                    label: "Find secret",
                    effects: [
                      { type: "flag", flag: "found-secret", value: true },
                    ],
                  }),
                ],
              },
              {
                type: "content",
                lines: [{ type: "narration", text: "After" }],
              },
            ],
            nextScene: "scene-2",
          }),
          createMockScene({ id: "scene-2" }),
        ],
        startScene: "choice-scene",
        endScenes: ["scene-2"],
      });
      engine.registerChapter(chapter);
      engine.jumpToScene("choice-scene");

      engine.makeChoice("secret");

      expect(engine.getFlag("found-secret")).toBe(true);
    });

    it("should apply item effects", () => {
      const chapter = createMockChapter({
        scenes: [
          createMockScene({
            id: "choice-scene",
            content: [
              {
                type: "choice",
                choices: [
                  createMockChoice({
                    id: "loot",
                    label: "Take item",
                    effects: [
                      { type: "item", action: "add", itemId: "pendant" },
                    ],
                  }),
                ],
              },
              {
                type: "content",
                lines: [{ type: "narration", text: "After" }],
              },
            ],
            nextScene: "scene-2",
          }),
          createMockScene({ id: "scene-2" }),
        ],
        startScene: "choice-scene",
        endScenes: ["scene-2"],
      });
      engine.registerChapter(chapter);
      engine.jumpToScene("choice-scene");

      engine.makeChoice("loot");

      expect(engine.getState().discoveredItems).toContain("pendant");
    });

    it("should throw when not at choice block", () => {
      const chapter = createMockChapter();
      engine.registerChapter(chapter);
      engine.jumpToScene("scene-1"); // Content block, not choice

      expect(() => engine.makeChoice("any")).toThrow("Not at a choice block");
    });

    it("should throw for unknown choice ID", () => {
      const chapter = createMockChapter({
        scenes: [
          createMockScene({
            id: "choice-scene",
            content: [
              {
                type: "choice",
                choices: [createMockChoice({ id: "valid-choice" })],
              },
            ],
          }),
        ],
        startScene: "choice-scene",
        endScenes: ["choice-scene"],
      });
      engine.registerChapter(chapter);
      engine.jumpToScene("choice-scene");

      expect(() => engine.makeChoice("invalid-choice")).toThrow(
        "Choice not found",
      );
    });
  });

  describe("completeCombat", () => {
    it("should advance past combat block on victory", () => {
      const chapter = createMockChapter({
        scenes: [
          createMockScene({
            id: "combat-scene",
            content: [
              { type: "combat", enemies: ["thug-1"], canLose: true },
              {
                type: "content",
                lines: [{ type: "narration", text: "Victory!" }],
              },
            ],
            nextScene: "scene-2",
          }),
          createMockScene({ id: "scene-2" }),
        ],
        startScene: "combat-scene",
        endScenes: ["scene-2"],
      });
      engine.registerChapter(chapter);
      engine.jumpToScene("combat-scene");

      const initialIndex = engine.getState().contentIndex;
      engine.completeCombat(true);

      expect(engine.getState().contentIndex).toBe(initialIndex + 1);
    });

    it("should jump to lose scene on defeat", () => {
      const chapter = createMockChapter({
        scenes: [
          createMockScene({
            id: "combat-scene",
            content: [
              {
                type: "combat",
                enemies: ["boss"],
                canLose: true,
                loseScene: "defeat-scene",
              },
            ],
          }),
          createMockScene({ id: "defeat-scene" }),
        ],
        startScene: "combat-scene",
        endScenes: ["defeat-scene"],
      });
      engine.registerChapter(chapter);
      engine.jumpToScene("combat-scene");

      engine.completeCombat(false);

      expect(engine.getState().currentScene).toBe("defeat-scene");
    });
  });
});

// =============================================================================
// CHOICE CONDITION TESTS
// =============================================================================

describe("Choice Conditions", () => {
  let engine: StoryEngine;

  beforeEach(() => {
    engine = new StoryEngine();
  });

  it("should filter choices by flag condition", () => {
    const chapter = createMockChapter({
      scenes: [
        createMockScene({
          id: "conditional-scene",
          content: [
            {
              type: "choice",
              choices: [
                createMockChoice({
                  id: "always-available",
                  label: "Always",
                }),
                createMockChoice({
                  id: "requires-flag",
                  label: "Secret",
                  condition: {
                    type: "flag",
                    flag: "knows-secret",
                    value: true,
                  },
                }),
              ],
            },
          ],
        }),
      ],
      startScene: "conditional-scene",
      endScenes: ["conditional-scene"],
    });
    engine.registerChapter(chapter);
    engine.jumpToScene("conditional-scene");

    // Without flag set
    let result = engine.jumpToScene("conditional-scene");
    expect(result.choices?.length).toBe(1);
    expect(result.choices?.[0]?.id).toBe("always-available");

    // With flag set
    engine.setFlag("knows-secret", true);
    result = engine.jumpToScene("conditional-scene");
    expect(result.choices?.length).toBe(2);
  });

  it("should filter choices by relationship condition", () => {
    const chapter = createMockChapter({
      scenes: [
        createMockScene({
          id: "relationship-scene",
          content: [
            {
              type: "choice",
              choices: [
                createMockChoice({ id: "normal" }),
                createMockChoice({
                  id: "friendly",
                  condition: {
                    type: "relationship",
                    character: "mentor",
                    min: 10,
                  },
                }),
              ],
            },
          ],
        }),
      ],
      startScene: "relationship-scene",
      endScenes: ["relationship-scene"],
    });
    engine.registerChapter(chapter);

    // Without relationship
    let result = engine.jumpToScene("relationship-scene");
    expect(result.choices?.length).toBe(1);

    // With relationship
    const state = engine.getState();
    state.relationships["mentor"] = 15;
    engine.setState(state);
    result = engine.jumpToScene("relationship-scene");
    expect(result.choices?.length).toBe(2);
  });

  it("should filter choices by path condition", () => {
    const chapter = createMockChapter({
      scenes: [
        createMockScene({
          id: "path-scene",
          content: [
            {
              type: "choice",
              choices: [
                createMockChoice({ id: "normal" }),
                createMockChoice({
                  id: "blade-option",
                  condition: { type: "path", path: "blade", min: 40 },
                }),
              ],
            },
          ],
        }),
      ],
      startScene: "path-scene",
      endScenes: ["path-scene"],
    });
    engine.registerChapter(chapter);

    // With balanced paths (~33% each)
    let result = engine.jumpToScene("path-scene");
    expect(result.choices?.length).toBe(1);

    // With blade >= 40%
    const state = engine.getState();
    state.pathPercentages = { blade: 45, stream: 30, shadow: 25 };
    engine.setState(state);
    result = engine.jumpToScene("path-scene");
    expect(result.choices?.length).toBe(2);
  });

  it("should filter choices by item condition", () => {
    const chapter = createMockChapter({
      scenes: [
        createMockScene({
          id: "item-scene",
          content: [
            {
              type: "choice",
              choices: [
                createMockChoice({ id: "normal" }),
                createMockChoice({
                  id: "use-key",
                  condition: { type: "item", itemId: "gold-key", has: true },
                }),
              ],
            },
          ],
        }),
      ],
      startScene: "item-scene",
      endScenes: ["item-scene"],
    });
    engine.registerChapter(chapter);

    // Without item
    let result = engine.jumpToScene("item-scene");
    expect(result.choices?.length).toBe(1);

    // With item
    const state = engine.getState();
    state.discoveredItems.push("gold-key");
    engine.setState(state);
    result = engine.jumpToScene("item-scene");
    expect(result.choices?.length).toBe(2);
  });
});

// =============================================================================
// CHAPTER VALIDATION TESTS
// =============================================================================

describe("Chapter Validation", () => {
  let engine: StoryEngine;
  let consoleSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    engine = new StoryEngine();
    consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it("should warn about missing startScene", () => {
    const badChapter = createMockChapter({
      startScene: "non-existent-start",
    });
    engine.registerChapter(badChapter);

    expect(consoleSpy).toHaveBeenCalled();
    const warnCall = consoleSpy.mock.calls.find((call: unknown[]) =>
      call.some((arg: unknown) => String(arg).includes("startScene")),
    );
    expect(warnCall).toBeDefined();
  });

  it("should warn about missing endScene", () => {
    const badChapter = createMockChapter({
      endScenes: ["non-existent-end"],
    });
    engine.registerChapter(badChapter);

    expect(consoleSpy).toHaveBeenCalled();
  });

  it("should warn about invalid nextScene references", () => {
    const badChapter: Chapter = {
      id: "bad-chapter",
      number: 1,
      title: "Bad Chapter",
      scenes: [
        createMockScene({
          id: "scene-1",
          nextScene: "non-existent-next",
        }),
      ],
      startScene: "scene-1",
      endScenes: ["scene-1"],
    };
    engine.registerChapter(badChapter);

    expect(consoleSpy).toHaveBeenCalled();
  });

  it("should warn about invalid choice nextScene references", () => {
    const badChapter: Chapter = {
      id: "bad-chapter",
      number: 1,
      title: "Bad Chapter",
      scenes: [
        createMockScene({
          id: "scene-1",
          content: [
            {
              type: "choice",
              choices: [
                createMockChoice({
                  id: "bad-choice",
                  nextScene: "non-existent-choice-target",
                }),
              ],
            },
          ],
        }),
      ],
      startScene: "scene-1",
      endScenes: ["scene-1"],
    };
    engine.registerChapter(badChapter);

    expect(consoleSpy).toHaveBeenCalled();
  });
});
