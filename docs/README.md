# The Beggars Sect - Documentation

**A CLI RPG set in the Martial Arts Haven**
**Version:** 0.3.6 | **Last Updated:** 2025-12-07

---

## Quick Navigation

| I want to... | Go to |
|--------------|-------|
| **Understand the AAA architecture** | [Architecture/AAA_GAME_LOGIC_ARCHITECTURE.md](Architecture/AAA_GAME_LOGIC_ARCHITECTURE.md) |
| **See UI architecture** | [Architecture/AAA_UI_ARCHITECTURE.md](Architecture/AAA_UI_ARCHITECTURE.md) |
| **Review Phase 1 & 2 refactoring** | [Architecture/PHASE_1_2_SUMMARY.md](Architecture/PHASE_1_2_SUMMARY.md) |
| **Understand progression system** | [systems/PROGRESSION_SYSTEM.md](systems/PROGRESSION_SYSTEM.md) |
| **See training & mastery loop** | [systems/TRAINING_INTEGRATION.md](systems/TRAINING_INTEGRATION.md) |
| **Understand the codebase** | [dev/CODE_REVIEW.md](dev/CODE_REVIEW.md) |
| **Build and deploy** | [dev/BUILD_AND_DEPLOY.md](dev/BUILD_AND_DEPLOY.md) |
| **Learn the tech stack** | [dev/README.md](dev/README.md) |
| **See what's implemented** | [planning/SESSION_PROGRESS.md](planning/SESSION_PROGRESS.md) |
| **Find the TODO list** | [planning/TODO.md](planning/TODO.md) |
| **Read the game design** | [design/GAME_DESIGN.md](design/GAME_DESIGN.md) |
| **Understand combat** | [design/COMBAT_SYSTEM.md](design/COMBAT_SYSTEM.md) |
| **Look up techniques** | [design/TECHNIQUES.md](design/TECHNIQUES.md) |
| **Look up enemies** | [design/ENEMIES.md](design/ENEMIES.md) |
| **Get formulas** | [design/FORMULAS.md](design/FORMULAS.md) |
| **Read the story** | [story/](story/) |
| **Explore the lore** | [lore/](lore/) |

---

## Directory Structure

```
docs/
├── README.md
│
├── Architecture/          # ⭐ AAA Architecture (5 files)
│   ├── AAA_GAME_LOGIC_ARCHITECTURE.md    # Game logic audit & refactoring (1,567 lines)
│   ├── AAA_UI_ARCHITECTURE.md            # UI architecture guide (1,200+ lines)
│   ├── PHASE_1_2_SUMMARY.md              # Refactoring summary with metrics (446 lines)
│   ├── GAME_LOGIC_REFACTORING_CHECKLIST.md  # Logic refactoring checklist (400+ lines)
│   └── UI_REFACTORING_CHECKLIST.md       # UI refactoring checklist (300+ lines)
│
├── design/                # Game Design & Systems (6 files)
│   ├── GAME_DESIGN.md     # Vision, pillars, mechanics
│   ├── TECH_DESIGN.md     # Architecture guide
│   ├── COMBAT_SYSTEM.md   # ATB combat mechanics
│   ├── TECHNIQUES.md      # All techniques
│   ├── ENEMIES.md         # All enemies & bosses
│   └── FORMULAS.md        # Game math
│
├── systems/               # Game Systems (3 files)
│   ├── PROGRESSION_SYSTEM.md    # Unified progression (paths/aspects/mastery)
│   ├── STARTER_TECHNIQUES.md    # Path-specific technique trees
│   └── TRAINING_INTEGRATION.md  # Sparring matches & mastery loop
│
├── dev/                   # Development (16 files)
│   ├── README.md          # Dev docs index
│   ├── CODE_REVIEW.md     # Codebase analysis
│   ├── BUILD_AND_DEPLOY.md
│   ├── CHANGELOG.md       # Version history
│   ├── GUIDELINES.md      # Doc standards
│   ├── 01-INK.md ... 07-FILE-PERSISTENCE.md  # Tech manuals
│   ├── CLI_GAME_RESEARCH.md
│   ├── CLI_GAME_MENUS.md
│   ├── CLI_RPG_MECHANICS.md
│   └── IMPROVEMENT_ROADMAP.md
│
├── planning/              # Project Management (7 files)
│   ├── TODO.md
│   ├── SESSION_PROGRESS.md
│   ├── CHANGELOG.md
│   ├── DESIGN_STATUS.md
│   ├── MVP_PLAN.md
│   ├── SUMMARY.md
│   └── CORE_ENGINE_PLAN.md
│
├── lore/                  # World Building (11 files)
│   ├── WORLDBUILDING.md
│   ├── CHI_SYSTEM.md
│   ├── SECTS.md
│   ├── FACTIONS.md
│   ├── HISTORY.md
│   ├── LOCATIONS.md
│   ├── CHARACTERS.md
│   ├── MYSTERIES.md
│   ├── CULTURE.md
│   ├── ARTIFACTS.md
│   └── GLOSSARY.md
│
└── story/                 # Narrative (6 files)
    ├── STORY_STRUCTURE.md
    ├── PROLOGUE.md
    ├── CHAPTER_1.md
    ├── CHAPTER_2.md
    ├── CHAPTER_3.md
    └── NPC_CAST.md
```

