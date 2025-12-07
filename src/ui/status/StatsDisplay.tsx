/**
 * Stats Display Component
 * Shows player character stats
 */

import React from 'react';
import { Box, Text } from 'ink';
import type { Character } from '../../types/index';

interface StatsDisplayProps {
  player: Character;
}

interface StatInfo {
  label: string;
  color: string;
}

const STAT_INFO: Record<string, StatInfo> = {
  str: { label: 'Strength', color: 'red' },
  end: { label: 'Endurance', color: 'green' },
  dex: { label: 'Dexterity', color: 'yellow' },
  wis: { label: 'Wisdom', color: 'cyan' },
  chi: { label: 'Chi', color: 'magenta' },
};

export const StatsDisplay: React.FC<StatsDisplayProps> = ({ player }) => {
  const statKeys = Object.keys(STAT_INFO);

  return (
    <Box flexDirection="column">
      <Box marginBottom={1}>
        <Text bold color="yellow">力 ATTRIBUTES</Text>
      </Box>

      <Box flexDirection="column">
        {/* Name */}
        <Box marginBottom={1}>
          <Text bold color="white">
            {player.name}
          </Text>
        </Box>

        {/* Health and Chi */}
        <Box marginBottom={1} flexDirection="column">
          <Box>
            <Text color="red">❤ Health: </Text>
            <Text bold>
              {player.hp}/{player.maxHp}
            </Text>
          </Box>
          <Box>
            <Text color="magenta">✦ Chi: </Text>
            <Text bold>
              {player.chi}/{player.maxChi}
            </Text>
          </Box>
        </Box>

        {/* Stats Grid */}
        <Box borderStyle="single" borderColor="gray" paddingX={1} paddingY={0} flexDirection="column">
          {statKeys.map((key) => {
            const stat = STAT_INFO[key];
            if (!stat) return null;
            const value = player.stats[key as keyof typeof player.stats];

            return (
              <Box key={key}>
                <Text color={stat.color as any} dimColor>
                  {stat.label.padEnd(12)}
                </Text>
                <Text bold>{value}</Text>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};
