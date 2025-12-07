/**
 * Path Display Component
 * Shows the three path scores (Blade/Stream/Shadow) with visual progress bars
 */

import React from 'react';
import { Box, Text } from 'ink';

interface PathDisplayProps {
  pathScores: {
    blade: number;
    stream: number;
    shadow: number;
  };
}

interface PathInfo {
  name: string;
  description: string;
  color: string;
  symbol: string;
}

const PATH_INFO: Record<'blade' | 'stream' | 'shadow', PathInfo> = {
  blade: {
    name: 'Blade',
    description: 'Direct power. Break through obstacles.',
    color: 'red',
    symbol: '⚔',
  },
  stream: {
    name: 'Stream',
    description: 'Flowing adaptation. Turn force against itself.',
    color: 'cyan',
    symbol: '〜',
  },
  shadow: {
    name: 'Shadow',
    description: 'Hidden truth. See what others miss.',
    color: 'magenta',
    symbol: '◈',
  },
};

function renderProgressBar(value: number, maxValue: number = 20, width: number = 15): string {
  const filled = Math.floor((value / maxValue) * width);
  const empty = width - filled;
  return '█'.repeat(filled) + '░'.repeat(empty);
}

export const PathDisplay: React.FC<PathDisplayProps> = ({ pathScores }) => {
  const totalPoints = pathScores.blade + pathScores.stream + pathScores.shadow;
  const paths: Array<'blade' | 'stream' | 'shadow'> = ['blade', 'stream', 'shadow'];

  // Determine dominant path
  const dominantPath = paths.reduce((max, path) =>
    pathScores[path] > pathScores[max] ? path : max
  );

  return (
    <Box flexDirection="column">
      <Box marginBottom={1}>
        <Text bold color="yellow">三道 THE THREE PATHS</Text>
      </Box>

      {totalPoints === 0 ? (
        <Box marginBottom={1}>
          <Text dimColor italic>Your path is not yet defined...</Text>
        </Box>
      ) : (
        <Box marginBottom={1} flexDirection="column">
          {paths.map((pathKey) => {
            const path = PATH_INFO[pathKey];
            const score = pathScores[pathKey];
            const isDominant = pathKey === dominantPath && totalPoints > 0;

            return (
              <Box key={pathKey} marginBottom={1} flexDirection="column">
                <Box>
                  <Text bold color={path.color as any}>
                    {path.symbol} {path.name.toUpperCase()}{isDominant ? ' ★' : ''}
                  </Text>
                </Box>
                <Box marginLeft={2}>
                  <Text dimColor>{path.description}</Text>
                </Box>
                <Box marginLeft={2}>
                  <Text color={path.color as any}>
                    {renderProgressBar(score)} {score}
                  </Text>
                </Box>
              </Box>
            );
          })}
        </Box>
      )}

      <Box borderStyle="single" borderColor="gray" paddingX={1}>
        <Text dimColor>
          {totalPoints === 0
            ? 'Your choices will shape your path...'
            : `Total Alignment: ${totalPoints} | Dominant: ${PATH_INFO[dominantPath].name}`
          }
        </Text>
      </Box>
    </Box>
  );
};
