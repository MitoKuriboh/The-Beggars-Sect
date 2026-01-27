/**
 * Save Indicator Component
 * Shows visual feedback when auto-save occurs
 */

import React, { useState, useEffect, memo } from "react";
import { Box, Text } from "ink";
import { GameStore, SaveStatus } from "../../game/state/GameStore";

interface SaveIndicatorProps {
  /** Duration to show the indicator (ms) */
  displayDuration?: number;
}

/**
 * Displays a brief indicator when auto-save completes
 * Shows success (checkmark) or error (X) based on save result
 */
export const SaveIndicator = memo<SaveIndicatorProps>(
  ({ displayDuration = 2000 }) => {
    const [visible, setVisible] = useState(false);
    const [status, setStatus] = useState<SaveStatus | null>(null);

    useEffect(() => {
      let hideTimer: ReturnType<typeof setTimeout> | null = null;

      // Subscribe to GameStore changes
      const unsubscribe = GameStore.subscribe(() => {
        const newStatus = GameStore.getSaveStatus();

        // Only show if this is a new save (timestamp changed)
        if (newStatus.lastSaveTime && newStatus.lastSaveTime !== status?.lastSaveTime) {
          setStatus(newStatus);
          setVisible(true);

          // Clear any existing timer
          if (hideTimer) {
            clearTimeout(hideTimer);
          }

          // Auto-hide after duration
          hideTimer = setTimeout(() => {
            setVisible(false);
          }, displayDuration);
        }
      });

      return () => {
        unsubscribe();
        if (hideTimer) {
          clearTimeout(hideTimer);
        }
      };
    }, [displayDuration, status?.lastSaveTime]);

    if (!visible || !status) {
      return null;
    }

    return (
      <Box>
        {status.lastSaveSuccess ? (
          <Text color="green" dimColor>
            [Saved]
          </Text>
        ) : (
          <Text color="red">
            [Save failed: {status.lastSaveError || "Unknown error"}]
          </Text>
        )}
      </Box>
    );
  },
);

SaveIndicator.displayName = "SaveIndicator";
