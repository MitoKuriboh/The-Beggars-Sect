# Combat System - Complete Concept

**Game:** The Beggars Sect: Li Wei's Ascension
**Version:** 1.0
**Date:** 2024-12-04
**Status:** Concept Design

---

## Overview

Turn-based strategic combat system inspired by Final Fantasy X, Pokemon, and Digimon, enhanced with AI automation for unique experiences.

**Core Pillars:**
- **Strategic Depth** - Stances, combos, resource management
- **Accessibility** - Easy to learn, hard to master
- **Uniqueness** - AI-powered variations and dynamic difficulty
- **Beggar Flavor** - Deceptive tactics, street-smart combat

---

## Turn Order System

### ATB (Active Time Battle) Style

**Inspired by:** Final Fantasy X

**How it works:**
```
Turn Order Queue:
┌─────────────────────────────────────────────┐
│ [Li Wei] → [Thug A] → [Thug B] → [Li Wei] → [Thug A] → ...
└─────────────────────────────────────────────┘

Players can see upcoming 5-7 turns
Plan combos and timing
Fast characters act more frequently
```

**Speed Stat determines:**
- Position in turn queue
- How often you act
- Combo timing windows

**Advantages:**
- See what's coming (strategic planning)
- Speed matters significantly
- Time combos with enemy actions
- Feels dynamic and engaging

---

## Action System

### Available Actions (Every Turn)

```
┌─ YOUR TURN ─────────────────────────────┐
│                                          │
│  HP: ████████░░ 80/100                  │
│  Chi: ████░░░░░░ 20/50                  │
│  Stance: FLOWING                         │
│                                          │
│  [1] Attack      - Basic palm strike    │
│  [2] Technique   - Special moves        │
│  [3] Defend      - Guard stance         │
│  [4] Chi Focus   - Recover energy       │
│  [5] Item        - Use consumables      │
│  [6] Stance      - Change stance        │
│  [7] Flee        - Escape combat        │
│                                          │
└──────────────────────────────────────────┘
```

### 1. ATTACK - Basic Palm Strike

**Stats:**
- Damage: (Strength × 1.2) - Enemy Defense
- Chi Cost: 0
- Chi Gain: +2
- Speed: Fast (minimal turn delay)

**When to use:**
- Conserve chi
- Build chi for techniques
- Maintain combo chains
- Finish wounded enemies

**Upgrades (mastery-based):**
- Level 1: Basic attack
- Level 3: +10% damage
- Level 5: +15% critical chance
- Level 7: Chance to stagger enemy

---

### 2. TECHNIQUE - Special Moves

**Technique Menu:**
```
┌─ TECHNIQUES ────────────────────────────┐
│                                          │
│  Palm Techniques:                        │
│  [1] Weathered Palm (5 Chi) ★★★☆☆       │
│      Heavy damage, medium speed          │
│      Mastery: 60% → Next: Break Defense  │
│                                          │
│  [2] Flowing Strike (3 Chi) ★★★★☆       │
│      Fast combo starter, light damage    │
│      Mastery: 80% → Next: Double Hit     │
│                                          │
│  [3] Iron Palm (8 Chi) ★★☆☆☆            │
│      Defense break, slow                 │
│      Mastery: 40% → Next: Armor Crush    │
│                                          │
│  [4] Deceptive Palm (6 Chi) ★★★☆☆       │
│      Counter-based, reactive             │
│      Mastery: 55% → Next: True Counter   │
│                                          │
│  [?] ??? - Discover more techniques!     │
│                                          │
└──────────────────────────────────────────┘
```

**Technique Properties:**
- **Chi Cost:** Resource management
- **Power:** Damage multiplier
- **Speed:** Turn delay
- **Effects:** Stun, break, buff, debuff
- **Mastery:** Increases with use
- **Combos:** Chains with other techniques

**Discovery System:**
- Find through exploration
- Learn from elders
- Enemy drops (rare)
- Quest rewards
- Experimentation unlocks

---

### 3. DEFEND - Guard Stance

**Effects:**
- Reduce incoming damage: 50%
- Chi gained when hit: +5 (instead of +3)
- Set up counter opportunities
- Brief defense buff (1 turn)

**Strategic uses:**
- Survive enemy ultimate
- Build chi safely
- Wait for combo window
- Counter-based playstyle

