# Technique Database

**Last Updated:** 2025-12-05
**Status:** `[ELABORATED]` - Core techniques ready for implementation
**Version:** 1.0

---

## Overview

All techniques in The Beggars Sect with complete stats.

**Current Count:** 15 techniques (MVP target: 25-40)
**Status:** Core techniques complete, more to be added during content phase

---

## Quick Reference

| Technique | Stance | Tier | Power | Chi | Speed | Key Effect |
|-----------|--------|------|-------|-----|-------|------------|
| Palm Strike | Any | Basic | 12 | 0 | 0 | Chi gain +3 |
| Flowing Strike | Flowing | Light | 16 | 5 | +1 | Combo starter |
| Stream Palm | Flowing | Medium | 24 | 8 | 0 | Combo follow-up |
| Ripple Guard | Flowing | Light | 8 | 4 | +2 | Counter on defend |
| Weathered Palm | Weathered | Medium | 22 | 6 | -1 | Armor Break 25% |
| Iron Palm | Weathered | Heavy | 35 | 12 | -2 | Armor Break 50% |
| Steadfast Guard | Weathered | Light | 0 | 4 | +1 | Defense +75% |
| Ravenous Palm | Hungry | Light | 18 | 4 | +1 | Extra chi on hit |
| Desperate Strike | Hungry | Medium | 28 | 8 | 0 | +50% if HP < 30% |
| Feral Combo | Hungry | Heavy | 38 | 14 | -1 | 2-hit attack |
| Beggar's Feint | Any | Light | 10 | 5 | +2 | +30% crit next |
| Rising Dragon | Any | Heavy | 40 | 15 | -2 | Stun 1 turn |
| Chi Surge | Any | Medium | 0 | 0 | -1 | +25 chi, buff |
| Elder's Teaching | Any | Ultimate | 55 | 22 | -3 | Ignores defense |
| Wanderer's Path | Any | Medium | 20 | 10 | 0 | Heals 15% HP |

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

### Palm Strike
**Stance:** Any
**Tier:** Basic
**Unlock:** Start of game (default attack)

| Stat | Value |
|------|-------|
| Power | 12 |
| Chi Cost | 0 |
| Chi Gain | +3 |
| Speed | 0 |
| Effect | None |

**Mastery Progression:**
- Lv1 (0): Base attack
- Lv2 (10): Power +2 (→14)
- Lv3 (25): Chi Gain +1 (→+4)
- Lv4 (50): 10% chance to combo into any technique
- Lv5 (100): Power +3 (→17), Speed +1

**Combo Links:**
- Starter for: Basic Chain
- Follow-up to: Any technique

**Notes:**
The bread-and-butter attack. Free, generates chi, always available. Mastering this is essential for sustained combat.

---

## Flowing Stance Techniques

*Flowing Stance focuses on balance, combos, and adaptability.*

### Flowing Strike
**Stance:** Flowing
**Tier:** Light
**Unlock:** Elder Chen teaching (Chapter 1)

| Stat | Value |
|------|-------|
| Power | 16 |
| Chi Cost | 5 |
| Speed | +1 |
| Effect | Combo Starter - next technique in 2 turns gets +15% damage |

**Mastery Progression:**
- Lv1 (0): Base ability
- Lv2 (10): Power +2 (→18)
- Lv3 (25): Combo bonus +5% (→+20%)
- Lv4 (50): Chi cost -1 (→4)
- Lv5 (100): Combo window extends to 3 turns

**Combo Links:**
- Starter for: Flowing River, Stream Assault
- Follow-up to: Palm Strike

**Notes:**
The signature Flowing technique. Fast, efficient, and sets up devastating combos. Essential for combo-focused playstyle.

---

### Stream Palm
**Stance:** Flowing
**Tier:** Medium
**Unlock:** Elder Chen teaching (Chapter 1, after first combat)

| Stat | Value |
|------|-------|
| Power | 24 |
| Chi Cost | 8 |
| Speed | 0 |
| Effect | If used after Flowing Strike, gains +20% damage |

**Mastery Progression:**
- Lv1 (0): Base ability
- Lv2 (10): Power +3 (→27)
- Lv3 (25): Combo bonus +10% (→+30%)
- Lv4 (50): Chi cost -1 (→7)
- Lv5 (100): Applies Speed Down to enemy (1 turn)

**Combo Links:**
- Starter for: None
- Follow-up to: Flowing Strike, Palm Strike
- Finisher for: Flowing River

