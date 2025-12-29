# CODE-DNA: The Beggars Sect Game

**Version:** 1.0 | **Updated:** 2025-12-30 | **Architecture:** AAA-Grade

---

## TL;DR

CLI RPG built with React/Ink. AAA architecture patterns: centralized config (`GameBalance.ts`), reusable hooks (`useMenuNavigation`), design system (`SEMANTIC_DIVIDERS`). Types in `src/types/`. Path aliases: `@game/*`, `@ui/*`, `@types/*`.

---

## Quick Reference

| Aspect | Value |
|--------|-------|
| **Stack** | TypeScript 5.3, React 18.2, Ink 3.2 |
| **Platform** | CLI (Node.js 18+) |
| **Source** | ~7,700 lines |
| **Types** | `src/types/` (7 files) |
| **Entry** | `src/index.tsx` |
| **Build** | `npm run build` → `dist/` |

---

## Project Structure

```
src/
├── index.tsx              # Entry point
├── types/                 # TypeScript definitions (@types/*)
│   ├── character.ts       # Player, stats, status
│   ├── combat.ts          # Combat state, actions
│   ├── story.ts           # Story types
│   ├── game.ts            # Game state types
│   ├── item.ts            # Items, equipment
│   └── technique.ts       # Techniques, combos
│
├── game/                  # Game logic (@game/*)
│   ├── config/            # Centralized configuration
│   │   └── GameBalance.ts # ALL game constants (327 lines)
│   ├── utils/             # Reusable utilities
│   ├── combat/            # Combat systems
│   ├── state/             # State management
│   ├── story/             # Story engine
│   └── factories/         # Object creation
│
├── ui/                    # UI layer (@ui/*)
│   ├── hooks/             # Custom React hooks
│   ├── components/        # Reusable components
│   ├── config/            # UI configuration
│   ├── theme/             # Design system
│   ├── combat/            # Combat UI
│   ├── story/             # Story UI
│   ├── menus/             # Game menus
│   └── App.tsx            # Root component
│
├── data/                  # Static data (@data/*)
└── utils/                 # General utilities (@utils/*)
```

---

## Path Aliases

| Alias | Maps To | Usage |
|-------|---------|-------|
| `@/*` | `src/*` | General imports |
| `@game/*` | `src/game/*` | Game logic |
| `@ui/*` | `src/ui/*` | UI components |
| `@types/*` | `src/types/*` | Type definitions |
| `@data/*` | `src/data/*` | Static data |
| `@utils/*` | `src/utils/*` | Utilities |

**Import examples:**
```typescript
import { Character } from '@types/character';
import { CombatEngine } from '@game/combat';
import { useMenuNavigation } from '@ui/hooks';
import { GAME_BALANCE } from '@game/config';
```

---

## Core Patterns

### 1. Centralized Configuration

**All game constants in ONE file:**

```typescript
// src/game/config/GameBalance.ts
export const GAME_BALANCE = {
  atb: {
    turnVariance: 5,
    dexSpeedDivisor: 5,
  },
  combat: {
    basicAttackPower: 10,
    critChancePerDex: 0.01,
  },
  // ... 10 modules total
} as const;
```

| Rule | Rationale |
|------|-----------|
| NO magic numbers in code | Tuning requires ONE file change |
| Use `as const` | Type-safe, immutable |
| Group by system | Easy to find |

### 2. Custom Hooks for UI Logic

**Reusable keyboard navigation:**

```typescript
// src/ui/hooks/useMenuNavigation.ts
const { selectedIndex } = useMenuNavigation({
  itemCount: items.length,
  onSelect: handleSelect,
  onBack: () => setMenuOpen(false),
  circular: true,
});
```

| Hook | Purpose | Lines Saved |
|------|---------|-------------|
| `useMenuNavigation` | Keyboard nav | 100+ per menu |
| `useCombatState` | Combat UI state | 50+ |
| `useStoryState` | Story UI state | 70+ |
| `useStateWithRef` | Async-safe state | Stale closure bugs |

### 3. Design System

**Centralized dividers:**

```typescript
// src/ui/theme/dividers.ts
export const SEMANTIC_DIVIDERS = {
  combat: '─'.repeat(85),
  story: '─'.repeat(84),
  menu: '─'.repeat(75),
} as const;

// Usage
<Text dimColor>{SEMANTIC_DIVIDERS.combat}</Text>
```

**UI timing constants:**

```typescript
// src/ui/config/constants.ts
export const UI_CONFIG = {
  combat: {
    enemyActionDelay: 300,
    turnTransitionDelay: 500,
  },
} as const;
```

### 4. Component Patterns

**Standard menu wrapper:**

```typescript
<MenuContainer
  title="Your Action"
  titleIcon="⚡"
  color="cyan"
  footer="SPACE to select"
>
  {children}
</MenuContainer>
```

**Container-Presentational separation:**
- Business logic in containers/hooks
- Pure rendering in components
- No direct GameStore access in UI components

