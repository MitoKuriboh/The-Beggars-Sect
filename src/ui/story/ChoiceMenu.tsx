/**
 * Choice Menu
 * Displays story choices for player selection
 */

import React, { useCallback } from "react";
import { Box, Text } from "ink";
import type { Choice } from "../../types/index";
import { SelectInputComponent } from "../components/SelectInputWrapper";
import { useMenuNavigation } from "../hooks/useMenuNavigation";

interface ChoiceMenuItem {
  label: string;
  value: string;
}

interface ChoiceMenuProps {
  choices: Choice[];
  onSelect: (choiceId: string) => void;
  prompt?: string;
}

// Helper to get color for path tags (reserved for future use)
function _getPathColor(tag?: string): "red" | "cyan" | "magenta" | "white" {
  if (!tag) return "white";
  const lower = tag.toLowerCase();
  if (lower.includes("blade")) return "red";
  if (lower.includes("stream")) return "cyan";
  if (lower.includes("shadow")) return "magenta";
  return "white";
}

export const ChoiceMenu: React.FC<ChoiceMenuProps> = React.memo(
  ({ choices, onSelect, prompt }) => {
    const items: ChoiceMenuItem[] = choices.map((choice) => ({
      label: choice.tag ? `${choice.label} (${choice.tag})` : choice.label,
      value: choice.id,
    }));

    const { selectedIndex: _selectedIndex } = useMenuNavigation({
      itemCount: items.length,
      onSelect: (index) => {
        const selectedItem = items[index];
        if (selectedItem) {
          onSelect(selectedItem.value);
        }
      },
      circular: true,
    });

    const handleSelect = useCallback(
      (item: ChoiceMenuItem) => {
        onSelect(item.value);
      },
      [onSelect],
    );

    return (
      <Box flexDirection="column" marginTop={2}>
        {prompt && prompt.length > 0 ? (
          <Box
            marginBottom={2}
            borderStyle="round"
            borderColor="yellow"
            paddingX={2}
            paddingY={1}
            justifyContent="center"
          >
            <Text color="yellow" bold>
              {prompt}
            </Text>
          </Box>
        ) : null}

        <Box
          borderStyle="single"
          borderColor="gray"
          paddingX={3}
          paddingY={2}
          flexDirection="column"
        >
          <SelectInputComponent items={items} onSelect={handleSelect} />
        </Box>
        <Box marginTop={1} justifyContent="center">
          <Text dimColor italic>
            SPACE or ENTER to select • ↑↓ to navigate
          </Text>
        </Box>
      </Box>
    );
  },
);