---

## By Category

### Architecture (5) ⭐
| Document | Content | Lines |
|----------|---------|-------|
| [AAA_GAME_LOGIC_ARCHITECTURE.md](Architecture/AAA_GAME_LOGIC_ARCHITECTURE.md) | Game logic audit & recommendations | 1,567 |
| [AAA_UI_ARCHITECTURE.md](Architecture/AAA_UI_ARCHITECTURE.md) | Complete UI architecture guide | 1,200+ |
| [PHASE_1_2_SUMMARY.md](Architecture/PHASE_1_2_SUMMARY.md) | Phase 1 & 2 refactoring summary | 446 |
| [GAME_LOGIC_REFACTORING_CHECKLIST.md](Architecture/GAME_LOGIC_REFACTORING_CHECKLIST.md) | Logic refactoring checklist | 400+ |
| [UI_REFACTORING_CHECKLIST.md](Architecture/UI_REFACTORING_CHECKLIST.md) | UI refactoring checklist | 300+ |

### Design (6)
| Document | Content |
|----------|---------|
| [GAME_DESIGN.md](design/GAME_DESIGN.md) | Vision & pillars |
| [TECH_DESIGN.md](design/TECH_DESIGN.md) | Architecture |
| [COMBAT_SYSTEM.md](design/COMBAT_SYSTEM.md) | ATB combat |
| [TECHNIQUES.md](design/TECHNIQUES.md) | 55+ techniques |
| [ENEMIES.md](design/ENEMIES.md) | 14 enemies |
| [FORMULAS.md](design/FORMULAS.md) | All math |

### Systems (3) ⭐
| Document | Content |
|----------|---------|
| [PROGRESSION_SYSTEM.md](systems/PROGRESSION_SYSTEM.md) | Unified progression design |
| [STARTER_TECHNIQUES.md](systems/STARTER_TECHNIQUES.md) | Path-specific technique trees |
| [TRAINING_INTEGRATION.md](systems/TRAINING_INTEGRATION.md) | Sparring & mastery loop |

### Dev (16)
| Document | Content |
|----------|---------|
| [CODE_REVIEW.md](dev/CODE_REVIEW.md) | Codebase analysis |
| [BUILD_AND_DEPLOY.md](dev/BUILD_AND_DEPLOY.md) | Build & CI/CD |
| [01-INK.md](dev/01-INK.md) - [07-FILE-PERSISTENCE.md](dev/07-FILE-PERSISTENCE.md) | Tech stack manuals |
| [CLI_GAME_RESEARCH.md](dev/CLI_GAME_RESEARCH.md) | CLI dev research |
| [CLI_GAME_MENUS.md](dev/CLI_GAME_MENUS.md) | Menu patterns |
| [CLI_RPG_MECHANICS.md](dev/CLI_RPG_MECHANICS.md) | RPG mechanics |
| [IMPROVEMENT_ROADMAP.md](dev/IMPROVEMENT_ROADMAP.md) | Future plans |

### Planning (7)
TODO, SESSION_PROGRESS, CHANGELOG, DESIGN_STATUS, MVP_PLAN, SUMMARY, CORE_ENGINE_PLAN

### Lore (11)
WORLDBUILDING, CHI_SYSTEM, SECTS, FACTIONS, HISTORY, LOCATIONS, CHARACTERS, MYSTERIES, CULTURE, ARTIFACTS, GLOSSARY

### Story (6)
STORY_STRUCTURE, PROLOGUE, CHAPTER_1, CHAPTER_2, CHAPTER_3, NPC_CAST

---

## Key Concepts

### Three Paths
| Path | Philosophy | Ending |
|------|------------|--------|
| Blade | Direct confrontation | Destroyer |
| Stream | Adaptation, flow | Reformer |
| Shadow | Cunning, indirect | Wanderer |

### Stances
| Stance | ATK | DEF | SPD |
|--------|-----|-----|-----|
| Flowing | 1.0x | 1.0x | 1.0x |
| Weathered | 0.9x | 1.5x | 0.8x |
| Hungry | 1.3x | 0.7x | 1.1x |

---

## Stats

| Metric | Count |
|--------|-------|
| Folders | 6 |
| Documents | 52 |
| Architecture Docs | 5 (3,900+ lines) |
| Techniques | 55+ |
| Enemies | 14 |
| Story Scenes | 40+ |
