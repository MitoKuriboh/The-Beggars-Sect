# The Beggars Sect - Design Status & System Breakdown

**Last Updated:** 2025-12-05
**Current Phase:** DESIGN (Phase 1 of 6)
**Status:** Scaffolding complete, detailed elaboration needed

---

## Overview

This document tracks the design status of every system and aspect of The Beggars Sect.

**Legend:**
- `[SCAFFOLDED]` - Concept exists, needs detailed specs/numbers/content
- `[ELABORATED]` - Fully designed, ready for implementation
- `[NOT STARTED]` - No design work done yet
- `[TBD]` - Specific value needs deciding

**Current Reality:** Almost everything is SCAFFOLDED. The existing docs establish concepts and vision but lack the specific details needed for implementation.

---

## Document Status Overview

| Document | Location | Status | Priority |
|----------|----------|--------|----------|
| GAME_DESIGN.md | `design/` | SCAFFOLDED | Reference |
| COMBAT_SYSTEM.md | `systems/` | SCAFFOLDED | P1 |
| **TECHNIQUES.md** | `systems/` | **ELABORATED** | P1 |
| **ENEMIES.md** | `systems/` | **ELABORATED** | P1 |
| **CHAPTER_1.md** | `story/` | **ELABORATED** | P1 |
| **CHAPTER_2.md** | `story/` | **ELABORATED** | P1 |
| **CHAPTER_3.md** | `story/` | **ELABORATED** | P1 |
| **NPC_CAST.md** | `story/` | **ELABORATED** | P2 |
| **FORMULAS.md** | `reference/` | **ELABORATED** | P1 |
| WORLDBUILDING.md | `lore/` | **ELABORATED** | P2 |
| LOCATIONS.md | `lore/` | **ELABORATED** | P2 |
| FACTIONS.md | `lore/` | **ELABORATED** | P2 |
| MYSTERIES.md | `lore/` | **ELABORATED** | P2 |
| ITEMS.md | `systems/` | NOT STARTED | P3 |
| BALANCE.md | `systems/` | NOT STARTED | P3 |
| UI_MOCKUPS.md | `design/` | NOT STARTED | P3 |

### Progress Summary (2025-12-05)
**12 documents now ELABORATED and ready for implementation:**
- `FORMULAS.md` - All combat math, stats, progression formulas finalized
- `TECHNIQUES.md` - 15 techniques with full stats, mastery, combos
- `ENEMIES.md` - 8 enemies + 3 bosses with stats, AI, dialogue
- `NPC_CAST.md` - 9 NPCs with personalities, dialogue, relationships
- `CHAPTER_1.md` - Complete 12-scene chapter with dialogue and encounters
- `CHAPTER_2.md` - Complete 11-scene chapter with Commander Vex boss
- `CHAPTER_3.md` - Complete 10-scene chapter with The Hollow One finale
- `WORLDBUILDING.md` - Universe bible, aptitude system, Haven's Cradle
- `LOCATIONS.md` - All areas with history and secrets
- `FACTIONS.md` - Detailed faction histories
- `MYSTERIES.md` - Li Wei's origin, Calibration Initiative, prophecies

---

## SYSTEMS BREAKDOWN

---

### 1. COMBAT SYSTEM

#### 1.1 Turn Order / ATB System
**Status:** `[SCAFFOLDED]`

**What exists:**
- Concept: FFX-style visible turn queue
- Speed stat determines turn frequency
- Players see 5-7 upcoming turns

**Needs elaboration:**
- [ ] Exact speed-to-turn formula
- [ ] How turn delay works per action
- [ ] Initiative calculation at combat start
- [ ] Multi-enemy turn ordering rules
- [ ] Speed buff/debuff impact on queue

---

#### 1.2 Actions (Attack, Defend, Chi Focus, Item, Flee)
**Status:** `[SCAFFOLDED]`

