# The Beggars Sect - Development Changelog

All notable changes to this project will be documented in this file.

**Latest:** v0.3.7 - Unified Progression System (2025-12-07)

---

## [2025-12-07] - v0.3.7: Unified Progression System

### Milestone: Complete Training Loop & Progression
**Post-Prologue Progression** - Training grounds, mastery system, technique unlocks

### Added
- **Training Grounds** - Post-prologue sparring matches
  - Accessible from Stats Screen (🥋 Training Grounds menu)
  - Training dummy mirrors player stats, scales with difficulty
  - Complete combat integration (Stats → Training → Sparring → Combat → Training)
  - Mastery point rewards: Easy (3-8), Medium (5-10), Hard (7-13), Hell (8-15)

- **Mastery Progression System** - `src/game/training/TrainingManager.ts`
  - Earn mastery points through sparring victories
  - Progressive unlock milestones (50, 80, 100, 150+ mastery)
  - Performance-based bonuses (combos, speed, damage)
  - Difficulty multipliers for point rewards

- **Aspect Loadout System** - `src/game/systems/AspectSystem.ts`
  - 8 Chi Aspects: Force, Flow, Precision, Burst, Armor, Sense, Will, Inverse
  - LoL-style rune system (1 primary + 3 secondary slots)
  - Path-based aspect unlocking
  - Integrated into StatusMenu as new tab

- **6 Starter Techniques** - Path-specific unlockable techniques
  - **Blade Path:** Shattering Strike (破击), Explosive Fist (爆拳)
  - **Stream Path:** Calm Water Palm (静水掌), Whirlpool Counter (漩涡反)
  - **Shadow Path:** Vital Point Strike (要穴击), Mist Step (雾步)
  - All gated by path%, aspects, and mastery requirements

- **Unified Unlock System** - `src/types/technique.ts`
  - Techniques require: path percentage, aspect unlocked, mastery points
  - Real-time unlock checking with detailed requirement display
  - Press T in Training Menu to see available/locked techniques

- **Difficulty Selection** - Game start flow
  - Easy/Medium/Hard/Hell modes
  - Affects training dummy scaling and mastery point rewards
  - AI quality and stat modifiers

- **UI Components**
  - `AspectLoadoutDisplay.tsx` - View/manage aspect loadouts (260 lines)
  - `TrainingMenu.tsx` - Training hub with progress tracking (290 lines)
  - Technique unlock preview with toggle (T key)
  - Progress bars and visual feedback

### Changed
- **Zero-Sum Path System** - 100% total distributed across Blade/Stream/Shadow
  - Player starts at 33.33/33.33/33.34 split
  - Path choices affect technique unlocks
- **TechniqueRegistry** - Added 6 starter techniques with unlock requirements
- **CharacterFactory** - Initialize progression systems (aspects, mastery, path alignment)
- **App.tsx** - Difficulty selection, training navigation, sparring integration

### Documentation
- **New System Docs** (1,007 lines total)
  - `docs/systems/PROGRESSION_SYSTEM.md` (327 lines) - Unified progression design
  - `docs/systems/STARTER_TECHNIQUES.md` (340 lines) - Path-specific technique trees
  - `docs/systems/TRAINING_INTEGRATION.md` (340 lines) - Training loop implementation
- **Architecture Reorganization**
  - Created `docs/Architecture/` folder
  - Moved AAA architecture docs into dedicated folder
- **Updated READMEs**
  - Main README with progression features
  - docs/README.md with systems section

### Technical
- Full TypeScript type safety for progression types
- Centralized unlock logic in AspectSystem
- Reusable unlock checking functions (`canUnlockTechnique`, `canUnlockAspect`)
- Clean navigation state management (`returnToTraining`)
- Zero build errors, all types properly extended

### Released
- **v0.3.7** - Complete unified progression system
  - 33 files changed, 5,345 insertions, 197 deletions
  - 9 new files created (systems, training, UI components)
  - 15 files modified (progression integration)

