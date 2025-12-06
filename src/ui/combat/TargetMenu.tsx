/**
 * Target Selection Menu
 * Choose which enemy to target
 */

import React, { useCallback } from 'react';
import { Box, Text, useInput } from 'ink';
import SelectInput from 'ink-select-input';
import type { Enemy } from '../../types/index';

const SelectInputComponent = (SelectInput as any).default || SelectInput;

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

export const TargetMenu: React.FC<TargetMenuProps> = ({
  enemies,
  onSelect,
  onBack,
}) => {
  useInput((input, key) => {
    if (key.escape) {
      onBack();
    }
  });

  const livingEnemies = enemies.filter((e) => e.hp > 0);

  const items: TargetMenuItem[] = livingEnemies.map((enemy) => {
    const hpPercent = Math.floor((enemy.hp / enemy.maxHp) * 100);
    let hpColor = 'green';
    if (hpPercent <= 25) hpColor = 'red';
    else if (hpPercent <= 50) hpColor = 'yellow';

    return {
      label: `${enemy.name} (HP: ${hpPercent}%)`,
      value: enemy.id,
      enemy,
    };
  });

  const handleSelect = useCallback(
    (item: TargetMenuItem) => {
      onSelect(item.enemy);
    },
    [onSelect]
  );

  // If only one enemy, auto-select
  if (livingEnemies.length === 1) {
    onSelect(livingEnemies[0]);
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
};