**What exists:**
- 7 action types defined conceptually
- Basic descriptions of each action
- General strategic purpose

**Needs elaboration:**
- [ ] Attack: Exact damage formula finalized
- [ ] Defend: Duration, stacking rules, counter window
- [ ] Chi Focus: Interrupt vulnerability, animation time
- [ ] Item: Turn cost, inventory limits
- [ ] Flee: Per-enemy-type success modifiers
- [ ] Action priority/interrupts

---

#### 1.3 Damage Calculation
**Status:** `[SCAFFOLDED]`

**What exists:**
- Draft formula: `(Technique Power × (Strength/10)) - Defense`
- Modifier list (crit, stance, combo, mastery)
- Random variance concept (0.9-1.1)

**Needs elaboration:**
- [ ] Finalize base damage formula
- [ ] Exact modifier stacking order
- [ ] Minimum damage floor
- [ ] Overkill handling
- [ ] Damage type system (if any)
- [ ] Resistance/weakness system

---

#### 1.4 Stance System
**Status:** `[SCAFFOLDED]`

**What exists:**
- 4 stances defined: Flowing, Weathered, Hungry, Deceptive
- Stat modifier percentages for each
- Unique technique concepts per stance
- Chi cost to switch (5-10)

**Needs elaboration:**
- [ ] Stance unlock progression (when does player get each?)
- [ ] Stance mastery system (do stances level up?)
- [ ] Exact stance switch timing (instant? end of turn?)
- [ ] Stance-locked techniques: full list with stats
- [ ] Deceptive stance unlock requirements finalized
- [ ] Stance switching cooldown (if any)

---

#### 1.5 Combo System
**Status:** `[SCAFFOLDED]`

**What exists:**
- Concept: Starter → Follow-up → Finisher structure
- Damage bonus scaling (+0% → +10% → +30%)
- 6 example combos named
- Discovery methods listed

**Needs elaboration:**
- [ ] Complete combo list (all valid chains)
- [ ] Timing window mechanics (within 2 turns - exact?)
- [ ] Combo break conditions
- [ ] Chi refund amounts per combo
- [ ] Combo discovery triggers
- [ ] Hidden/secret combo list
- [ ] Combo UI feedback design

---

#### 1.6 Chi Management
**Status:** `[SCAFFOLDED]`

**What exists:**
- Generation table (attack +2, defend +5/+8, etc.)
- Cost tiers (0 to 20 chi)
- Stance modifiers on generation
- Strategic play patterns described

**Needs elaboration:**
- [ ] Starting chi amount
- [ ] Chi cap formula finalized
- [ ] Chi decay/retention between fights
- [ ] Negative chi handling (can you go negative?)
- [ ] Chi overflow mechanics
- [ ] Chi visual feedback (bar segments?)

---

#### 1.7 Status Effects
**Status:** `[SCAFFOLDED]`

**What exists:**
- Mentions: stun, stagger, guard break
- Concept of buffs/debuffs

**Needs elaboration:**
- [ ] Complete status effect list
- [ ] Duration per effect
- [ ] Stacking rules (can you double-stun?)
- [ ] Cleanse mechanics
- [ ] Resistance mechanics
- [ ] Visual indicators per status

---

#### 1.8 Environmental Combat
**Status:** `[SCAFFOLDED]`

**What exists:**
- Arena element concepts (wall, exit, stall, rooftop)
- Environmental action examples
- Beggar advantage concept (-50% chi cost)

**Needs elaboration:**
- [ ] Which fights have environments?
- [ ] Environment element spawn rules
- [ ] Complete environmental action list with stats
- [ ] Environment-exclusive techniques
- [ ] Arena generation/selection logic
- [ ] Environmental hazards (if any)

---

#### 1.9 Enemy AI
**Status:** `[SCAFFOLDED]`

**What exists:**
- 3 AI tiers: Basic (Thug), Advanced (Spartan), Master (Lone Wolf)
- Priority list examples
- Concept of pattern learning

