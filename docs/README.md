# The Beggars Sect - Documentation Index

**Project:** The Beggars Sect: Li Wei's Ascension
**Current Phase:** IMPLEMENTATION (Phase 2 of 6)
**Last Updated:** 2025-12-05

---

## Quick Links

| Need to... | Go to... |
|------------|----------|
| See implementation tasks | `planning/TODO.md` |
| Understand the game vision | `design/GAME_DESIGN.md` |
| Understand combat mechanics | `systems/COMBAT_SYSTEM.md` |
| Find technique stats | `systems/TECHNIQUES.md` |
| Find enemy stats | `systems/ENEMIES.md` |
| Get exact formulas | `reference/FORMULAS.md` |
| Read Chapter 1 script | `story/CHAPTER_1.md` |
| Get implementation architecture | `design/TECH_DESIGN.md` |

---

## Documentation Structure

```
docs/
├── README.md                 # This file - documentation index
├── GUIDELINES.md             # How to write/maintain docs
│
├── design/                   # High-level game design
│   ├── GAME_DESIGN.md        # Vision, story, world, pillars
│   └── TECH_DESIGN.md        # Implementation architecture
│
├── systems/                  # Game mechanics specifications
│   ├── COMBAT_SYSTEM.md      # Combat mechanics (ATB, stances, combos)
│   ├── TECHNIQUES.md         # 15 techniques with full stats
│   └── ENEMIES.md            # 8 enemies + 3 bosses
│
├── story/                    # Narrative content
│   ├── CHAPTER_1.md          # 12 scenes, Razor boss
│   ├── CHAPTER_2.md          # 11 scenes, Commander Vex
│   ├── CHAPTER_3.md          # 10 scenes, The Hollow One
│   └── NPC_CAST.md           # 9 NPCs with characterization
│
├── lore/                     # Worldbuilding
│   ├── WORLDBUILDING.md      # Universe bible, aptitude system
│   ├── CHI_SYSTEM.md         # Eight aspects, inverse chi
│   ├── SECTS.md              # 12 sects with martial arts
│   ├── FACTIONS.md           # Faction histories
│   ├── HISTORY.md            # Full timeline
│   ├── LOCATIONS.md          # All areas with secrets
│   ├── MYSTERIES.md          # Li Wei's origin, prophecy
│   ├── CHARACTERS.md         # Character profiles
│   ├── CULTURE.md            # Daily life, customs
│   ├── ARTIFACTS.md          # Legendary weapons
│   └── GLOSSARY.md           # Chinese terminology
│
├── planning/                 # Project management
│   ├── TODO.md               # Implementation roadmap
│   ├── DESIGN_STATUS.md      # Document status tracker
│   ├── MVP_PLAN.md           # 12-week roadmap
│   ├── SESSION_PROGRESS.md   # Session summaries
│   ├── SUMMARY.md            # Quick status
│   └── CHANGELOG.md          # Version history
│
└── reference/                # Quick reference
    └── FORMULAS.md           # All game formulas
```

---

## Document Status

### All Core Documents: ✅ ELABORATED

| Category | Documents | Status |
|----------|-----------|--------|
| **Design** | GAME_DESIGN.md, TECH_DESIGN.md | ✅ Complete |
| **Systems** | COMBAT_SYSTEM.md, TECHNIQUES.md, ENEMIES.md | ✅ Complete |
| **Story** | CHAPTER_1-3.md, NPC_CAST.md | ✅ Complete |
| **Lore** | 11 documents | ✅ Complete |
| **Reference** | FORMULAS.md | ✅ Complete |

### Remaining (Polish Phase)
- UI_MOCKUPS.md - Create during implementation

---

## How to Use This Documentation

### For Implementation
1. Start with `design/TECH_DESIGN.md` for architecture
2. Reference `systems/` docs for mechanics
3. Use `reference/FORMULAS.md` for exact calculations
4. Reference `story/` docs for content

### For Understanding the World
1. Start with `lore/WORLDBUILDING.md` for universe context
2. Read `lore/CHI_SYSTEM.md` for power mechanics
3. Check `lore/GLOSSARY.md` for terminology

---

## Current Focus

**Phase:** Implementation (Weeks 3-4)
**Goal:** Build playable combat prototype

**Priority Order:**
1. Set up TypeScript + Ink project
2. Build ATB turn system
3. Implement basic combat loop
4. Add technique system
5. Create first enemy with AI

See `planning/TODO.md` for full task breakdown.

---

## Key Stats

- **Total Documents:** 26
- **Total Lines:** 11,000+
- **Techniques:** 15 with full stats
- **Enemies:** 11 (8 regular + 3 bosses)
- **NPCs:** 9 with dialogue
- **Chapters:** 3 fully scripted
