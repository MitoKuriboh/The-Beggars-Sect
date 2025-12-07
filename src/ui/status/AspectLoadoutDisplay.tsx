/**
 * Aspect Loadout Display Component
 * Shows equipped aspects and allows changing secondary slot loadouts
 */

import React, { useState } from 'react';
import { Box, Text } from 'ink';
import type { Character, ChiAspect, AspectLoadout } from '../../types/index';
import { ASPECT_BONUSES, canUnlockAspect, ASPECT_UNLOCK_TREE } from '../../game/systems/AspectSystem';
import { getEquippedAspects } from '../../types/character';
import { useMenuNavigation } from '../hooks/useMenuNavigation';

interface AspectLoadoutDisplayProps {
  player: Character;
  currentChapter: number;
  onEquipAspect?: (slot: 'slot1' | 'slot2' | 'slot3', aspect: ChiAspect | null) => void;
}

type ViewMode = 'display' | 'slot1' | 'slot2' | 'slot3';

const ASPECT_LABELS: Record<ChiAspect, string> = {
  force: '力 FORCE',
  flow: '流 FLOW',
  precision: '准 PRECISION',
  burst: '爆 BURST',
  armor: '甲 ARMOR',
  sense: '感 SENSE',
  will: '意 WILL',
  inverse: '逆 INVERSE',
};

const ASPECT_COLORS: Record<ChiAspect, string> = {
  force: 'red',
  flow: 'cyan',
  precision: 'yellow',
  burst: 'magenta',
  armor: 'green',
  sense: 'blue',
  will: 'white',
  inverse: 'redBright',
};

