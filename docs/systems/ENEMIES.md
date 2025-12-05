# Enemy Database

**Last Updated:** 2025-12-05
**Status:** `[ELABORATED]` - Core enemies ready for implementation
**Version:** 1.0

---

## Overview

All enemies in The Beggars Sect with complete stats.

**Current Count:** 8 enemies + 3 bosses = 11 total
**Target:** 12-15 enemy types for MVP
**Status:** Core enemies complete, more can be added during content phase

---

## Quick Reference

| Enemy | Faction | Tier | HP | STR | DEX | END | Chapter |
|-------|---------|------|----|----|-----|-----|---------|
| Street Punk | Thugs | Common | 60 | 8 | 6 | 6 | 1 |
| Alley Brawler | Thugs | Common | 80 | 10 | 8 | 8 | 1 |
| Scarred Enforcer | Thugs | Uncommon | 100 | 12 | 10 | 10 | 1-2 |
| Gang Lieutenant | Thugs | Rare | 140 | 14 | 12 | 12 | 2 |
| Spartan Recruit | Spartans | Common | 90 | 10 | 12 | 10 | 2 |
| Spartan Warrior | Spartans | Uncommon | 130 | 14 | 14 | 14 | 2-3 |
| Wandering Fighter | Lone Wolf | Uncommon | 120 | 12 | 14 | 10 | 2 |
| Silent Master | Lone Wolf | Rare | 180 | 16 | 16 | 14 | 3 |
| **Razor (Ch1 Boss)** | Thugs | Boss | 200 | 14 | 12 | 12 | 1 |
| **Commander Vex (Ch2 Boss)** | Spartans | Boss | 300 | 18 | 16 | 16 | 2 |
| **The Hollow One (Ch3 Boss)** | Lone Wolf | Boss | 400 | 22 | 20 | 18 | 3 |

---

## Stat Reference

**Enemy Stat Scaling (vs Li Wei starting at 10/10/10/10):**

| Tier | HP Range | Stats Range | Notes |
|------|----------|-------------|-------|
| Common | 60-90 | 6-10 | Fodder, 1-2 per fight |
| Uncommon | 90-140 | 10-14 | Challenge, usually solo |
| Rare | 140-200 | 14-18 | Mini-boss feel |
| Boss | 200-400+ | 14-24 | Story encounters |

---

## Urban Thugs

*Street-level fighters. Aggressive, direct, undisciplined. Li Wei's early enemies.*

### Street Punk
**Faction:** Urban Thugs
**Tier:** Common (Tutorial/Fodder)
**Chapters:** 1

| Stat | Value |
|------|-------|
| HP | 60 |
| STR | 8 |
| DEX | 6 |
| END | 6 |
| WIS | 4 |
| Speed | 108 |
| Defense | 3 |

**Techniques:**
1. **Punch** (Power 10) - Default attack
2. **Wild Swing** (Power 14) - Used when HP < 50%, -20% accuracy

**AI Pattern:** `BASIC_AGGRESSIVE`
```
Priority:
1. HP < 30%: Wild Swing (desperation)
2. Default: Punch
```

**Drops:**
| Item | Chance |
|------|--------|
| Rice Ball | 30% |
| 5 Coins | 50% |

**Spawn Locations:**
- Lower Streets
- Alleyways

**Dialogue:**
- Start: "Hey! Empty your pockets!"
- Low HP: "You... you'll regret this!"
- Player Low: "Ha! Not so tough now!"
- Defeat: "Ugh..."

**Claude Variation:**
- Names: Can generate unique names
- Dialogue: Can vary threat lines
- Stats: ±10% variation

---

### Alley Brawler
**Faction:** Urban Thugs
**Tier:** Common
**Chapters:** 1

| Stat | Value |
|------|-------|
| HP | 80 |
| STR | 10 |
| DEX | 8 |
| END | 8 |
| WIS | 5 |
| Speed | 112 |
| Defense | 4 |

