/**
 * Combat Log Display
 * Shows recent combat messages with colored damage/heal numbers
 */

import React, { memo } from 'react';
import { Box, Text } from 'ink';
import type { LogEntry } from '../../types/index';

interface CombatLogProps {
  entries: LogEntry[];
  maxEntries?: number;
}

// Parse message and highlight numbers based on entry type
const renderMessage = (message: string, type: LogEntry['type']): React.ReactNode => {
  // Match numbers in the message
  const parts = message.split(/(\d+)/);

  if (parts.length === 1) {
    // No numbers, return plain text (already wrapped by parent Text)
    return message;
  }

  return parts.map((part, i) => {
    // Skip empty strings (can happen with split on capturing groups)
    if (part === '') return null;

    if (/^\d+$/.test(part)) {
      // This is a number - color it based on type
      let color: string;
      switch (type) {
        case 'damage':
          color = 'red';
          break;
        case 'heal':
          color = 'green';
          break;
        default:
          color = 'yellow';
      }
      return (
        <Text key={i} color={color} bold>
          {part}
        </Text>
      );
    }
    // Text parts - return as-is (parent Text wraps them)
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
};

export const CombatLog = memo<CombatLogProps>(({ entries, maxEntries = 5 }) => {
  const recentEntries = entries.slice(-maxEntries);

  const getColor = (type: LogEntry['type']): string => {
    switch (type) {
      case 'damage': return 'white';
      case 'heal': return 'white';
      case 'status': return 'yellow';
      case 'system': return 'gray';
      case 'action': return 'cyan';
      default: return 'white';
    }
  };

  return (
    <Box flexDirection="column" borderStyle="single" borderColor="gray" padding={1}>
      <Text bold dimColor>
        ⚔️  Combat Log
      </Text>
      <Box flexDirection="column" marginTop={1}>
        {recentEntries.length === 0 ? (
          <Text dimColor italic>
            Combat begins...
          </Text>
        ) : (
          recentEntries.map((entry, index) => (
            <Text key={`${entry.timestamp}-${index}`} color={getColor(entry.type)}>
              {renderMessage(entry.message, entry.type)}
            </Text>
          ))
        )}
      </Box>
    </Box>
  );
});

CombatLog.displayName = 'CombatLog';