### Context
**Why:** Bridge the gap between Prologue and Chapter 1. Give players meaningful progression and preparation before story continues.

**Impact:** Players can now grind mastery points, unlock techniques, and build their path identity. Complete gameplay loop ready for content expansion.

### Player Experience
**Progression Flow:**
1. Complete Prologue → Unlock Training Grounds
2. Enter Training → View mastery progress (0 points)
3. Sparring Match → Earn 5-10 mastery points
4. Press T → See available/locked techniques
5. Reach 50 mastery → Unlock first path techniques
6. Continue → Build path identity → Chapter 1 ready

---

## [2025-12-07] - Phase 2 Complete: Demo Polish & v0.3.6

### Milestone: Phase 2 COMPLETE
**Polished Demo Ready** - Smooth UX flow, enhanced combat, improved saves

### Added
- **Enhanced Combat UI** - Improved targeting system
- **Save System Improvements** - Better reliability and feedback
- **Smooth Story Flow** - 1 SPACE per line achievement
  - Auto-advance after typewriter completion
  - Smart pause handling
  - Optimized SPACE handler order
- **Phase 2 Documentation** - All docs updated to v0.3.6

### Changed
- Combat UI with better target selection feedback
- Save/Load UI improvements
- Story advancement now requires only 1 SPACE per line
- Typewriter effect with auto-advance (200ms delay)

### Fixed
- React warning in TargetMenu component
- Double-SPACE issue in story flow
- SPACE handler check order
- Effect line auto-skip

### Released
- **v0.3.0** - Phase 1: Combat balance, mastery system
- **v0.3.2-v0.3.5** - UX improvements (SPACE handling, pacing)
- **v0.3.6** - Phase 2 Complete with all executables:
  - Windows: beggars-sect-win.exe (81 MB)
  - macOS: beggars-sect-macos (94 MB)
  - Linux: beggars-sect-linux (89 MB) + DEB installer (57 MB)

### Context
**Why:** Phase 2 goal was polishing the demo experience. The core systems from Phase 1 (combat, story, saves) now have a smooth, professional feel.

**Impact:** Demo is production-ready. Next phase: Content expansion (Chapters 1-3).

---

## [Unreleased]

### Planned - Phase 3: Content & AI
- [ ] Chapter 1 implementation (using CHAPTER_1.md)
- [ ] Navigation system (areas, exploration)
- [ ] NPC dialogue system
- [ ] Claude API integration for enemy variation

See TODO.md for complete roadmap

---

## [2025-12-06] - Week 4: Save System & v0.2.0 Release

### Added
- **SaveManager.ts** (`src/game/state/`) - File-based persistence
  - Saves to `~/.beggars-sect/saves/`
  - 3 manual save slots + auto-save (slot 0)
  - Save metadata: chapter, location, playtime, timestamp
  - Checksum validation for save integrity

- **SaveLoadScreen.tsx** (`src/ui/screens/`) - Save/Load UI
  - Visual slot display with metadata
  - Overwrite confirmation dialog
  - Auto-save indicator
  - Empty slot creation

- **GameStore Updates**
  - `getStoryState()` / `setStoryState()` - Story state sync
  - `saveToSlot()` / `loadFromSlot()` - File persistence
  - `autoSave()` / `loadAutoSave()` - Auto-save methods
  - `getSaveSlots()` / `hasAutoSave()` - Slot management

- **StoryScreen Updates**
  - Auto-save triggers at choices, combat, chapter-end
  - Story state syncs to GameStore on every change

### Technical
- Auto-save at meaningful moments (not timer-based)
- Story state explicitly synced between StoryEngine and GameStore
- Save files use JSON with metadata headers

### Released
- **v0.2.0** - GitHub Release with save system + story integration
- Updated download page with new version

### Context
**Why:** Phase 2 completion. Players can now save progress and resume later. Auto-save prevents progress loss at key moments.

**Impact:** Phase 2 Core Engine COMPLETE. Ready for Phase 3 Content & AI.

