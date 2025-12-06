# Code Review: src/game & src/types

**Date:** 2025-12-06
**Reviewer:** Claude
**Scope:** Full analysis of `the-beggars-sect/src/game` and `src/types` directories
**Total Lines:** ~4,800 lines across 17 TypeScript files

---

## Executive Summary

The game engine demonstrates solid architecture with well-separated concerns across combat, state management, story progression, and character systems. The codebase is production-ready in structure but has integration gaps that need addressing before the systems work together seamlessly.

**Overall Assessment:** Strong foundation with actionable issues to resolve.

| Category | Rating | Notes |
|----------|--------|-------|
| Architecture | ★★★★★ | Clean separation, modular design |
| Type Safety | ★★★★★ | Comprehensive TypeScript usage |
| Code Quality | ★★★★☆ | Well-documented, consistent style |
| Completeness | ★★★☆☆ | Integration gaps, missing definitions |
| Test Readiness | ★★★★☆ | Singletons exported for testing |

---

## File-by-File Analysis

### 1. CombatEngine.ts

**Path:** `src/game/combat/CombatEngine.ts`
**Lines:** 692
**Purpose:** Core ATB (Active Time Battle) combat system

#### Strengths

- **ATB System:** DEX-based speed determines turn order
  - Base tick rate: 10 + (DEX / 5)
  - Turn threshold: 100 (configurable)
  - Turn order preview for UI display

- **Damage Formula:** Multi-factor calculation
  ```
  damage = (basePower + STR) × stanceMod × critMod × comboMod × variance
  defense = END × defenderStanceMod × defendMod
  final = max(1, damage - defense × 0.3)
  ```

- **Combo System:**
  - Roles: starter → followup → finisher
  - Damage multiplier: caps at 1.3x
  - Chi refund on finisher: 3 per technique in chain

- **Clean Callbacks:** State changes notify via `onStateChange`

#### Issues

| Severity | Issue | Location |
|----------|-------|----------|
| 🔴 Critical | `getAIAction()` is a stub, ignores AIController | Lines 651-659 |
| 🟡 Medium | Multi-hit effects not processed | `executeTechnique()` |
| 🟡 Medium | Buff/debuff effects not applied | `executeTechnique()` |

#### Code Sample (Issue)

```typescript
// Line 651-659 - This stub bypasses all AI logic
private getAIAction(enemy: Enemy): CombatAction {
  // Simple AI for now - will be expanded in AIController
  return {
    type: 'attack',
    actor: enemy,
    target: this.state.player,
  };
}
```

**Should be:**
```typescript
private getAIAction(enemy: Enemy): CombatAction {
  return AIController.selectAction(enemy, this.state.player, this.state);
}
```

---

### 2. AIController.ts

**Path:** `src/game/combat/AIController.ts`
**Lines:** 279
**Purpose:** Rule-based AI decision making

#### Strengths

- **Flexible Condition System:**
  - HP thresholds: `hp < 30%`, `hp >= 50%`
  - Turn logic: `turn === 1`, `turn % 3 === 0`
  - Player state: `player.defending`, `player.stunned`
  - Chi checks: `chi > 20`
  - Status effects: `hasBuff`, `!shielded`

- **Behavior Types:**
  | Type | Description |
  |------|-------------|
  | aggressive | Attacks relentlessly |
  | balanced | Mixes offense and defense |
  | tactical | Strategic ability usage |
  | predator | Exploits weaknesses |

- **Boss Phase System:**
  - Phase transition detection via HP thresholds
  - Phase-specific dialogue support

#### Issues

| Severity | Issue | Location |
|----------|-------|----------|
| 🔴 Critical | Entire class is unused | N/A |
| 🟡 Medium | Some conditions return hardcoded values | Lines 72-78, 121-134 |

---

### 3. TechniqueRegistry.ts

**Path:** `src/game/combat/TechniqueRegistry.ts`
**Lines:** 450
**Purpose:** Central registry of all combat techniques

#### Defined Techniques

**Player Techniques:**
| ID | Name | Chi Cost | Power | Combo Role |
|----|------|----------|-------|------------|
| palm-strike | Palm Strike | 0 | 12 | starter |
| flowing-strike | Flowing Strike | 5 | 15 | followup |
| double-palm | Double Palm | 8 | 20 | followup |
| finishing-palm | Finishing Palm | 12 | 25 | finisher |
| weathered-guard | Weathered Guard | 6 | 0 | any |
| hungry-fang | Hungry Fang | 10 | 22 | starter |
| desperate-claw | Desperate Claw | 15 | 30 | finisher |
| deflecting-palm | Deflecting Palm | 4 | 8 | any |

**Enemy Techniques:**
| ID | Name | Power | Notes |
|----|------|-------|-------|
| punch | Punch | 10 | Basic |
| wild-swing | Wild Swing | 18 | Slow |
| headbutt | Headbutt | 15 | 20% stun |
| heavy-punch | Heavy Punch | 16 | Slow |
| crushing-blow | Crushing Blow | 22 | Armor break |
| intimidate | Intimidate | 0 | -10% ATK debuff |
| desperate-flurry | Desperate Flurry | 12 | 3-hit |

#### Issues

| Severity | Issue | Location |
|----------|-------|----------|
| 🔴 Critical | ~30+ techniques referenced in CharacterFactory missing | See list below |

**Missing Techniques (referenced but undefined):**

Boss techniques:
- `razor-slash`, `street-kings-authority`, `brutal-combo`, `desperate-fury`, `last-resort`
- `commanders-strike`, `analyze-opponent`, `shield-formation`, `disciplined-assault`, `rally-cry`, `final-command`, `spartans-pride`
- `empty-palm`, `mirror-stance`, `hollow-guard`, `formless-strike`, `chi-disruption`, `perfect-form`, `hollow-resonance`, `enlightenment`

