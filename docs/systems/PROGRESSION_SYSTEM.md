# Unified Progression System

**Created:** 2025-12-07
**Status:** Implemented (Core), Ready for Technique Database Population
**Purpose:** Deep strategic progression without overwhelming complexity

---

## Overview

The game uses a **three-layer progression system**:
1. **Path Percentages** (Zero-sum: always totals 100%)
2. **Aspect Loadout** (LoL-style rune system)
3. **Training Mastery** (Post-prologue engagement loop)

All three layers interconnect to gate technique unlocks and create build diversity.

---

## Layer 1: Path Percentages (Zero-Sum)

### Core Mechanic

**Total across all paths = 100%**
- Investing in one path reduces capacity in others
- Forces meaningful specialization choices
- Story choices shift percentages

### Distribution Examples

```
PURE SPECIALIST (90/5/5)
✅ Unlock ultimate techniques
✅ Master one playstyle
❌ Limited flexibility
❌ Hard-countered by enemies

HYBRID BUILD (50/35/15)
✅ Access 2 path trees
✅ Tactical options
❌ No ultimate techniques
❌ Weaker than pure builds

BALANCED (34/33/33)
✅ Try everything
✅ Learning friendly
❌ Weakest overall
❌ Almost no exclusives
```

### Starting Values

- **Prologue Start:** 33.33 / 33.33 / 33.34 (perfectly balanced)
- **After Each Choice:** Shift using `applyPathShift(current, path, +amount)`
  - Choice adds to chosen path
  - Subtracts equally from other two paths

### Path Effect Mapping

```typescript
{
  type: 'path',
  path: 'blade',
  delta: 5  // Adds 5% to Blade, removes 2.5% from Stream and Shadow
}
```

### Path-to-Aspect Mapping

| Path | Primary Aspect | Philosophy |
|------|---------------|------------|
| Blade | Force (力) | Overwhelming power, breaking guards |
| Stream | Flow (流) | Continuous motion, adaptability |
| Shadow | Precision (准) | Perfect timing, critical strikes |

---

## Layer 2: Aspect Loadout (Rune System)

### Loadout Structure

```
┌─────────────────────────────────────┐
│ PRIMARY SLOT (Path-Locked)          │
│ ┌─────────────────┐                 │
│ │ [FORCE] (BLADE) │  ← Can't change │
│ └─────────────────┘                 │
│                                      │
│ SECONDARY SLOTS (Customizable)      │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐│
│ │ [FLOW]  │ │ [ARMOR] │ │ [EMPTY] ││
│ └─────────┘ └─────────┘ └─────────┘│
└─────────────────────────────────────┘
```

### 8 Chi Aspects

**Primary Aspects (Path-based):**
1. **FORCE (力)** - +15% damage vs defending enemies
2. **FLOW (流)** - +10% combo damage
3. **PRECISION (准)** - +10% critical hit chance

**Secondary Aspects (Unlockable):**
4. **BURST (爆)** - +15% first strike damage
5. **ARMOR (甲)** - +20% defense when HP < 50%
6. **SENSE (感)** - Preview enemy next move (special)
7. **WILL (意)** - 50% resist stuns/debuffs (special)

**Forbidden Aspect:**
8. **INVERSE (逆)** - +25% damage BUT -10% max HP (story-gated)

### Aspect Unlock Progression

| Aspect | Requirement |
|--------|------------|
| Force | 30% Blade path |
| Flow | 30% Stream path |
| Precision | 30% Shadow path |
| Burst | 50 training mastery |
| Armor | 100 training mastery |
| Sense | Chapter 1 + 150 mastery |
| Will | Chapter 2 + 200 mastery |
| Inverse | Story flag: `inverse-chi-awakening` + Chapter 2 |

### Secondary Slot Unlock

| Slot | Requirement |
|------|------------|
| Slot 1 | 50 training mastery |
| Slot 2 | Chapter 1 start |
| Slot 3 | Chapter 2 start |

### Strategic Builds

**Aggressive (Blade):**
- Primary: Force
- Secondary: Burst, Precision, Will
- Style: Glass cannon, maximum damage

