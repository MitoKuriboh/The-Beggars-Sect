/**
 * Health Bar Component
 * Visual HP/Chi display
 */

import React from 'react';
import { Box, Text } from 'ink';

interface HealthBarProps {
  current: number;
  max: number;
  label: string;
  color: string;
  width?: number;
}

export const HealthBar: React.FC<HealthBarProps> = ({
  current,
  max,
  label,
  color,
  width = 20,
}) => {
  const percent = Math.max(0, Math.min(1, current / max));
  const filled = Math.floor(percent * width);
  const empty = width - filled;

  // Color changes based on percentage
  let barColor = color;
  if (label === 'HP') {
    if (percent <= 0.25) barColor = 'red';
    else if (percent <= 0.5) barColor = 'yellow';
  }

  return (
    <Box>
      <Text>
        {label}:
      </Text>
      <Text color={barColor}>
        {'█'.repeat(filled)}
      </Text>
      <Text dimColor>
        {'░'.repeat(empty)}
      </Text>
      <Text>
        {' '}
        {current}/{max}
      </Text>
    </Box>
  );
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

export const CharacterStatus: React.FC<CharacterStatusProps> = ({
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
  return (
    <Box flexDirection="column">
      <Text bold color={isPlayer ? 'cyan' : 'red'}>
        {name}
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
};