Spartan techniques:
- `precision-strike`, `formation-guard`, `disciplined-thrust`
- `lance-strike`, `shield-bash`, `phalanx-stance`, `execute`

Lone wolf techniques:
- `swift-palm`, `flowing-counter`, `chi-burst`, `second-wind`
- `shadowless-palm`, `void-step`, `killing-intent`, `perfect-strike`, `meditate`

Gang techniques:
- `iron-fist`, `gang-tactics`, `takedown`, `last-stand`

---

### 4. GameStore.ts

**Path:** `src/game/state/GameStore.ts`
**Lines:** 549
**Purpose:** Central singleton state management

#### Strengths

- **Comprehensive State:**
  ```typescript
  {
    version, saveSlot, createdAt, updatedAt,
    player, inventory,
    storyProgress, storyState, currentLocation,
    discoveredTechniques, discoveredCombos, discoveredLocations,
    npcRelationships,
    flags, stats
  }
  ```

- **Subscription System:** React-friendly with `subscribe()`/`unsubscribe()`

- **Checksum Validation:** Save file integrity checking

- **Testing Support:** Both singleton and class exported

#### Key Methods

| Method | Purpose |
|--------|---------|
| `initializeNewGame(player)` | Start fresh game |
| `discoverTechnique(id)` | Unlock and add to player |
| `recordChoice(id, option)` | Track story decisions |
| `updateNpcRelationship(id, delta)` | Modify affinity (-100 to 100) |
| `saveToSlot(slot, name?)` | Persist to file |
| `autoSave()` | Quick save to slot 0 |

#### Issues

| Severity | Issue | Location |
|----------|-------|----------|
| 🟢 Minor | No validation on loaded save version | `load()` |

---

### 5. SaveManager.ts

**Path:** `src/game/state/SaveManager.ts`
**Lines:** 248
**Purpose:** File-based persistence for standalone builds

#### Configuration

| Setting | Value |
|---------|-------|
| Save Directory | `~/.beggars-sect/saves/` |
| Max Slots | 3 |
| Auto-save Slot | 0 |
| File Format | JSON |

#### File Structure

```
~/.beggars-sect/saves/
├── saves.json      # Slot metadata
├── save_0.json     # Auto-save
├── save_1.json     # Manual save 1
├── save_2.json     # Manual save 2
└── save_3.json     # Manual save 3
```

#### Strengths

- Graceful error handling (returns `{ success, error }`)
- Silent directory creation
- Metadata tracking (chapter, scene, playtime, timestamp)

---

### 6. CharacterFactory.ts

**Path:** `src/game/factories/CharacterFactory.ts`
**Lines:** 651
**Purpose:** Create player and enemy instances

#### Player Character (Li Wei)

| Stat | Value | Notes |
|------|-------|-------|
| STR | 10 | Balanced |
| DEX | 10 | Balanced |
| END | 10 | Balanced |
| WIS | 10 | Balanced |
| APT | 15 | High for mastery growth |
| INV | 99 | Maximum inverse potential (unique) |
| HP | 100 | Based on END |
| Chi | 50 | Based on WIS |

Starting techniques: `palm-strike`, `flowing-strike`

#### Enemy Templates

**Thugs Faction:**
| ID | Tier | Chi Aspect | AI Behavior |
|----|------|------------|-------------|
| street-punk | common | force | aggressive |
| alley-brawler | common | force | balanced |
| scarred-enforcer | uncommon | force | aggressive |
| gang-lieutenant | rare | burst | tactical |

**Spartans Faction:**
| ID | Tier | Chi Aspect | AI Behavior |
|----|------|------------|-------------|
| spartan-recruit | common | precision | balanced |
| spartan-warrior | uncommon | armor | tactical |

**Lone Wolves:**
| ID | Tier | Chi Aspect | AI Behavior |
|----|------|------------|-------------|
| wandering-fighter | uncommon | flow | tactical |
| silent-master | rare | sense | predator |

**Bosses:**
| ID | Faction | Phases | Thresholds |
|----|---------|--------|------------|
| razor | thugs | 2 | 50% |
| commander-vex | spartans | 3 | 60%, 30% |
| the-hollow-one | lone-wolf | 3 | 70%, 40% |

#### Chapter Scaling

| Chapter | HP Multiplier | Damage Multiplier |
|---------|---------------|-------------------|
| 1 | 1.0x | 1.0x |
| 2 | 1.3x | 1.15x |
| 3 | 1.6x | 1.3x |

---

### 7. StoryEngine.ts

**Path:** `src/game/story/StoryEngine.ts`
**Lines:** 450
**Purpose:** Non-linear narrative progression

#### Content Block Types

| Type | Purpose |
|------|---------|
| `content` | Narrative text display |
| `choice` | Player decisions |
| `combat` | Battle triggers |
| `exploration` | Area exploration |
| `montage` | Time-passage sequences |

#### Choice System

**Conditions:**
```typescript
type: 'flag' | 'relationship' | 'path' | 'item'
```

**Effects:**
```typescript
type: 'relationship' | 'flag' | 'path' | 'item'
```

#### Path System

Three paths tracked with scores:
- **Blade** - Aggressive/direct approach
- **Stream** - Flowing/adaptive approach
- **Shadow** - Cunning/indirect approach

`getDominantPath()` returns highest score or "balanced" if tied.

---

### 8. chapters/prologue.ts

**Path:** `src/game/story/chapters/prologue.ts`
**Lines:** ~650
**Purpose:** Opening chapter content

#### Scene Structure

