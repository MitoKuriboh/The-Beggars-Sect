# The Beggars Sect - Improvement Roadmap

**Created:** 2025-12-06
**Last Updated:** 2025-12-06
**Purpose:** Comprehensive analysis of improvement opportunities based on research and current implementation
**Scope:** All aspects of the game - gameplay loops, UI, combat, story, performance, architecture

---

## Master Index

### Part I: Research & Theory
| Section | Description | Jump |
|---------|-------------|------|
| 1.0 | Current State Analysis | [Go](#10-current-state-analysis) |
| 2.0 | Gameplay Loop Theory | [Go](#20-gameplay-loop-theory) |
| 3.0 | Combat Design Theory | [Go](#30-combat-design-theory) |
| 4.0 | Narrative Design Theory | [Go](#40-narrative-design-theory) |
| 5.0 | Progression & Psychology | [Go](#50-progression--player-psychology) |
| 6.0 | CLI/Text Game UX Theory | [Go](#60-clitext-game-ux-theory) |
| 7.0 | Wuxia Genre Mechanics | [Go](#70-wuxia-genre-mechanics) |
| 8.0 | Retention & Replayability | [Go](#80-retention--replayability) |
| 9.0 | Economy & Balance Theory | [Go](#90-economy--balance-theory) |
| 10.0 | Game Feel & Feedback | [Go](#100-game-feel--feedback) |
| 11.0 | Difficulty Design | [Go](#110-difficulty-design) |
| 12.0 | Onboarding & Tutorials | [Go](#120-onboarding--tutorials) |

### Part II: Implementation Routes
| Route | Name | Effort | Impact | Jump |
|-------|------|--------|--------|------|
| **Visual & UX** ||||
| R01 | Typewriter Effect | Low | High | [Go](#route-1-typewriter-effect-for-story-text) |
| R02 | Combat Animations | Medium | High | [Go](#route-2-combat-animations) |
| R03 | Stance Visual Indicators | Low | Medium | [Go](#route-3-stance-visual-indicators) |
| R04 | ASCII Art Key Moments | Medium | High | [Go](#route-4-ascii-art-for-key-moments) |
| R05 | Combat Message Variety | Low | Medium | [Go](#route-5-combat-message-variety) |
| R06 | Dynamic Prompts | Very Low | Low | [Go](#route-6-dynamic-prompt-enhancement) |
| R35 | Semantic Color System | Low | Medium | [Go](#route-35-semantic-color-system) |
| R36 | High-Res Progress Bars | Low | Low | [Go](#route-36-high-resolution-progress-bars) |
| R37 | Rounded Corners UI | Low | Medium | [Go](#route-37-modern-ui-aesthetic-rounded-corners) |
| R38 | Braille Spinners | Low | Low | [Go](#route-38-braille-spinners--loading-states) |
| **Combat System** ||||
| R07 | Hit/Miss System | Medium | Medium | [Go](#route-7-hitmiss-system) |
| R08 | Expanded Combo System | High | High | [Go](#route-8-expanded-combo-system) |
| R09 | Environmental Effects | Medium | Medium | [Go](#route-9-environmental-combat-effects) |
| R10 | Threat System | Medium | High | [Go](#route-10-combat-threat-system) |
| R11 | Descriptive Health States | Very Low | Medium | [Go](#route-11-descriptive-health-states) |
| R40 | Turn Manipulation | Medium | High | [Go](#route-40-turn-manipulation-grandia-style) |
| R41 | Status Effect Expansion | Medium | Medium | [Go](#route-41-status-effect-expansion) |
| **Story System** ||||
| R12 | Relationship Indicators | Low | Medium | [Go](#route-12-relationship-indicators) |
| R13 | Path Visualization | Low | Medium | [Go](#route-13-path-visualization) |
| R14 | Exploration Enhancement | Medium | Medium | [Go](#route-14-exploration-enhancement) |
| R15 | Memory/Flashback System | High | High | [Go](#route-15-memoryflashback-system) |
| R31 | Chi Aspect Voices | Medium | High | [Go](#route-31-chi-aspect-voices-system) |
| R32 | Failure as Narrative | Medium | High | [Go](#route-32-failure-as-narrative) |
| R33 | Storylets System | High | High | [Go](#route-33-storylets--quality-based-narrative) |
| R34 | Environmental Storytelling | Medium | Medium-High | [Go](#route-34-environmental-storytelling-in-text) |
| **Audio** ||||
| R16 | Basic Sound Effects | Medium | Low-Medium | [Go](#route-16-basic-sound-effects) |
| **Performance** ||||
| R17 | Component Memoization | Very Low | Low | [Go](#route-17-react-component-memoization) |
| R18 | Combat State Optimization | Medium | Low | [Go](#route-18-combat-state-optimization) |
| R19 | TypeScript Config | Very Low | Low | [Go](#route-19-typescript-config-enhancement) |
| R20 | Ink Static for Log | Low | Low | [Go](#route-20-ink-static-for-combat-log) |
| **Architecture** ||||
| R21 | Event System | Medium | Medium | [Go](#route-21-event-system) |
| R22 | Achievement System | High | Medium | [Go](#route-22-achievement-system) |
| R23 | Debug Mode | Medium | High | [Go](#route-23-debug-mode) |
| **Build & Distribution** ||||
| R24 | esbuild Migration | Medium | Medium | [Go](#route-24-esbuild-migration) |
| R25 | SEA Packaging | Medium | Low | [Go](#route-25-sea-single-executable-application) |
| **Testing** ||||
| R26 | Unit Tests | High | High | [Go](#route-26-unit-tests-with-vitest) |
| R27 | Integration Tests | Medium | Medium | [Go](#route-27-integration-tests) |
| **Content** ||||
| R28 | Enemy Variety | Medium | High | [Go](#route-28-enemy-variety) |
| R29 | More Techniques | High | High | [Go](#route-29-more-techniques) |
| R30 | Side Content System | High | High | [Go](#route-30-side-content-system) |
| **Accessibility** ||||
| R39 | Accessibility Features | Medium | Medium | [Go](#route-39-accessibility-features) |
| **Progression** ||||
| R42 | New Game Plus | Medium | High | [Go](#route-42-new-game-plus-system) |
| R43 | Codex/Gallery System | Medium | Medium | [Go](#route-43-codexgallery-system) |
| **Gameplay Loop** ||||
| R44 | Core Loop Enhancement | Medium | High | [Go](#route-44-core-loop-enhancement) |
| R45 | Meta Progression | High | High | [Go](#route-45-meta-progression-system) |
| R46 | Reward Pacing | Low | High | [Go](#route-46-reward-pacing-system) |

### Part III: Priority & Planning
| Section | Description | Jump |
|---------|-------------|------|
| 13.0 | Implementation Priority Matrix | [Go](#130-implementation-priority-matrix) |
| 14.0 | Quick Start Guide | [Go](#140-quick-start-guide) |
| 15.0 | Changelog | [Go](#150-changelog) |

---

# Part I: Research & Theory

---

## 1.0 Current State Analysis

### 1.1 What's Already Well Implemented

| System | Implementation | Quality |
|--------|---------------|---------|
| **Combat Engine** | ATB turn system, combos, status effects, AI | Excellent |
| **Story Engine** | Scene-based, branching, choices, path scoring | Excellent |
| **State Management** | Singleton GameStore with save/load | Good |
| **Type Safety** | TypeScript with strict mode | Good |
| **UI Framework** | Ink/React with component separation | Good |
| **Health Bars** | Dynamic color bars with visual feedback | Good |
| **Combat Log** | Color-coded messages with number highlighting | Good |
| **Save System** | Multiple slots, auto-save, checksums | Good |

### 1.2 Current Tech Stack

```
Core:
├── TypeScript 5.3.3
├── React 18.2.0
├── Ink 3.2.0
└── Node.js 18+

UI Libraries:
├── ink-select-input
├── chalk 5.3.0
├── figlet 1.7.0
├── boxen 7.1.1
└── cli-spinners 2.9.2

Build:
├── tsx (dev)
├── tsc (build)
└── pkg (packaging)
```

### 1.3 Current Codebase Stats

- **34 source files**
- **~2,567 lines of code**
- **Well-organized** into game/, ui/, types/, data/

### 1.4 Strengths

- Strong ATB combat system with turn preview
- Meaningful stance system (Flowing/Weathered/Hungry)
- Unique inverse chi mechanic
- Rich wuxia lore and worldbuilding
- Three narrative paths (Blade/Stream/Shadow)
- Technique mastery through use

### 1.5 Areas for Enhancement

- Core gameplay loop could have more frequent rewards
- Combat feedback could be more descriptive
- Path differentiation could be more dramatic
- Progression indicators could be clearer
- Replayability systems not yet implemented

---

## 2.0 Gameplay Loop Theory

> **Key Insight:** Without tight and emotionally satisfying core gameplay, no amount of progression or content can sustain engagement.

### 2.1 Core Concepts

A **gameplay loop** is a repeatable sequence of actions players engage in. Good loops keep players engaged through a cycle of **Challenge → Action → Reward**.

### 2.2 Loop Hierarchy

| Loop Type | Duration | Example in RPGs | The Beggars Sect |
|-----------|----------|-----------------|------------------|
| **Core Loop** (Micro) | Seconds-minutes | Attack → Damage → Effect | Combat turn cycle |
| **Meta Loop** | Minutes | Fight → Loot → Exit | Scene → Choice → Combat → Reward |
| **Macro Loop** | Hours | Complete arc → New abilities | Chapter completion |
| **Mega Loop** | Days/Weeks | Finish playthrough → NG+ | Full path completion |

### 2.3 The Three-Layer Model

```
┌─────────────────────────────────────────┐
│           CONTENT STRATEGY              │
│   (New chapters, side content, DLC)     │
├─────────────────────────────────────────┤
│             META GAME                   │
│  (Technique mastery, path progression)  │
├─────────────────────────────────────────┤
│           CORE GAMEPLAY                 │
│  (Combat, choices, story progression)   │
└─────────────────────────────────────────┘
```

### 2.4 Common Loop Design Mistakes

| Mistake | Problem | Solution |
|---------|---------|----------|
| **Loop Too Long** | Player loses sense of progress | Keep core loop under 5 minutes |
| **Lack of Variety** | Repetitive actions become boring | Vary encounter types and rewards |
| **Unclear Rewards** | Player doesn't understand what they earned | Explicit reward notifications |
| **Disconnected Loops** | Micro-loops don't feed macro-loops | Technique XP feeds mastery feeds story |

### 2.5 Current vs. Enhanced Loop

**Current:**
```
Story Scene → Choice → (Sometimes Combat) → Story Continues
```

**Enhanced:**
```
Explore/Story → Meaningful Choice → Combat/Challenge →
Reward (Chi/Technique/Relationship) → Progress Indicator → Repeat
```

### 2.6 Sources
- [Exploring Core and Meta in Game Design](https://medium.com/@backnd/general-exploring-the-core-and-meta-key-concepts-in-game-design-94c60c815382)
- [Core Gameplay Loop Design](https://blog.gamedistribution.com/core-gameplay-loop-design-small-tweaks-big-engagement/)
- [How To Perfect Your Game's Core Loop](https://www.gameanalytics.com/blog/how-to-perfect-your-games-core-loop)

---

## 3.0 Combat Design Theory

### 3.1 ATB System Origins

**Active Time Battle (ATB)** was invented by Hiroyuki Ito for Final Fantasy IV (1991). He was inspired by Formula One racing—vehicles departing from the same point but drifting apart based on different accelerations.

**Core Mechanics:**
- Each character has an "internal clock" determining turn order
- Speed/initiative stats affect timer fill rate
- Creates tension between waiting and acting

### 3.2 The Four Virtues of Combat Design

| Virtue | Description | The Beggars Sect Status |
|--------|-------------|------------------------|
| **Clarity** | Players understand how actions will play out | Good (turn preview helps) |
| **Depth** | Multiple valid strategies exist | Good (stances, combos) |
| **Consequence** | Decisions have weight | Moderate (needs enhancement) |
| **Feedback** | Clear visual/audio cues | Needs improvement |

### 3.3 Key Combat Enhancement Techniques

| Technique | Description | Implementation Effort |
|-----------|-------------|----------------------|
| **Turn Manipulation** | Cancel/delay enemy turns (Grandia-style) | Medium |
| **Positioning** | Range categories affecting techniques | Medium |
| **Combo Expansion** | More starter→followup→finisher chains | High |
| **Status Depth** | More effects with strategic counters | Medium |

### 3.4 The Grandia Sweet Spot

> "Adding the ability to cancel turns or push an enemy's turn further back while also giving the player time to think without twitch mechanics was the perfect sweet spot."

This allows strategic depth without punishing slower players—ideal for a CLI game.

### 3.5 Sources
- [12 Ways to Improve Turn-Based RPG Combat](https://sinisterdesign.net/12-more-ways-to-improve-turn-based-rpg-combat-systems/)
- [How to Design Turn-Based Combat Systems](https://gameworldobserver.com/2022/12/02/how-to-design-turn-based-combat-system-untamed-tactics)

---

## 4.0 Narrative Design Theory

### 4.1 The Core Tension

> "It's likely impossible to have a game with both full narrative cohesion and complete player agency."

**Balance Required:** Players want freedom to shape their journey AND a cohesive, satisfying story.

### 4.2 What Makes Choices Meaningful

**The "Road Not Taken" Effect:**
> "What the player chooses matters, but not as much as what choices are offered. Every choice suggests what's imaginable for the viewpoint character."

**Requirements for Impactful Choices:**
1. Emotional weight affecting characters/plot/world
2. Clear consequences (immediate or delayed)
3. No obvious "right answer"
4. Alignment with character/player values

### 4.3 Branching Narrative Structures

**Parallel Structure (Recommended):**
```
    B₁ → C₁
   /        \
A → B₂ → C₂ → D (Paths converge at key points)
   \        /
    B₃ → C₃
```

- Allows player choice and branching
- Pools back to critical plot points
- Keeps story moving forward while honoring choices

### 4.4 Design Strategies

| Strategy | Description | Application |
|----------|-------------|-------------|
| **Core Preservation** | Central themes remain regardless of choices | Li Wei's identity mystery |
| **Converging Paths** | Different choices lead back to main story | All paths reach Calibration Initiative |
| **Diverging Details** | Meaningful variations in how events unfold | Path-specific NPCs/techniques |
| **Delayed Consequences** | Choices affect later events | Prologue choices echo in chapters |

### 4.5 Sources
- [How to Create Branching Narratives](https://www.depthtale.com/en/app/blog/how-to-create-branching-narratives-in-interactive-fiction)
- [Beyond Branching: Quality-Based Narrative](https://emshort.blog/2016/04/12/beyond-branching-quality-based-and-salience-based-narrative-structures/)

---

## 5.0 Progression & Player Psychology

### 5.1 Motivation Types

| Type | Driver | Examples | Design Approach |
|------|--------|----------|-----------------|
| **Intrinsic** | Internal satisfaction | Mastering skills, story discovery | Make core gameplay satisfying |
| **Extrinsic** | External rewards | Leveling up, loot, achievements | Clear reward notifications |

**Best Design:** Balance both. Pure extrinsic motivation (Skinner box) doesn't create lasting engagement.

### 5.2 The Dopamine Connection

When players achieve goals, dopamine release creates:
- Sense of accomplishment
- Motivation to continue
- Positive association with gameplay

**Key:** Rewards should feel earned, not arbitrary.

### 5.3 Vertical vs. Horizontal Progression

| Type | Description | Risk | Mitigation |
|------|-------------|------|------------|
| **Vertical** | Numbers go up (stats, damage) | Treadmill feeling | Meaningful milestones |
| **Horizontal** | New options/abilities unlocked | Choice paralysis | Curated unlocks |

**Recommendation:** Combine both—new abilities AND meaningful power increases.

### 5.4 Narrative-Integrated Progression

Progression that affects narrative significantly improves player experience:
- Actions affecting faction relationships
- Skill choices changing story options
- Story branches based on mastery levels

### 5.5 Application to The Beggars Sect

**Horizontal Progression:**
- Unlock new stances (4th: Deceptive planned)
- Technique categories with trade-offs
- Chi aspect specialization

**Vertical Progression:**
- Technique mastery (already implemented)
- Stat growth through training
- Cultivation stages for major milestones

**Narrative Progression:**
- Sect rank advancement
- Reputation with factions
- Knowledge/lore discovery

### 5.6 Sources
- [Power Progression in Games](https://www.gamedeveloper.com/design/power-progression-in-games-crafting-rewarding-player-experiences)
- [Designing Meaningful Character Progression](https://medium.com/@carol.reed.597/designing-meaningful-character-progression-in-rpgs-a11ec3e73e4e)

---

## 6.0 CLI/Text Game UX Theory

### 6.1 Design Philosophy

> "Today's command line is human-first: a text-based UI that affords access to all kinds of tools, systems and platforms."

CLI games succeed when they embrace constraints rather than fight them.

### 6.2 Strengths of Terminal Games

| Strength | Description |
|----------|-------------|
| **Focus** | No visual distractions, pure gameplay/narrative |
| **Imagination** | Players fill in visual gaps creatively |
| **Accessibility** | Runs anywhere, low system requirements |
| **Speed** | Fast load times, responsive input |
| **Nostalgia** | Retro aesthetic appeals to certain audiences |

### 6.3 UX Best Practices

1. **Clear Information Hierarchy**
   - Use color/formatting to distinguish information types
   - Important data (HP, status) always visible
   - Consistent positioning of UI elements

2. **Responsive Feedback**
   - Immediate acknowledgment of player input
   - Clear indication of what's happening
   - Progress indicators for longer operations

3. **Readable Text**
   - 60-80 characters line length ideal
   - Adequate spacing between sections
   - Strategic use of ASCII art/borders

4. **Keyboard-First Design**
   - Intuitive key bindings
   - Consistent navigation patterns
   - Shortcut keys for common actions

### 6.4 CLI "Juice" Opportunities

For terminal games, satisfying feedback comes from:
- Descriptive, varied action text
- Well-paced information reveal
- Clear cause-and-effect in narration
- Strategic use of pauses and spacing
- Consistent, snappy responses

### 6.5 Sources
- [Command Line Interface Guidelines](https://clig.dev/)
- [Developing Terminal Based Video Games](https://blog.robertelder.org/building-video-games-for-linux-terminal/)

---

## 7.0 Wuxia Genre Mechanics

### 7.1 The Wu vs. Xia Balance

Chinese scholars note:
> "The elements of xia are diluted while wu is greatly amplified since overpowering strength is the primary drive."

| Concept | Meaning | Game Representation |
|---------|---------|---------------------|
| **Wu (武)** | Martial combat, techniques | Combat system, abilities |
| **Xia (侠)** | Chivalry, honor, philosophy | Story choices, relationships |

**Design Challenge:** Balance combat mechanics (wu) with honor/philosophy themes (xia) that define the genre.

### 7.2 Core Wuxia Game Elements

| Element | Implementation |
|---------|----------------|
| **Chi/Neili System** | Resource pool for techniques |
| **Martial Arts Styles** | Distinct ability trees/stances |
| **Mastery Through Practice** | Techniques improve with use |
| **Sect/Faction Identity** | Alignment affecting abilities/story |
| **Philosophical Dilemmas** | Choices reflecting xia values |
| **Legendary Weapons/Manuals** | Progression through discovery |

### 7.3 Cultivation System Concepts

Cultivation is a core wuxia/xianxia concept:
- Taoist-inspired practice to extend lifespan and gain powers
- Involves meditation, martial training, and Qi development
- Ultimate goal: Immortality or transcendence

**Game Translation:**
- Chi pools as combat resource ✓
- Technique mastery through practice ✓
- Cultivation stages as progression milestones (future)
- Internal vs. external martial arts paths (future)

### 7.4 Tabletop RPG Inspirations

**Legends of the Wulin:**
- D10 dice pools, matching numbers
- Resolves physical, mental, AND social duels
- External + internal martial arts combine

**Righteous Blood, Ruthless Blades:**
- "Dark wuxia" inspired by Shaw Brothers films
- Signature Abilities and Counters
- NPCs with motivations and grudges

### 7.5 Sources
- [Wuxia RPGs: A Comparative Study](https://www.rpgpub.com/threads/wuxia-rpgs-a-comparative-study-in-martial-mechanics.12068/)
- [17 Best Wuxia Games](https://gamerant.com/best-wuxia-games/)

---

## 8.0 Retention & Replayability

### 8.1 The ATBE Metric

**Average Time Between Endorphins (ATBE):**
The average time between moments of pure pleasure—finding items, defeating bosses, completing quests.

**Goal:** Keep ATBE short enough to maintain engagement, long enough to make rewards feel earned.

### 8.2 Roguelike Replayability Principles

Why roguelikes are endlessly replayable:

| Principle | Description | Application |
|-----------|-------------|-------------|
| **Variety** | Each run feels different | Randomized encounters |
| **Stakes** | Consequences create tension | Meaningful choices |
| **Meta Progression** | Failure still advances overall | Unlocks persist |
| **Short Sessions** | 30-60 min runs enable experimentation | Chapter structure |
| **Build Diversity** | Many valid playstyles | Three paths + techniques |

### 8.3 New Game Plus Design

**Purpose:** Let invested players continue without replaying identical content.

**Effective NG+ Features:**
- Retain progress (techniques, some relationships)
- New challenges (tougher enemies, new encounters)
- Exclusive content (alternate endings, hidden scenes)
- Story variations (see consequences of different choices)

### 8.4 Path Differentiation

> "Offering character classes with real differences in playstyle increases replayability. The bigger the gap between classes, the more reasons players have to start over."

**For The Beggars Sect:** Blade/Stream/Shadow should offer meaningfully different experiences—unique NPCs, techniques, and story beats per path.

### 8.5 Sources
- [Why Are Roguelike Games So Addictive?](https://retrostylegames.com/blog/why-are-roguelike-games-so-engaging/)
- [How to Increase Retention in Roguelikes](https://medium.com/@doandaniel/heres-how-to-increase-user-retention-and-engagement-in-roguelikes-and-rpgs-9d7192097e14)

---

## 9.0 Economy & Balance Theory

### 9.1 Core Economy Concepts

**Taps (Sources):** Activities that give players resources
- Combat rewards
- Quest completion
- Exploration discoveries

**Sinks (Consumption):** Systems that consume resources
- Buying items/equipment
- Technique training
- Healing/restoration

**Balance Rule:** Players should earn enough to engage meaningfully, not so much they skip content.

### 9.2 Economy Progression Over Time

```
Early Game: Sources > Sinks (Generosity builds engagement)
     ↓
Mid Game: Sources ≈ Sinks (Balance creates meaningful choices)
     ↓
Late Game: Sinks > Sources (Scarcity increases value)
```

**Warning:** Early over-generosity is catastrophic long-term—dilutes systems, breaks gates, destroys motivation.

### 9.3 Currency Design

| Type | Purpose | The Beggars Sect |
|------|---------|------------------|
| **Soft Currency** | Rewards consistent play | Chi recovery items |
| **Hard Currency** | Premium/rare purchases | Technique scrolls |
| **Specialized** | Specific system purchases | Sect contribution points |

### 9.4 Sources
- [What is Game Economy Design](https://machinations.io/articles/what-is-game-economy-design)
- [5 Basic Steps in Creating Balanced Economy](https://www.gamedeveloper.com/design/5-basic-steps-in-creating-balanced-in-game-economy)

---

## 10.0 Game Feel & Feedback

### 10.1 What is "Game Juice"?

> "Juice refers to the immediate visual and audio feedback that responds to player actions. Think of it as the 'oomph' factor."

**Key Principle:** Maximum output from minimum input.

### 10.2 Elements of Game Feel

| Element | Description | CLI Implementation |
|---------|-------------|-------------------|
| **Input** | Control responsiveness | Instant key response |
| **Response** | Immediate feedback | Descriptive action text |
| **Context** | World reaction | Environment descriptions |
| **Aesthetic** | Polish | Consistent formatting |

### 10.3 Feedback Types for CLI Games

**Visual Feedback (Text-Based):**
- Color changes for damage/healing
- ASCII animations
- Status bar updates
- Box drawing for emphasis

**Textual Feedback:**
- Descriptive action text
- Sound effect words (CRACK! WHOOSH!)
- Progressive revelation
- Dramatic pauses

### 10.4 The Juice Warning

> "A common pitfall is confusing 'juice' with genuine player agency. Giving the player the illusion of impact is not the same as empowering them with actual agency."

**Rule:** Juice complements good mechanics, never substitutes for them.

### 10.5 Sources
- [Making Gameplay Irresistibly Satisfying](https://thedesignlab.blog/2025/01/06/making-gameplay-irresistibly-satisfying-using-game-juice/)
- [Squeezing More Juice Out of Your Game Design](https://www.gameanalytics.com/blog/squeezing-more-juice-out-of-your-game-design)

---

## 11.0 Difficulty Design

### 11.1 Scaling System Types

| Type | Method | Pros | Cons |
|------|--------|------|------|
| **Stat Scaling** | Same enemies, higher stats | Simple | Can feel arbitrary |
| **Quantity Scaling** | More enemies | Tactical complexity | Can overwhelm |
| **Type Scaling** | Replace weak with strong | Feels natural | Requires more content |
| **Mixed** | Combination | Best of all | Complex to balance |

### 11.2 Achievement-Based Scaling

> "Instead of scaling the world with player level, scale with player achievements. The further the player advances story arcs, the more dangerous the world becomes."

**Benefits:**
- Rising challenge feels narratively justified
- Exploration remains valuable
- Power progression still meaningful

### 11.3 Balance Guidelines

1. Use logarithmic growth curves to prevent runaway stats
2. Test edge cases (minimum and maximum player power)
3. Mix challenging and relaxing encounters
4. Provide recovery between difficult fights
5. Communicate difficulty clearly

### 11.4 Sources
- [5 Tips for Balancing an RPG Game](https://gamescrye.com/blog/5-tips-for-balancing-an-rpg-game/)
- [Designing RPG Mechanics for Scalability](https://sinisterdesign.net/designing-rpg-mechanics-for-scalability/)

---

## 12.0 Onboarding & Tutorials

### 12.1 Core Principles

1. **First Minutes = Essential Only** - Core mechanics, not every feature
2. **Gradual Introduction** - One mechanic at a time
3. **Show, Don't Tell** - Minimize walls of text
4. **Safe Learning** - Teach without punishment
5. **Integrated, Not Separate** - Best tutorials are invisible

### 12.2 Common Mistakes

| Mistake | Problem | Solution |
|---------|---------|----------|
| **Wall of Text** | Players won't read | Interactive teaching |
| **Front-Loading** | Overwhelming | Spread across early game |
| **Telling, Not Showing** | Forgettable | Practice opportunities |
| **No Safe Space** | Fear of failure | Consequence-free practice |

### 12.3 Effective Methods

**Environmental Teaching (Best):**
- Design naturally teaches mechanics
- Player discovers through play

**Contextual Prompts:**
- Small tasks teaching one mechanic
- Presented as in-game goals

**Tutorial Characters:**
- Mentor figures who teach organically
- Integrated into narrative

### 12.4 Successful Examples

**Celeste:** Tutorial integrated into narrative—mountain climb naturally introduces mechanics.

**Hollow Knight:** Simple basics first, environmental clues + minimal prompts, advanced mechanics revealed gradually.

### 12.5 Application to The Beggars Sect

The prologue already teaches basics well. Enhance with:

1. **Stance Tutorial Combat** - Dedicated fight teaching stance switching
2. **Chi Management Lesson** - Encounter where chi conservation matters
3. **Combo System Introduction** - Visual indicator of combo opportunities

### 12.6 Sources
- [Tutorial UX: Your Indie Game's Onboarding Roadmap](https://www.wayline.io/blog/tutorial-ux-indie-game-onboarding)
- [The Importance of Onboarding in Game Design](https://game-wisdom.com/critical/onboarding-game-design)

---

# Part II: Implementation Routes

---

## Visual & UX Improvements

### Route 1: Typewriter Effect for Story Text

**Current:** Text appears instantly
**Improvement:** Character-by-character reveal for immersion

**Implementation:**

```typescript
// src/ui/hooks/useTypewriter.ts
import { useState, useEffect } from 'react';

export function useTypewriter(text: string, speed = 30, skip = false) {
  const [displayed, setDisplayed] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (skip) {
      setDisplayed(text);
      setIsComplete(true);
      return;
    }

    setDisplayed('');
    setIsComplete(false);
    let i = 0;

    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        setIsComplete(true);
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, skip]);

  return { displayed, isComplete };
}
```

**Files to modify:**
- `src/ui/story/ContentRenderer.tsx` - Add typewriter to dialogue lines
- `src/ui/App.tsx` - Add global skip toggle

**Effort:** Low (2-3 hours)
**Impact:** High - Significantly improves story immersion

---

### Route 2: Combat Animations

**Current:** Static text updates
**Improvement:** Frame-based ASCII animations for attacks

```typescript
// src/ui/combat/CombatAnimations.ts
export const ATTACK_FRAMES = [
  '    ', ' >> ', '>>> ', '>>>>', '--->',
  '--*>', '  * ', '    ',
];

export const CRITICAL_FRAMES = [
  '     ', '  *  ', ' *** ', '*****',
  '★★★★★', '*****', ' *** ', '  *  ',
];
```

**Directional Attack Example:**
```
Frame 1: [Li Wei]              [Thug]
Frame 2: [Li Wei] >            [Thug]
Frame 3: [Li Wei] >>>>         [Thug]
Frame 4: [Li Wei] >>>>>>>>     [Thug]
Frame 5: [Li Wei]          ★   [Thug]
Frame 6: [Li Wei]              [Thug] !
```

**Files to modify:**
- Create `src/ui/combat/CombatAnimations.tsx`
- Modify `src/ui/combat/CombatScreen.tsx` - Add animation phase

**Effort:** Medium (4-6 hours)
**Impact:** High - Makes combat visually exciting

---

### Route 3: Stance Visual Indicators

**Current:** Text-only stance display
**Improvement:** ASCII art representations of stances

```typescript
const STANCE_ART: Record<Stance, string[]> = {
  'Flowing Stance': [
    '  ~~~~~  ',
    ' ~~~O~~~ ',
    '  ~/|\\~  ',
    '   / \\   ',
  ],
  'Weathered Stance': [
    '   ═══   ',
    '   │O│   ',
    '  ═╬═╬═  ',
    '   / \\   ',
  ],
  'Hungry Stance': [
    '   >>>   ',
    '  >/O\\>  ',
    '   /|\\   ',
    '  >/ \\>  ',
  ],
};
```

**Effort:** Low (1-2 hours)
**Impact:** Medium - Visual variety

---

### Route 4: ASCII Art for Key Moments

**Current:** Text-only announcements
**Improvement:** ASCII art for bosses, technique learning, chapter titles

```
╔═══════════════════════════════════════════╗
║                                           ║
║       You have learned a new technique!   ║
║                                           ║
║          ★  FLOWING PALM  ★               ║
║              ~~~╱╲~~~                     ║
║             ~~~~╲╱~~~~                    ║
║                                           ║
║   "Water that strikes will break stone"  ║
║                                           ║
╚═══════════════════════════════════════════╝
```

**Files to create:**
- `src/ui/art/BossArt.ts`
- `src/ui/art/TechniqueArt.ts`
- `src/ui/art/ChapterArt.ts`

**Effort:** Medium (3-4 hours)
**Impact:** High - Memorable moments

---

### Route 5: Combat Message Variety

**Current:** Repetitive attack messages
**Improvement:** Varied phrase pools per action type

```typescript
// src/data/combatPhrases.ts
export const ATTACK_PHRASES = {
  basic: [
    '{actor} strikes {target}',
    '{actor} lands a blow on {target}',
    '{actor} connects with {target}',
  ],
  critical: [
    '{actor} finds an opening in {target}\'s defense',
    '{actor}\'s strike hits true',
    'A perfect strike from {actor}',
  ],
};

export const TECHNIQUE_PHRASES: Record<string, string[]> = {
  'flowing-palm': [
    '{actor} flows like water, palm striking {target}',
    'With fluid grace, {actor} unleashes Flowing Palm',
  ],
};
```

**Effort:** Low (2-3 hours)
**Impact:** Medium - Combat feels more alive

---

### Route 6: Dynamic Prompt Enhancement

**Current:** Static "[SPACE] continue" prompts
**Improvement:** Context-aware prompts

```typescript
const getPromptText = (phase: StoryPhase, content: ContentLine[]) => {
  if (currentLine?.type === 'dialogue') return '[SPACE] to hear more...';
  if (currentLine?.type === 'action') return '[SPACE] to see what happens...';
  if (phase === 'choice') return 'What do you do?';
  return '[SPACE] continue';
};
```

**Effort:** Very Low (30 min)
**Impact:** Low - Small polish

---

### Route 35: Semantic Color System

**Current:** Ad-hoc color usage
**Improvement:** Consistent semantic colors

```typescript
// src/ui/theme/colors.ts
export const colors = {
  // Paths
  blade: chalk.red,
  stream: chalk.blue,
  shadow: chalk.magenta,

  // Chi
  chi: chalk.yellow,
  inverseChi: chalk.yellow.bold,

  // Status
  damage: chalk.red,
  heal: chalk.green,
  buff: chalk.cyan,
  critical: chalk.red.bold,

  // Narrative
  dialogue: chalk.white,
  narration: chalk.gray,
  thought: chalk.italic,
  chiVoice: chalk.yellow.italic,
};
```

**Effort:** Low (2 hours)
**Impact:** Medium - Polish and clarity

---

### Route 36: High-Resolution Progress Bars

**Current:** Basic block characters
**Improvement:** Unicode eighth blocks for smoother progress

```typescript
const EIGHTH_BLOCKS = ['', '▏', '▎', '▍', '▌', '▋', '▊', '▉', '█'];

// Example output:
// Full:  ████████████████████ 100%
// Mid:   ██████████▌░░░░░░░░░  52%
// Low:   ███▎░░░░░░░░░░░░░░░░  17%
```

**Effort:** Low (1 hour)
**Impact:** Low - Visual polish

---

### Route 37: Modern UI Aesthetic (Rounded Corners)

**Current:** Square box drawing
**Improvement:** Rounded corners for softer feel

```typescript
const BOX_STYLES = {
  rounded: {
    topLeft: '╭', topRight: '╮',
    bottomLeft: '╰', bottomRight: '╯',
    horizontal: '─', vertical: '│',
  },
  double: {
    topLeft: '╔', topRight: '╗',
    bottomLeft: '╚', bottomRight: '╝',
    horizontal: '═', vertical: '║',
  },
};

// Example:
// ╭─────────────────────────────────────╮
// │ ⚔️  COMBAT: Li Wei vs Street Thug   │
// ╰─────────────────────────────────────╯
```

**Effort:** Low (1-2 hours)
**Impact:** Medium - Modern feel

---

### Route 38: Braille Spinners & Loading States

**Current:** Basic spinner
**Improvement:** Context-aware loading with braille spinners

```typescript
const SPINNER_STYLES = {
  braille: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'],
  chi: ['○', '◔', '◑', '◕', '●', '◕', '◑', '◔'],
};

const LOADING_MESSAGES = {
  combat_start: ['Centering your chi...', 'Assessing the threat...'],
  technique_learn: ['The knowledge flows into you...'],
};
```

**Effort:** Low (1 hour)
**Impact:** Low - Polish

---

## Combat System Enhancements

### Route 7: Hit/Miss System

**Current:** All attacks always hit
**Improvement:** Accuracy-based hit calculation

```typescript
function calculateHit(attacker: Character, defender: Character): HitResult {
  const accuracy = 75 + getEffectiveStat(attacker, 'dex') * 2;
  const evasion = getEffectiveStat(defender, 'dex') * 1.5;
  const effectiveAccuracy = Math.max(20, Math.min(95, accuracy - evasion));

  // Miss types: dodge (Flowing Stance), block (defending), miss (generic)
}
```

**Effort:** Medium (2-3 hours + balancing)
**Impact:** Medium - More tactical depth

---

### Route 8: Expanded Combo System

**Current:** Basic starter → followup → finisher
**Improvement:** Branching combos, stance-specific chains

```typescript
const COMBO_TREES: ComboTree = {
  'flowing-palm': {
    canFollowFrom: ['basic-attack', 'open-palm-block'],
    bonuses: { damage: 1.1 },
    branchesTo: ['river-stance-sweep', 'water-needle'],
  },
  'torrent-finish': {
    canFollowFrom: ['river-stance-sweep'],
    bonuses: { damage: 1.5, chiRefund: 5 },
    branchesTo: [], // Finisher
  },
};

// Display:
// COMBO: Flowing Palm → River Sweep → ???
//        [1.1x]         [1.2x]
// Available: Torrent Finish [1.5x + 5 chi]
```

**Effort:** High (6-8 hours)
**Impact:** High - Deep combat system

---

### Route 9: Environmental Combat Effects

**Current:** Combat is location-agnostic
**Improvement:** Location affects combat

```typescript
const ENVIRONMENTS: Record<string, CombatEnvironment> = {
  'alley': {
    name: 'Narrow Alley',
    effects: {
      stanceBonus: {
        'Hungry Stance': 0.1,  // Close quarters favor aggression
        'Flowing Stance': -0.1, // Less room to flow
      },
    },
  },
  'riverside': {
    name: 'Riverside',
    effects: {
      techniqueBonus: {
        'flowing-palm': 0.15,
        'river-stance-sweep': 0.2,
      },
    },
  },
};
```

**Effort:** Medium (3-4 hours)
**Impact:** Medium - More variety

---

### Route 10: Combat Threat System

**Current:** Free action selection
**Improvement:** "Threatened" mechanic limits some actions

```typescript
// When enemies are aggressive, player is "threatened"
// Restricted actions: 'chi-focus', 'flee'

// UI feedback:
// ⚠️ THREATENED - Cannot focus chi or flee!
//    Push back the enemy first.
```

**Effort:** Medium (3-4 hours)
**Impact:** High - Tactical depth

---

### Route 11: Descriptive Health States

**Current:** Numeric HP display
**Improvement:** Also show descriptive state

```typescript
function getHealthDescription(current: number, max: number): string {
  const percent = current / max;
  if (percent >= 0.9) return 'Uninjured';
  if (percent >= 0.7) return 'Lightly Wounded';
  if (percent >= 0.5) return 'Wounded';
  if (percent >= 0.3) return 'Badly Wounded';
  if (percent >= 0.1) return 'Near Death';
  return 'Critical';
}

// For enemies (hide exact HP):
// "The thug staggers weakly"
```

**Effort:** Very Low (1 hour)
**Impact:** Medium - More immersive

---

### Route 40: Turn Manipulation (Grandia-Style)

**Current:** Turns execute in order, no manipulation
**Improvement:** Techniques that delay/cancel enemy turns

```typescript
interface TurnEffect {
  type: 'delay' | 'cancel' | 'interrupt';
  target: Character;
  amount?: number; // For delay: how many turns to push back
}

const TURN_MANIPULATION_TECHNIQUES = {
  'disrupting-palm': {
    effect: { type: 'delay', amount: 2 },
    description: 'Delays enemy turn by 2 positions',
  },
  'shattering-strike': {
    effect: { type: 'cancel' },
    description: 'Cancels enemy action if charging',
    requirement: 'enemy_is_charging',
  },
};
```

**Integration with turn queue:**
- Visual indicator showing delayed enemies
- "DELAYED" status effect on affected characters
- Some techniques only usable on "charging" enemies

**Effort:** Medium (4-5 hours)
**Impact:** High - Strategic depth, rewards timing

---

### Route 41: Status Effect Expansion

**Current:** Limited status effects (Defending, Stunned, Armor Broken)
**Improvement:** Richer status ecosystem

```typescript
const EXPANDED_STATUS_EFFECTS = {
  // Offensive
  'burning': { damage: 3, duration: 3, description: 'Takes fire damage each turn' },
  'bleeding': { damage: 2, duration: 5, stackable: true },
  'marked': { damageTaken: 1.2, duration: 2, description: '+20% damage taken' },

  // Defensive
  'ironSkin': { damageReduction: 0.3, duration: 3 },
  'evasive': { dodgeChance: 0.3, duration: 2 },
  'regenerating': { heal: 5, duration: 3 },

  // Control
  'slowed': { speedMod: 0.5, duration: 2 },
  'silenced': { canUseTechniques: false, duration: 2 },
  'taunted': { mustTarget: 'taunter', duration: 1 },

  // Chi
  'chiDrain': { chiLoss: 3, duration: 3 },
  'chiBlock': { chiGen: 0, duration: 2 },
  'inspired': { chiGen: 1.5, duration: 3 },
};
```

**Effort:** Medium (4-5 hours)
**Impact:** Medium - Combat variety

---

## Story System Enhancements

### Route 12: Relationship Indicators

**Current:** Hidden relationship values
**Improvement:** Show relationship status in UI

```typescript
function getRelationshipTier(value: number): { tier: string; color: string } {
  if (value >= 80) return { tier: 'Sworn Brother', color: 'green' };
  if (value >= 60) return { tier: 'Trusted Ally', color: 'cyan' };
  if (value >= 40) return { tier: 'Friend', color: 'blue' };
  if (value >= 20) return { tier: 'Acquaintance', color: 'white' };
  if (value >= 0) return { tier: 'Stranger', color: 'gray' };
  if (value >= -20) return { tier: 'Wary', color: 'yellow' };
  return { tier: 'Hostile', color: 'red' };
}

// Display:
// Relationships:
//   Master Chen: Trusted Ally [████████░░]
//   Iron Rat:    Acquaintance [████░░░░░░]
```

**Effort:** Low (2 hours)
**Impact:** Medium - Player agency

---

### Route 13: Path Visualization

**Current:** Hidden path scores
**Improvement:** Show path alignment

```
Your Path:
  Blade:  ████████░░░░░░░░ (Strength through force)
  Stream: ████████████░░░░ (Flowing adaptation)
  Shadow: ████░░░░░░░░░░░░ (Cunning deception)
```

**Display options:**
- Always visible in stats
- Show only after path-affecting choices
- Show as "inner reflection" during rest scenes

**Effort:** Low (1-2 hours)
**Impact:** Medium - Player understanding

---

### Route 14: Exploration Enhancement

**Current:** Basic area selection
**Improvement:** Rich area descriptions, hidden discoveries

```
═══ EXPLORING: Back Alley ═══

The smell of rotting food mingles with incense from a nearby temple.

You notice:
  > [Pile of Rags] - Something glints beneath...
  > [Temple Gate] - Monks pass through, ignoring you.
  > [Sewer Grate] - The darkness below beckons.

[↑↓] Select  [ENTER] Investigate  [Q] Leave
```

**Effort:** Medium (3-4 hours)
**Impact:** Medium - World building

---

### Route 15: Memory/Flashback System

**Current:** Linear storytelling
**Improvement:** Unlockable memories that reveal backstory

```typescript
interface Memory {
  id: string;
  title: string;
  trigger: MemoryTrigger;
  content: ContentLine[];
}

type MemoryTrigger =
  | { type: 'item'; itemId: string }
  | { type: 'location'; locationId: string }
  | { type: 'relationship'; character: string; min: number }
  | { type: 'combat'; enemyType: string };

// When triggered:
// ══ A memory surfaces... ══
// [Flashback content]
// ══ The memory fades... ══
```

**Effort:** High (6-8 hours)
**Impact:** High - Deep storytelling

---

### Route 31: Chi Aspect "Voices" System

**Current:** Internal monologue is generic
**Improvement:** Each chi aspect has a distinct "voice" that comments (Disco Elysium-inspired)

```typescript
const CHI_VOICES: ChiVoice[] = [
  {
    aspect: 'inverse',
    personality: 'cunning, pragmatic, whispers uncomfortable truths',
    triggers: [
      {
        condition: { type: 'combat_start', enemyCount: { min: 3 } },
        lines: [
          '[Inverse Chi whispers]: "Three against one? Good. Confusion is your ally."',
        ],
      },
    ],
  },
  {
    aspect: 'flowing',
    personality: 'calm, observant, sees patterns and flow',
    triggers: [
      {
        condition: { type: 'stance_change', to: 'Flowing Stance' },
        lines: [
          '[Flowing Chi]: "Feel the current. Move with it, not against."',
        ],
      },
    ],
  },
];
```

**Integration points:** Combat start/end, major choices, low health, technique mastery

**Effort:** Medium (4-5 hours)
**Impact:** High - Deep character expression, unique to this game

---

### Route 32: Failure as Narrative

**Current:** Failures feel punishing
**Improvement:** Failed checks reveal character and unlock unique content

```typescript
const FAILURE_NARRATIVES: Record<string, FailureOutcome[]> = {
  'intimidation': [
    {
      failureContent: [
        { type: 'narration', text: 'Your voice wavers. The thug sees it—sees *you*.' },
        { type: 'narration', text: 'For a moment, you\'re not Li Wei the beggar. You\'re just... scared.' },
      ],
      revealsCharacter: 'vulnerability',
      unlocksPath: 'stream', // Failure leads to introspection
    },
  ],
};

// Some content ONLY accessible through failure
const FAILURE_EXCLUSIVE_SCENES = [
  'broken-pride',      // Only after failing a public challenge
  'inverse-whispers',  // Only after failing chi meditation 3 times
];
```

**Design principles:**
- Never hard-block progress on a check
- Failed checks reveal vulnerability, building character
- Some paths are BETTER through failure

**Effort:** Medium (3-4 hours)
**Impact:** High - Unique approach, reduces frustration

---

### Route 33: Storylets / Quality-Based Narrative

**Current:** Linear scene progression
**Improvement:** Modular story chunks triggered by stat combinations

```typescript
const STORYLETS: Storylet[] = [
  {
    id: 'inverse-chi-awakening',
    requirements: [
      { type: 'stat', stat: 'inverseChi', min: 10 },
      { type: 'stat', stat: 'chi', max: 5 },
      { type: 'flag', flag: 'hasFailedMeditation', value: true },
    ],
    priority: 10,
    once: true,
    content: { /* Special scene about embracing inverse chi */ },
  },
];

// Check during exploration
function checkStorylets(state: GameState): Storylet | null {
  return STORYLETS
    .filter(s => !state.completedStorylets.includes(s.id))
    .filter(s => meetsRequirements(s.requirements, state))
    .sort((a, b) => b.priority - a.priority)[0] || null;
}
```

**Key insight:** "Add storylets that respond to narratively interesting combinations of game stats."

**Effort:** High (6-8 hours)
**Impact:** High - Emergent, personalized storytelling

---

### Route 34: Environmental Storytelling in Text

**Current:** Basic location descriptions
**Improvement:** Rich environmental details that tell stories

```typescript
const TRAINING_HALL: EnvironmentDetail = {
  base: 'The training hall sits quiet in the afternoon heat.',
  variations: [
    {
      condition: (s) => s.flags.includes('elder-fang-defeated'),
      text: 'The hall feels different now. Lighter. As if a weight has lifted.'
    },
  ],
  sensory: {
    sight: ['Wooden training dummies, surfaces worn smooth.'],
    sound: ['Distant shouts from the street below.'],
    smell: ['Sweat and incense. The smell of dedication.'],
  },
  secrets: [
    {
      id: 'loose-floorboard',
      discoveryCondition: (s) => s.stats.wis >= 8,
      text: 'One floorboard sits slightly higher than the others. Recently disturbed?'
    },
  ],
};
```

**Principles:**
- Describe what's *missing*, not just what's present
- Use sensory details beyond visual
- Environment changes reflect story progression

**Effort:** Medium (3-4 hours)
**Impact:** Medium-High - Immersive world-building

---

## Audio Implementation

### Route 16: Basic Sound Effects

**Current:** No audio
**Improvement:** Optional terminal sounds

**Option A: Terminal Bell (Simplest)**
```typescript
function playBeep(): void {
  process.stdout.write('\x07');
}
// Use for: Critical hit, low health, important choice
```

**Option B: play-sound Package**
```typescript
const SOUNDS = {
  hit: './assets/sounds/hit.wav',
  critical: './assets/sounds/critical.wav',
  levelUp: './assets/sounds/levelup.wav',
};
```

**Effort:** Medium (4-6 hours including assets)
**Impact:** Low-Medium - Nice polish, not essential

---

## Performance Optimization

### Route 17: React Component Memoization

**Current:** Some components re-render unnecessarily
**Improvement:** Wrap pure components with memo

```typescript
export const HealthBar = memo<HealthBarProps>(({ current, max, label, color }) => {
  // ... existing implementation
});

// Also memoize: CharacterStatus, TurnQueue, CombatLog, ContentBlock
```

**Effort:** Very Low (1 hour)
**Impact:** Low - Minor performance gain

---

### Route 18: Combat State Optimization

**Current:** Full state clone on every change
**Improvement:** Selective updates

```typescript
private notifyStateChange(changedFields: (keyof CombatState)[]): void {
  // Only clone and notify changed fields
}
```

**Effort:** Medium (2-3 hours)
**Impact:** Low - Noticeable in long combats

---

### Route 19: TypeScript Config Enhancement

**Recommended additions:**
```json
{
  "compilerOptions": {
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "incremental": true,
    "tsBuildInfoFile": "./.tsbuildinfo"
  }
}
```

**Effort:** Very Low (15 min)
**Impact:** Low - Faster builds, stricter types

---

### Route 20: Ink Static for Combat Log

**Current:** CombatLog re-renders all entries
**Improvement:** Use Ink's `<Static>` for historical entries

```typescript
<Static items={historicalEntries}>
  {(entry, index) => <Text key={index}>{entry.message}</Text>}
</Static>
{/* Latest entry can animate/update */}
```

**Effort:** Low (1 hour)
**Impact:** Low - Better for long combats

---

## Code Quality & Architecture

### Route 21: Event System

**Current:** Direct function calls between systems
**Improvement:** Event-based decoupling

```typescript
type GameEvent =
  | { type: 'COMBAT_START'; enemies: Enemy[] }
  | { type: 'COMBAT_END'; result: CombatResult }
  | { type: 'TECHNIQUE_USED'; technique: string; mastery: number }
  | { type: 'CHOICE_MADE'; choiceId: string; effects: ChoiceEffect[] }
  | { type: 'ACHIEVEMENT_UNLOCKED'; achievementId: string };

// Use cases: Achievement system, analytics, sound effects, auto-save
```

**Effort:** Medium (4-5 hours)
**Impact:** Medium - Better architecture

---

### Route 22: Achievement System

**Current:** No achievements
**Improvement:** Track and reward milestones

```typescript
const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-blood',
    name: 'First Blood',
    description: 'Win your first combat',
    icon: '⚔️',
    condition: { type: 'stat', stat: 'combatsWon', value: 1 },
  },
  {
    id: 'combo-master',
    name: 'Combo Master',
    description: 'Execute a 5-hit combo',
    icon: '🔥',
    condition: { type: 'combat', condition: 'combo_5' },
    hidden: true,
  },
];
```

**Effort:** High (6-8 hours)
**Impact:** Medium - Engagement

---

### Route 23: Debug Mode

**Current:** No debug tools
**Improvement:** Development helpers

```typescript
const DEBUG_COMMANDS = {
  'godmode': () => GameStore.updatePlayer({ hp: 9999, maxHp: 9999 }),
  'addchi': (amount: number) => /* ... */,
  'jumpto': (sceneId: string) => /* ... */,
  'unlock': (techniqueId: string) => /* ... */,
  'stats': () => console.log(JSON.stringify(GameStore.getState(), null, 2)),
};

// Activation: --debug flag or DEBUG=true env var
```

**Effort:** Medium (3-4 hours)
**Impact:** High for development

---

## Build & Distribution

### Route 24: esbuild Migration

**Current:** tsc + pkg
**Improvement:** esbuild for faster builds

```typescript
await esbuild.build({
  entryPoints: ['src/index.tsx'],
  bundle: true,
  platform: 'node',
  target: 'node18',
  outfile: 'dist/index.js',
  minify: process.env.NODE_ENV === 'production',
  treeShaking: true,
});
```

**Benefits:** 10-100x faster than tsc, smaller output, tree shaking

**Effort:** Medium (2-3 hours)
**Impact:** Medium - Better DX

---

### Route 25: SEA (Single Executable Application)

**Current:** pkg for executables
**Improvement:** Node.js native SEA

```json
// sea-config.json
{
  "main": "dist/index.js",
  "output": "sea-prep.blob",
  "useCodeCache": true
}
```

**Benefits:** Native Node.js feature, faster startup, no pkg dependency

**Effort:** Medium (3-4 hours)
**Impact:** Low - Alternative distribution

---

## Testing Strategy

### Route 26: Unit Tests with Vitest

**Current:** No tests
**Improvement:** Test critical systems

```typescript
describe('CombatEngine', () => {
  it('should calculate damage correctly', () => {
    const result = engine.executeAction({
      type: 'attack',
      actor: player,
      target: enemy,
    });
    expect(result.damage).toBeGreaterThan(0);
  });

  it('should apply combo multiplier', () => {
    // Test combo chain
  });
});
```

**Priority test areas:**
1. CombatEngine damage calculation
2. StoryEngine branching logic
3. GameStore state management
4. SaveManager file operations

**Effort:** High (8-12 hours for comprehensive tests)
**Impact:** High - Confidence in changes

---

### Route 27: Integration Tests

**Testing full flows:**

```typescript
describe('Combat Flow Integration', () => {
  it('should complete a full combat encounter', async () => {
    // Setup, simulate turns, verify result
  });
});
```

**Effort:** Medium (4-6 hours)
**Impact:** Medium - System confidence

---

## Content Expansion

### Route 28: Enemy Variety

**Current:** Limited enemy types
**Improvement:** More diverse encounters with archetypes

```typescript
const ENEMY_ARCHETYPES = {
  'brawler': {
    statBias: { str: 1.2, dex: 0.8 },
    preferredActions: ['attack', 'technique'],
    stancePreference: 'Hungry Stance',
  },
  'guardian': {
    statBias: { end: 1.3, str: 0.8 },
    preferredActions: ['defend', 'counter'],
    stancePreference: 'Weathered Stance',
  },
  'martial-artist': {
    statBias: { dex: 1.1, wis: 1.2 },
    preferredActions: ['technique', 'stance'],
    stancePreference: 'Flowing Stance',
  },
};
```

**Effort:** Medium (4-6 hours)
**Impact:** High - Replayability

---

### Route 29: More Techniques

**Current:** Starter technique set
**Improvement:** Path-specific technique trees

```typescript
const TECHNIQUE_TREES = {
  blade: [
    'desperate-strike', 'sharp-eye',           // Early
    'iron-fist', 'relentless-assault',         // Mid
    'dragon-palm', 'hundred-fists',            // Advanced
  ],
  stream: [
    'flowing-palm', 'water-step',
    'river-stance-sweep', 'mist-form',
    'torrent-finish', 'ocean-overwhelm',
  ],
  shadow: [
    'pocket-sand', 'quick-snatch',
    'pressure-point', 'shadow-step',
    'death-touch', 'vanish',
  ],
};
```

**Effort:** High (8-12 hours including balance)
**Impact:** High - Depth

---

### Route 30: Side Content System

**Current:** Linear prologue
**Improvement:** Optional side encounters

```typescript
interface SideContent {
  id: string;
  type: 'random-encounter' | 'side-quest' | 'training' | 'merchant';
  trigger: { type: 'exploration', location: string, chance: number };
  content: Scene;
  rewards: Reward[];
  repeatable: boolean;
}

// Example: Hungry dog encounter with moral choice
```

**Effort:** High (varies with content amount)
**Impact:** High - World feels alive

---

## Accessibility

### Route 39: Accessibility Features

**Current:** No accessibility options
**Improvement:** Support diverse player needs

```typescript
interface AccessibilitySettings {
  textSpeed: 'instant' | 'fast' | 'normal' | 'slow';
  pauseDuration: number;
  highContrast: boolean;
  reduceAnimations: boolean;
  screenReaderMode: boolean;
  confirmDestructiveActions: boolean;
  autoSaveFrequency: 'every_choice' | 'every_scene' | 'manual';
}

// Respect NO_COLOR environment variable
function shouldUseColor(): boolean {
  return !process.env.NO_COLOR && process.stdout.isTTY;
}
```

**Features:**
- Adjustable text speed (including instant for screen readers)
- NO_COLOR environment variable support
- High contrast mode
- Screen reader friendly formatting

**Effort:** Medium (3-4 hours)
**Impact:** Medium - Inclusive design

---

## Progression Systems

### Route 42: New Game Plus System

**Current:** Single playthrough only
**Improvement:** Retain progress across playthroughs

```typescript
interface NewGamePlusState {
  unlockedTechniques: string[];
  masteryLevels: Record<string, number>;
  completedPaths: string[];
  ngPlusLevel: number;
}

const NG_PLUS_FEATURES = {
  retained: ['techniques', 'masteryProgress', 'codexEntries'],
  reset: ['relationships', 'pathScores', 'storyFlags'],
  bonuses: {
    1: { startingTechniques: 2, enemyScaling: 1.1 },
    2: { startingTechniques: 4, enemyScaling: 1.25, exclusiveScene: 'true-ending' },
  },
};
```

**Effort:** Medium (4-5 hours)
**Impact:** High - Major retention feature

---

### Route 43: Codex/Gallery System

**Current:** No collectibles
**Improvement:** Track and display discoveries

```typescript
interface CodexEntry {
  id: string;
  category: 'characters' | 'techniques' | 'locations' | 'lore' | 'enemies';
  title: string;
  content: string;
  discoveryCondition: string;
  unlocked: boolean;
}

// Display completion percentage
// "Lore: 12/24 (50%)"
// "Enemies: 8/15 (53%)"
```

**Effort:** Medium (4-5 hours)
**Impact:** Medium - Completionist appeal

---

## Gameplay Loop Enhancements

### Route 44: Core Loop Enhancement

**Current:** Inconsistent reward pacing
**Improvement:** Structured reward moments

```typescript
// Every combat should reward something
interface CombatRewards {
  always: ['chi_recovery', 'technique_xp'];
  chance: [
    { reward: 'item', chance: 0.3 },
    { reward: 'technique_insight', chance: 0.1 },
  ];
  bonus: {
    noHitsTaken: 'perfectCombat_xpBonus',
    comboUsed: 'comboMaster_xpBonus',
  };
}

// Every choice should acknowledge impact
interface ChoiceFeedback {
  immediate: string;       // "Iron Rat nods approvingly."
  pathDelta?: PathDelta;   // "[Stream +2]"
  relationshipDelta?: RelDelta;
}
```

**Effort:** Medium (3-4 hours)
**Impact:** High - Core experience improvement

---

### Route 45: Meta Progression System

**Current:** Per-playthrough progression only
**Improvement:** Cross-playthrough advancement

```typescript
interface MetaProgression {
  // Unlock new starting options
  startingTechniques: string[];    // Choose 1-2 from unlocked pool
  startingStats: StatAllocation[]; // Earned through achievements

  // Unlock new content
  hiddenScenes: string[];          // Special scenes for experienced players
  challengeModes: string[];        // Hard mode, speed run mode

  // Track mastery
  totalPlaythroughs: number;
  pathsCompleted: Record<string, number>;
  achievementsEarned: string[];
}
```

**Effort:** High (6-8 hours)
**Impact:** High - Long-term retention

---

### Route 46: Reward Pacing System

**Current:** Rewards feel inconsistent
**Improvement:** Designed reward cadence

```typescript
// Target ATBE (Average Time Between Endorphins): 2-4 minutes
const REWARD_SCHEDULE = {
  micro: {
    // Every 30-60 seconds
    types: ['damage_feedback', 'chi_fluctuation', 'stance_effect'],
    frequency: 'constant',
  },
  minor: {
    // Every 2-3 minutes
    types: ['technique_xp_gain', 'enemy_defeated', 'choice_consequence'],
    frequency: 'frequent',
  },
  moderate: {
    // Every 5-10 minutes
    types: ['scene_complete', 'relationship_change', 'mastery_level_up'],
    frequency: 'regular',
  },
  major: {
    // Every 15-30 minutes
    types: ['technique_learned', 'chapter_complete', 'boss_defeated'],
    frequency: 'milestone',
  },
};
```

**Effort:** Low (2-3 hours to audit and adjust)
**Impact:** High - Engagement pacing

---

# Part III: Priority & Planning

---

## 13.0 Implementation Priority Matrix

### Tier 1: Quick Wins (Do First)

| Route | Name | Effort | Impact | Time |
|-------|------|--------|--------|------|
| R19 | TypeScript Config | Very Low | Low | 15 min |
| R17 | Component Memoization | Very Low | Low | 1 hr |
| R11 | Descriptive Health States | Very Low | Medium | 1 hr |
| R06 | Dynamic Prompts | Very Low | Low | 30 min |
| R05 | Combat Message Variety | Low | Medium | 2-3 hrs |
| R36 | High-Res Progress Bars | Low | Low | 1 hr |

### Tier 2: Core Experience (High Priority)

| Route | Name | Effort | Impact | Notes |
|-------|------|--------|--------|-------|
| R01 | Typewriter Effect | Low | High | Biggest UX improvement for effort |
| R35 | Semantic Color System | Low | Medium | Polish and clarity |
| R37 | Rounded Corners | Low | Medium | Modern feel |
| R46 | Reward Pacing | Low | High | Engagement pacing |
| R44 | Core Loop Enhancement | Medium | High | Core experience |
| R31 | Chi Aspect Voices | Medium | High | Unique feature |

### Tier 3: Combat Depth (Medium Priority)

| Route | Name | Effort | Impact | Notes |
|-------|------|--------|--------|-------|
| R02 | Combat Animations | Medium | High | Visual excitement |
| R10 | Threat System | Medium | High | Tactical depth |
| R40 | Turn Manipulation | Medium | High | Strategic depth |
| R04 | ASCII Art Key Moments | Medium | High | Memorable moments |
| R12 | Relationship Indicators | Low | Medium | Player understanding |
| R13 | Path Visualization | Low | Medium | Choice awareness |

### Tier 4: Narrative Depth (Medium-High Priority)

| Route | Name | Effort | Impact | Notes |
|-------|------|--------|--------|-------|
| R32 | Failure as Narrative | Medium | High | Unique approach |
| R34 | Environmental Storytelling | Medium | Medium-High | Immersion |
| R23 | Debug Mode | Medium | High | Development velocity |
| R41 | Status Effect Expansion | Medium | Medium | Combat variety |

### Tier 5: Systems & Polish (Lower Priority)

| Route | Name | Effort | Impact | Notes |
|-------|------|--------|--------|-------|
| R03 | Stance Visuals | Low | Medium | Nice to have |
| R07 | Hit/Miss System | Medium | Medium | Balance required |
| R14 | Exploration Enhancement | Medium | Medium | World building |
| R39 | Accessibility | Medium | Medium | Inclusive design |
| R22 | Achievement System | High | Medium | Engagement |
| R24 | esbuild Migration | Medium | Medium | Build speed |

### Tier 6: Future Investment (Post-MVP)

| Route | Name | Effort | Impact | Notes |
|-------|------|--------|--------|-------|
| R08 | Expanded Combos | High | High | Complex, rewarding |
| R15 | Memory System | High | High | Deep storytelling |
| R33 | Storylets | High | High | Emergent narrative |
| R42 | New Game Plus | Medium | High | Retention |
| R45 | Meta Progression | High | High | Long-term |
| R26 | Unit Tests | High | High | Quality |
| R28-30 | Content Expansion | High | High | After systems solid |

---

## 14.0 Quick Start Guide

### 2-Hour Session

**Goal:** 4 visible improvements

1. **TypeScript Config** (15 min)
   - Add strict options to tsconfig.json

2. **Component Memoization** (45 min)
   - Wrap HealthBar, CharacterStatus, TurnQueue with memo

3. **Descriptive Health States** (30 min)
   - Add text descriptions to enemy health display

4. **Combat Message Variety** (30 min)
   - Create phrase pools for basic attacks

### 4-Hour Session

**Goal:** Core UX polish

1. All from 2-hour session
2. **Typewriter Effect** (2 hrs)
   - Add to ContentRenderer with skip support

### Full Day Session

**Goal:** Major feature + polish

1. All from 4-hour session
2. **Chi Aspect Voices** (4-5 hrs)
   - Implement voice system with triggers
3. **Semantic Color System** (2 hrs)
   - Standardize colors across UI

---

## 15.0 Changelog

| Date | Version | Changes |
|------|---------|---------|
| 2025-12-06 | 1.0 | Initial roadmap created |
| 2025-12-06 | 1.1 | Added Routes 31-39 from CLI game research |
| 2025-12-06 | 2.0 | **Major revision:** Merged comprehensive gameplay research, added Part I theory sections (2.0-12.0), added Routes 40-46, reorganized with master index |

---

**This roadmap is a living document. Update as features are implemented or priorities change.**
