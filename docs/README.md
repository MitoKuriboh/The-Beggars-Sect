# The Beggars Sect - Documentation

**A CLI RPG set in the Martial Arts Haven**
**Version:** 0.2.0 | **Last Updated:** 2025-12-06

---

## Quick Navigation

| I want to... | Go to |
|--------------|-------|
| **Understand the codebase** | [dev/CODE_REVIEW.md](dev/CODE_REVIEW.md) |
| **See what's implemented** | [planning/SESSION_PROGRESS.md](planning/SESSION_PROGRESS.md) |
| **Find the TODO list** | [planning/TODO.md](planning/TODO.md) |
| **Read the game design** | [design/GAME_DESIGN.md](design/GAME_DESIGN.md) |
| **Understand combat mechanics** | [systems/COMBAT_SYSTEM.md](systems/COMBAT_SYSTEM.md) |
| **Look up technique stats** | [systems/TECHNIQUES.md](systems/TECHNIQUES.md) |
| **Look up enemy stats** | [systems/ENEMIES.md](systems/ENEMIES.md) |
| **Get exact formulas** | [reference/FORMULAS.md](reference/FORMULAS.md) |
| **Read the story scripts** | [story/](story/) |
| **Explore the world lore** | [lore/](lore/) |

---

## Directory Structure

```
docs/
│
├── README.md                    # You are here
│
├── design/                      # Game & Technical Design
│   ├── GAME_DESIGN.md           # Vision, pillars, mechanics overview
│   └── TECH_DESIGN.md           # Architecture, implementation guide
│
├── systems/                     # Game Mechanics (implementable specs)
│   ├── COMBAT_SYSTEM.md         # ATB, stances, combos, damage formulas
│   ├── TECHNIQUES.md            # All technique definitions
│   └── ENEMIES.md               # All enemy/boss definitions
│
├── story/                       # Narrative Content
│   ├── STORY_STRUCTURE.md       # 3 paths, 3 endings overview
│   ├── PROLOGUE.md              # Opening chapter script
│   ├── CHAPTER_1.md             # Streets of the Forgotten
│   ├── CHAPTER_2.md             # Spartans' Gambit
│   ├── CHAPTER_3.md             # The Hollow One
│   └── NPC_CAST.md              # Character profiles & dialogue
│
├── lore/                        # World Building
│   ├── WORLDBUILDING.md         # Universe overview, convergence
│   ├── CHI_SYSTEM.md            # 8 chi aspects, inverse meridians
│   ├── SECTS.md                 # 12 martial arts sects
│   ├── FACTIONS.md              # Thugs, Spartans, Beggars, etc.
│   ├── HISTORY.md               # Timeline from Ancient Era
│   ├── LOCATIONS.md             # All areas with secrets
│   ├── CHARACTERS.md            # Extended character profiles
│   ├── MYSTERIES.md             # Hidden lore, Li Wei's origin
│   ├── CULTURE.md               # Daily life, customs, traditions
│   ├── ARTIFACTS.md             # Legendary items
│   └── GLOSSARY.md              # Chinese terminology reference
│
├── planning/                    # Project Management
│   ├── TODO.md                  # Current task list
│   ├── SESSION_PROGRESS.md      # Development session logs
│   ├── CHANGELOG.md             # Version history
│   ├── DESIGN_STATUS.md         # Document completion tracker
│   ├── MVP_PLAN.md              # 12-week development roadmap
│   ├── SUMMARY.md               # Quick project status
│   └── CORE_ENGINE_PLAN.md      # Engine implementation plan
│
├── reference/                   # Quick Reference
│   └── FORMULAS.md              # All game formulas in one place
│
└── dev/                         # Development Documentation
    ├── CODE_REVIEW.md           # Full codebase analysis (1500+ lines)
    └── GUIDELINES.md            # Documentation standards
```

---

## Documentation by Purpose

### For Developers

| Document | Purpose | Lines |
|----------|---------|-------|
| [dev/CODE_REVIEW.md](dev/CODE_REVIEW.md) | Complete codebase analysis | 1,532 |
| [dev/GUIDELINES.md](dev/GUIDELINES.md) | Doc writing standards | 300+ |
| [design/TECH_DESIGN.md](design/TECH_DESIGN.md) | Architecture guide | 600+ |
| [reference/FORMULAS.md](reference/FORMULAS.md) | All game math | 350+ |
| [planning/TODO.md](planning/TODO.md) | Current tasks | 150+ |

### For Game Design

