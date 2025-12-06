# Dev Documentation

**Project:** The Beggars Sect
**Purpose:** Development docs, tech stack manuals, and research reference

---

## Quick Reference

### Core Dev Docs

| Document | Purpose |
|----------|---------|
| [CODE_REVIEW.md](./CODE_REVIEW.md) | Full codebase analysis |
| [BUILD_AND_DEPLOY.md](./BUILD_AND_DEPLOY.md) | Build system & CI/CD |
| [CHANGELOG.md](./CHANGELOG.md) | Version history |
| [GUIDELINES.md](./GUIDELINES.md) | Documentation standards |

### Tech Stack Manuals

| Technology | Version | Manual |
|------------|---------|--------|
| **Ink** | 3.2.0 | [01-INK.md](./01-INK.md) |
| **ink-select-input** | 4.0.0 | [02-INK-SELECT-INPUT.md](./02-INK-SELECT-INPUT.md) |
| **TypeScript** | 5.3.3 | [03-TYPESCRIPT.md](./03-TYPESCRIPT.md) |
| **pkg** | 5.8.1 | [04-PKG.md](./04-PKG.md) |
| **Chalk/Figlet/Boxen** | Various | [05-TERMINAL-STYLING.md](./05-TERMINAL-STYLING.md) |
| **GameStore** | Custom | [06-STATE-MANAGEMENT.md](./06-STATE-MANAGEMENT.md) |
| **SaveManager** | Custom | [07-FILE-PERSISTENCE.md](./07-FILE-PERSISTENCE.md) |

### Research & Analysis

| Document | Purpose |
|----------|---------|
| [CLI_GAME_RESEARCH.md](./CLI_GAME_RESEARCH.md) | CLI game development techniques |
| [CLI_GAME_MENUS.md](./CLI_GAME_MENUS.md) | Menu and UI patterns |
| [CLI_RPG_MECHANICS.md](./CLI_RPG_MECHANICS.md) | RPG mechanics deep dive |
| [IMPROVEMENT_ROADMAP.md](./IMPROVEMENT_ROADMAP.md) | Future improvements |

---

## Tech Stack Manuals

### 1. [Ink - Terminal UI Framework](./01-INK.md)

React for CLI applications. Covers:
- Built-in components (Box, Text, Newline, Spacer, Static, Transform)
- All props and styling options
- Hooks (useInput, useApp, useFocus, useFocusManager)
- Flexbox layout system
- Common patterns and debugging

### 2. [ink-select-input - Menu Selection](./02-INK-SELECT-INPUT.md)

Interactive menu component. Covers:
- Props reference
- Event handlers (onSelect, onHighlight)
- Custom indicators and item components
- Focus management
- Common patterns (back navigation, dynamic items, confirm dialogs)

### 3. [TypeScript Configuration](./03-TYPESCRIPT.md)

Type-safe development setup. Covers:
- tsconfig.json options explained
- Type definition patterns (interfaces, types, enums, generics)
- React component types
- Project type organization
- Common errors and solutions

### 4. [pkg - Binary Packaging](./04-PKG.md)

Package to standalone executables. Covers:
- Target format (node-platform-arch)
- Configuration options (scripts, assets)
- Compression (GZip, Brotli)
- File system access (snapshot vs real)
- Distribution and user instructions
- Limitations and workarounds

### 5. [Terminal Styling Libraries](./05-TERMINAL-STYLING.md)

Colors, ASCII art, and boxes. Covers:
- **Chalk** - Terminal colors and styles
- **Figlet** - ASCII art text generation
- **Boxen** - Terminal box drawing
- **cli-spinners** - Loading animations
- Combining libraries for fancy output

### 6. [State Management - GameStore](./06-STATE-MANAGEMENT.md)

Central game state. Covers:
- Architecture overview
- GameState structure
- Getters (player, inventory, progress, flags, stats)
- Mutations (updatePlayer, setFlag, etc.)
- Subscriptions and React integration
- Best practices

### 7. [File Persistence - SaveManager](./07-FILE-PERSISTENCE.md)

