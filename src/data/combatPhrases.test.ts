/**
 * CombatPhrases Unit Tests
 * Tests message generation for combat events
 */

import { describe, it, expect, vi } from "vitest";
import {
  getAttackMessage,
  getTechniqueMessage,
  getStanceMessage,
  ATTACK_PHRASES,
  DAMAGE_PHRASES,
  TECHNIQUE_PHRASES,
  STANCE_PHRASES,
} from "./combatPhrases";

// =============================================================================
// getAttackMessage TESTS
// =============================================================================

describe("getAttackMessage", () => {
  it("should generate message containing actor and target names", () => {
    const message = getAttackMessage("Li Wei", "Thug", 15, 100, false);
    expect(message).toContain("Li Wei");
    expect(message).toContain("Thug");
  });

  it("should include damage amount in message", () => {
    const message = getAttackMessage("Li Wei", "Thug", 25, 100, false);
    expect(message).toContain("25");
  });

  it("should select from critical phrases when isCritical is true", () => {
    // Mock random to always select first phrase
    vi.spyOn(Math, "random").mockReturnValue(0);

    const message = getAttackMessage("Li Wei", "Thug", 25, 100, true);

    // Should contain text from critical phrases
    const containsCriticalPhrase = ATTACK_PHRASES.critical.some((phrase) =>
      message.includes(phrase.split("{")[0]!),
    );
    expect(containsCriticalPhrase || message.includes("opening")).toBe(true);

    vi.restoreAllMocks();
  });

  it("should use correct damage tier based on percentage", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);

    // Light damage (< 20%)
    const lightMsg = getAttackMessage("Li Wei", "Thug", 10, 100, false);
    expect(lightMsg).toContain("10");

    // Massive damage (>= 70%)
    const massiveMsg = getAttackMessage("Li Wei", "Thug", 80, 100, false);
    expect(massiveMsg).toContain("80");

    vi.restoreAllMocks();
  });

  it("should handle division by zero (targetMaxHp = 0)", () => {
    // Should not throw, should return 'light' tier
    const message = getAttackMessage("Li Wei", "Thug", 10, 0, false);
    expect(message).toContain("Li Wei");
    expect(message).toContain("Thug");
  });
});

// =============================================================================
// getTechniqueMessage TESTS
// =============================================================================

describe("getTechniqueMessage", () => {
  it("should generate message with actor and target", () => {
    const message = getTechniqueMessage(
      "Li Wei",
      "Thug",
      "Flowing Palm",
      "flowing-palm",
    );
    expect(message).toContain("Li Wei");
  });

  it("should use known technique phrases", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);

    const message = getTechniqueMessage(
      "Li Wei",
      "Thug",
      "Boulder Palm",
      "boulder-palm",
    );

    // Should contain text from boulder-palm phrases
    expect(message.toLowerCase()).toContain("boulder");

    vi.restoreAllMocks();
  });

  it("should fallback to default phrases for unknown techniques", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);

    const message = getTechniqueMessage(
      "Li Wei",
      "Thug",
      "Mystery Move",
      "unknown-technique-id",
    );

    // Should still generate a valid message
    expect(message).toContain("Li Wei");

    vi.restoreAllMocks();
  });
});

// =============================================================================
// getStanceMessage TESTS
// =============================================================================

describe("getStanceMessage", () => {
  it("should generate message with actor name", () => {
    const message = getStanceMessage("Li Wei", "Flowing Stance");
    expect(message).toContain("Li Wei");
  });

  it("should use known stance phrases", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);

    const message = getStanceMessage("Li Wei", "Flowing Stance");
    expect(message.toLowerCase()).toContain("flowing");

    vi.restoreAllMocks();
  });

  it("should handle unknown stances gracefully", () => {
    const message = getStanceMessage("Li Wei", "Unknown Stance");
    expect(message).toContain("Li Wei");
    expect(message).toContain("Unknown Stance");
  });
});

// =============================================================================
// PHRASE DATA INTEGRITY TESTS
// =============================================================================

describe("Phrase Data Integrity", () => {
  it("should have attack phrases for all categories", () => {
    expect(ATTACK_PHRASES.basic.length).toBeGreaterThan(0);
    expect(ATTACK_PHRASES.critical.length).toBeGreaterThan(0);
    expect(ATTACK_PHRASES.miss.length).toBeGreaterThan(0);
  });

  it("should have damage phrases for all tiers", () => {
    expect(DAMAGE_PHRASES.light.length).toBeGreaterThan(0);
    expect(DAMAGE_PHRASES.moderate.length).toBeGreaterThan(0);
    expect(DAMAGE_PHRASES.heavy.length).toBeGreaterThan(0);
    expect(DAMAGE_PHRASES.massive.length).toBeGreaterThan(0);
  });

  it("should have default technique phrases", () => {
    expect(TECHNIQUE_PHRASES.default).toBeDefined();
    expect(TECHNIQUE_PHRASES.default!.length).toBeGreaterThan(0);
  });

  it("should have phrases for core techniques", () => {
    expect(TECHNIQUE_PHRASES["flowing-palm"]).toBeDefined();
    expect(TECHNIQUE_PHRASES["boulder-palm"]).toBeDefined();
    expect(TECHNIQUE_PHRASES["starving-strike"]).toBeDefined();
  });

  it("should have stance phrases for all stances", () => {
    expect(STANCE_PHRASES["Flowing Stance"]).toBeDefined();
    expect(STANCE_PHRASES["Weathered Stance"]).toBeDefined();
    expect(STANCE_PHRASES["Hungry Stance"]).toBeDefined();
  });

  it("should have placeholders in phrases", () => {
    // All basic attack phrases should have {actor} and {target}
    ATTACK_PHRASES.basic.forEach((phrase) => {
      expect(phrase).toContain("{actor}");
      expect(phrase).toContain("{target}");
    });

    // All damage phrases should have {damage}
    Object.values(DAMAGE_PHRASES).forEach((phrases) => {
      phrases.forEach((phrase) => {
        expect(phrase).toContain("{damage}");
      });
    });
  });
});
