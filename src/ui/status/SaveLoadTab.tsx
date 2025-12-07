/**
 * Save/Load Tab Component
 * Integrated save/load functionality within the status menu
 */

import React, { useState, useCallback } from 'react';
import { Box, Text, useInput } from 'ink';
import SelectInput from 'ink-select-input';
const SelectInputComponent = (SelectInput as any).default || SelectInput;

import { GameStore } from '../../game/state/GameStore';
import type { SaveSlot } from '../../game/state/SaveManager';

interface SaveLoadTabProps {
  onSaveComplete?: () => void;
  onLoadComplete?: () => void;
  onQuitToMenu?: () => void;
}

type Mode = 'menu' | 'save' | 'load' | 'delete';

interface MenuItem {
  label: string;
  value: string;
}

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

export const SaveLoadTab: React.FC<SaveLoadTabProps> = ({
  onSaveComplete,
  onLoadComplete,
  onQuitToMenu,
}) => {
  const [mode, setMode] = useState<Mode>('menu');
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');
  const [confirmSlot, setConfirmSlot] = useState<number | null>(null);
  const [confirmQuit, setConfirmQuit] = useState(false);

  const slots = GameStore.getSaveSlots();

  // Build save/load menu items
  const buildSlotItems = (forSave: boolean, forDelete: boolean = false): MenuItem[] => {
    const items: MenuItem[] = [];

    // Add "Delete All" option for delete mode
    if (forDelete && slots.length > 0) {
      items.push({
        label: '⚠️  Delete ALL Saves (permanent!)',
        value: 'delete-all',
      });
    }

    // Add auto-save for load only
    if (!forSave && !forDelete) {
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
      } else if (forSave) {
        items.push({
          label: `Slot ${i}: [Empty]`,
          value: `slot-${i}`,
        });
      }
    }

    items.push({ label: 'Back', value: 'back' });
    return items;
  };

  const handleModeSelect = useCallback((item: MenuItem) => {
    if (item.value === 'save') {
      setMode('save');
    } else if (item.value === 'load') {
      setMode('load');
    } else if (item.value === 'delete') {
      setMode('delete');
    } else if (item.value === 'quit') {
      setConfirmQuit(true);
    }
  }, []);

  const handleSlotSelect = useCallback(
    (item: MenuItem) => {
      if (item.value === 'back') {
        setMode('menu');
        setMessage(null);
        return;
      }

      if (item.value === 'delete-all') {
        // Confirm delete all
        setConfirmSlot(-1); // Use -1 to indicate "delete all"
        return;
      }

      if (item.value === 'auto') {
        // Load auto-save
        const result = GameStore.loadAutoSave();
        if (result.success) {
          setMessage('Auto-save loaded!');
          setMessageType('success');
          setTimeout(() => {
            onLoadComplete?.();
          }, 1500);
        } else {
          setMessage(result.error || 'Failed to load');
          setMessageType('error');
          setTimeout(() => setMessage(null), 2000);
        }
        return;
      }

      // Parse slot number
      const slotNum = parseInt(item.value.replace('slot-', ''), 10);

      if (mode === 'save') {
        const existing = slots.find((s) => s.slot === slotNum);
        if (existing) {
          setConfirmSlot(slotNum);
        } else {
          performSave(slotNum);
        }
      } else if (mode === 'load') {
        performLoad(slotNum);
      } else if (mode === 'delete') {
        // Confirm delete
        setConfirmSlot(slotNum);
      }
    },
    [mode, slots, onLoadComplete]
  );

  const performSave = (slot: number) => {
    const result = GameStore.saveToSlot(slot);
    if (result.success) {
      setMessage(`Saved to Slot ${slot}!`);
      setMessageType('success');
      setTimeout(() => {
        setMessage(null);
        setMode('menu');
        onSaveComplete?.();
      }, 1500);
    } else {
      setMessage(result.error || 'Failed to save');
      setMessageType('error');
      setTimeout(() => setMessage(null), 2000);
    }
    setConfirmSlot(null);
  };

  const performLoad = (slot: number) => {
    const result = GameStore.loadFromSlot(slot);
    if (result.success) {
      setMessage(`Loaded from Slot ${slot}!`);
      setMessageType('success');
      setTimeout(() => {
        onLoadComplete?.();
      }, 1500);
    } else {
      setMessage(result.error || 'Failed to load');
      setMessageType('error');
      setTimeout(() => setMessage(null), 2000);
    }
  };

  const performDelete = (slot: number) => {
    const result = GameStore.deleteSlot(slot);
    if (result.success) {
      setMessage(`Deleted Slot ${slot}!`);
      setMessageType('success');
      setTimeout(() => {
        setMessage(null);
        setMode('menu');
      }, 1500);
    } else {
      setMessage(result.error || 'Failed to delete');
      setMessageType('error');
      setTimeout(() => setMessage(null), 2000);
    }
    setConfirmSlot(null);
  };

  const performDeleteAll = () => {
    // Delete all saves (slots 1-3)
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
        setMode('menu');
      }, 1500);
    } else {
      setMessage('Some saves could not be deleted');
      setMessageType('error');
      setTimeout(() => setMessage(null), 2000);
    }
    setConfirmSlot(null);
  };

  // Handle confirmation selections
  const handleQuitConfirm = useCallback((item: MenuItem) => {
    if (item.value === 'yes') {
      onQuitToMenu?.();
    } else {
      setConfirmQuit(false);
    }
  }, [onQuitToMenu]);

  const handleSlotConfirm = useCallback((item: MenuItem) => {
    if (item.value === 'yes') {
      if (confirmSlot === -1) {
        performDeleteAll();
      } else if (confirmSlot !== null) {
        if (mode === 'delete') {
          performDelete(confirmSlot);
        } else {
          performSave(confirmSlot);
        }
      }
    } else {
      setConfirmSlot(null);
    }
  }, [confirmSlot, mode]);

  // Quit confirmation dialog
  if (confirmQuit) {
    const confirmItems: MenuItem[] = [
      { label: 'Yes, Quit to Menu', value: 'yes' },
      { label: 'No, Cancel', value: 'no' },
    ];
    return (
      <Box flexDirection="column">
        <Text bold color="yellow">
          ⚠  QUIT TO MAIN MENU?
        </Text>
        <Box marginTop={1}>
          <Text>Any unsaved progress will be lost!</Text>
        </Box>
        <Box marginTop={1}>
          <SelectInputComponent items={confirmItems} onSelect={handleQuitConfirm} />
        </Box>
      </Box>
    );
  }

  // Slot confirmation dialog
  if (confirmSlot !== null) {
    const confirmItems: MenuItem[] = [
      { label: 'Yes, Confirm', value: 'yes' },
      { label: 'No, Cancel', value: 'no' },
    ];
    return (
      <Box flexDirection="column">
        <Text bold color="yellow">
          {confirmSlot === -1
            ? '⚠ ⚠ ⚠  DELETE ALL SAVES? ⚠ ⚠ ⚠'
            : mode === 'delete'
            ? '⚠ DELETE SAVE?'
            : '⚠ OVERWRITE SAVE?'}
        </Text>
        <Box marginTop={1}>
          <Text>
            {confirmSlot === -1
              ? 'Permanently delete ALL save files? This CANNOT be undone!'
              : mode === 'delete'
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
      <Box flexDirection="column" alignItems="center" justifyContent="center">
        <Text bold color={messageType === 'success' ? 'green' : 'red'}>
          {message}
        </Text>
      </Box>
    );
  }

  // Main mode selection menu
  if (mode === 'menu') {
    const modeItems: MenuItem[] = [
      { label: 'Save Game', value: 'save' },
      { label: 'Load Game', value: 'load' },
      { label: 'Delete Save', value: 'delete' },
      { label: 'Quit to Main Menu', value: 'quit' },
    ];

    return (
      <Box flexDirection="column">
        <Box marginBottom={1}>
          <Text bold color="yellow">
            存 SAVE / LOAD
          </Text>
        </Box>
        <Box flexDirection="column">
          <Box marginBottom={1}>
            <Text dimColor>
              Save your progress or load a previous save
            </Text>
          </Box>
          <SelectInputComponent items={modeItems} onSelect={handleModeSelect} />
        </Box>
      </Box>
    );
  }

  // Save/Load/Delete slot selection
  const slotItems = buildSlotItems(mode === 'save', mode === 'delete');

  return (
    <Box flexDirection="column">
      <Box marginBottom={1}>
        <Text bold color="yellow">
          {mode === 'save' ? '💾 SAVE GAME' : mode === 'load' ? '📂 LOAD GAME' : '🗑️  DELETE SAVE'}
        </Text>
      </Box>
      <Box flexDirection="column">
        <Box marginBottom={1}>
          <Text dimColor>
            {mode === 'save'
              ? 'Select a slot to save your progress'
              : mode === 'load'
              ? 'Select a save to load'
              : 'Select a save to delete'}
          </Text>
        </Box>
        {slotItems.length > 1 ? (
          <SelectInputComponent items={slotItems} onSelect={handleSlotSelect} />
        ) : (
          <Box>
            <Text color="gray">No saves found.</Text>
          </Box>
        )}
      </Box>
    </Box>
  );
};