| ID | Title | Type | Duration |
|----|-------|------|----------|
| p1-void | The Void | cutscene | ~2 min |
| p2-grey-sky | Grey Sky | interactive | ~3 min |
| p3-first-breath | First Breath | exploration | ~5 min |
| p4-survival | Survival Instinct | combat | ~5 min |
| p5-days-of-nothing | Days of Nothing | montage | ~3 min |
| p6-blind-guide | The Blind Guide | dialogue | ~4 min |
| p7-hidden-corner | The Hidden Corner | dialogue | ~3 min |

**Total Runtime:** ~25 minutes

#### Narrative Elements

- **Mystery Hooks:**
  - Subject 17 / white rooms
  - The jade pendant
  - Li Wei's forgotten training
  - Old Dao's true nature

- **Characters Introduced:**
  - Li Wei (player)
  - Old Dao (blind guide)
  - Elder Chen, Wu, Mei (sect leaders)

- **Effects Used:**
  - Fades (black, gray)
  - Flashes (white)
  - Screen shake
  - Pendant glow (faint/bright/intense)
  - Pauses for pacing

---

## Types Folder Analysis

**Path:** `src/types/`
**Total Lines:** ~1,457 lines across 7 files
**Purpose:** Comprehensive TypeScript type definitions for all game systems

### Overview

```
src/types/
├── index.ts        (23 lines)   - Central export hub
├── character.ts   (258 lines)   - Player/enemy, stats, stances, chi
├── combat.ts      (259 lines)   - Actions, results, ATB, combos
├── game.ts        (313 lines)   - Game state, flags, saves
├── item.ts        (186 lines)   - Items, inventory, effects
├── story.ts       (243 lines)   - Scenes, choices, chapters
└── technique.ts   (175 lines)   - Techniques, mastery, combos
```

---

### 1. character.ts

**Lines:** 258
**Purpose:** Core character and enemy type definitions

#### Stats System

| Stat | Purpose | Formula Usage |
|------|---------|---------------|
| STR | Physical damage | `damage = basePower + STR` |
| DEX | Speed, crit chance | `critChance = DEX × 0.01` |
| END | HP pool, defense | `maxHP = 50 + (END × 5)` |
| WIS | Chi pool, recovery | `maxChi = 20 + (WIS × 3)` |
| APT | Mastery growth rate | Hidden stat |
| INV | Inverse chi capacity | Li Wei only (99 max) |

#### Stance System

| Stance | Attack | Defense | Speed | Chi Gen |
|--------|--------|---------|-------|---------|
| Flowing | 1.0x | 1.0x | 1.0x | 1.0x |
| Weathered | 0.9x | 1.5x | 0.8x | 1.3x |
| Hungry | 1.3x | 0.7x | 1.1x | 1.5x |

#### Chi Aspects (8 total)

| Aspect | Chinese | Description |
|--------|---------|-------------|
| force | 力 | Raw power, breaking guard |
| flow | 流 | Continuous motion, combos |
| precision | 准 | Exact targeting, criticals |
| burst | 爆 | Explosive release, speed |
| armor | 甲 | Defensive density |
| sense | 感 | Awareness, reading opponents |
| will | 意 | Mental projection, intimidation |
| inverse | 逆 | Reversed flow, desperation power |

#### Pre-defined Status Effects

```typescript
STATUS_EFFECTS = {
  DEFENDING:    { modifier: +50%, duration: 1, stat: 'end' },
  STUNNED:      { modifier: 0, duration: 1, skips turn },
  ARMOR_BROKEN: { modifier: -25%, duration: 2, stat: 'end' }
}
```

#### Helper Functions

| Function | Purpose |
|----------|---------|
| `calculateMaxHp(end)` | Returns `50 + (end × 5)` |
| `calculateMaxChi(wis)` | Returns `20 + (wis × 3)` |
| `getEffectiveStat(char, stat)` | Applies stance + status modifiers |

---

### 2. combat.ts

**Lines:** 259
**Purpose:** Combat system types and configuration

#### Action Types (7)

```typescript
type ActionType =
  | 'attack'      // Basic palm strike
  | 'technique'   // Use a technique
  | 'defend'      // Guard stance
  | 'chi-focus'   // Meditate, recover chi
  | 'item'        // Use consumable
  | 'stance'      // Switch stance
  | 'flee';       // Escape combat
```

#### ActionResult Interface

Rich result object tracking:
- Damage dealt + critical flag
- Chi spent/gained
- Healing amount
- Status effects applied/removed
- Combo position + bonus
- Flee success
- Target state after action

#### Combat Configuration (Defaults)

| Setting | Default | Purpose |
|---------|---------|---------|
| turnThreshold | 100 | Points needed to act |
| baseTickRate | 10 | Points per tick |
| previewLength | 7 | Future turns shown |
| minFleeChance | 0.3 | 30% minimum flee |
| maxFleeChance | 0.9 | 90% maximum flee |
| canFleeBoss | false | No fleeing bosses |
| minDamage | 1 | Floor damage |
| critMultiplier | 1.5 | 150% on crit |
| varianceMin/Max | 0.9-1.1 | ±10% damage variance |

#### Helper Functions

| Function | Purpose |
|----------|---------|
| `createCombatState(player, enemies)` | Initialize combat |
| `addLogEntry(state, actor, msg, type)` | Add to combat log |
| `checkCombatEnd(state)` | Returns victory/defeat/ongoing |
| `getLivingEnemies(state)` | Filter dead enemies |
| `getAllCombatants(state)` | Player + living enemies |

---

### 3. game.ts

**Lines:** 313
**Purpose:** Overall game state, progression, and persistence

#### Story Path System

```typescript
type StoryPath = 'blade' | 'stream' | 'shadow' | null;
type Ending = 'destroyer' | 'reformer' | 'wanderer' | null;
```

#### StoryProgress Interface