Save/load system. Covers:
- Save directory structure
- SaveSlot interface
- API reference (save, load, delete, listSlots)
- Auto-save system
- GameStore integration
- UI implementation patterns
- Error handling

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    THE BEGGARS SECT                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                    UI LAYER (Ink)                         │   │
│  │                                                           │   │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────────┐  │   │
│  │  │  Title  │  │ Combat  │  │  Story  │  │  Save/Load  │  │   │
│  │  │ Screen  │  │ Screen  │  │ Screen  │  │   Screen    │  │   │
│  │  └─────────┘  └─────────┘  └─────────┘  └─────────────┘  │   │
│  │         │           │           │              │          │   │
│  │         └───────────┼───────────┼──────────────┘          │   │
│  │                     │           │                         │   │
│  └─────────────────────┼───────────┼─────────────────────────┘   │
│                        │           │                             │
│  ┌─────────────────────┼───────────┼─────────────────────────┐   │
│  │                GAME LAYER                                  │   │
│  │                     │           │                          │   │
│  │  ┌──────────────────▼───────────▼──────────────────────┐  │   │
│  │  │               GameStore (Singleton)                  │  │   │
│  │  │  - Player state    - Flags       - Statistics        │  │   │
│  │  │  - Inventory       - Progress    - Relationships     │  │   │
│  │  └──────────────────────────────────────────────────────┘  │   │
│  │              │                              │               │   │
│  │  ┌───────────▼───────────┐    ┌────────────▼────────────┐  │   │
│  │  │    CombatEngine       │    │     StoryEngine         │  │   │
│  │  │  - ATB system         │    │  - Scene management     │  │   │
│  │  │  - AI controller      │    │  - Choice tracking      │  │   │
│  │  │  - Techniques         │    │  - Progression          │  │   │
│  │  └───────────────────────┘    └─────────────────────────┘  │   │
│  │                                                            │   │
│  └────────────────────────────────────────────────────────────┘   │
│                        │                                          │
│  ┌─────────────────────▼──────────────────────────────────────┐   │
│  │              PERSISTENCE LAYER                              │   │
│  │                                                             │   │
│  │  ┌─────────────────────────────────────────────────────┐   │   │
│  │  │              SaveManager                             │   │   │
│  │  │  - File I/O (~/.beggars-sect/saves/)                │   │   │
│  │  │  - Slot management                                   │   │   │
│  │  │  - Auto-save                                         │   │   │
│  │  └─────────────────────────────────────────────────────┘   │   │
│  │                                                             │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                    │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │                 BUILD & DISTRIBUTION                        │   │
│  │                                                             │   │
│  │  TypeScript ──► tsc ──► JavaScript ──► pkg ──► Executables │   │
│  │                                                             │   │
│  │  Targets: Windows (.exe), macOS, Linux                     │   │
│  └────────────────────────────────────────────────────────────┘   │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

---

## Tech Stack Summary

### Core

| Package | Purpose |
|---------|---------|
| `ink` | React-based terminal UI |
| `react` | Component library |
| `typescript` | Type-safe JavaScript |

### UI Components

| Package | Purpose |
|---------|---------|
| `ink-select-input` | Menu selection |
| `figlet` | ASCII art titles |
| `chalk` | Terminal colors |
| `boxen` | Terminal boxes |
| `cli-spinners` | Loading animations |

### Build Tools

| Package | Purpose |
|---------|---------|
| `tsc` | TypeScript compiler |
| `tsx` | TypeScript execution |
| `pkg` | Binary packaging |
| `esbuild` | Fast bundler |

### Development

| Package | Purpose |
|---------|---------|
| `eslint` | Code linting |
| `@typescript-eslint/*` | TS-specific linting |
| `@types/*` | Type definitions |

---

## Common Tasks

### Start Development

```bash
npm run dev
# Watches src/ and restarts on changes
```

### Build Project

```bash
npm run build
# Compiles TypeScript to dist/
```

### Create Executables

```bash
npm run package
# Creates Windows, macOS, Linux binaries in dist/
```

### Run Linter

```bash
npm run lint
# Checks code quality
```

---

## Resources

### Official Documentation

- [Ink](https://github.com/vadimdemedes/ink)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [pkg](https://github.com/vercel/pkg)

### Tutorials

- [Building CLIs with Ink](https://blog.logrocket.com/using-ink-ui-react-build-interactive-custom-clis/)
- [TypeScript for React](https://react-typescript-cheatsheet.netlify.app/)

---

**Last Updated:** 2025-12-06