**Needs elaboration:**
- [ ] AI decision tree per enemy type
- [ ] Pattern recognition specifics
- [ ] Difficulty scaling parameters
- [ ] Boss phase transition logic
- [ ] AI reaction to player stance
- [ ] AI combo usage rules

---

### 2. PROGRESSION SYSTEM

#### 2.1 Stats
**Status:** `[SCAFFOLDED]`

**What exists:**
- 5 primary stats: STR, DEX, END, APT (hidden), CHI/WIS
- Secondary stat derivations
- Growth concept (use-based)

**Needs elaboration:**
- [ ] Starting stat values for Li Wei
- [ ] Stat caps (if any)
- [ ] Exact growth rates per action type
- [ ] Stat point distribution (automatic? player choice?)
- [ ] Stat display formatting
- [ ] Hidden aptitude reveal mechanics

---

#### 2.2 Mastery System
**Status:** `[SCAFFOLDED]`

**What exists:**
- Concept: Use technique → gain mastery
- 5-star visual indicator (★★★☆☆)
- Mastery unlocks stronger effects

**Needs elaboration:**
- [ ] Uses required per mastery level
- [ ] Mastery bonus per level
- [ ] Mastery decay (if any)
- [ ] Mastery transfer between similar techniques
- [ ] Mastery UI display
- [ ] Mastery milestones and unlocks

---

#### 2.3 Technique Discovery
**Status:** `[SCAFFOLDED]`

**What exists:**
- 5 discovery methods listed
- Concept of no level-gating

**Needs elaboration:**
- [ ] Technique availability per chapter
- [ ] Elder teaching requirements
- [ ] Scroll locations mapped
- [ ] Drop rates from enemies
- [ ] Quest reward techniques
- [ ] Discovery notification system

---

#### 2.4 Cultivation System
**Status:** `[SCAFFOLDED]`

**What exists:**
- 4 cultivation paths named
- Meditation/training concept

**Needs elaboration:**
- [ ] Cultivation mechanics (time-based? action-based?)
- [ ] Cultivation milestones
- [ ] Path bonuses
- [ ] Multi-path penalties/bonuses
- [ ] Cultivation UI
- [ ] Cultivation gating (story requirements?)

---

### 3. TECHNIQUE DATABASE

#### 3.1 Palm Techniques
**Status:** `[SCAFFOLDED]`

**What exists:**
- ~15 technique names mentioned across docs
- General categories (basic, advanced, defensive, chi, ultimate)
- Example stats for a few

**Needs elaboration:**
- [ ] Complete technique list (target: 25-40 techniques)
- [ ] Stats per technique (power, chi cost, speed, effects)
- [ ] Mastery progression per technique
- [ ] Technique descriptions/flavor text
- [ ] Unlock conditions per technique
- [ ] Stance restrictions per technique

---

#### 3.2 Staff Techniques
**Status:** `[NOT STARTED]`

**What exists:**
- "Dog Beating Staff" mentioned as endgame unlock
- Cliffhanger setup for sequel

**Needs elaboration:**
- [ ] Decide: Any staff techniques in v1.0?
- [ ] Staff technique teaser (if any)
- [ ] Threshold requirements to unlock staff

---

### 4. ENEMY SYSTEM

#### 4.1 Enemy Types
**Status:** `[SCAFFOLDED]`

**What exists:**
- 3 factions: Urban Thugs, Spartans, Lone Wolves
- General combat style descriptions
- AI tier assignments

**Needs elaboration:**
- [ ] Complete enemy roster (5-7 thug types, 2-3 spartans, 3-5 lone wolves)
- [ ] Stats per enemy type
- [ ] Technique lists per enemy
- [ ] Drop tables per enemy
- [ ] Spawn locations per enemy
- [ ] Enemy dialogue lines

---

#### 4.2 Bosses
**Status:** `[SCAFFOLDED]`

