# Technique Database (技法录)

**Last Updated:** 2025-12-05
**Status:** `[ELABORATED]` - Core techniques ready for implementation
**Version:** 2.0

---

## Document Navigation

| Related Document | Content |
|------------------|---------|
| COMBAT_SYSTEM.md | Combat mechanics, stance-aspect mapping |
| CHI_SYSTEM.md | Eight chi aspects, inverse mechanics |
| ENEMIES.md | Enemy techniques and patterns |
| GLOSSARY.md | Chinese terminology reference |

---

## Overview

All techniques (技法, Jìfǎ) in The Beggars Sect with complete stats and lore connections.

**Current Count:** 15 techniques (MVP target: 25-40)
**Status:** Core techniques complete with chi aspect integration

**Chi Aspect Legend:**
- 力 (Force) - Raw power, guard breaking
- 流 (Flow) - Combos, adaptability
- 准 (Precision) - Critical hits, vital strikes
- 爆 (Burst) - Speed, explosive damage
- 甲 (Armor) - Defense, endurance
- 感 (Sense) - Evasion, counters
- 意 (Will) - Status resistance
- 逆 (Inverse) - Desperation power

---

## Quick Reference

| Technique | Chinese | Stance | Tier | Power | Chi | Speed | Chi Aspect | Key Effect |
|-----------|---------|--------|------|-------|-----|-------|------------|------------|
| Palm Strike | 掌击 | Any | Basic | 12 | 0 | 0 | Force (力) | Chi gain +3 |
| Flowing Strike | 流打 | Flowing | Light | 16 | 5 | +1 | Flow (流) | Combo starter |
| Stream Palm | 河掌 | Flowing | Medium | 24 | 8 | 0 | Flow (流) | Combo follow-up |
| Ripple Guard | 波防 | Flowing | Light | 8 | 4 | +2 | Sense (感) | Counter on defend |
| Weathered Palm | 风化掌 | Weathered | Medium | 22 | 6 | -1 | Armor (甲) | Armor Break 25% |
| Iron Palm | 铁掌 | Weathered | Heavy | 35 | 12 | -2 | Force (力) | Armor Break 50% |
| Steadfast Guard | 恒守 | Weathered | Light | 0 | 4 | +1 | Will (意) | Defense +75% |
| Ravenous Palm | 饿掌 | Hungry | Light | 18 | 4 | +1 | Burst (爆) | Extra chi on hit |
| Desperate Strike | 绝击 | Hungry | Medium | 28 | 8 | 0 | Inverse (逆) | +50% if HP < 30% |
| Feral Combo | 狂连 | Hungry | Heavy | 38 | 14 | -1 | Force+Burst | 2-hit attack |
| Beggar's Feint | 丐虚 | Any | Light | 10 | 5 | +2 | Sense (感) | +30% crit next |
| Rising Dragon | 升龙 | Any | Heavy | 40 | 15 | -2 | Force (力) | Stun 1 turn |
| Chi Surge | 气涌 | Any | Medium | 0 | 0 | -1 | Flow (流) | +25 chi, buff |
| Elder's Teaching | 长老教 | Any | Ultimate | 55 | 22 | -3 | All Aspects | Ignores defense |
| Wanderer's Path | 游子路 | Any | Medium | 20 | 10 | 0 | Flow+Will | Heals 15% HP |

---

## Stat Reference

**Power Tiers:**
- Basic: 10-15 (reliable, spammable)
- Light: 15-20 (quick, efficient)
- Medium: 20-35 (standard damage)
- Heavy: 35-50 (big hits, slow)
- Ultimate: 50+ (devastating, expensive)

**Chi Cost Tiers:**
- Basic: 0 (free, generates chi)
- Light: 4-6 (cheap, frequent use)
- Medium: 8-12 (standard)
- Heavy: 14-18 (investment)
- Ultimate: 20-25 (major commitment)

**Speed Modifiers:**
- +2: Very Fast (Delay ×0.8)
- +1: Fast (Delay ×0.9)
- 0: Normal (Delay ×1.0)
- -1: Slow (Delay ×1.1)
- -2: Very Slow (Delay ×1.2)
- -3: Extremely Slow (Delay ×1.3)

---

## Basic Attack