**Tactical (Shadow):**
- Primary: Precision
- Secondary: Sense, Burst, Will
- Style: Perfect timing, high crit, read enemy

**Adaptive (Stream):**
- Primary: Flow
- Secondary: Sense, Armor, Force
- Style: See opportunities, adapt to threats

**Forbidden (Endgame):**
- Primary: Any
- Secondary: Inverse, Burst, Precision
- Style: High risk, devastating damage

---

## Layer 3: Training Mastery

### Mastery Point Sources

**Sparring Matches:**
- Base: 5 points
- No damage: +5 bonus
- Combo executed: +3 per combo
- Stance switch: +2 per switch
- Speed (under 10 turns): +5 bonus
- **Max per match:** 15 points

**Loss consolation:** 1 point

### Mastery Unlock Thresholds

```
50:   First path-exclusive technique + Slot 1 + Burst aspect
100:  Second stance + Armor aspect
150:  Advanced combo + Sense aspect (if Ch1)
200:  Final prologue technique + Will aspect (if Ch2)
250:  Demo mastery (ready for Chapter 1)
```

---

## Technique Unlock System

### Unlock Requirements Structure

```typescript
{
  id: "shattering-strike",
  name: "Shattering Strike",
  aspect: "force",
  unlockRequirements: {
    pathPercentage: { path: 'blade', min: 30 },
    aspectRequired: 'force',
    masteryPoints: 50,
  }
}
```

### Requirement Types

1. **pathPercentage:** Minimum percentage in specific path
2. **aspectRequired:** Must have aspect unlocked (not necessarily equipped)
3. **masteryPoints:** Training mastery threshold
4. **techniquePrereq:** Must know another technique first
5. **unlockChapter:** Chapter availability

### Example Technique Progression

**BLADE PATH TREE:**

```
[✓] Flowing Palm Strike
    └─ 0% any path, no requirements

[30% Blade + Force aspect + 50 mastery]
    └─ Shattering Strike
        └─ [60% Blade + Burst aspect + 100 mastery]
            └─ Explosive Fist
                └─ [80% Blade + Force + Burst + Ch1]
                    └─ Blade Storm (Ultimate)
```

**STREAM PATH TREE:**

```
[✓] Flowing Palm Strike

[30% Stream + Flow aspect + 50 mastery]
    └─ Calm Water Palm
        └─ [50% Stream + Sense aspect + Ch1]
            └─ Whirlpool Counter
                └─ [70% Stream + Flow + Will + Ch2]
                    └─ Elder's Teaching (Ultimate)
```

**SHADOW PATH TREE:**

```
[✓] Flowing Palm Strike

[30% Shadow + Precision aspect + 50 mastery]
    └─ Vital Point Strike
        └─ [50% Shadow + Sense aspect + 100 mastery]
            └─ Mist Step
                └─ [80% Shadow + Precision + Will + Ch3]
                    └─ Perfect Form (Ultimate)
```

**HYBRID TECHNIQUES:**

```
[40% in ANY path + Flow + Precision + 150 mastery]
    └─ Adaptive Counter (requires versatility)

[50% Blade + 30% Shadow + Inverse aspect + Ch2]
    └─ Forbidden Strike (hybrid forbidden technique)
```

---

## Progression Flow

### Prologue (Chapter 0)

**Start:**
- Path: 33/33/34 (balanced)
- Aspects: None unlocked yet
- Techniques: Flowing Palm Strike (starter)
- Mastery: 0