| Field | Type | Purpose |
|-------|------|---------|
| chapter | number | 0=Prologue, 1-3=Chapters |
| scene | string | Current scene ID |
| choices | Record | choiceId → selectedOption |
| path | StoryPath | Set after Chapter 1 |
| ending | Ending | Set after Chapter 3 |
| completedScenes | string[] | Finished scenes |
| memoriesUnlocked | string[] | Recovered memories |

#### GameFlags Interface (Pre-defined)

| Category | Flags |
|----------|-------|
| Tutorial | `tutorialCompleted`, `firstCombatWon` |
| NPCs Met | `metElderChen/Wu/Mei`, `metOldDao` |
| Bosses | `defeatedRazor/Vex/HollowOne` |
| Memory | `firstMemoryRestored`, `allMemoriesRestored` |
| Techniques | `learnedRisingDragon`, `learnedEldersTeaching` |
| Secrets | `foundHiddenScroll`, `discoveredInverseChi` |

#### GameStats Interface

| Category | Tracked Stats |
|----------|---------------|
| Combat | battlesWon/Lost/Fled, totalDamage dealt/taken, criticalHits |
| Techniques | techniquesUsed, combosCompleted, longestCombo |
| Progression | techniquesMastered, enemyTypesDefeated |
| Time | playTime (seconds), sessionsPlayed |

#### Helper Functions

| Function | Purpose |
|----------|---------|
| `canAccessChapter(progress, ch)` | Chapter unlock check |
| `hasChoice(progress, id, option?)` | Choice tracking |
| `getCompletionPercentage(state)` | 0-100% completion |
| `generateChecksum(state)` | Save file integrity |

#### Completion Percentage Formula

| Component | Weight |
|-----------|--------|
| Story progress (chapters) | 40% |
| Techniques discovered | 20% |
| Enemy types defeated | 20% |
| Bosses defeated | 20% |

---

### 4. item.ts

**Lines:** 186
**Purpose:** Item system and inventory management

#### Item Types

```typescript
type ItemType =
  | 'consumable'  // One-time use (potions, food)
  | 'scroll'      // Teaches techniques
  | 'equipment'   // Wearable gear (future)
  | 'key'         // Quest items
  | 'material';   // Crafting (future)
```

#### Item Effect Types

| Effect | Purpose |
|--------|---------|
| heal-hp | Restore HP |
| heal-chi | Restore Chi |
| heal-both | Restore HP and Chi |
| buff-stat | Temporary stat boost |
| cure-status | Remove debuffs |
| teach-technique | Learn a technique |
| reveal-combo | Discover a combo chain |

#### Item Rarity

```typescript
rarity: 'common' | 'uncommon' | 'rare' | 'unique'
```

#### Inventory System

| Field | Purpose |
|-------|---------|
| slots | Array of {item, quantity} |
| maxSlots | Default: 20 |
| gold | Currency |

#### Helper Functions

| Function | Purpose |
|----------|---------|
| `createInventory(maxSlots)` | Initialize empty inventory |
| `addItemToInventory(inv, item, qty)` | Add with stacking |
| `removeItemFromInventory(inv, id, qty)` | Remove items |
| `hasItem(inv, id, qty)` | Check ownership |
| `getItemCount(inv, id)` | Get quantity |

---

### 5. story.ts

**Lines:** 243
**Purpose:** Narrative system types

#### ContentLine Types (8)

| Type | Purpose | Example |
|------|---------|---------|
| narration | Third-person description | "The alley opens..." |
| internal | Li Wei's thoughts | "Where am I?" |
| dialogue | Character speech | speaker + text + emotion |
| system | Game messages | Tutorial text |
| instruction | Input prompts | "Press [SPACE]" |
| pause | Timing beats | duration in ms |
| divider | Visual separator | "DAY ONE" |
| effect | Visual/audio triggers | fade, flash, shake |

#### Scene Effects

```typescript
type SceneEffect =
  | { type: 'fade'; direction: 'in'|'out'; color?: string }
  | { type: 'flash'; color?: string; duration?: number }
  | { type: 'shake' }
  | { type: 'pendant-glow'; intensity: 'faint'|'bright'|'intense' }
  | { type: 'sound'; sound: string };
```

#### Choice System

**ChoiceEffect types:**
- `relationship` - Character affinity delta
- `flag` - Set boolean/string/number flag
- `path` - Adjust blade/stream/shadow score
- `item` - Add or remove item
- `stat` - Modify character stat

**ChoiceCondition types:**
- `flag` - Check flag value
- `relationship` - Min/max affinity check
- `path` - Minimum path score
- `item` - Has/doesn't have item

#### Scene Types (6)

```typescript
type: 'cutscene' | 'interactive' | 'exploration' | 'combat' | 'montage' | 'dialogue'
```

#### SceneBlock Types (5)

| Block | Contains |
|-------|----------|
| content | ContentLine[] |
| choice | prompt + Choice[] |
| combat | enemy IDs + canLose + loseScene |
| exploration | ExplorationArea[] |
| montage | MontageDay[] |

#### StoryState Interface

| Field | Type | Purpose |
|-------|------|---------|
| currentChapter | string | Active chapter ID |
| currentScene | string | Active scene ID |
| contentIndex | number | Position in scene |
| flags | Record | Story flags |
| relationships | Record | NPC affinities |
| pathScores | {blade, stream, shadow} | Path tracking |
| completedScenes | string[] | Finished scenes |
| choiceHistory | Array | All choices made |
| discoveredItems | string[] | Found items |
| discoveredLore | string[] | Lore entries |

---

### 6. technique.ts

**Lines:** 175
**Purpose:** Combat technique definitions

#### Effect Types (9)

