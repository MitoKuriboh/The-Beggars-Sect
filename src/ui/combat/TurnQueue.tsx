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
    <Box flexDirection="column">
      <Text bold dimColor>
        Turn Order:
      </Text>
      <Box flexDirection="row" marginTop={1}>
        {turnOrder.slice(0, 7).map((char, index) => {
          const isCurrent = index === 0;
          const isPlayer = char.isPlayer;

          return (
            <Box key={`${char.id}-${index}`} marginRight={1}>
              <Text
                color={isPlayer ? 'cyan' : 'red'}
                bold={isCurrent}
                inverse={isCurrent}
              >
                {' '}
                {isPlayer ? 'YOU' : char.name.substring(0, 3).toUpperCase()}
                {' '}
              </Text>
              {index < turnOrder.length - 1 && (
                <Text dimColor> → </Text>
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
});

TurnQueue.displayName = 'TurnQueue';
