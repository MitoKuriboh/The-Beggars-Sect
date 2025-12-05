# Game Formulas Reference

**Last Updated:** 2025-12-05
**Status:** `[ELABORATED]` - Ready for implementation
**Version:** 1.0

---

## Overview

All mathematical formulas used in the game. This is the **single source of truth** for calculations.

All values in this document are FINAL for v1.0 implementation.

---

## Li Wei - Starting Stats

| Stat | Starting Value | Description |
|------|----------------|-------------|
| **STR** | 10 | Strength - physical damage |
| **DEX** | 10 | Dexterity - speed, crit, evasion |
| **END** | 10 | Endurance - HP, defense |
| **WIS** | 10 | Wisdom - chi capacity, technique power |
| **APT** | 15 | Aptitude (hidden) - learning rate |

**Derived Starting Stats:**
| Stat | Formula | Starting Value |
|------|---------|----------------|
| Max HP | 100 + (END × 10) | **200** |
| Max Chi | 30 + (WIS × 3) | **60** |
| Defense | END × 0.5 | **5** |
| Speed | 100 + (DEX × 2) | **120** |
| Crit Chance | 5% + (DEX × 0.5%) | **10%** |
| Evasion | 2% + (DEX × 0.3%) | **5%** |

---

## Combat Formulas

### Damage Calculation

**Status:** `[ELABORATED]`

```
Step 1: Calculate Raw Damage
Raw Damage = Technique Power × (1 + STR / 20)

Step 2: Apply Offensive Modifiers (multiplicative)
Modified Damage = Raw Damage × Crit Modifier × Stance Modifier × Combo Modifier × Mastery Modifier

Step 3: Apply Defense (subtractive)
Reduced Damage = Modified Damage - (Enemy Defense × 2)

Step 4: Apply Random Variance
Final Damage = Reduced Damage × random(0.9, 1.1)

Step 5: Apply Minimum Floor
Final Damage = max(Final Damage, 1)
```

**Modifier Values:**

| Modifier | Condition | Value |
|----------|-----------|-------|
| Crit Modifier | Normal hit | ×1.0 |
| Crit Modifier | Critical hit | ×1.5 |
| Stance (Flowing) | Default | ×1.0 |
| Stance (Weathered) | Defensive | ×0.9 |
| Stance (Hungry) | Aggressive | ×1.3 |
| Combo (1st hit) | Starter | ×1.0 |
| Combo (2nd hit) | Follow-up | ×1.1 |
| Combo (3rd hit) | Finisher | ×1.3 |
| Mastery Lv1 | Base | ×1.0 |
| Mastery Lv2 | 10 uses | ×1.05 |
| Mastery Lv3 | 25 uses | ×1.10 |
| Mastery Lv4 | 50 uses | ×1.15 |
| Mastery Lv5 | 100 uses | ×1.20 |

**Example Calculation:**
```
Li Wei (STR 12) uses Weathered Palm (Power 20) on Thug (DEF 4)
In Hungry Stance, Combo hit #2, Mastery Lv3, Crit!

Raw = 20 × (1 + 12/20) = 20 × 1.6 = 32
Modified = 32 × 1.5 × 1.3 × 1.1 × 1.10 = 32 × 2.36 = 75.5
Reduced = 75.5 - (4 × 2) = 75.5 - 8 = 67.5
Variance = 67.5 × 1.05 = 70.9
Final = 71 damage (rounded down)
```

---

### Turn Order (ATB System)

**Status:** `[ELABORATED]`

**Core Concept:**
- Each entity has a "tick counter" that counts down
- When counter reaches 0, that entity acts
- After acting, counter resets based on action taken

```
Initial Tick = 1000 - (Speed × 5) + random(-50, 50)

After Action:
New Tick = Action_Delay × (100 / Speed) × 10
```

**Action Delays (Base Values):**

| Action | Delay | Notes |
|--------|-------|-------|
| Basic Attack | 80 | Fast, spammable |
| Defend | 60 | Quick to recover |
| Light Technique | 90 | Standard |
| Medium Technique | 110 | Slower |
| Heavy Technique | 140 | Very slow |
| Ultimate Technique | 180 | Massive delay |
| Chi Focus | 120 | Recovery cost |
| Item | 70 | Quick use |
| Stance Change | 50 | Very fast |
| Flee (attempt) | 100 | Standard |

**Technique Speed Modifiers:**
Techniques can have speed modifiers that adjust their delay:
- Speed +2: Delay × 0.8
- Speed +1: Delay × 0.9
- Speed 0: Delay × 1.0
- Speed -1: Delay × 1.1
- Speed -2: Delay × 1.2
- Speed -3: Delay × 1.3

