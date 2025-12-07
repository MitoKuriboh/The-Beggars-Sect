/**
 * Target Selection Menu
 * Choose which enemy to target
 */

import React, { useCallback, useEffect, useState } from 'react';
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

export const TargetMenu: React.FC<TargetMenuProps> = React.memo(({
  enemies,
  onSelect,
  onBack,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const livingEnemies = enemies.filter((e) => e.hp > 0);

  useInput((input, key) => {
    if (key.escape) {
      onBack();
      return;
    }

    // Handle spacebar to select target
    if (input === ' ' && !key.return) {
      const selectedEnemy = livingEnemies[selectedIndex];
      if (selectedEnemy) {
        onSelect(selectedEnemy);
      }
    }
  });

  // Auto-select if only one enemy (use effect to avoid setState during render)
  useEffect(() => {
    const singleEnemy = livingEnemies[0];
    if (livingEnemies.length === 1 && singleEnemy) {
      onSelect(singleEnemy);
    }
  }, [livingEnemies, onSelect]);

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

      <SelectInputComponent items={items} onSelect={handleSelect} onHighlight={(item: TargetMenuItem) => {
        const index = items.findIndex(i => i.value === item.value);
        if (index >= 0) setSelectedIndex(index);
      }} />
    </Box>
  );
});
