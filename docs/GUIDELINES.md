# Documentation Guidelines

**Last Updated:** 2025-12-05
**Version:** 2.0

How to write and maintain documentation for The Beggars Sect.

---

## Core Principles

### 1. Be Specific, Not Vague

**Bad:**
> Weathered Palm deals heavy damage and has a chance to break armor.

**Good:**
> **Weathered Palm**
> - Power: 25
> - Chi Cost: 5
> - Speed Modifier: -2
> - Effect: 15% chance to apply Armor Break (3 turns, -20% defense)
> - Mastery Bonuses:
>   - Level 2: +5 Power
>   - Level 3: Armor Break chance +10%
>   - Level 4: +3 Power
>   - Level 5: Armor Break duration +1 turn

### 2. Numbers Are Required

Every game element needs quantified stats. If you can't give a number, use a placeholder with `[TBD]` and note what needs deciding.

**Required fields for techniques:**
- Power (damage multiplier)
- Chi Cost
- Speed Modifier (turn delay impact)
- Effect (with percentages and durations)
- Mastery bonuses (per level)
- Unlock condition

**Required fields for enemies:**
- HP, STR, DEX, END, WIS
- Techniques (with usage conditions)
- AI Pattern description
- Drop table (items and rates)
- Spawn locations
- Dialogue lines (battle start, low HP, defeat)

### 3. Use Consistent Formatting

#### For Techniques
```markdown
### [Technique Name]
**Stance:** [Flowing/Weathered/Hungry/Any]
**Unlock:** [How player gets it]

| Stat | Value |
|------|-------|
| Power | X |
| Chi Cost | X |
| Speed | +X/-X |
| Effect | Description |

**Mastery Progression:**
- Lv1: Base ability
- Lv2: [Bonus]
- Lv3: [Bonus]
- Lv4: [Bonus]
- Lv5: [Bonus]

**Combo Links:**
- Starter for: [Combo Name]
- Follow-up to: [Technique Name]
```

#### For Enemies
```markdown
### [Enemy Name]
**Faction:** [Thugs/Spartans/Lone Wolves/Boss]
**Tier:** [Common/Uncommon/Rare/Boss]
**Chapters:** [Where they appear]

**Stats:**
| Stat | Value |
|------|-------|
| HP | X |
| STR | X |
| DEX | X |
| END | X |
| WIS | X |
| Speed | X |

**Techniques:**
1. [Technique] - Used when [condition]
2. [Technique] - Used when [condition]

**AI Pattern:**
[Description of how they fight]

**Drops:**
- [Item] (X%)
- [Item] (X%)

**Dialogue:**
- Battle Start: "[Line]"
- Low HP: "[Line]"
- Victory: "[Line]"
- Defeat: "[Line]"
```

#### For Story Scenes
```markdown
### Scene X.Y: [Scene Name]
**Type:** [Cutscene/Combat/Exploration/Dialogue/Puzzle]
**Location:** [Area]
**Player Input:** [Description of player interaction]

**Purpose:**
- [Narrative purpose]
- [Gameplay purpose]

**Script:**
[Dialogue and actions with speaker labels]

**Outcomes:**
- [What changes after this scene]

**Gameplay:**
- Combat: [Yes/No - if yes, which enemies]
- Technique Unlock: [If any]
- Story Flags: [What gets set]
```

#### For Choice Points (Non-Linear)
```markdown
### Choice Point: [Name]
**Location:** Scene X.Y
**Trigger:** [What causes this choice]

**Options:**
| Choice | Path Points | Immediate Effect | Long-term Effect |
|--------|-------------|------------------|------------------|
| [Option A] | +2 Blade | [Effect] | [Effect] |
| [Option B] | +2 Stream | [Effect] | [Effect] |
| [Option C] | +2 Shadow | [Effect] | [Effect] |

**All Options Lead To:** [Next scene or convergence point]
```

#### For Path Variations
```markdown
### Scene X.Y[A/B/C]: [Scene Name] ([Path] Variation)
**Prerequisite:** [Path] dominant OR [previous choice]
**Exclusive Content:** [What's unique to this path]

[Scene content...]

**Path Bonus:**
- Technique: [If any]
- Item: [If any]
- Relationship: [If any]
```

### 4. Single Source of Truth

Each piece of information should exist in ONE place:
- Technique stats → `systems/TECHNIQUES.md`
- Enemy stats → `systems/ENEMIES.md`
- Story structure → `story/STORY_STRUCTURE.md`
- Story scripts → `story/PROLOGUE.md`, `story/CHAPTER_X.md`
- Formulas → `reference/FORMULAS.md`
- Lore/world → `lore/` directory

Cross-reference other docs, don't duplicate content.

### 5. Mark Status Clearly

Use these status markers:
- `[SCAFFOLDED]` - Concept exists, needs numbers
- `[ELABORATED]` - Fully specified, ready for implementation
- `[IMPLEMENTED]` - In the codebase
- `[TBD]` - Needs a decision
- `[PLACEHOLDER]` - Temporary value, needs balancing