**Techniques:**
1. **Punch** (Power 10) - Default
2. **Headbutt** (Power 16, Speed -1) - Used every 3rd turn
3. **Block** - Used when HP < 40%, +50% DEF for 1 turn

**AI Pattern:** `BASIC_BALANCED`
```
Priority:
1. HP < 40%: Block (then counter)
2. Turn divisible by 3: Headbutt
3. Default: Punch
```

**Drops:**
| Item | Chance |
|------|--------|
| Rice Ball | 40% |
| Bandage | 20% |
| 10 Coins | 40% |

**Spawn Locations:**
- Alleyways
- Market District (night)

**Dialogue:**
- Start: "Another beggar? Easy pickings."
- Low HP: "Tch... you fight dirty!"
- Player Low: "Stay down if you know what's good for ya!"
- Defeat: "The boss... won't like this..."

---

### Scarred Enforcer
**Faction:** Urban Thugs
**Tier:** Uncommon
**Chapters:** 1, 2

| Stat | Value |
|------|-------|
| HP | 100 |
| STR | 12 |
| DEX | 10 |
| END | 10 |
| WIS | 6 |
| Speed | 116 |
| Defense | 5 |

**Techniques:**
1. **Heavy Punch** (Power 14) - Default
2. **Crushing Blow** (Power 22, Speed -2) - Used when player defending
3. **Intimidate** - Reduce player ATK by 15% for 2 turns (used once at start)
4. **Desperate Flurry** (Power 10 × 2 hits) - Used when HP < 25%

**AI Pattern:** `ADVANCED_AGGRESSIVE`
```
Priority:
1. Turn 1: Intimidate
2. HP < 25%: Desperate Flurry
3. Player defending: Crushing Blow
4. Default: Heavy Punch
```

**Drops:**
| Item | Chance |
|------|--------|
| Rice Ball | 50% |
| Strength Tonic | 15% |
| 20 Coins | 50% |
| Technique Scroll (rare) | 3% |

**Spawn Locations:**
- Gang Territory
- Lower Streets (rare)

**Dialogue:**
- Start: "The boss wants this turf. You're in the way."
- Low HP: "You're... stronger than you look..."
- Player Low: "Just like all the others. Weak."
- Defeat: "Tell... tell Razor... I failed..."

---

### Gang Lieutenant
**Faction:** Urban Thugs
**Tier:** Rare (Mini-boss)
**Chapters:** 2

| Stat | Value |
|------|-------|
| HP | 140 |
| STR | 14 |
| DEX | 12 |
| END | 12 |
| WIS | 8 |
| Speed | 120 |
| Defense | 6 |

**Techniques:**
1. **Iron Fist** (Power 18) - Default
2. **Gang Tactics** - Buff: +30% damage for 3 turns (used once)
3. **Takedown** (Power 25, Speed -1) - Used after Gang Tactics
4. **Last Stand** (Power 30, costs 20% current HP) - Used when HP < 20%

**AI Pattern:** `ADVANCED_TACTICAL`
```
Priority:
1. Turn 2: Gang Tactics (buff)
2. Has buff: Takedown
3. HP < 20%: Last Stand
4. Default: Iron Fist
```

**Drops:**
| Item | Chance |
|------|--------|
| Beggar's Feast | 30% |
| Strength Tonic | 40% |
| 50 Coins | 60% |
| Technique Scroll | 10% |

**Spawn Locations:**
- Gang Headquarters
- Territory Borders

**Dialogue:**
- Start: "A beggar dares challenge me? Know your place!"
- Low HP: "Impossible... I trained for years!"
- Player Low: "Crawl back to your gutter, beggar."
- Defeat: "The Spartans... they were right about you beggars..."

---

## Spartans

*Disciplined authority fighters. Tactical, organized, dangerous.*

### Spartan Recruit
**Faction:** Spartans
**Tier:** Common
**Chapters:** 2

| Stat | Value |
|------|-------|
| HP | 90 |
| STR | 10 |
| DEX | 12 |
| END | 10 |
| WIS | 8 |
| Speed | 120 |
| Defense | 5 |