**Advanced (mastered):**
- Perfect Parry: 75% reduction
- Counter Strike: Auto-attack after defend
- Chi generation: +8 when hit

---

### 4. CHI FOCUS - Meditate/Recover

**Effects:**
- Immediate chi recovery: +15
- Clears negative status effects
- Brief invulnerability to interrupts
- Lose turn (speed penalty)

**Risk/Reward:**
- Gives enemy free action
- But recovers significant resources
- Strategic timing crucial

**Use cases:**
- Before big combo
- After spending all chi
- Clear debuffs
- Desperate recovery

---

### 5. ITEM - Consumables

**Item Types:**

**Healing:**
- Rice Ball: +30 HP (common)
- Beggar's Feast: +100 HP (rare)
- Elder's Brew: Full HP (very rare)

**Chi Recovery:**
- Meditation Incense: +20 Chi
- Spirit Tea: +50 Chi

**Buffs:**
- Strength Tonic: +20% damage (3 turns)
- Swift Elixir: +30% speed (3 turns)
- Iron Skin Salve: +40% defense (3 turns)

**Special:**
- Technique Scroll: Learn new technique instantly
- Mastery Pill: +10% mastery to one technique

---

### 6. STANCE - Change Combat Style

**Stance Change:**
- Costs: 5-10 chi (depends on stance)
- Instant effect
- Changes available techniques
- Modifies stats

**See Stance System section for details**

---

### 7. FLEE - Escape Combat

**Mechanics:**
- Success chance: (Your Speed - Enemy Speed) × 10%
- Minimum: 30%, Maximum: 90%
- Failed flee: Wasted turn, enemy acts
- Boss fights: Cannot flee

**When to flee:**
- Overwhelmed
- Low resources
- Wrong matchup
- Want to save progress

---

## Combat Stats

### Primary Stats

**STRENGTH**
- **Affects:** Physical damage, technique power
- **Scales:** All palm techniques
- **Formula:** Damage = (Technique Power × Strength) - Defense
- **Growth:** Use strength-based techniques

**DEXTERITY**
- **Affects:** Turn speed, evasion, critical chance
- **Turn Speed:** Speed = Base Speed × (1 + Dex/100)
- **Evasion:** 5% + (Dex × 0.5%)
- **Critical:** 10% + (Dex × 0.3%)
- **Growth:** Use fast techniques, dodge attacks

**ENDURANCE**
- **Affects:** Max HP, defense, chi recovery
- **Max HP:** 100 + (Endurance × 10)
- **Defense:** Endurance × 0.8
- **Chi Recovery:** +1 per turn per 10 END
- **Growth:** Take damage, defend often

**APTITUDE (Hidden)**
- **Affects:** Mastery growth, chi efficiency, combo discovery
- **Mastery Rate:** 1.0 + (Aptitude × 0.05)
- **Chi Efficiency:** Techniques cost slightly less
- **Combo Hints:** Higher chance of AI suggestions
- **Growth:** Cannot be increased (innate talent)

**CHI/WISDOM**
- **Affects:** Max chi, chi generation, technique effectiveness
- **Max Chi:** 50 + (Wisdom × 5)
- **Generation:** Base rate × (1 + Wisdom/100)
- **Technique Power:** +1% per point of Wisdom
- **Growth:** Meditate, use techniques

---

### Secondary Stats

**Health (HP)**
- **Max:** 100 + (Endurance × 10)
- **Regeneration:** 1 HP/turn outside combat
- **0 HP:** Defeat, respawn at checkpoint

**Chi (CP)**
- **Max:** 50 + (Wisdom × 5)
- **Generation:**
  - Basic attack: +2
  - Defend: +5 (or +8 if hit while defending)
  - Chi Focus: +15
  - Get hit: +3
  - Combo finisher: +10
- **Natural regen:** 1 per turn (increased by Wisdom)

**Attack Power**
- **Formula:** (Strength × Technique Multiplier) + Weapon Bonus
- **Modified by:** Stance, buffs, debuffs

**Defense**
- **Formula:** Endurance × 0.8
- **Modified by:** Stance, armor, defend action

**Speed**
- **Formula:** Base Speed × (1 + Dexterity/100)
- **Determines:** Turn frequency, evasion, initiative