### 掌击 Zhǎng Jī (Palm Strike)
**Stance:** Any
**Tier:** Basic
**Chi Aspect:** Force (力)
**Unlock:** Start of game (default attack)

| Stat | Value |
|------|-------|
| Power | 12 |
| Chi Cost | 0 |
| Chi Gain | +3 |
| Speed | 0 |
| Effect | None |

**Aspect Bonus:** +1 chi gain if Force-aligned stance (Hungry)

**Mastery Progression:**
- Lv1 (0): Base attack
- Lv2 (10): Power +2 (→14)
- Lv3 (25): Chi Gain +1 (→+4)
- Lv4 (50): 10% chance to combo into any technique
- Lv5 (100): Power +3 (→17), Speed +1

**Combo Links:**
- Starter for: Basic Chain
- Follow-up to: Any technique

**Lore:**
"Even the simplest palm can fell a mountain, if the chi behind it is true." - Elder Chen

The bread-and-butter attack. Free, generates chi, always available. In the Beggars Sect, mastering the palm strike means learning to channel chi through empty hands—no weapon, no ornament, just survival.

---

## Flowing Stance Techniques (流架技)

*Flowing Stance (流架 Liú Jià) embodies Flow (流) and Precision (准) aspects.*
*Philosophy: "Water finds its path" (水寻其道)*

### 流打 Liú Dǎ (Flowing Strike)
**Stance:** Flowing (流架)
**Tier:** Light
**Chi Aspect:** Flow (流)
**Unlock:** Elder Chen teaching (Chapter 1)

| Stat | Value |
|------|-------|
| Power | 16 |
| Chi Cost | 5 |
| Speed | +1 |
| Effect | Combo Starter - next technique in 2 turns gets +15% damage |

**Aspect Bonus:** In Flowing Stance, combo window extends by 1 turn

**Mastery Progression:**
- Lv1 (0): Base ability
- Lv2 (10): Power +2 (→18)
- Lv3 (25): Combo bonus +5% (→+20%)
- Lv4 (50): Chi cost -1 (→4)
- Lv5 (100): Combo window extends to 3 turns

**Combo Links:**
- Starter for: 流河 Flowing River, Stream Assault
- Follow-up to: 掌击 Palm Strike

**Lore:**
"The first strike is not the end, but the beginning of a river." - Elder Chen

The signature Flowing technique. Named for how chi flows from one strike into the next like water finding its path. Essential for combo-focused playstyle.

---

### 河掌 Hé Zhǎng (Stream Palm)
**Stance:** Flowing (流架)
**Tier:** Medium
**Chi Aspect:** Flow (流) + Precision (准)
**Unlock:** Elder Chen teaching (Chapter 1, after first combat)

| Stat | Value |
|------|-------|
| Power | 24 |
| Chi Cost | 8 |
| Speed | 0 |
| Effect | If used after Flowing Strike, gains +20% damage |

**Aspect Bonus:** Precision aspect adds +5% crit chance when combo-linked

**Mastery Progression:**
- Lv1 (0): Base ability
- Lv2 (10): Power +3 (→27)
- Lv3 (25): Combo bonus +10% (→+30%)
- Lv4 (50): Chi cost -1 (→7)
- Lv5 (100): Applies Speed Down to enemy (1 turn)

**Combo Links:**
- Starter for: None
- Follow-up to: 流打 Flowing Strike, 掌击 Palm Strike
- Finisher for: 流河 Flowing River

**Lore:**
"A river is most powerful not where it begins, but where currents converge."

The natural follow-up to Flowing Strike. The technique channels chi like water—soft at the surface, devastating at the core.

---

### 波防 Bō Fáng (Ripple Guard)
**Stance:** Flowing (流架)
**Tier:** Light
**Chi Aspect:** Sense (感)
**Unlock:** Elder Chen teaching (Chapter 1)

| Stat | Value |
|------|-------|
| Power | 8 |
| Chi Cost | 4 |
| Speed | +2 |
| Effect | Enters guard state. If hit within 1 turn, counter-attacks for 150% power |

**Aspect Bonus:** Sense aspect allows reading enemy intent, +10% counter activation if enemy was aggressive last turn

