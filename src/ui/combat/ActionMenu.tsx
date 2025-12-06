/**
 * Action Menu
 * Player action selection during combat
 */

import React, { useCallback } from 'react';
import { Box, Text } from 'ink';
import SelectInput from 'ink-select-input';

const SelectInputComponent = (SelectInput as any).default || SelectInput;

export type ActionType = 'attack' | 'technique' | 'defend' | 'chi-focus' | 'stance' | 'flee';

interface ActionMenuItem {
  label: string;
  value: ActionType;
}

interface ActionMenuProps {
  onSelect: (action: ActionType) => void;
  canFlee?: boolean;
  disabled?: boolean;
}

export const ActionMenu: React.FC<ActionMenuProps> = ({
  onSelect,
  canFlee = true,
  disabled = false,
}) => {
  const items: ActionMenuItem[] = [
    { label: '⚔️  Attack', value: 'attack' },
    { label: '✨ Technique', value: 'technique' },
    { label: '🛡️  Defend', value: 'defend' },
    { label: '🧘 Chi Focus', value: 'chi-focus' },
    { label: '🔄 Stance', value: 'stance' },
  ];

  if (canFlee) {
    items.push({ label: '🏃 Flee', value: 'flee' });
  }

  const handleSelect = useCallback(
    (item: ActionMenuItem) => {
      if (!disabled) {
        onSelect(item.value);
      }
    },
    [disabled, onSelect]
  );

  if (disabled) {
    return (
      <Box flexDirection="column">
        <Text dimColor italic>
          Waiting...
        </Text>
      </Box>
    );
  }

  return (
    <Box flexDirection="column">
      <Text bold color="yellow">
        Choose Action:
      </Text>
      <Box marginTop={1}>
        <SelectInputComponent items={items} onSelect={handleSelect} />
      </Box>
    </Box>
  );
};
