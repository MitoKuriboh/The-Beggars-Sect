# Story Structure: Non-Linear Narrative Design

**Last Updated:** 2025-12-05
**Status:** `[ELABORATED]`
**Version:** 2.0

---

## Design Philosophy

### Core Principles

1. **Player Agency Matters** - Choices should feel meaningful and have visible consequences
2. **Multiple Valid Paths** - No "wrong" way to play; all routes lead to satisfying content
3. **Replayability** - Different playthroughs reveal different aspects of the world
4. **Earned Endings** - The ending you get reflects how you played
5. **Lore Integration** - Branching paths expose different facets of the rich worldbuilding

### What "Non-Linear" Means Here

- **NOT** a fully open world (that's scope creep)
- **IS** meaningful choices at key story junctions
- **IS** different routes through chapters with unique content
- **IS** multiple endings based on accumulated choices
- **IS** optional content that enriches but isn't required

---

## Narrative Architecture

### Game Structure Overview

```
                        ╔═══════════════════╗
                        ║     PROLOGUE      ║
                        ║  (Always Played)  ║
                        ╚═════════╤═════════╝
                                  │
                                  ▼
                        ╔═══════════════════╗
                        ║    CHAPTER 1      ║
                        ║ "Streets of the   ║
                        ║     Forgotten"    ║
                        ╚═════════╤═════════╝
                                  │
                    ┌─────────────┼─────────────┐
                    │             │             │
                    ▼             ▼             ▼
              [Route A]     [Route B]     [Route C]
              The Clan      The Solo      The Shadow
                    │             │             │
                    └─────────────┼─────────────┘
                                  │
                                  ▼
                        ╔═══════════════════╗
                        ║    CHAPTER 2      ║
                        ║  "The Law's Long  ║
                        ║      Reach"       ║
                        ╚═════════╤═════════╝
                                  │
                    ┌─────────────┼─────────────┐
                    │             │             │
                    ▼             ▼             ▼
              [Confront]    [Expose]      [Infiltrate]
                    │             │             │
                    └─────────────┼─────────────┘
                                  │
                                  ▼
                        ╔═══════════════════╗
                        ║    CHAPTER 3      ║
                        ║  "The Hollow at   ║
                        ║   the Summit"     ║
                        ╚═════════╤═════════╝
                                  │
                    ┌─────────────┼─────────────┐
                    │             │             │
                    ▼             ▼             ▼
              [Ending A]    [Ending B]    [Ending C]
              Destroyer     Reformer      Wanderer
```

---

## The Alignment System: PATH CHOICES

Rather than traditional morality, choices affect Li Wei's **approach** to the world:

### Three Paths

| Path | Philosophy | Gameplay Tendency | Endings Access |
|------|-----------|-------------------|----------------|
| **The Blade** (刃) | "Power changes the world" | Aggressive, direct confrontation | Destroyer, Reformer |
| **The Stream** (流) | "Adaptation overcomes all" | Diplomatic, flexible solutions | Reformer, Wanderer |
| **The Shadow** (影) | "Truth hides in darkness" | Stealth, investigation, secrets | Destroyer, Wanderer |

**Key Design Note:** These aren't "good/evil" - a Blade player can be honorable, a Shadow player can be compassionate. They represent HOW Li Wei approaches problems.

### Tracking Choices

Every major choice shifts alignment:

```
                    BLADE
                      ▲
                     /│\
                    / │ \
                   /  │  \
                  /   │   \
                 /    │    \
                /     │     \
               /      │      \
              /       ●       \
             /    (start)      \
            /                   \
           /                     \
          ▼───────────────────────▼
      STREAM                   SHADOW
```

**Threshold System:**
- 0-3 points in any path: Neutral
- 4-6 points: Leaning toward that path
- 7+ points: Committed to that path

---

## Prologue: "The Awakening"

**Length:** ~20 minutes
**Purpose:** Tutorial, establish mystery, set tone
**Branching:** None (establishes baseline)

### Structure

```
Scene P1: The Void
    ↓
Scene P2: Awakening in the Alley
    ↓
Scene P3: First Survival (tutorial combat)
    ↓
Scene P4: Days of Nothing (narrative)
    ↓
Scene P5: Old Dao's Gift
    ↓
Scene P6: The Hidden Corner (arrive at sect)
    ↓
[Chapter 1 Begins]
```

**Tutorial Covers:**
- Basic movement
- Combat fundamentals
- Dialogue system
- Choice system (small preview)

---

## Chapter 1: "Streets of the Forgotten"

**Length:** ~90 minutes
**Primary Location:** Lower Streets, Beggar's Corner, Gang Territory
**Boss Options:** Razor OR alternative paths avoid direct confrontation
**Key NPCs:** Elder Chen, Elder Wu, Brother Feng, Razor, Scarred Jin

### Chapter 1 Structure

```
                    ┌────────────────────────┐
                    │  1.1: The Hidden Home  │
                    │  (Introduction to sect)│
                    └───────────┬────────────┘
                                │
                    ┌───────────┴────────────┐
                    │   1.2: First Lessons   │
                    │  (Flowing techniques)  │
                    └───────────┬────────────┘
                                │
              ╔═════════════════╧═════════════════╗
              ║       MAJOR CHOICE POINT 1        ║
              ║    "How do you handle Feng's     ║
              ║          challenge?"              ║
              ╚═════════════════╤═════════════════╝
                                │
          ┌─────────────────────┼─────────────────────┐
          │                     │                     │
          ▼                     ▼                     ▼
    [Accept Duel]        [Decline, Help]       [Investigate Why]
    +1 Blade              +1 Stream             +1 Shadow
          │                     │                     │
          ▼                     ▼                     ▼
    1.3A: Proving       1.3B: Building        1.3C: Secrets
    Ground Duel         Trust Through         of the Corner
                        Service
          │                     │                     │
          └─────────────────────┼─────────────────────┘
                                │
                    ┌───────────┴────────────┐
                    │  1.4: Second Teacher   │
                    │ (Weathered techniques) │
                    └───────────┬────────────┘
                                │
                    ┌───────────┴────────────┐
                    │  1.5: The Gang Problem │
                    │(Razor threatens Corner)│
                    └───────────┬────────────┘
                                │
              ╔═════════════════╧═════════════════╗
              ║       MAJOR CHOICE POINT 2        ║
              ║   "How do you deal with Razor?"   ║
              ╚═════════════════╤═════════════════╝
                                │
          ┌─────────────────────┼─────────────────────┐
          │                     │                     │
          ▼                     ▼                     ▼
    [Challenge Him     [Negotiate/         [Find Leverage
     Directly]          Unite Against       to Blackmail]
    +2 Blade            Common Enemy]       +2 Shadow
                        +2 Stream
          │                     │                     │
          ▼                     ▼                     ▼
    1.6A: BOSS         1.6B: The           1.6C: Shadow
    Razor Combat       Alliance Path       Manipulation
          │                     │                     │
          ▼                     ▼                     ▼
    [Razor Defeated]   [Razor Ally         [Razor Exposed
                        (temporary)]        and Exiled]
          │                     │                     │
          └─────────────────────┼─────────────────────┘
                                │
                    ┌───────────┴────────────┐
                    │ 1.7: Aftermath & Setup │
                    │ (Spartans hear rumors) │
                    └───────────┬────────────┘
                                │
                    [CHAPTER 2 BEGINS]
```

### Chapter 1 Consequences

| Path | Razor's Fate | Street Status | Chapter 2 Impact |
|------|-------------|---------------|------------------|
| Blade | Defeated, humiliated | Li Wei feared as fighter | Spartans hunt openly |
| Stream | Temporary ally | Li Wei seen as diplomat | Razor can help later |
| Shadow | Exposed, exiled | Li Wei's role hidden | Spartans don't notice |

---

## Chapter 2: "The Law's Long Reach"

**Length:** ~120 minutes
**Primary Location:** Labor Ring, Commerce Ring, Garrison Ring
**Boss Options:** Commander Vex (multiple approaches)
**Key NPCs:** Elder Mei, Commander Vex, Sergeant Yun, Dr. Mae (flashback), Agent Thorn

### Chapter 2 Structure

```
                    ┌────────────────────────┐
                    │  2.1: Growing Shadows  │
                    │(Initiative/Spartans)   │
                    └───────────┬────────────┘
                                │
          [Branch based on Ch1 ending]
                                │
          ┌─────────────────────┼─────────────────────┐
          │                     │                     │
          ▼                     ▼                     ▼
    [Blade Path:          [Stream Path:         [Shadow Path:
     Public Enemy]         Under Scrutiny]       Unknown Player]
          │                     │                     │
          │                     │                     │
          ▼                     ▼                     ▼
    2.2A: Hunted         2.2B: Careful        2.2C: Hidden
    Through Streets       Navigation          Investigation
          │                     │                     │
          └─────────────────────┼─────────────────────┘
                                │
                    ┌───────────┴────────────┐
                    │   2.3: Hungry Lessons  │
                    │(Elder Mei's techniques)│
                    └───────────┬────────────┘
                                │
                    ┌───────────┴────────────┐
                    │  2.4: Memory Fractures │
                    │ (Flashback to escape)  │
                    └───────────┬────────────┘
                                │
              ╔═════════════════╧═════════════════╗
              ║       MAJOR CHOICE POINT 3        ║
              ║  "The Initiative is hunting you. ║
              ║         How do you respond?"      ║
              ╚═════════════════╤═════════════════╝
                                │
          ┌─────────────────────┼─────────────────────┐
          │                     │                     │
          ▼                     ▼                     ▼
    [Strike First:       [Find Allies         [Dig Into
     Hit Their           Within the           Their
     Operations]         System]              Secrets]
    +2 Blade             +2 Stream            +2 Shadow
          │                     │                     │
          ▼                     ▼                     ▼
    2.5A: Raid on       2.5B: Sergeant       2.5C: Dr. Mae's
    Safe House          Yun's Doubt          Dead Drop
          │                     │                     │
          └─────────────────────┼─────────────────────┘
                                │
                    ┌───────────┴────────────┐
                    │  2.6: Climbing Higher  │
                    │ (Into the Garrison)    │
                    └───────────┬────────────┘
                                │
              ╔═════════════════╧═════════════════╗
              ║       MAJOR CHOICE POINT 4        ║
              ║  "Commander Vex stands in your   ║
              ║       way. What do you do?"       ║
              ╚═════════════════╤═════════════════╝
                                │
          ┌─────────────────────┼─────────────────────┐
          │                     │                     │
          ▼                     ▼                     ▼
    [Defeat Him         [Expose the          [Slip Past
     in Combat]         Initiative to        Without
                        Him]                 Confrontation]
    +2 Blade            +2 Stream            +2 Shadow
          │                     │                     │
          ▼                     ▼                     ▼
    2.7A: BOSS          2.7B: BOSS           2.7C: Stealth
    Full Combat         (Dialogue-           Escape
                        reduced HP)
          │                     │                     │
          ▼                     ▼                     ▼
    [Vex Defeated,     [Vex Questions       [Vex Never
     Suspicious]        His Orders]          Sees You]
          │                     │                     │
          └─────────────────────┼─────────────────────┘
                                │
                    ┌───────────┴────────────┐
                    │  2.8: The Invitation   │
                    │(Hollow One reaches out)│
                    └───────────┬────────────┘
                                │
                    [CHAPTER 3 BEGINS]
```

### Chapter 2 Unique Content Per Path

**BLADE PATH (2.2A-2.5A):**
- Scarred Jin revenge encounter (more challenging)
- Raid on Initiative safe house (discover Subject records)
- Agent Thorn boss fight before Vex
- Unlock **Iron Palm** early

**STREAM PATH (2.2B-2.5B):**
- Meeting with Sergeant Yun (potential future ally)
- Negotiate passage through checkpoints
- Vex dialogue trees reveal his brother's fate
- Unlock **Beggar's Feint** mastery

**SHADOW PATH (2.2C-2.5C):**
- Infiltrate Initiative outpost
- Dr. Mae's coded messages (full Initiative history)
- Map of the Undercity
- Unlock **Silent Step** technique

---

## Chapter 3: "The Hollow at the Summit"

**Length:** ~90 minutes
**Primary Location:** Wild Lands, Forgotten Temple, Mountain Peak
**Boss:** The Hollow One (all paths lead here, different contexts)
**Key NPCs:** The Hollow One, Old Dao (returns), Director Shen (mentioned/glimpsed)

### Chapter 3 Structure

```
                    ┌────────────────────────┐
                    │   3.1: The Summons     │
                    │(Hollow One's challenge)│
                    └───────────┬────────────┘
                                │
                    ┌───────────┴────────────┐
                    │  3.2: Leaving the City │
                    │ (Through the Old Gate) │
                    └───────────┬────────────┘
                                │
          [Branch based on accumulated path]
                                │
          ┌─────────────────────┼─────────────────────┐
          │                     │                     │
          ▼                     ▼                     ▼
    [Blade Dominant:     [Stream Dominant:    [Shadow Dominant:
     "Power to          "Understanding       "Truth Above
      Change"]           Brings Peace"]       All Else"]
          │                     │                     │
          ▼                     ▼                     ▼
    3.3A: Combat       3.3B: Diplomatic      3.3C: Discovery
    Through            Passage               Through
    Mountain           (Lone Wolves)         Hidden Paths
          │                     │                     │
          └─────────────────────┼─────────────────────┘
                                │
                    ┌───────────┴────────────┐
                    │ 3.4: The Testing Stones│
                    │  (Li Wei's chi reacts) │
                    └───────────┬────────────┘
                                │
                    ┌───────────┴────────────┐
                    │ 3.5: Memory Complete   │
                    │(Full flashback: escape)│
                    └───────────┬────────────┘
                                │
                    ┌───────────┴────────────┐
                    │ 3.6: The Forgotten     │
                    │       Temple           │
                    └───────────┬────────────┘
                                │
              ╔═════════════════╧═════════════════╗
              ║      THE HOLLOW ONE ENCOUNTER     ║
              ║   (3 Phases, path affects entry)  ║
              ╚═════════════════╤═════════════════╝
                                │
          ┌─────────────────────┼─────────────────────┐
          │                     │                     │
          ▼                     ▼                     ▼
    Phase 1:            Phase 1:             Phase 1:
    "Show Me            "Tell Me             "Prove You
     Your Strength"      Your Purpose"        See Clearly"
    (Full combat)       (Dialogue +          (Puzzle +
                         combat)              stealth)
          │                     │                     │
          ▼                     ▼                     ▼
    Phase 2: Mirror (Same for all - Hollow One copies Li Wei's style)
          │                     │                     │
          ▼                     ▼                     ▼
    Phase 3: True Form (Hollow One goes all-out)
          │                     │                     │
          └─────────────────────┼─────────────────────┘
                                │
              ╔═════════════════╧═════════════════╗
              ║         FINAL CHOICE              ║
              ║  "The Dog Beating Staff awaits.   ║
              ║      What do you seek?"           ║
              ╚═════════════════╤═════════════════╝
                                │
          ┌─────────────────────┼─────────────────────┐
          │                     │                     │
          ▼                     ▼                     ▼
    "Power to         "The Truth to        "Freedom to
     Destroy the       Share With All"      Walk My
     System"                                 Own Path"
          │                     │                     │
          ▼                     ▼                     ▼
    ENDING A:          ENDING B:            ENDING C:
    DESTROYER          REFORMER             WANDERER
```

---

## The Three Endings

### Ending A: The Destroyer

**Requirements:** 7+ Blade points OR final choice = "Destroy"

**Summary:**
Li Wei claims the Dog Beating Staff with the intention of tearing down the Aptitude System entirely. He descends from the mountain as a symbol of revolution.

**Final Cutscene:**
```
[Li Wei stands at the temple entrance, staff in hand]

THE HOLLOW ONE: You've chosen the path of the blade. The Array will
fall—but what rises from the ashes?

LI WEI: Something better. Or nothing at all. Either way, this lie
ends with me.

[He looks toward Haven's Cradle in the distance]

LI WEI: They measured us. Sorted us. Told us what we could be.

[His inverse chi flares, visible now]

LI WEI: I am what they cannot measure. And I will show them ALL
what "nothing" can become.

[NARRATOR TEXT]
Li Wei returned to Haven's Cradle not as a beggar, but as a storm.
The Dog Beating Staff sang with power no Array could comprehend.
The system that had sorted millions trembled.

Revolution had a name.
Revolution had a face.
Revolution had begun.

[TO BE CONTINUED...]
```

**Sequel Hook:** Book 2 follows Li Wei leading open rebellion.

---

### Ending B: The Reformer

**Requirements:** 7+ Stream points OR final choice = "Truth"

**Summary:**
Li Wei takes the Staff but seeks to change the system from within—to prove to everyone, including those in power, that the Array is flawed and that worth cannot be measured.

**Final Cutscene:**
```
[Li Wei holds the Staff gently, contemplating]

THE HOLLOW ONE: You could burn it all down. Why don't you?

LI WEI: Because burning leaves only ashes. I want to grow something new.

[He looks at the Staff]

LI WEI: The Array didn't just hurt those it marked as worthless. It
poisoned those it marked as worthy. Made them believe the lie too.

[Beat]

LI WEI: Commander Vex. The Spartans. Even the High Sects. They're
trapped in the same cage—they just can't see the bars.

THE HOLLOW ONE: And you'll show them?

LI WEI: I'll give them a choice. Something Wei Zhong never did.

[NARRATOR TEXT]
Li Wei returned to Haven's Cradle as a question, not an answer.
He carried proof that the Array was flawed—but he offered it
as a gift, not a weapon.

Some listened. Some didn't.
But the conversation had begun.
And conversations, unlike revolutions, have no end.

[TO BE CONTINUED...]
```

**Sequel Hook:** Book 2 follows Li Wei building alliances across factions.

---

### Ending C: The Wanderer

**Requirements:** 7+ Shadow points OR final choice = "Freedom"

**Summary:**
Li Wei refuses the larger conflict. He takes the Staff but chooses to disappear, to walk his own path rather than become a symbol for anyone's cause.

**Final Cutscene:**
```
[Li Wei turns away from the cave, Staff in hand]

THE HOLLOW ONE: You're leaving? Without claiming your destiny?

LI WEI: My destiny? The prophecy spoke of someone who "flows backward."
It didn't say I had to be a hero. Or a destroyer. Or anything.

[He smiles slightly]

LI WEI: I spent my whole life being told what I was. Subject 17.
F-grade. Beggar. Weapon. Savior.

[He looks at the Staff]

LI WEI: For once, I want to just... be.

THE HOLLOW ONE: The Initiative will keep hunting you.

LI WEI: Let them hunt. I've learned how to disappear.

[NARRATOR TEXT]
Li Wei walked away from fate itself.
The prophecy remained unfulfilled—or perhaps it fulfilled itself
in ways no one predicted.

Somewhere in the endless realms beyond Haven's Cradle,
a wanderer carried a staff and asked no questions of the sky.

What he found, he never told.
What he became, only the stars know.

[TO BE CONTINUED...]
```

**Sequel Hook:** Book 2 follows Li Wei's discoveries in the wider multiverse.

---

## Optional Content & Side Stories

### Chapter 1 Optionals

| Content | Location | How to Access | Rewards |
|---------|----------|---------------|---------|
| Grandmother Bone's Blessing | Bone Yard | Explore after 1.4 | +10 HP permanently |
| The Mark Wall Secret | Gang Territory | Shadow path or explore | Lore about Beggars' past |
| Brother Feng's Past | Training Ground | High Feng friendship | Emotional scene, +1 Stream |
| Razor's Hidden Room | Gang Territory | Shadow path only | Books reveal Razor's intelligence |

### Chapter 2 Optionals

| Content | Location | How to Access | Rewards |
|---------|----------|---------------|---------|
| The Sunken Market | Undercity | Shadow path discovery | Technique scroll (pre-ban) |
| Sergeant Yun's Choice | Garrison Ring | Stream path | Ally in Book 2 |
| Agent Thorn's Doubt | Various | Blade path | Initiative Intel |
| The Broken Cup Tea House | Commerce Ring | Any path | NPC stories, atmosphere |

### Chapter 3 Optionals

| Content | Location | How to Access | Rewards |
|---------|----------|---------------|---------|
| Old Dao's Truth | Mountain Path | Find all shrines | Reveals Dao's nature (partial) |
| Testing Stones Sequence | Wild Lands | Complete perfectly | Technique mastery |
| Temple Memorial Names | Forgotten Temple | Read all names | Connection to HISTORY.md |
| The Hollow One's Past | Temple | Ask questions | Reveals Wei Zhong connection |

---

## Choice Consequences Summary

### Razor's Fate (Chapter 1)

| Choice | Immediate | Chapter 2 | Chapter 3 |
|--------|-----------|-----------|-----------|
| Defeated | Controls gangs | Scarred Jin wants revenge | Razor mentioned in endings |
| Allied | Uneasy truce | Can call for gang help | Razor messenger in Ch3 |
| Exiled | Gang chaos | Scarred Jin takes over | Razor appears as lone wolf |

### Commander Vex (Chapter 2)

| Choice | Immediate | Chapter 3 | Ending Impact |
|--------|-----------|-----------|---------------|
| Defeated | Spartans hunt harder | Initiative takes over | Vex mentioned as martyr |
| Convinced | Vex doubts orders | Vex provides intel | Reformer ending enhanced |
| Evaded | No direct conflict | Vex continues hunting | Shadow ending enhanced |

### The Hollow One (Chapter 3)

| Interaction | Boss Difficulty | Revelation Depth | Ending Access |
|-------------|-----------------|------------------|---------------|
| Full combat | Hardest | Minimal dialogue | Destroyer |
| Mixed | Medium | Moderate | All |
| Puzzle/stealth | Easier combat | Full backstory | Wanderer |

---

## Technical Implementation Notes

### Tracking Variables

```typescript
interface StoryState {
  // Path alignment (0-10 each)
  bladePath: number;
  streamPath: number;
  shadowPath: number;

  // Major choices
  ch1RazorOutcome: 'defeated' | 'allied' | 'exiled';
  ch2VexOutcome: 'defeated' | 'convinced' | 'evaded';
  ch3FinalChoice: 'destroy' | 'reform' | 'wander';

  // Relationship tracking
  fengFriendship: number;  // 0-5
  sectStanding: number;    // 0-10

  // Optional flags
  grandmotherBoneBlessing: boolean;
  foundMarkWallSecret: boolean;
  // ... etc
}
```

### Scene Loading

Scenes load based on state:

```typescript
function getChapter2Start(state: StoryState): SceneId {
  if (state.bladePath >= 7) return '2.2A_hunted';
  if (state.streamPath >= 7) return '2.2B_careful';
  if (state.shadowPath >= 7) return '2.2C_hidden';
  // Default to most balanced
  return '2.2B_careful';
}
```

---

## Dialogue System

### Choice Presentation

Choices presented with subtle hints:

```
What do you do?

> [Challenge him to a duel] (Direct)
> [Offer to help with his problem] (Diplomatic)
> [Ask why he's really upset] (Perceptive)
```

"Direct" = Blade, "Diplomatic" = Stream, "Perceptive" = Shadow

### Relationship Tracking

NPC reactions change based on accumulated choices:

```typescript
function getFengDialogue(friendship: number): string {
  if (friendship >= 4) return feng_loyal_dialogue;
  if (friendship >= 2) return feng_friendly_dialogue;
  return feng_neutral_dialogue;
}
```

---

## Playtime Estimates

| Content | First Playthrough | Repeat (Different Path) |
|---------|-------------------|-------------------------|
| Prologue | 20 min | 10 min (skip tutorial) |
| Chapter 1 | 90 min | 60 min |
| Chapter 2 | 120 min | 80 min |
| Chapter 3 | 90 min | 60 min |
| **Total** | **5-6 hours** | **3-4 hours** |

**Full content (all paths):** ~12-15 hours across multiple playthroughs

---

## Document Navigation

| Document | Content |
|----------|---------|
| **PROLOGUE.md** | Tutorial section, awakening sequence |
| **CHAPTER_1.md** | Streets of the Forgotten - full script |
| **CHAPTER_2.md** | The Law's Long Reach - full script |
| **CHAPTER_3.md** | The Hollow at the Summit - full script |
| **NPC_CAST.md** | Character implementation details |
| **ENEMIES.md** | Combat encounters |
| **TECHNIQUES.md** | Player abilities |

---

## Changelog

| Date | Version | Change |
|------|---------|--------|
| 2025-12-05 | 2.0 | Complete overhaul with non-linear design |
| 2025-12-05 | 1.0 | Initial linear structure |
