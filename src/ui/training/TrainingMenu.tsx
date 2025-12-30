/**
 * Training Menu Component
 * Post-prologue training system for mastery progression
 */

import React, { useState, useEffect } from "react";
import { Box, Text, useInput } from "ink";
import type { Character } from "../../types/character";
import {
  getProgressToNextUnlock,
  getAvailableChallenges,
  getDominantPath,
  type ChallengeDifficulty,
} from "../../game/training/TrainingManager";
import { SEMANTIC_DIVIDERS } from "../theme/dividers";
import { getAllTechniques } from "../../game/combat/TechniqueRegistry";
import { canUnlockTechnique } from "../../types/technique";

type ViewMode =
  | "main"
  | "challenges"
  | "techniques"
  | "result"
  | "sparring-result";

interface ChallengeResult {
  challengeName: string;
  passed: boolean;
  masteryEarned: number;
  techniqueUnlocked?: string;
}

interface SparringResult {
  won: boolean;
  masteryEarned: number;
  bonuses: { reason: string; amount: number }[];
}

interface TrainingMenuProps {
  player: Character;
  onSparring: () => void;
  onChallenge: (challengeId: string) => void;
  onClose: () => void;
  lastChallengeResult?: ChallengeResult | null;
  onChallengeResultDismiss?: () => void;
  lastSparringResult?: SparringResult | null;
  onSparringResultDismiss?: () => void;
}

// Helper to get difficulty color
const getDifficultyColor = (difficulty: ChallengeDifficulty): string => {
  switch (difficulty) {
    case "beginner":
      return "green";
    case "intermediate":
      return "yellow";
    case "advanced":
      return "magenta";
    case "master":
      return "red";
    default:
      return "white";
  }
};

