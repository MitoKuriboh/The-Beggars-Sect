# State Management - GameStore Pattern

**File:** `src/game/state/GameStore.ts`
**Pattern:** Singleton Store with Observer
**Purpose:** Central state management for all game data

---

## Overview

The GameStore is a singleton class that manages all persistent game state. It provides:

- **Single source of truth** for game data
- **Type-safe mutations** through dedicated methods
- **Observer pattern** for UI updates
- **Persistence** through save/load methods

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         GameStore                                │
│                                                                  │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐      │
│  │    State     │    │   Methods    │    │  Listeners   │      │
│  │              │    │              │    │              │      │
│  │  - player    │    │ - getState() │    │  Set<()=>void>│     │
│  │  - inventory │◄───│ - updateX()  │───►│  notifies on │      │
│  │  - progress  │    │ - save()     │    │  every change │     │
│  │  - flags     │    │ - load()     │    │              │      │
│  │  - stats     │    │              │    │              │      │
│  └──────────────┘    └──────────────┘    └──────────────┘      │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
           │                                        │
           ▼                                        ▼
    ┌─────────────┐                        ┌─────────────┐
    │ SaveManager │                        │ React/Ink   │
    │ (File I/O)  │                        │ Components  │
    └─────────────┘                        └─────────────┘
```

---

## GameState Structure

```typescript
interface GameState {
  // Meta
  version: string;           // Save format version
  saveSlot: number;          // Current save slot
  createdAt: number;         // Game start timestamp
  updatedAt: number;         // Last update timestamp

  // Player
  player: Character;         // Player character data
  inventory: Inventory;      // Items, gold, equipment

  // Progression
  storyProgress: StoryProgress;  // Chapter, scene, choices
  storyState?: StoryState;       // Full story engine state
  currentLocation: string;       // Current area ID

  // Unlocks
  discoveredTechniques: string[];
  discoveredCombos: string[];
  discoveredLocations: string[];

  // Relationships
  npcRelationships: NPCRelationship[];

  // Flags
  flags: GameFlags;          // Boolean flags for events

  // Statistics
  stats: GameStats;          // Play stats (time, kills, etc.)
}
```

---

## Usage

### Import

```typescript
import { GameStore } from '@game/state/GameStore';
```

### Initialize New Game

```typescript
import { CharacterFactory } from '@game/factories/CharacterFactory';

// Create player character
const player = CharacterFactory.createPlayer('Li Wei');

// Initialize game state
GameStore.initializeNewGame(player);
```

### Check Initialization

```typescript
if (GameStore.isInitialized()) {
  // Game is ready
}
```

---

## Getters

### Get Full State

```typescript
const state = GameStore.getState();
// Returns full GameState object
```

### Get Player

```typescript
const player = GameStore.getPlayer();
console.log(player.name);      // "Li Wei"
console.log(player.hp);        // 100
console.log(player.level);     // 1
```

### Get Inventory

```typescript
const inventory = GameStore.getInventory();
console.log(inventory.gold);   // 0
console.log(inventory.items);  // []
```

### Get Story Progress

```typescript
const progress = GameStore.getStoryProgress();
console.log(progress.chapter); // "prologue"
console.log(progress.scene);   // "p1_void"
```

### Get Flags

```typescript
// Get all flags
const flags = GameStore.getFlags();

// Get specific flag
const hasMetGuide = GameStore.getFlag('met_blind_guide');
```

### Get Stats

```typescript
const stats = GameStore.getStats();
console.log(stats.totalCombats);
console.log(stats.playTime);
```

### Get Discovered Techniques

```typescript
const techniques = GameStore.getDiscoveredTechniques();
// ['palm-strike', 'block', 'flowing-palm']
```

---

## Mutations

### Update Player

```typescript
// Partial update
GameStore.updatePlayer({
  level: 2,
  experience: 150
});

// Update stats
GameStore.updatePlayer({
  attack: player.attack + 5,
  defense: player.defense + 3
});
```

### Set Player HP/Chi (Clamped)

```typescript
// Automatically clamped to valid range
GameStore.setPlayerHp(80);      // Set to 80
GameStore.setPlayerHp(-10);     // Clamped to 0
GameStore.setPlayerHp(999);     // Clamped to maxHp

GameStore.setPlayerChi(50);     // Set to 50
```

### Inventory Operations

```typescript
// Update inventory
GameStore.updateInventory({
  gold: 100
});

// Add gold
GameStore.addGold(50);  // Now 150

// Spend gold (returns false if insufficient)
const success = GameStore.spendGold(30);  // Now 120, returns true
const failed = GameStore.spendGold(200);  // Still 120, returns false
```

### Story Progress

```typescript
// Update progress
GameStore.updateStoryProgress({
  chapter: 1,
  scene: 'ch1_s1_training'
});

// Record a choice
GameStore.recordChoice('path_selection', 'blade');

// Advance to next scene
GameStore.advanceScene('ch1_s2_first_fight');
```

### Location

```typescript
// Set location (auto-tracks discovery)
GameStore.setLocation('training-grounds');
// Adds to discoveredLocations if new
```

### Flags

```typescript
// Set a flag
GameStore.setFlag('completed_prologue', true);
GameStore.setFlag('chose_blade_path', true);

