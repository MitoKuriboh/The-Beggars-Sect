/**
 * Save/Load Screen
 * UI for managing save files
 */

import React, { useState, useCallback } from 'react';
import { Box, Text, useInput } from 'ink';
import SelectInput from 'ink-select-input';
const SelectInputComponent = (SelectInput as any).default || SelectInput;

import { GameStore } from '../game/state/GameStore';
import type { SaveSlot } from '../game/state/SaveManager';

// =============================================================================
// TYPES
// =============================================================================

type Mode = 'save' | 'load';

interface SaveLoadScreenProps {
  mode: Mode;
  onComplete: () => void;
  onBack: () => void;
}

interface SlotMenuItem {
  label: string;
  value: string;
}

// =============================================================================
// HELPERS
// =============================================================================

function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatPlaytime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}

// =============================================================================
// COMPONENT
// =============================================================================

export const SaveLoadScreen: React.FC<SaveLoadScreenProps> = ({
  mode,
  onComplete,
  onBack,
}) => {
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');
  const [confirmSlot, setConfirmSlot] = useState<number | null>(null);

  const slots = GameStore.getSaveSlots();

  // Build menu items
  const buildMenuItems = (): SlotMenuItem[] => {
    const items: SlotMenuItem[] = [];

    // Add auto-save option for load mode
    if (mode === 'load') {
      const autoSave = slots.find((s) => s.slot === 0);
      if (autoSave) {
        items.push({
          label: `[Auto] ${autoSave.chapter} - ${formatDate(autoSave.savedAt)}`,
          value: 'auto',
        });
      }
    }

    // Add slots 1-3
    for (let i = 1; i <= 3; i++) {
      const slot = slots.find((s) => s.slot === i);
      if (slot) {
        items.push({
          label: `Slot ${i}: ${slot.name} - ${slot.chapter} (${formatPlaytime(slot.playtime)})`,
          value: `slot-${i}`,
        });
      } else if (mode === 'save') {
        items.push({
          label: `Slot ${i}: [Empty]`,
          value: `slot-${i}`,
        });
      }
    }

    // Add back option
    items.push({ label: 'Back', value: 'back' });

    return items;
  };

  const handleSelect = useCallback(
    (item: SlotMenuItem) => {
      if (item.value === 'back') {
        onBack();
        return;
      }

      if (item.value === 'auto') {
        // Load auto-save
        const result = GameStore.loadAutoSave();
        if (result.success) {
          setMessage('Auto-save loaded!');
          setMessageType('success');
          setTimeout(onComplete, 1000);
        } else {
          setMessage(result.error || 'Failed to load');
          setMessageType('error');
        }
        return;
      }

      // Parse slot number
      const slotNum = parseInt(item.value.replace('slot-', ''), 10);

      if (mode === 'save') {
        // Check if slot has existing save
        const existing = slots.find((s) => s.slot === slotNum);
        if (existing) {
          setConfirmSlot(slotNum);
        } else {
          performSave(slotNum);
        }
      } else {
        performLoad(slotNum);
      }
    },
    [mode, slots, onBack, onComplete]
  );

  const performSave = (slot: number) => {
    const result = GameStore.saveToSlot(slot);
    if (result.success) {
      setMessage(`Saved to Slot ${slot}!`);
      setMessageType('success');
      setTimeout(onComplete, 1000);
    } else {
      setMessage(result.error || 'Failed to save');
      setMessageType('error');
    }
    setConfirmSlot(null);
  };

  const performLoad = (slot: number) => {
    const result = GameStore.loadFromSlot(slot);
    if (result.success) {
      setMessage(`Loaded from Slot ${slot}!`);
      setMessageType('success');
      setTimeout(onComplete, 1000);
    } else {
      setMessage(result.error || 'Failed to load');
      setMessageType('error');
    }
  };

  // Handle confirmation input
  useInput((input, key) => {
    if (confirmSlot !== null) {
      if (input === 'y' || key.return) {
        performSave(confirmSlot);
      } else if (input === 'n' || key.escape) {
        setConfirmSlot(null);
      }
    }
  });

  // Confirmation dialog
  if (confirmSlot !== null) {
    return (
      <Box flexDirection="column" padding={1}>
        <Text bold color="yellow">
          OVERWRITE SAVE?
        </Text>
        <Box marginTop={1}>
          <Text>
            Slot {confirmSlot} already has a save. Overwrite it?
          </Text>
        </Box>
        <Box marginTop={1}>
          <Text dimColor>
            Press Y to confirm, N to cancel
          </Text>
        </Box>
      </Box>
    );
  }

  // Message display
  if (message) {
    return (
      <Box flexDirection="column" padding={1}>
        <Text color={messageType === 'success' ? 'green' : 'red'}>
          {message}
        </Text>
      </Box>
    );
  }

  const menuItems = buildMenuItems();

  return (
    <Box flexDirection="column" padding={1}>
      <Text bold color="cyan">
        {mode === 'save' ? 'SAVE GAME' : 'LOAD GAME'}
      </Text>
      <Text dimColor>
        {mode === 'save'
          ? 'Select a slot to save your progress'
          : 'Select a save to load'}
      </Text>

      <Box marginTop={1}>
        <SelectInputComponent items={menuItems} onSelect={handleSelect} />
      </Box>

      {mode === 'load' && slots.length === 0 && (
        <Box marginTop={1}>
          <Text color="gray">No saves found.</Text>
        </Box>
      )}
    </Box>
  );
};
