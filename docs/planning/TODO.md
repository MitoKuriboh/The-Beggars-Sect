# The Beggars Sect - TODO & Roadmap

**Last Updated:** 2025-12-05
**Current Phase:** DESIGN (Phase 1 of 6)
**Design Status:** See `DESIGN_STATUS.md` for detailed system breakdown

---

## Current State: SCAFFOLDING COMPLETE

We have ~2,300 lines of design documentation establishing:
- Vision, concept, and core pillars
- Combat system concepts (ATB, stances, combos, chi)
- Progression philosophy (discover, don't grind)
- World and faction foundations
- Technical approach

**BUT:** All 39 identified systems are in "scaffolded" state - concepts exist but lack the specific numbers, content, and details needed for implementation.

**No system is ready for coding yet.**

---

## Phase 1: Design (Current)

### Status: Scaffolding Done, Elaboration Needed

**Completed (Scaffolding):**
- [x] GAME_DESIGN.md - Vision, story, world concepts
- [x] COMBAT_SYSTEM.md - Combat mechanics concepts
- [x] Project structure and package.json
- [x] Basic Ink app placeholder
- [x] DESIGN_STATUS.md - System breakdown tracker

**Not Yet Done (Elaboration):**

#### Priority 1: Core Combat (Blocks everything)
- [ ] **Finalize damage formula** - Exact calculation with real numbers
- [ ] **Technique database** - All techniques with actual stats (power, cost, speed, effects)
- [ ] **Enemy roster** - All enemies with stats, AI patterns, drops
- [ ] **Stat system** - Starting values, growth rates, caps

#### Priority 2: Content Foundation
- [ ] **Chapter 1 script** - Exact story beats, dialogue, encounters
- [ ] **NPC cast** - Elders and key characters with personalities
- [ ] **World map** - Areas for Chapter 1 with connections and encounters

#### Priority 3: Systems Details
- [ ] **Combo chains** - Complete list of valid combos
- [ ] **Item database** - All items with stats and drop rates
- [ ] **Mastery system** - Uses per level, bonuses, UI

#### Priority 4: Polish Details
- [ ] **UI mockups** - All screens finalized
- [ ] **ASCII art** - Key moments and technique animations
- [ ] **Balance parameters** - Difficulty curve, economy

---

## Elaboration Checklist

### Combat System Elaboration
- [ ] Damage formula: `_______________________`
- [ ] Starting HP: `___` Chi: `___`
- [ ] Base stats (STR/DEX/END/WIS): `___/___/___/___`
- [ ] Turn delay per action: Attack `___` Defend `___` Technique `___`
- [ ] Status effect durations: Stun `___` turns
- [ ] Combo timing window: `___` turns

### Technique Database (Target: 25-40)
- [ ] Flowing Stance techniques: `___` defined
- [ ] Weathered Stance techniques: `___` defined
- [ ] Hungry Stance techniques: `___` defined
- [ ] General techniques: `___` defined
- [ ] Each technique has: name, power, cost, speed, effect, mastery bonuses

### Enemy Roster (Target: 12-15)
- [ ] Urban Thugs: `___` types defined
- [ ] Spartans: `___` types defined
- [ ] Lone Wolves: `___` defined
- [ ] Bosses: `___` defined
- [ ] Each enemy has: name, stats, techniques, AI pattern, drops, dialogue

### Chapter 1 Content
- [ ] Opening scene script
- [ ] Tutorial combat design
- [ ] Meeting Beggars Sect scene
- [ ] First elder encounter
- [ ] Chapter 1 boss fight
- [ ] Total estimated playtime: `___` minutes

---

## Design Documents to Create

### Must Have Before Coding
1. `design/TECHNIQUES.md` - Complete technique database
2. `design/ENEMIES.md` - Complete enemy roster
3. `design/CHAPTER_1.md` - Full Chapter 1 design

### Should Have Before Content Phase
4. `design/CHAPTER_2.md`
5. `design/CHAPTER_3.md`
6. `design/NPC_CAST.md`
7. `design/WORLDBUILDING.md`

### Nice to Have
8. `design/UI_MOCKUPS.md`
9. `design/BALANCE.md`
10. `design/ITEMS.md`

---

## Development Roadmap

### Phase 1: Design (Weeks 1-2) - CURRENT
**Goal:** Complete design foundation with real numbers

- [ ] Elaborate combat system (formulas, stats)
- [ ] Create technique database
- [ ] Create enemy roster
- [ ] Write Chapter 1 script
- [ ] Design NPCs

**Exit Criteria:** Can describe any game interaction with specific numbers

---

### Phase 2: Core Systems (Weeks 3-4)
**Goal:** Playable combat prototype

- [ ] Implement turn order (ATB system)
- [ ] Basic attack/defend actions
- [ ] Technique system foundation
- [ ] Chi management
- [ ] Damage calculation
- [ ] Status effects
- [ ] Basic UI framework

**Exit Criteria:** Can fight a test enemy with real mechanics

---

### Phase 3: Content Creation (Weeks 5-6)
**Goal:** Chapter 1 complete

- [ ] Implement Chapter 1 story
- [ ] All Chapter 1 techniques
- [ ] All Chapter 1 enemies
- [ ] NPCs and dialogue
- [ ] Tutorial flow

**Exit Criteria:** Player can complete Chapter 1

---

### Phase 4: AI Integration (Weeks 7-8)
**Goal:** Claude-powered variations

- [ ] Claude API integration
- [ ] Enemy variation generation
- [ ] Dynamic difficulty
- [ ] Procedural dialogue

**Exit Criteria:** Each playthrough feels unique

---

### Phase 5: Polish & Chapters 2-3 (Weeks 9-10)
**Goal:** Full MVP experience

- [ ] Chapter 2 content
- [ ] Chapter 3 content + cliffhanger
- [ ] All 3 stances working
- [ ] Balance tuning

**Exit Criteria:** 3-chapter game is playable start to finish

---

### Phase 6: Showcase & Release (Weeks 11-12)
**Goal:** Public launch

- [ ] ASCII art polish
- [ ] README and documentation
- [ ] Demo video
- [ ] Launch on npm/GitHub

**Exit Criteria:** Game is publicly available

---

## Scoping Decisions (MVP)

**In Scope (v1.0):**
- 3 chapters (not 5)
- 3 stances (Flowing, Weathered, Hungry)
- Core combat mechanics
- Claude AI for enemy variations
- CLI experience

**Deferred to v1.5+:**
- Deceptive stance (4th stance)
- Environmental combat
- Chapters 4-5
- Web version

---

## Open Design Questions

### Must Answer Before Coding
1. What are Li Wei's starting stats?
2. How many uses to master a technique?
3. What's the exact turn order formula?
4. What techniques does Li Wei start with?

### Can Answer During Development
5. Exact enemy stat scaling per chapter
6. Drop rate percentages
7. Chi economy fine-tuning

---

## Technical Prep Checklist

- [x] Project structure created
- [x] package.json configured
- [x] TypeScript setup
- [ ] `npm install` (dependencies not installed)
- [ ] Verify Ink renders correctly
- [ ] Basic game loop architecture

---

## Success Metrics

### Design Phase Success
- [ ] Every technique has 5+ defined stats
- [ ] Every enemy has stats, AI, and drops defined
- [ ] Chapter 1 has scene-by-scene script
- [ ] Can simulate combat on paper/spreadsheet

### Implementation Success
- [ ] Combat feels strategic (average fight: 8-12 turns)
- [ ] Progression feels rewarding (new technique every 10-15 min)
- [ ] AI variations are noticeable
- [ ] CLI is readable and responsive

---

## Notes

### Key Insight from Session 7
The docs are impressive in vision but lack specificity. "Weathered Palm deals heavy damage" means nothing to code. We need "Weathered Palm: Power 25, Chi Cost 5, Speed -2, Effect: 15% armor break".

### Design-First Philosophy
Every feature should be fully designed before coding:
1. What does it do? (concept)
2. How exactly does it work? (mechanics)
3. What are the numbers? (stats)
4. How does it feel? (UX)

---

**Current Focus:** Elaborate combat system, then create technique database.

**Next Session Goal:** Have at least one system move from SCAFFOLDED to ELABORATED.