**Example:**
```
Li Wei (Speed 120) uses Medium Technique (Delay 110, Speed -1)

Adjusted Delay = 110 × 1.1 = 121
New Tick = 121 × (100 / 120) × 10 = 121 × 0.833 × 10 = 1008

Li Wei will act again in ~1008 ticks
```

**Turn Order Display:**
Show next 6 actors in queue based on current tick predictions.

---

### Critical Hit

**Status:** `[ELABORATED]`

```
Crit Chance = Base_Crit + (DEX × 0.5) + Stance_Bonus + Technique_Bonus

Roll = random(0, 100)
If Roll < Crit Chance: Critical Hit!
```

| Parameter | Value |
|-----------|-------|
| Base Crit | 5% |
| DEX Scaling | +0.5% per point |
| Crit Multiplier | ×1.5 damage |
| Crit Chance Cap | 50% |
| Hungry Stance Bonus | +15% |
| Chi gained on crit | +3 bonus |

---

### Evasion

**Status:** `[ELABORATED]`

```
Evasion Chance = Base_Evasion + (DEX × 0.3) + Stance_Bonus

Roll = random(0, 100)
If Roll < Evasion Chance: Attack Misses!
```

| Parameter | Value |
|-----------|-------|
| Base Evasion | 2% |
| DEX Scaling | +0.3% per point |
| Evasion Cap | 40% |
| Flowing Stance Bonus | +5% |
| Weathered Stance Penalty | -5% |

---

### Flee Success

**Status:** `[ELABORATED]`

```
Flee Chance = 40 + ((Player_Speed - Avg_Enemy_Speed) / 5)

Minimum: 20%
Maximum: 85%
Boss Fights: 0% (cannot flee)
```

---

## Stat Formulas

### Health (HP)

```
Max HP = 100 + (END × 10)
```

| END | Max HP |
|-----|--------|
| 10 | 200 |
| 15 | 250 |
| 20 | 300 |
| 30 | 400 |
| 50 | 600 |

**HP Recovery:**
- Out of combat: +5% Max HP per "rest" action
- Victory: +10% Max HP restored
- Items: Fixed amounts (see Items doc)

---

### Chi (CP)

```
Max Chi = 30 + (WIS × 3)
```

| WIS | Max Chi |
|-----|---------|
| 10 | 60 |
| 15 | 75 |
| 20 | 90 |
| 30 | 120 |

**Starting Chi per Fight:** 20 (fixed, regardless of max)

---

### Defense

```
Defense = END × 0.5

Damage Reduction = Defense × 2 (subtracted from damage)
```

| END | Defense | Damage Reduced |
|-----|---------|----------------|
| 10 | 5 | 10 |
| 20 | 10 | 20 |
| 30 | 15 | 30 |

**Defend Action Bonus:** +100% Defense for 1 turn (effectively ×2)

---

### Speed

```
Speed = 100 + (DEX × 2)

Used for: Turn order, flee chance
```

| DEX | Speed |
|-----|-------|
| 10 | 120 |
| 15 | 130 |
| 20 | 140 |
| 30 | 160 |

---

## Chi Economy

### Chi Generation

| Source | Chi Gained | Notes |
|--------|------------|-------|
| Basic Attack | +3 | Reliable income |
| Defend (not hit) | +5 | Safe build |
| Defend (hit) | +8 | Reward for tanking |
| Chi Focus | +20 | Skip turn, big gain |
| Get Hit | +2 | Consolation |
| Combo Finisher | +8 bonus | On top of technique |
| Critical Hit | +3 bonus | Extra reward |
| Defeat Enemy | +15 | Victory bonus |
| Turn Start | +1 | Passive regen |

### Stance Chi Modifiers

| Stance | Attack Chi | Defend Chi | Other |
|--------|------------|------------|-------|
| Flowing | ×1.0 | ×1.0 | Balanced |
| Weathered | ×0.8 | ×1.5 | Defensive focus |
| Hungry | ×1.5 | ×0.5 | Offensive focus |

### Technique Chi Costs (Tiers)

| Tier | Chi Cost Range | Examples |
|------|----------------|----------|
| Basic | 0 | Basic Attack |
| Light | 4-6 | Quick techniques |
| Medium | 8-12 | Standard techniques |
| Heavy | 14-18 | Powerful techniques |
| Ultimate | 20-25 | Devastating moves |

---

## Progression Formulas

### Mastery System

**Uses Required Per Level:**

| Level | Uses Required | Total Uses | Damage Bonus |
|-------|---------------|------------|--------------|
| Lv1 | 0 | 0 | ×1.00 |
| Lv2 | 10 | 10 | ×1.05 |
| Lv3 | 15 | 25 | ×1.10 |
| Lv4 | 25 | 50 | ×1.15 |
| Lv5 | 50 | 100 | ×1.20 |

