/**
 * Turn Queue Display
 * Shows upcoming turn order (ATB preview)
 */

import React, { memo } from "react";
import { Box, Text } from "ink";
import type { Character } from "../../types/index";
import { UI_CONFIG } from "../config/constants";

interface TurnQueueProps {
  turnOrder: Character[];
  currentActorId: string;
}

export const TurnQueue = memo<TurnQueueProps>(
  ({ turnOrder, currentActorId: _currentActorId }) => {
    const previewLength = UI_CONFIG.combat.turnQueuePreviewLength;
    const displayed = turnOrder.slice(0, previewLength);

    return (
      <Box flexDirection="row" justifyContent="center" alignItems="center">
        <Text dimColor italic>
          Turn Order:{" "}
        </Text>
        {displayed.map((char, index) => {
          const isCurrent = index === 0;
          const isPlayer = char.isPlayer;

          return (
            <Box key={`${char.id}-${index}`}>
              <Text
                color={isPlayer ? "cyan" : "red"}
                bold={isCurrent}
                dimColor={!isCurrent}
              >
                {isPlayer ? "YOU" : char.name.substring(0, 3).toUpperCase()}
              </Text>
              {index < displayed.length - 1 && (
                <Text dimColor> • </Text>
              )}
            </Box>
          );
        })}
      </Box>
    );
  },
);

TurnQueue.displayName = "TurnQueue";
