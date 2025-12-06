# CLI Game Development Research

**Created:** 2025-12-06
**Purpose:** Comprehensive research on CLI gaming, coding, and art techniques applicable to The Beggars Sect
**Status:** Reference Document

---

## Table of Contents

1. [CLI Gaming Landscape](#cli-gaming-landscape)
2. [Terminal UI Frameworks](#terminal-ui-frameworks)
3. [ASCII Art & Visual Effects](#ascii-art--visual-effects)
4. [Terminal Styling & Colors](#terminal-styling--colors)
5. [Combat System Design](#combat-system-design)
6. [Input Handling](#input-handling)
7. [Progress Indicators & Animations](#progress-indicators--animations)
8. [Procedural Generation](#procedural-generation)
9. [Save System Architecture](#save-system-architecture)
10. [Menu & Navigation Systems](#menu--navigation-systems)
11. [Dialogue & Narrative Systems](#dialogue--narrative-systems)
12. [Audio in CLI Games](#audio-in-cli-games)
13. [Wuxia/Martial Arts Games Reference](#wuxiamartial-arts-games-reference)
14. [Application to The Beggars Sect](#application-to-the-beggars-sect)
15. [Efficiency, Performance & Best Practices](#efficiency-performance--best-practices)
    - [TypeScript Performance](#typescript-performance--best-practices)
    - [React/Ink Optimization](#reactink-performance-optimization)
    - [Node.js Memory Management](#nodejs-performance--memory-management)
    - [Build & Bundle Optimization](#build--bundle-optimization)
    - [Terminal Rendering](#terminal-rendering-optimization)
    - [Debugging & Profiling](#debugging--profiling)
    - [Testing](#testing-for-performance)
16. [Resources & References](#resources--references)

---

## CLI Gaming Landscape

### Classic Roguelikes (Inspiration Sources)

| Game | Key Features | Relevance |
|------|--------------|-----------|
| **Dungeon Crawl Stone Soup** | Best UX of classic roguelikes, highly addictive | Study for UI/UX patterns |
| **Nethack** | 30+ years of development, deep systems | Complexity management |
| **Cataclysm: DDA** | Simulationist approach, vehicles | System depth reference |
| **Rogue** | Original @ character, procedural dungeons | Genre foundations |

### Modern Terminal Games

- **Terminal Chess** - Lichess integration, shows online play is possible
- **TerminalDungeon** - Fantasy turn-based action RPG
- **Slay the Spire-like CLI** - Deckbuilder mechanics in console
- **Umoria** - Classic Moria reimplementation (updated 2025)

### Interactive Fiction (Text Adventures)

Classic Infocom games played via **Frotz** demonstrate:
- Parser-based command input
- Rich narrative without graphics
- Environmental storytelling through text

**Key Insight:** The annual Interactive Fiction Competition shows continued community interest in text-based games.

---

## Terminal UI Frameworks

### Ink (Primary Framework - Already Using)

**Overview:** React for command-line apps. Uses Yoga for Flexbox layouts.

**Key Features:**
- Component-based architecture
- React reconciler for terminal rendering
- Full TypeScript support via `create-ink-app --typescript`
- Used by: Gatsby, GitHub Copilot, Prisma, Shopify, NYT

**Ecosystem:**
- **Ink UI** - Component library (alerts, inputs, lists)
- **Pastel** - Next.js-like framework for CLI apps
- **ink-select-input** - Selection menus (already using)

**Games Built with Ink:**
- Sudoku game
- Sea Trader (Taipan!-inspired trading simulator)

### Alternative: Blessed (curses-like)

**Overview:** 16,000+ lines of terminal goodness, reimplements ncurses in pure JS.

**Key Features:**
- Painter's algorithm rendering (only draws changes)
- DOM-like widget API
- CSS-like element styling
- Parent-child system with relative positioning

**Related Libraries:**
- **neo-blessed** - Maintained fork
- **blessed-contrib** - Dashboard widgets, graphs, ASCII art

**When to Use:** If Ink limitations become apparent, blessed offers lower-level control.

### terminal-kit

**Overview:** Full-featured terminal library.

**Features:**
- 256 colors
- Keys & mouse handling
- Input fields
- Progress bars
- Screen buffer (32-bit composition, image loading)
- Text buffer
- No ncurses dependency

**Unique:** `slowTyping` method for typewriter effects.

---

## ASCII Art & Visual Effects

### How Terminal Animations Work

**Basic Mechanism:**
- Terminals render markup via control characters and ANSI escape codes
- Carriage Return (`\r`) moves cursor to left margin for overwriting
- `tput cup 4 50` or `printf '\x1B[4;50H'` positions cursor at line 4, column 50

**History:** VT100 animations (1970) - text with cursor movement instructions, character deletion/insertion for animation effect.

### Tools & Libraries

#### figlet (Already Using)

**Purpose:** ASCII art text banners from FIGfont spec.

**Key Options:**
- `horizontalLayout`: "default", "full", "fitted", "controlled smushing", "universal smushing"
- Recent additions: Toilet fonts, Terrace, Wavescape fonts
- NPX support: `npx figlet "The Beggars Sect"`

**Related:**
- **figlet-cli** - Command line interface
- **asciify** - Alternative with similar features
- **ascii-art** - Images, fonts, tables, compositing

#### TerminalTextEffects (Python - For Reference)

While Python-based, offers inspiration:
- "Decrypt" effect with print head revealing characters
- No third-party modules required
- Standard ANSI sequences

### Asciiville Collection

Nearly 1,000 works of ASCII/ANSI art available for reference/inspiration.

### Animation Techniques for Games

1. **Frame-based Animation**
   - Store multiple ASCII frames
   - Display with timed delays
   - Clear and redraw approach

2. **Character-by-Character Reveal**
   - Typewriter effect for dialogue
   - Combat action descriptions
   - Technique name reveals

3. **Progressive Drawing**
   - Build up complex art piece by piece
   - Use for dramatic moments (boss reveals, story beats)

### Application Ideas

```
Combat Hit Animation (3 frames):

Frame 1:    Frame 2:    Frame 3:
  \O/         \O/         \O/
   |    -->    |*   -->    |
  / \         / \         / \

Enemy takes damage - star appears, then fades
```

---

## Terminal Styling & Colors

### Chalk (Already Using)

**Capabilities:**
- Composable API (chain styles)
- 16 standard colors + bright variants
- 256 colors
- Truecolor (16 million colors)
- Styles: bold, underline, inverse, dim, italic, hidden, strikethrough
- Background colors

**Usage Pattern:**
```typescript
chalk.red.bold('CRITICAL HIT!')
chalk.cyan.dim('Li Wei assumes Flowing Stance...')
chalk.yellow.bgBlack(' CHI: 15/20 ')
```

### ANSI Escape Codes (Low-Level Reference)

**Color Codes:**
- `\x1b[31m` - Red foreground
- `\033[38;2;<r>;<g>;<b>m` - RGB foreground (truecolor)
- `\033[48;2;<r>;<g>;<b>m` - RGB background

**Environment Variables:**
- `FORCE_COLOR=1` - 16 colors
- `FORCE_COLOR=2` - 256 colors
- `FORCE_COLOR=3` - Truecolor

### ansi-styles (Underlying Library)

Conversion utilities:
- RGB to 256 color
- RGB to 16 million color
- Automatic fallback: Truecolor → 256 → 16 → none

### Color Scheme Recommendations

| Element | Color | Style |
|---------|-------|-------|
| Player name | Green | Bold |
| Enemy name | Red | Normal |
| Technique names | Cyan | Normal |
| Chi values | Blue | Normal |
| Damage numbers | Yellow | Bold |
| Critical hits | Red | Bold + Inverse |
| Healing | Green | Normal |
| Status effects | Magenta | Dim |
| Narrator | White | Dim/Italic |
| Player choice | White | Bold |

---

## Combat System Design

### Turn-Based System Types

**ATB (Active Time Battle) - Current Implementation:**
- DEX-based turn order
- Speed modifiers on techniques
- Dynamic turn queue preview (7 turns)

### Making Text Combat Engaging

**Key Techniques:**

1. **Varied Action Phrases**
   - Don't repeat "Li Wei attacks"
   - Pool of phrases per weapon/technique
   - Makes combat feel dynamic

2. **"Threatened" Mechanic**
   - Certain positions prevent some actions
   - Creates tactical depth
   - Example: Can't heal if enemy is "pressing"

3. **Speed/Turn Order Manipulation**
   - Buffs/debuffs that affect turn order
   - Creates strategic decisions
   - Status effects change turn priority

4. **Descriptive Feedback**
   - "Li Wei feels dizzy" instead of "HP: 45/100"
   - Let players estimate health
   - More immersive

5. **Spatial Elements**
   - Even simple positioning increases depth
   - Distance affects technique availability
   - Flanking bonuses

### Balancing Guidelines

**Power Values:**
- Attack: 2 per point
- Bleed DoT: 1.5 per point
- Unique effects: Qualitative assessment

**Balance Formula:**
```
Technique_Value = (Damage * 2) + (Effect_Value * Duration) - (Chi_Cost * 1.5)
```

---

## Input Handling

### Node.js readline (Native)

**Basic Keypress Pattern:**
```typescript
import readline from 'readline';

readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) {
  process.stdin.setRawMode(true);
}

process.stdin.on('keypress', (str, key) => {
  if (key.name === 'up') { /* navigate up */ }
  if (key.name === 'down') { /* navigate down */ }
  if (key.name === 'return') { /* select */ }
  if (key.ctrl && key.name === 'c') { process.exit(); }
});
```

**Key Points:**
- `setRawMode(true)` - Capture characters one-by-one
- Access to modifier keys (ctrl, shift, alt)
- Works with arrow keys

### With Ink (Current Approach)

Ink handles input internally via `useInput` hook and `ink-select-input` component.

**Custom Keybindings (Future Enhancement):**
```typescript
import { useInput } from 'ink';

useInput((input, key) => {
  if (input === 'q') { /* quit */ }
  if (key.escape) { /* back */ }
});
```

---

## Progress Indicators & Animations

### Spinners

**ora (Recommended):**
- Elegant single spinner
- 70+ spinner styles via cli-spinners
- Promise-aware

**cli-spinners:**
- JSON-based spinner definitions
- `interval` + `frames` structure
- Easy to create custom spinners

**Use Cases in Game:**
- "Meditating..." during chi recovery
- "Training..." during technique practice
- Loading save files

### Progress Bars

**cli-progress:**
- Highly customizable
- Supports colors
- Multiple bar formats

**Application Ideas:**
- Chi bar visualization
- Health bar (alternative to numeric)
- Mastery progress toward next level

### Custom Animation Example

```typescript
// Breathing animation for meditation
const breatheFrames = ['    .    ', '   ...   ', '  .....  ', ' ....... ', '.........'];
```

---

## Procedural Generation

### Dungeon Generation Algorithms

| Algorithm | Description | Best For |
|-----------|-------------|----------|
| **BSP Trees** | Binary space partitioning, no overlap | Rectangular rooms, corridors |
| **Cellular Automata** | Natural cave formations | Organic spaces, caves |
| **Tunneling** | Start center, extend in directions | Connected room networks |
| **Drunkard's Walk** | Random wandering | Cave-like, open spaces |
| **Delaunay + MST** | Graph-based room placement | Controlled connectivity |

### Key Considerations

- **Validation:** Spanning tree to ensure all rooms connected
- **Two Approaches:**
  1. Rooms first, then corridors
  2. Maze first, then unify sections

### Application to Beggars Sect

While not a dungeon crawler, these techniques apply to:
- Procedural encounter generation
- Random event placement in story
- Enemy variation algorithms

---

## Save System Architecture

### node-persist (Recommended)

**Concept:** HTML5 localStorage API for Node.js, file-based.

**Features:**
- No database needed
- JSON documents in filesystem
- Fast (no network overhead)
- Simple API

**Current Implementation:** Already using JSON-based save with `fs` module.

### Best Practices

1. **Save Data Structure:**
   ```typescript
   interface SaveData {
     version: string;          // For migration
     player: PlayerState;
     progress: StoryProgress;
     stats: GameStats;
     settings: UserSettings;
     timestamp: number;
   }
   ```

2. **Auto-save Triggers:**
   - After combat
   - After story beat
   - Before major choices
   - On quit

3. **Multiple Slots:**
   - Already implemented (3 slots + auto)
   - Allow slot naming

4. **Corruption Prevention:**
   - Write to temp file first
   - Rename on success
   - Keep one backup

---

## Menu & Navigation Systems

### Libraries

| Library | Key Feature | Notes |
|---------|-------------|-------|
| **cli-select** | Simple up/down + enter | Currently using via ink-select-input |
| **console-menu** | Hotkeys + scrolling | PageUp/Down/Home/End support |
| **terminal-menu** | Vi/Emacs bindings | j/k, C-n/C-p navigation |
| **terminal-kit** | Full-featured | Mouse support, input fields |

### Design Patterns

1. **Hotkey Prefixes:**
   ```
   [A] Attack
   [D] Defend
   [T] Technique
   [I] Item
   ```

2. **Scrollable Lists:**
   - Show /\ and \/ indicators when content exceeds view
   - Display current position (e.g., "3/10")

3. **Breadcrumb Navigation:**
   ```
   Main Menu > Combat > Techniques > Flowing Stance
   ```

### Current Implementation Status

Already using Ink components for menus. Consider adding:
- Hotkey support for faster navigation
- Visual indicators for disabled options
- Contextual help text

---

## Dialogue & Narrative Systems

### Design Patterns

#### 1. Binary Tree (Simple Branching)
Each choice leads to two more choices. Exponential growth.

#### 2. Hub-and-Spokes (Information Gathering)
- Central "hub" with multiple topics
- Explore topics in any order
- Return to hub after each topic
- Visual differentiation (Witcher 3 style: yellow advances, white explores)

#### 3. Critical Path Structure
- Core story beats that EVERY player sees
- Branches return to critical path
- Ensures narrative coherence

### Technical Implementation

**Components:**
- **Nodes:** Individual dialogue lines/exchanges
- **Branches:** Connections between nodes
- **Conditions:** Logic affecting available paths
- **Flags:** Track player choices for future reference

**Current Story Engine:**
- Already implements branching via StoryEngine
- Uses scene-based structure
- Path points (Blade/Stream/Shadow) track alignment

### Tools for Design

- **Twine** - Visual dialogue tree editor
- **Inkle** - Narrative scripting
- **Articy** - Professional game writing tool

### Best Practices

1. **Meaningful Choices:**
   - Each option has distinct consequences
   - Avoid "illusion of choice"

2. **Character Consistency:**
   - NPC responses match their personality
   - Player choices affect relationships

3. **Scope Management:**
   - Options^Branches = Total nodes
   - More branches = fewer options per node

---

## Audio in CLI Games

### Terminal Beep (Simple)

**Methods:**
```bash
echo -ne '\a'       # Bell character
printf '\a'         # Alternative
echo $'\a'          # Bash syntax
```

**Limitations:** May be disabled on modern systems.

### beep Command

```bash
beep -f 440 -l 500   # 440Hz for 500ms
```

Can create simple melodies with frequency, duration, repetition.

### SoX (Sound eXchange)

```bash
play -q -n synth 0.1 sin 880   # Generate 880Hz tone
```

More control over synthesized sounds.

### Node.js Audio

**Options:**
- `node-speaker` - Audio output
- `node-wav` - WAV file handling
- `play-sound` - Cross-platform audio playback

### Practical Approach for Beggars Sect

1. **Optional Audio:**
   - Don't require audio
   - Enhance experience when available

2. **Simple Sound Effects:**
   - Combat hit: Short beep
   - Critical: Higher pitch
   - Level up: Ascending tones
   - Menu select: Click sound

3. **Terminal Bell for Alerts:**
   - Low health warning
   - Important story moments

---

## Wuxia/Martial Arts Games Reference

### Text-Based Wuxia Games

| Game | Platform | Features |
|------|----------|----------|
| **Path of Martial Arts** | Web (ChoiceScript) | 805k words, xianxia-inspired |
| **Wuxia Logs** | Browser | Tactical combat, immersive choices |
| **Xianxia Simulator** | Browser | Life-simulation, cultivation |
| **Mystic Samsara** | itch.io | Wuxia text adventure |

### Key Elements

**From Early Wuxia Games:**
- Parser-based commands
- Character progression (qi, neili, martial arts)
- Moral choice systems
- Sect politics
- Training sequences

**StoryZone's Wuxia:**
- AI-powered storytelling
- Jianghu (martial arts world) setting
- Wandering heroes, assassins, sect masters

### Themes to Incorporate

1. **Jianghu Politics:**
   - Sect relationships
   - Honor codes
   - Hidden masters

2. **Cultivation Systems:**
   - Chi development
   - Technique mastery
   - Internal vs external martial arts

3. **Wuxia Tropes:**
   - Master/student relationships
   - Revenge narratives
   - Tournament arcs
   - Secret manuals

---

## Application to The Beggars Sect

### Current Stack (Already Implemented)

| Tool | Purpose | Status |
|------|---------|--------|
| Ink | UI framework | In use |
| React | Component architecture | In use |
| TypeScript | Type safety | In use |
| chalk | Terminal colors | In use |
| figlet | ASCII banners | In use |
| boxen | Box drawing | In use |
| ink-select-input | Menus | In use |

### Enhancement Opportunities

#### 1. Visual Polish

**ASCII Art Moments:**
- Technique learning reveals
- Boss encounter introductions
- Chapter title cards
- Ending sequences

**Combat Animations:**
```
┌─────────────────────────────────────┐
│  Li Wei                     Enemy   │
│  ████████░░  HP    ██████░░░░  HP   │
│  ██████████  CHI                    │
│                                     │
│  [Flowing Palm strikes true!]       │
│           >>>---★--->               │
│  [Enemy staggers back... -24 HP]    │
└─────────────────────────────────────┘
```

#### 2. Typewriter Effect for Dialogue

```typescript
async function typewrite(text: string, delay = 30) {
  for (const char of text) {
    process.stdout.write(char);
    await sleep(delay);
  }
  console.log();
}

// Usage in story scenes
await typewrite("The ancient master regards you with knowing eyes...");
```

#### 3. Dynamic Health Bars

```typescript
function renderHealthBar(current: number, max: number, width = 20): string {
  const filled = Math.round((current / max) * width);
  const empty = width - filled;
  const color = current > max * 0.5 ? chalk.green :
                current > max * 0.25 ? chalk.yellow : chalk.red;
  return color('█'.repeat(filled)) + chalk.gray('░'.repeat(empty));
}
```

#### 4. Stance Visual Indicators

```
┌─ Flowing Stance ─┐    ┌─ Weathered Stance ─┐    ┌─ Hungry Stance ─┐
│      ~~~~~       │    │      ╔═══╗         │    │      >>>        │
│    ~~~│~~~       │    │      ║   ║         │    │     >/│\>       │
│     ~~│~~        │    │    ══╩═══╩══       │    │      / \        │
│      / \         │    │      / \           │    │      >>>        │
└──────────────────┘    └────────────────────┘    └──────────────────┘
     +DEX, +CHI              +END, +DEF              +STR, +CRIT
```

#### 5. Combat Log Styling

```typescript
function formatCombatAction(action: CombatAction): string {
  const techniqueColor = chalk.cyan;
  const damageColor = action.critical ? chalk.red.bold : chalk.yellow;
  const hitIndicator = action.critical ? '★ CRITICAL ★' : '';

  return `${chalk.green('Li Wei')} uses ${techniqueColor(action.technique)}! ` +
         `${damageColor(`${action.damage} damage`)} ${hitIndicator}`;
}
```

#### 6. Meditation/Training Screens

```
╔══════════════════════════════════════════════════════════════╗
║                     ~ MEDITATION ~                            ║
║                                                               ║
║                         ◇                                     ║
║                        ╱│╲                                    ║
║                       ╱ │ ╲                                   ║
║                      ╱  │  ╲                                  ║
║                     ◇───┼───◇                                 ║
║                          │                                    ║
║                                                               ║
║                  Chi flows through you...                     ║
║                                                               ║
║                  [████████░░] 80% Complete                    ║
╚══════════════════════════════════════════════════════════════╝
```

### Recommended Enhancements Priority

| Priority | Enhancement | Effort | Impact |
|----------|-------------|--------|--------|
| 1 | Typewriter effect for story | Low | High |
| 2 | Visual health/chi bars | Low | Medium |
| 3 | Combat action animations | Medium | High |
| 4 | Technique learning ASCII art | Medium | High |
| 5 | Stance visual indicators | Low | Medium |
| 6 | Sound effects (optional) | High | Low |
| 7 | Procedural encounter variation | High | Medium |

### Future Considerations

1. **blessed Migration:**
   - If Ink limitations become blocking
   - More control over screen regions
   - Lower-level terminal access

2. **Mouse Support:**
   - terminal-kit offers this
   - Could enhance menu navigation
   - Not essential for core experience

3. **Multiplayer/Online:**
   - Terminal Chess shows it's possible
   - Could add leaderboards
   - Shared save cloud sync

---

## Efficiency, Performance & Best Practices

This section provides detailed guidance on writing efficient, performant code for The Beggars Sect using our tech stack (TypeScript, React/Ink, Node.js).

---

### TypeScript Performance & Best Practices

#### Strict Mode Configuration

Enable strict mode for better type safety and catch bugs early:

```json
// tsconfig.json - Recommended strict settings
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "useUnknownInCatchVariables": true,

    // Additional strict options (beyond strict: true)
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

#### Interface vs Type Performance

**Use `interface extends` over `type` with `&` intersections:**

```typescript
// FASTER - TypeScript caches interface relationships
interface Character {
  name: string;
  hp: number;
}

interface Player extends Character {
  chi: number;
  techniques: Technique[];
}

// SLOWER - TypeScript re-evaluates intersections each time
type Character = {
  name: string;
  hp: number;
};

type Player = Character & {
  chi: number;
  techniques: Technique[];
};
```

**Why:** TypeScript caches interface relationships by name. Intersections must be computed every time they're used.

**Rule of thumb:**
- Use `interface` for object shapes that will be extended
- Use `type` for unions, mapped types, and complex type manipulations

#### Compilation Performance Tips

1. **Use Project References for large codebases:**
   ```json
   {
     "references": [
       { "path": "./src/game" },
       { "path": "./src/ui" }
     ]
   }
   ```

2. **Enable incremental builds:**
   ```json
   {
     "compilerOptions": {
       "incremental": true,
       "tsBuildInfoFile": "./.tsbuildinfo"
     }
   }
   ```

3. **Avoid deeply nested conditional types** - they slow down type checking significantly.

4. **Use explicit return types on exported functions** - helps TypeScript avoid inferring complex types.

---

### React/Ink Performance Optimization

#### Avoiding Unnecessary Re-renders

**1. Use `React.memo` for pure components:**

```typescript
import React, { memo } from 'react';
import { Text } from 'ink';

interface HealthBarProps {
  current: number;
  max: number;
}

// Only re-renders when props actually change
const HealthBar = memo(({ current, max }: HealthBarProps) => {
  const percentage = Math.round((current / max) * 100);
  return <Text>HP: {percentage}%</Text>;
});
```

**2. Use `useCallback` for event handlers passed to children:**

```typescript
import { useCallback, useState } from 'react';

function CombatScreen() {
  const [selectedAction, setSelectedAction] = useState(0);

  // Memoized - won't cause child re-renders
  const handleSelect = useCallback((index: number) => {
    setSelectedAction(index);
  }, []); // Empty deps = stable reference

  return <ActionMenu onSelect={handleSelect} />;
}
```

**3. Use `useMemo` for expensive calculations:**

```typescript
import { useMemo } from 'react';

function TurnQueue({ combatants }: { combatants: Combatant[] }) {
  // Only recalculated when combatants change
  const sortedQueue = useMemo(() => {
    return [...combatants].sort((a, b) => b.speed - a.speed);
  }, [combatants]);

  return <QueueDisplay queue={sortedQueue} />;
}
```

#### When NOT to Use Memoization

Don't use `useMemo`/`useCallback` for:
- Simple calculations (e.g., `x + y`)
- Values that change every render anyway
- Components that render quickly already

**Rule:** Profile first, optimize second. Premature memoization adds complexity.

#### Ink-Specific Optimizations

**1. Use `<Static>` for content that doesn't change:**

```typescript
import { Static, Text } from 'ink';

function GameLog({ entries }: { entries: string[] }) {
  return (
    <Static items={entries}>
      {(entry, index) => <Text key={index}>{entry}</Text>}
    </Static>
  );
}
```

`<Static>` is optimized for append-only content and prevents re-renders of existing items.

**2. Batch state updates:**

```typescript
// BAD - Three separate re-renders
setHealth(newHealth);
setChi(newChi);
setStatus(newStatus);

// GOOD - Single re-render (React 18+ batches automatically)
// For older React or explicit batching:
import { unstable_batchedUpdates } from 'react-dom';

unstable_batchedUpdates(() => {
  setHealth(newHealth);
  setChi(newChi);
  setStatus(newStatus);
});
```

**3. Keep state as close to components as possible:**

```typescript
// BAD - Global state for local concern
const globalStore = {
  combatMenuIndex: 0, // Only used in CombatMenu
};

// GOOD - Local state in component
function CombatMenu() {
  const [menuIndex, setMenuIndex] = useState(0);
  // ...
}
```

---

### Node.js Performance & Memory Management

#### Memory Best Practices

**1. Avoid memory leaks - clean up event listeners:**

```typescript
class CombatEngine {
  private handlers: Map<string, () => void> = new Map();

  start() {
    const handler = () => this.onTick();
    process.on('tick', handler);
    this.handlers.set('tick', handler);
  }

  // IMPORTANT: Always clean up!
  destroy() {
    for (const [event, handler] of this.handlers) {
      process.removeListener(event, handler);
    }
    this.handlers.clear();
  }
}
```

**2. Use WeakMap/WeakSet for caches that should be garbage collected:**

```typescript
// Cache that doesn't prevent garbage collection
const techniqueCache = new WeakMap<Character, Technique[]>();

function getTechniques(character: Character): Technique[] {
  if (!techniqueCache.has(character)) {
    techniqueCache.set(character, calculateTechniques(character));
  }
  return techniqueCache.get(character)!;
}
```

**3. Object pooling for frequently created objects:**

```typescript
class DamageNumberPool {
  private pool: DamageNumber[] = [];

  acquire(): DamageNumber {
    return this.pool.pop() || new DamageNumber();
  }

  release(obj: DamageNumber) {
    obj.reset();
    this.pool.push(obj);
  }
}
```

#### Async/Await Best Practices

**1. Use `Promise.all` for parallel operations:**

```typescript
// BAD - Sequential (slow)
const player = await loadPlayer();
const enemies = await loadEnemies();
const scene = await loadScene();

// GOOD - Parallel (fast)
const [player, enemies, scene] = await Promise.all([
  loadPlayer(),
  loadEnemies(),
  loadScene()
]);
```

**2. Don't block the event loop:**

```typescript
// BAD - Blocks event loop
function heavyCalculation(data: number[]): number {
  return data.reduce((sum, n) => sum + expensiveOp(n), 0);
}

// GOOD - Yield to event loop periodically
async function heavyCalculation(data: number[]): Promise<number> {
  let sum = 0;
  for (let i = 0; i < data.length; i++) {
    sum += expensiveOp(data[i]);
    if (i % 1000 === 0) {
      await new Promise(resolve => setImmediate(resolve));
    }
  }
  return sum;
}
```

**3. For CPU-intensive work, use Worker Threads:**

```typescript
import { Worker, isMainThread, parentPort } from 'worker_threads';

if (isMainThread) {
  const worker = new Worker('./heavy-worker.js');
  worker.postMessage({ type: 'calculate', data: [...] });
  worker.on('message', (result) => {
    console.log('Result:', result);
  });
}
```

---

### Build & Bundle Optimization

#### esbuild Configuration

```typescript
// build.ts
import * as esbuild from 'esbuild';

await esbuild.build({
  entryPoints: ['src/index.tsx'],
  bundle: true,
  platform: 'node',
  target: 'node18',
  outfile: 'dist/index.js',
  format: 'esm',

  // Production optimizations
  minify: true,
  treeShaking: true,

  // Source maps for debugging
  sourcemap: true,

  // External packages (don't bundle)
  external: ['ink', 'react'],
});
```

**Key flags:**
- `bundle: true` - Single output file
- `minify: true` - Reduces file size
- `treeShaking: true` - Removes unused code
- `platform: 'node'` - Optimizes for Node.js

#### SEA (Single Executable Application) Optimization

```json
// sea-config.json
{
  "main": "dist/index.js",
  "output": "sea-prep.blob",
  "disableExperimentalSEAWarning": true,
  "useCodeCache": true  // KEY: Improves startup time
}
```

**`useCodeCache: true`** pre-compiles JavaScript to V8 code cache, significantly improving startup time.

---

### JSON & File I/O Performance

#### For Game Saves (Small Files)

```typescript
import { readFileSync, writeFileSync } from 'fs';

// Synchronous is fine for small save files (<1MB)
function saveGame(data: SaveData, slot: number): void {
  const path = `saves/slot${slot}.json`;
  const json = JSON.stringify(data, null, 2);
  writeFileSync(path, json, 'utf-8');
}

function loadGame(slot: number): SaveData {
  const path = `saves/slot${slot}.json`;
  const json = readFileSync(path, 'utf-8');
  return JSON.parse(json);
}
```

#### Safe Save Pattern (Corruption Prevention)

```typescript
import { writeFileSync, renameSync, existsSync, copyFileSync } from 'fs';

function safeSave(data: SaveData, path: string): void {
  const tempPath = `${path}.tmp`;
  const backupPath = `${path}.bak`;

  // 1. Write to temp file
  writeFileSync(tempPath, JSON.stringify(data), 'utf-8');

  // 2. Backup existing save
  if (existsSync(path)) {
    copyFileSync(path, backupPath);
  }

  // 3. Atomic rename (safe on most filesystems)
  renameSync(tempPath, path);
}
```

#### For Large Data Files (If Needed)

```typescript
import { createReadStream } from 'fs';
import { chain } from 'stream-chain';
import { parser } from 'stream-json';
import { pick } from 'stream-json/filters/Pick';
import { streamArray } from 'stream-json/streamers/StreamArray';

// Stream large JSON files to avoid memory issues
async function processLargeFile(path: string): Promise<void> {
  const pipeline = chain([
    createReadStream(path),
    parser(),
    pick({ filter: 'data' }),
    streamArray(),
  ]);

  for await (const { value } of pipeline) {
    processItem(value);
  }
}
```

---

### Terminal Rendering Optimization

#### Minimize ANSI Escape Code Usage

```typescript
// BAD - Emits escape code every character
for (const char of text) {
  process.stdout.write(chalk.red(char));
}

// GOOD - Single escape code for whole string
process.stdout.write(chalk.red(text));
```

#### Track Color State to Avoid Redundant Codes

```typescript
class ColoredOutput {
  private lastColor: string | null = null;

  write(text: string, color: string): void {
    if (color !== this.lastColor) {
      process.stdout.write(getAnsiCode(color));
      this.lastColor = color;
    }
    process.stdout.write(text);
  }

  reset(): void {
    process.stdout.write('\x1b[0m');
    this.lastColor = null;
  }
}
```

#### Buffer Output for Batch Updates

```typescript
class RenderBuffer {
  private buffer: string[] = [];

  write(text: string): void {
    this.buffer.push(text);
  }

  flush(): void {
    // Single write operation
    process.stdout.write(this.buffer.join(''));
    this.buffer = [];
  }
}
```

---

### ESLint Configuration for Performance

```javascript
// eslint.config.mjs
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    rules: {
      // Disable rules that TypeScript already handles
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'error',

      // Performance-focused rules
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-misused-promises': 'error',

      // Avoid slow rules
      // 'import/no-unresolved': 'off', // TypeScript handles this
    },
  }
);
```

**Avoid these slow ESLint rules:**
- `@stylistic/ts/indent` - Use Prettier instead
- `eslint-plugin-prettier` - Run Prettier separately
- `import/extensions` - Resolves modules on disk

---

### Debugging & Profiling

#### Chrome DevTools for Node.js

```bash
# Start with inspector
node --inspect dist/index.js

# Start with inspector, break on first line
node --inspect-brk dist/index.js
```

Then open `chrome://inspect` in Chrome.

#### CPU Profiling

```bash
# Generate CPU profile
node --cpu-prof dist/index.js

# Profile will be saved as CPU.*.cpuprofile
# Load in Chrome DevTools Performance tab
```

#### Memory Profiling

```bash
# Generate heap snapshot on exit
node --heap-prof dist/index.js

# Take heap snapshot programmatically
const v8 = require('v8');
const fs = require('fs');

const snapshot = v8.writeHeapSnapshot();
console.log(`Heap snapshot written to ${snapshot}`);
```

#### Garbage Collection Tracing

```bash
# See GC activity
node --trace-gc dist/index.js

# Expose manual GC (for debugging only!)
node --expose-gc dist/index.js
```

---

### Testing for Performance

#### Vitest Configuration

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
});
```

#### Performance Testing Pattern

```typescript
import { describe, it, expect } from 'vitest';

describe('Combat Engine Performance', () => {
  it('should process 1000 turns in under 100ms', () => {
    const engine = new CombatEngine();

    const start = performance.now();
    for (let i = 0; i < 1000; i++) {
      engine.processTurn();
    }
    const duration = performance.now() - start;

    expect(duration).toBeLessThan(100);
  });
});
```

---

### Project Structure Best Practices

```
src/
├── index.tsx              # Entry point
├── game/
│   ├── combat/
│   │   ├── index.ts       # Public exports
│   │   ├── CombatEngine.ts
│   │   ├── TurnQueue.ts
│   │   └── types.ts       # Combat-specific types
│   ├── story/
│   │   ├── index.ts
│   │   ├── StoryEngine.ts
│   │   └── types.ts
│   └── state/
│       ├── index.ts
│       ├── GameStore.ts
│       └── SaveManager.ts
├── ui/
│   ├── combat/
│   │   ├── index.ts
│   │   ├── CombatScreen.tsx
│   │   └── HealthBar.tsx
│   └── story/
│       ├── index.ts
│       └── StoryScreen.tsx
├── types/
│   ├── index.ts           # Re-exports all types
│   ├── character.ts
│   ├── combat.ts
│   └── story.ts
└── utils/
    ├── index.ts
    └── helpers.ts
```

**Key Principles:**
1. **Feature-first organization** - Group by domain, not by file type
2. **Barrel exports** (`index.ts`) - Clean import paths
3. **Types near usage** - Domain types in domain folders
4. **Shared types separate** - Cross-cutting types in `/types`

---

### Performance Checklist

Before shipping, verify:

- [ ] `strict: true` enabled in tsconfig.json
- [ ] No `any` types in codebase
- [ ] All async functions have error handling
- [ ] Event listeners are cleaned up
- [ ] Large objects aren't held in memory unnecessarily
- [ ] React components use memoization where beneficial
- [ ] Build is minified and tree-shaken
- [ ] SEA uses `useCodeCache: true`
- [ ] Save system uses safe write pattern
- [ ] No console.log in production code

---

### Quick Reference: Performance Patterns

| Situation | Solution |
|-----------|----------|
| Slow component re-renders | `React.memo`, `useCallback`, `useMemo` |
| Memory leaks | Clean up event listeners, use WeakMap |
| Slow builds | Incremental compilation, project references |
| Large bundle size | Tree shaking, code splitting |
| Slow startup | SEA with `useCodeCache: true` |
| Blocking operations | Async/await, Worker Threads |
| Interface vs Type | Use `interface extends` for better performance |
| Many ANSI codes | Buffer output, track color state |

---

## Resources & References

### Documentation

- [Ink GitHub](https://github.com/vadimdemedes/ink)
- [Blessed GitHub](https://github.com/chjj/blessed)
- [terminal-kit GitHub](https://github.com/cronvel/terminal-kit)
- [chalk GitHub](https://github.com/chalk/chalk)
- [figlet npm](https://www.npmjs.com/package/figlet)

### Tutorials

- [Introduction to Ink v3.2.0](https://developerlife.com/2021/11/04/introduction-to-ink-v3/)
- [Advanced Ink Guide](https://developerlife.com/2021/11/05/ink-v3-advanced/)
- [Roguelike Tutorials](https://rogueliketutorials.com/)
- [Rooms and Mazes Algorithm](https://journal.stuffwithstuff.com/2014/12/21/rooms-and-mazes/)

### Game Design

- [12 Ways to Improve Turn-Based RPG Combat](https://sinisterdesign.net/12-ways-to-improve-turn-based-rpg-combat-systems/)
- [How to Write Branching Dialogue](https://www.helika.io/how-to-write-branching-dialogue-systems-in-games/)
- [Defining Dialogue Systems](https://www.gamedeveloper.com/design/defining-dialogue-systems)
- [Dungeon Generation Algorithms](http://pcg.wikidot.com/pcg-algorithm:dungeon-generation)

### Inspiration

- [Best CLI Terminal Games](https://linuxconfig.org/best-terminal-games-on-linux)
- [itch.io CLI Roguelikes](https://itch.io/games/tag-command-line/tag-roguelike)
- [Wuxia Games Reference](https://wuxiasociety.com/wuxia-in-games)
- [Path of Martial Arts IF](https://nickydicky.itch.io/path-of-martial-arts-if)

---

## Changelog

| Date | Changes |
|------|---------|
| 2025-12-06 | Initial research compilation |
| 2025-12-06 | Added comprehensive Efficiency, Performance & Best Practices section |

---

**This document serves as a living reference for CLI game development techniques. Update as new tools and techniques are discovered.**