export const TrainingMenu: React.FC<TrainingMenuProps> = ({
  player,
  onSparring,
  onChallenge,
  onClose,
  lastChallengeResult,
  onChallengeResultDismiss,
  lastSparringResult,
  onSparringResultDismiss,
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>("main");
  const [selectedChallenge, setSelectedChallenge] = useState(0);
  const training = player.trainingProgress;

  // Show result view when a challenge result comes in
  useEffect(() => {
    if (lastChallengeResult) {
      setViewMode("result");
    }
  }, [lastChallengeResult]);

  // Show sparring result view when a sparring result comes in
  useEffect(() => {
    if (lastSparringResult) {
      setViewMode("sparring-result");
    }
  }, [lastSparringResult]);

  // Get available challenges
  const dominantPath = player.pathAlignment
    ? getDominantPath(player.pathAlignment)
    : "blade";
  const availableChallenges = training
    ? getAvailableChallenges(
        training.masteryPoints,
        training.challengesCompleted,
        dominantPath,
      )
    : [];

  // Hook must be called unconditionally (before any early returns)
  useInput((input, key) => {
    // Don't process input if training not initialized
    if (!training) return;

    // Challenge result view - any key dismisses
    if (viewMode === "result") {
      if (key.return || key.escape || input === " ") {
        onChallengeResultDismiss?.();
        setViewMode("main");
      }
      return;
    }

    // Sparring result view - any key dismisses
    if (viewMode === "sparring-result") {
      if (key.return || key.escape || input === " ") {
        onSparringResultDismiss?.();
        setViewMode("main");
      }
      return;
    }

    if (key.escape) {
      if (viewMode !== "main") {
        setViewMode("main");
        setSelectedChallenge(0);
      } else {
        onClose();
      }
      return;
    }

    // Main menu controls
    if (viewMode === "main") {
      if (input === "1") {
        onSparring();
      }
      if (input === "2" || input === "c" || input === "C") {
        setViewMode("challenges");
        setSelectedChallenge(0);
      }
      if (input === "t" || input === "T") {
        setViewMode("techniques");
      }
    }

    // Techniques view - T toggles back to main
    if (viewMode === "techniques") {
      if (input === "t" || input === "T") {
        setViewMode("main");
      }
    }

    // Challenge selection controls
    if (viewMode === "challenges" && availableChallenges.length > 0) {
      if (key.upArrow || input === "w" || input === "W") {
        setSelectedChallenge((prev) =>
          prev > 0 ? prev - 1 : availableChallenges.length - 1,
        );
      }
      if (key.downArrow || input === "s" || input === "S") {
        setSelectedChallenge((prev) =>
          prev < availableChallenges.length - 1 ? prev + 1 : 0,
        );
      }
      if (key.return || input === " ") {
        const challenge = availableChallenges[selectedChallenge];
        if (challenge) {
          onChallenge(challenge.id);
        }
      }
    }
  });

  if (!training) {
    return (
      <Box
        flexDirection="column"
        borderStyle="double"
        borderColor="cyan"
        paddingX={2}
        paddingY={1}
        width={74}
      >
        <Text color="red">Error: Training progress not initialized</Text>
      </Box>
    );
  }

  const progress = getProgressToNextUnlock(training.masteryPoints);

  // Get technique unlock info
  const allTechniques = getAllTechniques();
  const playerTechniques = allTechniques.filter(
    (t) => t.unlockedByDefault || player.techniques.includes(t.id),
  );

  const unlockedTechniques = allTechniques.filter((t) => {
    if (t.unlockedByDefault) return false; // Skip defaults
    if (player.techniques.includes(t.id)) return false; // Skip already known
    const check = canUnlockTechnique(t, player, 0); // Prologue = chapter 0
    return check.canUnlock;
  });

  const lockedTechniques = allTechniques
    .filter((t) => {
      if (t.unlockedByDefault) return false;
      if (player.techniques.includes(t.id)) return false;
      const check = canUnlockTechnique(t, player, 0);
      return !check.canUnlock && t.unlockRequirements; // Only show techniques with requirements
    })
    .slice(0, 5); // Limit to 5 for space

  return (
    <Box
      flexDirection="column"
      borderStyle="double"
      borderColor="cyan"
      paddingX={2}
      paddingY={0}
      width={74}
    >
      {/* Header */}
      <Box marginY={1} justifyContent="center">
        <Text bold color="cyan">
          🥋 TRAINING GROUNDS
        </Text>
      </Box>

      {/* Divider */}
      <Box justifyContent="center">
        <Text color="cyan" dimColor>
          {SEMANTIC_DIVIDERS.training}
        </Text>
      </Box>

      {/* Description */}
      <Box marginTop={1} marginBottom={1}>
        <Text dimColor>
          Master your techniques through practice. Earn mastery points to unlock
          new abilities.
        </Text>
      </Box>

      {/* Progress Display */}
      <Box marginBottom={1} flexDirection="column">
        <Text>
          <Text bold color="yellow">
            Current Mastery:
          </Text>{" "}
          <Text color="cyan">{training.masteryPoints}</Text> points
        </Text>

        {progress && (
          <>
            <Box marginTop={1}>
              <Text>
                <Text bold color="yellow">
                  Next Unlock:
                </Text>{" "}
                <Text color="green">{progress.unlockName}</Text>
              </Text>
            </Box>
            <Box marginTop={0.5}>
              <Text>
                Progress: {progress.current}/{progress.needed} (
                {progress.percent}%)
              </Text>
            </Box>
            <Box marginTop={0.5}>
              <Text dimColor>
                {"█".repeat(Math.floor(progress.percent / 5))}
                {"░".repeat(20 - Math.floor(progress.percent / 5))}
              </Text>
            </Box>
          </>
        )}

        {!progress && (
          <Box marginTop={1}>
            <Text bold color="green">
              ✓ Demo Mastery Reached! Ready for Chapter 1.
            </Text>
          </Box>
        )}
      </Box>

      {/* Divider */}
      <Box justifyContent="center" marginY={1}>
        <Text color="cyan" dimColor>
          ─────────────────────────────────────────────────────────────────
        </Text>
      </Box>

      {/* Training Options */}
      <Box flexDirection="column" marginBottom={1}>
        <Text>
          <Text bold color="cyan">
            [1]
          </Text>{" "}
          <Text>Sparring Match</Text>{" "}
          <Text dimColor>- Fight training dummy (Earn 5-10 mastery)</Text>
        </Text>
        <Box marginTop={0.5}>
          <Text dimColor> Practice combat and test your techniques</Text>
        </Box>

        <Box marginTop={1}>
          <Text>
            <Text bold color="cyan">
              [2]
            </Text>{" "}
            <Text>Training Challenges</Text>{" "}
            <Text dimColor>- {availableChallenges.length} available</Text>
          </Text>
        </Box>
        <Box marginTop={0.5}>
          <Text dimColor>
            {" "}
            Complete objectives for bonus mastery and exclusive techniques
          </Text>
        </Box>
      </Box>

      {/* Divider */}
      <Box justifyContent="center" marginY={1}>
        <Text color="cyan" dimColor>
          ─────────────────────────────────────────────────────────────────
        </Text>
      </Box>

      {/* Stats Display */}
      <Box flexDirection="column" marginBottom={1}>
        <Text bold color="yellow">
          Training Statistics
        </Text>
        <Box marginTop={0.5}>
          <Text>
            <Text dimColor>Sparring Wins:</Text> {training.sparringWins}
          </Text>
        </Box>
        <Box marginTop={0.5}>
          <Text>
            <Text dimColor>Best Performance:</Text>{" "}
            {training.bestPerformance.fastestWin} turns |{" "}
            {training.bestPerformance.mostDamage} damage |{" "}
            {training.bestPerformance.longestCombo} combos
          </Text>
        </Box>
      </Box>

      {/* Divider */}
      <Box justifyContent="center" marginY={1}>
        <Text color="cyan" dimColor>
          ─────────────────────────────────────────────────────────────────
        </Text>
      </Box>

      {/* Technique Unlock Summary */}
      <Box flexDirection="column" marginBottom={1}>
        <Box>
          <Text bold color="yellow">
            Technique Progress{" "}
          </Text>
          <Text dimColor>
            [Press T to {viewMode === "techniques" ? "hide" : "show"} details]
          </Text>
        </Box>
        <Box marginTop={0.5}>
          <Text>
            <Text color="green">● Available to Unlock:</Text>{" "}
            {unlockedTechniques.length}
          </Text>
        </Box>
        <Box marginTop={0.5}>
          <Text>
            <Text dimColor>○ Locked:</Text> {lockedTechniques.length}+
            techniques
          </Text>
        </Box>
        <Box marginTop={0.5}>
          <Text>
            <Text color="cyan">✓ Known:</Text> {playerTechniques.length}{" "}
            techniques
          </Text>
        </Box>

        {/* Detailed Technique Display */}
        {viewMode === "techniques" && (
          <Box marginTop={1} flexDirection="column">
            {/* Available Techniques */}
            {unlockedTechniques.length > 0 && (
              <Box flexDirection="column" marginBottom={1}>
                <Text bold color="green">
                  AVAILABLE TO UNLOCK:
                </Text>
                {unlockedTechniques.slice(0, 3).map((tech) => (
                  <Box key={tech.id} paddingLeft={2} marginTop={0.5}>
                    <Text color="green">● </Text>
                    <Text bold>{tech.name}</Text>
                    <Text dimColor>
                      {" "}
                      ({tech.chinese}) - {tech.description}
                    </Text>
                  </Box>
                ))}
                {unlockedTechniques.length > 3 && (
                  <Box paddingLeft={2} marginTop={0.5}>
                    <Text dimColor>
                      ... and {unlockedTechniques.length - 3} more
                    </Text>
                  </Box>
                )}
              </Box>
            )}

            {/* Locked Techniques Preview */}
            {lockedTechniques.length > 0 && (
              <Box flexDirection="column">
                <Text bold dimColor>
                  UPCOMING (Locked):
                </Text>
                {lockedTechniques.slice(0, 3).map((tech) => {
                  const check = canUnlockTechnique(tech, player, 0);
                  return (
                    <Box
                      key={tech.id}
                      paddingLeft={2}
                      marginTop={0.5}
                      flexDirection="column"
                    >
                      <Box>
                        <Text dimColor>
                          ○ {tech.name} ({tech.chinese})
                        </Text>
                      </Box>
                      {check.reason && (
                        <Box paddingLeft={4}>
                          <Text dimColor italic>
                            → {check.reason}
                          </Text>
                        </Box>
                      )}
                    </Box>
                  );
                })}
              </Box>
            )}
          </Box>
        )}
      </Box>

      {/* Footer - Main Menu */}
      {viewMode === "main" && (
        <Box justifyContent="center" marginY={1}>
          <Text dimColor>[T] Techniques • [ESC] Return to Beggar's Corner</Text>
        </Box>
      )}

      {/* Challenge Selection View */}
      {viewMode === "challenges" && (
        <Box flexDirection="column" marginTop={1}>
          <Box marginBottom={1}>
            <Text bold color="yellow">
              ⚔️ TRAINING CHALLENGES
            </Text>
          </Box>
          <Box marginBottom={1}>
            <Text dimColor>
              Select a challenge to test your skills. Complete objectives for
              rewards.
            </Text>
          </Box>

          {availableChallenges.length === 0 ? (
            <Box marginY={1}>
              <Text dimColor>
                No challenges available yet. Earn more mastery through sparring!
              </Text>
            </Box>
          ) : (
            <Box flexDirection="column">
              {availableChallenges.map((challenge, index) => {
                const isSelected = index === selectedChallenge;
                const isCompleted =
                  training.challengesCompleted?.includes(challenge.id) ?? false;
                const isPathTrial = challenge.category === "path-trial";

                return (
                  <Box
                    key={challenge.id}
                    flexDirection="column"
                    marginBottom={1}
                    paddingX={1}
                    borderStyle={isSelected ? "single" : undefined}
                    borderColor={isSelected ? "cyan" : undefined}
                  >
                    <Box>
                      <Text color={isSelected ? "cyan" : "white"}>
                        {isSelected ? "▶ " : "  "}
                      </Text>
                      <Text bold color={isSelected ? "cyan" : "white"}>
                        {challenge.name}
                      </Text>
                      <Text dimColor> ({challenge.chinese})</Text>
                      {isCompleted && <Text color="green"> ✓</Text>}
                      {isPathTrial && <Text color="magenta"> ★</Text>}
                    </Box>
                    <Box paddingLeft={4}>
                      <Text
                        color={getDifficultyColor(challenge.difficulty)}
                        dimColor={!isSelected}
                      >
                        [{challenge.difficulty.toUpperCase()}]
                      </Text>
                      <Text dimColor={!isSelected}>
                        {" "}
                        - {challenge.description}
                      </Text>
                    </Box>
                    <Box paddingLeft={4}>
                      <Text dimColor>
                        Reward: {challenge.rewards.masteryPoints} mastery
                        {challenge.rewards.techniqueTaught && (
                          <Text color="yellow"> + New Technique!</Text>
                        )}
                      </Text>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          )}

          {/* Challenge Footer */}
          <Box justifyContent="center" marginTop={1}>
            <Text dimColor>
              [↑↓/WS] Navigate • [ENTER/SPACE] Start • [ESC] Back
            </Text>
          </Box>
        </Box>
      )}

      {/* Challenge Result View */}
      {viewMode === "result" && lastChallengeResult && (
        <Box flexDirection="column" marginTop={1}>
          <Box justifyContent="center" marginBottom={1}>
            <Text bold color={lastChallengeResult.passed ? "green" : "red"}>
              {lastChallengeResult.passed
                ? "⚔️ CHALLENGE COMPLETE! ⚔️"
                : "💀 CHALLENGE FAILED 💀"}
            </Text>
          </Box>

          <Box
            flexDirection="column"
            borderStyle="round"
            borderColor={lastChallengeResult.passed ? "green" : "red"}
            paddingX={2}
            paddingY={1}
          >
            <Box justifyContent="center" marginBottom={1}>
              <Text bold>{lastChallengeResult.challengeName}</Text>
            </Box>

            {lastChallengeResult.passed ? (
              <Box flexDirection="column">
                <Box justifyContent="center">
                  <Text color="green">✓ You have proven your skill!</Text>
                </Box>

                <Box marginTop={1} flexDirection="column">
                  <Text bold color="yellow">
                    Rewards Earned:
                  </Text>
                  <Box paddingLeft={2} marginTop={0.5}>
                    <Text>
                      <Text color="cyan">
                        +{lastChallengeResult.masteryEarned}
                      </Text>{" "}
                      Mastery Points
                    </Text>
                  </Box>
                  {lastChallengeResult.techniqueUnlocked && (
                    <Box paddingLeft={2} marginTop={0.5}>
                      <Text color="magenta" bold>
                        ★ New Technique: {lastChallengeResult.techniqueUnlocked}
                      </Text>
                    </Box>
                  )}
                </Box>
              </Box>
            ) : (
              <Box flexDirection="column">
                <Box justifyContent="center">
                  <Text color="red">
                    ✗ The challenge conditions were not met.
                  </Text>
                </Box>
                <Box justifyContent="center" marginTop={1}>
                  <Text dimColor>Train more and try again when ready.</Text>
                </Box>
              </Box>
            )}
          </Box>

          <Box justifyContent="center" marginTop={1}>
            <Text dimColor>[ENTER/SPACE/ESC] Continue</Text>
          </Box>
        </Box>
      )}

      {/* Sparring Result View */}
      {viewMode === "sparring-result" && lastSparringResult && (
        <Box flexDirection="column" marginTop={1}>
          <Box justifyContent="center" marginBottom={1}>
            <Text bold color={lastSparringResult.won ? "green" : "yellow"}>
              {lastSparringResult.won
                ? "🥋 SPARRING VICTORY! 🥋"
                : "🥋 SPARRING COMPLETE 🥋"}
            </Text>
          </Box>

          <Box
            flexDirection="column"
            borderStyle="round"
            borderColor={lastSparringResult.won ? "green" : "yellow"}
            paddingX={2}
            paddingY={1}
          >
            <Box justifyContent="center" marginBottom={1}>
              <Text bold>Training Match</Text>
            </Box>

            <Box flexDirection="column">
              <Box justifyContent="center">
                <Text color={lastSparringResult.won ? "green" : "yellow"}>
                  {lastSparringResult.won
                    ? "✓ You defeated the training dummy!"
                    : "○ A good training session."}
                </Text>
              </Box>

              <Box marginTop={1} flexDirection="column">
                <Text bold color="yellow">
                  Mastery Earned:
                </Text>
                {lastSparringResult.bonuses.map((bonus, index) => (
                  <Box key={index} paddingLeft={2} marginTop={0.5}>
                    <Text>
                      <Text color="cyan">+{bonus.amount}</Text>{" "}
                      <Text dimColor>{bonus.reason}</Text>
                    </Text>
                  </Box>
                ))}
                <Box paddingLeft={2} marginTop={0.5}>
                  <Text bold>
                    <Text color="cyan">
                      = {lastSparringResult.masteryEarned}
                    </Text>{" "}
                    Total Mastery Points
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box justifyContent="center" marginTop={1}>
            <Text dimColor>[ENTER/SPACE/ESC] Continue</Text>
          </Box>
        </Box>
      )}
    </Box>
  );
};
