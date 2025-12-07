/**
 * Technique Selection Menu
 * Shows available techniques with chi costs
 */

import React, { useCallback } from 'react';
import { Box, Text, useInput } from 'ink';
import SelectInput from 'ink-select-input';
import type { Technique } from '../../types/index';
import { canUseTechnique } from '../../game/combat/TechniqueRegistry';

const SelectInputComponent = (SelectInput as any).default || SelectInput;

interface TechniqueMenuItem {
  label: string;
  value: string;
  technique: Technique;
  canUse: boolean;
  reason?: string;
}

interface TechniqueMenuProps {
  techniques: Technique[];
  currentChi: number;
  currentStance: string;
  comboActive: boolean;
  comboTechniques: string[];
  onSelect: (technique: Technique) => void;
  onBack: () => void;
}

export const TechniqueMenu: React.FC<TechniqueMenuProps> = React.memo(({
  techniques,
  currentChi,
  currentStance,
  comboActive,
  comboTechniques,
  onSelect,
  onBack,
}) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  // Handle keyboard input
  useInput((input, key) => {
    if (key.escape) {
      onBack();
      return;
    }

    const maxSlots = 4;
    const availableCount = techniques.length;

    if (key.upArrow) {
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : maxSlots - 1));
    } else if (key.downArrow) {
      setSelectedIndex((prev) => (prev < maxSlots - 1 ? prev + 1 : 0));
    } else if ((key.return || input === ' ') && selectedIndex < availableCount) {
      const tech = techniques[selectedIndex];
      if (tech) {
        const { canUse } = canUseTechnique(tech, currentStance, currentChi);
        if (canUse) {
          onSelect(tech);
        }
      }
    }
  });

  const selectedTech = techniques[selectedIndex];

  return (
    <Box flexDirection="column" borderStyle="round" borderColor="magenta" paddingX={2} paddingY={1} alignItems="center" width={70} minHeight={14}>
      <Box marginBottom={1}>
        <Text bold color="magenta">
          ✨ Techniques
        </Text>
      </Box>

      {/* 4 Technique Slots */}
      <Box flexDirection="column" marginBottom={1}>
        {[0, 1, 2, 3].map((slotIndex) => {
          const tech = techniques[slotIndex];
          const isSelected = slotIndex === selectedIndex;

          if (!tech) {
            // Empty slot
            return (
              <Box key={slotIndex}>
                <Text dimColor inverse={isSelected}>
                  {isSelected ? '▸ ' : '  '}─
                </Text>
              </Box>
            );
          }

          const { canUse } = canUseTechnique(tech, currentStance, currentChi);
          const comboMarker = comboActive && tech.comboRole === 'finisher' ? '★' : tech.comboRole === 'starter' ? '◆' : '';

          return (
            <Box key={slotIndex}>
              <Text
                color={canUse ? (isSelected ? 'cyan' : 'white') : 'gray'}
                bold={isSelected}
                inverse={isSelected}
                dimColor={!canUse}
              >
                {isSelected ? '▸ ' : '  '}
                {tech.name.padEnd(20)} {comboMarker} {tech.chiCost > 0 ? `${tech.chiCost} Chi` : 'Free'}
              </Text>
            </Box>
          );
        })}
      </Box>

      {/* Selected Technique Details */}
      <Box borderStyle="single" borderColor="cyan" paddingX={1} width={60} minHeight={5}>
        <Text dimColor italic wrap="wrap">{selectedTech?.description || 'No description available'}</Text>
      </Box>

      <Box marginTop={1} height={1}>
        {comboActive && (
          <Text color="magenta" bold>⚡ COMBO x{comboTechniques.length} - ★ = Finisher!</Text>
        )}
      </Box>
    </Box>
  );
});
