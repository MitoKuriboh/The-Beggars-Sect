/**
 * Reusable Menu Components
 * Consistent menu styling and behavior with atmospheric effects
 */

import React, { useState, useEffect, useRef } from "react";
import { Box, Text } from "ink";
import SelectInput from "ink-select-input";
import { atmosphericColors, animationTiming } from "../theme/colors";

// Module interop: ink-select-input may export as .default depending on bundler
// Using 'any' is necessary here because the library's Item type uses 'unknown'
// which conflicts with our stricter MenuItem type (value: string vs value: unknown)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  /** Enable pulsing glow effect on selected item */
  pulseSelected?: boolean;
}

// =============================================================================
// COMPONENTS
// =============================================================================

/**
 * Styled Menu with SelectInput
 * Handles centering and consistent styling
 * Automatically dims disabled items (value starts with 'disabled-')
 * Optional pulsing glow effect on selected item
 */
export const SelectMenu: React.FC<SelectMenuProps> = ({
  items,
  onSelect,
  centered = true,
  pulseSelected = true,
}) => {
  // Pulse state for selected item glow
  const [pulseOn, setPulseOn] = useState(true);
  const pulseIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Start pulse interval
  useEffect(() => {
    if (pulseSelected) {
      pulseIntervalRef.current = setInterval(() => {
        setPulseOn((prev) => !prev);
      }, animationTiming.pulseInterval);
    }

    return () => {
      if (pulseIntervalRef.current) {
        clearInterval(pulseIntervalRef.current);
      }
    };
  }, [pulseSelected]);

  // Create a map to track which labels are disabled
  const disabledLabels = new Set(
    items
      .filter((item) => item.value.startsWith("disabled-"))
      .map((item) => item.label),
  );

  // Custom item component that shows disabled items as dimmed
  // and selected items with optional pulsing glow
  const itemComponent = ({
    isSelected,
    label,
  }: {
    isSelected: boolean;
    label: string;
  }) => {
    const isDisabled = disabledLabels.has(label);

    // Determine colour based on state
    let color: string | undefined;
    let bold = false;

    if (isDisabled) {
      color = "gray";
    } else if (isSelected) {
      // Pulsing effect: alternate between bright and normal
      color =
        pulseSelected && pulseOn ? "cyanBright" : atmosphericColors.menuGlow;
      bold = pulseSelected && pulseOn;
    }

    // Selector indicator with glow effect
    const selector = isSelected
      ? pulseSelected && pulseOn
        ? "▸ "
        : "› "
      : "  ";

    return (
      <Text color={color} dimColor={isDisabled} bold={bold}>
        {selector}
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
