# Documentation Guidelines

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

#### For Story Beats
```markdown
### [Scene Name]
**Chapter:** X
**Location:** [Area]
**Trigger:** [What causes this scene]

**Setup:**
[Context before the scene]

**Script:**
[Dialogue and actions with speaker labels]

**Outcomes:**
- [What changes after this scene]

**Gameplay:**
- Combat: [Yes/No - if yes, which enemies]
- Technique Unlock: [If any]
- Area Unlock: [If any]
```

### 4. Single Source of Truth

Each piece of information should exist in ONE place:
- Technique stats → `systems/TECHNIQUES.md`
- Enemy stats → `systems/ENEMIES.md`
- Story scripts → `story/CHAPTER_X.md`
- Formulas → `reference/FORMULAS.md`

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
Narrative content, dialogue, and character details.

**Audience:** Writers, developers
**Tone:** In-universe where appropriate
**Updates:** During content phase

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

## Writing Checklist

Before marking a system as ELABORATED:

- [ ] All stats have numeric values
- [ ] All effects have durations/percentages
- [ ] Unlock/discovery conditions specified
- [ ] Edge cases addressed
- [ ] Examples provided
- [ ] Cross-references added
- [ ] Status updated in DESIGN_STATUS.md

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
