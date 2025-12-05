# The Beggars Sect: Li Wei's Ascension - Game Design Document

**Project:** The Beggars Sect (CLI RPG)
**Universe:** Martial Arts Haven
**Protagonist:** Li Wei
**Genre:** Wuxia Turn-Based RPG
**Platform:** CLI (Terminal/Command Line)
**Version:** 1.0 (MVP Scope)
**Last Updated:** 2025-12-05

---

## Executive Summary

**The Beggars Sect** is a CLI-based Wuxia RPG following Li Wei, a mysterious figure who awakens in the Martial Arts Haven with no memory. Through three chapters, players discover his true identity as "Subject 17" of the Calibration Initiative—a secret program studying those the Aptitude Array cannot measure.

**Core Experience:**
- 3-chapter story arc with cliffhanger ending
- Turn-based ATB combat (FFX-inspired)
- 3 martial stances with 15+ techniques
- AI-powered enemy variations (Claude API)
- Discovery-based progression (no grinding)

**Scope:** MVP releasing in 12 weeks. Sequel hook: Dog Beating Staff.

---

## Document Navigation

This is the **overview document**. Detailed specifications live in dedicated docs:

### Story & Lore
| Document | Location | Content |
|----------|----------|---------|
| CHAPTER_1.md | `story/` | 12 scenes, Razor boss, tutorial |
| CHAPTER_2.md | `story/` | 11 scenes, Commander Vex boss |
| CHAPTER_3.md | `story/` | 10 scenes, The Hollow One finale |
| NPC_CAST.md | `story/` | 9 NPCs with full characterization |
| WORLDBUILDING.md | `lore/` | Realm overview, multiverse context, themes |
| CHI_SYSTEM.md | `lore/` | Eight aspects, meridians, inverse chi |
| SECTS.md | `lore/` | 12 sects with martial arts inspirations |
| FACTIONS.md | `lore/` | Power groups, key characters with secrets |
| HISTORY.md | `lore/` | Full timeline from Ancient Era to Year 147 |
| MYSTERIES.md | `lore/` | Li Wei's Haven history, prophecy, secrets |
| LOCATIONS.md | `lore/` | All areas, chi effects, sect territories |
| CHARACTERS.md | `lore/` | Deep character profiles, fighting styles, arcs |
| CULTURE.md | `lore/` | Daily life, customs, slang, food, social norms |
| ARTIFACTS.md | `lore/` | Legendary weapons, formations, relics |
| GLOSSARY.md | `lore/` | Chinese terms, names, quick reference |

### Systems & Mechanics
| Document | Location | Content |
|----------|----------|---------|
| COMBAT_SYSTEM.md | `systems/` | ATB, stances, combos, chi |
| TECHNIQUES.md | `systems/` | 15 techniques with full stats |
| ENEMIES.md | `systems/` | 8 enemies + 3 bosses |
| FORMULAS.md | `reference/` | All combat math |

### Planning
| Document | Location | Content |
|----------|----------|---------|
| MVP_PLAN.md | `planning/` | 12-week roadmap |
| DESIGN_STATUS.md | `planning/` | System-by-system status |
| TODO.md | `planning/` | Task tracking |
| CHANGELOG.md | `planning/` | Development history |

---

## Vision & Core Pillars

### The Big Picture

**The Beggars Sect** is the FIRST game in the Martial Arts Haven multiverse—an ecosystem of interconnected games exploring different realms, factions, and characters.

This game establishes:
- The Martial Arts Haven universe and its laws
- The Aptitude System and its hidden flaws
- Li Wei as the Inverted One of prophecy
- The Beggars Sect and their inverse chi techniques
- The Calibration Initiative conspiracy
- Foundation for the Dog Beating Staff sequel

### Core Pillars

1. **Wuxia Epic** - Inspirational martial arts journey from nothing to legend
2. **Zero to Hero** - Li Wei's transformation from confused vagrant to the Inverted One
3. **Discover, Don't Grind** - Find skills through story and exploration, not XP farming
4. **Mystery & Revelation** - Layered truths about Li Wei's past and the world's secrets
5. **Strategic Combat** - Thoughtful turn-based battles with stance-switching depth