**Critical Chance**
- **Base:** 10%
- **Modified by:** Dexterity, technique, stance
- **Critical Damage:** 1.5× normal damage

**Evasion**
- **Base:** 5%
- **Formula:** 5% + (Dexterity × 0.5%)
- **Caps at:** 50% (can't be unhittable)

---

## Damage Formula

### Basic Damage Calculation

```
Step 1: Base Damage
Base = (Technique Power × Strength) - Enemy Defense

Step 2: Apply Modifiers
Modifiers include:
- Critical Hit: ×1.5
- Stance Bonus: ×1.3 (e.g., Hungry Stance)
- Combo Chain: +(10% × combo count)
- Element/Type Advantage: ×1.25
- Mastery Bonus: +(mastery level × 2%)

Step 3: Random Variance
Final = Base × (0.9 to 1.1 random)

Step 4: Apply Defense
If Defending: Final × 0.5
If Perfect Parry: Final × 0.25
```

### Example Calculation

```
Li Wei uses Weathered Palm on Urban Thug

Technique Power: 25
Li Wei's Strength: 20
Thug's Defense: 10
Li Wei in Hungry Stance: +30% damage
Combo chain (2nd hit): +10%
Mastery 60%: +12%
Random roll: 1.05 (105%)

Base = (25 × 20) - 10 = 490
Stance: 490 × 1.3 = 637
Combo: 637 × 1.1 = 700.7
Mastery: 700.7 × 1.12 = 784.8
Random: 784.8 × 1.05 = 824

Final Damage: 824... wait that's too high!

Let me recalculate with more reasonable numbers:

Base = (Technique Power × (Strength/10)) - Defense
Base = (25 × 2) - 10 = 40
Stance: 40 × 1.3 = 52
Combo: 52 × 1.1 = 57.2
Mastery: 57.2 × 1.12 = 64
Random: 64 × 1.05 = 67

Final Damage: 67
Thug takes 67 damage!
```

*Note: Formula needs balancing during implementation*

---

## Stance System

### Core Mechanic

**What are Stances:**
- Combat modes that modify stats and available techniques
- Change mid-battle for tactical advantage
- Cost chi to switch (5-10 chi)
- Each unlocks unique techniques
- Defines playstyle

### Available Stances

#### FLOWING STANCE (Default)
**Philosophy:** Balance and adaptability

**Stat Modifiers:**
- Attack: ±0%
- Defense: ±0%
- Speed: ±0%
- Chi generation: Normal

**Special Properties:**
- Access to all basic techniques
- No penalties
- Combo-focused

**Unique Techniques:**
- Flowing Strike (combo starter)
- Stream Palm (fluid attack)
- Ripple Defense (parry variant)

**When to use:**
- Default stance
- Balanced approach
- Learning enemy patterns
- Combo-heavy playstyle

---

#### WEATHERED STANCE (Defensive)
**Philosophy:** Tank and endure

**Stat Modifiers:**
- Attack: -10%
- Defense: +50%
- Speed: -20%
- Chi generation: +30%

**Special Properties:**
- Counter opportunities after defending
- Reduced critical damage taken
- Chi builds faster

**Unique Techniques:**
- Iron Palm (armor break)
- Steadfast Guard (enhanced defend)
- Retribution Strike (counter attack)

**When to use:**
- Facing strong enemies
- Need to build chi safely
- Counter-based strategy
- Survive ultimates

---

#### HUNGRY STANCE (Aggressive)
**Philosophy:** Glass cannon

**Stat Modifiers:**
- Attack: +30%
- Defense: -30%
- Speed: +10%
- Chi generation: +50% (from attacks)

**Special Properties:**
- Critical chance +15%
- Chi gained from attacking doubled
- Risk/reward gameplay

**Unique Techniques:**
- Ravenous Palm (high damage, low cost)
- Desperate Strike (stronger when low HP)
- Feral Combo (aggressive chain)

**When to use:**
- Burst damage needed
- Enemy low on HP (finish them)
- Aggressive playstyle
- Chi-generation strategy

---

#### DECEPTIVE STANCE (Advanced)
**Philosophy:** Beggar's cunning

**Stat Modifiers:**
- Attack: +20%
- Defense: -20%
- Speed: +15%
- Chi generation: Normal

**Special Properties:**
- First hit on you triggers auto-counter
- Critical chance +50%
- Appear weaker than you are (enemy AI misjudges)

**Unique Techniques:**
- Bait Strike (intentional vulnerability → counter)
- False Weakness (feign low HP, boost next attack)
- Hidden Fang (surprise critical)

**When to use:**
- Mind games against smart AI
- Counter-based strategy
- High-skill plays
- Beggar archetype fantasy

**Unlock Requirement:**
- Master Flowing, Weathered, and Hungry stances
- Complete elder trial
- Story progression (Chapter 3)

---

### Stance Switching Strategy

**Chi Cost:**
- Flowing → Weathered/Hungry: 5 chi
- Weathered ↔ Hungry: 10 chi (opposite styles)
- Any → Deceptive: 8 chi

**Optimal Switching:**
```
Example fight flow:

Start: Flowing Stance (balanced)
  ↓
Enemy buffs: Switch to Hungry (burst damage)
  ↓
Enemy ultimate incoming: Switch to Weathered (survive)
  ↓
Counter opportunity: Weathered counter strike
  ↓
Enemy weakened: Switch to Hungry (finish)
```

---

## Combo System

### How Combos Work

**Chain Attacks:**
- Certain techniques link together
- Must be used in sequence
- Timing window: Within next 2 turns
- Bonus damage and effects
- Chi refund on completion

**Combo Structure:**
```
[Starter] → [Follow-up] → [Finisher]
    ↓           ↓             ↓
  +0%        +10%          +30%
```

### Beginner Combos

**Quick Chain**
```
Quick Palm → Quick Palm → Heavy Palm
Cost: 0 + 0 + 0 chi (basic attacks)
Effect: 3rd hit deals +30% damage
Bonus: +10 chi on finisher
```

**Flowing River**
```
Flowing Strike → Stream Palm → Ripple Defense
Cost: 3 + 4 + 2 = 9 chi
Effect: Final defend has counter built-in
Bonus: +15 chi if counter triggers
```

### Advanced Combos

**Iron Breaker**
```
Weathered Stance → Iron Palm → Retribution Strike
Cost: 5 (stance) + 8 + 5 = 18 chi
Effect: Break defense → massive counter damage
Bonus: Stun enemy for 1 turn
```

**Deceptive Fang**
```
Deceptive Stance → Bait Strike → Hidden Fang
Cost: 8 (stance) + 6 + 7 = 21 chi
Effect: Auto-counter → guaranteed critical
Bonus: +100% critical damage
```

### Master Combos

**Dragon's Descent** (Discovered, not taught)
```
Stance Change: Hungry → Flowing Strike → Quick Jab → Weathered Palm → Dragon Palm Finisher
Cost: 10 + 3 + 0 + 5 + 15 = 33 chi
Requirements: All palm styles at ★★★★☆ mastery
Effect: Devastating 5-hit combo
Bonus: Full chi refund if kills enemy
```

**Beggar's Deception** (Ultimate)
```
Deceptive Stance → Defend (bait) → False Weakness → [Enemy attacks] → Hidden Fang → Feral Combo → Dragon Palm
Requirements: Deceptive stance mastered, story progression
Effect: Ultimate counter-based combo
Bonus: Invincible during execution
```

### Combo Discovery

**How players find combos:**

1. **Experimentation:**
   - Try different technique sequences
   - Game recognizes patterns
   - "New combo discovered!" notification

2. **Elder Teaching:**
   - Talk to elders
   - They suggest combinations
   - Must practice to unlock

3. **AI Hints:**
   ```
   After using Flowing Strike:

   ┌─ COMBO HINT ───────────────┐
   │ Try following up with:      │
   │ - Stream Palm (flowing)     │
   │ - Quick Jab (speed)         │
   │ Experiment to discover!     │
   └─────────────────────────────┘
   ```

4. **Observation:**
   - Watch enemy combos
   - Rare: Learn by being hit
   - Study lone wolf fights

5. **Scrolls & Quests:**
   - Hidden scrolls teach combos
   - Quest rewards
   - Achievement unlocks

---

## Chi Management

### Chi Generation

**Sources:**
| Action | Chi Gained |
|--------|------------|
| Basic Attack | +2 |
| Defend (not hit) | +5 |
| Defend (hit) | +8 |
| Chi Focus | +15 |
| Get Hit | +3 |
| Combo Finisher | +10 |
| Critical Hit | +5 |
| Defeat Enemy | +20 |

**Stance Modifiers:**
- Hungry Stance: Attack chi doubled (+4)
- Weathered Stance: Defend chi +30% (+6/+10)
- Natural regen: +1 per turn (+1 per 10 Wisdom)

### Chi Consumption

**Technique Costs:**
- Basic: 0 chi (attacks)
- Light: 3-5 chi (common techniques)
- Medium: 6-10 chi (advanced)
- Heavy: 11-15 chi (powerful)
- Ultimate: 16-20 chi (rare, devastating)

**Stance Changes:**
- Same family: 5 chi
- Opposite family: 10 chi
- Advanced stance: 8 chi

### Strategic Chi Economy

**Conservative Play:**
```
Turn 1: Attack (+2 chi)
Turn 2: Attack (+2 chi)
Turn 3: Defend (+5 chi, now 9 total)
Turn 4: Medium Technique (-8 chi, 1 left)
Repeat
```

**Aggressive Play:**
```
Turn 1: Switch Hungry Stance (-5 chi, -5 total)
Turn 2: Attack in Hungry (+4 chi, -1 total)
Turn 3: Attack in Hungry (+4 chi, +3 total)
Turn 4: Heavy Technique (-12 chi, -9 total)
Turn 5: Chi Focus (+15 chi, +6 total)
Turn 6: Ultimate Technique (-18 chi, -12 total)
Risk: Low chi, vulnerable
```

**Balanced Play:**
```
Mix of attacks, techniques, and defense
Maintain 15-25 chi reserve
Always have technique options
Adapt to situation
```

---

## Automation Enhancements

### 1. Procedural Enemy Variations

**Base Template:**
```json
{
  "archetype": "Urban Thug",
  "hp": 100,
  "stats": { "str": 15, "dex": 10, "end": 12 },
  "techniques": ["Punch", "Kick"],
  "ai_pattern": "aggressive"
}
```

**Claude AI Enhancement:**
```
Input: Generate Urban Thug variation, difficulty: medium

Output:
{
  "name": "Scarred Enforcer",
  "hp": 120,
  "stats": { "str": 18, "dex": 8, "end": 15 },
  "techniques": ["Brutal Hook", "Knee Strike", "Desperation Blow"],
  "ai_pattern": "aggressive_defensive_hybrid",
  "personality": "Talks trash, becomes desperate when low HP",
  "dialogue": {
    "start": "You picked the wrong alley, beggar!",
    "low_hp": "You... you're stronger than you look!",
    "defeat": "The Sect... will hear about this..."
  },
  "unique_ability": {
    "name": "Desperation Strike",
    "trigger": "HP < 30%",
    "effect": "Attack +50%, Defense -50%"
  },
  "loot": ["Rice Ball", "5 coins", "Rare: Technique Scroll (2%)"]
}
```

**Result:** Every encounter feels unique!

---

### 2. Dynamic Difficulty Adjustment

**The System Tracks:**
```
Player Performance Metrics:
- Win rate (last 10 fights)
- Average fight duration
- Deaths per session
- Technique usage diversity
- Combo discovery rate
- Resource management (chi/items)
```

**AI Adjusts Invisibly:**

**If Player Dominating:**
```
Adjustments:
- Enemy stats: +10-15%
- AI uses better tactics
- More aggressive patterns
- Unlock rare techniques earlier
- Fewer item drops
- Introduce challenging enemies sooner
```

**If Player Struggling:**
```
Adjustments:
- Enemy stats: -10-15%
- AI makes occasional mistakes
- Elder offers hint dialogue
- More healing item drops
- Easier technique discovery
- Hint system activates
```

**Sweet Spot:**
```
Target: 70% win rate, avg fight 8-12 turns
Maintains challenge without frustration
Player feels skilled but tested
```

---

### 3. Combo Discovery Assistant

**Mid-Combat Hints:**
```
Player action: Flowing Strike

AI recognizes potential combo:

┌─ COMBO OPPORTUNITY ─────────┐
│ Flowing Strike used!         │
│                              │
│ Suggested follow-ups:        │
│ [1] Stream Palm (powerful)   │
│ [2] Quick Jab (fast)         │
│ [3] Defend (tactical)        │
│                              │
│ Experiment to unlock combo!  │
└──────────────────────────────┘
```

**Post-Combat Analysis:**
```
┌─ COMBAT REPORT ──────────────────────┐
│                                       │
│ Victory! +50 XP                       │
│                                       │
│ Performance:                          │
│ • Weathered Palm mastery: +5%        │
│ • New combo discovered: Iron Breaker │
│ • Chi efficiency: 85% (Good!)        │
│                                       │
│ Suggestions:                          │
│ • Try using Defend more (builds chi) │
│ • Hungry Stance available - explore? │
│ • 3 more combos possible with        │
│   current techniques                  │
│                                       │
└───────────────────────────────────────┘
```

**Adaptive Learning:**
- Tracks player playstyle
- Suggests combos matching style
- Doesn't spoil discovery
- Guides without hand-holding

---

### 4. Living World Combat Events

**n8n Triggers Mid-Fight:**

**Weather System:**
```
*Dark clouds gather overhead*
*Rain begins to fall*

Effects:
- All fighters: Dexterity -10%
- Water-based techniques: +20% power
- New: Rain Palm technique available (temporary)
- Visual: ASCII rain animation
```

**Time-Based Events:**
```
*Spartan patrol approaches - 5 turns!*

Options:
1. Defeat enemy quickly (bonus reward)
2. Flee before patrol arrives
3. Risk: Patrol joins fight (2v1 becomes 3v1)

Strategic decision under time pressure
```

**World Events:**
```
*WORLD EVENT: Faction War Active*

Urban Thugs vs Spartans conflict:
- Thug encounters: +30% more common
- Thug morale: Low (easier fights)
- Rare loot: Increased drop rate
- Story impact: Choose side?
```

**Community Triggers:**
```
*Player "DragonFist92" discovered rare technique nearby!*

Hint: "Hidden scroll in Eastern Alley"
Effect: Rare enemy has 5% chance to spawn with technique
Community impact: Shared discoveries benefit all
```

---

### 5. AI-Powered Boss Behavior

**Adaptive Boss Fight Example:**

**Boss: Elder Test (Sect Trial)**

**Phase 1 (100-70% HP): Testing Basics**
```
AI Behavior:
- Uses only basic techniques
- Patterns are readable
- Deliberately leaves openings
- Teaches through combat

Dialogue:
"Show me your fundamentals, young one."

If player struggling:
- Opens more often
- Uses weaker attacks
- Hints at weaknesses

If player dominating:
- Begins phase 2 early
- "Impressive. But can you handle this?"
```

**Phase 2 (70-40% HP): True Skill**
```
AI Behavior:
- Unlocks advanced techniques
- Uses combos
- Adapts to player patterns
- Punishes repeated tactics

Analysis:
If player spams Flowing Strike:
  → Elder starts countering it
  → "I see your favorite move..."

If player varies attacks:
  → Elder shows respect
  → "You understand adaptation!"
```

**Phase 3 (40-0% HP): Ultimate Test**
```
Claude AI generates unique finale:

Based on player's style:
- Defensive player: Elder goes aggressive
- Aggressive player: Elder becomes tank
- Balanced player: Elder mirrors perfectly

Dialogue (AI generated based on fight):
"You fight like [observation].
 But a true beggar must [challenge]!"

Final move (procedurally created):
Combines elements of player's most-used techniques
Forces player to face their own style
```

**Result:**
- Every boss fight feels personal
- No two playthroughs identical
- AI learns and adapts
- Memorable encounters

---

### 6. Intelligent Enemy AI

**AI Decision-Making:**

**Basic Enemy (Urban Thug):**
```
Priority list:
1. If HP < 30%: Desperation Strike
2. If player defending: Use grab attack
3. If player low HP: Aggressive combo
4. Default: Random attack from pool

Simple but effective
```

**Advanced Enemy (Spartan Warrior):**
```
Analyzes:
- Player's most-used technique
- Current stance
- Chi level
- Combo patterns

Decisions:
- Counter player's favorite move
- Switch stance to counter player
- Save chi for ultimate when player vulnerable
- Adaptive, intelligent

After 3 encounters with player:
- Remembers tactics
- Adjusts strategy
- "You won't trick me twice!"
```

**Master Enemy (Lone Wolf):**
```
Full AI engine:
- Predicts player actions
- Baits into traps
- Uses environment
- Perfect combos
- Reads player skill level

Dynamic dialogue:
"I've fought beggars before. You're different."
"That technique... where did you learn it?"
```

---

## Environmental Combat

### Urban Arena Elements

**Dynamic Arenas:**
```
┌─ COMBAT ARENA: BACK ALLEY ─────────┐
│                                     │
│      [Rooftop Access]               │
│            ↑                        │
│    [Wall] [Li Wei] [Stall]         │
│            ↓                        │
│      [Alley Exit]                   │
│                                     │
│  Enemy: [Thug] (blocking exit)     │
│                                     │
└─────────────────────────────────────┘
```

**Environmental Actions:**

**[Wall]**
```
Actions:
- Leap Off Wall (dodge + counter attack)
  Cost: 5 chi
  Effect: Auto-dodge next attack + bonus damage

- Corner Enemy (tactical positioning)
  Cost: 3 chi
  Effect: Enemy defense -20% for 2 turns
```

**[Alley Exit]**
```
Actions:
- Narrow Passage (limit movement)
  Cost: 0 chi
  Effect: Enemy can't use wide-range attacks

- Escape Route (improved flee)
  Cost: 0 chi
  Effect: Flee success rate +30%
```

**[Market Stall]**
```
Actions:
- Improvised Weapon (temporary buff)
  Cost: 4 chi
  Effect: +15 attack for 3 turns

- Cause Distraction (disable enemy)
  Cost: 6 chi
  Effect: Enemy loses next turn
```

**[Rooftop Access]**
```
Actions:
- High Ground Advantage
  Cost: 8 chi (climbing)
  Effect: +25% damage, +15% evasion
  Limited: 3 turns before must descend
```

### Beggar Environmental Advantage

**Street Smarts:**
- Environmental actions cost -50% chi (beggars know the streets)
- Hidden paths only beggars can see
- Can use "Beggar's Shortcuts" to reposition for free
- Improvised weapons more effective (+25%)

**Environmental Techniques:**
```
Beggar-Exclusive Moves:

Wall Runner (requires wall):
- Use wall to chain attacks
- 3-hit combo using wall momentum
- Cost: 7 chi

Alley Ambush (requires narrow space):
- Use confined space for advantage
- Guaranteed critical on next attack
- Cost: 6 chi

Market Chaos (requires market area):
- Create diversion
- All enemies confused for 2 turns
- Cost: 10 chi
```

---

## Visual Feedback (CLI)

### Combat Display Layout

```
┌─────────────────── COMBAT ────────────────────────┐
│                                                    │
│  ┌─ LI WEI ─────────────────────────────────┐    │
│  │ HP: ████████░░ 80/100 (80%)              │    │
│  │ Chi: ████░░░░░░ 20/50 (40%)              │    │
│  │ Stance: FLOWING                           │    │
│  │ Status: [Combo +2] [Speed Up]            │    │
│  └───────────────────────────────────────────┘    │
│                                                    │
│               ⚔️  VS  ⚔️                          │
│                                                    │
│  ┌─ SCARRED ENFORCER ──────────────────────┐    │
│  │ HP: ████████████ 120/120 (100%)         │    │
│  │ Chi: ██████░░░░ 30/50 (60%)             │    │
│  │ Status: [Aggressive] [Guard Break]       │    │
│  └───────────────────────────────────────────┘    │
│                                                    │
│  Turn Order:                                       │
│  [Li Wei] → [Enforcer] → [Li Wei] → [Enforcer]   │
│  ▲ You                                            │
│                                                    │
│  Last Actions:                                     │
│  > Li Wei used Flowing Strike!                   │
│  > Hit for 25 damage! Critical! (Combo +1)       │
│  > Enforcer Guard broken!                         │
│                                                    │
│  ┌─ COMBO ACTIVE ─────────────────────────┐      │
│  │ Chain: Flowing Strike (1)              │      │
│  │ Next: Stream Palm or Quick Jab?        │      │
│  │ Bonus: +10% damage on finisher         │      │
│  └─────────────────────────────────────────┘      │
│                                                    │
└────────────────────────────────────────────────────┘

What will you do?
[1] Attack   [2] Technique [3] Defend  [4] Chi Focus
[5] Item     [6] Stance    [7] Flee
>
```

### Technique Animation (ASCII Art)

**Weathered Palm:**
```
> Li Wei channels chi through weathered hands...

    ⚡ ⚡
   /|\
    |   ≡≡≡ WEATHERED PALM! ≡≡≡
   / \

        💥 CRITICAL HIT! 💥

> Enforcer takes 67 damage!
> Enforcer is STUNNED for 1 turn!
```

**Combo Chain:**
```
> Li Wei begins the Flowing River combo!

    〜 Flowing Strike 〜
         ↓
    〜 Stream Palm 〜
         ↓
    〜 Ripple Defense 〜

✨ COMBO COMPLETE! ✨
+ 30% damage bonus
+ 15 chi recovered
+ Enforcer staggered!
```

**Ultimate Technique:**
```
> Li Wei unleashes DRAGON PALM!

      ╔══════════════════╗
      ║                  ║
      ║    🐉 DRAGON     ║
      ║      PALM        ║
      ║    DESCENDS! 🐉  ║
      ║                  ║
      ╚══════════════════╝

    ⚡️⚡️⚡️⚡️⚡️⚡️⚡️

    💥 DEVASTATING BLOW! 💥

> Enforcer takes 145 damage!
> Enforcer is DEFEATED!
```

---

## Balance Considerations

### Difficulty Curve

**Early Game (Chapters 1-2):**
- Enemy HP: 50-150
- Player HP: 100-200
- Fights last: 5-10 turns
- Difficulty: Easy to Medium
- Focus: Learn mechanics

**Mid Game (Chapters 3-4):**
- Enemy HP: 150-300
- Player HP: 200-400
- Fights last: 8-15 turns
- Difficulty: Medium to Hard
- Focus: Master combos, stances

**Late Game (Chapter 5):**
- Enemy HP: 300-500
- Player HP: 400-600
- Fights last: 10-20 turns
- Difficulty: Hard to Very Hard
- Focus: Perfect play, all mechanics

**Boss Fights:**
- 2-3× normal enemy HP
- Multi-phase mechanics
- Unique abilities
- Test of mastery

### Playstyle Balance

**All playstyles viable:**

**Aggressive (Hungry Stance focus):**
- High risk, high reward
- Fast fights
- Chi management critical
- Skill ceiling: High

**Defensive (Weathered Stance focus):**
- Safe, consistent
- Longer fights
- Forgiving of mistakes
- Skill ceiling: Medium

**Balanced (Flowing Stance focus):**
- Adaptable
- Medium fights
- Versatile
- Skill ceiling: Medium-High

**Advanced (Deceptive Stance focus):**
- Mind games
- Variable fight length
- Punishes mistakes
- Skill ceiling: Very High

---

## Open Questions for Implementation

### Need to Decide:

1. **Exact stat scaling formulas**
   - How much does each point matter?
   - Diminishing returns?

2. **Technique balance**
   - Exact costs and damages
   - Combo multipliers
   - Status effect durations

3. **AI difficulty settings**
   - How aggressive should adaptation be?
   - Should there be difficulty modes?

4. **Environmental frequency**
   - Every fight? Some fights?
   - How to make it feel natural?

5. **Mastery system details**
   - How many uses to level up?
   - Mastery cap per technique?
   - Prestige/reset mechanics?

6. **Status effects**
   - Stun, poison, bleed, etc.?
   - Keep it simple or add depth?

7. **Tutorial design**
   - How to teach without boring?
   - Gradual introduction of mechanics?

---

## Summary: What Makes This Special

### Unique Selling Points

1. **AI-Powered Variation**
   - No two enemies exactly alike
   - Dynamic boss behavior
   - Personalized experience

2. **Strategic Depth**
   - Stances, combos, chi management
   - Environmental tactics
   - Adaptable playstyles

3. **Living World Integration**
   - n8n events affect combat
   - Community discoveries
   - Time-based changes

4. **Beggar Fantasy**
   - Deceptive tactics
   - Street smarts
   - Underdog power fantasy

5. **Accessibility + Mastery**
   - Easy to learn
   - Infinite skill ceiling
   - Rewarding progression

---

**This combat system is READY for prototyping.**

Next steps: Build it and test the feel!

---

**Version:** 1.0
**Status:** Concept Complete
**Ready for:** Implementation Phase
