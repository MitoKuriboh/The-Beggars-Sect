# The Beggars Sect - Development Changelog

All notable changes to this project will be documented in this file.

---

## [Unreleased]

### Planned - Week 2: Combat Engine
- [ ] ATB turn order system
- [ ] Action execution (attack, technique, defend, chi-focus, item, stance, flee)
- [ ] Damage calculation with stance/chi modifiers
- [ ] Combo chain system

### Planned - Week 3-4: Techniques & Integration
See TODO.md for complete roadmap

---

## [2025-12-05] - Week 1 Foundation: Core Engine Implementation

### Added
- **Type Definitions** (`src/types/`) - Complete TypeScript interfaces
  - `character.ts` - Stats, Stance, ChiAspect, Character, Enemy interfaces
  - `technique.ts` - Technique, ComboRole, TechniqueEffect, MasteryLevel
  - `combat.ts` - CombatState, ActionType, TurnQueueEntry, ComboChain
  - `item.ts` - Item, Inventory, ItemEffect interfaces
  - `game.ts` - GameState, StoryProgress, GameFlags, GameStats
  - `index.ts` - Barrel export for all types

- **Game State Store** (`src/game/state/GameStore.ts`)
  - Singleton state management pattern
  - Player/inventory management
  - Story progress tracking
  - Save/load with checksum validation
  - NPC relationship system
  - Game flags and statistics

- **Character Factory** (`src/game/factories/CharacterFactory.ts`)
  - `createPlayer()` - Creates Li Wei with starting stats
  - `createEnemy(templateId)` - 11 enemy templates with full AI patterns
  - `createBoss(bossId)` - Razor, Commander Vex, The Hollow One
  - Enemy templates include loot tables, dialogue, phase triggers

- **CLI Shell** (`src/ui/App.tsx`)
  - Ink-based terminal interface
  - Title screen with Chinese characters (丐帮：李伟的崛起)
  - Main menu (New Game, Continue, Credits, Quit)
  - New game initialization flow
  - Character stats display
  - Dev combat test placeholder

### Technical
- Updated `tsconfig.json` for Node16 module resolution
- Fixed export conflicts in type definitions
- TypeScript compiles successfully
- Game launches and displays title screen

### Context
**Why:** Week 1 of the 4-week Core Engine implementation plan. Established the foundation for all game systems: types, state management, character creation, and basic UI.

**Impact:** Core infrastructure complete. Ready for Week 2 (Combat Engine).

---

## [2025-12-05] - Complete Story Overhaul: Non-Linear Narrative

### Added
- **STORY_STRUCTURE.md** (700+ lines) - Non-linear narrative design
  - Three-path alignment system: Blade (刃), Stream (流), Shadow (影)
  - Path point accumulation and thresholds
  - Three distinct endings: Destroyer, Reformer, Wanderer
  - Complete flowcharts for all chapters
  - Technical implementation notes with TypeScript interfaces

- **PROLOGUE.md** (400+ lines) - Tutorial and awakening sequence
  - 7 scenes: The Void → The Hidden Corner
  - ~20-25 minutes gameplay
  - Introduces movement, combat basics, dialogue system
  - Establishes Li Wei's amnesia and mystery

- **CHAPTER_1.md** (complete overhaul) - "Streets of the Forgotten"
  - 2 major choice points with 3 paths each
  - Route variations: The Proving, The Bridge, The Observer
  - Razor boss with 3 different outcomes (defeated/allied/exiled)
  - Path-specific bonus techniques and content
  - ~90-120 minutes gameplay

- **CHAPTER_2.md** (complete overhaul) - "The Law's Long Reach"
  - 2 major choice points with 3 paths each
  - Full memory flashback sequence revealing Li Wei's escape
  - Commander Vex boss with 3 approaches (combat/dialogue/stealth)
  - Path variations: Raid, Alliance, Infiltration
  - ~120-150 minutes gameplay

- **CHAPTER_3.md** (complete overhaul) - "The Hollow at the Summit"
  - 3 mountain journey variations based on dominant path
  - Phase 1 boss variation (combat/dialogue/puzzle approach)
  - The Hollow One 3-phase boss fight
  - Three complete endings with sequel hooks
  - ~90-120 minutes gameplay

### Changed
- Story now fully non-linear with meaningful player agency
- Total playtime: ~5-6 hours first playthrough, ~12-15 hours for all content
- All chapters integrated with lore (Calibration Initiative, inverse chi, prophecy)
- Each path provides unique techniques, items, and story content

### Story Design Decisions
- **Not open-world** (scope-appropriate) but meaningful branching
- **No wrong paths** - all routes lead to satisfying content
- **Earned endings** - final choice + accumulated path points determine outcome
- **Replayability** - different playthroughs reveal different aspects of the world

### Impact
Complete story design phase. Ready for implementation with 25+ elaborated documents.

---