### Unique Selling Points

- **AI-Powered Replayability** - Claude generates unique enemy variations each playthrough
- **Original IP** - Martial Arts Haven universe with deep lore
- **Design-First Development** - 11,000+ lines of documentation before code
- **Compelling Mystery** - What is Li Wei? The answer changes everything
- **CLI Aesthetic** - Retro terminal feel with modern game design

---

## Story Overview

### The Central Mystery

Li Wei awakens in an alley with no memory, only a name and a jade pendant. Through three chapters, players uncover the truth: Li Wei is **Subject 17**, an escapee from the **Calibration Initiative**—a secret Spire program studying individuals whose chi flows "backward" through inverse meridians.

The pendant suppresses his true power. Without it, his chi devastates everything around him. He is the **Transcendent Inverse**—proof that the Aptitude System is fundamentally flawed.

### Chapter 1: The Awakening
**Boss:** Razor (Urban Thug Leader)
**Themes:** Survival, discovery, belonging

Li Wei wanders the Lower Streets, survives through desperation, and is discovered by the Beggars Sect. Under Elder Chen's guidance, he learns the Flowing Stance. Under Elder Wu, the Weathered Stance. He defeats Razor and earns his place—but his victory draws attention.

**Key Moments:**
- First memory fragment (white room, masked figures)
- Learning that "F-grade" beggars can fight
- The pendant glowing during intense moments

### Chapter 2: The Law's Shadow
**Boss:** Commander Vex (Spartan Officer)
**Themes:** Growth, memory, conspiracy

Word of Razor's defeat reaches the Spartans. Commander Vex investigates reports of "unauthorized martial activity." Li Wei trains with Elder Mei (Hungry Stance) while evading patrols. His flashbacks intensify—sterile rooms, "Subject 17," an explosion of inverse chi.

**Key Moments:**
- Full Hungry Stance mastery
- Memory of Dr. Mae helping him escape
- Vex's defeat and revelation: "The Initiative will send others"

### Chapter 3: The Hollow Truth
**Boss:** The Hollow One (Legendary Lone Wolf)
**Themes:** Identity, purpose, destiny

The Calibration Initiative sends hunters. But before they can act, The Hollow One intervenes—a legendary master who abandoned all factions seeking meaning. They test Li Wei not to capture, but to witness: is he the Inverted One of prophecy?

**Key Moments:**
- Full memory restoration (15 years of experiments)
- Learning Wanderer's Path (combines all stances)
- The Hollow One's revelation: "You are what the Array cannot measure"
- Dog Beating Staff location revealed
- Cliffhanger ending: Li Wei at the threshold of his destiny

### Sequel Hook

The game ends with Li Wei standing before the sealed cave containing the Dog Beating Staff—a weapon only someone with fully inverted chi can wield. The Hollow One's final words:

> "Train with the staff. Master your true power. And when you're ready... find me again."

**THE BEGGARS SECT: BOOK TWO - THE DOG BEATING STAFF**

---

## World Building: Martial Arts Haven

*Full lore in: WORLDBUILDING.md, CHI_SYSTEM.md, SECTS.md, HISTORY.md, LOCATIONS.md (all in `lore/`)*

### The Realm

**Martial Arts Haven** is a Realm of Convergence in the multiverse—a universe where souls with martial potential naturally spawn. Everyone here has *some* aptitude; the Aptitude System measures differences within an already-selected population.

### The Chi System

*See CHI_SYSTEM.md for full mechanics*

Chi expresses through **Eight Aspects**: Force, Flow, Precision, Burst, Armor, Sense, Will, and Inverse. Like Nen from HxH, chi is universal but individual expression varies—same technique, different practitioners create different results.

**The Inverse Secret:** Standard chi flows through primary meridians. Inverse chi flows backward through "garbage meridians" activated by desperation. The Beggars Sect has cultivated inverse techniques for 500 years.

### The Aptitude System

The **Aptitude Array** (activated Year 0 by Wei Zhong) grades individuals F through S. But it only measures *standard* meridians—anyone with inverse potential reads as F-grade. The "worthless" might be the most powerful.

### The Sects

*See SECTS.md for full details*