**Techniques:**
1. **Precision Strike** (Power 12, +10% crit) - Default
2. **Formation Guard** - +75% DEF for 1 turn, used when HP < 60%
3. **Disciplined Thrust** (Power 18) - Used after guarding

**AI Pattern:** `ADVANCED_DEFENSIVE`
```
Priority:
1. HP < 60% and not guarding: Formation Guard
2. Just guarded: Disciplined Thrust
3. Default: Precision Strike
```

**Drops:**
| Item | Chance |
|------|--------|
| Bandage | 40% |
| Swift Elixir | 20% |
| 25 Coins | 50% |

**Spawn Locations:**
- Spartan Patrol Routes
- Market District (day)

**Dialogue:**
- Start: "Halt! State your business, vagrant."
- Low HP: "Requesting backup... situation escalating..."
- Player Low: "Surrender now. This is your only warning."
- Defeat: "Command... target is... formidable..."

---

### Spartan Warrior
**Faction:** Spartans
**Tier:** Uncommon
**Chapters:** 2, 3

| Stat | Value |
|------|-------|
| HP | 130 |
| STR | 14 |
| DEX | 14 |
| END | 14 |
| WIS | 10 |
| Speed | 124 |
| Defense | 7 |

**Techniques:**
1. **Lance Strike** (Power 16) - Default
2. **Shield Bash** (Power 14, applies Stun 25% chance) - Used every 3 turns
3. **Phalanx Stance** - +100% DEF, reflects 20% damage, lasts 2 turns
4. **Execute** (Power 28, +50% vs stunned) - Used when player stunned

**AI Pattern:** `ADVANCED_TACTICAL`
```
Priority:
1. Turn 3, 6, 9...: Shield Bash (stun attempt)
2. Player stunned: Execute
3. HP < 40%: Phalanx Stance
4. Default: Lance Strike
```

**Drops:**
| Item | Chance |
|------|--------|
| Iron Skin Salve | 30% |
| Swift Elixir | 30% |
| 40 Coins | 60% |
| Technique Scroll | 8% |

**Spawn Locations:**
- Spartan Barracks exterior
- High District

**Dialogue:**
- Start: "You've entered restricted territory. Prepare for detainment."
- Low HP: "Your technique... it's not from around here."
- Player Low: "Stand down. Resistance is futile."
- Defeat: "The beggars... they hide true warriors..."

---

## Lone Wolves

*Independent masters. High skill, unique styles, unpredictable.*

### Wandering Fighter
**Faction:** Lone Wolf
**Tier:** Uncommon
**Chapters:** 2

| Stat | Value |
|------|-------|
| HP | 120 |
| STR | 12 |
| DEX | 14 |
| END | 10 |
| WIS | 12 |
| Speed | 124 |
| Defense | 5 |

**Techniques:**
1. **Swift Palm** (Power 14, Speed +1) - Default
2. **Flowing Counter** - Counter-attack setup (150% power if hit)
3. **Chi Burst** (Power 22, costs 15 chi) - Used when chi > 20
4. **Second Wind** - Heal 20% HP, used once when HP < 30%

**AI Pattern:** `MASTER_ADAPTIVE`
```
Tracks: Player's last 3 actions

Priority:
1. HP < 30% and not healed: Second Wind
2. Chi > 20: Chi Burst
3. Player used heavy technique: Flowing Counter (anticipate)
4. Default: Swift Palm
```

**Drops:**
| Item | Chance |
|------|--------|
| Spirit Tea | 40% |
| Meditation Incense | 30% |
| 35 Coins | 50% |
| Technique Scroll | 15% |

**Spawn Locations:**
- Training Grounds (optional fight)
- Wanderer's Path

**Dialogue:**
- Start: "Another seeker of strength? Show me what you've learned."
- Low HP: "Good... very good. You have potential."
- Player Low: "Don't give up. Pain is the teacher."
- Defeat: "Impressive. The beggars have found a gem."

---

### Silent Master
**Faction:** Lone Wolf
**Tier:** Rare (Mini-boss)
**Chapters:** 3

