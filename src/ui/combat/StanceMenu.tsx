/**
 * Stance Selection Menu
 * Switch between combat stances
 */

import React, { useCallback } from 'react';
import { Box, Text, useInput } from 'ink';
import SelectInput from 'ink-select-input';
import type { Stance } from '../../types/index';
import { STANCE_MODIFIERS } from '../../types/character';

const SelectInputComponent = (SelectInput as any).default || SelectInput;

interface StanceMenuItem {
  label: string;
  value: Stance;
}

interface StanceMenuProps {
  currentStance: Stance;
  onSelect: (stance: Stance) => void;
  onBack: () => void;
}

const STANCE_DESCRIPTIONS: Record<Stance, string> = {
  flowing: 'Balanced - No bonuses or penalties',
  weathered: 'Defensive - +50% DEF, +30% chi gen, -10% ATK, -20% SPD',
  hungry: 'Aggressive - +30% ATK, +10% SPD, +50% chi gen, -30% DEF',
};

export const StanceMenu: React.FC<StanceMenuProps> = ({
  currentStance,
  onSelect,
  onBack,
}) => {
  useInput((input, key) => {
    if (key.escape) {
      onBack();
    }
  });

  const items: StanceMenuItem[] = [
    { label: '🌊 Flowing (流)', value: 'flowing' },
    { label: '🏔️  Weathered (风雨)', value: 'weathered' },
    { label: '🔥 Hungry (饿)', value: 'hungry' },
  ];

  const handleSelect = useCallback(
    (item: StanceMenuItem) => {
      if (item.value !== currentStance) {
        onSelect(item.value);
      } else {
        onBack(); // Already in this stance
      }
    },
    [currentStance, onSelect, onBack]
  );

  return (
    <Box flexDirection="column">
      <Box marginBottom={1}>
        <Text bold color="yellow">
          Select Stance
        </Text>
        <Text dimColor> (ESC to go back)</Text>
      </Box>

      <Box marginBottom={1}>
        <Text>
          Current: <Text color="cyan">{currentStance}</Text>
        </Text>
      </Box>

      <SelectInputComponent items={items} onSelect={handleSelect} />

      <Box marginTop={1} flexDirection="column">
        {items.map((item) => (
          <Box key={item.value}>
            <Text dimColor>
              {item.value === currentStance ? '→ ' : '  '}
              {STANCE_DESCRIPTIONS[item.value]}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