**During Prologue (5-7 choices):**
- Path shifts to ~40-45% dominant (player's natural style emerges)
- Primary aspect unlocked when path reaches 30%
- First technique in that path unlocks at prologue end

**Prologue End:**
- Path: ~45/30/25 (leaning toward one)
- Aspects: Primary unlocked (Force/Flow/Precision)
- Techniques: 2-3 (starter + path-specific)
- Mastery: 0 (training unlocks)

### Training Loop (Post-Prologue)

**At 50 Mastery:**
- Unlock: Burst aspect
- Unlock: Secondary slot 1
- Unlock: First path technique (if 30%+ path)

**At 100 Mastery:**
- Unlock: Armor aspect
- Unlock: Secondary stance
- Unlock: Advanced path technique (if 50%+ path)

**At 150 Mastery:**
- Unlock: Advanced combo technique
- Preview: Chapter 1 techniques (grayed out)

**At 200 Mastery:**
- Unlock: Final prologue technique
- Ready: Chapter 1 purchase prompt

**At 250 Mastery:**
- Status: "Demo Master" achievement
- Message: "You've mastered the demo!"

### Chapter 1

**Start:**
- Unlock: Secondary slot 2
- Unlock: Sense aspect (if 150+ mastery)
- New: 15+ techniques available
- Path: Can respec (-5% / +5% once per chapter)

### Chapter 2

**Start:**
- Unlock: Secondary slot 3
- Unlock: Will aspect (if 200+ mastery)
- Story: Inverse chi awakening (Inverse aspect)
- New: 20+ techniques, hybrid trees

### Chapter 3 (Endgame)

**Available:**
- All 8 aspects unlocked
- Ultimate techniques for pure builds (80%+)
- Forbidden techniques (Inverse builds)
- Max mastery rewards

---

## Build Archetypes

### Pure Blade (90/5/5)

**Aspects:** Force + Burst + Precision + Inverse
**Techniques:** All Blade ultimates, Forbidden Strike
**Strength:** Maximum damage, overwhelming power
**Weakness:** Predictable, countered by Armor enemies

### Hybrid Blade/Shadow (60/10/30)

**Aspects:** Force + Precision + Burst + Sense
**Techniques:** High-tier Blade + mid-tier Shadow, Adaptive Counter
**Strength:** Damage + timing, unpredictable
**Weakness:** No ultimate techniques

### Pure Stream (5/90/5)

**Aspects:** Flow + Sense + Will + Armor
**Techniques:** All Stream ultimates, Elder's Teaching
**Strength:** Perfect adaptation, reads everything
**Weakness:** Lower damage ceiling

### Balanced Experimenter (34/33/33)

**Aspects:** Flow + Armor + Burst + Sense
**Techniques:** Low-tier from all paths, no exclusives
**Strength:** Try everything, flexible
**Weakness:** Weakest overall, no mastery

---

## Implementation Checklist

### ✅ Completed

- [x] Zero-sum path percentage system
- [x] `applyPathShift()` function
- [x] AspectLoadout type and system
- [x] Aspect passive bonuses defined
- [x] Aspect unlock progression tree
- [x] Helper functions (unlock checks, bonus calcs)
- [x] Technique unlock requirements type
- [x] `canUnlockTechnique()` validation
- [x] Training mastery point system
- [x] Mastery unlock thresholds

### 🔄 In Progress

- [ ] Populate technique database with requirements
- [ ] Create starter techniques for each path
- [ ] Build aspect loadout UI menu
- [ ] Initialize aspect loadout on game start
- [ ] Integrate unlock checks into training menu

### 📋 Pending

- [ ] Add difficulty selection at game start
- [ ] Implement sparring match system
- [ ] Integrate training into post-prologue flow
- [ ] Create technique unlock notification UI
- [ ] Add path respec system (training)
- [ ] Build hybrid technique trees
- [ ] Create ultimate techniques (80%+ path)
- [ ] Implement Inverse chi awakening scene

---

## Design Philosophy

**Low Floor:**
- Start balanced (33/33/33)
- Choices naturally guide to specialization
- Auto-recommend aspects based on path
- Default loadout works fine

**High Ceiling:**
- Pure builds (80%+) unlock ultimates
- Aspect combinations create synergies
- Hybrid builds access multiple trees
- Training mastery gates power spikes

**Meaningful Choice:**
- Path shifts are permanent (mostly)
- Specialization locks out other trees
- Aspect slots limited (choose 3-4 from 8)
- Build diversity creates replayability

---

**Last Updated:** 2025-12-07
**Status:** Core systems implemented, ready for content population
