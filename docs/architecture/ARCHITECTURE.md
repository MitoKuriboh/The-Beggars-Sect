# Architecture: The Beggars Sect Game

**Version:** 1.0 | **Updated:** 2025-12-30 | **Status:** Active

---

## TL;DR

CLI RPG using React/Ink with AAA architecture. Key decisions: Singleton GameStore, centralized GameBalance config, custom hooks for UI, Factory pattern for entities. Types in `src/types/`, game logic in `src/game/`, UI in `src/ui/`.

---

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                       Entry Point                            │
│                      src/index.tsx                           │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                         App.tsx                              │
│              (Game State Machine, Screen Router)             │
└─────────────────────────────────────────────────────────────┘
          │                    │                    │
          ▼                    ▼                    ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│   Story UI      │  │   Combat UI     │  │   Menu UI       │
│  StoryScreen    │  │  CombatScreen   │  │  MainMenu, etc  │
└─────────────────┘  └─────────────────┘  └─────────────────┘
          │                    │                    │
          ▼                    ▼                    ▼
┌─────────────────────────────────────────────────────────────┐
│                      Game Logic Layer                        │
│         StoryEngine  │  CombatEngine  │  GameStore          │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Persistence Layer                         │
│                       SaveManager                            │
└─────────────────────────────────────────────────────────────┘
```

---

## Decision Index

| ADR | Decision | Date | Status |
|-----|----------|------|--------|
| ADR-001 | React/Ink for CLI UI | 2025-12-01 | Active |
| ADR-002 | Singleton GameStore | 2025-12-01 | Active |
| ADR-003 | Centralized GameBalance config | 2025-12-07 | Active |
| ADR-004 | Custom hooks over HOCs | 2025-12-07 | Active |
| ADR-005 | Factory pattern for entities | 2025-12-03 | Active |
| ADR-006 | Types at `src/types/` | 2025-12-01 | Active |
| ADR-007 | Pattern-based AI | 2025-12-05 | Active |

---

## ADR-001: React/Ink for CLI UI

**Status:** Active | **Date:** 2025-12-01

### Context

Need a CLI framework for building an interactive terminal RPG with complex menus, animations, and real-time updates.

### Decision

Use **React 18** with **Ink 3.2** for terminal UI rendering.

### Rationale

| Factor | Ink | Blessed | Raw ANSI |
|--------|-----|---------|----------|
| React mental model | ✅ | ❌ | ❌ |
| Component reuse | ✅ | ⚠️ | ❌ |
| Hooks support | ✅ | ❌ | ❌ |
| Flexbox layout | ✅ | ⚠️ | ❌ |
| Maintenance | Active | Stale | N/A |

### Consequences

**Positive:**
- Familiar React patterns
- Component composition
- Custom hooks for state
- Ink's flexbox via Yoga

**Negative:**
- Limited to Node.js
- Some Ink quirks (SelectInput export)
- 60fps cap in experimental mode

**Mitigation:**
- SelectInputWrapper for import compatibility
- Experimental mode for smooth rendering

---

## ADR-002: Singleton GameStore

**Status:** Active | **Date:** 2025-12-01

### Context

Need global state management for player, game progress, settings across all screens.

### Decision

Use **Singleton pattern** for `GameStore` with subscriber notifications.

### Rationale

| Factor | Singleton | Context | Redux |
|--------|-----------|---------|-------|
| Simplicity | ✅ | ⚠️ | ❌ |
| No boilerplate | ✅ | ⚠️ | ❌ |
| Terminal-friendly | ✅ | ✅ | ⚠️ |
| Direct access | ✅ | ⚠️ | ❌ |
| Testing | ⚠️ | ✅ | ✅ |

### Implementation

```typescript
// src/game/state/GameStore.ts
class GameStoreImpl {
  private state: GameState;
  private listeners: Set<() => void>;

  getState(): GameState { ... }
  setState(updates: Partial<GameState>): void { ... }
  subscribe(listener: () => void): () => void { ... }
}