---

## Game Logic Patterns

### State Management

| Pattern | Implementation |
|---------|----------------|
| **Singleton** | `GameStore` - single source of truth |
| **Observer** | `subscribe()` for state changes |
| **Factory** | `CharacterFactory` for player/enemy creation |

```typescript
// State access
import { GameStore } from '@game/state';
const state = GameStore.getState();

// Subscriptions
const unsubscribe = GameStore.subscribe(() => {
  // React to changes
});
```

### Combat System

| Component | Responsibility |
|-----------|---------------|
| `CombatEngine` | Orchestration (878 lines) |
| `AIController` | Enemy decisions (340 lines) |
| `TechniqueRegistry` | 55+ techniques (1456 lines) |

**Use utilities for common logic:**

```typescript
import { StatusEffectUtils } from '@game/utils';
import { ConditionParser } from '@game/utils';
import { ComparisonEvaluator } from '@game/utils';
```

### Story System

| Component | Responsibility |
|-----------|---------------|
| `StoryEngine` | Story progression |
| `chapters/` | Chapter scripts |

**Scene structure:**
```typescript
{
  id: 'scene-1',
  type: 'cutscene',
  content: [...],
  choices: [...],
  outcomes: {...},
}
```

---

## Type Patterns

### Discriminated Unions

```typescript
// src/types/combat.ts
type CombatAction =
  | { type: 'attack'; target: Character }
  | { type: 'technique'; technique: Technique; target: Character }
  | { type: 'defend' }
  | { type: 'flee' };
```

### Type-Safe Config

```typescript
// Always use `as const` for configs
export const PATHS = {
  blade: { name: 'Blade', color: 'red' },
  stream: { name: 'Stream', color: 'blue' },
  shadow: { name: 'Shadow', color: 'gray' },
} as const;

type PathId = keyof typeof PATHS;
```

### Required Fields

| Entity | Required Types |
|--------|---------------|
| Character | `Character`, `CharacterStats`, `StatusEffect` |
| Combat | `CombatState`, `CombatAction`, `ActionResult` |
| Story | `Scene`, `Choice`, `StoryResult` |
| Technique | `Technique`, `TechniqueEffect`, `ComboRole` |

---

## Performance Patterns

### Terminal Optimization

```typescript
// Alternative screen buffer
process.stdout.write('\x1b[?1049h');

// Cursor hiding
process.stdout.write('\x1b[?25l');

// Batched writes
process.stdout.cork();
setImmediate(() => process.stdout.uncork());
```

### React Optimization

| Technique | Where |
|-----------|-------|
| `React.memo` | All presentational components |
| `setImmediate` | Batched state updates |
| `experimental: true` | Ink render config |

---

## File Conventions

| Type | Location | Naming |
|------|----------|--------|
| Types | `src/types/*.ts` | `lowercase.ts` |
| Components | `src/ui/**/*.tsx` | `PascalCase.tsx` |
| Hooks | `src/ui/hooks/*.ts` | `useCamelCase.ts` |
| Utils | `src/*/utils/*.ts` | `PascalCase.ts` |
| Config | `src/*/config/*.ts` | `PascalCase.ts` |

---

## Documentation Structure

```
docs/
├── CODE-DNA.md           # THIS FILE - patterns
├── architecture/         # ADRs and design decisions
│   └── ARCHITECTURE.md   # Master architecture doc
├── Architecture/         # Detailed architecture guides
│   ├── AAA_GAME_LOGIC_ARCHITECTURE.md
│   └── AAA_UI_ARCHITECTURE.md
├── design/               # Game design docs
├── systems/              # Game mechanics
├── story/                # Narrative content
├── lore/                 # World-building
├── planning/             # Project management
├── dev/                  # Development guides
└── claudelogs/           # Session history
```

---

## Anti-Patterns (AVOID)

| Don't | Do Instead |
|-------|------------|
| Magic numbers in code | `GAME_BALANCE.combat.x` |
| Duplicate input handling | `useMenuNavigation` hook |
| Hardcoded dividers | `SEMANTIC_DIVIDERS.x` |
| Direct GameStore in components | Props or hooks |
| Inline timing values | `UI_CONFIG.x.delay` |
| Giant switch statements | Registry pattern |

---

## Related Documentation

| Document | Purpose |
|----------|---------|
| [ARCHITECTURE.md](./architecture/ARCHITECTURE.md) | ADRs, system design |
| [AAA_UI_ARCHITECTURE.md](./Architecture/AAA_UI_ARCHITECTURE.md) | UI patterns deep-dive |
| [AAA_GAME_LOGIC_ARCHITECTURE.md](./Architecture/AAA_GAME_LOGIC_ARCHITECTURE.md) | Game logic patterns |
| [Recent claudelogs](./claudelogs/) | Session history |

---

**Version:** 1.0 | **Status:** Active | **Maintainer:** Jarvis