```typescript
type EffectType =
  | 'damage'        // Direct damage
  | 'heal'          // HP recovery
  | 'chi-restore'   // Chi recovery
  | 'buff'          // Positive status
  | 'debuff'        // Negative status
  | 'stun'          // Skip turn
  | 'armor-break'   // Reduce defense
  | 'counter-setup' // Enable counter
  | 'multi-hit';    // Multiple strikes
```

#### Combo Roles

```typescript
type ComboRole = 'starter' | 'followup' | 'finisher' | 'any';
```

#### Mastery System

| Level | Uses Required | Power Bonus | Effect |
|-------|---------------|-------------|--------|
| 1 | 0 | +0 | Base |
| 2 | 10 | +2 | Improved effect |
| 3 | 25 | +4 | Better synergy |
| 4 | 50 | +6 | New combos unlock |
| 5 | 100 | +8 | Signature technique |

#### Technique Interface

| Field | Type | Purpose |
|-------|------|---------|
| id | string | Unique identifier |
| name | string | Display name |
| chinese | string | Chinese name (掌击) |
| stance | Stance \| 'any' | Required stance |
| power | number | Base damage |
| chiCost | number | Chi required |
| speed | number | Turn delay (-3 to +2) |
| aspect | ChiAspect | Chi alignment |
| effects | TechniqueEffect[] | Applied effects |
| comboRole | ComboRole | Combo position |
| comboLinks | ComboLink[] | Valid follow-ups |
| description | string | Flavor text |
| philosophy? | string | Lore text |
| masteryBonuses | MasteryBonus[] | Level bonuses |
| unlockedByDefault | boolean | Starting technique |
| unlockChapter? | number | First available |

#### Helper Functions

| Function | Purpose |
|----------|---------|
| `getMasteryLevel(uses)` | Get level from usage count |
| `getMasteryBonus(uses)` | Get current bonus |
| `getEffectivePower(tech, uses)` | Power + mastery bonus |
| `canUseTechnique(tech, stance, chi)` | Validate usability |
| `getComboMultiplier(role, chainLen)` | Combo damage bonus |

#### Combo Multipliers

| Role | Bonus |
|------|-------|
| starter | 1.0x |
| followup | 1.1x (+10%) |
| finisher | 1.3x (+30%) |
| any | 1.0 + (chainLength × 0.05) |

---

---

## UI Folder Analysis

**Path:** `src/ui/`
**Total Lines:** ~1,866 lines across 16 files
**Purpose:** Ink/React terminal UI components for combat, story, and menus
**Framework:** Ink (React for CLI) + ink-select-input

### Overview

```
src/ui/
├── App.tsx               (425 lines)  - Main app, screen routing
├── SaveLoadScreen.tsx    (238 lines)  - Save/load management
├── combat/
│   ├── CombatScreen.tsx  (433 lines)  - Combat orchestrator
│   ├── ActionMenu.tsx    (71 lines)   - Action selection
│   ├── TechniqueMenu.tsx (135 lines)  - Technique picker
│   ├── HealthBar.tsx     (100 lines)  - HP/Chi bars
│   ├── StanceMenu.tsx    (88 lines)   - Stance switching
│   ├── TargetMenu.tsx    (76 lines)   - Enemy targeting
│   ├── CombatLog.tsx     (49 lines)   - Combat messages
│   ├── TurnQueue.tsx     (46 lines)   - ATB preview
│   └── index.ts          (12 lines)   - Exports
└── story/
    ├── StoryScreen.tsx   (280 lines)  - Story display
    ├── ContentRenderer.tsx(129 lines) - Line rendering
    ├── ChoiceMenu.tsx    (64 lines)   - Choice selection
    ├── ExplorationMenu.tsx(124 lines) - Area exploration
    └── index.ts          (8 lines)    - Exports
```

---

### 1. App.tsx

**Lines:** 425
**Purpose:** Main application entry, screen routing, game flow

#### Screens Implemented

| Screen | Purpose | Transitions To |
|--------|---------|----------------|
| title | Game logo, press any key | menu |
| menu | New Game/Load/Credits/Quit | newgame, load, credits |
| newgame | Confirmation, player creation | stats |
| stats | Character status, hub | story, combat, save, menu |
| story | Narrative playback | combat (via callback) |
| combat | Battle screen | stats or story |
| credits | Developer credits | menu |
| save | Save to slot | stats |
| load | Load from slot | stats |

#### Key Components

**TitleScreen:**
- Chinese subtitle: 丐帮：李伟的崛起
- Press any key to continue

**MainMenu:**
- Dynamic items based on game state
- Shows "Continue" if game active
- Shows "Load Game" only if saves exist

**StatsScreen:**
- Full character status display
- HP/Chi/Inverse Chi bars
- Stats (STR/DEX/END/WIS)
- Current stance and techniques
- Story progress (chapter/scene)

**Combat Flow:**
- `handleStoryCombat()` - Combat from story, returns to story
- `startCombat()` - Test combat, returns to stats
- `handleCombatEnd()` - Updates GameStore based on result

#### Strengths

- Clean screen state machine
- Proper player state sync after combat
- Defeat recovery (30% HP restore)
- Fled state preserves HP

---

### 2. SaveLoadScreen.tsx

**Lines:** 238
**Purpose:** Save/load slot management UI

#### Features

- 3 manual slots + 1 auto-save slot
- Overwrite confirmation dialog
- Displays: slot name, chapter, playtime, timestamp
- Error handling with user feedback

#### Display Format

```
[Auto] Prologue Scene 3 - Dec 6, 2:30 PM
Slot 1: Save Name - Chapter 1 (45m)
Slot 2: [Empty]
Slot 3: [Empty]
```

---

### 3. CombatScreen.tsx

**Lines:** 433
**Purpose:** Main combat UI orchestrator

#### Combat Phases

