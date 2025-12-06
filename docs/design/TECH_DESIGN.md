# Technical Design Document

**Project:** The Beggars Sect: Li Wei's Ascension
**Version:** 2.0
**Last Updated:** 2025-12-06
**Status:** IMPLEMENTED - v0.2.0 playable build released

---

## Overview

This document defines the technical architecture for The Beggars Sect CLI RPG. It reflects the actual implemented codebase (v0.2.0).

**Tech Stack (Implemented):**
- Node.js >=20.0.0
- TypeScript 5.x
- Ink 3.x (React for CLI) - using Ink 3 for better stability
- React 18.x
- pkg (for standalone executables)

**Build Outputs:**
- Windows: 79 MB executable
- macOS: 92 MB executable
- Linux: 87 MB executable

---

## Project Structure (Actual)

```
the-beggars-sect/
├── docs/                           # Design documentation
│   ├── design/                     # GAME_DESIGN.md, TECH_DESIGN.md
│   ├── systems/                    # COMBAT_SYSTEM.md, TECHNIQUES.md, ENEMIES.md
│   ├── story/                      # Chapter scripts
│   ├── lore/                       # Worldbuilding documents
│   ├── planning/                   # TODO, progress tracking
│   ├── reference/                  # FORMULAS.md
│   └── dev/                        # CODE_REVIEW.md, GUIDELINES.md
│
├── src/
│   ├── index.tsx                   # Entry point, renders App
│   ├── App.tsx                     # Root component, screen routing
│   │
│   ├── game/                       # Core game logic (~4,200 lines)
│   │   ├── combat/
│   │   │   ├── CombatEngine.ts     # ATB system, turn management, effect processing
│   │   │   ├── AIController.ts     # Pattern-based AI, condition evaluation
│   │   │   └── TechniqueRegistry.ts # 55+ technique definitions
│   │   │
│   │   ├── factories/
│   │   │   └── CharacterFactory.ts # Creates player, enemies, bosses
│   │   │
│   │   ├── story/
│   │   │   └── StoryEngine.ts      # Non-linear narrative, choice handling
│   │   │
│   │   ├── save/
│   │   │   └── SaveManager.ts      # File persistence, auto-save
│   │   │
│   │   └── game.ts                 # Main game loop, state coordination
│   │
│   ├── ui/                         # Ink components (~1,866 lines)
│   │   ├── screens/
│   │   │   ├── MainMenu.tsx        # Title, load, new game
│   │   │   ├── CombatScreen.tsx    # Battle UI
│   │   │   ├── StoryScreen.tsx     # Dialogue, choices
│   │   │   └── CharacterScreen.tsx # Stats, techniques
│   │   │
│   │   └── components/
│   │       ├── HealthBar.tsx       # HP/Chi display
│   │       ├── ActionMenu.tsx      # Combat actions
│   │       └── TechniqueList.tsx   # Technique selection
│   │
│   ├── types/                      # TypeScript definitions (~1,457 lines)
│   │   ├── character.ts            # Character, Enemy, Stats, StatusEffect
│   │   ├── combat.ts               # CombatState, CombatAction, ActionResult
│   │   ├── technique.ts            # Technique, TechniqueEffect, ComboRole
│   │   ├── story.ts                # Scene, Choice, Consequence
│   │   └── index.ts                # Re-exports
│   │
│   └── data/                       # Static content
│       └── story/                  # Story scenes and dialogue
│
├── dist/                           # Build output
│   ├── beggars-sect-win.exe
│   ├── beggars-sect-macos
│   └── beggars-sect-linux
│
├── package.json
├── tsconfig.json
└── README.md
```

---

## Core Systems Architecture

### 1. Game State Management

**Pattern:** Centralized state with React Context

```typescript
// src/game/state/GameState.ts
interface GameState {
  // Player
  player: PlayerState;

  // Story progress
  chapter: number;          // 1, 2, or 3
  scene: string;            // Current scene ID
  flags: Set<string>;       // Story flags

  // Combat (null when not in combat)
  combat: CombatState | null;

  // Meta
  playtime: number;         // Seconds
  saveSlot: number;
}

interface PlayerState {
  name: string;             // "Li Wei"
  stats: Stats;
  currentHp: number;
  currentChi: number;
  stance: Stance;
  techniques: TechniqueProgress[];
  discoveredTechniques: string[];
}

interface CombatState {
  enemies: EnemyInstance[];
  turnQueue: TurnQueueEntry[];
  currentTurn: number;
  comboState: ComboState;
}
```

### 2. Combat Engine

**Pattern:** Turn-based ATB with tick system (from FORMULAS.md)

