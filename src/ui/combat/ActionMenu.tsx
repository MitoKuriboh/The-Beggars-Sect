/**
 * Action Menu
 * Player action selection during combat
 */

import React, { useCallback } from 'react';
import { Box, Text, useInput } from 'ink';
import SelectInput from 'ink-select-input';

const SelectInputComponent = (SelectInput as any).default || SelectInput;

export type ActionType = 'attack' | 'technique' | 'stance' | 'flee';

interface ActionMenuItem {
  label: string;
  value: ActionType;
}

interface ActionMenuProps {
  onSelect: (action: ActionType) => void;
  canFlee?: boolean;
  disabled?: boolean;
}

const ACTION_HINTS: Record<ActionType, string> = {
  attack: 'Basic physical attack',
  technique: 'Use learned techniques (costs Chi)',
  stance: 'Change combat stance',
  flee: 'Attempt to escape from battle',
};

export const ActionMenu: React.FC<ActionMenuProps> = React.memo(({
  onSelect,
  canFlee = true,
  disabled = false,
}) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const items: ActionMenuItem[] = [
    { label: 'Attack', value: 'attack' },
    { label: 'Technique', value: 'technique' },
    { label: 'Stance', value: 'stance' },
  ];

  if (canFlee) {
    items.push({ label: 'Flee', value: 'flee' });
  }

  // Handle spacebar to confirm selection
  useInput((input, key) => {
    if (disabled) return;

    if (input === ' ' && !key.return) {
      const selectedItem = items[selectedIndex];
      if (selectedItem) {
        onSelect(selectedItem.value);
      }
    }
  });

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

  const selectedAction = items[selectedIndex]?.value || 'attack';

  return (
    <Box flexDirection="column" borderStyle="round" borderColor="cyan" paddingX={2} paddingY={1} alignItems="center" width={70}>
      <Box marginBottom={1}>
        <Text bold color="cyan">
          ⚡ Your Action
        </Text>
      </Box>
      <Box>
        <SelectInputComponent items={items} onSelect={handleSelect} onHighlight={(item: ActionMenuItem) => {
          const index = items.findIndex(i => i.value === item.value);
          if (index >= 0) setSelectedIndex(index);
        }} />
      </Box>
      <Box marginTop={1} height={1}>
        <Text dimColor italic>{ACTION_HINTS[selectedAction]} • SPACE or ENTER to select</Text>
      </Box>
    </Box>
  );
});