| Stat | Value |
|------|-------|
| HP | 180 |
| STR | 16 |
| DEX | 16 |
| END | 14 |
| WIS | 14 |
| Speed | 128 |
| Defense | 7 |

**Techniques:**
1. **Shadowless Palm** (Power 20, Speed +2) - Default
2. **Void Step** - Evasion +50% for 2 turns
3. **Killing Intent** (Power 35, applies Fear: -25% player ATK) - Used once
4. **Perfect Strike** (Power 45, ignores 50% DEF) - Used when HP < 25%
5. **Meditate** - Heal 15%, +20 chi, used once at HP < 50%

**AI Pattern:** `MASTER_PREDATOR`
```
Tracks: Player patterns, cooldowns

Priority:
1. Turn 1: Void Step (evasion setup)
2. HP < 50% and not meditated: Meditate
3. HP < 25%: Perfect Strike
4. Chi > 25 and player below 40% HP: Killing Intent
5. Default: Shadowless Palm
```

**Drops:**
| Item | Chance |
|------|--------|
| Elder's Brew | 30% |
| Mastery Pill | 25% |
| 100 Coins | 70% |
| Technique Scroll (Rare) | 20% |

**Spawn Locations:**
- Ancient Temple (optional)
- Wanderer's Path (end)

**Dialogue:**
- Start: "..." (silent stare)
- Low HP: "...You've trained well."
- Player Low: "..." (shakes head disappointedly)
- Defeat: "...Find me again. When you're stronger."

---

## Bosses

*Major story encounters. Multi-phase, high stakes, unique mechanics.*

---

### Razor (Chapter 1 Boss)
**Faction:** Urban Thugs (Leader)
**Tier:** Boss
**Chapters:** 1

**Lore:** The ruthless leader of the Lower Streets gang. Known for his brutal efficiency and razor-sharp strikes.

| Stat | Value |
|------|-------|
| HP | 200 |
| STR | 14 |
| DEX | 12 |
| END | 12 |
| WIS | 8 |
| Speed | 120 |
| Defense | 6 |

**Phase 1 (100-50% HP):**

**Techniques:**
1. **Razor Slash** (Power 18) - Default
2. **Street King's Authority** - Buff: +40% damage, 3 turns (turn 1)
3. **Brutal Combo** (Power 12 × 2 hits) - Used every 4 turns

**AI Pattern:**
```
Turn 1: Street King's Authority
Turn 4, 8, 12...: Brutal Combo
Default: Razor Slash
```

**Phase 2 (Below 50% HP):**

*"You think you can beat ME? I RUN these streets!"*

**New Techniques:**
4. **Desperate Fury** (Power 10 × 3 hits, Speed -2) - Replaces Brutal Combo
5. **Last Resort** (Power 40, self-damage 20 HP) - Used when HP < 20%

**AI Pattern:**
```
HP < 20%: Last Resort
Turn 4, 8, 12...: Desperate Fury
Default: Razor Slash (now +20% damage from desperation)
```

**Rewards:**
- 200 Coins
- Razor's Bandana (cosmetic)
- Technique Scroll: Rising Dragon (50% chance)
- Unlocks: Gang Territory access

**Dialogue:**
- Start: "A beggar? In MY territory? Boys, teach this fool a lesson— wait, where are my boys?!"
- Phase 2: "You think you can beat ME? I RUN these streets!"
- Player Low: "Hah! Should've stayed in your gutter!"
- Defeat: "How... how did a beggar... No! This isn't over!"

---

### Commander Vex (Chapter 2 Boss)
**Faction:** Spartans (Commander)
**Tier:** Boss
**Chapters:** 2

**Lore:** A decorated Spartan commander who sees the beggars as a threat to order. Believes in absolute discipline.

| Stat | Value |
|------|-------|
| HP | 300 |
| STR | 18 |
| DEX | 16 |
| END | 16 |
| WIS | 12 |
| Speed | 128 |
| Defense | 8 |

**Phase 1 (100-60% HP): Assessment**

