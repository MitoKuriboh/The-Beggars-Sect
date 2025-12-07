# AAA Game Logic Architecture - Audit & Recommendations

**Date:** 2025-12-07
**Status:** Research Complete, Ready for Implementation
**Target:** src/game/ folder (~4,847 lines)

---

## Executive Summary

Following the successful AAA UI refactoring, this document provides comprehensive recommendations for elevating the game logic architecture to professional-grade quality.

**Current State:** MODERATE - Solid foundations with organic growth, needs architectural boundaries
**Target State:** AAA - Modular, extensible, maintainable, testable

**Key Findings:**
- 5+ code duplication patterns (HIGH priority)
- 20+ magic numbers hardcoded (CRITICAL priority)
- 5 separation of concerns violations (HIGH priority)
- Architecture patterns missing (Command, State Machine, Registry patterns)

---

## Research Summary

### Industry Best Practices Researched

1. **Entity Component System (ECS)** - Modern game architecture pattern
2. **Clean Architecture** - TypeScript separation of concerns
3. **Turn-Based Combat Patterns** - State machines, command pattern, stack machines
4. **State Management** - Singleton vs Service Locator vs Factory patterns
5. **AI Architecture** - FSM vs Behavior Trees for enemy AI

### Key Architectural Patterns Identified

**For Combat Systems:**
- State Machine Pattern for combat phases
- Command Pattern for action execution
- Modifier/Registry Pattern for effects and damage calculation
- Stack Machine for turn-based flow

**For AI:**
- Finite State Machines for simple enemy patterns (current implementation is close)
- Behavior Trees for complex boss behaviors (future enhancement)
- Condition Parser with validation

**For State Management:**
- Service Locator preferred over pure Singleton
- Dependency Injection for testability
- Observer Pattern for event-driven updates

---

## Critical Issues Found

### 1. Code Duplication (HIGH Priority)

**Issue 1.1: Status Effect Ticking**
- **Files:** CombatEngine.ts:297-308 (duplicated)
- **Impact:** Same tick-down logic for player and enemies
- **Fix:** Extract to `tickCharacterStatusEffects(character: Character): void`

**Issue 1.2: HP Condition Parsing**
- **Files:** CombatEngine.ts:529-543, AIController.ts:36-47, AIController.ts:107-118
- **Impact:** Three locations parse same regex for HP thresholds
- **Fix:** Create shared `ConditionParser` service

**Issue 1.3: Operator Comparisons**
- **Files:** CombatEngine.ts:536-540, AIController.ts:42-46, AIController.ts:113-117
- **Impact:** Identical switch statements 3+ times
- **Fix:** Extract to `evaluateComparison(operator, actual, threshold): boolean`

**Issue 1.4: Chi Cost Validation**
- **Files:** CombatEngine.ts:447-453, AIController.ts:258-263
- **Impact:** Duplicate chi affordability checks
- **Fix:** Move to TechniqueRegistry as `canAffordTechnique(actor, technique)`

**Issue 1.5: Turn Queue Simulation**
- **Files:** CombatEngine.ts:248-291 duplicates 178-217
- **Impact:** Preview simulation mirrors actual turn advancement
- **Fix:** Extract `simulateNextTurn(queue)` method

---

### 2. Magic Numbers (CRITICAL Priority)

All hardcoded values should be in centralized config:

**Combat Mechanics:**
```typescript
CombatEngine.ts:141  → 5 (turn variance)
CombatEngine.ts:150  → 5 (DEX speed divisor)
CombatEngine.ts:418  → 10 (basic attack power)
CombatEngine.ts:550  → 1 (min recoil HP)
CombatEngine.ts:618  → 0.3 (default stun chance)
CombatEngine.ts:666  → 0.8 (multi-hit damage scale)
CombatEngine.ts:763  → 0.5 (defending damage reduction)
CombatEngine.ts:766  → 0.01 (crit chance per DEX)
CombatEngine.ts:812  → 1.6 (max combo multiplier)
CombatEngine.ts:812  → 0.15 (combo mult per technique)
CombatEngine.ts:819  → 3 (chi refund per combo)
```

**Flee Mechanics:**
```typescript
CombatEngine.ts:699  → 0.5 (base flee chance)
CombatEngine.ts:702  → 0.05 (DEX advantage multiplier)
```

**Status Effect Defaults:**
```typescript
CombatEngine.ts:586  → 3 (buff duration)
CombatEngine.ts:604  → 3 (debuff duration)
CombatEngine.ts:650  → 1 (counter duration)
```

**TechniqueRegistry:**
- 168 technique definitions with hardcoded values
- No centralized balance system
- Makes scaling/balancing nearly impossible

