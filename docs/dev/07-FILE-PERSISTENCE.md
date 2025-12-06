# File Persistence - SaveManager

**File:** `src/game/state/SaveManager.ts`
**Purpose:** File-based save/load for standalone executables
**Save Location:** `~/.beggars-sect/saves/`

---

## Overview

SaveManager handles persistent file storage for game saves. It's designed to work with pkg-bundled executables where the snapshot filesystem is read-only.

### Why File-Based?

1. **Standalone executables** - pkg bundles create read-only virtual filesystems
2. **Cross-platform** - Uses home directory, works on Windows/Mac/Linux
3. **Multiple saves** - Supports multiple save slots + auto-save
4. **Metadata** - Tracks chapter, scene, playtime for slot display

---

## Save Directory Structure

```
~/.beggars-sect/
└── saves/
    ├── saves.json       # Metadata for all slots
    ├── save_0.json      # Auto-save
    ├── save_1.json      # Manual save slot 1
    ├── save_2.json      # Manual save slot 2
    └── save_3.json      # Manual save slot 3
```

### Platform Paths

| Platform | Path |
|----------|------|
| Windows | `C:\Users\<username>\.beggars-sect\saves\` |
| macOS | `/Users/<username>/.beggars-sect/saves/` |
| Linux | `/home/<username>/.beggars-sect/saves/` |

---

## SaveSlot Interface

```typescript
interface SaveSlot {
  slot: number;       // 0 = auto-save, 1-3 = manual
  name: string;       // "Auto-Save" or custom name
  chapter: string;    // "Chapter 1" or "prologue"
  scene: string;      // Current scene ID
  playtime: number;   // Play time in milliseconds
  savedAt: number;    // Timestamp when saved
}
```

---

## Usage

### Import

```typescript
import { SaveManager } from '@game/state/SaveManager';
```

### Basic Save

```typescript
const gameData = JSON.stringify(gameState);
const metadata = {
  name: 'My Save',
  chapter: 'Chapter 1',
  scene: 'ch1_s3_training',
  playtime: 3600000,  // 1 hour in ms
  savedAt: Date.now()
};

const result = SaveManager.save(1, gameData, metadata);
if (result.success) {
  console.log('Saved!');
} else {
  console.error(result.error);
}
```

### Basic Load

```typescript
const result = SaveManager.load(1);
if (result.success && result.data) {
  const gameState = JSON.parse(result.data);
  // Restore game state
} else {
  console.error(result.error);
}
```

---

## API Reference

### save(slot, data, meta)

Save game data to a slot.

```typescript
save(
  slot: number,                    // Slot number (0-3)
  data: string,                    // JSON game data
  meta: Omit<SaveSlot, 'slot'>     // Metadata
): { success: boolean; error?: string }
```

**Example:**
```typescript
SaveManager.save(2, jsonData, {
  name: 'Before Boss Fight',
  chapter: 'Chapter 2',
  scene: 'ch2_boss_entrance',
  playtime: 7200000,
  savedAt: Date.now()
});
```

### load(slot)

Load game data from a slot.

```typescript
load(slot: number): {
  success: boolean;
  data?: string;       // JSON game data
  error?: string;
}
```

**Example:**
```typescript
const result = SaveManager.load(1);
if (result.success) {
  const state = JSON.parse(result.data!);
}
```

### delete(slot)

Delete a save slot.

```typescript
delete(slot: number): { success: boolean; error?: string }
```

**Example:**
```typescript
SaveManager.delete(2);  // Delete slot 2
```

### listSlots()

Get all save slot metadata.

```typescript
listSlots(): SaveSlot[]
```

**Example:**
```typescript
const slots = SaveManager.listSlots();
// [
//   { slot: 0, name: 'Auto-Save', chapter: 'Chapter 1', ... },
//   { slot: 1, name: 'My Save', chapter: 'Prologue', ... }
// ]
```

### hasSlot(slot)

Check if a slot has a save file.

```typescript
hasSlot(slot: number): boolean
```

### getSlotMeta(slot)

Get metadata for a specific slot.

```typescript
getSlotMeta(slot: number): SaveSlot | undefined
```

### getMaxSlots()

Get maximum number of slots (default: 3).

```typescript
getMaxSlots(): number  // Returns 3
```

### getSaveDir()

Get the save directory path.

```typescript
getSaveDir(): string  // "~/.beggars-sect/saves"
```

---

## Auto-Save

Slot 0 is reserved for auto-save.

### autoSave(data, meta)

```typescript
autoSave(
  data: string,
  meta: Omit<SaveSlot, 'slot' | 'name'>  // Name is always "Auto-Save"
): { success: boolean; error?: string }
```

**Example:**
```typescript
SaveManager.autoSave(jsonData, {
  chapter: 'Prologue',
  scene: 'p7_hidden_corner',
  playtime: 1800000,
  savedAt: Date.now()
});
```

### hasAutoSave()

```typescript
hasAutoSave(): boolean
```

### loadAutoSave()

```typescript
loadAutoSave(): { success: boolean; data?: string; error?: string }
```

---

## GameStore Integration

GameStore wraps SaveManager for convenience:

### Save to Slot

```typescript
// Through GameStore (recommended)
GameStore.saveToSlot(1, 'My Save');

// Equivalent to:
const data = GameStore.save();
SaveManager.save(1, data, { name: 'My Save', ... });
```

### Load from Slot

```typescript
// Through GameStore (recommended)
GameStore.loadFromSlot(1);

// Equivalent to:
const result = SaveManager.load(1);
if (result.success) {
  GameStore.load(result.data);
}
```

### Auto-Save Triggers

```typescript
// In StoryEngine or CombatEngine
GameStore.autoSave();