**12 sects** with real martial arts inspirations:
- **High Sects (Spire):** Iron Mountain (Karate), Jade Cloud (Tai Chi), Silent River (Ninjutsu), Golden Sun (Wushu), Obsidian Gate (Jiu-jitsu)
- **Lesser Sects:** Thunder Gate (Muay Thai), Crane's Rest (Wing Chun), Red Fist (Boxing), Serpent's Coil (BJJ), Celestial Kick (Taekwondo)
- **Outer Sects:** Beggars Sect (Inverse Chi), Wandering Paths (Freestyle)

### The Calibration Initiative

A secret program studying "aptitude anomalies"—F-grades who demonstrate impossible abilities. Operating for 60 years. 23 subjects. Only Li Wei (Subject 17) survived and escaped.

### Setting: Haven's Cradle

A city of concentric rings around the Measuring Spire. Wealth and worth flow downhill—from the Spire District to the Outer Ring. Beneath everything: the Undercity, where the Ancient Layer holds secrets predating recorded history.

---

## The Beggars Sect

*Full details in `lore/FACTIONS.md` and `lore/SECTS.md`*

### Core Identity

Founded Pre-R -500, the Beggars Sect is the oldest organization in the Haven—predating the Aptitude System by five centuries. They discovered inverse chi in the Ancient Layer and have preserved the secret ever since.

**Surface:** Loose network of beggars teaching survival techniques
**Truth:** Organized sect with hidden techniques, prophecy, and purpose

### Inverse Chi Philosophy

*See CHI_SYSTEM.md for full mechanics*

Standard chi flows through primary meridians. Inverse chi flows backward through "garbage meridians"—activated by desperation, hunger, and survival. The Beggars Sect's techniques channel these negative states into power.

**The Three Stances (v1.0):**

| Stance | Philosophy | Chi Aspect Focus |
|--------|------------|------------------|
| **Flowing** | Patience, adaptation | Flow + Precision |
| **Weathered** | Endurance, resilience | Armor + Will |
| **Hungry** | Desperation, aggression | Force + Burst |

### Key Figures

*Full profiles in FACTIONS.md*

| Elder | Role | Secret |
|-------|------|--------|
| **Elder Chen** | Flowing master, warm mentor | Knows Li Wei fulfills prophecy |
| **Elder Wu** | Weathered master, harsh trainer | Former Spartan who defected |
| **Elder Mei** | Hungry master, chaotic teacher | Youngest elder, radical reformist |
| **Old Dao** | Mysterious guide | Not human? Over 100 years old? |
| **Brother Feng** | Li Wei's sparring partner | Reports to Initiative (unwitting) |

---

## Protagonist: Li Wei

*Full details in `lore/MYSTERIES.md`*

### True Identity

**Subject 17** of the Calibration Initiative. Taken at age 5 after testing F-grade. Raised in underground facilities. The jade pendant was placed on him to suppress his anomalous chi.

At age 19, during a test where they removed the pendant, Li Wei's inverse chi exploded outward. He escaped with Dr. Mae's help. The trauma fragmented his memory.

### The Transcendent Inverse

Li Wei isn't F-grade. He's not any grade. His standard meridians aren't just closed—they're *inverted*. Chi flows backward through his entire system.

This makes him:
- Unmeasurable by the Array
- Capable of techniques that violate martial logic
- Potentially more powerful than any S-grade
- A living disproof of the Aptitude System

### Character Arc

**Chapter 1:** Confused vagrant → Accepted beggar → Palm student
**Chapter 2:** Student → Warrior → Memory fragments emerging
**Chapter 3:** Warrior → Inverted One → Master of his destiny

### The Jade Pendant

**What it appears:** Simple jade disc with twisted spiral symbol
**What it is:** Calibration Initiative identifier that suppresses Li Wei's chi

The pendant kept him hidden from Spire tracking. It also kept him alive—without suppression, his inverse chi is overwhelming. As he grows stronger, the pendant's suppression matters less.

---

## Combat System

*Full details in `systems/COMBAT_SYSTEM.md` and `reference/FORMULAS.md`*

### Core Design: ATB Turn-Based

**Inspiration:** Final Fantasy X's visible turn queue
**Why:** Strategic depth, CLI-friendly, allows complex mechanics