| Phase | Description |
|-------|-------------|
| action-select | Player choosing action |
| technique-select | Technique menu open |
| stance-select | Stance menu open |
| target-select | Multi-enemy targeting |
| enemy-turn | AI processing |
| animating | Action delay |
| victory | Player won |
| defeat | Player lost |
| fled | Player escaped |

#### Features

- CombatEngine integration with state callback
- Turn order preview (7 turns)
- Boss phase transition handling
- Enemy intro/defeat dialogue
- Combo chain tracking display
- Auto-target for single enemy

#### Layout

```
═══ COMBAT ═══ [BOSS]

Turn Order: [YOU] → [STR] → [YOU] → [STR] → ...

┌─────────────────────────────────────────┐
│ Li Wei          VS          Street Punk │
│ HP: ████████░░  |           HP: ██████░ │
│ Chi: █████░░░░  |           Chi: ███░░░ │
│ 逆: ████░░░░░░  |           Stance: hungry│
│ Stance: flowing |                        │
└─────────────────────────────────────────┘

"I'll make you pay!"

┌ Combat Log ─────────────────────────────┐
│ Li Wei uses Palm Strike for 15 damage!  │
│ Street Punk attacks for 8 damage!       │
└─────────────────────────────────────────┘

Choose Action:
> ⚔️  Attack
  ✨ Technique
  🛡️  Defend
  🧘 Chi Focus
  🔄 Stance
  🏃 Flee
```

---

### 4. Combat Sub-Components

#### ActionMenu.tsx (71 lines)

6 actions with emoji labels:
- ⚔️ Attack, ✨ Technique, 🛡️ Defend
- 🧘 Chi Focus, 🔄 Stance, 🏃 Flee

Flee disabled for boss fights.

#### TechniqueMenu.tsx (135 lines)

- Chi cost display: `(8 chi)` or `(free)`
- Combo hints: `[START]`, `[COMBO]`, `[FINISH]`
- Unusable grayed out with reason
- Current chi/stance display
- ESC to go back

#### HealthBar.tsx (100 lines)

Visual bar with block characters:
- `████████░░` (filled/empty)
- Color changes: green → yellow → red

CharacterStatus component:
- Name (cyan for player, red for enemy)
- HP bar (green/yellow/red based on %)
- Chi bar (blue)
- Inverse Chi bar (magenta, player only)
- Current stance

#### StanceMenu.tsx (88 lines)

3 stances with Chinese names:
- 🌊 Flowing (流)
- 🏔️ Weathered (风雨)
- 🔥 Hungry (饿)

Shows stat modifiers for each.

#### TargetMenu.tsx (76 lines)

- HP percentage color-coded
- Auto-selects if single enemy
- ESC to go back

#### CombatLog.tsx (49 lines)

- Bordered box with recent messages
- Color-coded by type (damage=red, heal=green, etc.)
- Default 5 entries shown

#### TurnQueue.tsx (46 lines)

- Horizontal turn preview
- Inverse highlight for current actor
- 3-letter abbreviations for enemies
- "YOU" for player

---

### 5. StoryScreen.tsx

**Lines:** 280
**Purpose:** Main story content display and interaction

#### Story Phases

| Phase | Description |
|-------|-------------|
| content | Displaying text, SPACE to advance |
| choice | Player selecting option |
| exploration | Exploring area |
| combat | Transitioning to combat |
| chapter-end | Chapter complete |
| game-end | Story finished |

#### Features

- StoryEngine integration with state callback
- GameStore sync for persistence
- Auto-save at key points:
  - Before choices
  - Before combat
  - At chapter end
  - At game end
- Pause effect handling
- Scene title/location display

#### Layout

```
═══ THE VOID ═══
📍 Unknown Location

┌────────────────────────────────────────┐
│ The grey sky stretches endlessly...    │
│                                        │
│   Where am I?                          │
│                                        │
│ Old Dao: "You are where you need       │
│ to be, young one."                     │
│                                        │
│ Press [SPACE] to continue...           │
└────────────────────────────────────────┘
```

---

### 6. Story Sub-Components

#### ContentRenderer.tsx (129 lines)

8 content line types rendered:

| Type | Rendering |
|------|-----------|
| narration | White text, margin |
| internal | Gray italic, indented |
| dialogue | Cyan bold speaker, white text |
| system | Yellow bold in brackets |
| instruction | Gray dimmed |
| divider | ═══ lines with label |
| pause | Handled by parent |
| effect | Pendant glow description |

Pendant glow intensities:
- faint → blue, "pulses faintly"
- bright → cyan, "glows warmly"
- intense → magenta, "flares brilliantly"

#### ChoiceMenu.tsx (64 lines)

- Bordered selection box
- Optional tags in parentheses
- Uses ink-select-input

#### ExplorationMenu.tsx (124 lines)

- Tracks visited areas with checkmarks
- Required areas must be visited
- "→ Continue" appears when all required done
- Area content shown with SPACE to return

---

### UI Quality Assessment

| Category | Rating | Notes |
|----------|--------|-------|
| Component Design | ★★★★★ | Clean, single-responsibility |
| State Management | ★★★★★ | Proper React patterns |
| User Feedback | ★★★★★ | Clear prompts and hints |
| Visual Polish | ★★★★☆ | Good use of colors/emojis |
| Accessibility | ★★★★☆ | Keyboard-only, clear contrast |

### UI Issues

| Severity | Issue | Location |
|----------|-------|----------|
| 🟡 Medium | SelectInput import workaround | All files using SelectInput |
| 🟢 Minor | No sound effect implementation | ContentRenderer.tsx:98 |
| 🟢 Minor | Effect fade/flash not implemented | ContentRenderer.tsx:82-84 |
| 🟢 Minor | Emotion prop unused in dialogue | ContentRenderer.tsx:33 |