**Techniques:**
1. **Commander's Strike** (Power 22) - Default
2. **Analyze Opponent** - Reveals player's most-used technique, +20% damage vs it
3. **Shield Formation** - +100% DEF for 2 turns

**AI Pattern:**
```
Turn 1: Analyze Opponent
HP < 80%: Shield Formation (once)
Default: Commander's Strike
If player uses most-used technique: +20% damage counter
```

**Phase 2 (60-30% HP): Adaptation**

*"Fascinating. Your style is... unorthodox. Let me show you true discipline."*

**New Techniques:**
4. **Disciplined Assault** (Power 16 × 2, applies Armor Break) - Every 3 turns
5. **Rally Cry** - Heal 30 HP, +25% Speed for 3 turns

**AI Pattern:**
```
Turn 1 of phase: Rally Cry
Turn 3, 6, 9...: Disciplined Assault
Default: Commander's Strike
```

**Phase 3 (Below 30% HP): Respect**

*"You've earned my respect, beggar. But I cannot lose!"*

**New Techniques:**
6. **Final Command** (Power 50, one-time use) - Massive single hit
7. **Spartan's Pride** - +50% all stats for rest of fight (one-time)

**AI Pattern:**
```
Turn 1 of phase: Spartan's Pride
HP < 15%: Final Command
Default: Disciplined Assault or Commander's Strike
```

**Rewards:**
- 400 Coins
- Spartan Insignia (cosmetic)
- Technique Scroll: Iron Palm (guaranteed)
- Swift Elixir × 2
- Unlocks: High District access

**Dialogue:**
- Start: "So you're the beggar causing trouble. I expected... more."
- Phase 2: "Fascinating. Your style is unorthodox. Let me show you true discipline."
- Phase 3: "You've earned my respect, beggar. But I cannot lose!"
- Player Low: "Surrender now and I'll make your detainment... comfortable."
- Defeat: "Impossible... defeated by a... No. You're no ordinary beggar. Who ARE you?"

---

### The Hollow One (Chapter 3 Boss)
**Faction:** Lone Wolf (Mysterious)
**Tier:** Boss (Final)
**Chapters:** 3

**Lore:** A legendary fighter who abandoned all factions. Rumored to have mastered every style, then discarded them all. Seeks only the "perfect technique."

| Stat | Value |
|------|-------|
| HP | 400 |
| STR | 22 |
| DEX | 20 |
| END | 18 |
| WIS | 18 |
| Speed | 136 |
| Defense | 9 |

**Phase 1 (100-70% HP): Testing**

**Techniques:**
1. **Empty Palm** (Power 25) - Default, no flashy effects
2. **Mirror Stance** - Copies player's last technique at 80% power
3. **Hollow Guard** - Immune to damage for 1 turn, reflects status effects

**AI Pattern:**
```
Player used technique: Mirror Stance (copies it)
Player used buff/setup: Hollow Guard
Default: Empty Palm
```

**Phase 2 (70-40% HP): Teaching**

*"You rely too much on your elders' teachings. Show me YOUR technique."*

**New Mechanics:**
- If player uses the same technique twice in a row, Hollow One counters with +50% damage
- Rewards variety in player's choices

**New Techniques:**
4. **Formless Strike** (Power 30, ignores stance bonuses) - Every 4 turns
5. **Chi Disruption** - Drain 15 player chi, heal self 30 HP

**AI Pattern:**
```
Player repeated technique: Counter (+50% Empty Palm)
Turn 4, 8...: Formless Strike
Player chi > 30: Chi Disruption
Default: Empty Palm or Mirror Stance
```

**Phase 3 (Below 40% HP): Revelation**

*"Yes... YES! This is what I sought! A worthy opponent at last!"*

**New Techniques:**
6. **Perfect Form** (Power 40, Speed +2, guaranteed crit) - Every 5 turns
7. **Hollow Resonance** (Power 60, ignores all defenses) - One-time, at HP < 15%
8. **Enlightenment** - Full heal to 50% HP, one-time use at HP < 25%