export const AspectLoadoutDisplay: React.FC<AspectLoadoutDisplayProps> = ({
  player,
  currentChapter,
  onEquipAspect,
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>('display');
  const loadout = player.aspectLoadout;

  if (!loadout) {
    return (
      <Box flexDirection="column" paddingX={2}>
        <Text dimColor>Aspect loadout not initialized.</Text>
      </Box>
    );
  }

  // Display mode - show current loadout
  if (viewMode === 'display') {
    return (
      <Box flexDirection="column">
        {/* Header */}
        <Box marginBottom={1} justifyContent="center">
          <Text bold color="cyan">
            八相 ASPECT LOADOUT
          </Text>
        </Box>

        {/* Primary Slot (locked) */}
        <Box marginBottom={1} paddingX={2} flexDirection="column">
          <Text bold color="yellow">
            PRIMARY (Path-Locked):
          </Text>
          <Box paddingLeft={2} marginTop={1}>
            <AspectSlot aspect={loadout.primary} locked />
          </Box>
        </Box>

        {/* Secondary Slots */}
        <Box marginBottom={1} paddingX={2} flexDirection="column">
          <Text bold color="yellow">
            SECONDARY SLOTS:
          </Text>

          {/* Slot 1 */}
          <Box paddingLeft={2} marginTop={1}>
            <Text dimColor>Slot 1: </Text>
            {loadout.secondary.slot1 ? (
              <AspectSlot aspect={loadout.secondary.slot1} />
            ) : (
              <Text dimColor italic>
                [Empty - {player.trainingProgress && player.trainingProgress.masteryPoints >= 50 ? 'Press 1 to equip' : 'Unlocks at 50 mastery'}]
              </Text>
            )}
          </Box>

          {/* Slot 2 */}
          <Box paddingLeft={2} marginTop={1}>
            <Text dimColor>Slot 2: </Text>
            {loadout.secondary.slot2 ? (
              <AspectSlot aspect={loadout.secondary.slot2} />
            ) : (
              <Text dimColor italic>
                [Empty - {currentChapter >= 1 ? 'Press 2 to equip' : 'Unlocks in Chapter 1'}]
              </Text>
            )}
          </Box>

          {/* Slot 3 */}
          <Box paddingLeft={2} marginTop={1}>
            <Text dimColor>Slot 3: </Text>
            {loadout.secondary.slot3 ? (
              <AspectSlot aspect={loadout.secondary.slot3} />
            ) : (
              <Text dimColor italic>
                [Empty - {currentChapter >= 2 ? 'Press 3 to equip' : 'Unlocks in Chapter 2'}]
              </Text>
            )}
          </Box>
        </Box>

        {/* Unlocked Aspects */}
        <Box marginTop={1} paddingX={2} flexDirection="column">
          <Text bold color="yellow">
            UNLOCKED ASPECTS ({loadout.unlocked.length}/8):
          </Text>
          <Box paddingLeft={2} marginTop={1} flexDirection="column">
            {loadout.unlocked.map((aspect) => (
              <Box key={aspect} marginBottom={1}>
                <AspectInfo aspect={aspect} />
              </Box>
            ))}
          </Box>
        </Box>

        {/* Available to Unlock */}
        {ASPECT_UNLOCK_TREE.filter((unlock) => {
          if (loadout.unlocked.includes(unlock.aspect)) return false;
          const canUnlock = canUnlockAspect(player, unlock.aspect, currentChapter, {});
          return canUnlock;
        }).length > 0 && (
          <Box marginTop={1} paddingX={2} flexDirection="column">
            <Text bold color="green">
              AVAILABLE TO UNLOCK:
            </Text>
            <Box paddingLeft={2} marginTop={1} flexDirection="column">
              {ASPECT_UNLOCK_TREE.filter((unlock) => {
                if (loadout.unlocked.includes(unlock.aspect)) return false;
                const canUnlock = canUnlockAspect(player, unlock.aspect, currentChapter, {});
                return canUnlock;
              }).map((unlock) => (
                <Box key={unlock.aspect} marginBottom={1}>
                  <Text color="green">• </Text>
                  <AspectInfo aspect={unlock.aspect} />
                </Box>
              ))}
            </Box>
          </Box>
        )}

        {/* Locked Aspects */}
        {ASPECT_UNLOCK_TREE.filter((unlock) => {
          if (loadout.unlocked.includes(unlock.aspect)) return false;
          const canUnlock = canUnlockAspect(player, unlock.aspect, currentChapter, {});
          return !canUnlock;
        }).length > 0 && (
          <Box marginTop={1} paddingX={2} flexDirection="column">
            <Text bold dimColor>
              LOCKED:
            </Text>
            <Box paddingLeft={2} marginTop={1} flexDirection="column">
              {ASPECT_UNLOCK_TREE.filter((unlock) => {
                if (loadout.unlocked.includes(unlock.aspect)) return false;
                const canUnlock = canUnlockAspect(player, unlock.aspect, currentChapter, {});
                return !canUnlock;
              }).map((unlock) => {
                const req = unlock.requirements;
                let requirementText = '';
                if (req.pathPercentage) {
                  requirementText = `${req.pathPercentage.min}% ${req.pathPercentage.path}`;
                } else if (req.masteryPoints) {
                  requirementText = `${req.masteryPoints} mastery`;
                } else if (req.chapter) {
                  requirementText = `Chapter ${req.chapter}`;
                }
                return (
                  <Box key={unlock.aspect} marginBottom={1} flexDirection="column">
                    <Box>
                      <Text dimColor>• </Text>
                      <Text dimColor>{ASPECT_LABELS[unlock.aspect]}</Text>
                    </Box>
                    {requirementText && (
                      <Box paddingLeft={4}>
                        <Text dimColor italic>
                          (Requires: {requirementText})
                        </Text>
                      </Box>
                    )}
                  </Box>
                );
              })}
            </Box>
          </Box>
        )}

        {/* Instructions */}
        {onEquipAspect && (
          <Box marginTop={2} justifyContent="center">
            <Text dimColor italic>
              Press 1/2/3 to change slots • ESC to close
            </Text>
          </Box>
        )}
      </Box>
    );
  }

  // Slot selection mode (slot1/slot2/slot3)
  // TODO: Implement slot selection UI
  return <Text>Slot selection coming soon...</Text>;
};

/**
 * Individual aspect slot display
 */
const AspectSlot: React.FC<{ aspect: ChiAspect; locked?: boolean }> = ({ aspect, locked }) => {
  const bonus = ASPECT_BONUSES[aspect];
  const color = ASPECT_COLORS[aspect];

  return (
    <Box flexDirection="column">
      <Box>
        <Text bold color={color}>
          {ASPECT_LABELS[aspect]}
        </Text>
        {locked && (
          <Text dimColor italic>
            {' '}
            (locked)
          </Text>
        )}
      </Box>
      <Box paddingLeft={2}>
        <Text dimColor>{bonus.description}</Text>
      </Box>
    </Box>
  );
};

/**
 * Aspect info display (name + effect)
 */
const AspectInfo: React.FC<{ aspect: ChiAspect }> = ({ aspect }) => {
  const bonus = ASPECT_BONUSES[aspect];
  const color = ASPECT_COLORS[aspect];

  return (
    <Box>
      <Text bold color={color}>
        {ASPECT_LABELS[aspect]}:
      </Text>
      <Text dimColor> {bonus.description}</Text>
    </Box>
  );
};