**Mastery Progression:**
- Lv1 (0): Base ability
- Lv2 (10): Counter damage +25% (→175%)
- Lv3 (25): Chi gain on successful counter +5
- Lv4 (50): Chi cost -1 (→3)
- Lv5 (100): Counter damage +25% (→200%), grants Evasion +10% for 1 turn

**Combo Links:**
- Starter for: Counter Chain
- Follow-up to: Any technique (defensive reset)

**Lore:**
"Throw a stone into still water. The ripples tell you everything about the stone."

Defensive technique that embodies the Sense (感) aspect—reading the enemy's intent and turning their aggression against them. The beggar appears to retreat, but is preparing to strike.

---

## Weathered Stance Techniques (风化架技)

*Weathered Stance (风化架 Fēnghuà Jià) embodies Armor (甲) and Will (意) aspects.*
*Philosophy: "The mountain endures" (山能恒久)*

### 风化掌 Fēnghuà Zhǎng (Weathered Palm)
**Stance:** Weathered (风化架)
**Tier:** Medium
**Chi Aspect:** Armor (甲)
**Unlock:** Elder Wu teaching (Chapter 1)

| Stat | Value |
|------|-------|
| Power | 22 |
| Chi Cost | 6 |
| Speed | -1 |
| Effect | 25% chance to apply Armor Break (3 turns, -50% DEF) |

**Aspect Bonus:** In Weathered Stance, Armor Break duration +1 turn

**Mastery Progression:**
- Lv1 (0): Base ability
- Lv2 (10): Armor Break chance +10% (→35%)
- Lv3 (25): Power +3 (→25)
- Lv4 (50): Armor Break chance +15% (→50%)
- Lv5 (100): Armor Break guaranteed on crit

**Combo Links:**
- Starter for: 铁破 Iron Breaker
- Follow-up to: 掌击 Palm Strike, 恒守 Steadfast Guard

**Lore:**
"Even stone yields to time. Your armor is merely stone."

The core Weathered technique. Named for how wind and rain erode mountains over centuries—this palm does it in seconds. The Beggars Sect developed this technique by observing how even the strongest walls crumble.

---

### 铁掌 Tiě Zhǎng (Iron Palm)
**Stance:** Weathered (风化架)
**Tier:** Heavy
**Chi Aspect:** Force (力) + Armor (甲)
**Unlock:** Elder Wu teaching (Chapter 2) or rare scroll drop

| Stat | Value |
|------|-------|
| Power | 35 |
| Chi Cost | 12 |
| Speed | -2 |
| Effect | 50% chance to apply Armor Break. If target already has Armor Break, +30% damage |

**Aspect Bonus:** Force aspect adds guard-break property, preventing enemy defend actions for 1 turn

**Mastery Progression:**
- Lv1 (0): Base ability
- Lv2 (10): Power +5 (→40)
- Lv3 (25): Armor Break chance +15% (→65%)
- Lv4 (50): Bonus vs broken +10% (→+40%)
- Lv5 (100): Armor Break chance 80%, applies Stun if target already broken

**Combo Links:**
- Starter for: None (finisher move)
- Follow-up to: 风化掌 Weathered Palm
- Finisher for: 铁破 Iron Breaker

**Lore:**
"A beggar's hands become iron through years of hard labor. We turn that hardship into power."

The heavy hitter of Weathered stance. Legend says Elder Wu developed this after years of hauling iron in the Outer Ring's forges. His hands became harder than the metal itself.

---

### 恒守 Héng Shǒu (Steadfast Guard)
**Stance:** Weathered (风化架)
**Tier:** Light
**Chi Aspect:** Will (意)
**Unlock:** Elder Wu teaching (Chapter 1)

| Stat | Value |
|------|-------|
| Power | 0 |
| Chi Cost | 4 |
| Speed | +1 |
| Effect | Defense +75% for 2 turns. Chi gained when hit +3 |

**Aspect Bonus:** Will aspect grants immunity to intimidation and fear effects while active

**Mastery Progression:**
- Lv1 (0): Base ability
- Lv2 (10): Defense bonus +10% (→85%)
- Lv3 (25): Duration +1 turn (→3 turns)
- Lv4 (50): Chi cost -1 (→3)
- Lv5 (100): Defense bonus +15% (→100%), grants Armor Break immunity

