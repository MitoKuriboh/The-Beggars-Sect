/**
 * Action Menu
 * Player action selection during combat
 */

import React, { useCallback } from 'react';
import { Box, Text } from 'ink';
import { SelectInputComponent } from '../components/SelectInputWrapper';
import { MenuContainer } from '../components/MenuContainer';
import { useMenuNavigation } from '../hooks/useMenuNavigation';

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
  const items: ActionMenuItem[] = [
    { label: 'Attack', value: 'attack' },
    { label: 'Technique', value: 'technique' },
    { label: 'Stance', value: 'stance' },
  ];

  if (canFlee) {
    items.push({ label: 'Flee', value: 'flee' });
  }

  const { selectedIndex } = useMenuNavigation({
    itemCount: items.length,
    onSelect: (index) => {
      if (!disabled && items[index]) {
        onSelect(items[index].value);
      }
    },
    disabled,
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
    <MenuContainer
      title="Your Action"
      titleIcon="⚡"
      color="cyan"
      width={70}
      footer={`${ACTION_HINTS[selectedAction]} • SPACE or ENTER to select`}
    >
      <SelectInputComponent
        items={items}
        onSelect={handleSelect}
      />
    </MenuContainer>
  );
});
