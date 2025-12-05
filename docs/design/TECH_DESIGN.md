# Technical Design Document

**Project:** The Beggars Sect: Li Wei's Ascension
**Version:** 1.0
**Last Updated:** 2025-12-05
**Status:** ELABORATED - Ready for implementation

---

## Overview

This document defines the technical architecture for implementing The Beggars Sect CLI RPG. It bridges the gap between game design documents and actual code.

**Tech Stack:**
- Node.js >=18.0.0
- TypeScript 5.3+
- Ink 4.4 (React for CLI)
- Claude API (enemy variation)

---

## Project Structure

```
the-beggars-sect/
├── docs/                    # Design documentation (you are here)
├── src/
│   ├── index.tsx            # Entry point
│   ├── App.tsx              # Root component, game state routing
│   │
│   ├── game/                # Core game logic (no UI)
│   │   ├── combat/
│   │   │   ├── CombatEngine.ts      # ATB system, turn management
│   │   │   ├── DamageCalculator.ts  # Formulas from FORMULAS.md
│   │   │   ├── TechniqueSystem.ts   # Technique execution
│   │   │   └── StatusEffects.ts     # Buffs, debuffs
│   │   │
│   │   ├── entities/
│   │   │   ├── Character.ts         # Base character class
│   │   │   ├── Player.ts            # Li Wei specifics
│   │   │   ├── Enemy.ts             # Enemy base class
│   │   │   └── NPC.ts               # Non-combat NPCs
│   │   │
│   │   ├── progression/
│   │   │   ├── Stats.ts             # Stat calculations
│   │   │   ├── Mastery.ts           # Technique mastery
│   │   │   └── Discovery.ts         # Technique unlock tracking
│   │   │
│   │   └── state/
│   │       ├── GameState.ts         # Global state management
│   │       ├── SaveSystem.ts        # Save/load logic
│   │       └── StoryProgress.ts     # Chapter/scene tracking
│   │
│   ├── ui/                  # Ink components (React for CLI)
│   │   ├── screens/
│   │   │   ├── TitleScreen.tsx      # Main menu
│   │   │   ├── CombatScreen.tsx     # Battle UI
│   │   │   ├── DialogueScreen.tsx   # NPC conversations
│   │   │   ├── ExplorationScreen.tsx # Area navigation
│   │   │   └── CharacterScreen.tsx  # Stats, techniques
│   │   │
│   │   ├── components/
│   │   │   ├── HealthBar.tsx        # HP/Chi display
│   │   │   ├── TurnOrder.tsx        # ATB queue display
│   │   │   ├── ActionMenu.tsx       # Combat actions
│   │   │   ├── TechniqueList.tsx    # Technique selection
│   │   │   └── DialogueBox.tsx      # Text display
│   │   │
│   │   └── hooks/
│   │       ├── useGameState.ts      # State access hook
│   │       ├── useCombat.ts         # Combat logic hook
│   │       └── useInput.ts          # Keyboard input hook
│   │
│   ├── data/                # Static game data (from design docs)
│   │   ├── techniques.ts    # From TECHNIQUES.md
│   │   ├── enemies.ts       # From ENEMIES.md
│   │   ├── npcs.ts          # From NPC_CAST.md
│   │   ├── chapters/        # Story content
│   │   │   ├── chapter1.ts
│   │   │   ├── chapter2.ts
│   │   │   └── chapter3.ts
│   │   └── constants.ts     # Game constants (from FORMULAS.md)
│   │
│   ├── ai/                  # Claude API integration
│   │   ├── ClaudeClient.ts  # API wrapper
│   │   ├── EnemyVariation.ts # Procedural enemy generation
│   │   └── prompts/         # Prompt templates
│   │       └── enemy-variation.ts
│   │
│   └── utils/
│       ├── random.ts        # RNG utilities
│       ├── format.ts        # Text formatting
│       └── logger.ts        # Debug logging
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

## Implementation Order

### Phase 1: Foundation (Week 3)

1. **Project setup**
   - npm install
   - Verify Ink renders "Hello World"
   - Set up TypeScript paths

2. **Core data structures**
   - GameState interface
   - Character/Stats interfaces
   - Technique/Enemy data files

3. **Basic UI**
   - TitleScreen (start/load/quit)
   - Basic screen routing

### Phase 2: Combat Core (Week 4)

1. **Combat engine**
   - ATB tick system
   - Turn queue management
   - Basic attack action

2. **Damage calculator**
   - Implement FORMULAS.md
   - Basic damage application

3. **Combat UI**
   - HealthBar component
   - TurnOrder display
   - ActionMenu

4. **First playable**
   - Player vs single enemy
   - Basic attack only
   - Win/lose detection

### Phase 3: Techniques (Week 5)

1. **Technique system**
   - Load from data files
   - Execution logic
   - Chi management

2. **Stance system**
   - Stance switching
   - Stance modifiers

3. **Combo system**
   - Combo detection
   - Combo bonuses

### Phase 4: Content (Weeks 6-8)

1. **All 15 techniques**
2. **All enemies + bosses**
3. **Chapter 1-3 scenes**
4. **NPC dialogue**
5. **Claude integration**

### Phase 5: Polish (Weeks 9-12)

1. **Save/load system**
2. **Mastery progression**
3. **Balance tuning**
4. **ASCII art**
5. **Testing and launch**

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

## Dependencies

```json
{
  "dependencies": {
    "ink": "^4.4.1",
    "ink-text-input": "^5.0.1",
    "ink-select-input": "^5.0.0",
    "react": "^18.2.0",
    "@anthropic-ai/sdk": "^0.10.0",
    "chalk": "^5.3.0",
    "boxen": "^7.1.1",
    "figlet": "^1.7.0"
  },
  "devDependencies": {
    "typescript": "^5.3.3",
    "@types/node": "^20.10.0",
    "@types/react": "^18.2.0",
    "@types/figlet": "^1.5.8",
    "tsx": "^4.6.0"
  }
}
```

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

**This document is the bridge between design and code. When implementing, reference the specific design docs for details:**
- Combat mechanics → COMBAT_SYSTEM.md
- Exact formulas → FORMULAS.md
- Technique stats → TECHNIQUES.md
- Enemy stats → ENEMIES.md
- Story content → CHAPTER_*.md