**What exists:**
- Elder Test boss concept with 3 phases
- Multi-phase mechanics mentioned
- Adaptive AI concept

**Needs elaboration:**
- [ ] Boss list (1 per chapter = 3 bosses for MVP)
- [ ] Boss stats and phases
- [ ] Boss-exclusive abilities
- [ ] Boss dialogue scripts
- [ ] Boss rewards
- [ ] Boss arena design

---

#### 4.3 AI Procedural Variation (Claude)
**Status:** `[SCAFFOLDED]`

**What exists:**
- Template → Claude enhancement concept
- Example JSON structure
- Variation parameters listed

**Needs elaboration:**
- [ ] Base templates per enemy type
- [ ] Claude prompt engineering
- [ ] Variation bounds (min/max stats)
- [ ] When to generate (every fight? cached?)
- [ ] Fallback if API fails
- [ ] Cost management strategy

---

### 5. WORLD & NAVIGATION

#### 5.1 World Map
**Status:** `[SCAFFOLDED]`

**What exists:**
- Urban District concept
- 5 area types named (Streets, Alleyways, Beggar's Corner, Market, Training Ground)
- Navigation command concepts

**Needs elaboration:**
- [ ] Complete area list for MVP (Chapters 1-3)
- [ ] Area connections/routes
- [ ] Area descriptions
- [ ] Area-specific encounters
- [ ] Hidden area unlock conditions
- [ ] Travel time/cost (if any)

---

#### 5.2 Navigation System
**Status:** `[SCAFFOLDED]`

**What exists:**
- Command concepts: explore, travel, search, rest

**Needs elaboration:**
- [ ] Full command list
- [ ] Command syntax
- [ ] Navigation UI mockup
- [ ] Random encounter rates per area
- [ ] Time/rest mechanics
- [ ] Fast travel (if any)

---

### 6. STORY & NARRATIVE

#### 6.1 Main Story Arc
**Status:** `[SCAFFOLDED]`

**What exists:**
- 3 Acts defined (Awakening, Training, Threshold)
- Chapter 1-5 summaries (reduced to 1-3 for MVP)
- Cliffhanger ending concept

**Needs elaboration:**
- [ ] Chapter 1 detailed script/beats
- [ ] Chapter 2 detailed script/beats
- [ ] Chapter 3 detailed script/beats
- [ ] Key cutscene scripts
- [ ] Story choice points (if any)
- [ ] Ending variations (if any)

---

#### 6.2 Li Wei Character
**Status:** `[SCAFFOLDED]`

**What exists:**
- Origin mystery
- Personality traits listed
- Character arc summary
- Hidden potential concept

**Needs elaboration:**
- [ ] Li Wei's voice/dialogue style guide
- [ ] Backstory reveal timing
- [ ] Aptitude breadcrumb placement
- [ ] Emotional beats per chapter
- [ ] Player agency in personality

---

#### 6.3 NPC Cast
**Status:** `[NOT STARTED]`

**What exists:**
- Categories mentioned (elders, thugs, spartans, lone wolves)
- Master/student dynamic concept

**Needs elaboration:**
- [ ] Elder roster (3-5 with personalities, techniques, dialogue)
- [ ] Tutorial NPC design
- [ ] Thug named characters
- [ ] Spartan named characters
- [ ] Lone wolf characters
- [ ] NPC relationship system (if any)

---

#### 6.4 Dialogue System
**Status:** `[NOT STARTED]`

**What exists:**
- AI-generated dialogue concept

**Needs elaboration:**
- [ ] Dialogue tree structure
- [ ] Player response options
- [ ] Dialogue triggers
- [ ] NPC memory (do they remember past conversations?)
- [ ] Dialogue UI mockup

---

### 7. WORLDBUILDING

#### 7.1 Martial Arts Haven Universe
**Status:** `[SCAFFOLDED]`

**What exists:**
- Aptitude system concept
- Universal redistribution concept
- Urban + Ancient aesthetic
- Faction overview

**Needs elaboration:**
- [ ] Aptitude system mechanics (how exactly does it work?)
- [ ] Universe rules document
- [ ] Geography/districts detailed
- [ ] History/lore timeline
- [ ] Cultural norms
- [ ] Technology rules (why no guns?)

---

#### 7.2 The Beggars Sect
**Status:** `[SCAFFOLDED]`

**What exists:**
- Core identity (mysterious, einzelgänger)
- Aesthetic description
- Loose hierarchy concept
- Reputation concept

**Needs elaboration:**
- [ ] Sect history
- [ ] Sect philosophy detailed
- [ ] Rank system finalized
- [ ] Elder council (if any)
- [ ] Sect locations
- [ ] Sect secrets/mysteries

---

#### 7.3 Factions
**Status:** `[SCAFFOLDED]`

**What exists:**
- 4 factions: Beggars, Thugs, Spartans, Lone Wolves
- Basic identities and combat styles

**Needs elaboration:**
- [ ] Faction relationships/conflicts
- [ ] Faction territories
- [ ] Faction reputation system mechanics
- [ ] Faction-exclusive content
- [ ] Faction endings (if any)

---

### 8. UI/UX SYSTEM

#### 8.1 Combat UI
**Status:** `[SCAFFOLDED]`

**What exists:**
- ASCII mockup of combat screen
- HP/Chi bar concepts
- Action menu layout

**Needs elaboration:**
- [ ] Finalize combat screen layout
- [ ] Turn order display design
- [ ] Technique menu design
- [ ] Combo indicator design
- [ ] Status effect icons
- [ ] Animation/transition specs

---

#### 8.2 Navigation UI
**Status:** `[NOT STARTED]`

**Needs elaboration:**
- [ ] Main menu design
- [ ] Area selection screen
- [ ] Map display (if any)
- [ ] Prompt/command input design

---

#### 8.3 Character/Inventory UI
**Status:** `[NOT STARTED]`

**Needs elaboration:**
- [ ] Character sheet layout
- [ ] Stats display
- [ ] Technique list display
- [ ] Inventory screen
- [ ] Equipment screen (if any)

---

#### 8.4 ASCII Art
**Status:** `[SCAFFOLDED]`

**What exists:**
- 3 example technique animations
- Title concept mentioned

**Needs elaboration:**
- [ ] Title screen ASCII
- [ ] Key moment art list
- [ ] Technique animation specs
- [ ] Boss art
- [ ] NPC portraits (if any)

---

### 9. TECHNICAL SYSTEMS

#### 9.1 Save/Load
**Status:** `[SCAFFOLDED]`

**What exists:**
- JSON format decided
- Data to save listed

**Needs elaboration:**
- [ ] Save file schema
- [ ] Save slot system
- [ ] Auto-save triggers
- [ ] Save corruption handling
- [ ] Save versioning (for updates)

---

#### 9.2 Game State Management
**Status:** `[NOT STARTED]`

**Needs elaboration:**
- [ ] State machine design
- [ ] Screen transitions
- [ ] Game loop architecture
- [ ] Event system

---

### 10. AI/AUTOMATION INTEGRATION

#### 10.1 Claude API Integration
**Status:** `[SCAFFOLDED]`

**What exists:**
- Use cases listed (enemy variation, dialogue, quests, descriptions)
- Example prompt/response

**Needs elaboration:**
- [ ] Prompt templates per use case
- [ ] Response parsing logic
- [ ] Rate limiting strategy
- [ ] Cost estimation
- [ ] Fallback content
- [ ] Caching strategy

---

#### 10.2 Dynamic Difficulty
**Status:** `[SCAFFOLDED]`

**What exists:**
- Metrics to track listed
- Adjustment concepts

**Needs elaboration:**
- [ ] Difficulty algorithm
- [ ] Adjustment bounds
- [ ] Player opt-out option
- [ ] Difficulty transparency (hidden vs visible)

---

#### 10.3 n8n Integration
**Status:** `[DEFERRED TO v1.5]`

Per Session 7 scoping, n8n is for feedback system only, not in-game.

---

### 11. ITEMS & EQUIPMENT

#### 11.1 Consumables
**Status:** `[SCAFFOLDED]`

**What exists:**
- 9 item types listed with effects
- Rarity tiers implied

**Needs elaboration:**
- [ ] Complete item list
- [ ] Item stats finalized
- [ ] Drop rates
- [ ] Shop prices (if shops exist)
- [ ] Inventory limits
- [ ] Item stacking rules

---

#### 11.2 Equipment
**Status:** `[SCAFFOLDED]`

**What exists:**
- "Minimal equipment focus" philosophy
- Staff mentioned as late-game

**Needs elaboration:**
- [ ] Decide: Any equipment in v1.0?
- [ ] If yes: Equipment list and stats
- [ ] Equipment slots
- [ ] Equipment acquisition

---

### 12. BALANCE & TUNING

**Status:** `[NOT STARTED]`

**Needs elaboration:**
- [ ] Player power curve per chapter
- [ ] Enemy stat scaling
- [ ] Chi economy balance
- [ ] Technique cost/power ratios
- [ ] Fight length targets
- [ ] Difficulty tuning parameters
- [ ] Balance testing checklist

---

## DOCUMENTS NEEDED

Based on this breakdown, these design documents should be created:

### Priority 1 (Block implementation)
1. `TECHNIQUES.md` - Complete technique database with all stats
2. `ENEMIES.md` - Enemy roster with stats, AI, drops
3. `CHAPTER_1.md` - Detailed Chapter 1 story beats and encounters

### Priority 2 (Needed for content)
4. `CHAPTER_2.md` - Chapter 2 design
5. `CHAPTER_3.md` - Chapter 3 design
6. `NPC_CAST.md` - All NPCs with personalities and dialogue
7. `WORLDBUILDING.md` - Universe rules and lore

### Priority 3 (Polish)
8. `UI_MOCKUPS.md` - All screen designs
9. `BALANCE.md` - Tuning parameters and formulas
10. `ITEMS.md` - Complete item database

---

## SUMMARY

| Category | Systems | Scaffolded | Elaborated | Not Started |
|----------|---------|------------|------------|-------------|
| Combat | 9 | 9 | 0 | 0 |
| Progression | 4 | 4 | 0 | 0 |
| Techniques | 2 | 1 | 0 | 1 |
| Enemies | 3 | 3 | 0 | 0 |
| World | 2 | 2 | 0 | 0 |
| Story | 4 | 2 | 0 | 2 |
| Worldbuilding | 3 | 3 | 0 | 0 |
| UI/UX | 4 | 2 | 0 | 2 |
| Technical | 2 | 1 | 0 | 1 |
| AI/Automation | 3 | 2 | 0 | 1 |
| Items | 2 | 2 | 0 | 0 |
| Balance | 1 | 0 | 0 | 1 |
| **TOTAL** | **39** | **31** | **0** | **8** |

**Bottom Line:**
- 31 systems are SCAFFOLDED (concept exists, needs numbers/details)
- 0 systems are ELABORATED (ready for implementation)
- 8 systems are NOT STARTED

**We are firmly in DESIGN PHASE. No system is ready for implementation.**

---

## NEXT STEPS

To move from Design to Implementation, we need to:

1. **Pick a system to elaborate first** (recommend: Combat core + Techniques)
2. **Create detailed specs with actual numbers**
3. **Build spreadsheets for balance** (technique stats, enemy stats)
4. **Write Chapter 1 script** (exact dialogue, encounters, progression)

Only then should we touch code.

---

**This document should be updated as systems move from SCAFFOLDED → ELABORATED.**
