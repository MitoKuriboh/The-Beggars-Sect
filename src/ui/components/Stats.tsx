/**
 * Reusable Stats Display Components
 * HP bars, stat grids, etc.
 */

import React from 'react';
import { Box, Text } from 'ink';

// =============================================================================
// TYPES
// =============================================================================

export interface StatBarProps {
  label: string;
  current: number;
  max: number;
  color?: string;
  warningThreshold?: number; // Show warning color below this %
  warningColor?: string;
}

export interface StatsGridProps {
  stats: {
    str: number;
    dex: number;
    end: number;
    wis: number;
  };
  color?: string;
}

export interface ResourceDisplayProps {
  hp: number;
  maxHp: number;
  chi: number;
  maxChi: number;
  inverseChi?: number;
  maxInverseChi?: number;
}

// =============================================================================
// COMPONENTS
// =============================================================================

/**
 * Stat Bar (HP, Chi, etc.)
 * Displays current/max values with color coding
 */
export const StatBar: React.FC<StatBarProps> = ({
  label,
  current,
  max,
  color = 'green',
  warningThreshold = 0.3,
  warningColor = 'red',
}) => {
  const percentage = current / max;
  const displayColor = percentage < warningThreshold ? warningColor : color;

  return (
    <Text>
      {label}: <Text color={displayColor}>{current}/{max}</Text>
    </Text>
  );
};

/**
 * Stats Grid
 * Displays STR/DEX/END/WIS in a grid
 */
export const StatsGrid: React.FC<StatsGridProps> = ({
  stats,
  color = 'yellow',
}) => {
  return (
    <Box flexDirection="column" alignItems="center">
      <Box marginTop={1}>
        <Text dimColor>━━━━━━━━ Base Stats ━━━━━━━━</Text>
      </Box>
      <Box marginTop={1} flexDirection="row" justifyContent="space-around" width={60}>
        <Text>STR: <Text bold color={color}>{stats.str}</Text></Text>
        <Text>DEX: <Text bold color={color}>{stats.dex}</Text></Text>
        <Text>END: <Text bold color={color}>{stats.end}</Text></Text>
        <Text>WIS: <Text bold color={color}>{stats.wis}</Text></Text>
      </Box>
    </Box>
  );
};

/**
 * Resource Display
 * Shows HP, Chi, and Inverse Chi in a compact format
 */
export const ResourceDisplay: React.FC<ResourceDisplayProps> = ({
  hp,
  maxHp,
  chi,
  maxChi,
  inverseChi,
  maxInverseChi,
}) => {
  return (
    <Box flexDirection="column" alignItems="center" width={60}>
      <Box flexDirection="row" justifyContent="space-between" width="100%">
        <StatBar label="HP" current={hp} max={maxHp} color="green" />
        <StatBar label="Chi" current={chi} max={maxChi} color="blue" />
      </Box>
      {inverseChi !== undefined && maxInverseChi !== undefined && (
        <Box marginTop={1} flexDirection="row" justifyContent="space-between" width="100%">
          <StatBar label="Inverse Chi" current={inverseChi} max={maxInverseChi} color="magenta" />
        </Box>
      )}
    </Box>
  );
};
