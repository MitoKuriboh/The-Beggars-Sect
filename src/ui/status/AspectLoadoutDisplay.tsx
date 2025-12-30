/**
 * Aspect Loadout Display Component
 * Shows equipped aspects and allows changing secondary slot loadouts
 */

import React, { useState, useCallback } from "react";
import { Box, Text, useInput } from "ink";
import type { Character, ChiAspect } from "../../types/index";
import {
  ASPECT_BONUSES,
  canUnlockAspect,
  ASPECT_UNLOCK_TREE,
} from "../../game/systems/AspectSystem";

interface AspectLoadoutDisplayProps {
  player: Character;
  currentChapter: number;
  onEquipAspect?: (
    slot: "slot1" | "slot2" | "slot3",
    aspect: ChiAspect | null,
  ) => void;
}

type ViewMode = "display" | "slot1" | "slot2" | "slot3";

const ASPECT_LABELS: Record<ChiAspect, string> = {
  force: "力 FORCE",
  flow: "流 FLOW",
  precision: "准 PRECISION",
  burst: "爆 BURST",
  armor: "甲 ARMOR",
  sense: "感 SENSE",
  will: "意 WILL",
  inverse: "逆 INVERSE",
};

const ASPECT_COLORS: Record<ChiAspect, string> = {
  force: "red",
  flow: "cyan",
  precision: "yellow",
  burst: "magenta",
  armor: "green",
  sense: "blue",
  will: "white",
  inverse: "redBright",
};

