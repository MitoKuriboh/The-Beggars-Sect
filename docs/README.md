# The Beggars Sect - Documentation Index

**Project:** The Beggars Sect: Li Wei's Ascension
**Current Phase:** DESIGN (Phase 1 of 6)
**Last Updated:** 2025-12-05

---

## Quick Links

| Need to... | Go to... |
|------------|----------|
| See what's designed vs not | `planning/DESIGN_STATUS.md` |
| See current tasks | `planning/TODO.md` |
| Understand the game vision | `design/GAME_DESIGN.md` |
| Understand combat mechanics | `systems/COMBAT_SYSTEM.md` |
| Find technique stats | `systems/TECHNIQUES.md` (TODO) |
| Find enemy stats | `systems/ENEMIES.md` (TODO) |
| Read Chapter 1 script | `story/CHAPTER_1.md` (TODO) |

---

## Documentation Structure

```
docs/
├── README.md                 # This file - documentation index
├── GUIDELINES.md             # How to write/maintain docs
│
├── design/                   # High-level game design
│   ├── GAME_DESIGN.md        # Vision, story, world, pillars
│   ├── WORLDBUILDING.md      # Universe lore (TODO)
│   └── UI_MOCKUPS.md         # Screen designs (TODO)
│
├── systems/                  # Game mechanics specifications
│   ├── COMBAT_SYSTEM.md      # Combat mechanics
│   ├── TECHNIQUES.md         # Technique database (TODO)
│   ├── ENEMIES.md            # Enemy roster (TODO)
│   ├── ITEMS.md              # Item database (TODO)
│   ├── PROGRESSION.md        # Stat/mastery systems (TODO)
│   └── BALANCE.md            # Tuning parameters (TODO)
│
├── story/                    # Narrative content
│   ├── CHAPTER_1.md          # Chapter 1 full script (TODO)
│   ├── CHAPTER_2.md          # Chapter 2 full script (TODO)
│   ├── CHAPTER_3.md          # Chapter 3 full script (TODO)
│   ├── NPC_CAST.md           # Character profiles (TODO)
│   └── DIALOGUE.md           # Dialogue guidelines (TODO)
│
├── planning/                 # Project management
│   ├── TODO.md               # Current tasks and roadmap
│   ├── DESIGN_STATUS.md      # System-by-system status tracker
│   ├── MVP_PLAN.md           # MVP scoping decisions
│   ├── SUMMARY.md            # Session summaries
│   └── CHANGELOG.md          # Version history
│
└── reference/                # Quick reference sheets
    ├── FORMULAS.md           # All game formulas (TODO)
    ├── STAT_TABLES.md        # Stat reference tables (TODO)
    └── GLOSSARY.md           # Term definitions (TODO)
```

---

## Document Status

### Existing Documents

| Document | Status | Lines | Description |
|----------|--------|-------|-------------|
| `design/GAME_DESIGN.md` | SCAFFOLDED | ~950 | Vision, story, world concepts |
| `systems/COMBAT_SYSTEM.md` | SCAFFOLDED | ~1350 | Combat mechanics concepts |
| `planning/TODO.md` | CURRENT | ~270 | Tasks and roadmap |
| `planning/DESIGN_STATUS.md` | CURRENT | ~400 | System status tracker |
| `planning/MVP_PLAN.md` | COMPLETE | ~500 | Scoping decisions |
| `planning/SUMMARY.md` | COMPLETE | ~200 | Session summaries |
| `planning/CHANGELOG.md` | CURRENT | ~100 | Version history |

### Documents Needed

| Document | Priority | Blocks |
|----------|----------|--------|
| `systems/TECHNIQUES.md` | **P1** | Implementation |
| `systems/ENEMIES.md` | **P1** | Implementation |
| `story/CHAPTER_1.md` | **P1** | Content phase |
| `story/NPC_CAST.md` | P2 | Content phase |
| `design/WORLDBUILDING.md` | P2 | Consistency |
| `story/CHAPTER_2.md` | P2 | Content phase |
| `story/CHAPTER_3.md` | P2 | Content phase |
| `systems/ITEMS.md` | P3 | Polish |
| `systems/BALANCE.md` | P3 | Tuning |
| `design/UI_MOCKUPS.md` | P3 | Polish |
| `reference/FORMULAS.md` | P3 | Reference |

---

## How to Use This Documentation

### For Design Work
1. Check `planning/DESIGN_STATUS.md` to see what needs elaboration
2. Pick a SCAFFOLDED system to elaborate
3. Add specific numbers, content, and details
4. Update status to ELABORATED when complete

### For Implementation
1. Only implement systems marked ELABORATED
2. Reference `systems/` docs for mechanics
3. Reference `story/` docs for content
4. Use `reference/` for quick lookups

### For Session Planning
1. Review `planning/TODO.md` for current priorities
2. Check `planning/DESIGN_STATUS.md` for blockers
3. Pick ONE system to elaborate per session
4. Update docs as you work

---

## Documentation Principles

1. **Specificity over vagueness** - "Power: 25" not "heavy damage"
2. **Numbers are required** - Every stat needs a value
3. **Examples clarify** - Show don't just tell
4. **Single source of truth** - One place for each piece of info
5. **Update as you go** - Docs reflect current decisions

---

## Current Focus

**Phase:** Design (Week 1-2)
**Goal:** Move systems from SCAFFOLDED to ELABORATED

**Priority Order:**
1. Finalize damage formula (blocks everything)
2. Create TECHNIQUES.md with all stats
3. Create ENEMIES.md with all stats
4. Write CHAPTER_1.md script

**Exit Criteria for Design Phase:**
- [ ] Can describe any combat interaction with exact numbers
- [ ] Can simulate a fight on paper
- [ ] Chapter 1 has scene-by-scene breakdown
