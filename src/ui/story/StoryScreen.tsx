/**
 * Story Screen
 * Main UI for story content display and interaction
 */

import React, { useState, useEffect, useCallback, useRef } from "react";
import { Box, Text, useInput } from "ink";
import { unstable_batchedUpdates } from "react-dom";
import type {
  Character,
  Enemy,
  ContentLine,
  Choice,
  StoryState,
  StoryResult,
  ExplorationArea,
} from "../../types/index";
import { StoryEngine, PROLOGUE } from "../../game/story";
import { GameStore } from "../../game/state/GameStore";
import {
  createEnemy,
  scaleEnemyForChapter,
} from "../../game/factories/CharacterFactory";

import { ContentBlock } from "./ContentRenderer";
import { ChoiceMenu } from "./ChoiceMenu";
import { ExplorationMenu } from "./ExplorationMenu";
import { StatusMenu } from "../status/StatusMenu";
import { CenteredScreen } from "../components/PolishedBox";
import { SEMANTIC_DIVIDERS } from "../theme/dividers";
import { UI_CONFIG } from "../config/constants";

// =============================================================================
// CONSTANTS
// =============================================================================

const { story: STORY_CONFIG } = UI_CONFIG;

// =============================================================================
// TYPES
// =============================================================================

type StoryPhase =
  | "content" // Displaying content, waiting for space
  | "choice" // Player choosing from options
  | "exploration" // Player exploring an area
  | "combat" // Transitioning to combat
  | "chapter-end" // Chapter completed
  | "game-end"; // Story completed

interface StoryScreenProps {
  player: Character;
  onCombatStart: (enemies: Enemy[], canLose: boolean) => void;
  onGameEnd: (state: StoryState) => void;
  onQuitToMenu?: () => void;
  combatResult?: "victory" | "defeat" | "fled" | null;
  onCombatResultHandled?: () => void;
}

// =============================================================================
// STORY SCREEN
// =============================================================================