**Notes:**
The natural follow-up to Flowing Strike. Solid damage that rewards combo play.

---

### Ripple Guard
**Stance:** Flowing
**Tier:** Light
**Unlock:** Elder Chen teaching (Chapter 1)

| Stat | Value |
|------|-------|
| Power | 8 |
| Chi Cost | 4 |
| Speed | +2 |
| Effect | Enters guard state. If hit within 1 turn, counter-attacks for 150% power |

**Mastery Progression:**
- Lv1 (0): Base ability
- Lv2 (10): Counter damage +25% (→175%)
- Lv3 (25): Chi gain on successful counter +5
- Lv4 (50): Chi cost -1 (→3)
- Lv5 (100): Counter damage +25% (→200%), grants Evasion +10% for 1 turn

**Combo Links:**
- Starter for: Counter Chain
- Follow-up to: Any technique (defensive reset)

**Notes:**
Defensive technique that punishes aggressive enemies. The faster speed means you can set it up reactively.

---

## Weathered Stance Techniques

*Weathered Stance focuses on defense, armor breaking, and endurance.*

### Weathered Palm
**Stance:** Weathered
**Tier:** Medium
**Unlock:** Elder Wu teaching (Chapter 1)

| Stat | Value |
|------|-------|
| Power | 22 |
| Chi Cost | 6 |
| Speed | -1 |
| Effect | 25% chance to apply Armor Break (3 turns, -50% DEF) |

**Mastery Progression:**
- Lv1 (0): Base ability
- Lv2 (10): Armor Break chance +10% (→35%)
- Lv3 (25): Power +3 (→25)
- Lv4 (50): Armor Break chance +15% (→50%)
- Lv5 (100): Armor Break guaranteed on crit

**Combo Links:**
- Starter for: Iron Breaker
- Follow-up to: Palm Strike, Steadfast Guard

**Notes:**
The core Weathered technique. Slower but armor breaking enables huge damage follow-ups.

---

### Iron Palm
**Stance:** Weathered
**Tier:** Heavy
**Unlock:** Elder Wu teaching (Chapter 2) or rare scroll drop

| Stat | Value |
|------|-------|
| Power | 35 |
| Chi Cost | 12 |
| Speed | -2 |
| Effect | 50% chance to apply Armor Break. If target already has Armor Break, +30% damage |

**Mastery Progression:**
- Lv1 (0): Base ability
- Lv2 (10): Power +5 (→40)
- Lv3 (25): Armor Break chance +15% (→65%)
- Lv4 (50): Bonus vs broken +10% (→+40%)
- Lv5 (100): Armor Break chance 80%, applies Stun if target already broken

**Combo Links:**
- Starter for: None (finisher move)
- Follow-up to: Weathered Palm
- Finisher for: Iron Breaker

**Notes:**
The heavy hitter of Weathered stance. Devastating against armor-broken targets. Slow but worth it.

---

### Steadfast Guard
**Stance:** Weathered
**Tier:** Light
**Unlock:** Elder Wu teaching (Chapter 1)

| Stat | Value |
|------|-------|
| Power | 0 |
| Chi Cost | 4 |
| Speed | +1 |
| Effect | Defense +75% for 2 turns. Chi gained when hit +3 |

**Mastery Progression:**
- Lv1 (0): Base ability
- Lv2 (10): Defense bonus +10% (→85%)
- Lv3 (25): Duration +1 turn (→3 turns)
- Lv4 (50): Chi cost -1 (→3)
- Lv5 (100): Defense bonus +15% (→100%), grants Armor Break immunity

**Combo Links:**
- Starter for: Defensive setup
- Follow-up to: Any (defensive reset)

**Notes:**
Pure defense. Use when expecting big hits. The chi generation when hit makes it efficient for building resources.

---

## Hungry Stance Techniques

*Hungry Stance focuses on aggression, risk-reward, and burst damage.*

### Ravenous Palm
**Stance:** Hungry
**Tier:** Light
**Unlock:** Elder Mei teaching (Chapter 2) or discovery through hunger (low HP combat)

| Stat | Value |
|------|-------|
| Power | 18 |
| Chi Cost | 4 |
| Speed | +1 |
| Effect | Chi gain +5 on hit. If this kills an enemy, restore 10% HP |

