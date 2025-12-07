/**
 * Reusable Menu Components
 * Consistent menu styling and behavior
 */

import React from 'react';
import { Box, Text } from 'ink';
import SelectInput from 'ink-select-input';

const SelectInputComponent = (SelectInput as any).default || SelectInput;

// =============================================================================
// TYPES
// =============================================================================

export interface MenuItem {
  label: string;
  value: string;
}

export interface SelectMenuProps {
  items: MenuItem[];
  onSelect: (item: MenuItem) => void;
  centered?: boolean;
}

// =============================================================================
// COMPONENTS
// =============================================================================

/**
 * Styled Menu with SelectInput
 * Handles centering and consistent styling
 * Automatically dims disabled items (value starts with 'disabled-')
 */
export const SelectMenu: React.FC<SelectMenuProps> = ({
  items,
  onSelect,
  centered = true,
}) => {
  // Create a map to track which labels are disabled
  const disabledLabels = new Set(
    items.filter(item => item.value.startsWith('disabled-')).map(item => item.label)
  );

  // Custom item component that shows disabled items as dimmed
  const itemComponent = ({ isSelected, label }: { isSelected: boolean; label: string }) => {
    const isDisabled = disabledLabels.has(label);

    return (
      <Text color={isDisabled ? 'gray' : isSelected ? 'cyan' : undefined} dimColor={isDisabled}>
        {isSelected ? '▸ ' : '  '}
        {label}
      </Text>
    );
  };

  if (centered) {
    return (
      <Box flexDirection="column" alignItems="center">
        <SelectInputComponent
          items={items}
          onSelect={onSelect}
          itemComponent={itemComponent}
        />
      </Box>
    );
  }

  return (
    <SelectInputComponent
      items={items}
      onSelect={onSelect}
      itemComponent={itemComponent}
    />
  );
};
