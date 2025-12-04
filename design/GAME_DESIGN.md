# The Beggars Sect: Li Wei's Ascension - Game Design Document

**Project:** The Beggars Sect (CLI RPG)
**Universe:** Martial Arts Haven
**Protagonist:** Li Wei
**Genre:** Wuxia Turn-Based RPG
**Platform:** CLI (Terminal/Command Line)
**Created:** 2024-12-04

---

## Table of Contents

1. [Vision & Concept](#vision--concept)
2. [Story Overview](#story-overview)
3. [World Building: Martial Arts Haven](#world-building-martial-arts-haven)
4. [The Beggars Sect](#the-beggars-sect)
5. [Protagonist: Li Wei](#protagonist-li-wei)
6. [Factions & Groups](#factions--groups)
7. [Combat System](#combat-system)
8. [Progression System](#progression-system)
9. [Game Structure](#game-structure)
10. [Unique Mechanics (Brainstorm)](#unique-mechanics-brainstorm)
11. [Technical Approach](#technical-approach)
12. [Automation Integration](#automation-integration)
13. [Development Phases](#development-phases)

---

## Vision & Concept

### The Big Picture

**The Beggars Sect** is the FIRST game in the Martial Arts Haven multiverse - an ecosystem of interconnected games set in different realms with different teams and characters.

This game establishes:
- The Martial Arts Haven universe
- The aptitude system and universal laws
- Li Wei as the first protagonist
- The Beggars Sect as one of many factions
- The foundation for future games

### Core Pillars

1. **Wuxia Epic** - Inspirational martial arts journey
2. **Zero to Hero** - Li Wei's transformation from nobody to legend
3. **Discover, Don't Level** - Find skills through exploration, not grinding
4. **Mystery & Atmosphere** - Vague, enigmatic Beggars Sect
5. **Urban + Ancient** - Chinese beggar aesthetic in modern/futuristic city

### Unique Selling Points

- **AI-powered content generation** - Unique experiences each playthrough
- **Automation-enhanced gameplay** - Living world via n8n workflows
- **Original IP** - Martial Arts Haven universe
- **Turn-based mastery** - Strategic combat (FFX/Pokemon/Digimon inspired)
- **Cultivation progression** - Age of Wushu inspired growth system
- **Skill discovery** - King of Kings 3 style exploration rewards

---

## Story Overview

### Act 1: The Awakening

**Opening:**
Li Wei suddenly spawns/teleports into the Martial Arts Haven. He has no idea what's happening, where he is, or why he's here. Confusion. Fear. Disorientation.

**Early Wandering:**
- Li Wei gives up trying to understand
- Begins wandering the urban landscape
- Survival becomes priority
- Story unfolds through environmental storytelling and encounters
- Gradually mirrors beggar lifestyle (out of necessity? circumstance?)

**Discovery:**
- Encounters the Beggars Sect (or they notice him?)
- Both sides realize he fits better with them than anywhere else
- Acceptance - he becomes one of them

### Act 2: The Training

**Foundation:**
- Li Wei can't fight at all initially
- Begins learning through observation, trial, error
- Masters basic palm techniques
- Discovers vast array of different palm styles within Beggars Sect
- Each elder/master has unique techniques
- Progression through discovery and mastery

**Growth:**
- Faces urban thugs, rival factions
- Tests skills in real combat
- Builds reputation (carefully - beggars stay mysterious)
- Deepens understanding of Martial Arts Haven
- Uncovers hints about aptitude system

### Act 3: The Threshold (Cliffhanger)

**The Staff:**
- Li Wei reaches a threshold in his palm mastery
- Earns/discovers the right to learn staff techniques
- Introduction to the legendary Dog Beating Staff art

**Cliffhanger Ending:**
- Li Wei decides to leave the main Beggars Sect
- Quest: Wander throughout Martial Arts Haven
- Goals:
  1. Find hidden Dog Beating Staff art variations
  2. Perfect the various palm styles he's learned
  3. Discover the deeper mysteries of this world

**Setup for Sequel:**
This ending opens up:
- Exploration of entire Martial Arts Haven
- Encounters with many factions
- Deeper lore revelations
- Li Wei's full potential

---

## World Building: Martial Arts Haven

### Universal Laws

**The Aptitude System:**
- Some individuals are born with aptitude for combat/martial arts
- The universe itself recognizes this aptitude
- **Universal Redistribution:** If a child is born with low aptitude, the universe spawns them in a different reality/universe
- Result: Martial Arts Haven contains ONLY those with aptitude
- However: Aptitude levels vary widely (not everyone is a chad)

**Implications:**
- Everyone here CAN fight, but mastery varies
- Families can lose children to other universes
- Creates unique culture and acceptance
- Aptitude is destiny... or is it? (Li Wei's hidden potential)

### Setting: Urban Meets Ancient

**Aesthetic:**
- Massive urban landscape
- Mix of futuristic, modern, and ancient architecture
- No modern weapons (universal law? cultural choice?)
- Technology exists but combat is purely martial arts
- Traditional martial artists in cyberpunk-esque cities

**Geography:** (To be expanded)
- Urban districts (where game takes place)
- Ancient temple districts
- Mythological zones
- Unexplored realms

**Culture:**
- Martial arts is EVERYTHING
- Reputation matters
- Faction affiliations
- Lone wolves respected
- Strength determines standing

---

## The Beggars Sect

### Core Identity

**Mysterious & Vague:**
- No one truly understands the Beggars Sect
- Styles are unknown outside the sect
- Structure is unclear to outsiders
- Spread out across Martial Arts Haven
- No central location (that outsiders know of)

**Einzelgänger Philosophy:**
- Loner lifestyle
- Independent by nature
- Not organized like traditional sects
- Elders exist but don't command directly
- Each beggar finds their own path

**Reputation:**
- **Common perception:** Just beggars, weak, pathetic
- **Smart people know:** Never underestimate a beggar
- **Reality:** Insanely high potential, extremely hard to master
- **Mystery factor:** You never know if you're facing a master

### Aesthetic

**Appearance:**
- Traditional Chinese beggar clothing
- Tattered robes, worn fabrics
- Patched garments
- Bamboo hats, straw sandals
- Weathered, hardened look

**Visual Identity:**
- Dirty but dignified
- Poor but proud
- Unassuming but deadly

### Hierarchy (Loose)

Since structure is vague, this is what players discover:

**Ranks:** (To be designed)
- Wandering Beggar (newcomer)
- ??? (progression tiers)
- Elder (master level)

**Note:** Rank doesn't mean authority, just mastery/respect

### Combat Arts

**Palm Techniques:**
Multiple styles, each unique:
- Weathered Palm
- Begging Bowl Strike
- Drunken Palm
- (Many more to be designed/discovered)

Each elder teaches different techniques. Li Wei must discover and learn various styles.

**Staff Arts:**
- Dog Beating Staff (legendary technique)
- Hidden variations scattered across Martial Arts Haven
- Unlocked at threshold (end of game 1)

---

## Protagonist: Li Wei

### Background

**Origin:**
- Spawned into Martial Arts Haven (how? why? mystery)
- Not from this world originally
- Low aptitude? Hidden potential? (breadcrumbed, not obvious)
- No understanding of where he is or what's happening

**Personality:** (To be defined through gameplay)
- Determined (keeps going despite confusion)
- Adaptable (becomes a beggar out of necessity)
- Resourceful (learns to survive)
- Humble (fits beggar lifestyle)

**Character Arc:**
- Confused stranger → struggling beggar → competent fighter → palm master → (next game) staff wanderer

### Starting State

**Combat Ability:** ZERO
- Can't fight at all
- Weak, unskilled
- Loses early encounters easily

**Resources:** NOTHING
- No equipment
- No money
- No knowledge
- Just survival instinct

**Growth Path:**
Through gameplay, Li Wei:
1. Learns to survive
2. Observes combat
3. Attempts techniques (fails)
4. Gradually improves
5. Discovers natural talent
6. Masters various palm styles
7. Becomes formidable

### Hidden Potential (Subtle)

**Breadcrumb Clues:**
- Learns faster than expected (NPCs comment)
- "Natural" feel for certain techniques
- Occasional moments of instinct
- Elders notice something different
- Never explicitly stated

**Mechanical Impact:**
- Maybe: Slight XP/mastery bonus (hidden)
- Maybe: Access to rare techniques
- Maybe: Unlock unique story paths
- Keep it subtle, players theorize

---

## Factions & Groups

### Primary Factions (Initial)

#### 1. The Beggars Sect
**Described above**

#### 2. Urban Thugs
**Identity:**
- Street-level fighters
- Control lower districts
- Street war dynamics
- Brutal, direct combat style

**Combat Style:**
- Dirty fighting
- Street brawling
- Improvised weapons (no guns, but pipes/chains?)
- Numbers advantage

**Relation to Li Wei:**
- Early antagonists
- Testing ground for skills
- Some might respect strength
- Others just hostile

#### 3. Hypermodern Spartans (Authority)
**Identity:**
- Authority over urban areas
- Futuristic martial arts
- Disciplined, organized
- Technology-enhanced (but still martial arts)

**Aesthetic:**
- Sleek armor/uniforms
- High-tech but no guns
- Spartan discipline meets cyberpunk
- Elite warriors

**Combat Style:**
- Highly trained
- Formation-based?
- Advanced techniques
- Precision and power

**Relation to Li Wei:**
- Neutral initially?
- See beggars as beneath them
- Could become allies or enemies

#### 4. Lone Wolves & Individuals
**Concept:**
- Many strong fighters operate solo
- Each has unique style
- Not affiliated with factions
- Roaming masters, wandering fighters
- Potential mentors or rivals

### Faction Design Philosophy

**Variety Within Groups:**
- Even within same faction, fighters have distinct styles
- Not all Spartans fight the same way
- Not all beggars use same techniques
- Individual expression within faction identity

**To Be Designed:**
- Other martial sects (traditional kung fu schools?)
- Mythological-based factions
- Ancient vs modern faction conflicts
- Rival beggar groups?

---

## Combat System

### Core Design: Turn-Based Strategy

**Inspiration:**
- **Final Fantasy X:** ATB system, turn order
- **Pokemon:** Type advantages, move sets
- **Digimon:** Strategic depth, combos

**Why Turn-Based:**
- Fits CLI perfectly
- Strategic, thoughtful combat
- Allows complex mechanics
- Automation can enhance (see below)

### Basic Combat Flow (Draft)

**Turn Structure:**
1. Turn order displayed (based on speed/initiative)
2. Player chooses action
3. Resolve player action
4. Enemy actions resolve
5. Repeat until victory/defeat

**Action Types:**
- **Attack:** Use palm technique
- **Defend:** Reduce damage, build chi?
- **Special:** Unique techniques (unlocked through discovery)
- **Item:** Use consumables
- **Flee:** Escape (not always possible)

### Combat Stats (Draft)

**Primary Stats:**
- **Strength:** Physical damage
- **Dexterity:** Speed, evasion, critical chance
- **Endurance:** Health, stamina
- **Aptitude:** Hidden stat, affects growth/learning
- **Chi/Energy:** Special technique resource

**Secondary Stats:**
- **Health (HP):** Damage capacity
- **Chi (CP):** Technique resource
- **Attack:** Damage output
- **Defense:** Damage reduction
- **Speed:** Turn order
- **Critical:** Crit chance/damage

### Technique System

**Types of Techniques:**
1. **Basic Palm Strikes** - Simple damage
2. **Advanced Palm Techniques** - Effects, combos
3. **Defensive Techniques** - Blocks, counters
4. **Chi Techniques** - Special abilities
5. **Ultimate Techniques** - Rare, powerful

**Discovery-Based Learning:**
- Techniques NOT unlocked by level
- Found through:
  - Training with elders
  - Exploring areas
  - Defeating enemies (rare drops)
  - Quest rewards
  - Hidden scrolls/teachings

**Mastery System:**
- Use technique → gain mastery
- Higher mastery → stronger effects
- Visual feedback (★ ☆ indicators?)

### Automation Enhancements (Brainstorm)

**AI-Generated Enemies:**
- Claude creates unique enemy configurations
- Procedural enemy techniques
- Dynamic difficulty based on player skill

**Dynamic Combat Events:**
- Environmental changes during battle
- n8n triggers special events
- Weather, time-based modifiers

**Intelligent Opponents:**
- AI decides enemy strategies
- Learn from player patterns
- Adaptive difficulty

**Combo Discovery:**
- AI suggests technique combinations
- Players discover synergies
- Hidden combo system

---

## Progression System

### Philosophy: Discover, Don't Grind

**Inspirations:**

**Age of Wushu:**
- Cultivation aspects
- No direct leveling
- Growth through practice and understanding
- Multiple progression paths

**King of Kings 3:**
- Skills found, not level-unlocked
- Exploration rewarded
- Monster drops contain techniques
- Quest rewards teach abilities

### No Traditional Levels

**Instead:**
- **Mastery Levels** for individual techniques
- **Cultivation Progress** in different arts
- **Reputation** with factions
- **Discovery Count** (techniques known)
- **Chi Capacity** growth

### Stat Growth

**How Stats Increase:**
- **Use-based:** Use strength techniques → strength grows
- **Training:** Specific training increases specific stats
- **Meditation:** Increase chi capacity
- **Combat:** General stat growth through fighting
- **Quests:** Unique rewards

**No XP Bar:**
- Instead: "Weathered Palm Mastery: ★★★☆☆"
- Progress feels organic, not numerical grind

### Technique Discovery

**How to Find Techniques:**

1. **Elder Training:**
   - Talk to Beggars Sect elders
   - Each teaches different style
   - Must prove yourself or complete tasks

2. **Exploration:**
   - Hidden scrolls in urban areas
   - Abandoned dojos
   - Secret training grounds

3. **Combat Drops:**
   - Rare: enemy drops technique scroll
   - Learn their move by defeating them

4. **Quests:**
   - Help NPCs → taught technique
   - Complete challenges → unlock style

5. **Observation:**
   - Watch fights (rare chance to learn)
   - Study opponents
   - Mimic techniques

### Cultivation System (Draft)

**Cultivation Paths:**
- **External Strength** - Physical power
- **Internal Chi** - Energy techniques
- **Technique Mastery** - Skill refinement
- **Body Conditioning** - Endurance, toughness

**Meditation/Training:**
- Time-based improvement?
- Active training minigames?
- Resource management (time, effort)

### Equipment vs Skill

**Minimal Equipment Focus:**
- Beggars don't have fancy gear
- Maybe: Worn gloves, tattered wraps
- Staff (late game)
- Focus is on SKILL, not gear

**Cosmetic Progression:**
- Clothing gets slightly better (but still beggar aesthetic)
- Visual mastery indicators
- Reputation reflected in appearance

---

## Game Structure

### Format: Hybrid

**Linear Story Backbone:**
- Main quest: Li Wei's journey
- Chapters/Acts guide progression
- Key story beats must happen in order

**Exploration Freedom:**
- Side areas to discover
- Optional encounters
- Hidden techniques to find
- NPC side quests

**CLI Limitations:**
- Work within terminal constraints
- Text-based navigation
- Turn-based advantage (perfect for CLI)
- ASCII art for key moments?

### Chapter Structure (Draft)

**Chapter 1: Awakening**
- Spawn scene
- Confusion and wandering
- First encounters (lose)
- Discovery of beggars
- Tutorial combat

**Chapter 2: The Beggar's Path**
- Acceptance into sect
- Meet first elder
- Learn basic palm technique
- Train and explore urban district
- First victory

**Chapter 3: Street Wars**
- Encounter thugs
- Faction dynamics introduced
- Multiple elder trainings available
- Discover techniques through exploration
- Build mastery

**Chapter 4: Rising Strength**
- Spartans introduced
- More complex combat
- Advanced techniques unlocked
- Lone wolf encounters
- Reputation grows

**Chapter 5: The Threshold**
- Mastery of various palm styles
- Final trials
- Staff introduction
- Cliffhanger: Wandering quest begins
- Setup for next game

### World Map/Navigation (CLI)

**Areas:**
```
[Urban District 1]
├─ Streets (exploration)
├─ Alleyways (hidden areas)
├─ Beggar's Corner (sect location)
├─ Market (NPCs, quests)
└─ Training Ground (practice)

[Urban District 2]
├─ Spartan Barracks
├─ ... (expand)

[??? More Areas]
```

**Navigation Commands:**
- `explore [area]`
- `travel [destination]`
- `search` (find hidden areas)
- `rest` (recover, meditate)

---

## Unique Mechanics (Brainstorm)

### Ideas to Explore

**1. Stance System**
- Different combat stances
- Switch mid-battle
- Each stance: different stats/moves
- Beggar stance, Aggressive stance, Defensive stance

**2. Chi Flow**
- Manage chi resource
- Some moves generate chi
- Others consume chi
- Balance resource management

**3. Environmental Awareness**
- Use surroundings in combat
- Urban environment: walls, alleys, rooftops
- Positional advantages
- Improvised weapons (beggars use anything)

**4. Reputation System**
- How factions see you
- Hidden beggar identity?
- Reveal strength = lose mystery advantage
- Balance power and secrecy

**5. Wandering Encounters**
- Random events while exploring
- Lone wolf challenges
- Sect trials
- Mystery quests

**6. Meditation/Training Minigames**
- Chi cultivation minigame
- Technique practice
- Breath control
- Focus training

**7. Combo System**
- Chain techniques
- Discover combos through experimentation
- AI suggests possibilities
- Advanced players find optimal chains

**8. Weather/Time Effects**
- Time of day affects encounters
- Weather modifies combat
- Beggars stronger at night? (more mysterious)

**9. Beggar Disguise**
- Appear weak to bait enemies
- Surprise with hidden strength
- Strategic deception

**10. Master/Student Dynamic**
- Learn from elders through dialogue
- Questions unlock teachings
- Respect system with masters

---

## Technical Approach

### Tech Stack

**Chosen:** Node.js + TypeScript + Ink

**Why:**
- Same ecosystem as genkaw.com
- Ink for beautiful TUIs (React for CLI)
- Easy automation integration
- Future web port possible
- TypeScript type safety

**Key Libraries:**
- `ink` - React components for CLI
- `ink-text-input` - User input
- `ink-select-input` - Menus
- `chalk` - Colors
- `boxen` - Borders/boxes
- `cli-spinners` - Loading indicators
- `figlet` - ASCII art titles

### Project Structure

```
/the-beggars-sect
├── .claude/           # Documentation
├── design/            # Game design docs (this file!)
├── docs/              # Technical docs
├── src/
│   ├── game/          # Core game logic
│   │   ├── combat/
│   │   ├── progression/
│   │   ├── world/
│   │   └── story/
│   ├── ui/            # Ink components
│   │   ├── screens/
│   │   ├── combat/
│   │   └── components/
│   ├── data/          # Game content
│   │   ├── techniques/
│   │   ├── enemies/
│   │   ├── areas/
│   │   └── npcs/
│   ├── automation/    # AI/n8n integrations
│   │   ├── claude/
│   │   └── n8n/
│   └── utils/         # Helper functions
├── assets/            # ASCII art, data files
├── package.json
└── README.md
```

### Save System

**Format:** JSON (text-based, human-readable)

**Save Data:**
- Player stats
- Techniques learned
- Mastery levels
- Story progress
- Discovered areas
- NPC relationships
- Inventory

**Cloud Sync (Future):**
- n8n workflow to Notion/Airtable
- Play from different devices
- Share saves

---

## Automation Integration

### How AI/Automation Enhances Gameplay

**1. Procedural Content Generation (Claude API)**

**Enemy Variations:**
- Base enemy template
- Claude generates unique variations
- Different stats, techniques, dialogue
- No two thugs exactly the same

**NPC Dialogue:**
- Base personality + context
- Claude generates contextual responses
- Dynamic conversations
- Feels alive, not scripted

**Quest Generation:**
- Core quest types defined
- Claude fills in details
- Unique rewards
- Procedural side quests

**Technique Descriptions:**
- Base mechanics defined
- Claude writes flavor text
- Unique names, descriptions
- Lore integration

**2. Living World (n8n Workflows)**

**Time-Based Events:**
- World changes while player is offline
- Faction wars progress
- NPCs move/change states
- Story events trigger on schedule

**Community Integration:**
- Aggregate player choices
- World events influenced by community
- Leaderboards updated
- Shared discoveries

**Dynamic Difficulty:**
- Track player performance
- Adjust encounter difficulty
- Suggest training areas
- Balance challenge

**3. AI Opponent Behavior**

**Smart Enemies:**
- Analyze player patterns
- Adapt strategies
- Use techniques intelligently
- Create challenge

**Boss AI:**
- Complex behavior trees
- Multi-phase fights
- React to player actions
- Memorable encounters

---

## Development Phases

### Phase 1: Foundation & Design (Week 1-2)
**Goal:** Solid design foundation

- ✅ Create project structure
- ✅ Game design document (this file!)
- [ ] Complete worldbuilding document
- [ ] Design all Chapter 1 content
- [ ] Technique system design
- [ ] Combat mechanics specification
- [ ] UI/UX wireframes (CLI mockups)

### Phase 2: Core Systems (Week 3-4)
**Goal:** Playable prototype

- [ ] Set up TypeScript + Ink project
- [ ] Basic UI framework
- [ ] Combat system implementation
- [ ] Character stats and progression
- [ ] Save/load system
- [ ] Basic navigation

### Phase 3: Content Creation (Week 5-6)
**Goal:** Chapter 1 complete

- [ ] Implement Chapter 1 story
- [ ] Create initial techniques
- [ ] Design enemy encounters
- [ ] NPCs and dialogue
- [ ] Tutorial and onboarding
- [ ] Polish combat feel

### Phase 4: Automation Integration (Week 7-8)
**Goal:** AI-enhanced gameplay

- [ ] Claude API integration
- [ ] Procedural content pipeline
- [ ] n8n workflow setup
- [ ] Dynamic difficulty
- [ ] Living world events

### Phase 5: Polish & Expand (Week 9-10)
**Goal:** Full Chapter 1-5 experience

- [ ] Complete all chapters
- [ ] Balance combat and progression
- [ ] Add optional content
- [ ] Technique discovery paths
- [ ] Secret areas and hidden content

### Phase 6: Showcase & Release (Week 11-12)
**Goal:** Public launch

- [ ] Epic README
- [ ] Add to genkaw.com Lab
- [ ] Create demo video
- [ ] Documentation for players
- [ ] Community features
- [ ] Web version exploration

---

## Open Questions & Brainstorm Areas

### Need to Design

- [ ] **Exact stat formulas** - How damage is calculated
- [ ] **All palm techniques** - Names, effects, mastery levels
- [ ] **Enemy roster** - Complete bestiary
- [ ] **NPC cast** - Key characters, personalities
- [ ] **World map** - All areas and connections
- [ ] **Cultivation mechanics** - How exactly does it work
- [ ] **Chi system details** - Generation, consumption, limits
- [ ] **Combo mechanics** - How combos work mechanically
- [ ] **Hidden aptitude reveal** - How/when is it discovered
- [ ] **Staff threshold trigger** - Exact requirements
- [ ] **Cliffhanger execution** - How ending sets up sequel

### Brainstorm Sessions Needed

1. **Combat depth** - Make turn-based engaging
2. **Automation features** - What AI/n8n can really do
3. **Unique mechanics** - What makes THIS game special
4. **Beggar sect culture** - Deeper lore
5. **Faction dynamics** - How groups interact
6. **Progression feel** - Ensure satisfying growth
7. **Mystery elements** - Breadcrumbing aptitude/lore
8. **Replayability** - Reasons to play again

---

## Next Steps

1. **Review this document** with Mito
2. **Brainstorm missing pieces** together
3. **Create supplementary design docs:**
   - Combat mechanics specification
   - Technique database
   - World map and areas
   - NPC cast and dialogue
   - Story beats in detail
4. **Start prototyping** core systems
5. **Iterate** on design as we build

---

**Version:** 0.1.0 (Initial Design)
**Last Updated:** 2024-12-04
**Status:** Foundation laid, ready for expansion

This is a living document. As we design and build, this will evolve.

---

**THE JOURNEY BEGINS. 🥋**
