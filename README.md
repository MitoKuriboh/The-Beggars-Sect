# The Beggars Sect: Li Wei's Ascension

**A CLI RPG set in the Martial Arts Haven universe**

> From nothing, to legend.

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

## About

**The Beggars Sect** is the first game in the Martial Arts Haven multiverse - an ecosystem of interconnected games exploring different realms, teams, and characters.

Follow Li Wei's journey from a confused stranger spawned into an unknown world, to a master of the mysterious Beggars Sect palm techniques.

| | |
|---|---|
| **Genre** | Wuxia Turn-Based RPG |
| **Platform** | CLI (Terminal) |
| **Version** | 0.2.0 |
| **Status** | Week 4 Complete - Save System |
| **Playtime** | ~5-6 hours (first playthrough) |

---

## Project Structure

```
the-beggars-sect/
│
├── src/                        # Source code (~6,800 lines)
│   ├── index.tsx               # Entry point
│   ├── game/                   # Game logic
│   │   ├── combat/             # ATB combat engine, AI, techniques
│   │   ├── state/              # GameStore, SaveManager
│   │   ├── story/              # StoryEngine, chapters
│   │   └── factories/          # Character/enemy creation
│   ├── types/                  # TypeScript definitions
│   ├── ui/                     # Ink/React components
│   │   ├── combat/             # Combat UI (8 components)
│   │   └── story/              # Story UI (4 components)
│   ├── data/                   # Data files (scaffold)
│   ├── automation/             # AI integration (scaffold)
│   └── utils/                  # Utilities (scaffold)
│
├── docs/                       # Documentation (~15,000 lines)
│   ├── README.md               # Documentation index
│   ├── design/                 # Game & tech design
│   ├── systems/                # Combat, techniques, enemies
│   ├── story/                  # Narrative scripts
│   ├── lore/                   # World building (11 files)
│   ├── planning/               # TODO, changelog, roadmap
│   ├── reference/              # Formulas
│   └── dev/                    # Code review, guidelines
│
├── assets/                     # Game assets (placeholder)
├── release/                    # Release packaging
│
├── package.json                # Project config
├── tsconfig.json               # TypeScript config
└── sea-config.json             # Node SEA config
```

---

## Features

### Implemented (v0.2.0)

- **ATB Combat System** - DEX-based turn order, 7-turn preview
- **3 Stances** - Flowing, Weathered, Hungry with stat modifiers
- **Combo System** - Starter → Followup → Finisher chains
- **8 Player Techniques** - Palm strikes, guards, counters
- **12 Enemy Types** - 9 regular + 3 bosses with phases
- **AI Controller** - Pattern-based enemy behavior
- **Non-Linear Story** - 3 paths (Blade/Stream/Shadow), 3 endings
- **Prologue Chapter** - 7 scenes, ~25 minutes
- **Save System** - 3 slots + auto-save, file persistence
- **Full UI** - Combat screen, story renderer, menus

### Planned

- Chapter 1-3 implementation
- Item system
- Location exploration
- Claude AI content generation
- n8n workflow integration

---

## Tech Stack

| Category | Technology |
|----------|------------|
| Runtime | Node.js 18+ |
| Language | TypeScript 5.3 |
| UI Framework | Ink 3.2 (React for CLI) |
| State | Custom singleton store |
| Build | tsc, esbuild, pkg |

### Dependencies

- `ink` - React for command line
- `react` - UI framework
- `ink-select-input` - Selection menus
- `chalk` - Terminal colors
- `boxen` - Box drawing
- `figlet` - ASCII art

---

## Documentation

| Need to... | Go to |
|------------|-------|
| Understand the codebase | [docs/dev/CODE_REVIEW.md](docs/dev/CODE_REVIEW.md) |
| See implementation tasks | [docs/planning/TODO.md](docs/planning/TODO.md) |
| Read game design | [docs/design/GAME_DESIGN.md](docs/design/GAME_DESIGN.md) |
| Understand combat | [docs/systems/COMBAT_SYSTEM.md](docs/systems/COMBAT_SYSTEM.md) |
| Look up techniques | [docs/systems/TECHNIQUES.md](docs/systems/TECHNIQUES.md) |
| Read story scripts | [docs/story/](docs/story/) |
| Explore world lore | [docs/lore/](docs/lore/) |

See [docs/README.md](docs/README.md) for full documentation index.

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

| Platform | Output |
|----------|--------|
| Windows | `beggars-sect-win.exe` |
| macOS | `beggars-sect-macos` |
| Linux | `beggars-sect-linux` |

---

## Roadmap

| Phase | Status | Details |
|-------|--------|---------|
| Week 1: Foundation | Complete | TypeScript, Ink, project structure |
| Week 2: Combat | Complete | ATB engine, techniques, AI |
| Week 3: Story | Complete | Non-linear narrative, 3 paths |
| Week 4: Polish | Complete | Save system, v0.2.0 |
| Week 5+: Content | Planned | Chapters, items, locations |

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
