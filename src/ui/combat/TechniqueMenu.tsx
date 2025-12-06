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

export const TechniqueMenu: React.FC<TechniqueMenuProps> = ({
  techniques,
  currentChi,
  currentStance,
  comboActive,
  comboTechniques,
  onSelect,
  onBack,
}) => {
  // Handle escape to go back
  useInput((input, key) => {
    if (key.escape) {
      onBack();
    }
  });

  // Build menu items with usability info
  const items: TechniqueMenuItem[] = techniques.map((tech) => {
    const { canUse, reason } = canUseTechnique(tech, currentStance, currentChi);

    // Highlight combo hints
    let comboHint = '';
    if (comboActive) {
      if (tech.comboRole === 'finisher') {
        comboHint = ' [FINISH]';
      } else if (tech.comboRole === 'followup') {
        comboHint = ' [COMBO]';
      }
    } else if (tech.comboRole === 'starter') {
      comboHint = ' [START]';
    }

    const chiText = tech.chiCost > 0 ? ` (${tech.chiCost} chi)` : ' (free)';
    const usableText = canUse ? '' : ` [${reason}]`;

    return {
      label: `${tech.name}${chiText}${comboHint}${usableText}`,
      value: tech.id,
      technique: tech,
      canUse,
      reason,
    };
  });

  const handleSelect = useCallback(
    (item: TechniqueMenuItem) => {
      if (item.canUse) {
        onSelect(item.technique);
      }
    },
    [onSelect]
  );

  // Custom item component for styling
  const ItemComponent: React.FC<{ isSelected: boolean; label: string }> = ({
    isSelected,
    label,
  }) => {
    const item = items.find((i) => i.label === label);
    const canUse = item?.canUse ?? false;

    return (
      <Text
        color={canUse ? (isSelected ? 'cyan' : 'white') : 'gray'}
        bold={isSelected}
        dimColor={!canUse}
      >
        {isSelected ? '> ' : '  '}
        {label}
      </Text>
    );
  };

  return (
    <Box flexDirection="column">
      <Box marginBottom={1}>
        <Text bold color="yellow">
          Select Technique
        </Text>
        <Text dimColor> (ESC to go back)</Text>
      </Box>

      <Box marginBottom={1}>
        <Text>
          Chi: <Text color="blue">{currentChi}</Text>
          {' | '}
          Stance: <Text color="cyan">{currentStance}</Text>
          {comboActive && (
            <>
              {' | '}
              <Text color="yellow">Combo x{comboTechniques.length}</Text>
            </>
          )}
        </Text>
      </Box>

      <SelectInputComponent
        items={items}
        onSelect={handleSelect}
        itemComponent={ItemComponent}
      />
    </Box>
  );
};