// Check flag
if (GameStore.getFlag('met_blind_guide')) {
  // ...
}
```

### Statistics

```typescript
// Increment stats
GameStore.incrementStat('totalCombats');
GameStore.incrementStat('totalDamageDealt', 150);
GameStore.incrementStat('techniqueUsed');

// Record enemy defeated
GameStore.recordEnemyDefeated('street-punk');
```

### Techniques

```typescript
// Discover new technique
const isNew = GameStore.discoverTechnique('sweeping-palm');
// Returns true if newly discovered, false if already known
// Also adds to player's available techniques

// Record technique use (for mastery)
const newCount = GameStore.recordTechniqueUse('palm-strike');
// Returns new use count
```

### NPC Relationships

```typescript
// Update relationship
GameStore.updateNpcRelationship('blind-guide', 10);   // +10 affinity
GameStore.updateNpcRelationship('street-thug', -15);  // -15 affinity
// Affinity clamped to -100 to 100
```

### Story State Sync

```typescript
// Get story state (for StoryEngine)
const storyState = GameStore.getStoryState();

// Set story state (from StoryEngine)
GameStore.setStoryState(newStoryState);
```

---

## Persistence

### Save/Load (In-Memory)

```typescript
// Serialize to JSON string
const saveJson = GameStore.save();

// Load from JSON string
const result = GameStore.load(saveJson);
if (!result.success) {
  console.error(result.error);
}
```

### File-Based Persistence

```typescript
// Save to slot (1-3)
const result = GameStore.saveToSlot(1, 'My Save');

// Load from slot
const result = GameStore.loadFromSlot(1);

// Auto-save (slot 0)
GameStore.autoSave();

// Load auto-save
GameStore.loadAutoSave();

// Check if auto-save exists
if (GameStore.hasAutoSave()) {
  // Show "Continue" option
}

// List all saves
const slots = GameStore.getSaveSlots();
// [{ slot: 0, name: 'Auto-Save', chapter: '...', ... }, ...]

// Delete save
GameStore.deleteSlot(1);
```

### Reset Game

```typescript
GameStore.reset();
// Clears all state, ready for new game
```

---

## Subscriptions

### Subscribe to Changes

```typescript
// Subscribe to state changes
const unsubscribe = GameStore.subscribe(() => {
  // Called whenever state changes
  console.log('State updated!');
  const player = GameStore.getPlayer();
  updateUI(player);
});

// Unsubscribe when done
unsubscribe();
```

### React Integration

```tsx
import { useState, useEffect } from 'react';
import { GameStore } from '@game/state/GameStore';

function useGameState() {
  const [, forceUpdate] = useState({});

  useEffect(() => {
    // Re-render on any state change
    const unsubscribe = GameStore.subscribe(() => {
      forceUpdate({});
    });
    return unsubscribe;
  }, []);

  return GameStore.isInitialized() ? GameStore.getState() : null;
}

// Usage in component
function PlayerStats() {
  const state = useGameState();

  if (!state) return <Text>Loading...</Text>;

  return (
    <Box flexDirection="column">
      <Text>HP: {state.player.hp}/{state.player.maxHp}</Text>
      <Text>Chi: {state.player.chi}/{state.player.maxChi}</Text>
    </Box>
  );
}
```

---

## Patterns & Best Practices

### Always Use Methods, Not Direct State

```typescript
// Wrong - bypasses notifications
const state = GameStore.getState();
state.player.hp = 50; // UI won't update!

// Right - uses method
GameStore.setPlayerHp(50); // UI updates automatically
```

### Check Initialization

```typescript
// Always check before accessing state
if (GameStore.isInitialized()) {
  const player = GameStore.getPlayer();
} else {
  // Show menu/loading screen
}
```

### Handle Persistence Errors

```typescript
const result = GameStore.loadFromSlot(1);
if (!result.success) {
  // Show error to user
  showError(result.error);
}
```

### Clean Up Subscriptions

```typescript
useEffect(() => {
  const unsubscribe = GameStore.subscribe(handler);
  return unsubscribe; // Clean up on unmount
}, []);
```

---

## Type Definitions

### Key Types

```typescript
// Character stats
interface CharacterStats {
  attack: number;
  defense: number;
  speed: number;
  vitality: number;
  chiPower: number;
}

// Story progress
interface StoryProgress {
  chapter: number;
  scene: string;
  completedScenes: string[];
  choices: Record<string, string>;
}

// Game statistics
interface GameStats {
  playTime: number;
  totalCombats: number;
  totalVictories: number;
  totalDefeats: number;
  totalFlees: number;
  totalDamageDealt: number;
  totalDamageTaken: number;
  totalHealing: number;
  totalChiUsed: number;
  techniquesUsed: number;
  combosExecuted: number;
  criticalHits: number;
  perfectBlocks: number;
  enemyTypesDefeated: string[];
}
```

---

## File Location

```
src/game/state/
├── GameStore.ts     # Main store singleton
└── SaveManager.ts   # File persistence
```

---

**Last Updated:** 2025-12-06
