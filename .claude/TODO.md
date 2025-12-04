# The Beggars Sect - TODO & Roadmap

**Last Updated:** 2024-12-04
**Current Phase:** Foundation & Design

---

## Immediate Next Steps

### Design Phase (Complete Before Coding)

- [ ] **Worldbuilding Document**
  - Expand Martial Arts Haven lore
  - Detail aptitude system mechanics
  - Map out urban districts
  - Define other realms (for future games)

- [ ] **Technique Database**
  - List all palm techniques (with stats)
  - Define mastery progression for each
  - Design combo chains
  - Create technique unlock conditions

- [ ] **NPC Cast Design**
  - Beggars Sect elders (personalities, techniques)
  - Urban thug archetypes
  - Spartan authority figures
  - Lone wolf characters
  - Li Wei's key relationships

- [ ] **Chapter Content Breakdown**
  - Chapter 1: Detailed story beats
  - Chapter 2-5: Outline each chapter
  - Boss fight designs
  - Key story moments

- [ ] **UI/UX Mockups**
  - Combat screen layouts (ASCII art)
  - Navigation menus
  - Character screens
  - Inventory/technique menus

---

## Development Roadmap

### Phase 1: Foundation & Design (Weeks 1-2) - IN PROGRESS

**Design Documents:**
- [x] GAME_DESIGN.md - Complete
- [x] COMBAT_SYSTEM.md - Complete
- [ ] WORLDBUILDING.md - TODO
- [ ] TECHNIQUES.md - TODO
- [ ] NPC_CAST.md - TODO
- [ ] CHAPTER_BREAKDOWN.md - TODO

**Technical Prep:**
- [x] Project structure created
- [x] package.json configured
- [x] TypeScript setup
- [ ] Install dependencies (npm install)
- [ ] Verify Ink setup works

**Deliverable:** Complete design foundation before writing code

---

### Phase 2: Core Systems (Weeks 3-4)

**Combat System:**
- [ ] Implement turn order (ATB system)
- [ ] Basic attack/defend actions
- [ ] Technique system foundation
- [ ] Chi management
- [ ] Damage calculation
- [ ] Status effects

**Character System:**
- [ ] Stats (STR, DEX, END, APT, CHI)
- [ ] HP/Chi tracking
- [ ] Stat growth mechanics
- [ ] Mastery system

**UI Framework:**
- [ ] Main menu (Ink components)
- [ ] Combat display
- [ ] Character sheet
- [ ] Navigation system

**Save/Load:**
- [ ] JSON save format
- [ ] Save game state
- [ ] Load game state
- [ ] Multiple save slots

**Deliverable:** Playable combat prototype

---

### Phase 3: Content Creation (Weeks 5-6)

**Chapter 1 Implementation:**
- [ ] Opening scene (Li Wei spawns)
- [ ] Tutorial combat
- [ ] Meeting Beggars Sect
- [ ] First elder training
- [ ] Urban exploration
- [ ] Chapter 1 boss

**Techniques:**
- [ ] Implement 10-15 basic palm techniques
- [ ] Create 3-5 beginner combos
- [ ] Technique discovery system

**Enemies:**
- [ ] Urban thug variations (5-7 types)
- [ ] Spartan soldiers (2-3 types)
- [ ] Chapter 1 boss

**NPCs:**
- [ ] 3-5 Beggars Sect elders
- [ ] Tutorial NPC
- [ ] Quest givers
- [ ] Dialogue system

**Deliverable:** Complete Chapter 1 experience

---

### Phase 4: Automation Integration (Weeks 7-8)

**Claude AI Integration:**
- [ ] API setup
- [ ] Enemy variation generation
- [ ] NPC dialogue generation
- [ ] Quest generation
- [ ] Technique description generation

**n8n Workflows:**
- [ ] Setup n8n instance
- [ ] Weather system trigger
- [ ] World events
- [ ] Time-based changes
- [ ] Community features (future)

**Dynamic Systems:**
- [ ] Adaptive difficulty
- [ ] Intelligent boss AI
- [ ] Combo discovery hints
- [ ] Performance analytics

**Deliverable:** AI-enhanced gameplay

---

### Phase 5: Polish & Expand (Weeks 9-10)

**Chapters 2-5:**
- [ ] Chapter 2 content
- [ ] Chapter 3 content
- [ ] Chapter 4 content
- [ ] Chapter 5 + cliffhanger ending

**Stance System:**
- [ ] Implement all 4 stances
- [ ] Stance-specific techniques
- [ ] Stance switching mechanics

**Advanced Features:**
- [ ] Environmental combat
- [ ] Advanced combos
- [ ] Master techniques
- [ ] Hidden content
- [ ] Achievements