**Combo Links:**
- Starter for: Defensive setup
- Follow-up to: Any (defensive reset)

**Lore:**
"They can take everything from us. But they cannot take our will to stand."

Pure defense. The technique channels chi into Will (意), the aspect of mental fortitude. A beggar in Steadfast Guard has already accepted they might be hit—and decided it doesn't matter.

---

## Hungry Stance Techniques (饿架技)

*Hungry Stance (饿架 È Jià) embodies Force (力) and Burst (爆) aspects.*
*Philosophy: "Hunger drives the hunt" (饥驱猎心)*

### 饿掌 È Zhǎng (Ravenous Palm)
**Stance:** Hungry (饿架)
**Tier:** Light
**Chi Aspect:** Burst (爆)
**Unlock:** Elder Mei teaching (Chapter 2) or discovery through hunger (low HP combat)

| Stat | Value |
|------|-------|
| Power | 18 |
| Chi Cost | 4 |
| Speed | +1 |
| Effect | Chi gain +5 on hit. If this kills an enemy, restore 10% HP |

**Aspect Bonus:** Burst aspect grants +1 initiative on next turn if this hits

**Mastery Progression:**
- Lv1 (0): Base ability
- Lv2 (10): Power +2 (→20)
- Lv3 (25): Chi gain +2 (→+7)
- Lv4 (50): HP restore on kill +5% (→15%)
- Lv5 (100): If HP < 50%, Power +30%

**Combo Links:**
- Starter for: 饿连 Hungry Chain
- Follow-up to: 掌击 Palm Strike

**Lore:**
"The hungry wolf doesn't hesitate. It strikes because it must." - Elder Mei

The core Hungry technique. Named for the desperation of genuine hunger—the sect discovered that those who fight for survival fight differently. Great chi generation and sustain if you can secure kills.

---

### 绝击 Jué Jī (Desperate Strike)
**Stance:** Hungry (饿架)
**Tier:** Medium
**Chi Aspect:** Inverse (逆)
**Unlock:** Discovered automatically when fighting at low HP (< 30%)

| Stat | Value |
|------|-------|
| Power | 28 |
| Chi Cost | 8 |
| Speed | 0 |
| Effect | If user HP < 30%, Power +50% (→42). If HP < 15%, also guaranteed crit |

**Aspect Bonus:** Inverse chi activates Desperation Gates, converting damage taken into chi at 75% rate while effect is active

**Mastery Progression:**
- Lv1 (0): Base ability
- Lv2 (10): HP threshold +5% (< 35% for bonus)
- Lv3 (25): Power +4 (→32 base, →48 buffed)
- Lv4 (50): Crit threshold +5% (< 20% for crit)
- Lv5 (100): If kill occurs while buffed, restore 20% HP

**Combo Links:**
- Starter for: None
- Follow-up to: Any (emergency option)

**Lore:**
"绝 (Jué) means 'desperate' and 'ultimate.' When nothing remains, everything becomes possible."

The comeback technique. This is the first Inverse (逆) chi technique Li Wei learns—not through teaching, but through survival. The technique cannot be taught; it emerges when the Hungry Void opens. This is why the Beggars Sect never truly dies.

---

### 狂连 Kuáng Lián (Feral Combo)
**Stance:** Hungry (饿架)
**Tier:** Heavy
**Chi Aspect:** Force (力) + Burst (爆)
**Unlock:** Elder Mei teaching (Chapter 2)

| Stat | Value |
|------|-------|
| Power | 19 × 2 hits = 38 total |
| Chi Cost | 14 |
| Speed | -1 |
| Effect | Two-hit attack. Second hit has +25% crit chance |

**Aspect Bonus:** Force aspect applies stagger between hits; Burst aspect means if first hit crits, second is guaranteed crit

**Mastery Progression:**
- Lv1 (0): Base ability (2 hits)
- Lv2 (10): Second hit crit +10% (→+35%)
- Lv3 (25): Each hit Power +2 (→21 × 2 = 42)
- Lv4 (50): Chi cost -2 (→12)
- Lv5 (100): Third hit added at 50% power (→21 + 21 + 10 = 52)

**Combo Links:**
- Starter for: None (self-contained combo)
- Follow-up to: 饿掌 Ravenous Palm