// Common trigger points:
// - Before player choices
// - Before combat
// - After chapter transitions
// - After significant events
```

---

## UI Implementation

### Save Screen Component

```tsx
function SaveScreen({ onBack }: { onBack: () => void }) {
  const slots = GameStore.getSaveSlots();
  const maxSlots = 3;

  const handleSave = (slot: number) => {
    const result = GameStore.saveToSlot(slot);
    if (result.success) {
      // Show success message
    } else {
      // Show error
    }
  };

  return (
    <Box flexDirection="column">
      <Text bold>Save Game</Text>

      {Array.from({ length: maxSlots }, (_, i) => {
        const slotNum = i + 1;
        const existing = slots.find(s => s.slot === slotNum);

        return (
          <Box key={slotNum}>
            <Text>{slotNum}. </Text>
            {existing ? (
              <Text>{existing.name} - {existing.chapter}</Text>
            ) : (
              <Text dimColor>Empty</Text>
            )}
          </Box>
        );
      })}
    </Box>
  );
}
```

### Load Screen Component

```tsx
function LoadScreen({ onBack, onLoad }: LoadScreenProps) {
  const slots = GameStore.getSaveSlots().filter(s => s.slot > 0);

  const handleLoad = (slot: number) => {
    const result = GameStore.loadFromSlot(slot);
    if (result.success) {
      onLoad();  // Navigate to game
    }
  };

  if (slots.length === 0) {
    return <Text dimColor>No saves found</Text>;
  }

  return (
    <Box flexDirection="column">
      <Text bold>Load Game</Text>
      {slots.map(slot => (
        <Text key={slot.slot}>
          {slot.slot}. {slot.name} - {slot.chapter}
          {formatPlaytime(slot.playtime)}
        </Text>
      ))}
    </Box>
  );
}
```

### Format Playtime

```typescript
function formatPlaytime(ms: number): string {
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}
```

---

## Error Handling

### Common Errors

| Error | Cause | Solution |
|-------|-------|----------|
| "Save file not found" | Slot empty | Check with `hasSlot()` first |
| "Permission denied" | No write access | Check directory permissions |
| "Save file corrupted" | Invalid JSON | Show error, offer delete |
| "Checksum mismatch" | Tampered file | Show warning, offer continue |

### Safe Load Pattern

```typescript
function safeLoad(slot: number): boolean {
  try {
    const result = GameStore.loadFromSlot(slot);

    if (!result.success) {
      showError(`Failed to load: ${result.error}`);
      return false;
    }

    return true;
  } catch (error) {
    showError('Unexpected error loading save');
    return false;
  }
}
```

### Overwrite Confirmation

```typescript
function handleSave(slot: number) {
  const existing = SaveManager.getSlotMeta(slot);

  if (existing) {
    // Show confirmation dialog
    showConfirm(`Overwrite "${existing.name}"?`, () => {
      performSave(slot);
    });
  } else {
    performSave(slot);
  }
}
```

---

## Checksum Validation

Game saves include a checksum for integrity:

```typescript
// In types/game.ts
export function generateChecksum(state: GameState): string {
  const data = JSON.stringify({
    player: state.player.name,
    chapter: state.storyProgress.chapter,
    scene: state.storyProgress.scene,
    gold: state.inventory.gold,
    time: state.stats.playTime,
  });

  // Simple hash
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString(36);
}
```

### Validation on Load

```typescript
// In GameStore.load()
const expectedChecksum = generateChecksum(saveData.state);
if (saveData.checksum !== expectedChecksum) {
  return { success: false, error: 'Save file corrupted (checksum mismatch)' };
}
```

---

## Configuration

### Custom Save Directory

```typescript
import { SaveManagerClass } from '@game/state/SaveManager';

const customSaveManager = new SaveManagerClass({
  maxSlots: 5,
  saveDir: '/custom/save/path'
});
```

### Default Configuration

```typescript
const DEFAULT_CONFIG = {
  maxSlots: 3,
  saveDir: path.join(os.homedir(), '.beggars-sect', 'saves')
};
```

---

## Best Practices

### 1. Auto-Save at Key Points

```typescript
// Before combat
GameStore.autoSave();
startCombat(enemies);

// Before choices
GameStore.autoSave();
showChoice(options);

// After chapter end
completeChapter();
GameStore.autoSave();
```

### 2. Show Save Feedback

```typescript
const result = GameStore.saveToSlot(slot);
if (result.success) {
  showMessage('Game saved!', 2000);  // Show for 2 seconds
} else {
  showError(`Save failed: ${result.error}`);
}
```

### 3. Handle Missing Saves Gracefully

```typescript
// Main menu
const hasSaves = GameStore.getSaveSlots().some(s => s.slot > 0);
const hasAutoSave = GameStore.hasAutoSave();

const menuItems = [
  { label: 'New Game', value: 'new' },
  ...(hasAutoSave ? [{ label: 'Continue', value: 'continue' }] : []),
  ...(hasSaves ? [{ label: 'Load Game', value: 'load' }] : []),
  { label: 'Quit', value: 'quit' }
];
```

### 4. Test Save/Load Cycle

```typescript
// In development/testing
const original = GameStore.getState();
const json = GameStore.save();
GameStore.reset();
GameStore.load(json);
const restored = GameStore.getState();

// Verify critical data matches
assert(original.player.name === restored.player.name);
assert(original.storyProgress.scene === restored.storyProgress.scene);
```

---

## File Locations

```
src/game/state/
├── SaveManager.ts   # File I/O operations
└── GameStore.ts     # State + persistence integration
```

---

**Last Updated:** 2025-12-06
