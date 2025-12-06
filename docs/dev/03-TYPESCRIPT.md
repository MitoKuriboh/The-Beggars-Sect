# TypeScript Configuration for CLI Apps

**Version Used:** 5.3.3
**Purpose:** Type-safe JavaScript with compile-time checking
**Documentation:** https://www.typescriptlang.org/docs/

---

## Overview

TypeScript adds static types to JavaScript, catching errors before runtime. For CLI applications, this means:

- **Type safety** for game state, combat, and story data
- **Autocomplete** in editors for better development experience
- **Refactoring** confidence when changing code
- **Documentation** through type definitions

---

## Project Configuration (tsconfig.json)

### The Beggars Sect Configuration

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "CommonJS",
    "lib": ["ES2022"],
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "moduleResolution": "node",
    "baseUrl": "./src",
    "paths": {
      "@/*": ["./*"],
      "@game/*": ["./game/*"],
      "@ui/*": ["./ui/*"],
      "@data/*": ["./data/*"],
      "@automation/*": ["./automation/*"],
      "@utils/*": ["./utils/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

---

## Key Configuration Options

### target

The JavaScript version to compile to:

| Value | Use Case |
|-------|----------|
| `ES2022` | Modern Node.js (18+) - recommended |
| `ES2020` | Broader compatibility |
| `ES2017` | Older Node.js versions |

```json
"target": "ES2022"
```

### module

The module system for output:

| Value | Use Case |
|-------|----------|
| `CommonJS` | Node.js, pkg bundling (required for pkg) |
| `ESNext` | Modern ES modules |
| `NodeNext` | Node.js with ES modules |

```json
"module": "CommonJS"
```

**Important:** For pkg bundling, use `CommonJS`. ESM causes issues with pkg.

### jsx

JSX transformation mode:

| Value | Use Case |
|-------|----------|
| `react-jsx` | React 17+ automatic runtime |
| `react` | Classic React.createElement |
| `preserve` | Keep JSX for other tools |

```json
"jsx": "react-jsx"
```

### strict

Enables all strict type checking:

```json
"strict": true
```

This enables:
- `noImplicitAny` - Error on implicit any types
- `strictNullChecks` - Null/undefined checks
- `strictFunctionTypes` - Function type checking
- `strictBindCallApply` - Bind/call/apply checking
- `strictPropertyInitialization` - Property initialization
- `noImplicitThis` - Error on implicit this
- `alwaysStrict` - Emit "use strict"

### Path Aliases

Clean imports instead of relative paths:

```json
"baseUrl": "./src",
"paths": {
  "@/*": ["./*"],
  "@game/*": ["./game/*"],
  "@ui/*": ["./ui/*"]
}
```

**Usage:**
```tsx
// Instead of this:
import { GameStore } from '../../../game/state/GameStore';

// Use this:
import { GameStore } from '@game/state/GameStore';
```

---

## Type Definition Patterns

### Basic Types

```typescript
// Primitives
const name: string = 'Li Wei';
const health: number = 100;
const isAlive: boolean = true;

// Arrays
const skills: string[] = ['Palm Strike', 'Block'];
const stats: number[] = [10, 20, 30];

// Objects
const player: { name: string; level: number } = {
  name: 'Li Wei',
  level: 1
};
```

### Interfaces

Define object shapes:

```typescript
interface Character {
  id: string;
  name: string;
  stats: CharacterStats;
  techniques: Technique[];
}

interface CharacterStats {
  health: number;
  maxHealth: number;
  chi: number;
  maxChi: number;
  attack: number;
  defense: number;
  speed: number;
}
```

### Type Aliases

Create reusable types:

```typescript
// Union types
type Stance = 'flowing' | 'rooted' | 'rising';
type Status = 'active' | 'stunned' | 'defending';

// Complex types
type CombatAction =
  | { type: 'attack'; target: string }
  | { type: 'technique'; techniqueId: string; target: string }
  | { type: 'defend' }
  | { type: 'flee' };
```

### Enums

For fixed sets of values:

```typescript
enum ChiAspect {
  Fire = 'fire',
  Water = 'water',
  Earth = 'earth',
  Metal = 'metal',
  Wood = 'wood',
  Wind = 'wind',
  Lightning = 'lightning',
  Void = 'void'
}

enum CombatPhase {
  PlayerTurn = 'player_turn',
  EnemyTurn = 'enemy_turn',
  Victory = 'victory',
  Defeat = 'defeat'
}
```

### Generics

Reusable type patterns:

```typescript
// Generic interface
interface Result<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Usage
const combatResult: Result<CombatReward> = {
  success: true,
  data: { experience: 100, gold: 50 }
};

// Generic function
function findById<T extends { id: string }>(
  items: T[],
  id: string
): T | undefined {
  return items.find(item => item.id === id);
}
```

---

## React Component Types

### Function Components

```typescript
import { FC, ReactNode } from 'react';

// Simple props
interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button: FC<ButtonProps> = ({ label, onClick }) => (
  <Box>
    <Text>{label}</Text>
  </Box>
);

// With children
interface ContainerProps {
  title: string;
  children: ReactNode;
}

const Container: FC<ContainerProps> = ({ title, children }) => (
  <Box flexDirection="column">
    <Text bold>{title}</Text>
    {children}
  </Box>
);
```

### Props with Optional Fields

```typescript
interface MenuProps {
  items: MenuItem[];
  onSelect: (item: MenuItem) => void;
  title?: string;  // Optional
  isFocused?: boolean;  // Optional with default
}

function Menu({
  items,
  onSelect,
  title = 'Menu',  // Default value
  isFocused = true
}: MenuProps) {
  // ...
}
```

### Event Handler Types

```typescript
// Ink input handler
type InputHandler = (input: string, key: Key) => void;

// Custom handlers
type SelectHandler<T> = (item: T) => void;
type ActionHandler = (action: CombatAction) => void;

// Usage
const handleSelect: SelectHandler<MenuItem> = (item) => {
  console.log(`Selected: ${item.label}`);
};
```

---

## Project Type Organization

### Directory Structure

```
src/types/
├── character.ts    # Character, Enemy, Stats
├── combat.ts       # Combat, Damage, Turn
├── technique.ts    # Technique, Combo, Mastery
├── story.ts        # Scene, Choice, Chapter
├── item.ts         # Item, Inventory
├── game.ts         # GameState, SaveData
└── index.ts        # Re-exports
```

### Re-exporting Types

```typescript
// src/types/index.ts
export * from './character';
export * from './combat';
export * from './technique';
export * from './story';
export * from './item';
export * from './game';
```

**Usage:**
```typescript
import { Character, Combat, Technique } from '@/types';
```

---

## Common Patterns

### Discriminated Unions

Handle different action types safely:

```typescript
type GameAction =
  | { type: 'START_COMBAT'; enemies: Enemy[] }
  | { type: 'END_COMBAT'; result: 'victory' | 'defeat' }
  | { type: 'ADVANCE_STORY'; sceneId: string }
  | { type: 'USE_ITEM'; itemId: string };

function handleAction(action: GameAction) {
  switch (action.type) {
    case 'START_COMBAT':
      // TypeScript knows action.enemies exists here
      startCombat(action.enemies);
      break;
    case 'END_COMBAT':
      // TypeScript knows action.result exists here
      if (action.result === 'victory') {
        showVictory();
      }
      break;
    // ... etc
  }
}
```

### Type Guards

Narrow types at runtime:

```typescript
function isEnemy(entity: Character | Enemy): entity is Enemy {
  return 'aiPattern' in entity;
}

// Usage
function processEntity(entity: Character | Enemy) {
  if (isEnemy(entity)) {
    // TypeScript knows entity is Enemy here
    executeAI(entity.aiPattern);
  } else {
    // TypeScript knows entity is Character here
    processPlayerTurn();
  }
}
```

### Utility Types

Built-in type transformations:

```typescript
// Partial - all properties optional
type PartialCharacter = Partial<Character>;

// Required - all properties required
type RequiredConfig = Required<Config>;

// Pick - select specific properties
type CharacterBasics = Pick<Character, 'id' | 'name' | 'level'>;

// Omit - exclude specific properties
type CharacterWithoutSecrets = Omit<Character, 'password'>;

// Record - object with specific key/value types
type StatsMap = Record<string, number>;

// Readonly - immutable object
type ImmutableState = Readonly<GameState>;
```

---

## Type-Safe State Management

### GameStore Types

```typescript
interface GameState {
  player: Character;
  currentScene: string;
  flags: Record<string, boolean>;
  inventory: InventoryItem[];
  relationships: Record<string, number>;
}

interface GameStore {
  getState(): GameState;
  updatePlayer(updates: Partial<Character>): void;
  setFlag(flag: string, value: boolean): void;
  addItem(item: InventoryItem): void;
  subscribe(listener: (state: GameState) => void): () => void;
}
```

### Combat Types

```typescript
interface CombatState {
  phase: CombatPhase;
  turnOrder: string[];
  currentTurn: number;
  combatants: Map<string, Combatant>;
  log: CombatLogEntry[];
}

interface Combatant {
  id: string;
  entity: Character | Enemy;
  atb: number;
  effects: StatusEffect[];
}

interface CombatLogEntry {
  timestamp: number;
  type: 'attack' | 'technique' | 'effect' | 'status';
  message: string;
  source?: string;
  target?: string;
  damage?: number;
}
```

---

## Common Errors & Solutions

### "Property does not exist"

```typescript
// Error: Property 'foo' does not exist
const obj: { bar: number } = { bar: 1 };
obj.foo; // Error!

// Solution: Add the property to the type
interface MyObject {
  bar: number;
  foo?: string;  // Optional
}
```

### "Type 'X' is not assignable to type 'Y'"

```typescript
// Error
const stance: Stance = 'invalid'; // Error!

// Solution: Use valid union member
const stance: Stance = 'flowing'; // OK
```

### "Object is possibly 'undefined'"

```typescript
// Error
const item = items.find(i => i.id === id);
item.name; // Error: item might be undefined

// Solution 1: Optional chaining
item?.name;

// Solution 2: Non-null assertion (use carefully)
item!.name;

// Solution 3: Guard clause
if (!item) {
  throw new Error('Item not found');
}
item.name; // OK, TypeScript knows item exists
```

---

## Build Commands

```bash
# Compile TypeScript
npm run build
# Runs: tsc

# Watch mode (development)
npm run dev
# Runs: tsx watch src/index.tsx

# Type check without emitting
npx tsc --noEmit

# Check specific file
npx tsc --noEmit src/game/state/GameStore.ts
```

---

## Resources

- **TypeScript Handbook:** https://www.typescriptlang.org/docs/handbook/
- **TypeScript Playground:** https://www.typescriptlang.org/play
- **React TypeScript Cheatsheet:** https://react-typescript-cheatsheet.netlify.app/

---

**Last Updated:** 2025-12-06