export const GameStore = new GameStoreImpl();
```

### Consequences

**Positive:**
- Simple, direct access
- No provider nesting
- Easy to persist

**Negative:**
- Global state (harder to test)
- No time-travel debugging

**Mitigation:**
- Observer pattern for reactivity
- Clean state reset for testing

---

## ADR-003: Centralized GameBalance Config

**Status:** Active | **Date:** 2025-12-07

### Context

Combat system had 20+ magic numbers scattered across CombatEngine, AIController, TechniqueRegistry. Balancing required hunting through multiple files.

### Decision

Centralize ALL game constants in `src/game/config/GameBalance.ts`.

### Rationale

| Before | After |
|--------|-------|
| Magic numbers in 5+ files | One file |
| Hunt to find constants | Search in one place |
| Type safety unclear | `as const` ensures immutability |
| Balance changes risky | Change once, affects all |

### Implementation

```typescript
// src/game/config/GameBalance.ts
export const GAME_BALANCE = {
  atb: { turnVariance: 5, dexSpeedDivisor: 5 },
  combat: { basicAttackPower: 10, critChancePerDex: 0.01 },
  combos: { maxMultiplier: 1.6, multiplierPerTechnique: 0.15 },
  // ... 10 modules total
} as const;
```

### Consequences

**Positive:**
- 20+ magic numbers eliminated
- Type-safe configuration
- Balance tuning from ONE file
- Easy difficulty scaling

**Negative:**
- Large config file (327 lines)
- Need to import in many places

---

## ADR-004: Custom Hooks over HOCs

**Status:** Active | **Date:** 2025-12-07

### Context

Multiple menus had duplicate keyboard handling (100+ lines each). Need to share logic without component coupling.

### Decision

Use **custom hooks** for all reusable UI logic.

### Key Hooks

| Hook | Purpose | Lines Saved |
|------|---------|-------------|
| `useMenuNavigation` | Keyboard nav | 100+ per menu |
| `useCombatState` | Combat UI state | 50+ |
| `useStoryState` | Story UI state | 70+ |
| `useStateWithRef` | Async-safe state | Stale closure bugs |

### Implementation

```typescript
// src/ui/hooks/useMenuNavigation.ts
export function useMenuNavigation(options: MenuNavigationOptions) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useInput((input, key) => {
    if (key.upArrow) navigateUp();
    if (key.downArrow) navigateDown();
    if (input === ' ' || key.return) options.onSelect?.(selectedIndex);
    if (key.escape) options.onBack?.();
  });

  return { selectedIndex, navigateUp, navigateDown };
}
```

### Consequences

**Positive:**
- Eliminated 500+ lines of duplication
- Consistent behavior across menus
- Easy to test in isolation
- Composable

**Negative:**
- Hook rules apply (can't call conditionally)

---

## ADR-005: Factory Pattern for Entities

**Status:** Active | **Date:** 2025-12-03

### Context

Player and enemy creation involves complex setup (stats, techniques, AI patterns). Need consistent creation with scaling.

### Decision

Use **Factory pattern** for all entity creation.

### Implementation

```typescript
// src/game/factories/CharacterFactory.ts
export class CharacterFactory {
  static createPlayer(name: string): Player { ... }
  static createEnemy(template: EnemyTemplate, chapter: number): Enemy { ... }
  static scaleForChapter(enemy: Enemy, chapter: number): Enemy { ... }
}
```

### Consequences

**Positive:**
- Consistent entity creation
- Chapter scaling in one place
- Easy to add enemy variants
- Testable creation logic

---

## ADR-006: Types at `src/types/`

**Status:** Active | **Date:** 2025-12-01

### Context

Need centralized type definitions accessible throughout the codebase.

### Decision

Place all types in `src/types/` with module-specific files.

### Structure

```
src/types/
├── index.ts       # Re-exports
├── character.ts   # Character, Stats, StatusEffect
├── combat.ts      # CombatState, CombatAction
├── story.ts       # Scene, Choice, StoryResult
├── game.ts        # GameState, GamePhase
├── item.ts        # Item, Equipment
└── technique.ts   # Technique, ComboRole
```

### Rationale

| Alternative | Issue |
|-------------|-------|
| Colocated types | Hard to share |
| `@types/` package | Overkill for CLI app |
| `lib/types/` | Non-standard for this stack |

### Consequences

**Positive:**
- Single source for types
- Easy imports via `@types/*` alias
- Clear separation from runtime code

---

## ADR-007: Pattern-Based AI

**Status:** Active | **Date:** 2025-12-05

### Context

Need enemy AI that's configurable per enemy type, supports phases (bosses), and doesn't require code changes to add enemies.

### Decision

Use **pattern-based AI** with condition strings parsed at runtime.

### Implementation

```typescript
// Enemy template
aiPattern: {
  default: [
    { action: 'technique', technique: 'palm-strike', weight: 3 },
    { action: 'attack', weight: 2 },
    { action: 'defend', condition: 'hp<30%', weight: 5 },
  ],
  phases: {
    'hp<50%': [
      { action: 'technique', technique: 'iron-palm', weight: 5 },
    ],
  },
}
```

### Consequences

**Positive:**
- Enemies defined in data, not code
- Easy to balance via weights
- Phase transitions automatic
- Extensible condition system

**Negative:**
- String parsing at runtime
- Complex condition syntax

**Mitigation:**
- `ConditionParser` utility for validation
- Clear documentation of conditions

---

## Layer Dependencies

```
┌──────────────────────────────────────────────┐
│                  UI Layer                     │
│  (React components, hooks, screens)          │
│  DEPENDS ON: Game Logic, Types               │
└──────────────────────────────────────────────┘
                      │
                      ▼
┌──────────────────────────────────────────────┐
│              Game Logic Layer                 │
│  (Engines, Store, Factories)                 │
│  DEPENDS ON: Types, Config                   │
└──────────────────────────────────────────────┘
                      │
                      ▼
┌──────────────────────────────────────────────┐
│                Types Layer                    │
│  (Type definitions only)                     │
│  NO DEPENDENCIES                             │
└──────────────────────────────────────────────┘
```

**Rules:**
- Types have NO dependencies
- Game logic depends on types only
- UI depends on game logic and types
- No circular dependencies

---

## Future Considerations

### Potential ADRs

| Topic | Trigger |
|-------|---------|
| ECS architecture | If entity complexity grows |
| Event bus | If systems need more decoupling |
| Command pattern | If undo/replay needed |
| State machine lib | If state transitions grow complex |

### Not Planned

| Approach | Reason |
|----------|--------|
| Redux | Overkill for CLI |
| GraphQL | No server |
| Microservices | Single process |

---

## Related Documentation

| Document | Purpose |
|----------|---------|
| [CODE-DNA.md](../CODE-DNA.md) | Patterns and conventions |
| [AAA_GAME_LOGIC_ARCHITECTURE.md](../Architecture/AAA_GAME_LOGIC_ARCHITECTURE.md) | Game logic deep-dive |
| [AAA_UI_ARCHITECTURE.md](../Architecture/AAA_UI_ARCHITECTURE.md) | UI patterns deep-dive |

---

**Version:** 1.0 | **Status:** Active | **Maintainer:** Jarvis