```typescript
// src/game/combat/CombatEngine.ts
class CombatEngine {
  private state: CombatState;
  private tickCounter: number = 0;

  // Initialize combat
  startCombat(enemies: EnemyTemplate[]): void {
    // Generate enemy instances (with AI variation)
    // Calculate initial ticks
    // Build turn queue
  }

  // Main loop
  tick(): TurnResult | null {
    this.tickCounter++;

    // Check who acts next
    const nextActor = this.getNextActor();
    if (!nextActor) return null;

    // Return action prompt
    return { actor: nextActor, availableActions: this.getActions(nextActor) };
  }

  // Execute player action
  executeAction(action: CombatAction): ActionResult {
    // Validate action
    // Calculate damage (using DamageCalculator)
    // Apply effects
    // Update turn queue
    // Check victory/defeat
  }

  // AI turn
  executeEnemyAI(enemy: EnemyInstance): ActionResult {
    // Use enemy's AI pattern
    // Select and execute action
  }
}
```

### 3. Damage Calculator

**Implementation of FORMULAS.md:**

```typescript
// src/game/combat/DamageCalculator.ts
function calculateDamage(params: DamageParams): DamageResult {
  const {
    attacker,
    defender,
    technique,
    stance,
    comboPosition,
    isCritical
  } = params;

  // Step 1: Raw Damage
  // Raw = Technique Power × (1 + STR / 20)
  const raw = technique.power * (1 + attacker.stats.str / 20);

  // Step 2: Apply Modifiers (multiplicative)
  const critMod = isCritical ? 1.5 : 1.0;
  const stanceMod = STANCE_DAMAGE_MODS[stance];
  const comboMod = COMBO_MODS[comboPosition];
  const masteryMod = getMasteryModifier(attacker, technique.id);

  const modified = raw * critMod * stanceMod * comboMod * masteryMod;

  // Step 3: Defense (subtractive)
  const reduced = modified - (defender.stats.defense * 2);

  // Step 4: Variance (0.9 - 1.1)
  const variance = 0.9 + Math.random() * 0.2;
  const final = reduced * variance;

  // Step 5: Minimum floor
  return {
    damage: Math.max(Math.floor(final), 1),
    isCritical,
    comboPosition
  };
}
```

### 4. Technique System

**Data structure matching TECHNIQUES.md:**

```typescript
// src/data/techniques.ts
interface Technique {
  id: string;
  name: string;
  chineseName: string;

  // Combat stats
  power: number;
  chiCost: number;
  speedMod: number;        // -3 to +2
  category: 'light' | 'medium' | 'heavy' | 'ultimate';

  // Stance requirements
  stance: Stance | 'any';

  // Combo properties
  comboType: 'starter' | 'followup' | 'finisher' | 'any';
  comboLinks: string[];    // Technique IDs that can follow

  // Effects
  effects: TechniqueEffect[];

  // Mastery
  masteryBonuses: MasteryBonus[];

  // Unlock
  unlockCondition: UnlockCondition;
}

// Example from TECHNIQUES.md
const PALM_STRIKE: Technique = {
  id: 'palm_strike',
  name: 'Palm Strike',
  chineseName: '掌击',
  power: 12,
  chiCost: 0,
  speedMod: 0,
  category: 'light',
  stance: 'any',
  comboType: 'starter',
  comboLinks: ['flowing_strike', 'weathered_palm', 'ravenous_palm'],
  effects: [],
  masteryBonuses: [
    { level: 2, bonus: { power: 2 } },
    { level: 3, bonus: { power: 2, effect: 'chi_gain_1' } },
    { level: 5, bonus: { power: 2, comboLinks: ['rising_dragon'] } }
  ],
  unlockCondition: { type: 'starting' }
};
```

### 5. Enemy System

**Data structure matching ENEMIES.md:**

```typescript
// src/data/enemies.ts
interface EnemyTemplate {
  id: string;
  name: string;
  faction: 'thugs' | 'spartans' | 'lone_wolves';

  // Base stats (AI will vary ±10%)
  baseStats: {
    hp: number;
    str: number;
    dex: number;
    end: number;
    defense: number;
    speed: number;
  };

  // AI behavior
  aiPattern: AIPattern;
  techniques: string[];    // Technique IDs

  // Rewards
  chiReward: number;

  // Dialogue
  encounterDialogue: string[];
  defeatDialogue: string[];

  // Variation params for Claude
  variationPrompt: string;
}

interface AIPattern {
  type: 'aggressive' | 'defensive' | 'balanced' | 'adaptive';
  priorities: AIPriority[];
  phaseTransitions?: PhaseTransition[];  // For bosses
}
```

### 6. Claude AI Integration

**Enemy variation system:**