**Recommended Solution:**
```typescript
// src/game/config/GameBalance.ts
export const GAME_BALANCE = {
  atb: {
    turnVariance: 5,
    dexSpeedDivisor: 5,
    turnThreshold: 100,
  },
  combat: {
    basicAttackPower: 10,
    minRecoilHp: 1,
    defendingDamageReduction: 0.5,
    critChancePerDex: 0.01,
  },
  statusEffects: {
    buffDefaultDuration: 3,
    debuffDefaultDuration: 3,
    counterDuration: 1,
    defaultStunChance: 0.3,
  },
  combos: {
    maxMultiplier: 1.6,
    multiplierPerTechnique: 0.15,
    chiRefundPerTechnique: 3,
  },
  flee: {
    baseChance: 0.5,
    dexAdvantageMultiplier: 0.05,
  },
  multiHit: {
    damageScale: 0.8,
  },
} as const;
```

---

### 3. Separation of Concerns (HIGH Priority)

**Issue 3.1: CombatEngine - Too Many Responsibilities (878 lines)**

**Current Responsibilities:**
1. ATB turn queue management
2. Action execution
3. Damage calculation
4. Status effect application
5. Effect resolution
6. Combo system
7. Combat logging
8. State management
9. AI integration

**Recommended Split:**
```typescript
// src/game/combat/systems/
├── CombatEngine.ts          // Orchestration only (~200 lines)
├── ATBSystem.ts             // Turn queue management (~300 lines)
├── DamageCalculator.ts      // Damage + modifiers (~150 lines)
├── EffectResolver.ts        // All effect types (~200 lines)
├── ComboSystem.ts           // Combo tracking (~100 lines)
└── CombatLogger.ts          // Logging (~50 lines)
```

**Issue 3.2: AIController - Condition Logic Tightly Coupled**
- 155 lines of condition parsing with 28+ hardcoded strings
- Violates Open/Closed Principle
- Adding new conditions requires modifying giant function

**Recommended Solution:**
```typescript
// src/game/ai/conditions/
interface Condition {
  evaluate(ctx: EvalContext): boolean;
}

class HPCondition implements Condition { ... }
class TurnCondition implements Condition { ... }
class StatusCondition implements Condition { ... }

const conditionRegistry = new Map<string, (str: string) => Condition>();
```

**Issue 3.3: AIController ↔ CombatEngine - Tight Coupling**
```typescript
// Current:
return AIController.selectAction(enemy, this.state.player, this.state);

// Recommended: Dependency Injection
class CombatEngine {
  constructor(
    private aiDecider: IAIDecider,  // Interface, not static class
    ...
  ) {}
}
```

**Issue 3.4: GameStore - Mixing Persistence & State (649 lines)**

**Current Responsibilities:**
1. In-memory state
2. File-based save/load
3. Settings persistence
4. Story sync
5. Subscriptions

**Recommended Split:**
```typescript
class GameState { ... }              // In-memory only
class SavePersistence { ... }        // File operations
class SettingsPersistence { ... }    // Settings only
class GameStore {                    // Orchestrator
  constructor(state, savePersistence, settingsPersistence) {}
}
```

**Issue 3.5: StoryEngine - Heavy GameStore Coupling**
```typescript
// Current (StoryEngine.ts:159):
jumpToScene(sceneId: string): StoryResult {
  GameStore.autoSave();  // Hard dependency!
  return this.processCurrentPosition();
}

// Recommended: Event emission
private onSceneTransition?: (scene: Scene) => void;

jumpToScene(sceneId: string): StoryResult {
  this.onSceneTransition?.(scene);  // Callback for orchestrator
  return this.processCurrentPosition();
}
```

---

### 4. Extensibility Issues (HIGH Priority)

**Issue 4.1: Adding New Techniques is Tedious**

**Current Process:**
1. Add to TECHNIQUES object in TechniqueRegistry.ts
2. Manually fill ALL 14 fields
3. No default values, must copy-paste everything

**1456 lines of technique definitions** - unmaintainable

**Recommended Solution:**
```typescript
// src/game/combat/builders/TechniqueBuilder.ts
const DEFAULT_TECHNIQUE: Partial<Technique> = {
  speed: 50,
  aspect: 'neutral',
  comboRole: 'none',
  effects: [],
  masteryBonuses: {},
  unlockedByDefault: false,
  unlockChapter: 'prologue',
};

const createTechnique = (overrides: PartialTechnique): Technique => ({
  ...DEFAULT_TECHNIQUE,
  ...overrides,
});

// Usage:
const palmStrike = createTechnique({
  id: 'palm-strike',
  name: 'Palm Strike',
  power: 10,
  chiCost: 5,
  // Only overrides needed
});
```

**Issue 4.2: Adding Status Effects Requires Code Changes**

**Current:** Must modify switch statements in 2-3 places
**Recommended:** Effect registry pattern