**Lore:**
"狂 (Kuáng) means 'wild' or 'feral.' A cornered animal is most dangerous."

Multi-hit devastation. Elder Mei developed this by observing how wild dogs hunt—each bite leads into the next with frenzied momentum. Chi-hungry but rewarding, embodying the Hungry philosophy.

---

## General Techniques (通用技) - Any Stance

*These techniques work in any stance and provide utility.*
*They draw from multiple chi aspects, making them universally accessible.*

### 丐虚 Gài Xū (Beggar's Feint)
**Stance:** Any
**Tier:** Light
**Chi Aspect:** Sense (感)
**Unlock:** Elder Chen teaching (Chapter 1)

| Stat | Value |
|------|-------|
| Power | 10 |
| Chi Cost | 5 |
| Speed | +2 |
| Effect | Next attack within 2 turns has +30% crit chance |

**Aspect Bonus:** Sense aspect reveals enemy's next intended action for 1 turn

**Mastery Progression:**
- Lv1 (0): Base ability
- Lv2 (10): Crit bonus +10% (→+40%)
- Lv3 (25): Power +5 (→15)
- Lv4 (50): Duration +1 turn (→3 turns)
- Lv5 (100): Also grants +15% damage on next attack

**Combo Links:**
- Starter for: Crit setup combos
- Follow-up to: Any

**Lore:**
"虚 (Xū) means 'empty' or 'false.' A beggar's greatest weapon is being underestimated."

Setup technique embodying the Beggars Sect's philosophy of deception. Appear harmless, then strike with precision. The technique channels Sense (感) chi to read the opponent while creating false openings.

---

### 升龙 Shēng Lóng (Rising Dragon)
**Stance:** Any
**Tier:** Heavy
**Chi Aspect:** Force (力)
**Unlock:** Boss drop (Chapter 1 boss) or Elder Wu teaching (Chapter 2)

| Stat | Value |
|------|-------|
| Power | 40 |
| Chi Cost | 15 |
| Speed | -2 |
| Effect | Applies Stun (1 turn). Target skips next action |

**Aspect Bonus:** Force aspect applies additional knockback, breaking enemy formations in group fights

**Mastery Progression:**
- Lv1 (0): Base ability
- Lv2 (10): Power +5 (→45)
- Lv3 (25): 25% chance stun lasts 2 turns
- Lv4 (50): Chi cost -2 (→13)
- Lv5 (100): 50% chance stun lasts 2 turns, grants user Speed Up (1 turn)

**Combo Links:**
- Starter for: Stun combos (free follow-up while stunned)
- Follow-up to: 丐虚 Beggar's Feint (for crit chance)

**Lore:**
"Even a beggar can touch the heavens, if their chi rises true."

The big crowd control technique. Originally a high-sect technique, it was "acquired" by the Beggars Sect generations ago. The sect's version is rougher, rawer—but equally devastating. Named for the upward chi surge that lifts both user and opponent.

---

### 气涌 Qì Yǒng (Chi Surge)
**Stance:** Any
**Tier:** Medium (Utility)
**Chi Aspect:** Flow (流)
**Unlock:** Meditation discovery (Training Ground, Chapter 1)

| Stat | Value |
|------|-------|
| Power | 0 |
| Chi Cost | 0 |
| Chi Gain | +25 |
| Speed | -1 |
| Effect | Gain 25 chi. Apply Attack Up (+25% damage) for 2 turns |

**Aspect Bonus:** Flow aspect allows chi to circulate to allies in range (future feature: party chi sharing)

**Mastery Progression:**
- Lv1 (0): Base ability
- Lv2 (10): Chi gain +5 (→+30)
- Lv3 (25): Buff duration +1 turn (→3 turns)
- Lv4 (50): Also applies Speed Up (1 turn)
- Lv5 (100): Chi gain +10 (→+40), buff potency +10% (→+35%)

**Combo Links:**
- Starter for: Burst combos
- Follow-up to: 恒守 Steadfast Guard (safe setup)

**Lore:**
"涌 (Yǒng) means 'to surge' or 'to gush forth.' Chi is like water—dam it, and it builds pressure."