| Document | Purpose | Lines |
|----------|---------|-------|
| [design/GAME_DESIGN.md](design/GAME_DESIGN.md) | Vision & pillars | 600+ |
| [systems/COMBAT_SYSTEM.md](systems/COMBAT_SYSTEM.md) | Combat mechanics | 1,200+ |
| [systems/TECHNIQUES.md](systems/TECHNIQUES.md) | 15+ techniques | 750+ |
| [systems/ENEMIES.md](systems/ENEMIES.md) | 11 enemies + 3 bosses | 800+ |

### For Narrative

| Document | Purpose | Lines |
|----------|---------|-------|
| [story/STORY_STRUCTURE.md](story/STORY_STRUCTURE.md) | Plot overview | 1,000+ |
| [story/PROLOGUE.md](story/PROLOGUE.md) | 7 scenes | 900+ |
| [story/CHAPTER_1.md](story/CHAPTER_1.md) | 12 scenes, Razor boss | 2,000+ |
| [story/CHAPTER_2.md](story/CHAPTER_2.md) | 11 scenes, Vex boss | 1,600+ |
| [story/CHAPTER_3.md](story/CHAPTER_3.md) | 10 scenes, Hollow One | 1,300+ |
| [story/NPC_CAST.md](story/NPC_CAST.md) | 9 NPCs with dialogue | 550+ |

### For World Building

| Document | Purpose | Lines |
|----------|---------|-------|
| [lore/WORLDBUILDING.md](lore/WORLDBUILDING.md) | Universe bible | 400+ |
| [lore/CHI_SYSTEM.md](lore/CHI_SYSTEM.md) | Power system | 550+ |
| [lore/SECTS.md](lore/SECTS.md) | 12 martial sects | 1,100+ |
| [lore/FACTIONS.md](lore/FACTIONS.md) | Gang politics | 750+ |
| [lore/HISTORY.md](lore/HISTORY.md) | Full timeline | 550+ |
| [lore/LOCATIONS.md](lore/LOCATIONS.md) | All areas | 1,700+ |
| [lore/CHARACTERS.md](lore/CHARACTERS.md) | Extended profiles | 2,100+ |
| [lore/MYSTERIES.md](lore/MYSTERIES.md) | Hidden lore | 570+ |
| [lore/CULTURE.md](lore/CULTURE.md) | Customs, traditions | 700+ |
| [lore/ARTIFACTS.md](lore/ARTIFACTS.md) | Legendary items | 730+ |
| [lore/GLOSSARY.md](lore/GLOSSARY.md) | Chinese terms | 540+ |

---

## Project Status

### Implementation Progress

| Phase | Status | Details |
|-------|--------|---------|
| Week 1: Foundation | Complete | TypeScript, Ink, project structure |
| Week 2: Combat | Complete | ATB engine, techniques, AI |
| Week 3: Story | Complete | Non-linear narrative, 3 paths |
| Week 4: Polish | Complete | Save system, v0.2.0 release |
| Week 5+: Content | Planned | More chapters, techniques |

### Codebase Stats

| Layer | Files | Lines |
|-------|-------|-------|
| Game Logic | 10 | ~3,343 |
| Type Definitions | 7 | ~1,457 |
| UI Components | 16 | ~1,866 |
| Entry + Config | 6 | ~164 |
| **Total** | **39** | **~6,830** |

### Known Issues (from Code Review)

| Priority | Issue |
|----------|-------|
| 1 | AIController not connected to CombatEngine |
| 2 | ~30+ techniques undefined in registry |
| 3 | Effect processing not implemented |
| 4 | No item/location registries |

See [dev/CODE_REVIEW.md](dev/CODE_REVIEW.md) for full analysis.

---

## Key Concepts

### Three Paths

| Path | Philosophy | Ending |
|------|------------|--------|
| Blade | Direct confrontation | Destroyer |
| Stream | Adaptation, flow | Reformer |
| Shadow | Cunning, indirect | Wanderer |

### Chi Aspects

| Aspect | Chinese | Domain |
|--------|---------|--------|
| Force | 力 | Raw power |
| Flow | 流 | Continuous motion |
| Precision | 准 | Exact targeting |
| Burst | 爆 | Explosive release |
| Armor | 甲 | Defensive density |
| Sense | 感 | Awareness |
| Will | 意 | Mental projection |
| Inverse | 逆 | Reversed flow |

### Stances

| Stance | Attack | Defense | Speed |
|--------|--------|---------|-------|
| Flowing | 1.0x | 1.0x | 1.0x |
| Weathered | 0.9x | 1.5x | 0.8x |
| Hungry | 1.3x | 0.7x | 1.1x |

---

## Documentation Stats

| Metric | Value |
|--------|-------|
| Total Documents | 33 |
| Total Lines | 15,000+ |
| Directories | 7 |
| Story Scenes | 40+ |
| Techniques Documented | 15+ |
| Enemies Documented | 14 |
| NPCs Documented | 9 |
| Locations Documented | 20+ |
