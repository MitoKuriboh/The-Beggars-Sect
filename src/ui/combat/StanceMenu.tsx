/**
 * Stance Selection Menu
 * Switch between combat stances
 */

import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import type { Stance } from '../../types/index';

interface StanceMenuProps {
  currentStance: Stance;
  onSelect: (stance: Stance) => void;
  onBack: () => void;
}

const STANCES: Array<{ value: Stance; label: string; icon: string; desc: string }> = [
  {
    value: 'flowing',
    label: 'Flowing (流)',
    icon: '🌊',
    desc: 'Balanced - No modifiers',
  },
  {
    value: 'weathered',
    label: 'Weathered (风雨)',
    icon: '🏔️',
    desc: 'DEF +50%, Chi +30%, ATK -10%, SPD -20%',
  },
  {
    value: 'hungry',
    label: 'Hungry (饿)',
    icon: '🔥',
    desc: 'ATK +30%, SPD +10%, Chi +50%, DEF -30%',
  },
];

export const StanceMenu: React.FC<StanceMenuProps> = React.memo(({
  currentStance,
  onSelect,
  onBack,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useInput((input, key) => {
    if (key.escape) {
      onBack();
      return;
    }

    if (key.upArrow) {
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : STANCES.length - 1));
    } else if (key.downArrow) {
      setSelectedIndex((prev) => (prev < STANCES.length - 1 ? prev + 1 : 0));
    } else if (key.return || input === ' ') {
      const selected = STANCES[selectedIndex];
      if (selected) {
        onSelect(selected.value);
      }
    }
  });

  const selectedStance = STANCES[selectedIndex];

  return (
    <Box flexDirection="column">
      <Box marginBottom={1} justifyContent="center">
        <Text bold color="cyan">⚡ Select Stance</Text>
      </Box>

      <Box marginBottom={1} justifyContent="center">
        <Text dimColor>Current: </Text>
        <Text color="cyan" bold>{currentStance}</Text>
      </Box>

      {/* Main Layout: Stances centered, effects below */}
      <Box flexDirection="column" alignItems="center">
        {/* Stance Options */}
        <Box flexDirection="column" marginBottom={2}>
          {STANCES.map((stance, index) => {
            const isSelected = index === selectedIndex;
            const isCurrent = stance.value === currentStance;

            return (
              <Box key={stance.value} justifyContent="center">
                <Text
                  color={isSelected ? 'cyan' : 'white'}
                  bold={isSelected}
                  inverse={isSelected}
                >
                  {isSelected ? '▸ ' : '  '}
                  {stance.icon} {stance.label}
                  {isCurrent ? ' [CURRENT]' : ''}
                </Text>
              </Box>
            );
          })}
        </Box>

        {/* Dynamic Description Box - Below */}
        <Box
          borderStyle="round"
          borderColor="cyan"
          paddingX={2}
          paddingY={1}
          flexDirection="column"
          alignItems="center"
          width={50}
          minHeight={5}
        >
          {selectedStance && (
            <>
              <Text color="cyan" bold>
                {selectedStance.icon} {selectedStance.label}
              </Text>
              <Text dimColor italic>
                {selectedStance.desc}
              </Text>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
});
