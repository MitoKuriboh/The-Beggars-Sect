/**
 * Choice Menu
 * Displays story choices for player selection
 */

import React, { useCallback } from 'react';
import { Box, Text } from 'ink';
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

export const ChoiceMenu: React.FC<ChoiceMenuProps> = ({
  choices,
  onSelect,
  prompt,
}) => {
  const items: ChoiceMenuItem[] = choices.map((choice) => ({
    label: choice.tag
      ? `${choice.label} (${choice.tag})`
      : choice.label,
    value: choice.id,
  }));

  const handleSelect = useCallback(
    (item: ChoiceMenuItem) => {
      onSelect(item.value);
    },
    [onSelect]
  );

  return (
    <Box flexDirection="column" marginTop={1}>
      {prompt && prompt.length > 0 && (
        <Box marginBottom={1}>
          <Text color="yellow" bold>
            {prompt}
          </Text>
        </Box>
      )}

      <Box
        borderStyle="single"
        borderColor="gray"
        paddingX={2}
        paddingY={1}
        flexDirection="column"
      >
        <SelectInputComponent items={items} onSelect={handleSelect} />
      </Box>
    </Box>
  );
};