## [2025-12-05] - Chapter 3 Complete: The Hollow Truth

### Added
- **CHAPTER_3.md** (500+ lines) - Complete final chapter
  - 10 scenes: The Calm → The Path Forward
  - Initiative Hunter combat encounter (new enemy type)
  - Elder's final teaching: Wanderer's Path technique
  - The Forgotten Temple exploration
  - Full memory restoration flashback sequence
  - The Hollow One boss fight (3 phases)
  - Li Wei's origin revelation (Transcendent Inverse)
  - Dog Beating Staff sequel hook
  - Cliffhanger ending with multiple dialogue choices

### Changed
- **DESIGN_STATUS.md** - Updated to reflect 12 elaborated documents
- All three story chapters now complete and ready for implementation

### Context
**Why:** Complete the story design before moving to implementation. All narrative beats, character revelations, and boss encounters are now fully scripted.

**Story Delivered:**
- Li Wei's complete origin (Subject 17, Calibration Initiative)
- The Hollow One's tragic backstory (Wei Lin, Wei Zhong's descendant)
- The prophecy of the Inverted One explained
- Dog Beating Staff location revealed
- Perfect cliffhanger for Book 2

**Impact:** Design phase essentially complete. 12 core documents elaborated. Ready to move to implementation phase (Week 3+).

---

## [2025-12-05] - MVP Scoping & Integration Planning

### Added
- **MVP_PLAN.md** (3,800+ lines) - Comprehensive scoped plan
  - Website integration strategy
  - Scoped MVP definition (locked features)
  - Documentation split plan (4 focused docs)
  - Feedback system design (web form + database)
  - Realistic 12-week roadmap with milestones
  - Risk management and contingencies
  - Immediate next actions
- **SUMMARY.md** - Session summary and status tracking
  - Completed work overview
  - Key decisions made
  - Immediate next actions
  - Success criteria
- **Integration with genkaw.com**:
  - Added to Lab section (active project)
  - Dedicated dev log page created
  - Building in public infrastructure

### Changed
- **Scope reduction**: From 5 chapters → 3 chapters for v1.0
- **Feature cuts**: Environmental combat, 4th stance → post-v1.0
- **Documentation strategy**: Split into 4 focused docs instead of 2 massive files
- **Feedback approach**: Separate web form (not in-game) using simple database

### Context
**Why:** Initial design was too ambitious for 12-week timeline. Ruthless scoping needed to create achievable MVP while maintaining core vision and showcase value.

**Strategic Decision:** Focus on core combat + AI enemy variations + 3-chapter story. Save advanced features for v1.5 and v2.0. This ensures we ship a complete, polished experience rather than incomplete ambitious project.

**Impact:** Clear, achievable roadmap with weekly milestones and decision points. Foundation for building in public with dev log tracking progress.

---

## [2025-12-04] - Project Foundation

### Added
- **Project structure** created with full directory scaffolding
- **README.md** - Project overview and vision document
- **GAME_DESIGN.md** - Comprehensive 600+ line game design document
  - Complete story arc (Li Wei's journey)
  - World building (Martial Arts Haven universe)
  - Character background
  - Faction design
  - Progression system concept
  - Development roadmap
- **COMBAT_SYSTEM.md** - Complete combat mechanics specification
  - Turn-based ATB system (FFX-inspired)
  - Stance system (4 stances with unique properties)
  - Combo system (beginner → master combos)
  - Chi management mechanics
  - Automation enhancement designs
  - Environmental combat
  - AI-powered enemies
  - Complete damage formulas
  - Visual feedback designs

### Technical Setup
- TypeScript + Ink project structure
- package.json with all dependencies
- tsconfig.json configured with path aliases
- Basic scaffolds (index.tsx, App.tsx)
- .gitignore configured

### Documentation
- .claude/ documentation directory
- Design docs in /design
- README with full project info

### Context
**Why:** Transform Mito's C learning project into showcase of AI-powered game development. First game in Martial Arts Haven multiverse.

**Strategic Alignment:**
- Demonstrates automation + AI capabilities
- Unique positioning (CLI RPG with procedural content)
- Portfolio piece for genkaw.com
- Foundation for game universe IP

**Vision:** "From nothing, to legend" - Li Wei's zero-to-hero journey as first game in ecosystem of interconnected games exploring different realms and characters.

---

## Format Guidelines

### Entry Structure
```markdown
## [YYYY-MM-DD] - Brief Title

### Added
- New features, files, systems

### Changed
- Modifications to existing features

### Fixed
- Bug fixes

### Removed
- Deprecated features

### Technical
- Implementation details

### Documentation
- Docs created or updated

### Context
**Why:** Strategic reasoning
**Impact:** Effect on project
```

---

**Changelog started:** 2025-12-04
**Last updated:** 2025-12-05
**Status:** Design complete, story overhauled with non-linear branching, ready for implementation