```typescript
// src/ai/EnemyVariation.ts
async function generateEnemyVariation(
  template: EnemyTemplate
): Promise<EnemyInstance> {
  // Build prompt
  const prompt = buildVariationPrompt(template);

  // Call Claude API
  const response = await claude.messages.create({
    model: 'claude-3-haiku-20240307',  // Fast, cheap
    max_tokens: 500,
    messages: [{ role: 'user', content: prompt }]
  });

  // Parse response
  const variation = parseVariation(response.content);

  // Apply to template
  return {
    ...template,
    name: variation.name || template.name,
    stats: applyStatVariance(template.baseStats, variation.statMods),
    encounterDialogue: variation.dialogue || template.encounterDialogue,
    personality: variation.personality
  };
}

// Fallback if API fails
function generateFallbackVariation(template: EnemyTemplate): EnemyInstance {
  return {
    ...template,
    stats: applyRandomVariance(template.baseStats, 0.1),  // ±10%
    name: template.name
  };
}
```

---

## UI Architecture (Ink)

### Screen Management

```typescript
// src/App.tsx
function App() {
  const [screen, setScreen] = useState<Screen>('title');
  const [gameState, setGameState] = useState<GameState>(initialState);

  return (
    <GameContext.Provider value={{ gameState, setGameState }}>
      {screen === 'title' && <TitleScreen onStart={() => setScreen('exploration')} />}
      {screen === 'combat' && <CombatScreen onEnd={() => setScreen('exploration')} />}
      {screen === 'dialogue' && <DialogueScreen />}
      {screen === 'exploration' && <ExplorationScreen />}
      {screen === 'character' && <CharacterScreen />}
    </GameContext.Provider>
  );
}
```

### Combat Screen Layout

```
┌─────────────────────────────────────────────────────────────┐
│  COMBAT - Lower Streets Alley                               │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Street Punk "Scarface"                                     │
│  HP: ████████░░ 80/100                                      │
│  [Aggressive] [Bleeding]                                    │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Li Wei                          Stance: FLOWING            │
│  HP: ████████████████░░░░ 160/200                          │
│  Chi: ██████████░░░░░░░░░░ 32/60                           │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  TURN ORDER: [Li Wei] → Scarface → [Li Wei] → Scarface     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  > [1] Attack (Palm Strike)                                 │
│    [2] Technique                                            │
│    [3] Defend                                               │
│    [4] Chi Focus                                            │
│    [5] Stance (→ Weathered)                                 │
│    [6] Flee                                                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Component Example

```typescript
// src/ui/components/HealthBar.tsx
import { Box, Text } from 'ink';

interface HealthBarProps {
  current: number;
  max: number;
  label?: string;
  color?: string;
}

function HealthBar({ current, max, label = 'HP', color = 'green' }: HealthBarProps) {
  const percentage = current / max;
  const filled = Math.round(percentage * 20);
  const empty = 20 - filled;

  const barColor = percentage > 0.5 ? 'green' : percentage > 0.25 ? 'yellow' : 'red';

  return (
    <Box>
      <Text>{label}: </Text>
      <Text color={barColor}>{'█'.repeat(filled)}</Text>
      <Text color="gray">{'░'.repeat(empty)}</Text>
      <Text> {current}/{max}</Text>
    </Box>
  );
}
```

---

## Data Flow

### Combat Flow

```
1. Player enters combat area
   ↓
2. CombatEngine.startCombat(enemies)
   - Generate enemy variations (Claude or fallback)
   - Calculate initial ticks
   - Build turn queue
   ↓
3. CombatScreen renders
   - Show enemies, HP, turn order
   - Display action menu
   ↓
4. Player selects action
   ↓
5. CombatEngine.executeAction(action)
   - DamageCalculator computes damage
   - Effects applied
   - Turn queue updated
   ↓
6. Check win/lose conditions
   - If combat continues → step 3
   - If won → rewards, return to exploration
   - If lost → game over screen
```

### Save/Load Flow

```typescript
// src/game/state/SaveSystem.ts
interface SaveData {
  version: string;          // For migration
  timestamp: number;
  gameState: GameState;
}

function save(slot: number, state: GameState): void {
  const saveData: SaveData = {
    version: '1.0.0',
    timestamp: Date.now(),
    gameState: state
  };

  const path = getSavePath(slot);
  fs.writeFileSync(path, JSON.stringify(saveData, null, 2));
}

function load(slot: number): GameState | null {
  const path = getSavePath(slot);
  if (!fs.existsSync(path)) return null;

  const data = JSON.parse(fs.readFileSync(path, 'utf-8'));

  // Version migration if needed
  if (data.version !== CURRENT_VERSION) {
    return migrate(data);
  }

  return data.gameState;
}

