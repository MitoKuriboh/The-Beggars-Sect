# Changelog

All notable changes to The Beggars Sect project.

**Format:** Based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
**Versioning:** [Semantic Versioning](https://semver.org/spec/v2.0.0.html)

---

## [0.2.9] - 2025-12-06

### Added
- **Combat Animation System (Bundle B: Combat Excitement)**
  - Frame-based ASCII animations for all combat actions
  - Directional attack animations with windup/strike/impact phases
  - Critical hit explosion effects with stars (★★★★★)
  - Technique charge animations with chi particles
  - Defend, chi focus, and impact animations
  - 60-80ms frame timing for smooth motion

- **Boss ASCII Art**
  - Dramatic boss intro screens for Razor, Commander Vex, The Hollow One
  - Custom art and quotes for each boss
  - Victory celebration displays
  - Generic fallback for custom bosses

- **Technique Learning Celebrations**
  - ASCII art for mastering new techniques
  - Technique-specific artwork for key abilities
  - Flowing Palm, Weathered Guard, Starving Strike, Double Palm
  - Inspirational quotes and Chinese characters (掌, 守, 擊)
  - Generic fallback for all techniques

- **Chapter Title Cards**
  - Cinematic chapter intro displays
  - Prologue: "The Awakening" (覚醒)
  - Chapter 1: "Streets of the Forgotten" (忘れられた街)
  - Chapter 2: "Shadows and Iron" (影と鉄)
  - Chapter 3: "The Empty Palm" (空掌)

- **Art Display Components**
  - Reusable components for showing ASCII art
  - TechniqueLearnedDisplay with customizable colors
  - BossIntroDisplay for dramatic boss encounters
  - ChapterIntroDisplay for story transitions
  - VictoryDisplay with rewards list
  - CombatStartBanner for battle transitions

### Technical
- `src/ui/combat/animations/CombatAnimations.tsx` - Animation system
- `src/ui/art/TechniqueArt.ts` - Technique celebration art (100+ lines)
- `src/ui/art/BossArt.ts` - Boss intro art (150+ lines)
- `src/ui/art/ChapterArt.ts` - Chapter title cards
- `src/ui/art/ArtDisplay.tsx` - Display components
- `src/ui/art/index.ts` - Art barrel export

### Notes
- Animation and art systems are ready for integration
- Components can be used in StoryEngine and CombatScreen
- Future: Hook up to actual game events (boss encounters, technique learning)

---

## [0.2.8] - 2025-12-06

### Added
- **Semantic Color System (Bundle A: Visual Polish)**
  - Consistent color palette across the entire game
  - Path colors: Blade (red), Stream (blue), Shadow (magenta)
  - Combat colors: damage, healing, chi effects, status effects
  - Narrative colors: speakers, content types, chi voices
  - Helper functions: `getHealthColor()`, `getProgressColor()`, `getSpeakerColor()`

- **Combat Message Variety**
  - Varied attack phrases - no more repetitive "X attacks Y"
  - Context-aware messages based on damage tier (light/moderate/heavy/massive)
  - Critical hit phrases ("finds an opening", "strikes with precision")
  - Technique-specific flavor text for all techniques
  - Varied defend, chi focus, and stance change messages
  - 100+ unique combat message variations

- **High-Resolution Progress Bars**
  - Unicode eighth-block characters for smoother visual feedback
  - ██████▌░░░ instead of ███████░░░
  - Automatic color gradients based on percentage
  - Specialized health and chi bar functions
  - Precise visual representation of partial fill amounts

- **Box Drawing Utilities**
  - Rounded corner box style (╭╮╰╯) for modern aesthetic
  - Multiple styles: rounded, double, single, heavy, dotted
  - Helper functions for headers, footers, dividers
  - Consistent box drawing across UI components

### Technical
- `src/ui/theme/colors.ts` - Semantic color system with Ink color types
- `src/ui/theme/boxes.ts` - Box drawing styles and helpers
- `src/ui/theme/progressBars.ts` - High-res progress bar utilities
- `src/data/combatPhrases.ts` - Combat message variation system
- `src/game/combat/CombatEngine.ts` - Integrated varied messages
- `src/ui/combat/HealthBar.tsx` - Updated to use high-res bars

---

## [0.2.7] - 2025-12-06

### Added
- **Settings Menu UI**
  - New "Settings" option in main menu
  - Toggle typewriter effect on/off with visual feedback (✓ ON / ✗ OFF)
  - Text speed presets: Slow (30), Normal (50), Fast (70), Very Fast (90) cps
  - Setting descriptions panel explaining each option
  - ESC navigation to go back from submenus

### Technical
- `src/ui/SettingsScreen.tsx` - New settings screen component
- `src/ui/App.tsx` - Added 'settings' screen type, menu item, and render

---

## [0.2.6] - 2025-12-06

### Added
- **Settings System (R03)**
  - `GameSettings` interface with typewriter options
  - `typewriterEnabled` toggle (default: true)
  - `typewriterSpeed` setting (20-100 cps, default: 50)
  - Settings stored separately from save data
  - GameStore methods: `isTypewriterEnabled()`, `getTypewriterSpeed()`, `toggleTypewriter()`, `setTypewriterSpeed()`

- **Accessibility: Disable Typewriter Option**
  - When disabled, text displays instantly
  - Speed scales all content types proportionally
  - Dialogue 10% faster, internal thoughts 10% slower than base speed

### Technical
- `src/types/game.ts` - Added `GameSettings` interface and `DEFAULT_SETTINGS`
- `src/game/state/GameStore.ts` - Added settings state and accessor methods
- `ContentRenderer.tsx` - Added `typewriterSpeed` prop with per-content-type scaling
- `StoryScreen.tsx` - Passes settings to ContentBlock, conditional skip prompt

---

## [0.2.5] - 2025-12-06

### Added
- **Typewriter Effect (R01/C1)**
  - Text reveals character-by-character for immersive storytelling
  - Applies to narration, dialogue, and internal thoughts
  - Blinking cursor (▌) shows typing progress
  - Different speeds per content type: narration (50 cps), dialogue (55 cps), internal (45 cps)
  - Press SPACE to skip to full text instantly
  - Prompt shows `[SPACE] skip` during typing, `[SPACE] next` when complete

### Technical
- `src/ui/hooks/useTypewriter.ts` - New hook for typewriter effect
- `src/ui/hooks/index.ts` - New hooks barrel export
- `ContentRenderer.tsx` - Added `TypewriterText` component, integrated typewriter for text content
- `StoryScreen.tsx` - Added typewriter state tracking, skip functionality on SPACE

---

## [0.2.4] - 2025-12-06

### Added
- **Descriptive Health States (R11)**
  - Enemies now show health condition: Uninjured, Lightly Wounded, Wounded, Badly Wounded, Near Death, Critical
  - Color-coded severity: green (healthy), yellow (wounded), red (critical)
  - Displays next to enemy name in combat UI

- **Component Memoization (R17)**
  - `HealthBar` wrapped with `React.memo` for performance
  - `CharacterStatus` wrapped with `React.memo`
  - `TurnQueue` wrapped with `React.memo`
  - `CombatLog` wrapped with `React.memo`
  - Added `displayName` to all memoized components

- **TypeScript Strictness (R19)**
  - Added `noUncheckedIndexedAccess` - catches unsafe array/object access
  - Added `noImplicitReturns` - requires explicit return statements
  - Added `noFallthroughCasesInSwitch` - prevents switch fallthrough bugs
  - Added `incremental: true` with `.tsbuildinfo` for faster rebuilds

- **Research Documentation**
  - `IMPROVEMENT_ROADMAP.md` - 2,140 lines, 46 implementation routes with gameplay research
  - `CLI_GAME_RESEARCH.md` - 1,535 lines, terminal UI and ASCII art techniques
  - `CLI_RPG_MECHANICS.md` - 1,534 lines, combat systems and wuxia mechanics

### Fixed
- **Type Safety** - Fixed 30+ potential undefined access bugs across codebase:
  - `AIController.ts` - Null checks for regex matches and array access
  - `CombatEngine.ts` - Null check for condition matching
  - `CharacterFactory.ts` - Null checks for template and scaling access
  - `StoryEngine.ts` - Null checks for scene block access
  - `item.ts` - Null check for inventory slot access
  - `technique.ts` - Null checks for mastery threshold access
  - `CombatScreen.tsx` - Null checks for enemy array access
  - `TargetMenu.tsx` - Null check for single enemy auto-select

### Technical
- `tsconfig.json` - Stricter compiler options, incremental builds
- `.gitignore` - Added `.tsbuildinfo` to ignore list
- `HealthBar.tsx` - Added `getHealthDescription()` helper, memoization
- `TurnQueue.tsx` - Memoization with displayName
- `CombatLog.tsx` - Memoization with displayName

---

## [0.2.3] - 2025-12-06

### Added
- **Tutorial Combat Retry**
  - Combats with `canLose: false` now auto-restart on defeat
  - Player HP/Chi fully restored before retry
  - Enemies recreated from templates for fresh fight

- **Combat Result Flow**
  - Story screen now properly receives combat result (victory/defeat/fled)
  - `completeCombat()` called with correct outcome to advance story
  - Combat phase shows "⚔️ Entering Combat..." transition message

### Fixed
- **Unique Enemy IDs** - Added counter + timestamp + random for guaranteed uniqueness
- **Enemy Recreation** - Added `templateId` to Enemy interface for spawning fresh copies
- **React State Batching** - Story screen uses `unstable_batchedUpdates` to prevent flicker
- **Combat Log Fragments** - Fixed React key warnings in number highlighting
- **Choice Menu Rendering** - Changed from `&&` to ternary for consistent React rendering
- **State Notifications** - Added missing `notifyStateChange()` calls in StoryEngine

### Technical
- `App.tsx` - Combat retry logic, result propagation, canLose tracking
- `StoryScreen.tsx` - Combat result handling, batchedUpdates, phase indicator
- `CharacterFactory.ts` - Enemy ID counter, templateId field
- `StoryEngine.ts` - Added notifyStateChange() to all advancement paths
- `CombatLog.tsx` - React.Fragment for text parts
- `ChoiceMenu.tsx` - Ternary conditional rendering

---

## [0.2.2] - 2025-12-06

### Added
- **Story UX Improvements**
  - Color-coded dialogue by speaker type (green=player, magenta=voices, red=enemies, yellow=elders, cyan=beggars)
  - Emotion indicators as emoji (😈 threatening, 😱 panicked, 😊 kind, etc.)
  - Scene progress indicator `[1/7]` in story header
  - Pause skip hint shows `... [SPACE] skip` during dramatic pauses
  - Pendant glow effect renders as colored italic text

- **Combat UX Improvements**
  - Damage numbers highlighted in bold red
  - Heal numbers highlighted in bold green
  - Action entries now cyan for better visibility
  - Combat log header with ⚔️ icon

- **Input & Engine Fixes**
  - Spacebar now skips pause delays (was blocking)
  - Fixed input delay by syncing refs immediately (was using useEffect)
  - Choice responses now display before advancing (was skipped)
  - Added `desperate-thug` enemy template (was missing from prologue)
  - Montage `autoCombat` now renders as system message
  - Added chapter validation on registration (warns about invalid scene refs)

- **Visual Polish**
  - ASCII art title screen with "THE BEGGARS SECT" in block letters
  - Color-coded title: THE (cyan), BEGGARS (magenta), SECT (green)
  - Chinese subtitle: 丐 帮 ： 李 伟 的 崛 起

### Technical
- `ContentRenderer.tsx` - Speaker color mapping, emotion emoji helper
- `StoryScreen.tsx` - Immediate ref sync, pause skip, progress tracking
- `CombatLog.tsx` - Number highlighting with regex parsing
- `StoryEngine.ts` - Choice response handling, chapter validation
- `CharacterFactory.ts` - Added desperate-thug template
- `App.tsx` - ASCII art title screen

---

## [0.2.1] - 2025-12-06

### Added
- **Cross-Platform Build System**
  - `scripts/setup.iss` - Windows Inno Setup installer script
  - `scripts/build-deb.sh` - Linux DEB package build script
  - `scripts/build-dmg.sh` - macOS DMG installer build script

- **GitHub Actions CI/CD**
  - `.github/workflows/build-release.yml` - Automated multi-platform builds
  - Triggers: push to main (build only), push tag v* (build + release)
  - Creates GitHub Release with all platform installers

- **Installer Packages**
  - Windows: Inno Setup installer with Start Menu, Desktop shortcuts, PATH option
  - Linux: DEB package for Debian/Ubuntu with desktop entry
  - macOS: DMG disk image with README and ad-hoc code signing

### Fixed
- Added `package-lock.json` for CI npm caching (was in .gitignore)
- Fixed pkg targets (node18 instead of node20 - pkg doesn't support node20)
- Added GitHub Actions write permissions for release creation
- Fixed Debian control file formatting (long description indentation)

### Changed
- Updated BUILD_AND_DEPLOY.md with implementation status and lessons learned
- Added `installers/`, `build-deb/`, `build-dmg/` to .gitignore

---

## [0.2.0] - 2025-12-06

### Added
- **Complete Combat System**
  - ATB (Active Time Battle) engine with DEX-based speed
  - 55+ techniques (8 player, 48 enemy/boss)
  - Full effect processing: damage, heal, chi-restore, buff, debuff, stun, armor-break, counter-setup, multi-hit
  - Conditional effects support (e.g., "hp < 50%")

- **AI Controller**
  - Pattern-based decision making with priority weighting
  - Combat log analysis for tactical decisions
  - Boss phase transitions (HP thresholds)
  - Condition evaluation (player state, chi levels, buffs)

- **Technique Registry** (41 new techniques)
  - Boss Razor: razor-slash, street-kings-authority, brutal-combo, desperate-fury, last-resort
  - Boss Vex: commanders-strike, analyze-opponent, shield-formation, disciplined-assault, rally-cry, final-command, spartans-pride
  - Boss Hollow One: empty-palm, mirror-stance, hollow-guard, formless-strike, chi-disruption, perfect-form, hollow-resonance, enlightenment
  - Spartan techniques: precision-strike, formation-guard, disciplined-thrust, lance-strike, shield-bash, phalanx-stance, execute
  - Lone wolf techniques: swift-palm, flowing-counter, chi-burst, second-wind, shadowless-palm, void-step, killing-intent, perfect-strike, meditate
  - Gang techniques: iron-fist, gang-tactics, takedown, last-stand, block

- **Save System**
  - SaveManager with file persistence
  - Auto-save triggers
  - Save slot management (3 slots)
  - Checksum validation

- **Story Engine**
  - Non-linear narrative system
  - 3 paths (Blade, Stream, Shadow)
  - 3 endings
  - Choice consequences

- **CLI Packaging**
  - Standalone executables for Windows (79 MB), macOS (92 MB), Linux (87 MB)
  - pkg-based bundling with CommonJS

### Fixed
- AIController now properly connected to CombatEngine
- All 41 missing technique definitions added
- Effect processing implemented in executeTechnique()
- Hardcoded AI conditions now use combat log analysis:
  - `player.usedHeavyTechnique` - checks for heavy technique keywords
  - `player.usedTechnique` - checks combat log for technique usage
  - `!healed`, `!meditated` - track ability usage via combat log
  - `!shielded`, `!prideBuff`, `!enlightened` - check status effect descriptions

### Changed
- Updated GAME_DESIGN.md to reflect v0.2.0 implementation
- Updated TECH_DESIGN.md with actual project structure and dependencies
- Updated README.md with implementation status

---

## [0.1.0] - 2025-12-05

### Added
- **Week 4: Save System**
  - File-based persistence
  - Auto-save functionality
  - v0.1.0 release preparation

- **Week 3: Story Integration**
  - StoryEngine implementation
  - Non-linear narrative with branching
  - Choice system with consequences

- **Week 2: Combat Engine**
  - ATB combat system (~2,500 lines)
  - Turn queue management
  - Basic technique execution
  - Stance system (Flowing, Weathered, Hungry)

- **Week 1: Foundation**
  - TypeScript + Ink 3.x setup
  - Project structure
  - Type definitions (~1,457 lines)
  - Basic UI components

---

## [0.0.1] - 2025-12-04

### Added
- **Documentation Foundation**
  - 15,000+ lines of design documentation
  - Complete lore (11 documents)
  - Story scripts (Prologue + 3 chapters)
  - Combat system specification
  - Technique definitions (15 player techniques)
  - Enemy specifications (11 enemies + 3 bosses)

- **Lore Documents**
  - WORLDBUILDING.md - Realm context, multiverse
  - CHI_SYSTEM.md - Eight aspects, inverse meridians
  - SECTS.md - 12 martial arts sects
  - FACTIONS.md - Power groups, organizations
  - HISTORY.md - Timeline from Ancient Era
  - LOCATIONS.md - All areas with secrets
  - CHARACTERS.md - Deep character profiles
  - MYSTERIES.md - Hidden lore, prophecies
  - CULTURE.md - Daily life, customs
  - ARTIFACTS.md - Legendary items
  - GLOSSARY.md - Chinese terminology

- **Story Scripts**
  - PROLOGUE.md - 7 scenes, awakening
  - CHAPTER_1.md - 12 scenes, Razor boss
  - CHAPTER_2.md - 11 scenes, Commander Vex
  - CHAPTER_3.md - 10 scenes, The Hollow One

---

## Development Sessions

### Session 21 (2025-12-06)
- Implement Typewriter Effect (R01/C1) for immersive storytelling
- Create `useTypewriter` hook with speed control and skip functionality
- Integrate typewriter into ContentRenderer for narration/dialogue/internal
- Add blinking cursor during typing animation
- Add skip-to-full-text on SPACE press during typing
- Add Settings System (R03) with typewriter toggle and speed control
- Create `GameSettings` interface and integrate into GameStore
- Add Settings Menu UI with toggle and speed presets
- Update version to 0.2.7

### Session 20 (2025-12-06)
- Conduct comprehensive gameplay loop research
- Create IMPROVEMENT_ROADMAP.md with 46 implementation routes
- Add CLI_GAME_RESEARCH.md and CLI_RPG_MECHANICS.md documentation
- Implement Quick Wins bundle (R11, R17, R19)
- Add descriptive health states for enemies in combat
- Wrap combat components with React.memo for performance
- Enable stricter TypeScript options (noUncheckedIndexedAccess)
- Fix 30+ type safety issues caught by stricter config
- Update version to 0.2.4

### Session 19 (2025-12-06)
- Add tutorial combat retry (canLose flag)
- Fix combat result flow between App and StoryScreen
- Add unique enemy IDs with counter + templateId for recreation
- Add React state batching for smooth transitions
- Fix React key warnings in CombatLog
- Fix conditional rendering in ChoiceMenu
- Add missing state notifications in StoryEngine
- Update documentation for v0.2.3

### Session 18 (2025-12-06)
- Implement complete build and deployment system
- Create installer scripts (setup.iss, build-deb.sh, build-dmg.sh)
- Set up GitHub Actions CI/CD workflow
- Debug and fix CI issues (pkg node18, package-lock.json, permissions)
- Successfully release v0.2.1 with all platform installers
- Update BUILD_AND_DEPLOY.md with implementation notes

### Session 17 (2025-12-06)
- Complete combat system fixes from code review
- Add 41 missing technique definitions
- Implement effect processing
- Fix hardcoded AI conditions
- Update all design documentation

### Session 16 (2025-12-06)
- Connect AIController to CombatEngine
- Add agent system configuration
- Code review fixes

### Session 15 (2025-12-05)
- Week 4: Save System complete
- Reorganize docs folder
- Add comprehensive CODE_REVIEW.md

### Session 14 (2025-12-05)
- Week 3: Story Integration
- Non-linear narrative system
- Choice consequences

### Session 13 (2025-12-04)
- Week 2: ATB Combat Engine
- 2,500+ lines of combat code
- Technique and stance systems

### Session 12 (2025-12-04)
- Week 1: Foundation complete
- Standalone executables working
- TypeScript + Ink setup

### Sessions 1-11 (2025-12-03 to 2025-12-04)
- Documentation phase
- Lore creation (15,000+ lines)
- Design specifications
- Story scripting

---

## Roadmap

### v0.3.0 (Planned)
- [ ] Item registry and inventory system
- [ ] Location registry for exploration
- [ ] Additional story content
- [ ] Balance tuning

### v1.0.0 (Planned)
- [ ] Complete Chapters 1-3 implementation
- [ ] Full tutorial integration
- [ ] Achievement system
- [ ] Claude AI enemy variation (optional)

### v1.5.0+ (Future)
- [ ] 4th stance (Deceptive)
- [ ] Staff techniques (Dog Beating Staff)
- [ ] Chapters 4-5
- [ ] Web version

---

*Last Updated: 2025-12-06*