```typescript
// src/game/combat/effects/EffectRegistry.ts
type EffectHandler = (ctx: EffectContext) => void;

class EffectRegistry {
  private handlers = new Map<string, EffectHandler>();

  register(type: string, handler: EffectHandler) {
    this.handlers.set(type, handler);
  }

  apply(effect: Effect, ctx: EffectContext) {
    const handler = this.handlers.get(effect.type);
    if (!handler) throw new Error(`Unknown effect: ${effect.type}`);
    handler(ctx);
  }
}

// Register built-in effects
effectRegistry.register('damage', handleDamage);
effectRegistry.register('heal', handleHeal);

// Easy to add custom effects later
effectRegistry.register('poison', handlePoison);
```

**Issue 4.3: Difficulty Scaling Limited**

**Current:**
- Only scales at enemy creation
- Only HP scaled, not damage output
- No skill/behavior scaling

**Recommended:**
```typescript
// src/game/combat/scaling/DifficultyModifier.ts
class DifficultyModifier {
  applyToCombat(state: CombatState, chapter: number) {
    const scaling = this.getScalingFactors(chapter);

    state.enemies.forEach(enemy => {
      enemy.stats = this.scaleStats(enemy.stats, scaling);
      enemy.techniques = this.enhanceTechniques(enemy.techniques, scaling);
      enemy.aiPattern = this.adjustAI(enemy.aiPattern, chapter);
    });
  }
}
```

---

### 5. Missing Architecture Patterns (MEDIUM Priority)

**Pattern 5.1: Command Pattern NOT Used**

**Current:**
```typescript
switch (action.type) {
  case 'attack': result = this.executeBasicAttack(action); break;
  case 'technique': result = this.executeTechnique(action); break;
  // ...
}
```

**Recommended:**
```typescript
// src/game/combat/commands/
interface CombatCommand {
  execute(engine: CombatEngine): ActionResult;
  canExecute(): boolean;
  validate(): ValidationResult;
  undo?(): void;  // For future replay/undo systems
}

class AttackCommand implements CombatCommand { ... }
class TechniqueCommand implements CombatCommand { ... }
class FleeCommand implements CombatCommand { ... }

// Usage:
const command = commandFactory.create(action);
if (command.canExecute()) {
  const result = command.execute(engine);
}
```

**Benefits:**
- Queue actions for turn resolution
- Validation before execution
- Replay/undo support (for tutorials)
- Testing without side effects

**Pattern 5.2: State Machine NOT Used**

**Current:** Implicit state via `isPlayerTurn` flag and `combatResult` field

**Recommended:**
```typescript
// src/game/combat/state/CombatStateMachine.ts
type CombatPhase =
  | { type: 'waiting'; activeCharacter: Character }
  | { type: 'player-turn'; options: CombatAction[] }
  | { type: 'enemy-turn'; enemy: Enemy }
  | { type: 'resolving-action'; action: CombatAction }
  | { type: 'combat-end'; winner: 'player' | 'enemies'; reason: string }

class CombatStateMachine {
  private phase: CombatPhase;

  transition(newPhase: CombatPhase): void {
    this.validateTransition(this.phase, newPhase);
    this.phase = newPhase;
    this.onPhaseChange?.(newPhase);
  }

  private validateTransition(from: CombatPhase, to: CombatPhase): void {
    // Ensure only valid transitions happen
  }
}
```

**Benefits:**
- Explicit state representation
- Invalid transitions caught at compile time
- Easy to add new phases (e.g., 'status-effect-resolution')
- UI can react to phase changes

**Pattern 5.3: Observer Pattern - Partially Implemented**

**Current Issue:**
```typescript
// GameStore.ts
private listeners: Set<() => void> = new Set();
```
All listeners get same notification - no way to listen for specific events

**Recommended:**
```typescript
// src/game/events/GameEventBus.ts
type GameEvent =
  | { type: 'player-hp-changed'; newHp: number; maxHp: number }
  | { type: 'enemy-defeated'; enemyId: string; enemy: Enemy }
  | { type: 'combo-broken'; comboLength: number }
  | { type: 'technique-used'; techniqueId: string; actor: Character }
  | { type: 'status-effect-applied'; effect: StatusEffect; target: Character }
  | { type: 'chapter-completed'; chapter: string }

class GameEventBus {
  private handlers = new Map<string, Set<(event: any) => void>>();

  on<T extends GameEvent>(type: T['type'], handler: (event: T) => void): () => void {
    if (!this.handlers.has(type)) {
      this.handlers.set(type, new Set());
    }
    this.handlers.get(type)!.add(handler);

    // Return unsubscribe function
    return () => this.handlers.get(type)!.delete(handler);
  }

  emit<T extends GameEvent>(event: T): void {
    const handlers = this.handlers.get(event.type);
    handlers?.forEach(handler => handler(event));
  }
}

// Usage:
eventBus.on('player-hp-changed', (event) => {
  if (event.newHp / event.maxHp < 0.3) {
    // Low HP warning
  }
});
```