**Turn Structure:**
1. Turn order displayed (Speed determines frequency)
2. Player chooses action
3. Action resolves with animations
4. Next turn begins
5. Victory when all enemies defeated

### Actions

| Action | Effect | Chi |
|--------|--------|-----|
| **Attack** | Basic palm strike (12 power) | +3 |
| **Technique** | Special moves with effects | Varies |
| **Defend** | 50% damage reduction | +5 |
| **Chi Focus** | Meditate for chi recovery | +25 |
| **Stance** | Switch between 3 stances | -5 |
| **Item** | Use consumables | 0 |
| **Flee** | Escape attempt | 0 |

### Damage Formula

```
Raw = Technique Power × (1 + STR / 20)
Modified = Raw × Crit × Stance × Combo × Mastery
Reduced = Modified - (Enemy Defense × 2)
Final = Reduced × random(0.9, 1.1), minimum 1
```

### Stance System

Switch stances mid-combat for tactical advantage:

- **Flowing:** Balanced damage, combo-focused, +chi generation
- **Weathered:** Reduced damage, increased defense, armor-breaking
- **Hungry:** Increased damage, reduced defense, chi-hungry

### Combo System

Chain techniques within 2 turns for bonus damage:
- **Starter → Follow-up:** +10% damage
- **Starter → Follow-up → Finisher:** +30% damage

### Techniques (15 for v1.0)

*Full stats in `systems/TECHNIQUES.md`*

**Universal:** Palm Strike, Beggar's Feint, Rising Dragon, Chi Surge, Elder's Teaching, Wanderer's Path
**Flowing:** Flowing Strike, Stream Palm, Ripple Guard
**Weathered:** Weathered Palm, Iron Palm, Steadfast Guard
**Hungry:** Ravenous Palm, Desperate Strike, Feral Combo

---

## Progression System

*Full details in `systems/COMBAT_SYSTEM.md`*

### Philosophy: Discover, Don't Grind

**No XP bars.** No level numbers. Progression feels organic:

- **Technique Mastery:** Use moves to improve them (5 levels)
- **Stat Growth:** Stats increase through relevant actions
- **Story Progression:** New techniques unlocked through narrative
- **Discovery:** Hidden techniques in exploration

### Mastery Levels

| Level | Uses | Bonus |
|-------|------|-------|
| 1 | 0 | Base technique |
| 2 | 10 | Power +2, minor effect |
| 3 | 25 | Power +4, enhanced effect |
| 4 | 50 | Power +6, combo expansion |
| 5 | 100 | Power +8, ultimate form |

### Starting Stats (Li Wei)

| Stat | Base | Effect |
|------|------|--------|
| STR | 10 | Physical damage |
| DEX | 10 | Speed, crit chance |
| END | 10 | HP (100 base) |
| WIS | 10 | Chi capacity (60 base) |
| APT | 15 | Hidden, affects growth |

---

## Enemies & Bosses

*Full stats in `systems/ENEMIES.md`*

### Factions

**Urban Thugs** - Street-level brawlers (Chapter 1-2)
- Street Punk, Alley Brawler, Scarred Enforcer, Gang Lieutenant
- Boss: **Razor** (200 HP, 3 phases)

**Hypermodern Spartans** - Disciplined authority (Chapter 2-3)
- Spartan Recruit, Spartan Warrior
- Boss: **Commander Vex** (300 HP, 3 phases)

**Lone Wolves** - Independent masters (Chapter 2-3)
- Wandering Fighter, Silent Master
- Boss: **The Hollow One** (400 HP, 3 phases)

### AI Variation (Claude)

Each enemy has base stats and a variation template. Claude generates unique instances:
- Stat variance (±10%)
- Unique names and dialogue
- Personality traits
- Tactical adjustments

No two playthroughs are identical.

---

## Technical Approach

### Tech Stack

- **Node.js** (>=18.0.0)
- **TypeScript** 5.3.3
- **React** 18.2.0 (via Ink for CLI)
- **Ink** 4.4.1 (terminal UI framework)
- **Claude API** (procedural content)

### Key Libraries

