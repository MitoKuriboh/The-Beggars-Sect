# Replayable Training Loop Design

**Created:** 2025-12-07
**Purpose:** Design engaging post-Prologue gameplay loop for demo retention
**Goal:** Keep players engaged with mechanical progression between story beats

---

## Problem Statement

**Current:** Prologue ends → "Buy Chapter 1"
**Issue:** No reason to replay, no mechanical engagement after story ends
**Opportunity:** Add training system that lets players experiment and progress

---

## Core Concept: The Training Grounds

**Location:** Beggar's Corner (player hub)
**Unlocks:** After Prologue completion
**Purpose:** Practice combat, unlock techniques, master stances

### Design Philosophy

1. **Progression without story** - Mechanical growth separate from narrative
2. **Repeatable challenges** - Each run teaches something new
3. **Unlock breadcrumbs** - Show what Chapter 1 will bring
4. **Skill expression** - Reward mastery, not grinding

---

## System Architecture

### Training Menu (Post-Prologue)

```
═══ BEGGAR'S CORNER ═══

[1] Training Grounds - Practice combat and unlock techniques
[2] Elder Teachings - Learn about stances and paths
[3] Status - View character progression
[4] Continue to Chapter 1 (Purchase required)
[ESC] Return to Main Menu
```

### Training Grounds Structure

```
═══ TRAINING GROUNDS ═══

Master your techniques through practice.
Current Mastery Points: 45/100 (Next unlock at 50)

[1] Sparring Match - Fight training dummy (Gain 5-10 mastery per win)
[2] Stance Training - Practice stance switching
[3] Technique Challenges - Master specific techniques
[4] Path Trials - Test your dominant path
[ESC] Return to Beggar's Corner
```

---

## Mastery Point System

### How It Works

**Earn Mastery Points:**
- Sparring victory: 5-10 points (based on performance)
- No damage taken: +5 bonus
- Combo executed: +3 per combo
- Stance switch used: +2 per switch
- Under 10 turns: +5 speed bonus

**Spend Mastery Points:**
- Unlock new technique: 50 points
- Upgrade technique level: 25 points
- Unlock new stance: 40 points
- Boost base stats: 15 points each

### Progression Track

```
0-49:   Tutorial phase (learning mechanics)
50:     Unlock first new technique
100:    Unlock second stance
150:    Unlock advanced combo
200:    Unlock final Prologue technique
250+:   Max mastery (ready for Chapter 1)
```

---

## Training Activities

### 1. Sparring Match (Core Loop)

**Setup:**
- Fight AI-controlled training dummy
- Scales to player level
- Can't die (reset at 1 HP)
- Focus on learning, not winning

**Variations:**
- **Standard Dummy:** Balanced stats, predictable AI
- **Aggressive Dummy:** High attack, tests defense
- **Defensive Dummy:** High defense, tests combos
- **Adaptive Dummy:** Counters your dominant path

**Rewards:**
- Mastery points based on performance
- Technique experience (levels up techniques)
- Instant feedback on mistakes

**Example Session:**
```
Round 1: Player tries new combo → fails → learns timing
Round 2: Executes combo → wins → gains 10 mastery
Round 3: Tries different stance → experiments
Round 4: Perfect run → bonus mastery → unlocks technique
```

---

### 2. Stance Training

**Purpose:** Teach stance switching mechanics

**Structure:**
- Tutorial explains each stance's strengths
- Practice switching mid-combat
- Dummy changes tactics, forcing adaptation

**Challenges:**
1. Win using only Flowing Stance
2. Win using only Weathered Stance
3. Win using only Hungry Stance
4. Win by switching stances 3+ times
5. Win using each stance at least once

**Rewards:**
- 15 mastery per challenge completed
- Unlock stance-specific techniques
- Visual indicators show mastery

---

### 3. Technique Challenges

**Purpose:** Deep-dive into individual techniques

**Format:**
- Pick a technique to practice
- 5 challenges per technique
- Teaches optimal usage

**Example: Flowing Palm Strike**
```
Challenge 1: Land 3 consecutive hits
Challenge 2: Use as combo starter
Challenge 3: Use as combo followup
Challenge 4: Land critical hit with it
Challenge 5: Win fight using only this technique

Completion: Technique reaches Level 2 (power boost)
```

**Unlockable Techniques (Demo Preview):**
- **Calm Water Palm** (Stream path exclusive)
- **Shattering Strike** (Blade path exclusive)
- **Mist Step Counter** (Shadow path exclusive)