### 6. Version Your Changes

At the top of each doc, include:
```markdown
**Last Updated:** YYYY-MM-DD
**Status:** [Status]
**Version:** X.Y
```

---

## Document Types

### Design Documents (`design/`)
High-level vision and concepts. These set direction but don't specify implementation details.

**Audience:** Anyone understanding the game
**Tone:** Inspirational, conceptual
**Updates:** Rarely, only for major vision changes

### System Documents (`systems/`)
Precise specifications with exact numbers. These are the blueprint for implementation.

**Audience:** Developers, designers
**Tone:** Technical, precise
**Updates:** During design phase, then locked

### Story Documents (`story/`)
Narrative content, dialogue, branching paths, and character details.

**Key Files:**
- `STORY_STRUCTURE.md` - Master document for non-linear design, paths, endings
- `PROLOGUE.md` - Tutorial and awakening sequence
- `CHAPTER_X.md` - Individual chapters with branching scenes
- `NPC_CAST.md` - Character details and dialogue patterns

**Audience:** Writers, developers
**Tone:** In-universe where appropriate
**Updates:** During content phase

### Lore Documents (`lore/`)
World-building, history, and reference material.

**Key Files:**
- `WORLDBUILDING.md` - Universe bible, aptitude system
- `CHI_SYSTEM.md` - Eight aspects, inverse chi mechanics
- `SECTS.md` - 12 martial arts sects
- `HISTORY.md` - Full timeline
- `CHARACTERS.md` - Deep character profiles
- `GLOSSARY.md` - Chinese terminology

**Audience:** Writers, designers, developers
**Tone:** Encyclopedic, in-universe
**Updates:** During design phase, then stable

### Planning Documents (`planning/`)
Project management, status tracking, and session notes.

**Audience:** Development team
**Tone:** Practical, actionable
**Updates:** Every session

### Reference Documents (`reference/`)
Quick lookup tables and consolidated formulas.

**Audience:** Anyone working on the game
**Tone:** Minimal prose, maximum data
**Updates:** As source docs change

---

## Writing Checklists

### Before marking a system as ELABORATED:

- [ ] All stats have numeric values
- [ ] All effects have durations/percentages
- [ ] Unlock/discovery conditions specified
- [ ] Edge cases addressed
- [ ] Examples provided
- [ ] Cross-references added
- [ ] Status updated in DESIGN_STATUS.md

### Before marking a story chapter as ELABORATED:

- [ ] All scenes have Type, Location, Player Input
- [ ] Choice points documented with path point values
- [ ] Path variations (A/B/C) written for major divergences
- [ ] Combat encounters have enemy references
- [ ] Technique unlocks specified per path
- [ ] Story flags documented
- [ ] Convergence points identified
- [ ] Cross-references to STORY_STRUCTURE.md

---

## Non-Linear Story System

### The Three Paths

| Path | Chinese | Philosophy | Gameplay Style |
|------|---------|------------|----------------|
| **Blade** | 刃 | "Power changes the world" | Direct confrontation, combat focus |
| **Stream** | 流 | "Adaptation overcomes all" | Diplomacy, flexibility, dialogue |
| **Shadow** | 影 | "Truth hides in darkness" | Stealth, investigation, secrets |

### Path Point Rules

- Choices award +2 path points to one path
- 7+ points in a path = "committed" (affects ending eligibility)
- Path points are tracked across the entire game
- Final choice can override accumulated path (player agency)

### Writing Path Variations

When writing branching content:

1. **Major divergences** get separate scenes (1.5A, 1.5B, 1.5C)
2. **Minor divergences** use conditional dialogue within the same scene
3. **All paths must converge** before major story beats
4. **No path is "wrong"** - each provides unique content and rewards

### Endings

| Ending | Requirement | Book 2 Hook |
|--------|-------------|-------------|
| Destroyer | 7+ Blade OR final Blade choice | "The Falling Spire" |
| Reformer | 7+ Stream OR final Stream choice | "The Opening Path" |
| Wanderer | 7+ Shadow OR final Shadow choice | "The Endless Road" |

---

## Common Mistakes

### Don't: Leave qualitative descriptions
> "Fast attack that deals light damage"

### Do: Quantify everything
> "Speed: +3, Power: 12"

---

### Don't: Duplicate information
> Copying technique stats into both COMBAT_SYSTEM.md and TECHNIQUES.md

### Do: Reference the canonical source
> "See `systems/TECHNIQUES.md` for full technique database"

---

### Don't: Mix concepts and specs
> A doc that's half vision statement, half stat tables

### Do: Separate by document type
> Vision in `design/`, specs in `systems/`

---

### Don't: Leave placeholder text in final docs
> "TODO: Add mastery bonuses"

### Do: Mark placeholders explicitly
> "Mastery Bonuses: [TBD - needs playtesting]"

---

## Templates

Templates for common documents are in `docs/templates/` (TODO: create these).

---

## Questions?

If unsure where something belongs or how to format it, check existing docs for patterns or make a note in the relevant doc with `[QUESTION: ...]`.