The key resource technique. Discovered through meditation, not teaching. The technique channels Flow (流) chi to rapidly circulate energy through all meridians, building reserves for devastating follow-ups.

---

### 长老教 Zhǎnglǎo Jiào (Elder's Teaching)
**Stance:** Any
**Tier:** Ultimate
**Chi Aspect:** All Eight Aspects
**Unlock:** Complete all Elder training (Chapter 3)

| Stat | Value |
|------|-------|
| Power | 55 |
| Chi Cost | 22 |
| Speed | -3 |
| Effect | Ignores 100% of target defense. 25% chance to apply all status effects |

**Aspect Bonus:** Channels all eight aspects simultaneously—the signature of true mastery. Each aspect contributes:
- Force: Defense ignore
- Flow: Status application
- Precision: Guaranteed hit
- Burst: Cannot be interrupted
- Armor: User takes reduced damage during execution
- Sense: Reveals enemy weaknesses
- Will: Cannot be countered
- Inverse: Damage scales with missing HP

**Mastery Progression:**
- Lv1 (0): Base ability
- Lv2 (10): Power +5 (→60)
- Lv3 (25): Status chance +15% (→40%)
- Lv4 (50): Chi cost -3 (→19)
- Lv5 (100): Power +10 (→70), guaranteed to apply random status

**Combo Links:**
- Starter for: None (finisher)
- Follow-up to: 气涌 Chi Surge (for chi), 丐虚 Beggar's Feint (for crit)
- Finisher for: Any combo

**Lore:**
"教 (Jiào) means 'teaching' or 'doctrine.' This technique is not learned—it is understood."

The ultimate technique representing the culmination of beggar training. When all three elders recognize a disciple's growth, they impart fragments of Wei Zhong's original combat philosophy. The technique synthesizes everything—balance, endurance, aggression—into a single devastating strike.

---

### 游子路 Yóuzǐ Lù (Wanderer's Path)
**Stance:** Any
**Tier:** Medium (Utility)
**Chi Aspect:** Flow (流) + Will (意)
**Unlock:** Discovery through exploration (hidden scroll, Chapter 2)

| Stat | Value |
|------|-------|
| Power | 20 |
| Chi Cost | 10 |
| Speed | 0 |
| Effect | Restore 15% Max HP. If HP > 75%, instead gain Defense Up (2 turns) |

**Aspect Bonus:** Flow aspect heals over time (5% additional HP over 3 turns); Will aspect clears one debuff

**Mastery Progression:**
- Lv1 (0): Base ability
- Lv2 (10): Heal +5% (→20%)
- Lv3 (25): Power +5 (→25)
- Lv4 (50): Defense Up threshold -10% (→HP > 65%)
- Lv5 (100): Heal +5% (→25%), Defense Up duration +1 turn (→3)

**Combo Links:**
- Starter for: Sustain rotation
- Follow-up to: Any (recovery option)

**Lore:**
"游子 (Yóuzǐ) means 'wanderer' or 'traveler far from home.' The path teaches endurance."

The sustain technique. A hidden scroll technique found in the Undercity, attributed to Wei Zhong himself. It reflects the beggar's journey—walking through hardship, healing through movement, surviving through will. The technique channels both Flow (流) and Will (意) to restore the body and spirit.

---

## Combo Database (连招录)

*Combos (连招, Liánzhāo) chain techniques together for bonus damage and effects.*

### Confirmed Combo Chains

#### 流河 Liú Hé (Flowing River) - 3-hit
**Sequence:** 流打 Flowing Strike → 河掌 Stream Palm → 掌击 Palm Strike
**Total Chi:** 5 + 8 + 0 = 13
**Damage Multipliers:** 1.0 → 1.1 → 1.3
**Chi Aspects:** Flow (流) throughout
**Bonus:** Stream Palm gets +20% from Flowing Strike; Palm Strike refunds 5 chi
**Lore:** "A river begins as a trickle, grows into a stream, and becomes unstoppable."

The core Flowing combo. Reliable damage, chi-positive finish. The combo embodies the Flow (流) aspect—each strike flowing naturally into the next.

