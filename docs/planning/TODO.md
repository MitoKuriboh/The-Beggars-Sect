# The Beggars Sect - TODO & Roadmap

**Last Updated:** 2025-12-06
**Current Phase:** PHASE 2 COMPLETE - Moving to Phase 3 Content & AI
**Design Status:** COMPLETE - See `DESIGN_STATUS.md`

---

## Current State: PHASE 2 CORE ENGINE COMPLETE

### What's Done
- ✅ TypeScript interfaces (all types defined)
- ✅ GameStore singleton (save/load, state management, story sync)
- ✅ CharacterFactory (player + 11 enemies + 3 bosses)
- ✅ CLI shell with Ink (title screen, menus, navigation)
- ✅ Standalone executables (Windows, macOS, Linux)
- ✅ Download page on beggars-sect.genkaw.com
- ✅ GitHub Release v0.1.0 (Week 1) + v0.2.0 (Week 4)
- ✅ ATB Combat Engine (15+ techniques, AI, full UI)
- ✅ Story Integration (7-scene Prologue, story UI)
- ✅ File-based save system with auto-save

### What's Built
Design phase complete with 15,000+ lines of documentation:
- ✅ All combat formulas finalized (FORMULAS.md)
- ✅ 15 techniques with full stats (TECHNIQUES.md)
- ✅ 11 enemies with AI patterns (ENEMIES.md)
- ✅ Non-linear story with 3 paths and 3 endings (STORY_STRUCTURE.md)
- ✅ Prologue + 3 chapters fully scripted with branching
- ✅ 9 NPCs with characterization
- ✅ Complete worldbuilding and lore (11 lore docs)
- ✅ Technical architecture (TECH_DESIGN.md)

**Total playtime:** ~5-6 hours first playthrough, ~12-15 hours for all content.

---

## Phase 2: Core Systems ✅ COMPLETE

### Week 1: Foundation ✅ COMPLETE
- [x] Set up TypeScript + Ink project
- [x] TypeScript interfaces (character, combat, technique, item, game)
- [x] GameStore singleton with save/load
- [x] CharacterFactory with all templates
- [x] Basic CLI shell (title, menu, new game, stats, credits)
- [x] Standalone executable builds (pkg)
- [x] GitHub Release v0.1.0 + download page

### Week 2: Combat Engine ✅ COMPLETE
- [x] ATB turn order system (CombatEngine.ts)
- [x] Action system (7 actions: attack, technique, defend, chi-focus, item, stance, flee)
- [x] Damage calculator with formulas
- [x] Chi management (generation, consumption)
- [x] TechniqueRegistry (15+ techniques with combos)
- [x] AIController (pattern-based AI, boss phases)
- [x] Full combat UI (menus, turn queue, health bars)

### Week 3: Story Integration ✅ COMPLETE
- [x] StoryEngine (progression, state, choices)
- [x] Full Prologue (7 scenes, ~1000 lines)
- [x] Story UI (content, choices, exploration)
- [x] Story ↔ Combat integration

### Week 4: Save System ✅ COMPLETE
- [x] SaveManager (file persistence)
- [x] Story state sync with GameStore
- [x] Save/Load UI (3 slots + auto-save)
- [x] Auto-save triggers
- [x] GitHub Release v0.2.0

**Exit Criteria:** Playable game with save/load ✅ ACHIEVED

---

## Phase 3: Chapter 1 + AI (Weeks 5-6)

- [ ] Implement Chapter 1 scenes (using CHAPTER_1.md)
- [ ] Navigation system (areas, exploration)
- [ ] NPC dialogue system
- [ ] Tutorial integration
- [ ] Add remaining Chapter 1 techniques
- [ ] Claude API integration for enemy variation

**Exit Criteria:** Playable Chapter 1 with AI enhancements

---

## Phase 4: Expand Content (Weeks 7-8)

- [ ] Chapter 2 story + encounters
- [ ] Chapter 3 story + encounters
- [ ] All 15 techniques implemented
- [ ] Implement combo chains
- [ ] All enemy types (8 + 3 bosses)
- [ ] Mastery progression system
- [ ] Save/load system

**Exit Criteria:** Complete 3-chapter game, rough

---

## Phase 5: Polish & Balance (Weeks 9-10)

- [ ] Combat balance pass
- [ ] Difficulty curve tuning
- [ ] ASCII art for key moments
- [ ] Combat animations (text-based)
- [ ] UI polish
- [ ] Feedback system setup

**Exit Criteria:** Balanced, polished game

---

## Phase 6: Launch (Weeks 11-12)

- [ ] External playtesting (3-5 testers)
- [ ] Bug fixes and final balance
- [ ] README and player guide
- [ ] Demo video/GIF
- [ ] Publish to npm
- [ ] GitHub release v1.0
- [ ] Update genkaw.com

**Exit Criteria:** Public launch

---

## v1.0 Scope (Locked)

**Included:**
- Prologue + 3 chapters (complete story arc)
- Non-linear branching with 3 paths (Blade, Stream, Shadow)
- 3 distinct endings (Destroyer, Reformer, Wanderer)
- 3 stances (Flowing, Weathered, Hungry)
- 15 techniques
- 11 enemies (8 regular + 3 bosses)
- Claude AI enemy variations
- Save/load system

**Deferred to v1.5:**
- Deceptive Stance (4th stance)
- Environmental combat
- Items/consumables system
- New Game+ mode

---

## Open Questions

### Technical
1. Ink vs raw terminal output for combat display?
2. Save file location (home dir vs project dir)?
3. Claude API caching strategy?

### Design
1. Tutorial pacing - how many fights before full mechanics?
2. Death penalty - respawn at checkpoint or reload save?

---

## Success Metrics

### Development
- [ ] Stay on 12-week schedule (± 1 week)
- [ ] Combat feels strategic and fun
- [ ] AI variations are noticeable

### Quality
- [ ] 0 game-breaking bugs at launch
- [ ] Average playthrough: 3-5 hours
- [ ] Chapter 1 completion rate: >80%

### Launch
- [ ] 50+ GitHub stars (first month)
- [ ] 20+ feedback submissions
- [ ] Featured on genkaw.com

---

**Next Action:** Run `npm install` and verify Ink renders correctly
