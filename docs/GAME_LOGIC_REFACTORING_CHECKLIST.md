# Game Logic Refactoring - Implementation Checklist

**Last Updated:** 2025-12-07
**Status:** Ready to Begin
**See:** AAA_GAME_LOGIC_ARCHITECTURE.md for full details

---

## Phase 1: Foundation (Quick Wins) ✅ COMPLETE

**Estimated Time:** 1-2 days
**Goal:** Extract duplicated code and centralize constants
**Completed:** 2025-12-07

### Tasks

- [x] **1.1 Create GameBalance Config**
  - [x] Create `src/game/config/GameBalance.ts` (327 lines)
  - [x] Extract 20+ magic numbers from CombatEngine
  - [x] Extract magic numbers from TechniqueRegistry
  - [x] Export as const object
  - [ ] Update CombatEngine to use GAME_BALANCE (Phase 2)
  - [ ] Test: Verify combat still works (Phase 2)

- [x] **1.2 Create StatusEffectUtils**
  - [x] Create `src/game/utils/StatusEffectUtils.ts` (140 lines)
  - [x] Extract `tickCharacterStatusEffects(character: Character): void`
  - [ ] Update CombatEngine.ts:297-308 to use utility (Phase 2)
  - [ ] Test: Verify status effects tick correctly (Phase 2)

- [x] **1.3 Create ConditionParser**
  - [x] Create `src/game/utils/ConditionParser.ts` (140 lines)
  - [x] Extract HP condition parsing (regex + evaluation)
  - [ ] Update CombatEngine.ts:529-543 to use parser (Phase 2)
  - [ ] Update AIController.ts:36-47 to use parser (Phase 2)
  - [ ] Update AIController.ts:107-118 to use parser (Phase 2)
  - [ ] Test: Verify AI conditions work (Phase 2)

- [x] **1.4 Create ComparisonEvaluator**
  - [x] Create `src/game/utils/ComparisonEvaluator.ts` (150 lines)
  - [x] Extract operator switch statements
  - [ ] Update CombatEngine.ts:536-540 to use evaluator (Phase 2)
  - [ ] Update AIController.ts:42-46 to use evaluator (Phase 2)
  - [ ] Update AIController.ts:113-117 to use evaluator (Phase 2)
  - [ ] Test: Verify comparisons work (Phase 2)

- [x] **1.5 Create Utility Exports**
  - [x] Create `src/game/utils/index.ts` - utility exports
  - [x] Create `src/game/config/index.ts` - config exports
  - [x] Build passes with new modules

**Exit Criteria:**
- ✅ All magic numbers in centralized config
- ✅ No code duplication in utilities
- ✅ Build passes
- ✅ Utilities created and exported

**Utilities Applied:**
- [x] CombatEngine.ts - Uses GAME_BALANCE, StatusEffectUtils, ConditionParser (Phase 2A)
- [x] AIController.ts - Uses ConditionParser, ComparisonEvaluator (Phase 2B)
- [ ] TechniqueRegistry.ts - Could use TECHNIQUE_DEFAULTS (Future)
- [ ] CharacterFactory.ts - Could use DIFFICULTY_CONFIG (Future)

---

## Phase 2: Separation of Concerns ⏳

**Estimated Time:** 2-3 days
**Goal:** Break large classes into focused modules

### Tasks

- [ ] **2.1 Create Combat Systems Structure**
  - [ ] Create `src/game/combat/systems/` directory
  - [ ] Create `systems/ATBSystem.ts` (300 lines)
    - [ ] Extract turn queue initialization
    - [ ] Extract turn advancement logic
    - [ ] Extract turn speed calculation
    - [ ] Extract turn order preview
  - [ ] Create `systems/DamageCalculator.ts` (150 lines)
    - [ ] Extract damage calculation logic
    - [ ] Extract modifier application
    - [ ] Extract defense calculation
  - [ ] Create `systems/EffectResolver.ts` (200 lines)
    - [ ] Extract effect application logic
    - [ ] Extract status effect handling
  - [ ] Create `systems/ComboSystem.ts` (100 lines)
    - [ ] Extract combo tracking
    - [ ] Extract combo multiplier calculation
    - [ ] Extract combo breaking
  - [ ] Create `systems/CombatLogger.ts` (50 lines)
    - [ ] Extract logging functionality
  - [ ] Update CombatEngine.ts to orchestrate systems
  - [ ] Test: Full combat flow works