- `chalk` - Terminal colors
- `boxen` - Borders and boxes
- `figlet` - ASCII art titles
- `ink-text-input` - User input
- `ink-select-input` - Menu selection

### Project Structure

```
/the-beggars-sect
├── docs/
│   ├── design/      # Vision docs
│   ├── systems/     # Mechanics specs
│   ├── story/       # Chapter scripts
│   ├── lore/        # Worldbuilding
│   ├── reference/   # Formulas, guides
│   └── planning/    # Roadmap, status
├── src/
│   ├── game/        # Core logic
│   ├── ui/          # Ink components
│   ├── data/        # Game content
│   ├── automation/  # Claude integration
│   └── utils/       # Helpers
├── package.json
└── README.md
```

---

## Development Roadmap

*Full details in `planning/MVP_PLAN.md`*

### 12-Week Timeline

| Phase | Weeks | Focus |
|-------|-------|-------|
| **Design** | 1-2 | Documentation (COMPLETE) |
| **Core Systems** | 3-4 | Combat, stats, UI framework |
| **Chapter 1** | 5-6 | Story, enemies, tutorial |
| **AI Integration** | 7-8 | Claude API, enemy variation |
| **Chapters 2-3** | 9-10 | Full story implementation |
| **Polish & Launch** | 11-12 | Balance, testing, release |

### Current Status

**Phase 1: Design - COMPLETE**

12 documents elaborated:
- All 3 chapters scripted
- 15 techniques with full stats
- 11 enemies with AI patterns
- 9 NPCs with characterization
- Complete combat formulas
- Full worldbuilding and lore

**Next:** Phase 2 - Core Systems Implementation

---

## Scope Boundaries (v1.0 MVP)

### Included

- 3 chapters with full story
- 3 stances (Flowing, Weathered, Hungry)
- 15+ techniques
- 11 enemy types + 3 bosses
- Claude-powered enemy variation
- Turn-based ATB combat
- Mastery progression
- Save/load system

### Deferred to v1.5+

- 4th stance (Deceptive)
- Environmental combat
- Chapters 4-5
- Staff techniques
- Web version

### Sequel (Book 2)

- Dog Beating Staff mastery
- Return to the Spire
- Other test subjects rescue
- Full Inverted One powers
- The Hollow One rematch

---

## The Core Question

**"If your worth was never what they measured, who decides what you're worth?"**

Li Wei's journey answers: **You do.** Through choices, actions, and philosophy. Not aptitude—will.

The Beggars Sect teaches that the "worthless" can become the most powerful. The Dog Beating Staff can only be held by someone the system rejected. Li Wei is proof that the hierarchy is a lie.

From nothing, to legend.

---

**Document Version:** 2.0 (MVP Scope)
**Last Updated:** 2025-12-05
**Status:** Design complete, ready for implementation

*This document provides overview and navigation. See linked documents for detailed specifications.*

---

## Lore Document Summary

The lore documentation (11 documents, 10,000+ lines) now includes:

| Document | Lines | Content |
|----------|-------|---------|
| WORLDBUILDING.md | ~500 | Realm context, multiverse, themes |
| CHI_SYSTEM.md | ~590 | Eight aspects, meridians, inverse chi |
| SECTS.md | ~1,060 | 12 sects with martial arts inspirations |
| FACTIONS.md | ~760 | Power groups, organizational structure |
| HISTORY.md | ~450 | Full timeline Ancient Era to Year 147 |
| MYSTERIES.md | ~530 | Li Wei's history, prophecy, revelations |
| LOCATIONS.md | ~1,630 | All areas, chi effects, sect territories |
| CHARACTERS.md | ~1,650 | Deep character profiles, fighting styles, arcs |
| CULTURE.md | ~1,100 | Daily life, customs, food, slang, social norms |
| ARTIFACTS.md | ~850 | Legendary weapons, formations, relics |
| GLOSSARY.md | ~750 | Chinese terms, names, quick reference |

**Key Lore Decisions:**
- Li Wei's cosmic origin (why he spawned) will NEVER be revealed
- Focus is on his story WITHIN the Martial Arts Haven
- Chi system inspired by Nen (universal, individual expression)
- 12 sects with real martial arts inspirations
- Deep history spanning 500+ years
