/**
 * Turn Queue Display
 * Shows upcoming turn order (ATB preview)
 */

import React, { memo } from 'react';
import { Box, Text } from 'ink';
import type { Character } from '../../types/index';

interface TurnQueueProps {
  turnOrder: Character[];
  currentActorId: string;
}

export const TurnQueue = memo<TurnQueueProps>(({ turnOrder, currentActorId }) => {
  return (
    <Box flexDirection="row" justifyContent="center" alignItems="center">
      <Text dimColor italic>Turn Order: </Text>
      {turnOrder.slice(0, 5).map((char, index) => {
        const isCurrent = index === 0;
        const isPlayer = char.isPlayer;

        return (
          <Box key={`${char.id}-${index}`}>
            <Text
              color={isPlayer ? 'cyan' : 'red'}
              bold={isCurrent}
              dimColor={!isCurrent}
            >
              {isPlayer ? 'YOU' : char.name.substring(0, 3).toUpperCase()}
            </Text>
            {index < turnOrder.slice(0, 5).length - 1 && (
              <Text dimColor> • </Text>
            )}
          </Box>
        );
      })}
    </Box>
  );
});

TurnQueue.displayName = 'TurnQueue';