function getSavePath(slot: number): string {
  // ~/.beggars-sect/saves/save_1.json
  const home = os.homedir();
  return path.join(home, '.beggars-sect', 'saves', `save_${slot}.json`);
}
```

---

## Implementation Status

### Phase 1: Foundation ✅ COMPLETE

1. **Project setup** ✅
   - TypeScript + Ink 3.x configured
   - ESBuild for fast compilation
   - pkg for standalone executables

2. **Core data structures** ✅
   - Complete type system (~1,457 lines)
   - Character, Enemy, Combat, Technique types
   - Story and save types

3. **Basic UI** ✅
   - MainMenu with new/load/quit
   - Screen routing in App.tsx

### Phase 2: Combat Engine ✅ COMPLETE

1. **Combat engine** ✅ (~900 lines in CombatEngine.ts)
   - ATB tick system with DEX-based speed
   - Turn queue management
   - Full action execution (attack, technique, defend, chi-focus, stance, flee)
   - Effect processing (damage, heal, buff, debuff, stun, multi-hit)

2. **AI Controller** ✅ (~300 lines in AIController.ts)
   - Pattern-based decision making
   - Priority-weighted action selection
   - Condition evaluation with combat log analysis
   - Boss phase transitions

3. **Combat UI** ✅
   - HealthBar, ChiBar components
   - TurnOrder display
   - ActionMenu with technique selection

### Phase 3: Techniques ✅ COMPLETE

1. **Technique system** ✅ (~1,300 lines in TechniqueRegistry.ts)
   - 55+ techniques defined
   - Effect processing in CombatEngine
   - Chi management

2. **Stance system** ✅
   - 3 stances (Flowing, Weathered, Hungry)
   - Stance modifiers for attack/defense/speed

3. **Combo system** ✅
   - Combo roles (starter, followup, finisher)
   - Combo bonus damage

### Phase 4: Content ✅ COMPLETE

1. **All techniques** ✅ - 55+ (8 player, 48 enemy)
2. **All enemies + bosses** ✅ - 11 enemies, 3 bosses with unique techniques
3. **Story engine** ✅ - Non-linear narrative, 3 paths, 3 endings
4. **Save system** ✅ - File persistence, auto-save triggers

### Phase 5: Polish 🔄 IN PROGRESS

1. **Save/load system** ✅
2. **CLI packaging** ✅ - Windows, macOS, Linux executables
3. **Balance tuning** 🔄
4. **Additional content** 🔄

---

## Key Implementation Notes

### Performance
- Use React.memo for combat UI components
- Cache Claude API responses where appropriate
- Lazy load chapter content

### Error Handling
- Claude API failures → use fallback variations
- Save corruption → warn user, offer recovery
- Invalid game state → reset to last checkpoint

### Testing Strategy
- Unit tests for DamageCalculator
- Unit tests for CombatEngine turn logic
- Integration tests for full combat flow
- Manual playtesting for balance

### Debug Mode
- Enable with `--debug` flag
- Show hidden stats
- Skip combat
- Force story progression

---

## Dependencies (Actual)

```json
{
  "dependencies": {
    "ink": "^3.2.0",
    "ink-select-input": "^4.2.2",
    "ink-text-input": "^4.0.3",
    "react": "^17.0.2",
    "chalk": "^4.1.2"
  },
  "devDependencies": {
    "@anthropic-ai/sdk": "^0.39.0",
    "@types/node": "^22.10.2",
    "@types/react": "^17.0.80",
    "esbuild": "^0.24.2",
    "pkg": "^5.8.1",
    "typescript": "^5.7.2"
  }
}
```

**Note:** Using Ink 3.x (not 4.x) for better stability with CommonJS bundling for standalone executables.

---

## Configuration

```typescript
// src/data/constants.ts
export const CONFIG = {
  // Combat
  BASE_HP: 100,
  BASE_CHI: 30,
  STARTING_CHI_PER_FIGHT: 20,
  MIN_DAMAGE: 1,
  CRIT_MULTIPLIER: 1.5,
  CRIT_CHANCE_CAP: 50,
  EVASION_CAP: 40,

  // Progression
  MASTERY_LEVELS: [0, 10, 25, 50, 100],
  MASTERY_DAMAGE_BONUS: [1.0, 1.05, 1.10, 1.15, 1.20],

  // AI
  CLAUDE_MODEL: 'claude-3-haiku-20240307',
  ENEMY_STAT_VARIANCE: 0.1,  // ±10%

  // Save
  SAVE_SLOTS: 3,
  SAVE_VERSION: '1.0.0'
};
```

---

**Document Version:** 2.0
**Last Updated:** 2025-12-06
**Status:** Implementation complete (v0.2.0)

**Related Documents:**
- Combat mechanics → systems/COMBAT_SYSTEM.md
- Exact formulas → reference/FORMULAS.md
- Technique stats → systems/TECHNIQUES.md
- Enemy stats → systems/ENEMIES.md
- Story content → story/CHAPTER_*.md
- Code analysis → dev/CODE_REVIEW.md