**Mastery Progression:**
- Lv1 (0): Base ability
- Lv2 (10): Power +2 (→20)
- Lv3 (25): Chi gain +2 (→+7)
- Lv4 (50): HP restore on kill +5% (→15%)
- Lv5 (100): If HP < 50%, Power +30%

**Combo Links:**
- Starter for: Hungry Chain
- Follow-up to: Palm Strike

**Notes:**
The core Hungry technique. Great chi generation and sustain if you can secure kills.

---

### Desperate Strike
**Stance:** Hungry
**Tier:** Medium
**Unlock:** Discovered automatically when fighting at low HP (< 30%)

| Stat | Value |
|------|-------|
| Power | 28 |
| Chi Cost | 8 |
| Speed | 0 |
| Effect | If user HP < 30%, Power +50% (→42). If HP < 15%, also guaranteed crit |

**Mastery Progression:**
- Lv1 (0): Base ability
- Lv2 (10): HP threshold +5% (< 35% for bonus)
- Lv3 (25): Power +4 (→32 base, →48 buffed)
- Lv4 (50): Crit threshold +5% (< 20% for crit)
- Lv5 (100): If kill occurs while buffed, restore 20% HP

**Combo Links:**
- Starter for: None
- Follow-up to: Any (emergency option)

**Notes:**
The comeback technique. Rewards risky play at low HP. Can turn losing fights around.

---

### Feral Combo
**Stance:** Hungry
**Tier:** Heavy
**Unlock:** Elder Mei teaching (Chapter 2)

| Stat | Value |
|------|-------|
| Power | 19 × 2 hits = 38 total |
| Chi Cost | 14 |
| Speed | -1 |
| Effect | Two-hit attack. Second hit has +25% crit chance |

**Mastery Progression:**
- Lv1 (0): Base ability (2 hits)
- Lv2 (10): Second hit crit +10% (→+35%)
- Lv3 (25): Each hit Power +2 (→21 × 2 = 42)
- Lv4 (50): Chi cost -2 (→12)
- Lv5 (100): Third hit added at 50% power (→21 + 21 + 10 = 52)

**Combo Links:**
- Starter for: None (self-contained combo)
- Follow-up to: Ravenous Palm

**Notes:**
Multi-hit devastation. The two hits mean two chances to crit and apply effects. Very chi-hungry but very rewarding.

---

## General Techniques (Any Stance)

*These techniques work in any stance and provide utility.*

### Beggar's Feint
**Stance:** Any
**Tier:** Light
**Unlock:** Elder Chen teaching (Chapter 1)

| Stat | Value |
|------|-------|
| Power | 10 |
| Chi Cost | 5 |
| Speed | +2 |
| Effect | Next attack within 2 turns has +30% crit chance |

**Mastery Progression:**
- Lv1 (0): Base ability
- Lv2 (10): Crit bonus +10% (→+40%)
- Lv3 (25): Power +5 (→15)
- Lv4 (50): Duration +1 turn (→3 turns)
- Lv5 (100): Also grants +15% damage on next attack

**Combo Links:**
- Starter for: Crit setup combos
- Follow-up to: Any

**Notes:**
Setup technique. The fast speed means you can set up and still act quickly. Pairs well with heavy techniques.

---

### Rising Dragon
**Stance:** Any
**Tier:** Heavy
**Unlock:** Boss drop (Chapter 1 boss) or Elder Wu teaching (Chapter 2)

| Stat | Value |
|------|-------|
| Power | 40 |
| Chi Cost | 15 |
| Speed | -2 |
| Effect | Applies Stun (1 turn). Target skips next action |

**Mastery Progression:**
- Lv1 (0): Base ability
- Lv2 (10): Power +5 (→45)
- Lv3 (25): 25% chance stun lasts 2 turns
- Lv4 (50): Chi cost -2 (→13)
- Lv5 (100): 50% chance stun lasts 2 turns, grants user Speed Up (1 turn)

**Combo Links:**
- Starter for: Stun combos (free follow-up while stunned)
- Follow-up to: Beggar's Feint (for crit chance)

**Notes:**
The big crowd control technique. Expensive but the stun enables safe follow-up damage. Crucial for hard fights.

---

### Chi Surge
**Stance:** Any
**Tier:** Medium (Utility)
**Unlock:** Meditation discovery (Training Ground, Chapter 1)

| Stat | Value |
|------|-------|
| Power | 0 |
| Chi Cost | 0 |
| Chi Gain | +25 |
| Speed | -1 |
| Effect | Gain 25 chi. Apply Attack Up (+25% damage) for 2 turns |

