/**
 * Technique Selection Menu
 * Shows available techniques with chi costs
 */

import React from 'react';
import { Box, Text } from 'ink';
import type { Technique } from '../../types/index';
import { canUseTechnique } from '../../game/combat/TechniqueRegistry';
import { MenuContainer } from '../components/MenuContainer';
import { useMenuNavigation } from '../hooks/useMenuNavigation';
import { UI_CONFIG } from '../config/constants';

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
  const maxSlots = UI_CONFIG.menus.maxTechniqueSlots;

  const { selectedIndex } = useMenuNavigation({
    itemCount: maxSlots,
    onSelect: (index) => {
      if (index < techniques.length) {
        const tech = techniques[index];
        if (tech) {
          const { canUse } = canUseTechnique(tech, currentStance, currentChi);
          if (canUse) {
            onSelect(tech);
          }
        }
      }
    },
    onBack,
    circular: true,
  });

  const selectedTech = techniques[selectedIndex];

  return (
    <MenuContainer
      title="Techniques"
      titleIcon="✨"
      color="magenta"
      width={70}
      minHeight={14}
    >
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
      <Box borderStyle="single" borderColor="cyan" paddingX={1} width={60} minHeight={5} flexDirection="column">
        {selectedTech ? (
          <>
            {/* Power & Chi */}
            <Box>
              <Text color="red" bold>PWR: {selectedTech.power || 0}</Text>
              <Text dimColor> | </Text>
              <Text color="yellow">CHI: {selectedTech.chiCost > 0 ? `-${selectedTech.chiCost}` : '+2'}</Text>
              <Text dimColor> | </Text>
              <Text color="cyan">SPD: {selectedTech.speed > 0 ? `+${selectedTech.speed}` : selectedTech.speed}</Text>
            </Box>
            {/* Effects */}
            {selectedTech.effects.length > 0 && (
              <Box marginTop={1}>
                <Text color="magenta">
                  {selectedTech.effects.map(e => e.description).join(', ')}
                </Text>
              </Box>
            )}
            {/* Description */}
            <Box marginTop={1}>
              <Text dimColor italic wrap="wrap">{selectedTech.description}</Text>
            </Box>
          </>
        ) : (
          <Text dimColor italic>No technique selected</Text>
        )}
      </Box>

      <Box marginTop={1} height={1}>
        {comboActive && (
          <Text color="magenta" bold>⚡ COMBO x{comboTechniques.length} - ★ = Finisher!</Text>
        )}
      </Box>
    </MenuContainer>
  );
});
