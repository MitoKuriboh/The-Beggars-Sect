/**
 * Save/Load Screen
 * UI for managing save files
 */

import React, { useState, useCallback, useRef, useEffect } from "react";
import { Box, Text } from "ink";
import { GameStore } from "../game/state/GameStore";
import {
  CenteredScreen,
  PolishedBox,
  MessageBox,
  ConfirmationBox,
} from "./components/PolishedBox";
import { SelectMenu } from "./components/Menu";
import type { MenuItem } from "./components/Menu";

// =============================================================================
// TYPES
// =============================================================================

type Mode = "save" | "load";
type InternalMode = "normal" | "delete";

interface SaveLoadScreenProps {
  mode: Mode;
  onComplete: () => void;
  onBack: () => void;
}

// =============================================================================
// HELPERS
// =============================================================================

function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
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
  const [internalMode, setInternalMode] = useState<InternalMode>("normal");
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error">(
    "success",
  );
  const [confirmSlot, setConfirmSlot] = useState<number | null>(null);
  const [confirmDeleteAll, setConfirmDeleteAll] = useState(false);

  // Timeout refs for cleanup on unmount
  const completeTimeoutRef = useRef<NodeJS.Timeout>();
  const messageTimeoutRef = useRef<NodeJS.Timeout>();

  // Cleanup timeouts on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      if (completeTimeoutRef.current) clearTimeout(completeTimeoutRef.current);
      if (messageTimeoutRef.current) clearTimeout(messageTimeoutRef.current);
    };
  }, []);

  const slots = GameStore.getSaveSlots();

  // Build menu items
  const buildMenuItems = (): MenuItem[] => {
    const items: MenuItem[] = [];

    // Delete mode - show delete options
    if (internalMode === "delete") {
      // Add "Delete All" option if there are saves
      if (slots.filter((s) => s.slot >= 1 && s.slot <= 3).length > 0) {
        items.push({
          label: "⚠️  Delete ALL Saves (permanent!)",
          value: "delete-all",
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

      items.push({ label: "Back", value: "back" });
      return items;
    }

    // Normal mode
    // Add auto-save option for load mode only (not deletable from main menu)
    if (mode === "load" && internalMode === "normal") {
      const autoSave = slots.find((s) => s.slot === 0);
      if (autoSave) {
        items.push({
          label: `[Auto] ${autoSave.chapter} - ${formatDate(autoSave.savedAt)}`,
          value: "auto",
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
      } else if (mode === "save") {
        items.push({
          label: `Slot ${i}: [Empty]`,
          value: `slot-${i}`,
        });
      }
    }

    // Add delete option for load mode
    if (
      mode === "load" &&
      slots.filter((s) => s.slot >= 1 && s.slot <= 3).length > 0
    ) {
      items.push({ label: "Delete Save", value: "delete-mode" });
    }

    // Add back option
    items.push({ label: "Back", value: "back" });

    return items;
  };

  const handleSelect = useCallback(
    (item: MenuItem) => {
      if (item.value === "back") {
        if (internalMode === "delete") {
          setInternalMode("normal");
        } else {
          onBack();
        }
        return;
      }

      if (item.value === "delete-mode") {
        setInternalMode("delete");
        return;
      }

      if (item.value === "delete-all") {
        setConfirmDeleteAll(true);
        return;
      }

      if (item.value === "auto") {
        // Load auto-save
        const result = GameStore.loadAutoSave();
        if (result.success) {
          setMessage("Auto-save loaded!");
          setMessageType("success");
          completeTimeoutRef.current = setTimeout(onComplete, 1000);
        } else {
          setMessage(result.error || "Failed to load");
          setMessageType("error");
        }
        return;
      }

      // Parse slot number
      const slotNum = parseInt(item.value.replace("slot-", ""), 10);

      if (internalMode === "delete") {
        setConfirmSlot(slotNum);
      } else if (mode === "save") {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps -- performLoad/performSave are stable
    [mode, internalMode, slots, onBack, onComplete],
  );

  const performSave = (slot: number) => {
    const result = GameStore.saveToSlot(slot);
    if (result.success) {
      setMessage(`Saved to Slot ${slot}!`);
      setMessageType("success");
      completeTimeoutRef.current = setTimeout(onComplete, 1000);
    } else {
      setMessage(result.error || "Failed to save");
      setMessageType("error");
    }
    setConfirmSlot(null);
  };

  const performLoad = (slot: number) => {
    const result = GameStore.loadFromSlot(slot);
    if (result.success) {
      setMessage(`Loaded from Slot ${slot}!`);
      setMessageType("success");
      completeTimeoutRef.current = setTimeout(onComplete, 1000);
    } else {
      setMessage(result.error || "Failed to load");
      setMessageType("error");
    }
  };

  const performDelete = (slot: number) => {
    const result = GameStore.deleteSlot(slot);
    if (result.success) {
      setMessage(`Deleted Slot ${slot}!`);
      setMessageType("success");
      messageTimeoutRef.current = setTimeout(() => {
        setMessage(null);
        setInternalMode("normal");
      }, 1500);
    } else {
      setMessage(result.error || "Failed to delete");
      setMessageType("error");
      messageTimeoutRef.current = setTimeout(() => setMessage(null), 2000);
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
      setMessage("All saves deleted!");
      setMessageType("success");
      messageTimeoutRef.current = setTimeout(() => {
        setMessage(null);
        setInternalMode("normal");
      }, 1500);
    } else {
      setMessage("Some saves could not be deleted");
      setMessageType("error");
      messageTimeoutRef.current = setTimeout(() => setMessage(null), 2000);
    }
    setConfirmDeleteAll(false);
  };

  // Handle confirmation selections
  const handleDeleteAllConfirm = useCallback((item: MenuItem) => {
    if (item.value === "yes") {
      performDeleteAll();
    } else {
      setConfirmDeleteAll(false);
    }
  }, []);

  const handleSlotConfirm = useCallback(
    (item: MenuItem) => {
      if (item.value === "yes") {
        if (internalMode === "delete") {
          performDelete(confirmSlot!);
        } else {
          performSave(confirmSlot!);
        }
      } else {
        setConfirmSlot(null);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps -- performSave/performDelete are stable
    [internalMode, confirmSlot],
  );

  // Delete all confirmation
  if (confirmDeleteAll) {
    const confirmItems: MenuItem[] = [
      { label: "Yes, Delete All", value: "yes" },
      { label: "No, Cancel", value: "no" },
    ];
    return (
      <ConfirmationBox
        title="⚠ DELETE ALL SAVES?"
        message="Permanently delete ALL save files? This CANNOT be undone!"
        type="warning"
      >
        <SelectMenu items={confirmItems} onSelect={handleDeleteAllConfirm} />
      </ConfirmationBox>
    );
  }

  // Slot confirmation dialog
  if (confirmSlot !== null) {
    const confirmItems: MenuItem[] = [
      { label: "Yes, Confirm", value: "yes" },
      { label: "No, Cancel", value: "no" },
    ];
    return (
      <ConfirmationBox
        title={internalMode === "delete" ? "⚠ DELETE SAVE?" : "OVERWRITE SAVE?"}
        message={
          internalMode === "delete"
            ? `Permanently delete Slot ${confirmSlot}? This cannot be undone.`
            : `Slot ${confirmSlot} already has a save. Overwrite it?`
        }
        type="warning"
      >
        <SelectMenu items={confirmItems} onSelect={handleSlotConfirm} />
      </ConfirmationBox>
    );
  }

  // Message display
  if (message) {
    return <MessageBox message={message} type={messageType} />;
  }

  const menuItems = buildMenuItems();

  const icon = internalMode === "delete" ? "🗑" : mode === "save" ? "💾" : "📂";
  const title =
    internalMode === "delete"
      ? "DELETE SAVE"
      : mode === "save"
        ? "SAVE GAME"
        : "LOAD GAME";
  const subtitle =
    internalMode === "delete"
      ? "Select a save to delete"
      : mode === "save"
        ? "Select a slot to save your progress"
        : "Select a save to load";

  return (
    <CenteredScreen>
      <PolishedBox
        title={title}
        subtitle={subtitle}
        icon={icon}
        footer="Press ESC to return"
      >
        <SelectMenu items={menuItems} onSelect={handleSelect} />

        {mode === "load" && slots.length === 0 && (
          <Box marginTop={1}>
            <Text color="gray">No saves found.</Text>
          </Box>
        )}
      </PolishedBox>
    </CenteredScreen>
  );
};
