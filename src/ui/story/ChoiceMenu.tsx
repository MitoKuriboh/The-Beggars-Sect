/**
 * Choice Menu
 * Displays story choices for player selection
 */

import React, { useCallback, useState } from 'react';
import { Box, Text, useInput } from 'ink';
import SelectInput from 'ink-select-input';
import type { Choice } from '../../types/index';

const SelectInputComponent = (SelectInput as any).default || SelectInput;

interface ChoiceMenuItem {
  label: string;
  value: string;
}

interface ChoiceMenuProps {
  choices: Choice[];
  onSelect: (choiceId: string) => void;
  prompt?: string;
}

// Helper to get color for path tags
function getPathColor(tag?: string): 'red' | 'cyan' | 'magenta' | 'white' {
  if (!tag) return 'white';
  const lower = tag.toLowerCase();
  if (lower.includes('blade')) return 'red';
  if (lower.includes('stream')) return 'cyan';
  if (lower.includes('shadow')) return 'magenta';
  return 'white';
}

export const ChoiceMenu: React.FC<ChoiceMenuProps> = React.memo(({
  choices,
  onSelect,
  prompt,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const items: ChoiceMenuItem[] = choices.map((choice) => ({
    label: choice.tag
      ? `${choice.label} (${choice.tag})`
      : choice.label,
    value: choice.id,
  }));

  // Handle spacebar to confirm selection
  useInput((input, key) => {
    if (input === ' ' && !key.return) {
      const selectedItem = items[selectedIndex];
      if (selectedItem) {
        onSelect(selectedItem.value);
      }
    }
  });

  const handleSelect = useCallback(
    (item: ChoiceMenuItem) => {
      onSelect(item.value);
    },
    [onSelect]
  );

  return (
    <Box flexDirection="column" marginTop={2}>
      {prompt && prompt.length > 0 ? (
        <Box marginBottom={2} borderStyle="round" borderColor="yellow" paddingX={2} paddingY={1} justifyContent="center">
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
        <SelectInputComponent items={items} onSelect={handleSelect} onHighlight={(item: ChoiceMenuItem) => {
          const index = items.findIndex(i => i.value === item.value);
          if (index >= 0) setSelectedIndex(index);
        }} />
      </Box>
      <Box marginTop={1} justifyContent="center">
        <Text dimColor italic>SPACE or ENTER to select  •  ↑↓ to navigate</Text>
      </Box>
    </Box>
  );
});