- [ ] **2.2 Create Effect Registry**
  - [ ] Create `src/game/combat/effects/` directory
  - [ ] Create `effects/EffectRegistry.ts`
  - [ ] Create `effects/handlers/` directory
  - [ ] Create individual effect handlers:
    - [ ] `handlers/DamageHandler.ts`
    - [ ] `handlers/HealHandler.ts`
    - [ ] `handlers/BuffHandler.ts`
    - [ ] `handlers/DebuffHandler.ts`
    - [ ] `handlers/StatusHandler.ts`
  - [ ] Register all built-in effects
  - [ ] Update EffectResolver to use registry
  - [ ] Test: All effect types work

- [ ] **2.3 Create Technique Builder**
  - [ ] Create `src/game/combat/builders/` directory
  - [ ] Create `builders/TechniqueBuilder.ts`
  - [ ] Define DEFAULT_TECHNIQUE template
  - [ ] Create `createTechnique(overrides)` function
  - [ ] Refactor TechniqueRegistry to use builder
  - [ ] Test: All techniques still loadable

**Exit Criteria:**
- ✅ CombatEngine.ts reduced from 878 → ~200 lines
- ✅ Each system testable in isolation
- ✅ TechniqueRegistry reduced by ~40%

---

## Phase 3: Dependency Injection & Events ⏳

**Estimated Time:** 2-3 days
**Goal:** Decouple systems, enable testing

### Tasks

- [ ] **3.1 Create Event System**
  - [ ] Create `src/game/events/` directory
  - [ ] Create `events/GameEvent.ts` (type definitions)
  - [ ] Create `events/GameEventBus.ts`
  - [ ] Implement type-safe `on()` method
  - [ ] Implement `emit()` method
  - [ ] Test: Event publishing works

- [ ] **3.2 Dependency Inject AI**
  - [ ] Create `src/game/ai/` directory
  - [ ] Create `ai/IAIDecider.ts` interface
  - [ ] Create `ai/PatternAIDecider.ts` (move current AIController logic)
  - [ ] Update CombatEngine constructor to accept IAIDecider
  - [ ] Update CombatEngine.executeEnemyTurn to use injected AI
  - [ ] Test: AI still functions

- [ ] **3.3 Split GameStore**
  - [ ] Create `state/GameState.ts` (in-memory state only)
  - [ ] Create `state/SavePersistence.ts` (file operations)
  - [ ] Create `state/SettingsPersistence.ts` (settings)
  - [ ] Refactor GameStore.ts to orchestrate
  - [ ] Update all GameStore consumers
  - [ ] Test: Save/load still works

- [ ] **3.4 Replace StoryEngine Coupling**
  - [ ] Add `onSceneTransition` callback to StoryEngine constructor
  - [ ] Replace `GameStore.autoSave()` calls with callback
  - [ ] Update orchestrator to listen and auto-save
  - [ ] Test: Auto-save still triggers

**Exit Criteria:**
- ✅ Event-driven architecture working
- ✅ AI decoupled from CombatEngine
- ✅ GameStore split into focused modules
- ✅ StoryEngine testable without GameStore

---

## Phase 4: Advanced Patterns (Optional) ⏳

**Estimated Time:** 2-3 days
**Goal:** Implement Command and State Machine patterns

### Tasks

- [ ] **4.1 Implement Command Pattern**
  - [ ] Create `src/game/combat/commands/` directory
  - [ ] Create `commands/ICombatCommand.ts` interface
  - [ ] Create `commands/AttackCommand.ts`
  - [ ] Create `commands/TechniqueCommand.ts`
  - [ ] Create `commands/FleeCommand.ts`
  - [ ] Create `commands/DefendCommand.ts`
  - [ ] Create `commands/CommandFactory.ts`
  - [ ] Update CombatEngine to use commands
  - [ ] Test: All actions work via commands

- [ ] **4.2 Implement Combat State Machine**
  - [ ] Create `src/game/combat/state/` directory
  - [ ] Create `state/CombatPhase.ts` (discriminated union)
  - [ ] Create `state/CombatStateMachine.ts`
  - [ ] Implement transition validation
  - [ ] Update CombatEngine to use state machine
  - [ ] Test: Invalid transitions caught

