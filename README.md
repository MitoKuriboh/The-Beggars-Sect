# The Beggars Sect: Li Wei's Ascension

**A CLI RPG set in the Martial Arts Haven universe**

> From nothing, to legend.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.2-blue.svg)](https://reactjs.org/)
[![Ink](https://img.shields.io/badge/Ink-3.2-purple.svg)](https://github.com/vadimdemedes/ink)
[![Architecture](https://img.shields.io/badge/Architecture-AAA-green.svg)](#architecture)

---

## Quick Start

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build and run
npm run build
npm start
```

**Download standalone executables:** [beggars-sect.genkaw.com/download](https://beggars-sect.genkaw.com/download)

---

## Table of Contents

- [About](#about)
- [Architecture](#architecture)
  - [Project Structure](#project-structure)
  - [Game Logic Architecture](#game-logic-architecture)
  - [UI Architecture](#ui-architecture)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Documentation](#documentation)
- [Development](#development)
- [Roadmap](#roadmap)

---

## About

**The Beggars Sect** is the first game in the Martial Arts Haven multiverse - an ecosystem of interconnected games exploring different realms, teams, and characters.

Follow Li Wei's journey from a confused stranger spawned into an unknown world, to a master of the mysterious Beggars Sect palm techniques.

| | |
|---|---|
| **Genre** | Wuxia Turn-Based RPG |
| **Platform** | CLI (Terminal) |
| **Version** | 0.3.7 (Demo) |
| **Status** | Prologue Complete - AAA Architecture |
| **Playtime** | ~25 min (demo) / ~5-6 hours (full game) |
| **Code Quality** | Professional-grade with centralized config |

---

## Architecture

### Project Structure

```
the-beggars-sect/
│
├── src/                           # Source code (~7,700 lines)
│   ├── index.tsx                  # Entry point
│   │
│   ├── game/                      # Game Logic (AAA Architecture)
│   │   ├── config/                # ⭐ Centralized Configuration
│   │   │   ├── GameBalance.ts     # All magic numbers (327 lines)
│   │   │   └── index.ts           # Config exports
│   │   │
│   │   ├── utils/                 # ⭐ Reusable Utilities
│   │   │   ├── StatusEffectUtils.ts   # Status effect helpers (140 lines)
│   │   │   ├── ConditionParser.ts     # Condition evaluation (140 lines)
│   │   │   ├── ComparisonEvaluator.ts # Numeric comparisons (150 lines)
│   │   │   └── index.ts               # Utility exports
│   │   │
│   │   ├── combat/                # Combat Systems
│   │   │   ├── CombatEngine.ts    # Main combat orchestrator (878 lines)
│   │   │   ├── AIController.ts    # Enemy AI decision-making (340 lines)
│   │   │   ├── TechniqueRegistry.ts  # All techniques (1456 lines)
│   │   │   └── index.ts
│   │   │
│   │   ├── state/                 # State Management
│   │   │   ├── GameStore.ts       # Singleton state store (649 lines)
│   │   │   ├── SaveManager.ts     # Save/load system (237 lines)
│   │   │   └── index.ts
│   │   │
│   │   ├── story/                 # Story System
│   │   │   ├── StoryEngine.ts     # Story progression (387 lines)
│   │   │   ├── chapters/          # Chapter scripts
│   │   │   │   └── prologue.ts    # Prologue (7 scenes, 1000+ lines)
│   │   │   └── index.ts
│   │   │
│   │   └── factories/             # Object Creation
│   │       ├── CharacterFactory.ts  # Player/enemy creation (693 lines)
│   │       └── index.ts
│   │
│   ├── ui/                        # UI Layer (AAA Architecture)
│   │   ├── hooks/                 # ⭐ Custom React Hooks
│   │   │   ├── useMenuNavigation.ts   # Universal menu navigation (181 lines)
│   │   │   ├── useStateWithRef.ts     # State + ref pattern (57 lines)
│   │   │   ├── useCombatState.ts      # Combat UI state (146 lines)
│   │   │   └── useStoryState.ts       # Story UI state (236 lines)
│   │   │
│   │   ├── components/            # ⭐ Reusable Components
│   │   │   ├── MenuContainer.tsx      # Standard menu wrapper (172 lines)
│   │   │   ├── PolishedBox.tsx        # Terminal helpers
│   │   │   ├── Decorative.tsx         # Visual elements
│   │   │   └── SelectInputWrapper.ts  # Input compatibility (3 lines)
│   │   │
│   │   ├── config/                # ⭐ UI Configuration
│   │   │   └── constants.ts       # UI constants (timing, sizing)
│   │   │
│   │   ├── theme/                 # ⭐ Design System
│   │   │   ├── dividers.ts        # Centralized dividers (127 lines)
│   │   │   └── colors.ts          # Color palette
│   │   │
│   │   ├── utils/                 # ⭐ UI Utilities
│   │   │   └── input.ts           # Input helpers (217 lines)
│   │   │
│   │   ├── combat/                # Combat UI Components (8)
│   │   │   ├── CombatScreen.tsx   # Main combat display (587 lines)
│   │   │   ├── ActionMenu.tsx     # Action selection (92 lines)
│   │   │   ├── TechniqueMenu.tsx  # Technique picker (108 lines)
│   │   │   ├── StanceMenu.tsx     # Stance selection (118 lines)
│   │   │   ├── TargetMenu.tsx     # Target picker (86 lines)
│   │   │   ├── TurnQueue.tsx      # ATB turn display
│   │   │   ├── CombatLog.tsx      # Battle log
│   │   │   └── HealthBar.tsx      # HP/Chi bars
│   │   │
│   │   ├── story/                 # Story UI Components (4)
│   │   │   ├── StoryScreen.tsx    # Main story display (780 lines)
│   │   │   ├── ChoiceMenu.tsx     # Choice selection (88 lines)
│   │   │   ├── TypeWriter.tsx     # Text animation
│   │   │   └── Narrator.tsx       # Narration display
│   │   │
│   │   ├── status/                # Status UI Components (4)
│   │   │   ├── StatusMenu.tsx     # Character status (173 lines)
│   │   │   ├── PathDisplay.tsx    # Path alignment
│   │   │   ├── StatsDisplay.tsx   # Character stats
│   │   │   └── RelationshipsDisplay.tsx  # NPC relationships
│   │   │
│   │   ├── menus/                 # Game Menus (5)
│   │   │   ├── MainMenu.tsx       # Title screen
│   │   │   ├── PauseMenu.tsx      # In-game pause
│   │   │   ├── LoadMenu.tsx       # Load game
│   │   │   ├── SettingsMenu.tsx   # Settings
│   │   │   └── CreditsScreen.tsx  # Credits
│   │   │
│   │   └── App.tsx                # Root component (646 lines)
│   │
│   ├── types/                     # TypeScript Definitions
│   │   ├── index.ts               # Main types export
│   │   ├── character.ts           # Character, stats, status
│   │   ├── combat.ts              # Combat state, actions
│   │   ├── story.ts               # Story types
│   │   └── ui.ts                  # UI-specific types
│   │
│   ├── data/                      # Game Data
│   │   └── combatPhrases.ts       # Combat flavor text
│   │
│   └── utils/                     # General Utilities
│       └── logger.ts              # Debug logging
│
├── docs/                          # Documentation (~20,000+ lines)
│   ├── README.md                  # Documentation index
│   │
│   ├── Architecture/              # ⭐ Architecture Guides
│   │   ├── AAA_UI_ARCHITECTURE.md          # Complete UI architecture
│   │   ├── AAA_GAME_LOGIC_ARCHITECTURE.md  # Game logic architecture
│   │   ├── PHASE_1_2_SUMMARY.md            # Refactoring summary
│   │   ├── UI_REFACTORING_CHECKLIST.md     # UI implementation tracker
│   │   └── GAME_LOGIC_REFACTORING_CHECKLIST.md  # Logic implementation tracker
│   │
│   ├── design/                    # Game & Tech Design
│   │   ├── GAME_DESIGN.md         # Core game design
│   │   ├── TECH_DESIGN.md         # Technical architecture
│   │   └── UX_DESIGN.md           # User experience
│   │
│   ├── systems/                   # Game Systems
│   │   ├── COMBAT_SYSTEM.md       # Combat mechanics
│   │   ├── PROGRESSION_SYSTEM.md  # ⭐ Unified progression (paths/aspects/mastery)
│   │   ├── STARTER_TECHNIQUES.md  # Path-specific technique trees
│   │   ├── TECHNIQUES.md          # All 55+ techniques
│   │   ├── ENEMIES.md             # Enemy types & AI
│   │   ├── MASTERY_SYSTEM.md      # Technique mastery
│   │   └── SCALING.md             # Difficulty scaling
│   │
│   ├── story/                     # Narrative Design
│   │   ├── STORY_STRUCTURE.md     # 3-path structure
│   │   ├── PROLOGUE.md            # Prologue script
│   │   ├── CHAPTER_1.md           # Chapter 1 script
│   │   ├── CHAPTER_2.md           # Chapter 2 script
│   │   └── CHAPTER_3.md           # Chapter 3 script
│   │
│   ├── lore/                      # World Building (11 files)
│   │   ├── WORLD.md               # World overview
│   │   ├── CHARACTERS.md          # NPC database (9 NPCs)
│   │   ├── FACTIONS.md            # Factions (5 total)
│   │   ├── LOCATIONS.md           # Location database (12 locations)
│   │   ├── ARTIFACTS.md           # Items (4 total)
│   │   └── MYSTERIES.md           # Plot hooks (6 mysteries)
│   │
│   ├── planning/                  # Project Management
│   │   ├── TODO.md                # Current tasks
│   │   ├── CHANGELOG.md           # Version history
│   │   └── ROADMAP.md             # Future plans
│   │
│   ├── reference/                 # Technical Reference
│   │   ├── FORMULAS.md            # Combat formulas
│   │   └── API.md                 # Code API reference
│   │
│   └── dev/                       # Development Guides
│       ├── CODE_REVIEW.md         # Codebase overview
│       ├── CONTRIBUTING.md        # Contribution guide
│       └── GUIDELINES.md          # Code standards
│
├── assets/                        # Game Assets
│   └── (placeholder)
│
├── release/                       # Release Packaging
│   └── scripts/                   # Build scripts
│
├── package.json                   # Dependencies & scripts
├── tsconfig.json                  # TypeScript config
└── sea-config.json                # Node SEA config
```

---

### Game Logic Architecture

**AAA Professional-Grade Architecture** (Refactored Dec 2025)

#### Core Principles

✅ **Single Source of Truth**
- All game balance in `GameBalance.ts` (327 lines)
- Zero magic numbers scattered across files
- Type-safe configuration with `as const`

✅ **DRY (Don't Repeat Yourself)**
- Reusable utilities for common operations
- No duplicate condition parsing (eliminated 3x)
- No duplicate status effect logic (eliminated 2x)

✅ **Separation of Concerns**
- Combat logic isolated in `combat/`
- State management in `state/`
- Story system in `story/`
- Clear module boundaries

#### Configuration System

**`src/game/config/GameBalance.ts`** - Central balance config

```typescript
export const GAME_BALANCE = {
  atb: {
    turnVariance: 5,
    dexSpeedDivisor: 5,
  },
  combat: {
    basicAttackPower: 10,
    critChancePerDex: 0.01,
    defendingDamageReduction: 0.5,
  },
  combos: {
    maxMultiplier: 1.6,
    multiplierPerTechnique: 0.15,
  },
  // ... 10 total config modules
} as const;
```

**Benefits:**
- Tune entire game from ONE file
- Type-safe autocomplete for all values
- No scattered magic numbers

#### Utility System

**`src/game/utils/`** - Reusable game logic

| Utility | Purpose | Eliminates |
|---------|---------|------------|
| **StatusEffectUtils** | Status effect management | 12-line duplication |
| **ConditionParser** | HP condition evaluation | 3x parsing duplication |
| **ComparisonEvaluator** | Numeric comparisons | 3x operator switches |

**Impact:** 60-79% code reduction in duplicated sections

#### Combat Architecture

**`src/game/combat/CombatEngine.ts`** (878 lines)

Orchestrates:
- ATB turn queue management
- Action execution
- Damage calculation
- Status effect processing
- Combo tracking
- Combat logging

**Uses:**
- `GAME_BALANCE` for all constants
- `StatusEffectUtils` for effect ticking
- `ConditionParser` for HP checks

**`src/game/combat/AIController.ts`** (340 lines)

Pattern-based AI decision making:
- Condition evaluation (HP%, turn-based, status)
- Action selection (attack, technique, defend, etc.)
- Phase-based boss behavior

**Uses:**
- `ConditionParser` for HP conditions
- `ComparisonEvaluator` for operators

**`src/game/combat/TechniqueRegistry.ts`** (1456 lines)

55+ technique definitions:
- 8 player techniques (Prologue)
- 47 future techniques (Chapters 1-3)
- Combo chains and mastery bonuses

---

### UI Architecture

**AAA-Grade Component System** (Refactored Dec 2025)

#### Core Principles

✅ **Container-Presentational Pattern**
- Business logic in containers
- UI rendering in presentational components
- Clear separation of concerns

✅ **Custom Hooks for Reusability**
- `useMenuNavigation` - Universal keyboard nav (eliminates 100+ lines of duplication)
- `useCombatState` - Combat UI state machine
- `useStoryState` - Story UI state machine
- `useStateWithRef` - Solves stale closure problems

✅ **Design System**
- Centralized dividers (`SEMANTIC_DIVIDERS`)
- UI constants (`UI_CONFIG`)
- Consistent visual language

✅ **Performance Optimization**
- React.memo for expensive components
- State batching with setImmediate
- Alternative screen buffer for flicker reduction

#### Custom Hooks

**`src/ui/hooks/useMenuNavigation.ts`** (181 lines)

Universal keyboard navigation:
```typescript
const { selectedIndex, navigateUp, navigateDown, selectCurrent } =
  useMenuNavigation({
    itemCount: items.length,
    onSelect: (index) => handleSelect(items[index]),
    onBack: () => returnToPrevious(),
    circular: true,
  });
```

**Eliminates:** 100+ lines of duplicate arrow key handling

**`src/ui/hooks/useCombatState.ts`** (146 lines)

Combat UI state machine:
```typescript
const { uiState, setPhase, showMessage, setPendingAction } =
  useCombatState(combatState);
```

**Manages:** Combat phases, messages, pending actions

#### Component Library

**`src/ui/components/MenuContainer.tsx`** (172 lines)

Standardized menu wrapper:
```typescript
<MenuContainer
  title="Your Action"
  titleIcon="⚡"
  color="cyan"
  width={70}
  footer="SPACE to select • ESC to go back"
>
  {children}
</MenuContainer>
```

**Benefits:** Consistent UI, reduced boilerplate

#### Design System

**`src/ui/theme/dividers.ts`** (127 lines)

Centralized dividers:
```typescript
export const SEMANTIC_DIVIDERS = {
  combat: '─'.repeat(85),
  story: '─'.repeat(84),
  menu: '─'.repeat(75),
  status: '─'.repeat(65),
} as const;
```

**Eliminates:** 9+ hardcoded divider strings

**`src/ui/config/constants.ts`** (75 lines)

UI timing and sizing:
```typescript
export const UI_CONFIG = {
  combat: {
    enemyActionDelay: 300,
    turnTransitionDelay: 500,
  },
  story: {
    autoAdvanceDelay: 200,
    typewriterSpeed: 50,
  },
} as const;
```

---

## Features

### Implemented (v0.3.7 Demo)

**Combat Systems:**
- **ATB Combat System** - DEX-based turn order, 7-turn preview
- **3 Stances** - Flowing, Weathered, Hungry with meaningful stat modifiers
- **Combo System** - Starter → Followup → Finisher chains (up to 60% damage bonus)
- **8 Player Techniques** - Palm strikes, guards, counters with mastery progression
- **Mastery System** - 5 levels per technique with power bonuses
- **12 Enemy Types** - 9 regular + 3 bosses with multi-phase mechanics
- **AI Controller** - Pattern-based enemy behavior with phase transitions
- **Difficulty System** - Easy/Medium/Hard/Hell modes with AI quality & stat scaling
- **Chapter Scaling** - Enemies scale automatically for chapters 2-3

**Progression Systems:**
- **Zero-Sum Path System** - 100% total distributed across Blade/Stream/Shadow
- **Aspect Loadout System** - 8 chi aspects, LoL-style rune system (1 primary + 3 secondary)
- **Training Grounds** - Post-prologue sparring matches with training dummy
- **Training Mastery** - Earn 5-10 points per sparring win, scales with difficulty
- **Path-Specific Techniques** - 6 starter techniques gated by path/aspect/mastery
- **Unified Unlock Requirements** - Techniques require path%, aspects, and mastery points
- **Technique Unlock Display** - Preview available/locked techniques with exact requirements

**Story & UX:**
- **Non-Linear Story** - 3 paths (Blade/Stream/Shadow), 3 endings
- **Prologue Chapter** - 7 scenes, ~25 minutes (complete demo)
- **Smooth Story Flow** - 1 SPACE per line, typewriter effect, optimized pacing
- **Save System** - 3 slots + auto-save, file persistence
- **AAA UI Architecture** - Custom hooks, design system, optimized components
- **AAA Game Logic** - Centralized config, reusable utilities, zero duplication
- **Polished Controls** - Consistent keyboard navigation, refined feedback

### Code Quality Achievements

- ✅ **Zero magic numbers** in core combat systems
- ✅ **60-79% code reduction** in duplicated sections
- ✅ **100% type-safe** configuration
- ✅ **Professional-grade** architecture patterns
- ✅ **Comprehensive documentation** (20,000+ lines)

### Planned

- Chapter 1-3 implementation
- Item system
- Location exploration
- Claude AI content generation

---

## Tech Stack

| Category | Technology | Details |
|----------|------------|---------|
| **Runtime** | Node.js 18+ | Modern JavaScript runtime |
| **Language** | TypeScript 5.3 | Strict type safety |
| **UI Framework** | Ink 3.2 | React for CLI |
| **Architecture** | AAA Patterns | Professional-grade design |
| **State** | Singleton + Hooks | GameStore + React hooks |
| **Build** | tsc, esbuild, pkg | Fast builds, standalone executables |

### Architecture Highlights

**Game Logic:**
- **Centralized Configuration** - Single source of truth for all balance
- **Reusable Utilities** - DRY principles applied throughout
- **Separation of Concerns** - Clear module boundaries
- **Type Safety** - `as const` for immutable config

**UI Layer:**
- **Custom Hooks** - Reusable state logic (navigation, state machines)
- **Design System** - Centralized constants (timing, sizing, dividers)
- **Component Library** - MenuContainer, ScreenBox, wrappers
- **Performance** - React.memo, batched updates, screen buffering

**Key Patterns:**
- Container-Presentational separation
- State Machine pattern (Combat/Story phases)
- Observer pattern (GameStore subscriptions)
- Factory pattern (Character creation)
- Singleton pattern (GameStore)

### Dependencies

```json
{
  "ink": "^3.2.0",         // React for CLI
  "react": "^18.2.0",      // UI framework
  "ink-select-input": "^4.1.2",  // Selection menus
  "chalk": "^4.1.2",       // Terminal colors
  "boxen": "^5.1.2",       // Box drawing
  "figlet": "^1.5.2"       // ASCII art
}
```

---

## Documentation

### Architecture Guides

| Guide | Description | Lines |
|-------|-------------|-------|
| [AAA UI Architecture](docs/AAA_UI_ARCHITECTURE.md) | Complete UI architecture | 1,200+ |
| [AAA Game Logic Architecture](docs/AAA_GAME_LOGIC_ARCHITECTURE.md) | Game logic audit & recommendations | 1,567 |
| [Phase 1 & 2 Summary](docs/PHASE_1_2_SUMMARY.md) | Refactoring summary with metrics | 446 |
| [UI Refactoring Checklist](docs/UI_REFACTORING_CHECKLIST.md) | Implementation tracker | 300+ |
| [Game Logic Checklist](docs/GAME_LOGIC_REFACTORING_CHECKLIST.md) | Implementation tracker | 400+ |

### Game Systems

| Document | Description |
|----------|-------------|
| [Combat System](docs/systems/COMBAT_SYSTEM.md) | ATB mechanics, formulas |
| [Progression System](docs/systems/PROGRESSION_SYSTEM.md) | **Unified progression (paths/aspects/mastery)** |
| [Training Integration](docs/systems/TRAINING_INTEGRATION.md) | **Sparring matches & mastery progression loop** |
| [Starter Techniques](docs/systems/STARTER_TECHNIQUES.md) | **Path-specific technique trees** |
| [Techniques](docs/systems/TECHNIQUES.md) | All 55+ techniques |
| [Enemies](docs/systems/ENEMIES.md) | Enemy types & AI patterns |
| [Mastery System](docs/systems/MASTERY_SYSTEM.md) | Technique mastery levels |

### Story & Lore

| Document | Description |
|----------|-------------|
| [Story Structure](docs/story/STORY_STRUCTURE.md) | 3-path narrative |
| [Characters](docs/lore/CHARACTERS.md) | 9 NPCs |
| [Locations](docs/lore/LOCATIONS.md) | 12 game locations |
| [Mysteries](docs/lore/MYSTERIES.md) | 6 plot hooks |

### Development

| Document | Description |
|----------|-------------|
| [Code Review](docs/dev/CODE_REVIEW.md) | Codebase overview |
| [Game Design](docs/design/GAME_DESIGN.md) | Core design doc |
| [Tech Design](docs/design/TECH_DESIGN.md) | Technical architecture |

**See [docs/README.md](docs/README.md) for complete documentation index.**

---

## Development

### Scripts

```bash
npm run dev      # Hot-reload development
npm run build    # TypeScript compilation
npm start        # Run compiled game
npm run lint     # ESLint check
npm run package  # Build standalone executables
```

### Build Targets

| Platform | Output | Size |
|----------|--------|------|
| Windows | `beggars-sect-win.exe` | ~50MB |
| macOS | `beggars-sect-macos` | ~45MB |
| Linux | `beggars-sect-linux` | ~45MB |

### Project Statistics

| Metric | Count |
|--------|-------|
| **Source Code** | ~7,700 lines |
| **Documentation** | ~20,000 lines |
| **TypeScript Files** | 45+ |
| **React Components** | 25+ |
| **Custom Hooks** | 4 |
| **Utility Modules** | 8 |
| **Techniques** | 55+ |
| **Enemies** | 12 |
| **Test Coverage** | TBD |

---

## Roadmap

| Phase | Status | Details |
|-------|--------|---------|
| **Week 1: Foundation** | ✅ Complete | TypeScript, Ink, project structure |
| **Week 2: Combat** | ✅ Complete | ATB engine, techniques, AI |
| **Week 3: Story** | ✅ Complete | Non-linear narrative, 3 paths |
| **Week 4: Polish** | ✅ Complete | Save system, v0.2.0 |
| **Phase 1: Balance** | ✅ Complete | Combat balance, mastery, scaling (v0.3.0) |
| **Phase 2: Demo Polish** | ✅ Complete | UX flow + combat + save system (v0.3.1-0.3.6) |
| **Phase 2.5: AAA UI** | ✅ Complete | Custom hooks, design system, components (v0.3.7) |
| **Phase 2.75: AAA Logic** | ✅ Complete | Game balance config, utilities, refactoring (v0.3.7) |
| **Phase 3: Content** | Planned | Chapters 1-3, items, locations |
| **Phase 4: AI Integration** | Planned | Claude API content generation |

---

## The Martial Arts Haven

**Universal Law:** Individuals with combat aptitude are recognized by the universe itself.

**The Beggars Sect:** Mysterious, vague, spread out. Looked down upon by most, but the wise know better - you never know if you're facing a hidden master.

**Three Paths:**
- **Blade** - Direct confrontation → Destroyer ending
- **Stream** - Adaptation, flow → Reformer ending
- **Shadow** - Cunning, indirect → Wanderer ending

---

## Credits

**Creator:** Mito (Mitchell Grebe)
**AI Assistance:** Claude (Anthropic)
**Website:** [genkaw.com](https://genkaw.com)
**Game Site:** [beggars-sect.genkaw.com](https://beggars-sect.genkaw.com)

---

## License

UNLICENSED - Original IP owned by Mitchell Grebe

---

**The journey from beggar to legend begins...**