**Mastery Gain:**
```
Mastery Points = 1 × (1 + APT / 100)

Li Wei with APT 15: 1 × 1.15 = 1.15 points per use
(Effectively masters ~13% faster than base)
```

**Mastery Unlocks:**
- Lv2: Minor stat bonus
- Lv3: Effect upgrade OR secondary effect
- Lv4: Additional stat bonus
- Lv5: Major upgrade OR new combo link

---

### Stat Growth

**Growth Per Chapter (approximate):**

| Stat | Ch1 End | Ch2 End | Ch3 End |
|------|---------|---------|---------|
| STR | 12-14 | 16-18 | 20-24 |
| DEX | 12-14 | 16-18 | 20-24 |
| END | 12-14 | 16-18 | 20-24 |
| WIS | 12-14 | 16-18 | 20-24 |

**Growth Triggers:**
- Combat victory: +0.1 to random used stat
- Training: +0.5 to trained stat
- Elder teaching: +1 to relevant stat
- Story milestone: +2 to chosen stat

Stats are stored as floats, displayed as integers.

---

## Status Effects

### Stun

| Property | Value |
|----------|-------|
| Duration | 1 turn |
| Effect | Skip next turn |
| Stacking | No (refreshes duration) |
| Resist | END × 2% chance to resist |

### Armor Break

| Property | Value |
|----------|-------|
| Duration | 3 turns |
| Effect | -50% Defense |
| Stacking | No (refreshes duration) |

### Bleed

| Property | Value |
|----------|-------|
| Duration | 3 turns |
| Effect | 5% Max HP damage per turn |
| Stacking | Yes (up to 3 stacks) |

### Buff: Attack Up

| Property | Value |
|----------|-------|
| Duration | 3 turns |
| Effect | +25% damage |
| Stacking | No |

### Buff: Defense Up

| Property | Value |
|----------|-------|
| Duration | 3 turns |
| Effect | +50% defense |
| Stacking | No |

### Buff: Speed Up

| Property | Value |
|----------|-------|
| Duration | 3 turns |
| Effect | -20% action delay |
| Stacking | No |

---

## Balance Reference Values

### By Chapter

| Metric | Chapter 1 | Chapter 2 | Chapter 3 |
|--------|-----------|-----------|-----------|
| Player HP | 200-250 | 250-350 | 350-500 |
| Player STR | 10-14 | 14-18 | 18-24 |
| Enemy HP | 60-120 | 100-200 | 180-350 |
| Enemy Damage | 15-25 | 25-40 | 40-60 |
| Avg Fight Turns | 6-10 | 8-12 | 10-16 |
| Techniques Known | 3-5 | 6-10 | 12-18 |

### Damage Per Turn Targets

| Source | Chapter 1 | Chapter 2 | Chapter 3 |
|--------|-----------|-----------|-----------|
| Basic Attack | 12-18 | 20-30 | 35-50 |
| Light Technique | 20-30 | 35-50 | 55-80 |
| Medium Technique | 35-50 | 55-80 | 90-130 |
| Heavy Technique | 55-80 | 90-130 | 150-220 |

### Fight Length Calibration

Target: **Average fight = 8 turns**

If fights are too short (< 5 turns):
- Increase enemy HP
- Decrease player damage
- Add more enemy defense

If fights are too long (> 12 turns):
- Decrease enemy HP
- Increase player damage
- Add more offensive options

---

## Implementation Notes

### Integer vs Float

| Value | Storage | Display |
|-------|---------|---------|
| HP | Integer | As-is |
| Chi | Integer | As-is |
| Damage | Float → Round down | Integer |
| Stats | Float | Integer |
| Mastery | Float | Percentage |
| Chances | Float | Percentage |

### Random Number Generation

```typescript
// For damage variance
function damageVariance(): number {
  return 0.9 + Math.random() * 0.2; // 0.9 to 1.1
}

// For chance rolls (crit, evasion, etc)
function rollChance(percentage: number): boolean {
  return Math.random() * 100 < percentage;
}
```

### Order of Operations

1. Calculate raw damage
2. Apply crit modifier (if crit)
3. Apply stance modifier
4. Apply combo modifier
5. Apply mastery modifier
6. Subtract defense
7. Apply variance
8. Apply minimum floor (1)
9. Apply to target HP

---

## Changelog

| Date | Version | Change |
|------|---------|--------|
| 2025-12-05 | 0.1 | Initial scaffolding |
| 2025-12-05 | 1.0 | Finalized all formulas with concrete values |