**Balance:**
- [ ] Combat difficulty tuning
- [ ] Chi economy balance
- [ ] Technique costs
- [ ] Enemy stats

**Deliverable:** Complete 5-chapter game

---

### Phase 6: Showcase & Release (Weeks 11-12)

**Polish:**
- [ ] ASCII art for key moments
- [ ] Sound effects (terminal beeps?)
- [ ] Animations (text-based)
- [ ] Bug fixes
- [ ] Performance optimization

**Documentation:**
- [ ] Player guide
- [ ] Controls reference
- [ ] Technique guide
- [ ] Secrets/Easter eggs guide

**Showcase:**
- [ ] Epic README with screenshots
- [ ] Add to genkaw.com Lab section
- [ ] Create demo video/GIF
- [ ] Write dev blog posts
- [ ] Share on socials

**Release:**
- [ ] Publish to npm
- [ ] GitHub release
- [ ] Itch.io page?
- [ ] Community features

**Deliverable:** Public launch

---

## Future Enhancements (Post-Launch)

### Web Version
- [ ] Port to browser (Ink → React)
- [ ] Embed on genkaw.com
- [ ] Interactive demo
- [ ] Mobile-friendly

### Game+
- [ ] New Game+ mode
- [ ] Difficulty options
- [ ] Speedrun mode
- [ ] Challenge modes

### Content Expansions
- [ ] Side stories
- [ ] Optional bosses
- [ ] Secret techniques
- [ ] Hidden areas

### Sequel Setup
- [ ] Li Wei's wandering journey
- [ ] Dog Beating Staff quest
- [ ] Explore full Martial Arts Haven
- [ ] New factions

---

## Design Questions to Answer

### Combat
- [ ] Exact stat scaling formulas
- [ ] Technique balance spreadsheet
- [ ] Status effect details
- [ ] Environmental combat frequency
- [ ] Tutorial progression

### Progression
- [ ] How many uses to master technique?
- [ ] Stat growth rates
- [ ] Cultivation mechanics details
- [ ] Equipment system (minimal vs none)

### Story
- [ ] Li Wei's backstory (revealed when?)
- [ ] Aptitude reveal timing
- [ ] Key story beats per chapter
- [ ] Dialogue tree structure

### Technical
- [ ] Save file format details
- [ ] AI API rate limiting
- [ ] n8n webhook structure
- [ ] Performance targets

---

## Brainstorm Sessions Needed

1. **Unique Mechanics**
   - What makes THIS game special beyond AI?
   - Innovative CLI mechanics?
   - Beggar-specific gameplay?

2. **Monetization Strategy**
   - Sell game itself?
   - Template for other devs?
   - Course/tutorial content?
   - Free with premium features?

3. **Community Features**
   - Shared discoveries?
   - Leaderboards?
   - Player-generated content?
   - Discord integration?

4. **Beggar Sect Lore**
   - Deeper faction history
   - Elder backgrounds
   - Sect philosophy
   - Hidden techniques

5. **Martial Arts Haven Expansion**
   - Other realms to explore
   - Future game concepts
   - Crossover potential
   - Shared universe rules

---

## Blockers & Risks

### Current Blockers
- None (design phase)

### Potential Risks
- [ ] Scope creep (keep focused on Chapter 1-5)
- [ ] AI API costs (monitor usage)
- [ ] Balance issues (needs playtesting)
- [ ] CLI limitations (test early)
- [ ] Time estimates (may need adjustment)

---

## Success Metrics

### Development Goals
- Complete design docs by end of Week 1
- Playable prototype by end of Week 4
- Chapter 1 complete by Week 6
- AI integration by Week 8
- Full game by Week 10
- Public launch by Week 12

### Quality Targets
- Combat feels strategic, not grindy
- Story is engaging and mysterious
- AI enhancements feel natural, not gimmicky
- Beginner-friendly but deep for experts
- Polished CLI experience

### Showcase Goals
- Featured on genkaw.com Lab
- Dev blog series (5+ posts)
- Video demo created
- Community engagement
- Portfolio piece for automation skills

---

## Notes & Ideas

### Random Ideas to Explore
- Technique naming contest (community)
- Li Wei personality quiz (which stance suits you?)
- Beggar sect recruitment site (interactive)
- AI-generated side quests (endless content)
- Speed run timer and leaderboard
- Easter eggs referencing C learning journey

### Technical Experiments
- Can we make combat feel real-time in CLI?
- Procedural dungeon generation?
- Voice of elder (text-to-speech)?
- Save file encryption (prevent cheating)

---

**This is a living document. Update as priorities change!**

**Current Focus:** Complete design phase, then prototype combat.

**Next Review:** When Phase 1 completes