#### 铁破 Tiě Pò (Iron Breaker) - 2-hit
**Sequence:** 风化掌 Weathered Palm → 铁掌 Iron Palm
**Total Chi:** 6 + 12 = 18
**Damage Multipliers:** 1.0 → 1.1
**Chi Aspects:** Armor (甲) → Force (力)
**Bonus:** If Weathered Palm applies Armor Break, Iron Palm gets +30%
**Lore:** "Erode the armor, then shatter what remains."

The Weathered burst combo. Devastating if armor break procs. The combo transitions from Armor (甲) to Force (力)—first weakening defenses, then overwhelming them.

#### 饿连 È Lián (Hungry Chain) - 3-hit
**Sequence:** 饿掌 Ravenous Palm → 绝击 Desperate Strike → 狂连 Feral Combo
**Total Chi:** 4 + 8 + 14 = 26
**Damage Multipliers:** 1.0 → 1.1 → 1.3
**Chi Aspects:** Burst (爆) → Inverse (逆) → Force+Burst
**Bonus:** High chi recovery from Ravenous Palm, inverse scaling from Desperate Strike
**Lore:** "Hunger drives the hunt. Desperation gives it teeth. Fury finishes it."

The Hungry all-in. Expensive but massive damage potential. This combo activates inverse chi mechanics—the lower your HP, the more devastating it becomes.

#### 虚龙 Xū Lóng (False Dragon) - 2-hit
**Sequence:** 丐虚 Beggar's Feint → 升龙 Rising Dragon
**Total Chi:** 5 + 15 = 20
**Damage Multipliers:** 1.0 → 1.1
**Chi Aspects:** Sense (感) → Force (力)
**Bonus:** +30% crit on Rising Dragon from Feint
**Lore:** "Appear weak, strike like thunder."

Crit-fishing for a stun. If crit lands, enemy loses turn AND takes huge damage. The combo name reflects the Beggars Sect philosophy—the "false" appearance hiding true power.

#### 涌终 Yǒng Zhōng (Surge Finisher) - 3-hit
**Sequence:** 气涌 Chi Surge → 丐虚 Beggar's Feint → 长老教 Elder's Teaching
**Total Chi:** 0 + 5 + 22 = 27 (but Chi Surge gives +25, net cost 2)
**Damage Multipliers:** — → 1.1 → 1.3
**Chi Aspects:** Flow (流) → Sense (感) → All Eight
**Bonus:** Attack Up from Surge, crit chance from Feint, all aspects from Elder's Teaching
**Lore:** "Build the wave, find the opening, release everything."

The ultimate combo. Sets up perfectly for Elder's Teaching devastation. This combo transitions through aspects, culminating in the all-aspect strike that defines mastery.

---

## Unlock Progression

### Chapter 1 Unlocks
| Technique | Source |
|-----------|--------|
| Palm Strike | Default |
| Flowing Strike | Elder Chen teaching |
| Stream Palm | Elder Chen teaching |
| Ripple Guard | Elder Chen teaching |
| Weathered Palm | Elder Wu teaching |
| Steadfast Guard | Elder Wu teaching |
| Beggar's Feint | Elder Chen teaching |
| Chi Surge | Training Ground discovery |

### Chapter 2 Unlocks
| Technique | Source |
|-----------|--------|
| Iron Palm | Elder Wu teaching |
| Ravenous Palm | Elder Mei teaching |
| Desperate Strike | Auto-discover (fight at < 30% HP) |
| Feral Combo | Elder Mei teaching |
| Rising Dragon | Elder Wu teaching OR Ch1 boss drop |
| Wanderer's Path | Hidden scroll (exploration) |

### Chapter 3 Unlocks
| Technique | Source |
|-----------|--------|
| Elder's Teaching | Complete all Elder training |

---

## Techniques Still Needed

For full 25-40 target:

- [ ] 2-3 more Flowing techniques
- [ ] 2-3 more Weathered techniques
- [ ] 2-3 more Hungry techniques
- [ ] 3-5 more General techniques
- [ ] Boss-exclusive techniques (drops)
- [ ] Secret/hidden techniques

---

## Changelog

| Date | Version | Change |
|------|---------|--------|
| 2025-12-05 | 0.0 | Initial template |
| 2025-12-05 | 1.0 | Added 15 core techniques with full stats |
| 2025-12-05 | 2.0 | Major update: Chinese names, chi aspects, aspect bonuses, lore for all techniques |