---

## [2025-12-06] - Week 3: Story Integration

### Added
- **StoryEngine.ts** (`src/game/story/`) - Story progression system
  - Scene-based progression with transitions
  - Choice handling with path point tracking
  - Exploration area management
  - Combat trigger integration
  - State management for saves

- **Story Types** (`src/types/story.ts`)
  - ContentLine types: narration, internal, dialogue, system, instruction, pause, effect
  - Scene, Choice, ExplorationOption interfaces
  - StoryState for persistence

- **Prologue Implementation** (`src/game/story/chapters/prologue.ts`)
  - 7 scenes (~1000 lines of content)
  - Scene 1: The Void - awakening sequence
  - Scene 2: First Steps - movement tutorial
  - Scene 3: The Alley - first combat encounter
  - Scene 4: The Search - exploration tutorial
  - Scene 5: The Gate - dialogue introduction
  - Scene 6: The Test - combat tutorial
  - Scene 7: The Hidden Corner - arrival at sect
  - ~20-25 minutes playtime

- **Story UI Components** (`src/ui/screens/`)
  - StoryScreen.tsx - Main story display
  - ContentRenderer.tsx - Styled content lines
  - ChoiceMenu.tsx - Player choice selection
  - ExplorationMenu.tsx - Area exploration

### Technical
- Story ↔ Combat integration working
- Combat triggered from story returns to story on completion
- Path points tracked across choices

### Context
**Why:** Week 3 of Core Engine phase. Story system enables narrative-driven gameplay.

**Impact:** Full Prologue playable. Story and combat systems integrated.

---

## [2025-12-06] - Week 2: ATB Combat Engine

### Added
- **CombatEngine.ts** (`src/game/combat/`) - Core combat system
  - ATB turn order based on DEX stat
  - Turn point accumulation and threshold
  - Action execution (attack, technique, defend, chi-focus, item, stance, flee)
  - Damage calculation with stance/chi modifiers
  - Combo chain tracking with bonus multipliers
  - Victory/defeat conditions

- **TechniqueRegistry.ts** (`src/game/combat/`) - Technique system
  - 15+ techniques with full stats
  - Combo roles: starter, followup, finisher
  - Chi costs and generation
  - Cooldown management
  - Mastery level bonuses

- **AIController.ts** (`src/game/combat/`) - Enemy AI
  - Pattern-based decision making
  - Boss phase transitions
  - Aggression/defense weighting
  - Target selection logic

- **Combat UI** (`src/ui/screens/combat/`)
  - CombatScreen.tsx - Main combat display
  - ActionMenu.tsx - 7 action types
  - TechniqueMenu.tsx - With chi costs
  - StanceMenu.tsx - Stance switching
  - TargetMenu.tsx - Enemy selection
  - TurnQueue.tsx - Next 5-7 turns preview
  - CombatLog.tsx - Action history
  - HealthBar.tsx - HP/Chi display

### Technical
- 14 new files, 2500+ lines of combat code
- ATB provides more tactical depth than simple turn-based
- Combo system rewards technique mastery

### Context
**Why:** Week 2 of Core Engine phase. Combat is the core gameplay loop.

**Impact:** Full combat system playable. Ready for story integration.

---

## [2025-12-06] - Week 1 Complete: First Playable Build

### Added
- Standalone executables for Windows, macOS, Linux
- Download page on beggars-sect.genkaw.com

### Technical
- Downgraded Ink 4.x (ESM) to Ink 3.2.0 (CommonJS) for pkg compatibility
- Build process: `npm run build` → `npm run package`
- Executables larger than expected but fully functional

### Released
- **v0.1.0** - GitHub Release with standalone executables

### Context
**Why:** Make game accessible without development environment.

**Impact:** Anyone can download and play. Foundation for public releases.

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
**Last updated:** 2025-12-06
**Status:** Phase 2 Core Engine COMPLETE (Weeks 1-4). Ready for Phase 3 Content & AI.