- [ ] **4.3 Implement Condition Registry**
  - [ ] Create `src/game/ai/conditions/` directory
  - [ ] Create `conditions/ICondition.ts` interface
  - [ ] Create `conditions/HPCondition.ts`
  - [ ] Create `conditions/TurnCondition.ts`
  - [ ] Create `conditions/StatusCondition.ts`
  - [ ] Create `conditions/ConditionFactory.ts`
  - [ ] Update AIController to use condition registry
  - [ ] Test: AI conditions work

- [ ] **4.4 Add AI Validation**
  - [ ] Create `src/game/ai/validation/` directory
  - [ ] Create `validation/AIPatternValidator.ts`
  - [ ] Validate condition strings at enemy creation
  - [ ] Validate action strings
  - [ ] Add validation to CharacterFactory
  - [ ] Test: Invalid AI patterns rejected

**Exit Criteria:**
- ✅ Replay/undo support possible
- ✅ Explicit state management
- ✅ AI validation at load time

---

## Phase 5: Type Safety & Validation ⏳

**Estimated Time:** 1-2 days
**Goal:** Eliminate runtime errors

### Tasks

- [ ] **5.1 Convert Effect System to Discriminated Unions**
  - [ ] Create `src/types/effects.ts`
  - [ ] Define type-safe Effect union
  - [ ] Update EffectResolver to use typed effects
  - [ ] Update all effect handlers
  - [ ] Test: Type safety enforced

- [ ] **5.2 Add Runtime Validation for Saves**
  - [ ] Install `zod` dependency
  - [ ] Create save file schema
  - [ ] Add validation to SaveManager.ts:192
  - [ ] Handle corrupted saves gracefully
  - [ ] Test: Corrupted saves handled

- [ ] **5.3 Add Null Checks & Type Guards**
  - [ ] Audit codebase for missing null checks
  - [ ] Add type guards where needed
  - [ ] Fix CombatEngine.ts:302 null handling
  - [ ] Test: No undefined access errors

- [ ] **5.4 Enable Strict TypeScript Mode**
  - [ ] Enable `strict: true` in tsconfig.json
  - [ ] Fix all type errors
  - [ ] Test: Full build succeeds

**Exit Criteria:**
- ✅ Type-safe effect system
- ✅ Save corruption handled
- ✅ Strict mode enabled

---

## Testing Checklist

After each phase, verify:

- [ ] All existing tests pass
- [ ] New unit tests added for utilities
- [ ] Integration tests for combat flow
- [ ] Manual testing: Full combat scenario
- [ ] Manual testing: Save/load works
- [ ] Manual testing: Story progression works

---

## Performance Benchmarks

Track performance before/after:

- [ ] Combat turn execution time
- [ ] Save file write time
- [ ] Technique lookup time
- [ ] AI decision time

**Baseline (before refactoring):**
- Combat turn: ___ms
- Save write: ___ms
- Technique lookup: ___ms
- AI decision: ___ms

**After Phase 1:**
- Combat turn: ___ms
- Save write: ___ms
- Technique lookup: ___ms
- AI decision: ___ms

**After Phase 2:**
- Combat turn: ___ms
- Save write: ___ms
- Technique lookup: ___ms
- AI decision: ___ms

---

## Rollback Plan

If issues arise:

1. Each phase is in a separate commit
2. Use `git revert <commit-hash>` to rollback
3. Keep old files commented out, don't delete immediately
4. Test after each small change, not after whole phase

---

## Phase Completion Criteria

### Phase 1 Complete When:
- [ ] No magic numbers in combat logic
- [ ] No duplicated utilities
- [ ] Build passes
- [ ] Combat works identically

### Phase 2 Complete When:
- [ ] CombatEngine < 250 lines
- [ ] Each system has unit tests
- [ ] Build passes
- [ ] Full combat flow works

### Phase 3 Complete When:
- [ ] Event bus in use
- [ ] AI injectable
- [ ] GameStore split
- [ ] Build passes
- [ ] Save/load works

### Phase 4 Complete When:
- [ ] Commands implemented
- [ ] State machine active
- [ ] AI validation works
- [ ] Build passes

### Phase 5 Complete When:
- [ ] Strict mode enabled
- [ ] Type errors resolved
- [ ] Runtime validation added
- [ ] Build passes

---

## Notes

- Each phase should be a separate commit
- Test thoroughly after each phase
- Document any deviations from plan
- Update this checklist as you progress

---

**Last Updated:** 2025-12-07
**Status:** Ready to begin Phase 1
