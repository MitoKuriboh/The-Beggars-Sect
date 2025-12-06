/**
 * Health Bar Component
 * Visual HP/Chi display with high-resolution progress bars
 */

import React, { memo } from 'react';
import { Box, Text } from 'ink';
import { createHealthBar, createChiBar } from '../theme/progressBars';
import { getHealthColor } from '../theme/colors';

interface HealthBarProps {
  current: number;
  max: number;
  label: string;
  color: string;
  width?: number;
}

export const HealthBar = memo<HealthBarProps>(({
  current,
  max,
  label,
  color,
  width = 20,
}) => {
  // Use high-res progress bars based on label type
  const isHP = label === 'HP';
  const isChi = label === 'Chi' || label === '逆';

  let barData: { bar: string; color: string };

  if (isHP) {
    barData = createHealthBar(current, max, width);
  } else if (isChi) {
    barData = createChiBar(current, max, width);
  } else {
    // Fallback for custom labels
    const percentage = max > 0 ? (current / max) * 100 : 0;
    const fillAmount = (percentage / 100) * width;
    const fullBlocks = Math.floor(fillAmount);
    const remainder = fillAmount - fullBlocks;
    const eighthBlocks = ['', '▏', '▎', '▍', '▌', '▋', '▊', '▉', '█'];
    const eighthIndex = Math.floor(remainder * 8);
    const partialBlock = eighthBlocks[eighthIndex] ?? '';
    const filledPart = '█'.repeat(fullBlocks);
    const emptyPart = '░'.repeat(Math.max(0, width - fullBlocks - (partialBlock ? 1 : 0)));

    barData = {
      bar: filledPart + partialBlock + emptyPart,
      color: color,
    };
  }

  return (
    <Box>
      <Text>
        {label}:
      </Text>
      <Text color={barData.color}>
        {' '}{barData.bar}
      </Text>
      <Text>
        {' '}
        {current}/{max}
      </Text>
    </Box>
  );
});

HealthBar.displayName = 'HealthBar';

// Get descriptive health state based on HP percentage
const getHealthDescription = (current: number, max: number): { text: string; color: string } => {
  const percent = current / max;
  if (percent >= 0.9) return { text: 'Uninjured', color: 'green' };
  if (percent >= 0.7) return { text: 'Lightly Wounded', color: 'green' };
  if (percent >= 0.5) return { text: 'Wounded', color: 'yellow' };
  if (percent >= 0.3) return { text: 'Badly Wounded', color: 'yellow' };
  if (percent >= 0.1) return { text: 'Near Death', color: 'red' };
  return { text: 'Critical', color: 'red' };
};

interface CharacterStatusProps {
  name: string;
  hp: number;
  maxHp: number;
  chi: number;
  maxChi: number;
  stance: string;
  isPlayer?: boolean;
  inverseChi?: number;
  maxInverseChi?: number;
}

export const CharacterStatus = memo<CharacterStatusProps>(({
  name,
  hp,
  maxHp,
  chi,
  maxChi,
  stance,
  isPlayer = false,
  inverseChi = 0,
  maxInverseChi = 0,
}) => {
  const healthState = getHealthDescription(hp, maxHp);

  return (
    <Box flexDirection="column">
      <Text bold color={isPlayer ? 'cyan' : 'red'}>
        {name}
        {!isPlayer && (
          <Text color={healthState.color} dimColor> — {healthState.text}</Text>
        )}
      </Text>
      <Box paddingLeft={1} flexDirection="column">
        <HealthBar current={hp} max={maxHp} label="HP" color="green" />
        <HealthBar current={chi} max={maxChi} label="Chi" color="blue" width={15} />
        {isPlayer && maxInverseChi > 0 && (
          <HealthBar
            current={inverseChi}
            max={maxInverseChi}
            label="逆"
            color="magenta"
            width={10}
          />
        )}
        <Text dimColor>
          Stance: <Text color="cyan">{stance}</Text>
        </Text>
      </Box>
    </Box>
  );
});

CharacterStatus.displayName = 'CharacterStatus';
