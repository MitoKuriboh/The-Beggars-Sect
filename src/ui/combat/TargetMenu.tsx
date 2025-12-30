/**
 * Target Selection Menu
 * Choose which enemy to target
 */

import React, { useCallback, useEffect } from "react";
import { Box, Text } from "ink";
import type { Enemy } from "../../types/index";
import { SelectInputComponent } from "../components/SelectInputWrapper";
import { useMenuNavigation } from "../hooks/useMenuNavigation";

interface TargetMenuItem {
  label: string;
  value: string;
  enemy: Enemy;
}

interface TargetMenuProps {
  enemies: Enemy[];
  onSelect: (enemy: Enemy) => void;
  onBack: () => void;
}

export const TargetMenu: React.FC<TargetMenuProps> = React.memo(
  ({ enemies, onSelect, onBack }) => {
    const livingEnemies = enemies.filter((e) => e.hp > 0);

    const items: TargetMenuItem[] = livingEnemies.map((enemy) => {
      const hpPercent = Math.floor((enemy.hp / enemy.maxHp) * 100);

      return {
        label: `${enemy.name} (HP: ${hpPercent}%)`,
        value: enemy.id,
        enemy,
      };
    });

    const { selectedIndex: _selectedIndex } = useMenuNavigation({
      itemCount: items.length,
      onSelect: (index) => {
        const selectedEnemy = items[index]?.enemy;
        if (selectedEnemy) {
          onSelect(selectedEnemy);
        }
      },
      onBack,
      circular: true,
    });

    // Auto-select if only one enemy (use effect to avoid setState during render)
    useEffect(() => {
      const singleEnemy = livingEnemies[0];
      if (livingEnemies.length === 1 && singleEnemy) {
        onSelect(singleEnemy);
      }
    }, [livingEnemies, onSelect]);

    const handleSelect = useCallback(
      (item: TargetMenuItem) => {
        onSelect(item.enemy);
      },
      [onSelect],
    );

    // If only one enemy, don't render menu (auto-select will fire via useEffect)
    if (livingEnemies.length === 1) {
      return null;
    }

    return (
      <Box flexDirection="column">
        <Box marginBottom={1}>
          <Text bold color="yellow">
            Select Target
          </Text>
          <Text dimColor> (ESC to go back)</Text>
        </Box>

        <SelectInputComponent items={items} onSelect={handleSelect} />
      </Box>
    );
  },
);