**Grayed Out (Chapter 1 preview):**
- Weathered Guard
- Hungry Wolf Strike
- Flowing River Combo
- *(Show players what they're missing)*

---

### 4. Path Trials

**Purpose:** Test commitment to chosen path

**Structure:**
- Three trials (Blade, Stream, Shadow)
- Must complete trial matching dominant path
- Harder trials for non-dominant paths

**Blade Trial: "Overwhelming Force"**
- Defeat 3 enemies within 15 turns
- No defending allowed
- Tests aggressive playstyle

**Stream Trial: "Adaptive Flow"**
- Defeat enemy without taking more than 20 damage
- Must use all three stances
- Tests balanced approach

**Shadow Trial: "Patient Predator"**
- Defeat enemy using only counters/defense
- Win without dropping below 50% HP
- Tests defensive mastery

**Rewards:**
- 25 mastery points per trial
- Path-exclusive technique preview
- Cutscene with corresponding Elder

---

## Unlockable Content (Demo)

### Techniques Available

**Starting (Prologue):**
1. Flowing Palm Strike
2. Basic Guard

**Unlockable (Training):**
3. Calm Water Palm (50 mastery, Stream)
4. Shattering Strike (50 mastery, Blade)
5. Mist Step Counter (50 mastery, Shadow)
6. Advanced combo techniques (100+ mastery)

**Previewed (Chapter 1):**
- Shows 10+ grayed-out techniques
- "Unlock in Chapter 1" tooltip
- Creates desire to purchase

### Stance Progression

**Starting:** Flowing (everyone)
**Training Unlock:** Path-aligned stance (40 mastery)
**Chapter 1 Preview:** Third stance locked behind purchase

---

## UI/UX Flow

### First Training Session

```
[Player enters Training Grounds]

ELDER CHEN: "Welcome to the training grounds, Li Wei."
ELDER CHEN: "Here you can hone your skills without risk."
ELDER CHEN: "Each victory brings mastery. Each failure, wisdom."

[Tutorial: Sparring basics]

ELDER WU: "The dummy will test you. Show me what you've learned."

[First sparring match - easy opponent]

[Victory]

SYSTEM: Earned 10 Mastery Points (10/50 to next unlock)
SYSTEM: Technique Experience +5 (Flowing Palm Strike)

ELDER MEI: "Not bad! But you're barely scratching the surface."
ELDER MEI: "Keep training. I have something special to teach you at 50 mastery."

[Hint: Path-exclusive technique preview]
```

### Unlock Moment

```
[Player reaches 50 mastery]

SYSTEM: ✨ MASTERY THRESHOLD REACHED ✨
SYSTEM: New technique available!

[Elder corresponding to dominant path approaches]

ELDER MEI (Shadow path): "You've proven yourself observant."
ELDER MEI: "Time to learn Mist Step Counter."

[Technique tutorial]

ELDER MEI: "This is just the beginning. In Chapter 1..."
ELDER MEI: "...you'll master techniques that make this look like child's play."

[Cutscene shows glimpse of advanced Shadow techniques]
[Ends with: "Continue your journey in Chapter 1"]
```

---

## Progression Pacing

### Target Time Investment

**To first unlock (50 mastery):**
- 6-8 sparring matches
- ~15-20 minutes

**To second unlock (100 mastery):**
- 12-15 sparring matches
- ~30-40 minutes total

**To "demo mastery" (200 mastery):**
- 25-30 sparring matches
- ~60-90 minutes total

**Diminishing returns after 200:**
- Encourages purchase rather than grinding
- "You've mastered the basics. Chapter 1 awaits."

---

## Retention Hooks

### Why Players Keep Training

1. **Clear progression bar** - "45/50 to next unlock"
2. **Variety of challenges** - Not just "fight dummy 50 times"
3. **Path identity reinforcement** - Unlocks feel personalized
4. **Skill improvement** - Actually get better at combat
5. **Chapter 1 previews** - Constant reminders of what's next

### Conversion Funnel

```
Finish Prologue (100 players)
├─ Try training once (85 players)
├─ Unlock first technique (60 players)
├─ Complete path trial (45 players)
└─ Reach 200 mastery (30 players)
    └─ Purchase Chapter 1 (20 players) = 67% conversion
```

**Much better than: Finish Prologue → Buy (50% conversion)**

---

## Technical Implementation

### Data Structures

```typescript
interface TrainingProgress {
  masteryPoints: number;
  techniquesUnlocked: string[];
  challengesCompleted: string[];
  pathTrialCompleted: {
    blade: boolean;
    stream: boolean;
    shadow: boolean;
  };
  sparringWins: number;
  bestPerformance: {
    fastestWin: number; // turns
    mostDamage: number;
    longestCombo: number;
  };
}
```

### Mastery Calculation

```typescript
function calculateMasteryGain(combatResult: CombatResult): number {
  let mastery = 5; // Base

  if (combatResult.playerDamageTaken === 0) mastery += 5; // No damage
  if (combatResult.combosExecuted > 0) mastery += combatResult.combosExecuted * 3;
  if (combatResult.stanceSwitches > 0) mastery += combatResult.stanceSwitches * 2;
  if (combatResult.turnsToWin <= 10) mastery += 5; // Speed bonus

  return Math.min(mastery, 15); // Cap at 15 per match
}
```

### Unlock System

```typescript
const MASTERY_UNLOCKS = {
  50: { type: 'technique', id: 'path-exclusive-1' },
  100: { type: 'stance', id: 'secondary-stance' },
  150: { type: 'technique', id: 'advanced-combo' },
  200: { type: 'achievement', id: 'demo-master' },
} as const;
```

---

## Elder Interactions (Flavor)

### Training Dialogue

**Elder Chen (Stream):**
- "Combat is a conversation. Listen to what your opponent tells you."
- "Every defeat teaches more than victory. What did you learn?"

**Elder Wu (Blade):**
- "Stop thinking. Start hitting."
- "Hesitation kills. Commit to your strikes."

**Elder Mei (Shadow):**
- "Watch how they move. Predict, don't react."
- "Patience is a weapon sharper than any blade."

**Old Dao (Mysterious):**
- Occasionally appears
- "You grow stronger. But strength is not power."
- "The Calibration Initiative knows you're here. Prepare."
- Foreshadows Chapter 1 conflict

---

## Balancing Considerations

### Prevent Grinding

1. **Diminishing returns:** After 200 mastery, gains reduced by 50%
2. **Daily bonus:** First 3 matches give 2x mastery (encourages daily play, not marathon)
3. **Soft cap:** At 250 mastery, message: "You've mastered the demo. Chapter 1 awaits."

### Maintain Challenge

1. **Scaling dummy:** Difficulty increases with player mastery
2. **No auto-win:** Player must actually execute well
3. **Failure is learning:** Loss gives 1-2 mastery (still progress, but slower)

### Respect Player Time

1. **Skip tutorial:** After first session, jump straight to sparring
2. **Quick restart:** "Rematch" button after each fight
3. **Clear progress:** Always show "X/Y to next unlock"

---

## Chapter 1 Integration

### When Purchased

**Training becomes:**
- Story missions unlock
- Training still available (practice for story fights)
- New unlocks at higher mastery tiers
- Elder teachings expand

**Mastery carries over:**
- All unlocked techniques
- Current stance proficiency
- Stat boosts
- Achievements

**New content:**
- 20+ more techniques
- Advanced combos
- Boss-specific challenges
- PvP sparring (future)

---

## Success Metrics

**Goals:**

| Metric | Target |
|--------|--------|
| Players who try training | 80%+ |
| Average mastery at purchase | 150+ |
| Time in demo | 60+ minutes |
| Purchase conversion | 60%+ |

**Why this works:**

1. **Engagement:** Players invest time, creates sunk cost
2. **Skill:** Players get GOOD, want to use skills in Chapter 1
3. **Preview:** Constant reminders of locked content
4. **Identity:** Path-exclusive unlocks create personal investment

---

## Implementation Priority

### Phase 1 (Core Loop) - 12 hours
- [ ] Training menu UI
- [ ] Basic sparring match
- [ ] Mastery point system
- [ ] First technique unlock (50 mastery)

### Phase 2 (Variety) - 8 hours
- [ ] Stance training challenges
- [ ] Technique-specific challenges
- [ ] Path trials
- [ ] Elder dialogue integration

### Phase 3 (Polish) - 6 hours
- [ ] Unlock animations
- [ ] Progress tracking
- [ ] Leaderboards (best performance)
- [ ] Chapter 1 preview cutscenes

**Total:** ~26 hours for complete system
**MVP:** Phase 1 only (~12 hours) for functional loop

---

## Alternative: Lite Version (6 hours)

If 26 hours is too much, **Lite Training Loop:**

**Just:**
1. Sparring match (repeatable)
2. Mastery bar (shows progress to Chapter 1)
3. One unlock at 100 mastery (preview technique)
4. Elder dialogue explaining system

**Removes:**
- Stance training
- Technique challenges
- Path trials
- Multiple unlocks

**Still achieves:**
- Replayability ✅
- Progression feeling ✅
- Chapter 1 preview ✅
- Extended engagement ✅

---

## Recommendation

**Implement Lite Version first** (6 hours)
- Test player engagement
- Validate mastery system
- Gather feedback
- Expand to full version if successful

**Why:**
- Faster to market
- Easier to balance
- Proves concept
- Can iterate based on data

**Full version:**
- Implement post-launch if metrics support it
- Use Chapter 1 development time
- Refine based on player behavior

---

## Next Steps

1. ✅ Path-to-stance auto-selection (COMPLETE)
2. [ ] Implement Lite Training Loop (6 hours)
3. [ ] Playtest with fresh players
4. [ ] Measure engagement metrics
5. [ ] Decide on full version based on data

---

**The goal:** Turn "20-minute demo" into "60-minute engaging experience" that creates FOMO for Chapter 1.

**Last Updated:** 2025-12-07