**AI Pattern:**
```
HP < 25% and not enlightened: Enlightenment
HP < 15%: Hollow Resonance (finisher attempt)
Turn 5, 10...: Perfect Form
Default: Formless Strike
```

**Rewards:**
- 800 Coins
- The Hollow One's Robe (cosmetic - prestigious)
- Technique Scroll: Elder's Teaching (guaranteed)
- Mastery Pill × 2
- ENDING TRIGGER: Cliffhanger cutscene

**Dialogue:**
- Start: "Another seeker. Tell me, beggar... what do you fight for?"
- Phase 2: "You rely too much on your elders' teachings. Show me YOUR technique."
- Phase 3: "Yes... YES! This is what I sought! A worthy opponent at last!"
- Player Low: "Don't disappoint me now. FIGHT!"
- Defeat: "At last... someone who understands. The Dog Beating Staff... it's hidden in the mountains. Find it... and find me again. I'll be waiting."

---

## AI Behavior Patterns

### BASIC_AGGRESSIVE
```typescript
function decide(enemy, player, turn) {
  if (enemy.hp < 0.3 * enemy.maxHp) return "desperation_move";
  return "default_attack";
}
```

### BASIC_BALANCED
```typescript
function decide(enemy, player, turn) {
  if (enemy.hp < 0.4 * enemy.maxHp) return "defensive_move";
  if (turn % 3 === 0) return "special_attack";
  return "default_attack";
}
```

### ADVANCED_TACTICAL
```typescript
function decide(enemy, player, turn) {
  if (hasBuffActive()) return "buffed_attack";
  if (turn === 2) return "apply_buff";
  if (player.isDefending) return "guard_break_attack";
  if (enemy.hp < 0.2 * enemy.maxHp) return "last_resort";
  return "default_attack";
}
```

### MASTER_ADAPTIVE
```typescript
function decide(enemy, player, turn) {
  const playerPattern = analyzeLastThreeActions(player);

  if (enemy.hp < 0.3 && !enemy.hasHealed) return "heal";
  if (playerPattern === "heavy_attacks") return "counter_setup";
  if (enemy.chi > 20) return "chi_technique";
  return "default_attack";
}
```

### MASTER_PREDATOR
```typescript
function decide(enemy, player, turn) {
  if (turn === 1) return "evasion_setup";
  if (enemy.hp < 0.25) return "finishing_move";
  if (enemy.hp < 0.5 && !enemy.hasHealed) return "meditate";
  if (player.hp < 0.4 && enemy.chi > 25) return "killing_move";
  return "fast_attack";
}
```

---

## Claude AI Variation System

### Variation Template
```json
{
  "base_enemy": "Street Punk",
  "variation_params": {
    "stat_variance": 0.1,
    "name_pool": ["Scruffy Thug", "Nervous Punk", "Scarred Youth"],
    "personality": ["cocky", "nervous", "silent", "talkative"],
    "dialogue_themes": ["money", "territory", "respect", "survival"]
  }
}
```

### What Claude Can Vary
1. **Name** - Generate unique names within faction theme
2. **Dialogue** - Vary start/defeat lines based on personality
3. **Stats** - ±10% from base values
4. **Technique selection** - Choose from pool of 2-3 options

### What Claude Cannot Vary
1. **Core mechanics** - No new techniques
2. **Drop tables** - Fixed rates
3. **AI patterns** - Follow defined logic
4. **Phase triggers** - Fixed HP thresholds

---

## Difficulty Scaling

| Chapter | HP Modifier | Damage Modifier | AI Level |
|---------|-------------|-----------------|----------|
| 1 | 1.0× | 1.0× | Basic |
| 2 | 1.3× | 1.15× | Basic/Advanced |
| 3 | 1.6× | 1.3× | Advanced/Master |

---

## Changelog

| Date | Version | Change |
|------|---------|--------|
| 2025-12-05 | 0.0 | Initial template |
| 2025-12-05 | 1.0 | Added 8 enemies + 3 bosses with full stats |
