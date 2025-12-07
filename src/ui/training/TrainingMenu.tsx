/**
 * Training Menu Component
 * Post-prologue training system for mastery progression
 */

import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import type { Character } from '../../types/character';
import { getProgressToNextUnlock } from '../../game/training/TrainingManager';
import { SEMANTIC_DIVIDERS } from '../theme/dividers';
import { getAllTechniques } from '../../game/combat/TechniqueRegistry';
import { canUnlockTechnique } from '../../types/technique';

interface TrainingMenuProps {
  player: Character;
  onSparring: () => void;
  onClose: () => void;
}

export const TrainingMenu: React.FC<TrainingMenuProps> = ({
  player,
  onSparring,
  onClose,
}) => {
  const [showTechniques, setShowTechniques] = useState(false);
  const training = player.trainingProgress;

  if (!training) {
    return (
      <Box flexDirection="column" borderStyle="double" borderColor="cyan" paddingX={2} paddingY={1} width={74}>
        <Text color="red">Error: Training progress not initialized</Text>
      </Box>
    );
  }

  const progress = getProgressToNextUnlock(training.masteryPoints);

  // Get technique unlock info
  const allTechniques = getAllTechniques();
  const playerTechniques = allTechniques.filter(t => t.unlockedByDefault || player.techniques.includes(t.id));

  const unlockedTechniques = allTechniques.filter(t => {
    if (t.unlockedByDefault) return false; // Skip defaults
    if (player.techniques.includes(t.id)) return false; // Skip already known
    const check = canUnlockTechnique(t, player, 0); // Prologue = chapter 0
    return check.canUnlock;
  });

  const lockedTechniques = allTechniques.filter(t => {
    if (t.unlockedByDefault) return false;
    if (player.techniques.includes(t.id)) return false;
    const check = canUnlockTechnique(t, player, 0);
    return !check.canUnlock && t.unlockRequirements; // Only show techniques with requirements
  }).slice(0, 5); // Limit to 5 for space

  useInput((input, key) => {
    if (key.escape) {
      if (showTechniques) {
        setShowTechniques(false);
      } else {
        onClose();
      }
      return;
    }

    if (input === '1') {
      onSparring();
    }

    if (input === 't' || input === 'T') {
      setShowTechniques(!showTechniques);
    }
  });

  return (
    <Box flexDirection="column" borderStyle="double" borderColor="cyan" paddingX={2} paddingY={0} width={74}>
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
          Master your techniques through practice. Earn mastery points to unlock new abilities.
        </Text>
      </Box>

      {/* Progress Display */}
      <Box marginBottom={1} flexDirection="column">
        <Text>
          <Text bold color="yellow">
            Current Mastery:
          </Text>{' '}
          <Text color="cyan">{training.masteryPoints}</Text> points
        </Text>

        {progress && (
          <>
            <Box marginTop={1}>
              <Text>
                <Text bold color="yellow">
                  Next Unlock:
                </Text>{' '}
                <Text color="green">{progress.unlockName}</Text>
              </Text>
            </Box>
            <Box marginTop={0.5}>
              <Text>
                Progress: {progress.current}/{progress.needed} ({progress.percent}%)
              </Text>
            </Box>
            <Box marginTop={0.5}>
              <Text dimColor>{'█'.repeat(Math.floor(progress.percent / 5))}{'░'.repeat(20 - Math.floor(progress.percent / 5))}</Text>
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
          </Text>{' '}
          <Text>Sparring Match</Text> <Text dimColor>- Fight training dummy (Earn 5-10 mastery)</Text>
        </Text>
        <Box marginTop={0.5}>
          <Text dimColor>     Practice combat and test your techniques</Text>
        </Box>

        <Box marginTop={1}>
          <Text dimColor>
            [2] Stance Training - (Coming soon)
          </Text>
        </Box>
        <Box marginTop={0.5}>
          <Text dimColor>
            [3] Technique Challenges - (Coming soon)
          </Text>
        </Box>
        <Box marginTop={0.5}>
          <Text dimColor>
            [4] Path Trials - (Coming soon)
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
            <Text dimColor>Best Performance:</Text> {training.bestPerformance.fastestWin} turns{' '}
            | {training.bestPerformance.mostDamage} damage | {training.bestPerformance.longestCombo} combos
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
            Technique Progress{' '}
          </Text>
          <Text dimColor>
            [Press T to {showTechniques ? 'hide' : 'show'} details]
          </Text>
        </Box>
        <Box marginTop={0.5}>
          <Text>
            <Text color="green">● Available to Unlock:</Text> {unlockedTechniques.length}
          </Text>
        </Box>
        <Box marginTop={0.5}>
          <Text>
            <Text dimColor>○ Locked:</Text> {lockedTechniques.length}+ techniques
          </Text>
        </Box>
        <Box marginTop={0.5}>
          <Text>
            <Text color="cyan">✓ Known:</Text> {playerTechniques.length} techniques
          </Text>
        </Box>

        {/* Detailed Technique Display */}
        {showTechniques && (
          <Box marginTop={1} flexDirection="column">
            {/* Available Techniques */}
            {unlockedTechniques.length > 0 && (
              <Box flexDirection="column" marginBottom={1}>
                <Text bold color="green">
                  AVAILABLE TO UNLOCK:
                </Text>
                {unlockedTechniques.slice(0, 3).map(tech => (
                  <Box key={tech.id} paddingLeft={2} marginTop={0.5}>
                    <Text color="green">● </Text>
                    <Text bold>{tech.name}</Text>
                    <Text dimColor> ({tech.chinese}) - {tech.description}</Text>
                  </Box>
                ))}
                {unlockedTechniques.length > 3 && (
                  <Box paddingLeft={2} marginTop={0.5}>
                    <Text dimColor>... and {unlockedTechniques.length - 3} more</Text>
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
                {lockedTechniques.slice(0, 3).map(tech => {
                  const check = canUnlockTechnique(tech, player, 0);
                  return (
                    <Box key={tech.id} paddingLeft={2} marginTop={0.5} flexDirection="column">
                      <Box>
                        <Text dimColor>○ {tech.name} ({tech.chinese})</Text>
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

      {/* Footer */}
      <Box justifyContent="center" marginY={1}>
        <Text dimColor>[T] Techniques • [ESC] Return to Beggar's Corner</Text>
      </Box>
    </Box>
  );
};