### SelectInput Workaround

All files use this pattern due to ESM/CJS compatibility:
```typescript
import SelectInput from 'ink-select-input';
const SelectInputComponent = (SelectInput as any).default || SelectInput;
```

---

## Entry Points & Configuration

**Path:** `src/` root + project root
**Total Lines:** ~164 lines across 6 files
**Purpose:** Application bootstrap and build configuration

### Overview

```
src/
├── index.tsx         (12 lines)  - Main entry point
└── cjs-entry.cjs     (17 lines)  - CommonJS wrapper

project root/
├── package.json      (55 lines)  - Project config
├── tsconfig.json     (28 lines)  - TypeScript config
├── sea-config.json   (10 lines)  - Node SEA config
└── .gitignore        (42 lines)  - Git ignore rules
```

---

### 1. index.tsx (Entry Point)

**Lines:** 12
**Purpose:** Application bootstrap

```typescript
#!/usr/bin/env node
import React from 'react';
import { render } from 'ink';
import { App } from './ui/App';

const { waitUntilExit } = render(<App />);
waitUntilExit().then(() => process.exit(0));
```

- Shebang for CLI execution
- Renders React/Ink `<App />` component
- Waits for user quit before exiting

---

### 2. cjs-entry.cjs (CommonJS Wrapper)

**Lines:** 17
**Purpose:** Compatibility layer for pkg bundling

Required because:
- Main code is ESM (ES Modules)
- `pkg` bundler requires CommonJS entry
- Dynamic import bridges the gap

---

### 3. package.json

**Version:** 0.2.0
**License:** UNLICENSED (private)

#### Scripts

| Script | Command | Purpose |
|--------|---------|---------|
| dev | `tsx watch src/index.tsx` | Hot-reload development |
| build | `tsc` | TypeScript compilation |
| start | `node dist/index.js` | Run compiled game |
| lint | `eslint src --ext .ts,.tsx` | Code linting |
| package | `pkg ...` | Build standalone executables |

#### Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| ink | ^3.2.0 | React for CLI |
| react | ^18.2.0 | UI framework |
| ink-select-input | ^4.0.0 | Selection menus |
| chalk | ^5.3.0 | Terminal colors |
| boxen | ^7.1.1 | Box drawing |
| figlet | ^1.7.0 | ASCII art text |
| cli-spinners | ^2.9.2 | Loading animations |

#### Dev Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| typescript | ^5.3.3 | Type checking |
| tsx | ^4.7.0 | TypeScript execution |
| esbuild | ^0.27.1 | Fast bundler |
| pkg | ^5.8.1 | Executable bundler |
| @vercel/ncc | ^0.38.4 | Single-file bundler |
| eslint | ^8.56.0 | Linting |

#### Build Targets

```
node18-win-x64    → beggars-sect-win.exe
node18-linux-x64  → beggars-sect-linux
node18-macos-x64  → beggars-sect-macos
```

---

### 4. tsconfig.json

| Setting | Value | Purpose |
|---------|-------|---------|
| target | ES2022 | Modern JavaScript |
| module | CommonJS | Node.js compatibility |
| jsx | react-jsx | Modern JSX transform |
| strict | true | Full type checking |
| declaration | true | Generate .d.ts files |

#### Path Aliases (Configured but unused)

```typescript
"@/*": ["src/*"],
"@game/*": ["src/game/*"],
"@ui/*": ["src/ui/*"],
"@data/*": ["src/data/*"],         // Empty
"@automation/*": ["src/automation/*"], // Empty
"@utils/*": ["src/utils/*"]        // Empty
```

---

### 5. sea-config.json

Node.js Single Executable Application config:
- Uses ncc-bundled output
- Includes yoga.wasm for Ink layout
- Code cache enabled for faster startup

---

### 6. .gitignore

Standard patterns for:
- Dependencies (`node_modules/`)
- Build output (`dist/`, `*.js`, `*.d.ts`)
- Environment files (`.env*`)
- IDE files (`.vscode/`, `.idea/`)
- OS files (`.DS_Store`)
- Save files (`saves/`, `*.save`)

---

## Scaffold Directories (Empty)

These directories exist for future development:

```
src/
├── automation/
│   ├── claude/     # Claude integration (planned)
│   └── n8n/        # n8n workflows (planned)
├── data/
│   ├── areas/      # Area definitions (planned)
│   ├── enemies/    # Enemy data files (planned)
│   ├── npcs/       # NPC definitions (planned)
│   └── techniques/ # Technique data (planned)
└── utils/          # Utility functions (planned)
```

### Recommendation

Move existing data from game code into these directories:
- `CharacterFactory.ts` enemy templates → `data/enemies/`
- `TechniqueRegistry.ts` techniques → `data/techniques/`
- Story locations → `data/areas/`

---

### Types Quality Assessment

| Category | Rating | Notes |
|----------|--------|-------|
| Completeness | ★★★★★ | All systems have full type coverage |
| Documentation | ★★★★★ | Excellent JSDoc comments |
| Consistency | ★★★★★ | Uniform patterns across files |
| Helper Functions | ★★★★★ | Well-designed utilities |
| Extensibility | ★★★★☆ | Index string types allow dynamic flags |

### Types Issues

| Severity | Issue | Location |
|----------|-------|----------|
| 🟢 Minor | `Item` definitions not included | `item.ts` has types but no item registry |
| 🟢 Minor | `Location` type defined but no registry | `game.ts:40-61` |
| 🟢 Minor | Checksum is basic hash, not cryptographic | `game.ts:292-311` |

---

## Critical Issues Summary

### 🔴 Critical (Must Fix)

1. ~~**AIController Not Integrated**~~ **FIXED 2025-12-06**
   - Now calls `AIController.selectAction()` at line 654

