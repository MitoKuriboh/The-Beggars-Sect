# Core Engine Implementation Plan

**Project:** The Beggars Sect - Li Wei's Ascension
**Phase:** 2 - Core Engine Development
**Author:** Claude (Technical Officer)
**Created:** 2025-12-05 (Session 12)
**Updated:** 2025-12-06 (Session 13)
**Status:** WEEK 1 COMPLETE - Week 2 Ready

---

## Executive Summary

This document outlines the detailed implementation plan for the Core Engine of The Beggars Sect. The design phase is 100% complete with 15,000+ lines of documentation. All systems, mechanics, story, and technical architecture are fully specified.

**Goal:** Build a working combat prototype with all core mechanics functional.

---

## Table of Contents

1. [Current State Analysis](#1-current-state-analysis)
2. [Implementation Order](#2-implementation-order)
3. [Phase 2A: Foundation (Week 1)](#3-phase-2a-foundation)
4. [Phase 2B: Combat Engine (Week 2)](#4-phase-2b-combat-engine)
5. [Phase 2C: Techniques & Stances (Week 3)](#5-phase-2c-techniques--stances)
6. [Phase 2D: Integration & Testing (Week 4)](#6-phase-2d-integration--testing)
7. [Data Structures](#7-data-structures)
8. [File Structure](#8-file-structure)
9. [Dependencies](#9-dependencies)
10. [Testing Strategy](#10-testing-strategy)
11. [Success Criteria](#11-success-criteria)

---

## 1. Current State Analysis

### What Exists (COMPLETE)
- ✅ 25+ design documents (15,000+ lines)
- ✅ Combat system fully specified (COMBAT_SYSTEM.md)
- ✅ 15 techniques with complete stats (TECHNIQUES.md)
- ✅ 11 enemies with full specifications (ENEMIES.md)
- ✅ All damage formulas finalized
- ✅ Story scripted (Prologue + 3 chapters)
- ✅ Tech architecture planned (TECH_DESIGN.md)
- ✅ package.json with dependencies

### Week 1 Foundation (COMPLETE - Session 13)
- ✅ src/types/ - All TypeScript interfaces (character, combat, technique, item, game)
- ✅ src/game/state/GameStore.ts - Singleton with save/load
- ✅ src/game/factories/CharacterFactory.ts - Player + 11 enemies + 3 bosses
- ✅ src/ui/App.tsx - CLI shell (title, menu, new game, stats, credits)
- ✅ src/index.tsx - Entry point with waitUntilExit()
- ✅ Standalone executables (Windows .exe, macOS, Linux)
- ✅ GitHub Release v0.1.0
- ✅ beggars-sect.genkaw.com/download page

### What Needs Building (Week 2+)
- ❌ Combat engine (ATB system)
- ❌ Damage calculation
- ❌ Chi management
- ❌ Stance system
- ❌ Technique system
- ❌ Combat UI
- ❌ Enemy AI

---

## 2. Implementation Order

### Priority Principle
Build from the inside out: **Data → Logic → UI**

### Order of Implementation

```
Week 1: Foundation
├── 1. TypeScript interfaces (data contracts)
├── 2. Game state store
├── 3. Character factory
└── 4. Basic CLI shell

Week 2: Combat Engine
├── 5. ATB turn order system
├── 6. Action system (7 actions)
├── 7. Damage calculator
└── 8. Chi management

Week 3: Techniques & Stances
├── 9. Technique database
├── 10. Stance system (3 stances)
├── 11. Mastery tracking
└── 12. Combo system (basic)

Week 4: Integration
├── 13. Combat UI (Ink components)
├── 14. Enemy AI (basic patterns)
├── 15. Test combat loop
└── 16. Balance pass
```

---

## 3. Phase 2A: Foundation (Week 1)

### 3.1 TypeScript Interfaces

**File:** `src/types/index.ts`

```typescript
// Core Stats
interface Stats {
  str: number;  // Strength - physical damage
  dex: number;  // Dexterity - speed, crit
  end: number;  // Endurance - HP, defense
  wis: number;  // Wisdom - chi pool, recovery
  apt?: number; // Aptitude - mastery growth (hidden)
  inv?: number; // Inverse Potential (hidden, Li Wei only)
}

// Stance Types
type Stance = 'flowing' | 'weathered' | 'hungry';

// Chi Aspect Types
type ChiAspect = 'force' | 'flow' | 'precision' | 'burst' | 'armor' | 'sense' | 'will' | 'inverse';

// Character (Player or NPC)
interface Character {
  id: string;
  name: string;
  hp: number;
  maxHp: number;
  chi: number;
  maxChi: number;
  inverseChi: number;      // Inverse chi pool (Li Wei)
  maxInverseChi: number;
  stats: Stats;
  stance: Stance;
  techniques: string[];    // Technique IDs
  masteryLevels: Record<string, number>; // techniqueId -> uses
  statusEffects: StatusEffect[];
  isPlayer: boolean;
}

// Enemy extends Character
interface Enemy extends Character {
  faction: 'thugs' | 'spartans' | 'lone-wolf' | 'beggars';
  tier: 'common' | 'uncommon' | 'rare' | 'boss';
  aiPattern: AIPattern;
  drops: LootDrop[];
  chiAspect: ChiAspect;
  dialogue: EnemyDialogue;
  phase?: number;          // For boss multi-phase
}

// Technique Definition
interface Technique {
  id: string;
  name: string;
  chinese: string;
  stance: Stance | 'any';
  power: number;
  chiCost: number;
  speed: number;           // Turn delay modifier (-3 to +2)
  effect?: TechniqueEffect;
  comboRole?: 'starter' | 'followup' | 'finisher';
  comboLinks?: string[];   // Technique IDs this can link to
  description: string;
  masteryBonuses: MasteryBonus[];
}

// Technique Effect
interface TechniqueEffect {
  type: 'damage' | 'heal' | 'buff' | 'debuff' | 'status' | 'chi';
  value: number;
  duration?: number;
  target: 'self' | 'enemy' | 'all-enemies';
  condition?: string;      // e.g., "hp < 30%"
}

// Status Effect
interface StatusEffect {
  id: string;
  name: string;
  type: 'buff' | 'debuff';
  stat?: keyof Stats;
  modifier: number;        // +/- percentage
  duration: number;        // Turns remaining
  stackable: boolean;
}

// Combat Action
type ActionType = 'attack' | 'technique' | 'defend' | 'chi-focus' | 'item' | 'stance' | 'flee';

interface CombatAction {
  type: ActionType;
  actor: Character;
  target?: Character;
  technique?: Technique;
  item?: Item;
  newStance?: Stance;
}

// Combat State
interface CombatState {
  player: Character;
  enemies: Enemy[];
  turnQueue: TurnQueueEntry[];
  currentTurn: number;
  round: number;
  combatLog: LogEntry[];
  comboChain: ComboChain;
  isPlayerTurn: boolean;
  combatResult: 'ongoing' | 'victory' | 'defeat' | 'fled';
}

// Turn Queue Entry
interface TurnQueueEntry {
  character: Character;
  turnValue: number;       // When this character acts
  isReady: boolean;
}

// Combo Chain
interface ComboChain {
  techniques: string[];    // Technique IDs in chain
  damageMultiplier: number;
  chiRefund: number;
}

// AI Pattern
interface AIPattern {
  name: string;
  behavior: 'aggressive' | 'balanced' | 'tactical' | 'predator';
  rules: AIRule[];
}

interface AIRule {
  condition: string;       // e.g., "hp < 30%"
  action: string;          // e.g., "use:desperate-strike"
  priority: number;
}

// Loot
interface LootDrop {
  itemId: string;
  chance: number;          // 0-1
  quantity: number;
}

// Item
interface Item {
  id: string;
  name: string;
  type: 'consumable' | 'equipment' | 'key' | 'scroll';
  effect?: ItemEffect;
  description: string;
}

interface ItemEffect {
  type: 'heal-hp' | 'heal-chi' | 'buff' | 'teach-technique';
  value: number;
  duration?: number;
}

// Game State
interface GameState {
  player: Character;
  inventory: InventorySlot[];
  gold: number;
  currentLocation: string;
  storyProgress: StoryProgress;
  discoveredTechniques: string[];
  defeatedEnemies: string[];
  flags: Record<string, boolean>;
}

interface InventorySlot {
  item: Item;
  quantity: number;
}

interface StoryProgress {
  chapter: number;
  scene: string;
  choices: Record<string, string>;
  path: 'blade' | 'stream' | 'shadow' | null;
}
```

### 3.2 Game State Store

**File:** `src/game/state/GameStore.ts`

```typescript
// Zustand-like state management (or simple singleton)
class GameStore {
  private state: GameState;

  // Getters
  getPlayer(): Character;
  getInventory(): InventorySlot[];
  getStoryProgress(): StoryProgress;

  // Mutations
  updatePlayer(updates: Partial<Character>): void;
  addItem(item: Item, quantity: number): void;
  removeItem(itemId: string, quantity: number): void;
  setStoryProgress(progress: Partial<StoryProgress>): void;
  setFlag(key: string, value: boolean): void;

  // Persistence
  save(): string;          // JSON
  load(data: string): void;
}
```

### 3.3 Character Factory

**File:** `src/game/factories/CharacterFactory.ts`

```typescript
class CharacterFactory {
  // Create Li Wei (player)
  static createPlayer(): Character {
    return {
      id: 'li-wei',
      name: 'Li Wei',
      hp: 100,
      maxHp: 100,
      chi: 50,
      maxChi: 50,
      inverseChi: 0,
      maxInverseChi: 100,
      stats: { str: 10, dex: 10, end: 10, wis: 10, apt: 15, inv: 99 },
      stance: 'flowing',
      techniques: ['palm-strike', 'flowing-strike'],
      masteryLevels: {},
      statusEffects: [],
      isPlayer: true,
    };
  }

  // Create enemy from template
  static createEnemy(templateId: string): Enemy;

  // Create boss with phase support
  static createBoss(bossId: string): Enemy;
}
```

### 3.4 Basic CLI Shell

**File:** `src/ui/App.tsx`

```typescript
// Ink-based main application
const App = () => {
  const [screen, setScreen] = useState<'menu' | 'combat' | 'story'>('menu');

  return (
    <Box flexDirection="column">
      {screen === 'menu' && <MainMenu onSelect={setScreen} />}
      {screen === 'combat' && <CombatScreen />}
      {screen === 'story' && <StoryScreen />}
    </Box>
  );
};
```

---

## 4. Phase 2B: Combat Engine (Week 2)

### 4.1 ATB Turn Order System

**File:** `src/game/combat/TurnOrderManager.ts`

**ATB Concept:**
- Each character has a "turn value" (accumulator)
- Higher DEX = faster accumulation
- When turn value reaches threshold (100), character can act
- Actions have speed modifiers that affect next turn timing

```typescript
class TurnOrderManager {
  private queue: TurnQueueEntry[];
  private baseThreshold: number = 100;

  // Initialize combat turn order
  initialize(player: Character, enemies: Enemy[]): void;

  // Calculate speed factor from DEX
  getSpeedFactor(character: Character): number {
    // Base speed = 10, DEX 10 = 1.0x speed
    // DEX 15 = 1.5x speed, DEX 5 = 0.5x speed
    return character.stats.dex / 10;
  }

  // Advance time until next character ready
  advanceToNextTurn(): Character {
    while (!this.hasReadyCharacter()) {
      this.tick();
    }
    return this.getNextReady();
  }

  // Single time tick
  private tick(): void {
    for (const entry of this.queue) {
      entry.turnValue += 10 * this.getSpeedFactor(entry.character);
      if (entry.turnValue >= this.baseThreshold) {
        entry.isReady = true;
      }
    }
  }

  // Apply speed modifier after action
  applyActionDelay(character: Character, speedMod: number): void {
    // speedMod: -3 (slow) to +2 (fast)
    // Negative = delayed next turn, Positive = faster next turn
    const entry = this.queue.find(e => e.character.id === character.id);
    if (entry) {
      entry.turnValue = 0 + (speedMod * 10); // Reset with modifier
      entry.isReady = false;
    }
  }

  // Get visible turn preview (next 5-7 turns)
  getPreview(count: number = 7): Character[];

  // Remove defeated character
  removeCharacter(characterId: string): void;
}
```

### 4.2 Action System

**File:** `src/game/combat/ActionExecutor.ts`

**7 Action Types:**

```typescript
class ActionExecutor {
  constructor(
    private turnManager: TurnOrderManager,
    private damageCalc: DamageCalculator,
    private chiManager: ChiManager,
  ) {}

  // Execute any action
  execute(action: CombatAction, state: CombatState): ActionResult {
    switch (action.type) {
      case 'attack':
        return this.executeAttack(action, state);
      case 'technique':
        return this.executeTechnique(action, state);
      case 'defend':
        return this.executeDefend(action, state);
      case 'chi-focus':
        return this.executeChiFocus(action, state);
      case 'item':
        return this.executeItem(action, state);
      case 'stance':
        return this.executeStance(action, state);
      case 'flee':
        return this.executeFlee(action, state);
    }
  }

  // 1. ATTACK - Basic palm strike
  private executeAttack(action: CombatAction, state: CombatState): ActionResult {
    const damage = this.damageCalc.calculate({
      attacker: action.actor,
      defender: action.target!,
      power: 12,          // Base attack power
      isCritical: this.rollCrit(action.actor),
    });

    // Apply damage
    action.target!.hp -= damage.final;

    // Generate chi (+3 base, +4 in Hungry stance)
    const chiGain = action.actor.stance === 'hungry' ? 4 : 3;
    this.chiManager.addChi(action.actor, chiGain);

    // Speed modifier: 0 (neutral)
    this.turnManager.applyActionDelay(action.actor, 0);

    return {
      type: 'attack',
      damage: damage.final,
      chiGained: chiGain,
      message: `${action.actor.name} strikes for ${damage.final} damage!`,
    };
  }

  // 2. TECHNIQUE - Special move
  private executeTechnique(action: CombatAction, state: CombatState): ActionResult;

  // 3. DEFEND - Guard stance
  private executeDefend(action: CombatAction, state: CombatState): ActionResult {
    // Add defending status effect
    action.actor.statusEffects.push({
      id: 'defending',
      name: 'Defending',
      type: 'buff',
      stat: 'end',
      modifier: 50,       // +50% defense
      duration: 1,
      stackable: false,
    });

    // Chi gain: +5 base
    this.chiManager.addChi(action.actor, 5);

    // Speed modifier: +1 (slightly faster next turn)
    this.turnManager.applyActionDelay(action.actor, 1);

    return {
      type: 'defend',
      chiGained: 5,
      message: `${action.actor.name} takes a defensive stance.`,
    };
  }

  // 4. CHI FOCUS - Meditate
  private executeChiFocus(action: CombatAction, state: CombatState): ActionResult {
    // Large chi gain: +15
    this.chiManager.addChi(action.actor, 15);

    // Clear negative status effects
    action.actor.statusEffects = action.actor.statusEffects.filter(
      e => e.type !== 'debuff'
    );

    // Speed modifier: -1 (slower next turn, vulnerable)
    this.turnManager.applyActionDelay(action.actor, -1);

    return {
      type: 'chi-focus',
      chiGained: 15,
      message: `${action.actor.name} focuses their chi. (+15 Chi)`,
    };
  }

  // 5. ITEM - Use consumable
  private executeItem(action: CombatAction, state: CombatState): ActionResult;

  // 6. STANCE - Switch combat style
  private executeStance(action: CombatAction, state: CombatState): ActionResult {
    const oldStance = action.actor.stance;
    action.actor.stance = action.newStance!;

    // Chi cost: 5-10 depending on stance
    const chiCost = action.newStance === 'hungry' ? 10 : 5;
    this.chiManager.spendChi(action.actor, chiCost);

    // Apply stance stat modifiers
    this.applyStanceModifiers(action.actor, action.newStance!);

    // Speed modifier: 0 (instant effect)
    this.turnManager.applyActionDelay(action.actor, 0);

    return {
      type: 'stance',
      chiSpent: chiCost,
      message: `${action.actor.name} shifts to ${action.newStance} stance.`,
    };
  }

  // 7. FLEE - Escape combat
  private executeFlee(action: CombatAction, state: CombatState): ActionResult {
    // Success rate: (Your Speed - Enemy Speed) × 10%
    // Min: 30%, Max: 90%
    const avgEnemyDex = state.enemies.reduce((sum, e) => sum + e.stats.dex, 0) / state.enemies.length;
    const speedDiff = action.actor.stats.dex - avgEnemyDex;
    const successRate = Math.min(0.9, Math.max(0.3, 0.5 + speedDiff * 0.1));

    const success = Math.random() < successRate;

    return {
      type: 'flee',
      success,
      message: success
        ? `${action.actor.name} escapes from battle!`
        : `${action.actor.name} failed to escape!`,
    };
  }
}
```

### 4.3 Damage Calculator

**File:** `src/game/combat/DamageCalculator.ts`

**Formula from COMBAT_SYSTEM.md:**
```
Base = (Technique Power × (Strength/10)) - Enemy Defense
Modifiers:
× Critical Hit: 1.5
× Stance Bonus: varies
× Combo Chain: 1.1-1.3
× Mastery Bonus: +(mastery level × 2%)
Final = Base × random(0.9, 1.1)
Minimum: 1 damage
```

```typescript
interface DamageInput {
  attacker: Character;
  defender: Character;
  power: number;
  isCritical: boolean;
  comboPosition?: 'starter' | 'followup' | 'finisher';
  masteryLevel?: number;
}

interface DamageOutput {
  base: number;
  modifiers: DamageModifier[];
  final: number;
  isCritical: boolean;
  breakdown: string;
}

class DamageCalculator {
  calculate(input: DamageInput): DamageOutput {
    // Step 1: Base damage
    const strMultiplier = input.attacker.stats.str / 10;
    const defense = this.getDefense(input.defender);
    let base = Math.max(1, (input.power * strMultiplier) - defense);

    const modifiers: DamageModifier[] = [];
    let multiplier = 1.0;

    // Step 2: Critical hit (1.5x)
    if (input.isCritical) {
      multiplier *= 1.5;
      modifiers.push({ name: 'Critical', value: 1.5 });
    }

    // Step 3: Stance bonus
    const stanceBonus = this.getStanceBonus(input.attacker.stance);
    if (stanceBonus !== 1.0) {
      multiplier *= stanceBonus;
      modifiers.push({ name: 'Stance', value: stanceBonus });
    }

    // Step 4: Combo chain bonus
    if (input.comboPosition) {
      const comboBonus = this.getComboBonus(input.comboPosition);
      multiplier *= comboBonus;
      modifiers.push({ name: 'Combo', value: comboBonus });
    }

    // Step 5: Mastery bonus
    if (input.masteryLevel && input.masteryLevel > 0) {
      const masteryBonus = 1 + (input.masteryLevel * 0.02);
      multiplier *= masteryBonus;
      modifiers.push({ name: 'Mastery', value: masteryBonus });
    }

    // Step 6: Random variance (0.9-1.1)
    const variance = 0.9 + Math.random() * 0.2;
    multiplier *= variance;

    // Final calculation
    const final = Math.max(1, Math.floor(base * multiplier));

    return {
      base,
      modifiers,
      final,
      isCritical: input.isCritical,
      breakdown: this.formatBreakdown(base, modifiers, final),
    };
  }

  private getDefense(defender: Character): number {
    // Base defense from END
    let defense = defender.stats.end;

    // Check for defending status
    const defending = defender.statusEffects.find(e => e.id === 'defending');
    if (defending) {
      defense *= 1.5; // +50% defense while defending
    }

    // Check for stance modifier
    if (defender.stance === 'weathered') {
      defense *= 1.5; // +50% defense in weathered stance
    }

    return defense;
  }

  private getStanceBonus(stance: Stance): number {
    switch (stance) {
      case 'flowing': return 1.0;    // Balanced
      case 'weathered': return 0.9;  // -10% attack
      case 'hungry': return 1.3;     // +30% attack
    }
  }

  private getComboBonus(position: 'starter' | 'followup' | 'finisher'): number {
    switch (position) {
      case 'starter': return 1.0;    // No bonus
      case 'followup': return 1.1;   // +10%
      case 'finisher': return 1.3;   // +30%
    }
  }
}
```

### 4.4 Chi Management

**File:** `src/game/combat/ChiManager.ts`

```typescript
class ChiManager {
  // Add chi (capped at max)
  addChi(character: Character, amount: number): number {
    const actual = Math.min(amount, character.maxChi - character.chi);
    character.chi += actual;
    return actual;
  }

  // Spend chi (returns false if insufficient)
  spendChi(character: Character, amount: number): boolean {
    if (character.chi < amount) return false;
    character.chi -= amount;
    return true;
  }

  // Check if can afford
  canAfford(character: Character, amount: number): boolean {
    return character.chi >= amount;
  }

  // Generate inverse chi from damage taken
  generateInverseChi(character: Character, damageTaken: number): number {
    if (!character.isPlayer) return 0;

    // Base: 50% of damage taken as inverse chi
    let generated = Math.floor(damageTaken * 0.5);

    // HP thresholds for bonus generation
    const hpPercent = character.hp / character.maxHp;
    if (hpPercent < 0.5) generated += 2;  // Desperation Gate 1
    if (hpPercent < 0.25) generated += 3; // Desperation Gate 2
    if (hpPercent < 0.1) generated += 5;  // Desperation Gate 3

    // Cap at max
    const actual = Math.min(generated, character.maxInverseChi - character.inverseChi);
    character.inverseChi += actual;

    return actual;
  }

  // Per-turn passive chi generation
  tickPassiveGeneration(character: Character): number {
    let passive = 0;

    // Stance-based generation
    switch (character.stance) {
      case 'flowing': passive += 1; break;
      case 'weathered': passive += 2; break; // +30% more
      case 'hungry': passive += 1; break;
    }

    // Status effect modifiers
    // ... check for chi generation buffs

    return this.addChi(character, passive);
  }
}
```

---

## 5. Phase 2C: Techniques & Stances (Week 3)

### 5.1 Technique Database

**File:** `src/data/techniques.ts`

Load all 15 techniques from TECHNIQUES.md:

```typescript
export const TECHNIQUES: Record<string, Technique> = {
  'palm-strike': {
    id: 'palm-strike',
    name: 'Palm Strike',
    chinese: '掌击',
    stance: 'any',
    power: 12,
    chiCost: 0,
    speed: 0,
    comboRole: 'starter',
    description: 'Basic palm strike. Generates chi.',
    masteryBonuses: [
      { level: 1, effect: '+2 power' },
      { level: 2, effect: '+2 power, +1 chi generation' },
      // ...
    ],
  },

  'flowing-strike': {
    id: 'flowing-strike',
    name: 'Flowing Strike',
    chinese: '流打',
    stance: 'flowing',
    power: 16,
    chiCost: 5,
    speed: 1,
    comboRole: 'starter',
    comboLinks: ['stream-palm'],
    description: 'Swift strike that flows into follow-ups.',
    masteryBonuses: [...],
  },

  // ... all 15 techniques
};
```

### 5.2 Stance System

**File:** `src/game/combat/StanceManager.ts`

```typescript
interface StanceModifiers {
  attack: number;    // Damage multiplier
  defense: number;   // Defense multiplier
  speed: number;     // DEX modifier
  chiGen: number;    // Chi generation multiplier
}

const STANCE_MODIFIERS: Record<Stance, StanceModifiers> = {
  flowing: {
    attack: 1.0,
    defense: 1.0,
    speed: 1.0,
    chiGen: 1.0,
  },
  weathered: {
    attack: 0.9,     // -10% attack
    defense: 1.5,    // +50% defense
    speed: 0.8,      // -20% speed
    chiGen: 1.3,     // +30% chi generation
  },
  hungry: {
    attack: 1.3,     // +30% attack
    defense: 0.7,    // -30% defense
    speed: 1.1,      // +10% speed
    chiGen: 1.5,     // +50% chi generation
  },
};

class StanceManager {
  getModifiers(stance: Stance): StanceModifiers {
    return STANCE_MODIFIERS[stance];
  }

  canUseStance(character: Character, stance: Stance): boolean {
    // Check if stance is unlocked
    // Check if have enough chi
    const cost = stance === 'hungry' ? 10 : 5;
    return character.chi >= cost;
  }

  getAvailableTechniques(character: Character): Technique[] {
    return Object.values(TECHNIQUES).filter(tech =>
      tech.stance === 'any' || tech.stance === character.stance
    );
  }
}
```

### 5.3 Mastery Tracking

**File:** `src/game/progression/MasteryTracker.ts`

```typescript
const MASTERY_THRESHOLDS = [0, 10, 25, 50, 100]; // Uses required per level

class MasteryTracker {
  // Record technique use
  recordUse(character: Character, techniqueId: string): MasteryUpdate | null {
    const current = character.masteryLevels[techniqueId] || 0;
    character.masteryLevels[techniqueId] = current + 1;

    // Check for level up
    const newLevel = this.getLevel(character.masteryLevels[techniqueId]);
    const oldLevel = this.getLevel(current);

    if (newLevel > oldLevel) {
      return {
        techniqueId,
        newLevel,
        bonus: this.getBonusForLevel(techniqueId, newLevel),
      };
    }

    return null;
  }

  getLevel(uses: number): number {
    for (let i = MASTERY_THRESHOLDS.length - 1; i >= 0; i--) {
      if (uses >= MASTERY_THRESHOLDS[i]) return i + 1;
    }
    return 1;
  }

  getMasteryBonus(character: Character, techniqueId: string): number {
    const uses = character.masteryLevels[techniqueId] || 0;
    const level = this.getLevel(uses);
    return level * 2; // 2% per level
  }
}
```

### 5.4 Combo System

**File:** `src/game/combat/ComboManager.ts`

```typescript
interface ActiveCombo {
  techniques: string[];
  position: 'starter' | 'followup' | 'finisher';
  damageBonus: number;
  chiRefund: number;
}

class ComboManager {
  private activeCombo: ActiveCombo | null = null;

  // Start a combo with a starter technique
  startCombo(techniqueId: string): void {
    const tech = TECHNIQUES[techniqueId];
    if (tech.comboRole === 'starter') {
      this.activeCombo = {
        techniques: [techniqueId],
        position: 'starter',
        damageBonus: 1.0,
        chiRefund: 0,
      };
    }
  }

  // Continue combo with follow-up
  continueCombo(techniqueId: string): boolean {
    if (!this.activeCombo) return false;

    const lastTech = TECHNIQUES[this.activeCombo.techniques.slice(-1)[0]];
    if (!lastTech.comboLinks?.includes(techniqueId)) return false;

    this.activeCombo.techniques.push(techniqueId);

    const tech = TECHNIQUES[techniqueId];
    if (tech.comboRole === 'followup') {
      this.activeCombo.position = 'followup';
      this.activeCombo.damageBonus = 1.1;
    } else if (tech.comboRole === 'finisher') {
      this.activeCombo.position = 'finisher';
      this.activeCombo.damageBonus = 1.3;
      this.activeCombo.chiRefund = 10;
    }

    return true;
  }

  // Get current combo bonus
  getCurrentBonus(): number {
    return this.activeCombo?.damageBonus || 1.0;
  }

  // Reset combo (on miss, defend, or non-combo action)
  resetCombo(): void {
    this.activeCombo = null;
  }

  // Finalize combo and get rewards
  finalizeCombo(): { chiRefund: number; message: string } | null {
    if (!this.activeCombo || this.activeCombo.techniques.length < 2) {
      this.activeCombo = null;
      return null;
    }

    const result = {
      chiRefund: this.activeCombo.chiRefund,
      message: `Combo complete! ${this.activeCombo.techniques.length} hits!`,
    };

    this.activeCombo = null;
    return result;
  }
}
```

---

## 6. Phase 2D: Integration & Testing (Week 4)

### 6.1 Combat UI

**File:** `src/ui/combat/CombatScreen.tsx`

```typescript
import { Box, Text } from 'ink';

interface CombatScreenProps {
  state: CombatState;
  onAction: (action: CombatAction) => void;
}

const CombatScreen: React.FC<CombatScreenProps> = ({ state, onAction }) => {
  return (
    <Box flexDirection="column" padding={1}>
      {/* Turn Order Preview */}
      <TurnOrderDisplay queue={state.turnQueue} />

      {/* Enemy Display */}
      <EnemyPanel enemies={state.enemies} />

      {/* Player Status */}
      <PlayerStatus player={state.player} />

      {/* Action Menu (when player turn) */}
      {state.isPlayerTurn && (
        <ActionMenu
          player={state.player}
          enemies={state.enemies}
          onSelect={onAction}
        />
      )}

      {/* Combat Log */}
      <CombatLog entries={state.combatLog.slice(-5)} />
    </Box>
  );
};

// Sub-components
const TurnOrderDisplay = ({ queue }) => (
  <Box>
    <Text>Turn Order: </Text>
    {queue.slice(0, 7).map((entry, i) => (
      <Text key={i} color={entry.character.isPlayer ? 'green' : 'red'}>
        [{entry.character.name}]
      </Text>
    ))}
  </Box>
);

const PlayerStatus = ({ player }) => (
  <Box borderStyle="round" borderColor="green" padding={1}>
    <Text>{player.name} ({player.stance})</Text>
    <Text>HP: {player.hp}/{player.maxHp}</Text>
    <Text>Chi: {player.chi}/{player.maxChi}</Text>
    {player.inverseChi > 0 && (
      <Text color="magenta">Inverse: {player.inverseChi}</Text>
    )}
  </Box>
);

const ActionMenu = ({ player, enemies, onSelect }) => {
  const [selected, setSelected] = useState(0);
  const actions = ['Attack', 'Technique', 'Defend', 'Chi Focus', 'Item', 'Stance', 'Flee'];

  // ... Ink select input handling
};
```

### 6.2 Enemy AI

**File:** `src/game/combat/EnemyAI.ts`

```typescript
class EnemyAI {
  // Determine enemy action
  decideAction(enemy: Enemy, state: CombatState): CombatAction {
    const pattern = enemy.aiPattern;

    // Check rules in priority order
    for (const rule of pattern.rules.sort((a, b) => b.priority - a.priority)) {
      if (this.evaluateCondition(rule.condition, enemy, state)) {
        return this.parseAction(rule.action, enemy, state);
      }
    }

    // Default: basic attack
    return {
      type: 'attack',
      actor: enemy,
      target: state.player,
    };
  }

  private evaluateCondition(condition: string, enemy: Enemy, state: CombatState): boolean {
    // Parse conditions like "hp < 30%" or "player.defending"
    // ...
  }

  private parseAction(actionStr: string, enemy: Enemy, state: CombatState): CombatAction {
    // Parse actions like "use:desperate-strike" or "defend"
    // ...
  }
}
```

### 6.3 Combat Loop

**File:** `src/game/combat/CombatEngine.ts`

```typescript
class CombatEngine {
  private turnManager: TurnOrderManager;
  private actionExecutor: ActionExecutor;
  private enemyAI: EnemyAI;
  private state: CombatState;

  // Initialize combat
  startCombat(player: Character, enemies: Enemy[]): void {
    this.state = {
      player,
      enemies,
      turnQueue: [],
      currentTurn: 0,
      round: 1,
      combatLog: [],
      comboChain: { techniques: [], damageMultiplier: 1, chiRefund: 0 },
      isPlayerTurn: false,
      combatResult: 'ongoing',
    };

    this.turnManager.initialize(player, enemies);
    this.advanceToNextTurn();
  }

  // Advance to next turn
  private advanceToNextTurn(): void {
    const nextCharacter = this.turnManager.advanceToNextTurn();
    this.state.isPlayerTurn = nextCharacter.isPlayer;

    if (!this.state.isPlayerTurn) {
      // Enemy turn - auto-execute
      const enemy = nextCharacter as Enemy;
      const action = this.enemyAI.decideAction(enemy, this.state);
      this.executeAction(action);
    }
    // Player turn - wait for input via UI
  }

  // Execute an action
  executeAction(action: CombatAction): ActionResult {
    const result = this.actionExecutor.execute(action, this.state);

    // Log result
    this.state.combatLog.push({
      round: this.state.round,
      message: result.message,
      timestamp: Date.now(),
    });

    // Check for combat end
    this.checkCombatEnd();

    // If ongoing, advance to next turn
    if (this.state.combatResult === 'ongoing') {
      this.advanceToNextTurn();
    }

    return result;
  }

  // Check victory/defeat conditions
  private checkCombatEnd(): void {
    if (this.state.player.hp <= 0) {
      this.state.combatResult = 'defeat';
    } else if (this.state.enemies.every(e => e.hp <= 0)) {
      this.state.combatResult = 'victory';
    }
  }

  // Get current state for UI
  getState(): CombatState {
    return { ...this.state };
  }
}
```

---

## 7. Data Structures

### Complete Type Definitions

All interfaces defined in Section 3.1 should be placed in:

```
src/types/
├── index.ts           # Main export
├── character.ts       # Character, Enemy interfaces
├── combat.ts          # CombatState, Action interfaces
├── technique.ts       # Technique, Effect interfaces
├── item.ts            # Item, Loot interfaces
└── game.ts            # GameState, Progress interfaces
```

---

## 8. File Structure

### Target Project Structure

```
the-beggars-sect/
├── src/
│   ├── index.tsx                    # Entry point
│   │
│   ├── types/                       # TypeScript interfaces
│   │   ├── index.ts
│   │   ├── character.ts
│   │   ├── combat.ts
│   │   ├── technique.ts
│   │   ├── item.ts
│   │   └── game.ts
│   │
│   ├── data/                        # Static game data
│   │   ├── techniques.ts            # 15 techniques
│   │   ├── enemies.ts               # 11 enemies
│   │   ├── items.ts                 # Consumables, scrolls
│   │   └── stances.ts               # Stance definitions
│   │
│   ├── game/                        # Game logic
│   │   ├── state/
│   │   │   └── GameStore.ts         # State management
│   │   │
│   │   ├── combat/
│   │   │   ├── CombatEngine.ts      # Main combat loop
│   │   │   ├── TurnOrderManager.ts  # ATB system
│   │   │   ├── ActionExecutor.ts    # Action handling
│   │   │   ├── DamageCalculator.ts  # Damage formulas
│   │   │   ├── ChiManager.ts        # Chi system
│   │   │   ├── StanceManager.ts     # Stance effects
│   │   │   ├── ComboManager.ts      # Combo chains
│   │   │   └── EnemyAI.ts           # AI patterns
│   │   │
│   │   ├── progression/
│   │   │   └── MasteryTracker.ts    # Technique mastery
│   │   │
│   │   └── factories/
│   │       └── CharacterFactory.ts  # Create characters
│   │
│   ├── ui/                          # React/Ink UI
│   │   ├── App.tsx                  # Main app
│   │   │
│   │   ├── combat/
│   │   │   ├── CombatScreen.tsx     # Battle UI
│   │   │   ├── TurnOrderDisplay.tsx
│   │   │   ├── PlayerStatus.tsx
│   │   │   ├── EnemyPanel.tsx
│   │   │   ├── ActionMenu.tsx
│   │   │   └── CombatLog.tsx
│   │   │
│   │   ├── components/              # Shared components
│   │   │   ├── HealthBar.tsx
│   │   │   ├── ChiBar.tsx
│   │   │   └── StatusEffects.tsx
│   │   │
│   │   └── screens/                 # Non-combat screens
│   │       └── MainMenu.tsx
│   │
│   └── utils/                       # Helpers
│       ├── random.ts                # RNG helpers
│       └── formatters.ts            # Text formatting
│
├── docs/                            # Existing design docs
├── package.json
├── tsconfig.json
└── README.md
```

---

## 9. Dependencies

### Already in package.json

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "ink": "^4.4.1",
    "ink-text-input": "^5.0.1",
    "ink-select-input": "^5.0.0",
    "chalk": "^5.3.0",
    "boxen": "^7.1.1",
    "figlet": "^1.7.0"
  },
  "devDependencies": {
    "typescript": "^5.3.3",
    "tsx": "^4.7.0",
    "@types/react": "^18.2.0",
    "@types/node": "^20.0.0",
    "eslint": "^8.56.0"
  }
}
```

### May Need to Add

```json
{
  "dependencies": {
    "zustand": "^4.5.0"      // Optional: state management
  }
}
```

---

## 10. Testing Strategy

### Manual Testing Checklist

**Week 1 (Foundation):**
- [ ] Can create player character with correct stats
- [ ] Can create enemy from template
- [ ] Game state saves/loads correctly

**Week 2 (Combat Engine):**
- [ ] Turn order calculates correctly based on DEX
- [ ] All 7 actions execute properly
- [ ] Damage formula produces expected results
- [ ] Chi generates and spends correctly

**Week 3 (Techniques & Stances):**
- [ ] All 15 techniques load correctly
- [ ] Stance switching applies modifiers
- [ ] Mastery tracks and levels up
- [ ] Combos chain properly

**Week 4 (Integration):**
- [ ] Full combat loop works (player vs 1 enemy)
- [ ] Combat ends on victory/defeat
- [ ] Enemy AI makes sensible decisions
- [ ] UI displays all information

### Test Combat Scenario

```
Player: Li Wei (Flowing Stance)
HP: 100, Chi: 50, STR: 10, DEX: 10

Enemy: Street Punk
HP: 60, Chi: 20, STR: 8, DEX: 8

Expected:
1. Li Wei acts first (higher DEX)
2. Palm Strike deals ~8-12 damage
3. Enemy retaliates for ~6-10 damage
4. Combat continues until one side falls
```

---

## 11. Success Criteria

### Phase 2 Exit Criteria

**Core Engine Complete When:**

1. **Combat Loop Works**
   - Player can fight single enemy to victory or defeat
   - Turn order displays correctly
   - All 7 actions functional

2. **Damage System Works**
   - Formula matches COMBAT_SYSTEM.md
   - Criticals, stance bonuses, combo bonuses apply
   - Defense reduces damage

3. **Chi System Works**
   - Chi generates from actions
   - Techniques cost chi
   - Inverse chi generates on damage (Li Wei only)

4. **Stances Work**
   - Can switch between 3 stances
   - Stat modifiers apply correctly
   - Stance-locked techniques enforce restrictions

5. **Basic Enemy AI Works**
   - Enemies take sensible actions
   - Different patterns for different tiers

6. **UI Displays Everything**
   - Turn queue visible
   - HP/Chi bars
   - Action menu navigable
   - Combat log scrolls

### Phase 3 Ready When

All Phase 2 criteria met AND:
- Mastery system tracks usage
- Basic combo chains work
- Can fight all 8 regular enemies
- Combat feels responsive and fun

---

## Next Steps

1. **Review this plan** with Mito
2. **Start Phase 2A** - Create type definitions
3. **Build incrementally** - Test each component before moving on
4. **Document as we go** - Update this plan with learnings

---

**Document Status:** READY FOR IMPLEMENTATION
**Author:** Claude (Technical Officer)
**Date:** 2025-12-05