export const StoryScreen: React.FC<StoryScreenProps> = ({
  player,
  onCombatStart,
  onGameEnd,
  onQuitToMenu,
  combatResult,
  onCombatResultHandled,
}) => {
  // Story engine
  const engineRef = useRef<StoryEngine | null>(null);

  // State
  const [phase, _setPhase] = useState<StoryPhase>("content");
  const [content, _setContent] = useState<ContentLine[]>([]);
  const [contentIndex, _setContentIndex] = useState(0);
  const [choices, setChoices] = useState<Choice[]>([]);
  const [choicePrompt, setChoicePrompt] = useState<string>("");
  const [areas, setAreas] = useState<ExplorationArea[]>([]);
  const [sceneTitle, setSceneTitle] = useState("");
  const [location, setLocation] = useState("");
  const [isPaused, _setIsPaused] = useState(false);
  const [sceneProgress, setSceneProgress] = useState({ current: 1, total: 7 });
  const [isTyping, _setIsTyping] = useState(true);
  const [typewriterComplete, _setTypewriterComplete] = useState(false);
  const [showStatusMenu, setShowStatusMenu] = useState(false);

  // Refs for input handling (avoid stale closures)
  const phaseRef = useRef(phase);
  const contentRef = useRef(content);
  const contentIndexRef = useRef(contentIndex);
  const isPausedRef = useRef(isPaused);
  const pauseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoAdvanceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const isTypingRef = useRef(isTyping);
  const typewriterCompleteRef = useRef(typewriterComplete);

  // Sync state setters - update ref immediately, then state
  const setPhase = useCallback((value: StoryPhase) => {
    phaseRef.current = value;
    _setPhase(value);
  }, []);

  const setContent = useCallback((value: ContentLine[]) => {
    contentRef.current = value;
    _setContent(value);
  }, []);

  const setContentIndex = useCallback(
    (value: number | ((prev: number) => number)) => {
      if (typeof value === "function") {
        const newValue = value(contentIndexRef.current);
        contentIndexRef.current = newValue;
        _setContentIndex(newValue);
      } else {
        contentIndexRef.current = value;
        _setContentIndex(value);
      }
    },
    [],
  );

  const setIsPaused = useCallback((value: boolean) => {
    isPausedRef.current = value;
    _setIsPaused(value);
  }, []);

  const setIsTyping = useCallback((value: boolean) => {
    isTypingRef.current = value;
    _setIsTyping(value);
  }, []);

  const setTypewriterComplete = useCallback((value: boolean) => {
    typewriterCompleteRef.current = value;
    _setTypewriterComplete(value);
  }, []);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
      if (autoAdvanceTimeoutRef.current) {
        clearTimeout(autoAdvanceTimeoutRef.current);
      }
    };
  }, []);

  // Initialize story engine
  useEffect(() => {
    const engine = new StoryEngine((newState) => {
      // Sync state changes to GameStore
      GameStore.setStoryState(newState);
    });
    engine.registerChapter(PROLOGUE);
    engineRef.current = engine;

    // Check for saved story state
    const savedState = GameStore.getStoryState();
    if (savedState) {
      // Restore from saved state
      engine.setState(savedState);

      // If returning from combat, complete it properly
      if (combatResult) {
        try {
          const result = engine.completeCombat(combatResult === "victory");
          handleResult(result);
        } catch (e) {
          // If not at a combat block (e.g., save state mismatch), just advance normally
          if (process.env.NODE_ENV !== "production") {
            console.warn("Could not complete combat, advancing story:", e);
          }
          const result = engine.advance();
          handleResult(result);
        }
        onCombatResultHandled?.();
      } else {
        const result = engine.advance();
        handleResult(result);
      }
    } else {
      // Start fresh
      const result = engine.startStory();
      handleResult(result);
    }
  }, []);

  // Forward declaration for handleResult (defined below)
  // This allows handlePauseAndAdvance to call it
  const handleResultRef = useRef<((result: StoryResult) => void) | null>(null);

  // Helper: Handle pause and advance to next content
  // Centralizes pause logic to avoid duplication across 4+ locations
  const handlePauseAndAdvance = useCallback(
    (pauseLine: ContentLine, nextIndex: number) => {
      // Extract duration - only pause type has duration property
      const duration =
        pauseLine.type === "pause"
          ? pauseLine.duration
          : STORY_CONFIG.defaultPauseDuration;

      setIsPaused(true);
      pauseTimeoutRef.current = setTimeout(() => {
        pauseTimeoutRef.current = null;
        setIsPaused(false);

        // Advance past the pause
        const lines = contentRef.current;
        if (nextIndex + 1 < lines.length) {
          setContentIndex(nextIndex + 1);
          setIsTyping(true);
          setTypewriterComplete(false);
        } else {
          const result = engineRef.current?.advance();
          if (result && handleResultRef.current) {
            handleResultRef.current(result);
          }
        }
      }, duration);
    },
    [setIsPaused, setContentIndex, setIsTyping, setTypewriterComplete],
  );

  // Handle story result
  const handleResult = useCallback(
    (result: StoryResult) => {
      // Batch all state updates to prevent intermediate renders
      unstable_batchedUpdates(() => {
        const engine = engineRef.current;
        const scene = engine?.getScene(result.state.currentScene);
        if (scene) {
          setSceneTitle(scene.title);
          setLocation(scene.location || "");

          // Update scene progress
          const chapter = engine?.getChapter(result.state.currentChapter);
          if (chapter) {
            const sceneIndex = chapter.scenes.findIndex(
              (s) => s.id === scene.id,
            );
            setSceneProgress({
              current: sceneIndex + 1,
              total: chapter.scenes.length,
            });
          }
        }

        switch (result.action) {
          case "continue":
            setPhase("content");
            setContent(result.content || []);
            setContentIndex(0);
            setIsTyping(true);
            setTypewriterComplete(false);
            break;

          case "choice":
            setPhase("choice");
            setContent(result.content || []);
            setContentIndex((result.content?.length || 1) - 1);
            setChoices(result.choices || []);
            setChoicePrompt("");
            // Auto-save before important choices
            GameStore.autoSave();
            break;

          case "exploration":
            setPhase("exploration");
            setAreas(result.areas || []);
            break;

          case "combat":
            setPhase("combat");
            // Auto-save before combat
            GameStore.autoSave();
            // Create enemy instances with chapter scaling
            const currentChapter = GameStore.getState().storyProgress.chapter;
            const enemies = (result.enemies || []).map((id) => {
              const enemy = createEnemy(id);
              scaleEnemyForChapter(enemy, currentChapter);
              return enemy;
            });
            onCombatStart(enemies, result.canLose !== false);
            break;

          case "chapter-end":
            setPhase("chapter-end");
            setContent([
              { type: "system", text: "Chapter Complete" },
              {
                type: "instruction",
                text: "Press [SPACE] to continue to the next chapter",
              },
            ]);
            setContentIndex(1);
            // Auto-save at chapter end
            GameStore.autoSave();
            break;

          case "game-end":
            setPhase("game-end");
            // Final auto-save
            GameStore.autoSave();
            onGameEnd(result.state);
            break;
        }
      });
    },
    [onCombatStart, onGameEnd],
  );

  // Update handleResultRef whenever handleResult changes
  useEffect(() => {
    handleResultRef.current = handleResult;
  }, [handleResult]);

  // Handle content advancement
  const advanceContent = useCallback(() => {
    if (isPaused) return;

    // Safety check: Empty content or invalid index
    if (!content || content.length === 0 || contentIndex >= content.length) {
      return;
    }

    const currentLine = content[contentIndex];

    // Handle pause effect
    if (currentLine?.type === "pause") {
      setIsPaused(true);
      setTimeout(() => {
        setIsPaused(false);
        if (contentIndex < content.length - 1) {
          setContentIndex((i) => i + 1);
        } else {
          // End of content block, advance story
          const result = engineRef.current?.advance();
          if (result) handleResult(result);
        }
      }, currentLine.duration);
      return;
    }

    // Auto-skip effect lines (they don't render content)
    if (currentLine?.type === "effect") {
      if (contentIndex < content.length - 1) {
        setContentIndex((i) => i + 1);
      } else {
        // End of content block, advance story
        const result = engineRef.current?.advance();
        if (result) handleResult(result);
      }
      return;
    }

    // Advance to next line
    if (contentIndex < content.length - 1) {
      setContentIndex((i) => i + 1);
    } else {
      // End of content block, advance story
      const result = engineRef.current?.advance();
      if (result) handleResult(result);
    }
  }, [content, contentIndex, isPaused, handleResult]);

  // Auto-skip effect lines when content changes
  useEffect(() => {
    // Safety check: Empty content or invalid index
    if (!content || content.length === 0 || contentIndex >= content.length) {
      return;
    }

    const currentLine = content[contentIndex];
    if (currentLine?.type === "effect" && !isPaused) {
      // Check if next line after effect is a pause
      const nextIndex = contentIndex + 1;
      if (nextIndex < content.length) {
        const nextLine = content[nextIndex];
        if (nextLine?.type === "pause") {
          // Next line is a pause - use centralized helper
          handlePauseAndAdvance(nextLine, nextIndex);
        } else {
          // Normal line after effect, just advance
          setContentIndex(nextIndex);
        }
      } else {
        // No more lines in content, advance story
        const result = engineRef.current?.advance();
        if (result && handleResultRef.current) {
          handleResultRef.current(result);
        }
      }
    }
  }, [content, contentIndex, isPaused, handlePauseAndAdvance, setContentIndex]);

  // Handle choice selection
  const handleChoice = useCallback(
    (choiceId: string) => {
      const result = engineRef.current?.makeChoice(choiceId);
      if (result) handleResult(result);
    },
    [handleResult],
  );

  // Handle exploration completion
  const handleExplorationComplete = useCallback(() => {
    const result = engineRef.current?.completeExploration();
    if (result) handleResult(result);
  }, [handleResult]);

  // Handle chapter transition
  const handleChapterContinue = useCallback(() => {
    // For now, just advance - would load next chapter
    const result = engineRef.current?.advance();
    if (result) handleResult(result);
  }, [handleResult]);

  // Handle save/load completion
  const handleSaveLoadComplete = useCallback(() => {
    setShowStatusMenu(false);

    // Reload story state from GameStore
    const savedState = GameStore.getStoryState();
    if (savedState && engineRef.current) {
      engineRef.current.setState(savedState);
      const result = engineRef.current.advance();
      if (result) handleResult(result);
    }
  }, [handleResult]);

  // Handle typewriter completion
  const handleTypeComplete = useCallback(() => {
    setTypewriterComplete(true);
  }, [setTypewriterComplete]);

  // Skip pause and advance to next content
  const skipPauseAndAdvance = useCallback(() => {
    // Clear any pending timeout
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
      pauseTimeoutRef.current = null;
    }
    setIsPaused(false);

    const idx = contentIndexRef.current;
    const lines = contentRef.current;

    if (idx < lines.length - 1) {
      setContentIndex(idx + 1);
    } else {
      const result = engineRef.current?.advance();
      if (result) handleResult(result);
    }
  }, [handleResult, setIsPaused, setContentIndex]);

  // Input handling - use refs to avoid stale closures
  useInput((input, key) => {
    const currentPhase = phaseRef.current;
    const paused = isPausedRef.current;
    const typing = isTypingRef.current;
    const typeComplete = typewriterCompleteRef.current;

    // Toggle status menu with ESC (works anytime)
    if (key.escape) {
      setShowStatusMenu(!showStatusMenu);
      return;
    }

    // Don't process other inputs when status menu is open
    if (showStatusMenu) {
      return;
    }

    if (input === " ") {
      // Block input if auto-advance is pending
      if (autoAdvanceTimeoutRef.current) {
        return;
      }

      // If paused, skip the pause
      if (paused) {
        skipPauseAndAdvance();
        return;
      }

      if (currentPhase === "content") {
        // Direct advancement using refs
        const idx = contentIndexRef.current;
        const lines = contentRef.current;

        // Safety check: Empty content array
        if (!lines || lines.length === 0) {
          return;
        }

        const currentLine = lines[idx];

        // Check non-text content types FIRST (before typewriter check)
        // Handle pause type - use centralized helper
        if (currentLine?.type === "pause") {
          handlePauseAndAdvance(currentLine, idx);
          return;
        }

        // Auto-skip effect lines (they don't display content)
        if (currentLine?.type === "effect") {
          if (idx < lines.length - 1) {
            setContentIndex(idx + 1);
            setIsTyping(true);
            setTypewriterComplete(false);
          } else {
            const result = engineRef.current?.advance();
            if (result) handleResult(result);
          }
          return;
        }

        // NOW check typewriter (only for text content)
        // If typewriter is still typing and enabled, complete it and auto-advance
        if (typing && !typeComplete && GameStore.isTypewriterEnabled()) {
          // Clear any existing auto-advance timeout to prevent rapid-skip bug
          if (autoAdvanceTimeoutRef.current) {
            clearTimeout(autoAdvanceTimeoutRef.current);
          }

          setIsTyping(false);
          setTypewriterComplete(true);

          // Auto-advance after brief delay so user sees completed text
          autoAdvanceTimeoutRef.current = setTimeout(() => {
            autoAdvanceTimeoutRef.current = null;

            // Check if next line is a pause - if so, handle it automatically
            const nextIndex = idx + 1;
            if (nextIndex < lines.length) {
              const nextLine = lines[nextIndex];
              if (nextLine?.type === "pause") {
                // Use centralized pause handler
                handlePauseAndAdvance(nextLine, nextIndex);
                return;
              }
            }

            // Normal advance (no pause)
            if (idx < lines.length - 1) {
              setContentIndex(idx + 1);
              setIsTyping(true);
              setTypewriterComplete(false);
            } else {
              const result = engineRef.current?.advance();
              if (result && handleResultRef.current) {
                handleResultRef.current(result);
              }
            }
          }, STORY_CONFIG.autoAdvanceDelay);
          return;
        }

        // Normal advancement - reset typewriter for next line
        const nextIndex = idx + 1;
        if (nextIndex < lines.length) {
          const nextLine = lines[nextIndex];

          // Check if next line is a pause - use centralized helper
          if (nextLine?.type === "pause") {
            handlePauseAndAdvance(nextLine, nextIndex);
          } else {
            // Normal line, just advance
            setContentIndex(nextIndex);
            setIsTyping(true);
            setTypewriterComplete(false);
          }
        } else {
          const result = engineRef.current?.advance();
          if (result && handleResultRef.current) {
            handleResultRef.current(result);
          }
        }
      } else if (currentPhase === "chapter-end") {
        handleChapterContinue();
      }
    }
  });

  // Get action hint text
  const getActionHint = () => {
    if (isPaused) return "...";
    if (isTyping && !typewriterComplete && GameStore.isTypewriterEnabled())
      return "SPACE to skip  •  ESC for menu";
    if (phase === "content") {
      return contentIndex < content.length - 1
        ? "SPACE to continue  •  ESC for menu"
        : "SPACE to continue  •  ESC for menu";
    }
    if (phase === "chapter-end") return "SPACE to continue  •  ESC for menu";
    return "";
  };

  // Render
  return (
    <CenteredScreen>
      <Box
        flexDirection="column"
        borderStyle="double"
        borderColor="cyan"
        paddingX={2}
        paddingY={0}
        width={84}
      >
        {/* Header */}
        <Box marginY={1} justifyContent="center">
          <Text bold color="cyan">
            📖 {sceneTitle.toUpperCase()}
          </Text>
        </Box>

        {/* Location & Progress */}
        <Box justifyContent="space-between" marginBottom={1}>
          <Box>
            {location.length > 0 && <Text dimColor>📍 {location}</Text>}
          </Box>
          <Text dimColor>
            Scene {sceneProgress.current}/{sceneProgress.total}
          </Text>
        </Box>

        {/* Path Affinity Bar */}
        {(() => {
          const storyState = GameStore.getStoryState();
          if (!storyState) return null;

          const pathPercentages = storyState.pathPercentages;

          // Already in percentages, just round
          const bladePercent = Math.round(pathPercentages.blade);
          const streamPercent = Math.round(pathPercentages.stream);
          const shadowPercent = Math.round(pathPercentages.shadow);

          const getBar = (percent: number, length: number = 5) => {
            const filled = Math.round((percent / 100) * length);
            return "█".repeat(filled) + "░".repeat(length - filled);
          };

          return (
            <Box marginBottom={1} justifyContent="center">
              <Text color="red">{getBar(bladePercent)}</Text>
              <Text dimColor> </Text>
              <Text color="cyan">{getBar(streamPercent)}</Text>
              <Text dimColor> </Text>
              <Text color="magenta">{getBar(shadowPercent)}</Text>
              <Text dimColor> • </Text>
              <Text color="red">B:{bladePercent}%</Text>
              <Text dimColor> </Text>
              <Text color="cyan">S:{streamPercent}%</Text>
              <Text dimColor> </Text>
              <Text color="magenta">Sh:{shadowPercent}%</Text>
            </Box>
          );
        })()}

        {/* Divider */}
        <Box justifyContent="center">
          <Text color="cyan" dimColor>
            {SEMANTIC_DIVIDERS.story}
          </Text>
        </Box>

        {/* Content area - Optimal reading zone */}
        <Box flexDirection="column" minHeight={28} paddingX={3} paddingY={2}>
          {phase === "content" && (
            <>
              <ContentBlock
                lines={content}
                currentIndex={contentIndex}
                isTyping={isTyping && GameStore.isTypewriterEnabled()}
                typewriterSpeed={GameStore.getTypewriterSpeed()}
                onTypeComplete={handleTypeComplete}
              />
            </>
          )}

          {phase === "choice" && choices.length > 0 && (
            <>
              {content.length > 0 && (
                <Box marginBottom={1}>
                  <ContentBlock lines={content} showAll />
                </Box>
              )}
              <ChoiceMenu
                choices={choices}
                onSelect={handleChoice}
                prompt={choicePrompt}
              />
            </>
          )}

          {phase === "exploration" && (
            <ExplorationMenu
              areas={areas}
              onComplete={handleExplorationComplete}
            />
          )}

          {phase === "chapter-end" && (
            <>
              <ContentBlock lines={content} showAll />
            </>
          )}

          {phase === "game-end" && (
            <Box
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              minHeight={25}
            >
              <Box marginBottom={2}>
                <Text bold color="green">
                  ═══════════════════════════════════════
                </Text>
              </Box>
              <Box marginBottom={1}>
                <Text bold color="green">
                  ✓ THE END ✓
                </Text>
              </Box>
              <Box marginBottom={2}>
                <Text bold color="green">
                  ═══════════════════════════════════════
                </Text>
              </Box>
              <Text dimColor italic>
                Thank you for playing.
              </Text>
            </Box>
          )}

          {phase === "combat" && (
            <Box
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              minHeight={25}
            >
              <Text color="red" bold>
                ⚔ Entering Combat...
              </Text>
            </Box>
          )}
        </Box>

        {/* Divider */}
        <Box justifyContent="center">
          <Text color="cyan" dimColor>
            {SEMANTIC_DIVIDERS.story}
          </Text>
        </Box>

        {/* Action Bar */}
        <Box marginY={1} justifyContent="center">
          <Text dimColor italic>
            {getActionHint()}
          </Text>
        </Box>

        {/* Status Menu Overlay with Backdrop */}
        {showStatusMenu && engineRef.current && (
          <Box
            position="absolute"
            width="100%"
            height="100%"
            flexDirection="column"
          >
            {/* Solid backdrop to cover content */}
            <Box
              flexDirection="column"
              borderStyle="double"
              borderColor="black"
              width={80}
              paddingX={2}
              paddingY={1}
            >
              {Array.from({ length: 35 }).map((_, i) => (
                <Text key={i} backgroundColor="black">
                  {" ".repeat(76)}
                </Text>
              ))}
            </Box>

            {/* Status Menu on top of backdrop */}
            <Box
              position="absolute"
              width="100%"
              height="100%"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <StatusMenu
                player={player}
                storyState={engineRef.current.getState()}
                onClose={() => setShowStatusMenu(false)}
                onSaveLoad={handleSaveLoadComplete}
                onQuitToMenu={onQuitToMenu}
              />
            </Box>
          </Box>
        )}
      </Box>
    </CenteredScreen>
  );
};
