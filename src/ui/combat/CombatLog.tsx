/**
 * Combat Log Display
 * Shows recent combat messages
 */

import React from 'react';
import { Box, Text } from 'ink';
import type { LogEntry } from '../../types/index';

interface CombatLogProps {
  entries: LogEntry[];
  maxEntries?: number;
}

export const CombatLog: React.FC<CombatLogProps> = ({ entries, maxEntries = 5 }) => {
  const recentEntries = entries.slice(-maxEntries);

  const getColor = (type: LogEntry['type']): string => {
    switch (type) {
      case 'damage': return 'red';
      case 'heal': return 'green';
      case 'status': return 'yellow';
      case 'system': return 'gray';
      case 'action': return 'white';
      default: return 'white';
    }
  };

  return (
    <Box flexDirection="column" borderStyle="single" borderColor="gray" padding={1}>
      <Text bold dimColor>
        Combat Log
      </Text>
      <Box flexDirection="column" marginTop={1}>
        {recentEntries.length === 0 ? (
          <Text dimColor italic>
            Combat begins...
          </Text>
        ) : (
          recentEntries.map((entry, index) => (
            <Text key={`${entry.timestamp}-${index}`} color={getColor(entry.type)}>
              {entry.message}
            </Text>
          ))
        )}
      </Box>
    </Box>
  );
};
