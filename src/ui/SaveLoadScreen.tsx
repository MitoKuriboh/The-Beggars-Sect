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
type InternalMode = 'normal' | 'delete';

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
  const [internalMode, setInternalMode] = useState<InternalMode>('normal');
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');
  const [confirmSlot, setConfirmSlot] = useState<number | null>(null);
  const [confirmDeleteAll, setConfirmDeleteAll] = useState(false);

  const slots = GameStore.getSaveSlots();

  // Build menu items
  const buildMenuItems = (): SlotMenuItem[] => {
    const items: SlotMenuItem[] = [];

    // Delete mode - show delete options
    if (internalMode === 'delete') {
      // Add "Delete All" option if there are saves
      if (slots.filter(s => s.slot >= 1 && s.slot <= 3).length > 0) {
        items.push({
          label: '⚠️  Delete ALL Saves (permanent!)',
          value: 'delete-all',
        });
      }

      // Add slots 1-3 for deletion (not auto-save)
      for (let i = 1; i <= 3; i++) {
        const slot = slots.find((s) => s.slot === i);
        if (slot) {
          items.push({
            label: `Slot ${i}: ${slot.name} - ${slot.chapter} (${formatPlaytime(slot.playtime)})`,
            value: `slot-${i}`,
          });
        }
      }

      items.push({ label: 'Back', value: 'back' });
      return items;
    }

    // Normal mode
    // Add auto-save option for load mode only (not deletable from main menu)
    if (mode === 'load' && internalMode === 'normal') {
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

    // Add delete option for load mode
    if (mode === 'load' && slots.filter(s => s.slot >= 1 && s.slot <= 3).length > 0) {
      items.push({ label: 'Delete Save', value: 'delete-mode' });
    }

    // Add back option
    items.push({ label: 'Back', value: 'back' });

    return items;
  };

  const handleSelect = useCallback(
    (item: SlotMenuItem) => {
      if (item.value === 'back') {
        if (internalMode === 'delete') {
          setInternalMode('normal');
        } else {
          onBack();
        }
        return;
      }

      if (item.value === 'delete-mode') {
        setInternalMode('delete');
        return;
      }

      if (item.value === 'delete-all') {
        setConfirmDeleteAll(true);
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

      if (internalMode === 'delete') {
        setConfirmSlot(slotNum);
      } else if (mode === 'save') {
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
    [mode, internalMode, slots, onBack, onComplete]
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

  const performDelete = (slot: number) => {
    const result = GameStore.deleteSlot(slot);
    if (result.success) {
      setMessage(`Deleted Slot ${slot}!`);
      setMessageType('success');
      setTimeout(() => {
        setMessage(null);
        setInternalMode('normal');
      }, 1500);
    } else {
      setMessage(result.error || 'Failed to delete');
      setMessageType('error');
      setTimeout(() => setMessage(null), 2000);
    }
    setConfirmSlot(null);
  };

  const performDeleteAll = () => {
    let allSuccess = true;
    for (let i = 1; i <= 3; i++) {
      const result = GameStore.deleteSlot(i);
      if (!result.success) {
        allSuccess = false;
      }
    }

    if (allSuccess) {
      setMessage('All saves deleted!');
      setMessageType('success');
      setTimeout(() => {
        setMessage(null);
        setInternalMode('normal');
      }, 1500);
    } else {
      setMessage('Some saves could not be deleted');
      setMessageType('error');
      setTimeout(() => setMessage(null), 2000);
    }
    setConfirmDeleteAll(false);
  };

  // Handle confirmation selections
  const handleDeleteAllConfirm = useCallback((item: SlotMenuItem) => {
    if (item.value === 'yes') {
      performDeleteAll();
    } else {
      setConfirmDeleteAll(false);
    }
  }, []);

  const handleSlotConfirm = useCallback((item: SlotMenuItem) => {
    if (item.value === 'yes') {
      if (internalMode === 'delete') {
        performDelete(confirmSlot!);
      } else {
        performSave(confirmSlot!);
      }
    } else {
      setConfirmSlot(null);
    }
  }, [internalMode, confirmSlot]);

  // Delete all confirmation
  if (confirmDeleteAll) {
    const confirmItems: SlotMenuItem[] = [
      { label: 'Yes, Delete All', value: 'yes' },
      { label: 'No, Cancel', value: 'no' },
    ];
    return (
      <Box flexDirection="column" padding={1}>
        <Text bold color="yellow">
          ⚠ ⚠ ⚠  DELETE ALL SAVES? ⚠ ⚠ ⚠
        </Text>
        <Box marginTop={1}>
          <Text>
            Permanently delete ALL save files? This CANNOT be undone!
          </Text>
        </Box>
        <Box marginTop={1}>
          <SelectInputComponent items={confirmItems} onSelect={handleDeleteAllConfirm} />
        </Box>
      </Box>
    );
  }

  // Slot confirmation dialog
  if (confirmSlot !== null) {
    const confirmItems: SlotMenuItem[] = [
      { label: 'Yes, Confirm', value: 'yes' },
      { label: 'No, Cancel', value: 'no' },
    ];
    return (
      <Box flexDirection="column" padding={1}>
        <Text bold color="yellow">
          {internalMode === 'delete' ? '⚠ DELETE SAVE?' : 'OVERWRITE SAVE?'}
        </Text>
        <Box marginTop={1}>
          <Text>
            {internalMode === 'delete'
              ? `Permanently delete Slot ${confirmSlot}? This cannot be undone.`
              : `Slot ${confirmSlot} already has a save. Overwrite it?`}
          </Text>
        </Box>
        <Box marginTop={1}>
          <SelectInputComponent items={confirmItems} onSelect={handleSlotConfirm} />
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
        {internalMode === 'delete' ? '🗑️  DELETE SAVE' : mode === 'save' ? 'SAVE GAME' : 'LOAD GAME'}
      </Text>
      <Text dimColor>
        {internalMode === 'delete'
          ? 'Select a save to delete'
          : mode === 'save'
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