2. ~~**Missing Technique Definitions**~~ **FIXED 2025-12-06**
   - Added 41 missing techniques to `TechniqueRegistry.ts`
   - Includes: all boss techniques (Razor, Vex, Hollow One), spartan techniques, lone wolf techniques, gang techniques

### 🟡 Medium (Should Fix)

3. ~~**Effect Processing Not Implemented**~~ **FIXED 2025-12-06**
   - Added `applyEffects()` method to `CombatEngine.ts`
   - Now processes: damage, heal, chi-restore, buff, debuff, stun, armor-break, counter-setup, multi-hit
   - Supports conditional effects (e.g., "hp < 50%")

4. ~~**Hardcoded AI Conditions**~~ **FIXED 2025-12-06**
   - `player.usedHeavyTechnique`: Now checks combat log for heavy technique keywords
   - `player.usedTechnique`: Now checks combat log for technique usage
   - `!healed`: Now checks combat log for heal actions
   - `!meditated`: Now checks combat log for meditation actions
   - `!shielded`, `!prideBuff`, `!enlightened`: Now check status effect descriptions

### 🟢 Minor (Nice to Have)

5. **Save Version Migration**
   - Location: `GameStore.load()`
   - Impact: Old saves may break on updates
   - Fix: Add version checking and migration

---

## Recommendations

### Immediate Actions

1. **Integrate AIController:**
   ```typescript
   // CombatEngine.ts line 651
   private getAIAction(enemy: Enemy): CombatAction {
     return AIController.selectAction(enemy, this.state.player, this.state);
   }
   ```

2. **Add Missing Techniques:**
   Create technique definitions for all boss/enemy abilities referenced in CharacterFactory.

3. **Implement Effect Processing:**
   ```typescript
   // In executeTechnique(), after damage calculation
   for (const effect of technique.effects) {
     this.applyEffect(effect, actor, target);
   }
   ```

### Future Improvements

- Add technique effect system (buff stacking, duration tracking)
- Implement counter-attack mechanics
- Add equipment system integration
- Create Chapter 1+ content files
- Add unit tests for combat calculations

---

## Metrics

### Game Logic (`src/game`)

| Metric | Value |
|--------|-------|
| Total Files | 10 |
| Total Lines | ~4,200 |
| Avg Lines/File | 420 |
| Player Techniques | 8 |
| Enemy Techniques | 48 |
| Missing Techniques | 0 ✅ |
| Enemy Templates | 12 |
| Boss Templates | 3 |
| Prologue Scenes | 7 |

### Type Definitions (`src/types`)

| Metric | Value |
|--------|-------|
| Total Files | 7 |
| Total Lines | ~1,457 |
| Avg Lines/File | 208 |
| Character Stats | 6 |
| Chi Aspects | 8 |
| Stances | 3 |
| Action Types | 7 |
| Effect Types | 9 |
| Scene Types | 6 |
| Item Types | 5 |
| Helper Functions | 18 |

### UI Components (`src/ui`)

| Metric | Value |
|--------|-------|
| Total Files | 16 |
| Total Lines | ~1,866 |
| Avg Lines/File | 117 |
| Screens | 9 |
| Combat Components | 8 |
| Story Components | 4 |
| Content Line Types | 8 |

### Entry Points & Config

| Metric | Value |
|--------|-------|
| Entry Files | 2 |
| Config Files | 4 |
| Total Lines | ~164 |
| Dependencies | 7 |
| Dev Dependencies | 10 |
| Scaffold Dirs | 7 (empty) |

### Combined Totals

| Metric | Value |
|--------|-------|
| Total Source Files | 35 |
| Total Source Lines | ~6,830 |
| Config Files | 4 |
| Type Coverage | 100% |
| Documentation | Excellent |
| Component Count | 20+ |
| Build Targets | 3 (Win/Mac/Linux) |

---

## Conclusion

The game demonstrates excellent architecture across all three layers:

### Type System (`src/types`)
- Complete type coverage for all game systems
- Well-designed helper functions (18 total)
- Excellent documentation
- Consistent patterns across all files

### Game Logic (`src/game`)
- Clean separation between combat, state, and story systems
- Robust save system with file persistence
- Rich character/enemy factory with boss phases
- Non-linear narrative engine

### UI Layer (`src/ui`)
- Clean React/Ink component architecture
- Proper state management patterns
- Polished visual presentation with colors and emojis
- Good user feedback and prompts

### Main Gaps

| Priority | Issue | Impact |
|----------|-------|--------|
| ~~1~~ | ~~AIController not connected~~ | **FIXED** |
| ~~1~~ | ~~30+ techniques undefined~~ | **FIXED** - 41 techniques added |
| ~~2~~ | ~~Effect processing missing~~ | **FIXED** - Full effect system |
| ~~3~~ | ~~Hardcoded AI conditions~~ | **FIXED** - Proper log analysis |
| 3 | No item registry | Item system incomplete |
| 4 | No location registry | Exploration incomplete |
| 5 | Sound/visual effects | CLI effects not implemented |

### Strengths

- **Architecture:** ★★★★★ - Production-ready structure
- **Type Safety:** ★★★★★ - 100% coverage
- **UI/UX:** ★★★★☆ - Polished CLI experience
- **Save System:** ★★★★★ - Robust persistence
- **Story Engine:** ★★★★★ - Supports complex branching
- **Combat System:** ★★★★★ - Full technique effects now working

### Next Steps

1. ~~Connect AIController to CombatEngine~~ ✅
2. ~~Add all missing technique definitions~~ ✅
3. ~~Implement technique effect processing~~ ✅
4. Create item and location registries
5. Add Chapter 1+ content

---

*Review completed 2025-12-06*
*Full src/ analysis complete: game, types, ui, entry points, configuration*
