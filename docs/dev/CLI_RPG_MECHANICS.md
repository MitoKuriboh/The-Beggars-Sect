# CLI RPG Mechanics: Deep Dive Research

**Created:** 2025-12-06
**Purpose:** Comprehensive analysis of RPG mechanics for text-based/CLI games
**Scope:** Combat, progression, narrative, player agency, and system design

---

## Table of Contents

1. [Text Game Genre Taxonomy](#text-game-genre-taxonomy)
2. [Core Design Principles](#core-design-principles)
3. [Combat Systems](#combat-systems)
4. [Progression & Leveling](#progression--leveling)
5. [Resource Management](#resource-management)
6. [Skill Checks & Probability](#skill-checks--probability)
7. [Status Effects & Buffs](#status-effects--buffs)
8. [Narrative Structures](#narrative-structures)
9. [Quality-Based Narrative](#quality-based-narrative)
10. [Choice Architecture](#choice-architecture)
11. [Player Agency & Illusion](#player-agency--illusion)
12. [Character Systems](#character-systems)
13. [Loot & Rewards](#loot--rewards)
14. [Emotional Engagement](#emotional-engagement)
15. [Feedback & Communication](#feedback--communication)
16. [Investigation & Deduction](#investigation--deduction)
17. [Pacing & Rhythm](#pacing--rhythm)
18. [Application to The Beggars Sect](#application-to-the-beggars-sect)
19. [Key Takeaways](#key-takeaways)
20. [Sources Index](#sources-index)

---

## Text Game Genre Taxonomy

Understanding the heritage and distinctions between text game genres informs design decisions.

### Genre Comparison

| Genre | Key Features | Interaction | Notable Examples |
|-------|--------------|-------------|------------------|
| **Text Adventure** | Room descriptions, puzzle focus | Parser (verb-noun) | Zork, Colossal Cave |
| **Interactive Fiction** | Narrative-driven, literary | Parser or choice | Photopia, 80 Days |
| **MUD** | Multiplayer, real-time, sandbox | Parser, real-time | Gemstone, DikuMUD |
| **Roguelike** | Procedural, permadeath, turn-based | Grid movement | Nethack, DCSS |
| **Choice-Based** | Branching narrative, minimal parser | Hyperlinks/menus | Twine games, ChoiceScript |

### Key Insights from Each Genre

**From Text Adventures:**
- Parser design creates sense of world presence
- Puzzles as gates create satisfaction but risk frustration
- Room-based geography enables spatial reasoning

**From MUDs:**
- Stances affect combat dynamically
- Real-time creates urgency (even simulated)
- Round-time mechanic (heavier weapons = slower)
- Bartle's player types: Achievers, Explorers, Socializers, Killers

**From Roguelikes:**
- Procedural generation enables replayability
- Permadeath makes choices matter
- "Fog of war" creates tension
- Unidentified items create discovery moments

**From Interactive Fiction:**
- Text can create deeper emotional engagement than graphics
- Player agency through story not just mechanics
- Slow rhythm invites reflection

### Sources
- [Text Adventure vs. MUD vs. Roguelike](https://inventwithpython.com/blog/2013/06/05/text-adventure-vs-mud-vs-roguelike-vs-dwarf-fortress/)
- [Building a text-based game](https://fpsvogel.com/posts/2023/why-make-a-text-based-game)
- [Multi-user dungeon - Wikipedia](https://en.wikipedia.org/wiki/Multi-user_dungeon)

---

## Core Design Principles

### The Five Pillars of Text-Based Game Design

1. **Clear, Concise Language**
   - Every word earns its place
   - Avoid walls of text
   - Use formatting to aid scanning

2. **Player Agency**
   - Choices must feel meaningful
   - Actions should have visible consequences
   - Avoid "illusion of choice" that breaks trust

3. **Imagination as Feature**
   - Let players fill in details
   - Suggestive > exhaustive description
   - Sound, smell, texture - not just visuals

4. **Consistent World**
   - Rules apply universally
   - NPCs follow same constraints as player
   - Violations break immersion

5. **Compelling Narrative**
   - Story rewards engagement
   - Characters players care about
   - Stakes that matter

### Making Text Combat Engaging

Based on community wisdom and research:

1. **Varied Action Phrases** - Don't repeat "X attacks Y"
2. **Stances** - Defensive, neutral, offensive states
3. **Round Time** - Heavier weapons/armor = longer cooldowns
4. **Threatened Mechanic** - Certain positions restrict actions
5. **Speed Manipulation** - Buffs/debuffs affecting turn order
6. **Descriptive Health** - "Li Wei feels dizzy" > "HP: 45/100"

### Sources
- [Text-Based Game Design Principles](https://gamedesignskills.com/game-design/text-based/)
- [How can I make text-based combat more engaging?](https://gamedev.stackexchange.com/questions/128024/how-can-i-make-text-based-combat-more-engaging)

---

## Combat Systems

### Turn Order Systems

#### 1. Simple Round-Robin
```
Turn 1: Player → Enemy A → Enemy B
Turn 2: Player → Enemy A → Enemy B
...
```
**Pros:** Easy to understand
**Cons:** Predictable, no speed stat relevance

#### 2. Speed-Based Initiative
```
Each round:
  1. Calculate speed values
  2. Sort combatants
  3. Execute in order
```
**Pros:** Speed stat matters, more dynamic
**Cons:** Fast characters dominate

#### 3. ATB (Active Time Battle)
```
Each combatant has a "charge" bar
When bar fills, they can act
Speed affects charge rate
```
**Pros:** Visible turn order, tactical planning
**Cons:** More complex to implement

#### 4. Action Points (AP) System
```
Each character gets X AP per turn
Actions cost variable AP
Unused AP may carry over or convert to defense
```

**Example (Space Hulk-style):**
- Move 1 square: 1 AP
- Basic attack: 2 AP
- Heavy attack: 4 AP
- Aim bonus: 1 AP per +10%

**Pros:** Flexible decision-making, meaningful tradeoffs
**Cons:** Analysis paralysis, balance challenges

**Design Warning:** If dagger costs 1 AP and greatsword costs 3 AP, but both do similar damage, daggers dominate. Solutions:
- Damage scales with AP cost
- Weapons have different use cases
- Combo bonuses for committed attacks

### Damage Formulas

#### Simple Approach
```
Damage = AttackerATK - DefenderDEF
```
**Problem:** Becomes trivial or impossible at extremes

#### Percentage Reduction
```
Reduction = DEF / (DEF + 100)
Damage = RawDamage * (1 - Reduction)
```

**Example:** 75 DEF → 75/(75+100) = 42.8% reduction

**Benefit:** Never reaches 100% reduction, always some damage

#### Multiplicative Approach
```
Damage = BasePower * (ATK / 10) * StanceModifier * RandomVariance
FinalDamage = Damage * (1 - DefenseReduction)
```

### Critical Hits

**Standard Implementation:**
```typescript
const critChance = attacker.dex * 0.01; // 1% per DEX
const isCrit = Math.random() < critChance;
const critMultiplier = isCrit ? 1.5 : 1.0;
```

**Design Consideration:** Critical hits add excitement but increase variance. High crit systems feel "swingy" - good for roguelikes, less good for story-driven games.

### Sources
- [Turn Based RPG Combat, Action Point system](https://www.gamedev.net/forums/topic/550681-turn-based-rpg-combat-action-point-system/)
- [How to develop RPG Damage Formulas?](https://gamedev.stackexchange.com/questions/14309/how-to-develop-rpg-damage-formulas)
- [How to design turn-based combat system](https://gameworldobserver.com/2022/12/02/how-to-design-turn-based-combat-system-untamed-tactics)

---

## Progression & Leveling

### Curve Types

#### Linear Progression
```
XP_to_next_level = base_xp * level
```
**Feel:** Consistent pacing throughout

#### Quadratic Progression
```
XP_to_next_level = base_xp * level^2
```
**Feel:** Early levels fast, late levels slow

#### Fixed XP per Level (Disco Elysium)
```
XP_to_next_level = 100 (always)
```
**Benefit:** Transparent, tasks don't need level scaling

### Level Scaling Approaches

| Approach | Description | Pros | Cons |
|----------|-------------|------|------|
| **Static World** | Enemies have fixed levels | Sense of progression | Over-leveling possible |
| **Full Scaling** | Enemies match player | Always challenging | No power fantasy |
| **Bounded Scaling** | Enemies scale within ranges | Balance | Complex to implement |
| **Story-Based** | World scales with story progress | Narrative coherence | Less player control |

### Horizontal vs. Vertical Progression

**Vertical Progression:**
- Numbers go up (more damage, more HP)
- Player becomes objectively stronger
- Risk: Requires enemy scaling

**Horizontal Progression:**
- New options, not better stats
- Unlocks abilities, not upgrades
- Risk: Complexity creep

**Recommendation:** Combine both. Moderate stat increases + new techniques keeps engagement high without trivializing content.

### The Disco Elysium Innovation

In most RPGs, stronger characters face stronger enemies to maintain challenge. In Disco Elysium, the opposition comes from the player themselves:

> "Skills are more nosy as they are more powerful, generating choice overload and insecurities about which path to take."

High skills don't make the game easier - they make it more complex through additional dialogue options and internal conflicts.

### Sources
- [Disco Elysium RPG System Analysis](https://www.gabrielchauri.com/disco-elysium-rpg-system-analysis/)
- [Balancing Player vs. Monsters: Level-Up Curves](https://gamedev.stackexchange.com/questions/10695/balancing-player-vs-monsters-level-up-curves)
- [Level Scaling - TV Tropes](https://tvtropes.org/pmwiki/pmwiki.php/Main/LevelScaling)

---

## Resource Management

### The Three-Resource Model

| Resource | Represents | Recovery | Design Purpose |
|----------|------------|----------|----------------|
| **Health** | Survival | Slow/rest | Stakes, risk |
| **Chi/Mana** | Power | Medium | Technique gating |
| **Stamina** | Endurance | Fast/per-turn | Action economy |

### Chi/Mana Design Patterns

**Full Regeneration:**
- Refills between combats
- Focus on in-combat economy
- Good for: Action-focused games

**Limited Pool:**
- Must rest to restore
- Creates strategic scarcity
- Good for: Resource management games

**Regenerating During Combat:**
- Slow regen encourages mixed strategy
- "Defend to restore" creates rhythm
- Good for: Tactical depth

### Stamina System (Souls-like)

Stamina as short-term tactical resource:
```typescript
interface StaminaAction {
  attack: 25,
  dodge: 20,
  block: 15,
  heavyAttack: 40,
}

// Regeneration
staminaRegenPerSecond = 20
// But stops during actions
```

**Design Insight:** Stamina creates meaningful choices between offense and defense within a single turn.

### The "Exhaust" Mechanic

A hybrid approach:
- Normal use: Spend and recover quickly
- "Exhaust": Spend for double effect, but only recovers after rest

```
Example:
  Normal: Spend 5 stamina for +5 damage
  Exhaust: Spend 5 stamina for +10 damage (stamina locked until rest)
```

This creates tension between short-term and long-term planning.

### Resource Management Trade-offs

**Pros:**
- Adds strategic depth
- Creates meaningful choices
- Rewards planning

**Cons:**
- Bookkeeping overhead
- Can frustrate casual players
- Risk of "save for later" syndrome

### Sources
- [RPGs Should Not Forget Resource Management](https://danielnations.medium.com/rpgs-should-not-forget-resource-management-as-a-cornerstone-to-strategy-15d867c373c6)
- [How to Design Balanced Resource Systems in RPGs](https://www.ttrpg-games.com/blog/how-to-design-balanced-resource-systems-in-rpgs/)
- [Three-Stat System - TV Tropes](https://tvtropes.org/pmwiki/pmwiki.php/Main/ThreeStatSystem)

---

## Skill Checks & Probability

### Standard Resolution Systems

#### Roll Over (D&D Style)
```
Roll d20 + modifier >= difficulty
```
- Linear probability distribution
- Each +1 = +5% success chance
- Crits (1 and 20) add drama

#### Roll Under (Classic)
```
Roll d100 < skill value
```
- Skill directly represents success %
- Intuitive for players
- "Blackjack variant": Roll high but under skill

#### Dice Pool
```
Roll N d6, count successes (5+)
```
- Bell curve distribution
- More dice = more reliable
- Partial successes possible

### The 65% Standard

D&D 5e targets approximately **65% success rate** as the baseline:
- Enough to succeed regularly
- Enough failure to maintain tension
- Threshold of 8 on d20 achieves this

**Scaling:** When player gets +5 modifier, difficulty increases by +5 to maintain 65%.

### Hiding the Math

> "Modifiers mask the statistics... the player may feel stronger, faster, and cooler, but they still have the same 65% chance of success."

This creates **perceived progression** without changing underlying probabilities.

### Disco Elysium's Check Types

**White Checks:**
- Can be retried after meeting conditions
- Encourages exploration and growth
- "Came back stronger" satisfaction

**Red Checks:**
- One chance only
- Failure is permanent but often interesting
- Creates stakes and memorable moments

**Passive Checks:**
- No roll, based on skill level
- Opens/closes dialogue options
- Rewards specialization

### The Thought Cabinet (Meta-Progression)

Players can "internalize" thoughts:
- Provides skill bonuses/penalties
- Takes time to research
- **Key innovation:** Effects unknown until internalized

This adds uncertainty to a system with otherwise low variance.

### Design Recommendations

| Game Feel | Die System | Variance |
|-----------|------------|----------|
| Heroic Fantasy | d20 | High |
| Gritty Survival | 3d6 | Low |
| Tactical | Dice Pool | Medium |
| Narrative | Binary success/fail | Lowest |

### Sources
- [Mastering Dice Probabilities](https://wizardsrespite.com/2024/08/11/mastering-dice-probabilities-a-guide-for-ttrpg-designers/)
- [Disco Elysium Wiki - Skills](https://discoelysium.fandom.com/wiki/Skills)
- [Five Advantages of Pass-Fail Dice Pools](https://mythcreants.com/blog/five-advantages-of-pass-fail-dice-pools/)

---

## Status Effects & Buffs

### Common Effect Categories

| Category | Examples | Design Purpose |
|----------|----------|----------------|
| **DoT** | Poison, Bleed, Burn | Pressure over time |
| **Control** | Stun, Freeze, Sleep | Tempo advantage |
| **Debuff** | Slow, Weaken, Blind | Stat manipulation |
| **Buff** | Haste, Strengthen | Empowerment |
| **Protection** | Shield, Reflect | Defensive options |

### Duration Mechanics

**Turn-Based:**
```typescript
interface StatusEffect {
  id: string;
  duration: number; // Turns remaining
  onTurnEnd: () => void;
}

// Each turn
effect.duration--;
if (effect.duration <= 0) removeEffect(effect);
```

**Stack-Based:**
```typescript
interface StackingEffect {
  id: string;
  stacks: number;
  maxStacks: number;
  effectPerStack: number;
}

// Damage = basePoison * stacks
// New application adds stacks (up to max)
```

### Stacking Rules

| Rule | Description | Balance Impact |
|------|-------------|----------------|
| **No Stack** | Only strongest applies | Prevents exploitation |
| **Refresh** | Reapply resets duration | Rewards consistency |
| **Additive** | Effects combine | Risk of abuse |
| **Diminishing** | Each stack less effective | Soft cap |

### Implementation Pattern

```typescript
class StatusEffectSystem {
  private effects: StatusEffect[] = [];

  apply(effect: StatusEffect, target: Character): void {
    const existing = this.effects.find(e => e.id === effect.id);

    if (existing) {
      if (effect.stackable) {
        existing.stacks = Math.min(
          existing.stacks + 1,
          existing.maxStacks
        );
      } else {
        // Refresh duration if stronger
        if (effect.potency > existing.potency) {
          existing.potency = effect.potency;
          existing.duration = effect.duration;
        }
      }
    } else {
      this.effects.push({ ...effect, target });
    }
  }

  tick(): void {
    for (const effect of this.effects) {
      effect.onTick?.(effect.target);
      effect.duration--;
    }
    this.effects = this.effects.filter(e => e.duration > 0);
  }
}
```

### Stat Modification Warning

**Problem:** Chronological stacking/unstacking causes math errors

```
Base STR: 5
+15 buff → 20
/2 debuff → 10
Remove +15 buff → -5 (!!!)
```

**Solution:** Recalculate from base each frame
```typescript
function calculateEffectiveStat(base: number, effects: Effect[]): number {
  let additive = 0;
  let multiplicative = 1;

  for (const effect of effects) {
    if (effect.type === 'additive') additive += effect.value;
    if (effect.type === 'multiplicative') multiplicative *= effect.value;
  }

  return (base + additive) * multiplicative;
}
```

### Sources
- [Status effect - Wikipedia](https://en.wikipedia.org/wiki/Status_effect)
- [How to implement buffs/debuffs](https://gamedev.stackexchange.com/questions/46772/how-to-implement-buffs-debuffs-temporary-stat-changes-in-an-rpg)
- [A Status Effect Stacking Algorithm](https://www.gamedeveloper.com/design/a-status-effect-stacking-algorithm)

---

## Narrative Structures

### Standard Patterns in Choice-Based Games

#### 1. Time Cave
```
     A
    / \
   B   C
  /\   /\
 D  E F  G
```
- Heavy branching, no merging
- Exponential content requirement
- Best for: Short stories, exploration

#### 2. Gauntlet
```
A → B → C → D → E
```
- Linear with choices that affect flavor only
- Efficient content use
- Risk: Feels railroaded

#### 3. Branch & Bottleneck
```
    A
   /|\
  B C D
   \|/
    E
   /|\
  F G H
```
- Branches that reconverge
- Balance of agency and manageability
- Most common commercial approach

#### 4. Hub & Spokes
```
     B
     |
 C - A - D
     |
     E
```
- Central hub with explorable branches
- Return to hub after each branch
- Good for: Investigation, exploration

### The Three-Act Structure in Games

**Act I (Setup) - 25%:**
- Establish world and character
- Inciting incident
- Decision to engage

**Act II (Confrontation) - 50%:**
- Rising challenges
- Midpoint twist
- All seems lost moment

**Act III (Resolution) - 25%:**
- Final confrontation
- Climax
- Denouement

### Save the Cat Beat Sheet (Adapted for Games)

| Beat | Percentage | Game Application |
|------|------------|------------------|
| Opening Image | 0% | Tutorial/introduction |
| Theme Stated | 5% | NPC hints at core theme |
| Setup | 0-10% | Establish mechanics, world |
| Catalyst | 10% | Inciting incident |
| Debate | 10-20% | Player explores options |
| Break into Two | 20% | Point of no return choice |
| Fun and Games | 20-50% | Core gameplay loop |
| Midpoint | 50% | Major revelation/twist |
| Bad Guys Close In | 50-75% | Rising difficulty |
| All Is Lost | 75% | Major setback |
| Break into Three | 80% | Final commitment |
| Finale | 80-99% | Final challenges |
| Final Image | 100% | Resolution, contrast with opening |

### Sources
- [Standard Patterns in Choice-Based Games](https://heterogenoustasks.wordpress.com/2015/01/26/standard-patterns-in-choice-based-games/)
- [Save the Cat Beat Sheet](https://kindlepreneur.com/save-the-cat-beat-sheet/)
- [Interactive fiction - Wikipedia](https://en.wikipedia.org/wiki/Interactive_fiction)

---

## Quality-Based Narrative

### The Failbetter Model (Fallen London)

Quality-based narrative (QBN) is an alternative to traditional branching:

**Traditional Branching:**
```
Scene A → Choice → Scene B or C
```

**Quality-Based:**
```
Multiple storylets available based on player qualities
Player chooses which to engage
Each storylet may modify qualities
New storylets become available based on new qualities
```

### Qualities (Stats That Unlock Content)

```typescript
interface Quality {
  id: string;
  name: string;
  value: number;
  visible: boolean; // Some qualities are hidden
  cap?: number;
}

// Examples:
const qualities = {
  watchful: 45,        // Main attribute
  scandalous: 12,      // Menace
  connectedToCourt: 3, // Relationship
  nightmaresRemaining: 7, // Progress tracker
};
```

### Storylet Structure

```typescript
interface Storylet {
  id: string;
  title: string;
  requirements: Requirement[];
  branches: Branch[];
  sticky: boolean; // Always available when requirements met?
  urgency: 'normal' | 'must' | 'cannot-avoid';
}

interface Requirement {
  quality: string;
  min?: number;
  max?: number;
  exact?: number;
}

interface Branch {
  text: string;
  requirements?: Requirement[];
  effects: Effect[];
  outcomes: Outcome[];
}
```

### Failbetter's Narrative Structures

**Midnight Staircase:**
- Single storylet with many branches
- All branches increase same progress quality
- Used for: Training montages, preparation

**Carousel:**
- Timing quality advances with each action
- Some content locks/unlocks as time passes
- Used for: Seasonal events, deadlines

**Grandfather Clock:**
- Progress quality acts as "minute hand"
- Main story advances as "hour hand"
- Progress resets when story advances
- Used for: Long investigations, quests

### Why QBN Works

1. **Emergent Narratives:** Player qualities combine in unexpected ways
2. **Replayability:** Different builds see different content
3. **Manageable Scope:** Content is modular, not exponential
4. **Delayed Consequences:** Choice from hours ago resurfaces

### Sources
- [Fallen London - Wikipedia](https://en.wikipedia.org/wiki/Fallen_London)
- [Fallen London Writer Guidelines](https://www.failbettergames.com/news/fallen-london-writer-guidelines-part-i)
- [New Narrative Structures | Failbetter Games](https://www.failbettergames.com/news/new-narrative-structures)

---

## Choice Architecture

### What Makes a Choice Meaningful?

1. **Clear Options:** Player understands what they're choosing
2. **Different Outcomes:** Choices lead to distinct results
3. **Visible Consequences:** Player sees results of choice
4. **Irreversibility:** Can't easily undo (stakes)
5. **Values Expression:** Choice reflects player's priorities

### The Walking Dead vs. Mass Effect Paradox

**The Walking Dead:**
- Almost all choices converge to same story beats
- Characters die regardless of player action
- Widely praised for meaningful choices

**Mass Effect 3:**
- Significant divergence based on trilogy of choices
- Multiple distinct endings
- Criticized for meaningless choices

**Lesson:** The *feeling* of agency matters more than actual divergence.

### Techniques for Meaningful-Feeling Choices

#### 1. Deferred Story Events
Delay consequences so player doesn't see convergence immediately.

#### 2. Manifestation of Consequence
Change *how* something happens, not *if*.
```
Choice: Save A or B
Reality: Both die eventually
Difference: A's death = sacrifice, B's death = murder
```

#### 3. Relationship Consequences
Choices affect how NPCs treat player, even if plot is unchanged.

#### 4. Internal Consequences
Choices affect protagonist's character/dialogue, not just world.

### Avoiding Illusion-Breaking

**Don't:**
- Make two options lead to identical scenes
- Show players the convergence
- Let players brute-force by reloading

**Do:**
- Vary dialogue even when outcome is same
- Make failures interesting (not just retry)
- Commit to consequences

### Disco Elysium's Approach

> "Choices within game narrative encourage players to feel that they have exercised their agency in a story world... but solutions secretly being choice mechanisms can go unnoticed if nothing frames it as a choice."

Players solving puzzles with violence vs. diplomacy were unknowingly making character choices.

### Sources
- [Meaningful Decisions in Branching Narratives](https://www.gamedeveloper.com/design/meaningful-decisions-in-branching-narratives)
- [Illusion of choice is better than choice](https://www.gamedeveloper.com/design/illusion-of-choice-is-better-than-choice-choices-and-illusions-as-narrative-mechanics)
- [The Illusion of Choice: Reclaiming Agency](https://www.wayline.io/blog/illusion-of-choice-agency-in-video-games)

---

## Player Agency & Illusion

### Choice vs. Agency

**Choice:** Option to select between predetermined paths
**Agency:** Power to genuinely alter the course of events

Most games provide choice, few provide true agency.

### The Agency Spectrum

```
No Agency          Limited Agency          Full Agency
    |                    |                      |
Linear story    Branching narrative      Emergent systems
(Gauntlet)      (Most RPGs)              (Dwarf Fortress)
```

### Creating the Feeling of Agency

Even without true agency, games can create strong *sense* of agency:

1. **Immediate Feedback:** Actions visibly affect world
2. **Unique Moments:** Player-specific experiences
3. **Character Expression:** Dialogue reflects choices
4. **NPC Acknowledgment:** Characters reference past actions
5. **Stat Tracking:** Numbers show impact

### The Balancing Act

**Too Much Real Agency:**
- Exponential content requirements
- Testing nightmare
- Potential for broken states

**Too Little Perceived Agency:**
- Players feel railroaded
- Choices feel pointless
- Breaks immersion

**Sweet Spot:**
- Strategic convergence
- Varied paths to same destinations
- Meaningful divergence at key moments
- Excellent feedback on consequences

### When Players Notice

Players detect the illusion when:
- Same character dies regardless of "save" choice
- Dialogue options lead to identical responses
- World state unchanged despite "impactful" choice
- Reload reveals the curtain

### Breaking the Illusion Intentionally

Some games deliberately show the lack of agency:
- **The Stanley Parable:** Meta-commentary on choice
- **Spec Ops: The Line:** "You had no choice" is the point

This works when the *theme* is about lack of agency.

### Sources
- [The Illusion of Choice](https://www.theseus.fi/bitstream/handle/10024/167282/kiander_verna.pdf)
- [How can branching be used to create meaningful player choices?](https://www.linkedin.com/advice/0/how-can-branching-used-create-meaningful-player-choices-uhn6e)

---

## Character Systems

### The Holy Trinity

| Archetype | Role | Traits |
|-----------|------|--------|
| **Tank** | Absorb damage | High HP, high defense |
| **DPS** | Deal damage | High attack, low defense |
| **Support** | Heal/buff | Utility, moderate stats |

### Fighter/Mage/Thief

Alternative archetypal trio:
- **Fighter:** Weapon combat, defense
- **Mage:** Ranged magic, utility
- **Thief:** Speed, stealth, precision

### Specialization Design

```
Generic Class → Specialized Subclass
     ↓                 ↓
   Mage       → Fire Mage / Necromancer / Healer
   Fighter    → Berserker / Guardian / Weapon Master
   Thief      → Assassin / Scout / Trickster
```

### Horizontal vs. Vertical Specialization

**Vertical (Power):**
```
Mage Level 1: Fireball (10 damage)
Mage Level 10: Fireball (100 damage)
```

**Horizontal (Options):**
```
Mage Level 1: Fireball
Mage Level 10: Fireball, Ice Storm, Lightning, Teleport
```

### Build Diversity Principles

1. **No Strictly Better:** Each build has tradeoffs
2. **Synergy Opportunities:** Combinations create unique playstyles
3. **Late Divergence:** Characters feel similar early, diverge later
4. **Respec Options:** Let players experiment

### Single-Character vs. Party

| System | Pros | Cons |
|--------|------|------|
| **Solo** | Simpler, stronger identity | Less tactical variety |
| **Party** | More tactics, roles | Management overhead |
| **Solo + Companions** | Best of both | Balance complexity |

### Sources
- [RPG Class Archetypes](https://gamedesigning.org/gaming/rpg-classes/)
- [Character class - Wikipedia](https://en.wikipedia.org/wiki/Character_class)
- [Analysis / Character Class System - TV Tropes](https://tvtropes.org/pmwiki/pmwiki.php/Analysis/CharacterClassSystem)

---

## Loot & Rewards

### Weighted Loot Tables

```typescript
interface LootEntry {
  item: string;
  weight: number; // Higher = more common
}

const lootTable: LootEntry[] = [
  { item: 'gold', weight: 100 },
  { item: 'common_sword', weight: 50 },
  { item: 'rare_amulet', weight: 5 },
  { item: 'legendary_blade', weight: 1 },
  { item: null, weight: 200 }, // No drop
];

function rollLoot(table: LootEntry[]): string | null {
  const totalWeight = table.reduce((sum, e) => sum + e.weight, 0);
  let roll = Math.random() * totalWeight;

  for (const entry of table) {
    roll -= entry.weight;
    if (roll <= 0) return entry.item;
  }
  return null;
}
```

### Avoiding Frustration

**Problem Scenarios:**
1. Player doesn't get rare drop in 1500 kills
2. Player gets 5 rare drops in a row

Both feel unfair.

**Solutions:**

#### Pity Timer / Bad Luck Protection
```typescript
let failStreak = 0;
const baseRareChance = 0.01;

function rollWithPity(): boolean {
  const adjustedChance = baseRareChance + (failStreak * 0.005);
  if (Math.random() < adjustedChance) {
    failStreak = 0;
    return true;
  }
  failStreak++;
  return false;
}
```

#### Shuffle Bag System
```typescript
class ShuffleBag<T> {
  private bag: T[] = [];
  private remaining: T[] = [];

  constructor(items: { item: T; count: number }[]) {
    for (const { item, count } of items) {
      for (let i = 0; i < count; i++) {
        this.bag.push(item);
      }
    }
    this.refill();
  }

  private refill(): void {
    this.remaining = [...this.bag];
    // Shuffle
    for (let i = this.remaining.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.remaining[i], this.remaining[j]] =
        [this.remaining[j], this.remaining[i]];
    }
  }

  draw(): T {
    if (this.remaining.length === 0) this.refill();
    return this.remaining.pop()!;
  }
}

// Guarantees exact distribution over N draws
const rewardBag = new ShuffleBag([
  { item: 'common', count: 900 },
  { item: 'uncommon', count: 90 },
  { item: 'rare', count: 9 },
  { item: 'legendary', count: 1 },
]);
```

### Reward Timing

- **Immediate:** Dopamine hit, encourages action
- **Delayed:** Anticipation, bigger impact
- **Random:** Engagement through uncertainty

### Sources
- [Loot drop best practices](https://www.gamedeveloper.com/design/loot-drop-best-practices)
- [How to Code Monster Loot Drops](https://gamedevelopment.tutsplus.com/tutorials/how-to-code-monster-loot-drops--cms-20449)

---

## Emotional Engagement

### Forms of Player-Character Attachment

Research identifies seven distinct forms:

1. **Competence Excitement:** Pride in gameplay skill
2. **Admiration:** Character as role model
3. **Identification:** Seeing self in character
4. **Concern:** Caring about character's well-being
5. **Aesthetic Appreciation:** Appreciating character's design
6. **Responsibility:** Feeling duty to character
7. **Wish Fulfillment:** Living vicariously through character

### Design for Attachment

| Technique | Implementation |
|-----------|----------------|
| **Investment** | Long-term consequences of choices |
| **Vulnerability** | Character can fail/suffer |
| **Growth** | Character changes over time |
| **Relationships** | NPCs that matter to player |
| **Expression** | Player choices shape character |

### The Catharsis of Choice

Emotionally intense moments transform engagement:
- Difficult choices create investment
- Sacrifices make victories meaningful
- Failure can deepen attachment (if handled well)

### Agency and Emotion

> "Unlike passive experiences like watching movies, games place you directly in the driving seat. This player agency amplifies emotional investment, making every choice, success, and failure much more personal."

### Empathy Through Mechanics

Game mechanics can create empathy:
- Resource scarcity → understanding survival
- Permadeath → understanding loss
- Relationships → understanding connection

### Sources
- [The Psychology of Character Attachment](https://medium.com/@jaygaracini/the-psychology-of-character-attachment-5481caaf5372)
- [Emotional Engagement - Meegle](https://www.meegle.com/en_us/topics/game-design/emotional-engagement)
- [Exploring Emotional Attachment to Game Characters](https://dl.acm.org/doi/10.1145/3311350.3347169)

---

## Feedback & Communication

### The Double Everything Rule

> "Never rely on a single category to convey an important piece of information."

Combine:
- Visual feedback (color, animation)
- Text feedback (message)
- Audio feedback (sound)
- Mechanical feedback (stat change)

### Feedback Timing

| Type | Timing | Purpose |
|------|--------|---------|
| **Immediate** | Instant | Action acknowledgment |
| **Delayed** | After animation | Dramatic emphasis |
| **Persistent** | Until dismissed | Important information |
| **Fading** | Auto-dismiss | Minor notifications |

### Signs vs. Feedback

**Signs:** Proactive communication about game state
```
"Your health is low."
"The enemy is preparing a powerful attack."
```

**Feedback:** Reactive communication about player action
```
"You dealt 45 damage!"
"Your attack missed."
```

Both are essential for game-player dialogue.

### UI Hierarchy for RPGs

1. **Always Visible:** Health, core resources
2. **On Demand:** Inventory, skills, detailed stats
3. **Contextual:** Combat options, dialogue choices
4. **Notification:** Event alerts, achievements

### Text-Specific Considerations

In CLI games, all feedback is text. Differentiate through:
- **Color:** Red for damage, green for healing
- **Formatting:** Bold for important, dim for flavor
- **Position:** Combat log vs. status display
- **Timing:** Typewriter vs. instant

### Sources
- [Game UI Design: Enhancing Player Experience](https://www.searchmyexpert.com/resources/game-development/game-ui-design)
- [Keys to Signs & Feedback - GDKeys](https://gdkeys.com/keys-signs-feedback/)
- [Game UI Database](https://gameuidatabase.com/)

---

## Investigation & Deduction

### Three Categories of Detective Games

| Category | Core Mechanic | Example |
|----------|---------------|---------|
| **Deduction** | Cross-reference clues | Obra Dinn |
| **Contradiction** | Find inconsistencies | Ace Attorney |
| **Investigation** | Gather evidence | L.A. Noire |

### The Three Clue Rule

For tabletop and narrative games:

> "For any conclusion you want the PCs to make, include at least THREE clues."

Why:
- Players may miss clues
- Players may misinterpret clues
- Multiple clues create satisfying "aha" moments

### GUMSHOE Approach

Robin D. Laws' system eliminates "find the clue" failure:
- Investigators automatically find core clues in each scene
- Challenge is interpretation, not discovery
- Removes frustrating dead ends

### Design Principles

**Many Channels Out, Few Channels Back:**
- Information comes from many sources (dialogue, objects, environments)
- Solutions entered through one or two central mechanics

**Avoiding Brute Force:**
- Limit retries
- Don't let players guess randomly
- Make wrong answers have consequences

### Investigation Board Pattern

```typescript
interface ClueSystem {
  clues: Clue[];
  connections: Connection[];

  addClue(clue: Clue): void;
  connect(clueA: string, clueB: string, insight: string): void;
  checkDeduction(clues: string[], conclusion: string): boolean;
}
```

### Application to Wuxia Investigation

Mystery elements in martial arts stories:
- Who poisoned the master?
- What technique was used in the murder?
- Where is the hidden manual?

Combine with:
- Chi reading (passive checks reveal clues)
- Combat (enemies reveal information when defeated)
- Relationships (NPCs share secrets at high affinity)

### Sources
- [What Makes a Great Detective Game?](https://gmtk.substack.com/p/what-makes-a-great-detective-game)
- [The Three Clue Rule](https://thealexandrian.net/wordpress/1118/roleplaying-games/three-clue-rule)
- [Detective Game Design Problems](https://digitales.games/blog/detective-game-design-problems)

---

## Pacing & Rhythm

### Text Game Pacing

> "The slow rhythm invites reflection, not reaction. Reading feels like play, not work. It's interactive, yet calm."

Text games naturally pace slower than action games. Embrace this.

### Story Beats as Pacing Units

A "beat" is an action-reaction pair that results in change:
```
Action: Player chooses to confront the thug
Reaction: Thug draws weapon
Change: Situation escalated
```

### Rhythm Patterns

**Tension-Release Cycle:**
```
Build tension → Climax → Release → Recovery → Build tension...
```

**Example in Combat:**
```
Enemy appears (tension builds)
Combat begins (tension peaks)
Victory achieved (release)
Rewards given (recovery)
Travel to next area (build begins)
```

### Managing Information Density

| Scene Type | Information Density | Pacing |
|------------|-------------------|--------|
| Action | Low (simple verbs) | Fast |
| Dialogue | Medium | Medium |
| Description | High | Slow |
| Choice | Variable | Pause |

### The Pause as Tool

Strategic pauses create emphasis:
```typescript
const dramaticMoment = [
  { type: 'narration', text: 'The blade stops an inch from your throat.' },
  { type: 'pause', duration: 2000 },
  { type: 'dialogue', speaker: 'Elder Fang', text: '"Not bad. Not bad at all."' },
];
```

### Player-Controlled Pacing

Let players control some pacing:
- Skip/fast-forward text
- Review previous text
- Pause during combat (turn-based)

But maintain author control for:
- Dramatic reveals
- Timed sequences
- Emotional beats

### Sources
- [Story Pacing - Meegle](https://www.meegle.com/en_us/topics/game-design/story-pacing)
- [Why Text-Based Games Are Popular Again](https://insiderbits.com/apps/text-based-games/)
- [Interactive Storytelling: Pacing](https://scalar.usc.edu/works/interactive-storytelling-narrative-techniques-and-methods-in-video-games/pacing)

---

## Application to The Beggars Sect

### Current Systems Analysis

| System | Current State | Alignment with Research |
|--------|---------------|------------------------|
| ATB Combat | Implemented | Good - matches research |
| Combo System | Basic | Expand per combo research |
| Choice System | Scene-based | Add quality-based elements |
| Resource Management | HP/Chi | Add stamina consideration |
| Skill Checks | None | Add Disco Elysium-style |

### Recommended Additions Based on Research

#### 1. White/Red Check System (from Disco Elysium)

```typescript
interface SkillCheck {
  skill: string;
  difficulty: number;
  type: 'white' | 'red';
  retryConditions?: string[]; // For white checks
}

// White check: Can retry after meeting conditions
const pickLock: SkillCheck = {
  skill: 'dexterity',
  difficulty: 12,
  type: 'white',
  retryConditions: ['Find lockpicking tools', 'Increase DEX by 2'],
};

// Red check: One chance, failure is permanent
const catchThief: SkillCheck = {
  skill: 'perception',
  difficulty: 15,
  type: 'red',
};
```

#### 2. Quality-Based Storylets

```typescript
// Add to StoryEngine
interface Storylet {
  id: string;
  requirements: {
    pathScores?: Partial<PathScores>;
    relationships?: Record<string, number>;
    flags?: string[];
    stats?: Partial<CharacterStats>;
  };
  content: Scene;
  priority: number;
}

// Trigger during exploration
function getAvailableStorylets(state: GameState): Storylet[] {
  return STORYLETS.filter(s => meetsRequirements(s.requirements, state));
}
```

#### 3. Failure as Content

```typescript
interface FailureOutcome {
  checkId: string;
  content: ContentLine[];
  effects: ChoiceEffect[];
  unlocksPath?: string;
}

// Failure reveals character vulnerability
const intimidationFailure: FailureOutcome = {
  checkId: 'intimidate_guard',
  content: [
    { type: 'narration', text: 'Your voice wavers. The guard sees through you.' },
    { type: 'thought', text: 'Why did you think that would work?' },
  ],
  effects: [
    { type: 'path', path: 'stream', delta: 1 }, // Introspection
  ],
  unlocksPath: 'humble-approach', // Alternative route
};
```

#### 4. Chi Aspect "Voices"

```typescript
interface ChiVoice {
  aspect: 'inverse' | 'flowing' | 'weathered' | 'hungry';
  triggers: {
    event: string;
    condition?: (state: GameState) => boolean;
    lines: string[];
  }[];
}

// During combat, when health drops below 25%
const inverseVoice: ChiVoice = {
  aspect: 'inverse',
  triggers: [
    {
      event: 'health_critical',
      lines: [
        '[Inverse Chi whispers]: "Good. Now you have nothing to lose."',
        '[Inverse Chi]: "The desperate strike is the truest strike."',
      ],
    },
  ],
};
```

#### 5. Enhanced Status Effect System

```typescript
// Add stacking and potency
interface EnhancedStatusEffect {
  id: string;
  name: string;
  type: 'buff' | 'debuff' | 'dot' | 'control';
  potency: number;
  duration: number;
  stacks: number;
  maxStacks: number;
  stackBehavior: 'refresh' | 'add' | 'strongest';
  onApply?: (target: Character) => void;
  onTick?: (target: Character) => void;
  onExpire?: (target: Character) => void;
}
```

#### 6. Shuffle Bag Rewards

```typescript
// For technique scroll drops, training rewards, etc.
const trainingRewardBag = new ShuffleBag([
  { item: 'stat_point', count: 60 },
  { item: 'technique_hint', count: 25 },
  { item: 'rare_technique', count: 10 },
  { item: 'chi_insight', count: 4 },
  { item: 'legendary_scroll', count: 1 },
]);
```

### Prioritized Implementation

| Priority | Feature | Effort | Impact |
|----------|---------|--------|--------|
| 1 | White/Red skill checks | Medium | High |
| 2 | Chi voices system | Medium | High |
| 3 | Failure as content | Low | High |
| 4 | Quality-based storylets | High | High |
| 5 | Enhanced status effects | Low | Medium |
| 6 | Shuffle bag rewards | Low | Medium |

---

## Key Takeaways

### Combat
- ATB is good; consider AP hybrid for more depth
- Percentage-based defense avoids extreme scaling
- Status effects need clear stacking rules

### Progression
- Fixed XP (Disco Elysium style) simplifies balance
- Horizontal progression prevents power creep
- Let difficulty be about complexity, not numbers

### Narrative
- Quality-based narrative scales better than pure branching
- The *feeling* of agency matters more than actual divergence
- Failure should be interesting, not just "try again"

### Player Psychology
- Seven forms of character attachment; target multiple
- Double everything for important feedback
- Pity timers prevent frustration in random systems

### Text-Specific
- Slow pacing is a feature, not a bug
- Use typography and color to differentiate content types
- Let imagination do the heavy lifting

---

## Sources Index

### Combat & Systems
- [Turn Based RPG Combat, Action Point system](https://www.gamedev.net/forums/topic/550681-turn-based-rpg-combat-action-point-system/)
- [How to develop RPG Damage Formulas?](https://gamedev.stackexchange.com/questions/14309/how-to-develop-rpg-damage-formulas)
- [A Status Effect Stacking Algorithm](https://www.gamedeveloper.com/design/a-status-effect-stacking-algorithm)

### Narrative & Choice
- [Failbetter Games - Narrative](https://www.failbettergames.com/category/narrative/)
- [Standard Patterns in Choice-Based Games](https://heterogenoustasks.wordpress.com/2015/01/26/standard-patterns-in-choice-based-games/)
- [Illusion of choice is better than choice](https://www.gamedeveloper.com/design/illusion-of-choice-is-better-than-choice-choices-and-illusions-as-narrative-mechanics)

### Progression & Balance
- [Disco Elysium RPG System Analysis](https://www.gabrielchauri.com/disco-elysium-rpg-system-analysis/)
- [Level Scaling - TV Tropes](https://tvtropes.org/pmwiki/pmwiki.php/Main/LevelScaling)
- [Loot drop best practices](https://www.gamedeveloper.com/design/loot-drop-best-practices)

### Player Psychology
- [The Psychology of Character Attachment](https://medium.com/@jaygaracini/the-psychology-of-character-attachment-5481caaf5372)
- [Emotional Engagement](https://www.meegle.com/en_us/topics/game-design/emotional-engagement)
- [Mastering Dice Probabilities](https://wizardsrespite.com/2024/08/11/mastering-dice-probabilities-a-guide-for-ttrpg-designers/)

### Genre & Fundamentals
- [Text-Based Game Design](https://gamedesignskills.com/game-design/text-based/)
- [Interactive fiction - Wikipedia](https://en.wikipedia.org/wiki/Interactive_fiction)
- [What Makes a Great Detective Game?](https://gmtk.substack.com/p/what-makes-a-great-detective-game)

---

## Changelog

| Date | Changes |
|------|---------|
| 2025-12-06 | Initial research compilation |

---

**This document is a reference for CLI RPG design decisions. Update as new research or implementations inform best practices.**