export const AspectLoadoutDisplay: React.FC<AspectLoadoutDisplayProps> = ({
  player,
  currentChapter,
  onEquipAspect,
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>("display");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const loadout = player.aspectLoadout;

  // Check slot unlock conditions
  const isSlot1Available =
    player.trainingProgress && player.trainingProgress.masteryPoints >= 50;
  const isSlot2Available = currentChapter >= 1;
  const isSlot3Available = currentChapter >= 2;

  // Get aspects available for equipping (unlocked but not primary)
  const availableAspects = loadout
    ? loadout.unlocked.filter((a) => a !== loadout.primary)
    : [];

  // Handle aspect selection for current slot
  const handleSelectAspect = useCallback(
    (aspect: ChiAspect | null) => {
      if (viewMode !== "display" && onEquipAspect) {
        onEquipAspect(viewMode as "slot1" | "slot2" | "slot3", aspect);
        setViewMode("display");
        setSelectedIndex(0);
      }
    },
    [viewMode, onEquipAspect],
  );

  // Input handling
  useInput((input, key) => {
    // In display mode, handle slot selection
    if (viewMode === "display") {
      if (input === "1" && isSlot1Available && onEquipAspect) {
        setViewMode("slot1");
        setSelectedIndex(0);
      } else if (input === "2" && isSlot2Available && onEquipAspect) {
        setViewMode("slot2");
        setSelectedIndex(0);
      } else if (input === "3" && isSlot3Available && onEquipAspect) {
        setViewMode("slot3");
        setSelectedIndex(0);
      }
      return;
    }

    // In slot selection mode
    if (key.upArrow) {
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : availableAspects.length,
      ); // +1 for "Empty" option
    } else if (key.downArrow) {
      setSelectedIndex((prev) =>
        prev < availableAspects.length ? prev + 1 : 0,
      );
    } else if (key.return) {
      // Select the current option
      if (selectedIndex === 0) {
        handleSelectAspect(null); // Empty slot
      } else {
        handleSelectAspect(availableAspects[selectedIndex - 1] ?? null);
      }
    } else if (key.escape || input === "q") {
      setViewMode("display");
      setSelectedIndex(0);
    }
  });

  if (!loadout) {
    return (
      <Box flexDirection="column" paddingX={2}>
        <Text dimColor>Aspect loadout not initialized.</Text>
      </Box>
    );
  }

  // Display mode - show current loadout
  if (viewMode === "display") {
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
                [Empty -{" "}
                {player.trainingProgress &&
                player.trainingProgress.masteryPoints >= 50
                  ? "Press 1 to equip"
                  : "Unlocks at 50 mastery"}
                ]
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
                [Empty -{" "}
                {currentChapter >= 1
                  ? "Press 2 to equip"
                  : "Unlocks in Chapter 1"}
                ]
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
                [Empty -{" "}
                {currentChapter >= 2
                  ? "Press 3 to equip"
                  : "Unlocks in Chapter 2"}
                ]
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
          const canUnlock = canUnlockAspect(
            player,
            unlock.aspect,
            currentChapter,
            {},
          );
          return canUnlock;
        }).length > 0 && (
          <Box marginTop={1} paddingX={2} flexDirection="column">
            <Text bold color="green">
              AVAILABLE TO UNLOCK:
            </Text>
            <Box paddingLeft={2} marginTop={1} flexDirection="column">
              {ASPECT_UNLOCK_TREE.filter((unlock) => {
                if (loadout.unlocked.includes(unlock.aspect)) return false;
                const canUnlock = canUnlockAspect(
                  player,
                  unlock.aspect,
                  currentChapter,
                  {},
                );
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
          const canUnlock = canUnlockAspect(
            player,
            unlock.aspect,
            currentChapter,
            {},
          );
          return !canUnlock;
        }).length > 0 && (
          <Box marginTop={1} paddingX={2} flexDirection="column">
            <Text bold dimColor>
              LOCKED:
            </Text>
            <Box paddingLeft={2} marginTop={1} flexDirection="column">
              {ASPECT_UNLOCK_TREE.filter((unlock) => {
                if (loadout.unlocked.includes(unlock.aspect)) return false;
                const canUnlock = canUnlockAspect(
                  player,
                  unlock.aspect,
                  currentChapter,
                  {},
                );
                return !canUnlock;
              }).map((unlock) => {
                const req = unlock.requirements;
                let requirementText = "";
                if (req.pathPercentage) {
                  requirementText = `${req.pathPercentage.min}% ${req.pathPercentage.path}`;
                } else if (req.masteryPoints) {
                  requirementText = `${req.masteryPoints} mastery`;
                } else if (req.chapter) {
                  requirementText = `Chapter ${req.chapter}`;
                }
                return (
                  <Box
                    key={unlock.aspect}
                    marginBottom={1}
                    flexDirection="column"
                  >
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
  const slotNumber = viewMode.replace("slot", "");
  const currentSlotAspect =
    loadout.secondary[viewMode as keyof typeof loadout.secondary];

  return (
    <Box flexDirection="column">
      {/* Header */}
      <Box marginBottom={1} justifyContent="center">
        <Text bold color="cyan">
          ☯ SELECT ASPECT FOR SLOT {slotNumber} ☯
        </Text>
      </Box>

      {/* Current selection */}
      {currentSlotAspect && (
        <Box marginBottom={1} paddingX={2}>
          <Text dimColor>Current: </Text>
          <Text bold color={ASPECT_COLORS[currentSlotAspect]}>
            {ASPECT_LABELS[currentSlotAspect]}
          </Text>
        </Box>
      )}

      {/* Divider */}
      <Box marginY={1} justifyContent="center">
        <Text dimColor>─────────── ◆ ───────────</Text>
      </Box>

      {/* Options list */}
      <Box flexDirection="column" paddingX={2}>
        {/* Empty option (first) */}
        <Box marginBottom={1}>
          <Text color={selectedIndex === 0 ? "cyanBright" : undefined}>
            {selectedIndex === 0 ? "▸ " : "  "}
          </Text>
          <Text
            color={selectedIndex === 0 ? "cyanBright" : "gray"}
            italic={selectedIndex !== 0}
          >
            [Empty - Remove Aspect]
          </Text>
        </Box>

        {/* Available aspects */}
        {availableAspects.map((aspect, index) => {
          const isSelected = selectedIndex === index + 1;
          const bonus = ASPECT_BONUSES[aspect];
          const color = isSelected ? "cyanBright" : ASPECT_COLORS[aspect];

          return (
            <Box key={aspect} marginBottom={1} flexDirection="column">
              <Box>
                <Text color={isSelected ? "cyanBright" : undefined}>
                  {isSelected ? "▸ " : "  "}
                </Text>
                <Text bold color={color}>
                  {ASPECT_LABELS[aspect]}
                </Text>
              </Box>
              <Box paddingLeft={4}>
                <Text dimColor>{bonus.description}</Text>
              </Box>
            </Box>
          );
        })}

        {/* No aspects available */}
        {availableAspects.length === 0 && (
          <Box marginY={1}>
            <Text dimColor italic>
              No additional aspects unlocked yet.
            </Text>
          </Box>
        )}
      </Box>

      {/* Divider */}
      <Box marginY={1} justifyContent="center">
        <Text dimColor>─────────── ◆ ───────────</Text>
      </Box>

      {/* Instructions */}
      <Box justifyContent="center">
        <Text dimColor italic>
          ↑↓ Navigate • Enter Select • ESC Cancel
        </Text>
      </Box>
    </Box>
  );
};

/**
 * Individual aspect slot display
 */
const AspectSlot: React.FC<{ aspect: ChiAspect; locked?: boolean }> = ({
  aspect,
  locked,
}) => {
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
            {" "}
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