**Benefits:**
- Type-safe event handling
- UI can react to specific game events
- Achievements/analytics easy to add
- Decouples systems (combat doesn't need to know about UI)

---

### 6. Type Safety Issues (MEDIUM Priority)

**Issue 6.1: String-Based Type Discrimination**

**Current:**
```typescript
// CombatEngine.ts:546
switch(effect.type) {
  case 'damage': ...
  case 'heal': ...
  case 'buff-attack': ...
  // Easy to misspell, no autocomplete
}
```

**Recommended:**
```typescript
// src/types/effects.ts
type Effect =
  | { type: 'damage'; value: number; damageType?: string }
  | { type: 'heal'; value: number }
  | { type: 'buff-attack'; value: number; duration: number }
  | { type: 'debuff-defense'; value: number; duration: number }
  | { type: 'status'; statusEffect: StatusEffect }

// Now type-safe:
function applyEffect(effect: Effect, target: Character) {
  switch (effect.type) {
    case 'damage':
      target.hp -= effect.value;  // TypeScript knows 'value' exists
      break;
    case 'buff-attack':
      // TypeScript knows 'duration' exists here
      target.statusEffects.push({ type: 'attack-up', duration: effect.duration });
      break;
  }
}
```

**Issue 6.2: Missing Runtime Validation**

**SaveManager.ts:192:**
```typescript
const data = fs.readFileSync(metaPath, 'utf-8');
return JSON.parse(data);  // Could throw if corrupted
```

**Recommended:**
```typescript
import { z } from 'zod';

const SaveMetadataSchema = z.object({
  slot: z.number(),
  timestamp: z.number(),
  chapter: z.string(),
  // ... all fields
});

try {
  const data = fs.readFileSync(metaPath, 'utf-8');
  const parsed = JSON.parse(data);
  return SaveMetadataSchema.parse(parsed);
} catch (error) {
  throw new Error('Corrupted save file');
}
```

---

## Damage Calculation Complexity (MEDIUM Priority)

**Current Issue:**
```typescript
// CombatEngine.ts:748-791
let damage = basePower + attackStat;
damage *= attackerStanceMod;
damage *= critMod;
damage *= comboMod;
damage *= variance;
const defense = defenseStat * defenderStanceMod * defendMod;
damage = Math.max(this.config.minDamage, damage - defense * 0.5);
```

**Problems:**
1. Hard to understand (7 sequential multiplications)
2. Order matters but not documented
3. Can't add new modifiers (weather, terrain) without changing method
4. Defense 0.5x is magic number

**Recommended Solution:**
```typescript
// src/game/combat/damage/DamageCalculator.ts
interface DamageModifier {
  name: string;
  priority: number;  // Lower = earlier in chain
  apply(damage: number, context: DamageContext): number;
}

class DamageCalculator {
  private modifiers: DamageModifier[] = [];

  addModifier(modifier: DamageModifier): void {
    this.modifiers.push(modifier);
    this.modifiers.sort((a, b) => a.priority - b.priority);
  }

  calculate(base: number, context: DamageContext): number {
    return this.modifiers.reduce((dmg, mod) => mod.apply(dmg, context), base);
  }
}

// Built-in modifiers:
const stanceModifier: DamageModifier = {
  name: 'stance',
  priority: 1,
  apply: (dmg, ctx) => dmg * ctx.attacker.stance.attackMod,
};

const critModifier: DamageModifier = {
  name: 'critical',
  priority: 2,
  apply: (dmg, ctx) => ctx.isCrit ? dmg * 1.5 : dmg,
};

const comboModifier: DamageModifier = {
  name: 'combo',
  priority: 3,
  apply: (dmg, ctx) => dmg * ctx.comboMultiplier,
};

// Easy to add new modifiers:
const weatherModifier: DamageModifier = {
  name: 'weather',
  priority: 4,
  apply: (dmg, ctx) => ctx.weather === 'storm' ? dmg * 1.2 : dmg,
};

damageCalc.addModifier(stanceModifier);
damageCalc.addModifier(critModifier);
damageCalc.addModifier(comboModifier);
damageCalc.addModifier(weatherModifier);  // Future enhancement
```

**Benefits:**
- Modifiers are testable in isolation
- Easy to add/remove/reorder
- Clear priority system
- Can be configured per difficulty/chapter

---

## Refactoring Roadmap

### Phase 1: Foundation (1-2 days) - Quick Wins

**Goal:** Extract duplicated code and centralize constants

**Tasks:**
1. ✅ Create `src/game/config/GameBalance.ts` with all 20+ magic numbers
2. ✅ Create `src/game/utils/StatusEffectUtils.ts` - tick status effects
3. ✅ Create `src/game/utils/ConditionParser.ts` - parse HP conditions
4. ✅ Create `src/game/utils/ComparisonEvaluator.ts` - operator comparisons
5. ✅ Move chi validation to TechniqueRegistry

**Files to Modify:**
- CombatEngine.ts (replace magic numbers, use utils)
- AIController.ts (use ConditionParser)
- TechniqueRegistry.ts (add canAffordTechnique)

**Expected Impact:**
- Remove 20+ magic numbers
- Eliminate 5+ code duplications
- Centralize balance tuning

---

### Phase 2: Separation of Concerns (2-3 days)

**Goal:** Break large classes into focused modules

**Tasks:**
1. ✅ Split CombatEngine into:
   - `CombatEngine.ts` (orchestration, ~200 lines)
   - `systems/ATBSystem.ts` (turn queue, ~300 lines)
   - `systems/DamageCalculator.ts` (damage, ~150 lines)
   - `systems/EffectResolver.ts` (effects, ~200 lines)
   - `systems/ComboSystem.ts` (combos, ~100 lines)
   - `systems/CombatLogger.ts` (logging, ~50 lines)

2. ✅ Create Effect Registry:
   - `effects/EffectRegistry.ts` (registry pattern)
   - `effects/handlers/` (individual effect handlers)

3. ✅ Create Technique Builder:
   - `builders/TechniqueBuilder.ts` (reduce boilerplate)

**Files to Create:**
```
src/game/
├── combat/
│   ├── systems/
│   │   ├── ATBSystem.ts
│   │   ├── DamageCalculator.ts
│   │   ├── EffectResolver.ts
│   │   ├── ComboSystem.ts
│   │   └── CombatLogger.ts
│   ├── effects/
│   │   ├── EffectRegistry.ts
│   │   └── handlers/
│   │       ├── DamageHandler.ts
│   │       ├── HealHandler.ts
│   │       ├── BuffHandler.ts
│   │       └── StatusHandler.ts
│   └── builders/
│       └── TechniqueBuilder.ts
```

**Expected Impact:**
- CombatEngine.ts: 878 lines → ~200 lines
- Each system testable in isolation
- Easy to swap implementations
- TechniqueRegistry: 1456 lines → ~800 lines (with builder)

---

### Phase 3: Dependency Injection & Events (2-3 days)

**Goal:** Decouple systems, enable testing and flexibility

**Tasks:**
1. ✅ Create GameEventBus:
   - `events/GameEventBus.ts`
   - `events/GameEvent.ts` (type definitions)

2. ✅ Dependency inject AI into CombatEngine:
   - `ai/IAIDecider.ts` (interface)
   - `ai/PatternAIDecider.ts` (current implementation)
   - CombatEngine constructor accepts `IAIDecider`

3. ✅ Split GameStore:
   - `state/GameState.ts` (in-memory only)
   - `state/SavePersistence.ts` (file operations)
   - `state/SettingsPersistence.ts` (settings)
   - `state/GameStore.ts` (orchestrator)

4. ✅ Replace StoryEngine.autoSave() with event:
   - Emit `'scene-transition'` event
   - Orchestrator listens and calls autoSave

**Files to Create:**
```
src/game/
├── events/
│   ├── GameEventBus.ts
│   └── GameEvent.ts
├── ai/
│   ├── IAIDecider.ts
│   └── PatternAIDecider.ts
└── state/
    ├── GameState.ts
    ├── SavePersistence.ts
    └── SettingsPersistence.ts
```

**Expected Impact:**
- GameStore.ts: 649 lines → ~300 lines
- All systems testable without GameStore
- Event-driven architecture enables achievements, analytics
- AI swappable (for testing, boss behaviors, difficulty modes)

---

### Phase 4: Advanced Patterns (2-3 days) - Optional

**Goal:** Implement Command and State Machine patterns

**Tasks:**
1. ✅ Implement Command Pattern:
   - `combat/commands/ICombatCommand.ts`
   - `combat/commands/AttackCommand.ts`
   - `combat/commands/TechniqueCommand.ts`
   - `combat/commands/FleeCommand.ts`
   - `combat/commands/CommandFactory.ts`

2. ✅ Implement Combat State Machine:
   - `combat/state/CombatStateMachine.ts`
   - `combat/state/CombatPhase.ts` (discriminated union)

3. ✅ Implement Condition Registry:
   - `ai/conditions/ICondition.ts`
   - `ai/conditions/HPCondition.ts`
   - `ai/conditions/TurnCondition.ts`
   - `ai/conditions/ConditionFactory.ts`

4. ✅ Add AI Validation:
   - `ai/validation/AIPatternValidator.ts`
   - Validate enemy AI at creation time

**Files to Create:**
```
src/game/
├── combat/
│   ├── commands/
│   │   ├── ICombatCommand.ts
│   │   ├── AttackCommand.ts
│   │   ├── TechniqueCommand.ts
│   │   └── CommandFactory.ts
│   └── state/
│       ├── CombatStateMachine.ts
│       └── CombatPhase.ts
└── ai/
    ├── conditions/
    │   ├── ICondition.ts
    │   ├── HPCondition.ts
    │   └── ConditionFactory.ts
    └── validation/
        └── AIPatternValidator.ts
```

**Expected Impact:**
- Replay/undo support possible
- Invalid AI patterns caught at load time
- Explicit state management
- Future: Behavior Trees for complex bosses

---

### Phase 5: Type Safety & Validation (1-2 days)

**Goal:** Eliminate runtime errors with types and validation

**Tasks:**
1. ✅ Convert effect system to discriminated unions
2. ✅ Add runtime validation for save files (zod)
3. ✅ Add null checks and type guards where missing
4. ✅ Enable strict TypeScript mode

**Expected Impact:**
- Fewer runtime crashes
- Better autocomplete
- Corrupted saves handled gracefully

---

## Implementation Priority

Based on research and audit findings:

### Must Do (Critical)
1. **Extract GameBalance config** - Fixes 20+ magic numbers instantly
2. **Extract duplicated utilities** - Fixes 5+ duplications
3. **Split CombatEngine** - Reduces complexity from 878 lines

### Should Do (High Value)
4. **Effect Registry pattern** - Enables extensibility
5. **Technique Builder** - Reduces 1456-line boilerplate
6. **Dependency Injection** - Enables testing
7. **GameEventBus** - Decouples systems

### Nice to Have (Future Enhancement)
8. **Command Pattern** - Replay/undo support
9. **State Machine** - Explicit phases
10. **Condition Registry** - AI extensibility
11. **Type Safety** - Runtime validation

---

## Before/After Comparison

### Before (Current State)

**CombatEngine.ts:**
```typescript
// 878 lines doing everything:
class CombatEngine {
  // ATB logic
  private initializeTurnQueue() { ... }
  private advanceToNextTurn() { ... }

  // Damage calculation
  private calculateDamage() {
    let damage = basePower + attackStat;
    damage *= attackerStanceMod;
    damage *= critMod;
    // ... 40+ lines of modifiers
    damage = Math.max(5, damage - defense * 0.5); // Magic numbers!
  }

  // Effect application
  private applyEffects() {
    switch(effect.type) {
      case 'damage': ... // 150 lines of cases
      case 'heal': ...
      // ... 9+ effect types
    }
  }

  // Combo tracking
  private updateCombo() { ... }

  // Logging
  private addLog() { ... }

  // AI integration
  private executeEnemyTurn() {
    return AIController.selectAction(...); // Static coupling!
  }
}
```

**Issues:**
- One class does 9 things
- 20+ magic numbers
- Static coupling to AI
- Hard to test
- Hard to extend

### After (AAA Architecture)

**CombatEngine.ts (Orchestrator):**
```typescript
// ~200 lines - orchestration only
class CombatEngine {
  constructor(
    private atbSystem: ATBSystem,
    private damageCalc: DamageCalculator,
    private effectResolver: EffectResolver,
    private comboSystem: ComboSystem,
    private logger: CombatLogger,
    private aiDecider: IAIDecider,
    private eventBus: GameEventBus
  ) {}

  executeAction(action: CombatAction): ActionResult {
    // Orchestrate systems
    const result = this.resolveAction(action);
    this.logger.log(result);
    this.eventBus.emit({ type: 'action-executed', action, result });
    return result;
  }

  private resolveAction(action: CombatAction): ActionResult {
    switch (action.type) {
      case 'attack':
        return this.executeAttack(action);
      case 'technique':
        return this.executeTechnique(action);
      // ...
    }
  }

  private executeTechnique(action: TechniqueAction): ActionResult {
    const damage = this.damageCalc.calculate(action.technique.power, {
      attacker: action.actor,
      defender: action.target,
      isCrit: this.rollCrit(action.actor),
      comboMultiplier: this.comboSystem.getMultiplier(),
    });

    this.effectResolver.apply(action.technique.effects, action.target);
    this.comboSystem.addTechnique(action.technique);

    return { damage, /* ... */ };
  }
}
```

**ATBSystem.ts:**
```typescript
// ~300 lines - turn queue only
class ATBSystem {
  constructor(
    private config: ATBConfig = GAME_BALANCE.atb
  ) {}

  initializeTurnQueue(characters: Character[]): TurnQueueEntry[] {
    return characters.map(char => ({
      character: char,
      turnValue: this.getInitialTurnValue(char),
    }));
  }

  private getInitialTurnValue(char: Character): number {
    return Math.floor(Math.random() * this.config.turnVariance); // No magic numbers!
  }

  advanceToNextTurn(queue: TurnQueueEntry[]): {
    activeCharacter: Character;
    ticksElapsed: number;
  } {
    // Pure ATB logic
  }
}
```

**DamageCalculator.ts:**
```typescript
// ~150 lines - damage only
class DamageCalculator {
  private modifiers: DamageModifier[] = [];

  constructor() {
    this.registerDefaultModifiers();
  }

  calculate(basePower: number, context: DamageContext): number {
    let damage = basePower + context.attacker.attack;

    // Apply modifiers in priority order
    for (const modifier of this.modifiers) {
      damage = modifier.apply(damage, context);
    }

    const defense = this.calculateDefense(context.defender);
    damage = Math.max(
      GAME_BALANCE.combat.minDamage,
      damage - defense * GAME_BALANCE.combat.defenseReduction
    );

    return Math.floor(damage);
  }

  addModifier(modifier: DamageModifier): void {
    this.modifiers.push(modifier);
    this.modifiers.sort((a, b) => a.priority - b.priority);
  }
}
```

**EffectRegistry.ts:**
```typescript
// ~100 lines - effect registry
class EffectRegistry {
  private handlers = new Map<string, EffectHandler>();

  register(type: string, handler: EffectHandler): void {
    this.handlers.set(type, handler);
  }

  apply(effect: Effect, target: Character): void {
    const handler = this.handlers.get(effect.type);
    if (!handler) {
      throw new Error(`Unknown effect type: ${effect.type}`);
    }
    handler(effect, target);
  }
}

// Register built-in effects
effectRegistry.register('damage', (effect, target) => {
  target.hp = Math.max(0, target.hp - effect.value);
});

effectRegistry.register('heal', (effect, target) => {
  target.hp = Math.min(target.maxHp, target.hp + effect.value);
});

// Easy to add custom effects!
effectRegistry.register('poison', (effect, target) => {
  target.statusEffects.push({
    type: 'poison',
    duration: effect.duration,
    damagePerTurn: effect.value,
  });
});
```

**GameEventBus.ts:**
```typescript
// ~80 lines - event system
type GameEvent =
  | { type: 'action-executed'; action: CombatAction; result: ActionResult }
  | { type: 'player-hp-changed'; newHp: number; maxHp: number }
  | { type: 'combo-broken'; comboLength: number }
  | { type: 'enemy-defeated'; enemy: Enemy }

class GameEventBus {
  private handlers = new Map<string, Set<(event: any) => void>>();

  on<T extends GameEvent>(type: T['type'], handler: (event: T) => void): () => void {
    if (!this.handlers.has(type)) {
      this.handlers.set(type, new Set());
    }
    this.handlers.get(type)!.add(handler);
    return () => this.handlers.get(type)!.delete(handler);
  }

  emit<T extends GameEvent>(event: T): void {
    this.handlers.get(event.type)?.forEach(h => h(event));
  }
}

// Usage:
eventBus.on('player-hp-changed', (event) => {
  if (event.newHp / event.maxHp < 0.3) {
    // Trigger low HP warning UI
  }
});

eventBus.on('enemy-defeated', (event) => {
  // Track kills for achievements
});
```

**Benefits:**
- Each class has ONE responsibility
- Easy to test in isolation
- Easy to extend (add modifiers, effects, events)
- No magic numbers (all in GAME_BALANCE)
- Dependency injection enables swapping implementations
- Event-driven architecture enables features (achievements, analytics)

---

## Testing Strategy

With the new architecture, testing becomes straightforward:

### Unit Tests (Isolated)

```typescript
// DamageCalculator.test.ts
describe('DamageCalculator', () => {
  it('applies stance modifier correctly', () => {
    const calc = new DamageCalculator();
    const damage = calc.calculate(100, {
      attacker: { attack: 50, stance: { attackMod: 1.2 } },
      defender: { defense: 20 },
      isCrit: false,
      comboMultiplier: 1.0,
    });

    // Expected: (100 + 50) * 1.2 - defense = ...
    expect(damage).toBe(expectedValue);
  });
});

// ATBSystem.test.ts
describe('ATBSystem', () => {
  it('advances turn queue correctly', () => {
    const atb = new ATBSystem();
    const queue = atb.initializeTurnQueue([fastChar, slowChar]);
    const { activeCharacter } = atb.advanceToNextTurn(queue);

    expect(activeCharacter).toBe(fastChar); // Faster character goes first
  });
});
```

### Integration Tests

```typescript
// CombatEngine.integration.test.ts
describe('CombatEngine Integration', () => {
  it('executes full attack sequence', () => {
    const engine = new CombatEngine(
      new ATBSystem(),
      new DamageCalculator(),
      new EffectResolver(effectRegistry),
      new ComboSystem(),
      new CombatLogger(),
      new MockAIDecider(),
      new GameEventBus()
    );

    const result = engine.executeAction({
      type: 'attack',
      actor: player,
      target: enemy,
    });

    expect(result.damage).toBeGreaterThan(0);
    expect(enemy.hp).toBeLessThan(enemy.maxHp);
  });
});
```

---

## Research Sources

### Entity Component System (ECS)
- [Entity component system - Wikipedia](https://en.wikipedia.org/wiki/Entity_component_system)
- [Understanding Modern Game Engine Architecture with ECS | ColumbaEngine](https://columbaengine.org/blog/ecs-architecture-with-ecs/)
- [The Entity-Component-System Design Pattern](https://www.umlboard.com/design-patterns/entity-component-system.html)
- [GitHub - SanderMertens/ecs-faq](https://github.com/SanderMertens/ecs-faq)
- [The Entity-Component-System - An awesome game-design pattern in C++](https://www.gamedeveloper.com/design/the-entity-component-system---an-awesome-game-design-pattern-in-c-part-1-)

### Clean Architecture & TypeScript
- [Building Robust Clean Architecture with TypeScript | Medium](https://medium.com/@deivisonisidoro_94304/revolutionizing-software-development-unveiling-the-power-of-clean-architecture-with-typescript-5ee968357d35)
- [TypeScript Clean Architecture Example: Best Practices](https://www.webdevtutor.net/blog/typescript-clean-architecture-example)
- [Separation Of Concerns | Architectural Principles](https://www.swiftorial.com/tutorials/software_architecture/software_architecture/architectural_principles/separation_of_concerns/)
- [Clean Architecture in Node.js with TypeScript](https://www.xjavascript.com/blog/clean-architecture-node-js-typescript/)
- [Implementing Clean Architecture with TypeScript - DEV](https://dev.to/dvorlandi/implementing-clean-architecture-with-typescript-3jpc)

### Combat System Architecture
- [Help with software design of a turn based combat system - Stack Exchange](https://gamedev.stackexchange.com/questions/197988/help-with-software-design-of-a-turn-based-combat-system-using-sdl2)
- [Turn-based JRPG battle system architecture resources - Stack Exchange](https://gamedev.stackexchange.com/questions/28376/turn-based-jrpg-battle-system-architecture-resources)
- [How to design turn-based combat system | Game World Observer](https://gameworldobserver.com/2022/12/02/how-to-design-turn-based-combat-system-untamed-tactics)
- [Building an RPG Battle System - Part 1](https://www.gamedeveloper.com/design/building-an-rpg-battle-system---part-1)
- [A Turn-Based Game Loop](https://journal.stuffwithstuff.com/2014/07/15/a-turn-based-game-loop/)

### State Management Patterns
- [Service Locator · Game Programming Patterns](https://gameprogrammingpatterns.com/service-locator.html)
- [Service Locator vs Singleton Pattern – SiloWorks](https://siloworks.net/service-locator-vs-singleton-pattern/)
- [Singleton Pattern in Game Development](https://www.linkedin.com/advice/1/how-do-you-use-singleton-pattern-game-development)
- [Singleton · Game Programming Patterns](https://gameprogrammingpatterns.com/singleton.html)
- [Better than Singletons: The Service Locator Pattern](https://abstractexpr.com/2023/04/25/better-than-singletons-the-service-locator-pattern/)

### AI Architecture (FSM vs Behavior Trees)
- [Behaviour Trees versus State Machines](https://queenofsquiggles.github.io/guides/fsm-vs-bt/)
- [Finite State Machine and Behavior Tree Fusion | Medium](https://medium.com/@abdullahahmetaskin/finite-state-machine-and-behavior-tree-fusion-3fcce33566)
- [AI Patterns: State Machines and Behavior Trees](https://softwarepatternslexicon.com/patterns-lua/10/9/)
- [Tech Breakdown: AI with Finite State Machines](https://blog.littlepolygon.com/posts/fsm/)
- [Behavior Trees or Finite State Machines - Opsive](https://opsive.com/support/documentation/behavior-designer/behavior-trees-or-finite-state-machines/)

---

## Next Steps

Ready to implement? Start with **Phase 1: Foundation (Quick Wins)**.

**Recommended Command:**
```bash
# Start with extracting GameBalance config
# This fixes 20+ magic numbers in one go
```

See `GAME_LOGIC_REFACTORING_CHECKLIST.md` for implementation tracking.

---

**Last Updated:** 2025-12-07
**Status:** Ready for Implementation
**Estimated Effort:** 8-12 days for all phases