**Mastery Progression:**
- Lv1 (0): Base ability
- Lv2 (10): Chi gain +5 (→+30)
- Lv3 (25): Buff duration +1 turn (→3 turns)
- Lv4 (50): Also applies Speed Up (1 turn)
- Lv5 (100): Chi gain +10 (→+40), buff potency +10% (→+35%)

**Combo Links:**
- Starter for: Burst combos
- Follow-up to: Steadfast Guard (safe setup)

**Notes:**
The key resource technique. Sacrifices a turn for massive chi and a damage buff. Set up before big combos.

---

### Elder's Teaching
**Stance:** Any
**Tier:** Ultimate
**Unlock:** Complete all Elder training (Chapter 3)

| Stat | Value |
|------|-------|
| Power | 55 |
| Chi Cost | 22 |
| Speed | -3 |
| Effect | Ignores 100% of target defense. 25% chance to apply all status effects |

**Mastery Progression:**
- Lv1 (0): Base ability
- Lv2 (10): Power +5 (→60)
- Lv3 (25): Status chance +15% (→40%)
- Lv4 (50): Chi cost -3 (→19)
- Lv5 (100): Power +10 (→70), guaranteed to apply random status

**Combo Links:**
- Starter for: None (finisher)
- Follow-up to: Chi Surge (for chi), Beggar's Feint (for crit)
- Finisher for: Any combo

**Notes:**
The ultimate technique. The culmination of beggar training. Defense-ignoring damage makes it devastating against tanks.

---

### Wanderer's Path
**Stance:** Any
**Tier:** Medium (Utility)
**Unlock:** Discovery through exploration (hidden scroll, Chapter 2)

| Stat | Value |
|------|-------|
| Power | 20 |
| Chi Cost | 10 |
| Speed | 0 |
| Effect | Restore 15% Max HP. If HP > 75%, instead gain Defense Up (2 turns) |

**Mastery Progression:**
- Lv1 (0): Base ability
- Lv2 (10): Heal +5% (→20%)
- Lv3 (25): Power +5 (→25)
- Lv4 (50): Defense Up threshold -10% (→HP > 65%)
- Lv5 (100): Heal +5% (→25%), Defense Up duration +1 turn (→3)

**Combo Links:**
- Starter for: Sustain rotation
- Follow-up to: Any (recovery option)

**Notes:**
The sustain technique. Provides healing or defense based on current HP. Essential for long fights.

---

## Combo Database

### Confirmed Combo Chains

#### Flowing River (3-hit)
**Sequence:** Flowing Strike → Stream Palm → Palm Strike
**Total Chi:** 5 + 8 + 0 = 13
**Damage Multipliers:** 1.0 → 1.1 → 1.3
**Bonus:** Stream Palm gets +20% from Flowing Strike
**Notes:** The core Flowing combo. Reliable damage and chi-positive finish.

#### Iron Breaker (2-hit)
**Sequence:** Weathered Palm → Iron Palm
**Total Chi:** 6 + 12 = 18
**Damage Multipliers:** 1.0 → 1.1
**Bonus:** If Weathered Palm applies Armor Break, Iron Palm gets +30%
**Notes:** The Weathered burst combo. Devastating if armor break procs.

#### Hungry Chain (3-hit)
**Sequence:** Ravenous Palm → Desperate Strike → Feral Combo
**Total Chi:** 4 + 8 + 14 = 26
**Damage Multipliers:** 1.0 → 1.1 → 1.3
**Bonus:** High chi recovery from Ravenous Palm, burst from Feral
**Notes:** The Hungry all-in. Expensive but massive damage potential.

#### Setup Strike (2-hit)
**Sequence:** Beggar's Feint → Rising Dragon
**Total Chi:** 5 + 15 = 20
**Damage Multipliers:** 1.0 → 1.1
**Bonus:** +30% crit on Rising Dragon from Feint
**Notes:** Crit-fishing for a stun. If crit lands, enemy loses turn AND takes huge damage.

#### Surge Finisher (3-hit)
**Sequence:** Chi Surge → Beggar's Feint → Elder's Teaching
**Total Chi:** 0 + 5 + 22 = 27 (but Chi Surge gives +25, net cost 2)
**Damage Multipliers:** — → 1.1 → 1.3
**Bonus:** Attack Up from Surge, crit chance from Feint
**Notes:** The ultimate combo. Sets up perfectly for Elder's Teaching devastation.

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
