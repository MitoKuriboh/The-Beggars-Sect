# The Beggars Sect - MVP Plan & Integration Strategy

**Created:** 2025-12-05
**Purpose:** Scoped MVP definition + genkaw.com integration plan
**Status:** Ready for execution

---

## 📊 Website Analysis

### Current genkaw.com Structure

**Architecture:**
- Single-page app with modular sections
- Data-driven content from `/data/site-content.ts`
- TypeScript types in `/lib/types/content.ts`
- Sections: Hero → About → Lab → Updates → Connect

**Lab Section (Projects showcase):**
```typescript
interface Experiment {
  id: string;
  title: string;
  status: 'active' | 'completed' | 'planned';
  category: string;
  description: string;
  tags: string[];
  learned?: string; // Optional learnings
}
```

**Current Projects:**
1. bathala.genkaw.com (completed) - Remote terminal
2. Claude Integration (active) - AI exploration
3. Genkaw Platform (active) - This website
4. Monetizable Tools (planned) - Future products

**Layout:**
- 2-column grid (responsive)
- Hover effects, status badges
- Clean, minimalist aesthetic
- Tags for technologies used

---

## 🎯 Integration Plan: The Beggars Sect on genkaw.com

### Phase 1: Add to Lab Section (Simple)

**Add to `site-content.ts` experiments array:**

```typescript
{
  id: "beggars-sect",
  title: "The Beggars Sect: Li Wei's Ascension",
  status: "active", // Will update as development progresses
  category: "Game Development",
  description:
    "CLI RPG showcasing AI-powered game development. Turn-based combat with procedural enemy variations via Claude AI. First game in the Martial Arts Haven universe—Li Wei's journey from nobody to martial arts master.",
  tags: ["TypeScript", "Ink", "Claude AI", "Game Design", "CLI"],
  learned: "Updates as development progresses" // Will update with key learnings
}
```

**Status progression:**
- "active" (current - design phase)
- Update description as milestones hit
- Add learnings as we build

### Phase 2: Dedicated Project Page (Future)

**After MVP launch, create:**
- `/projects/beggars-sect` route
- Dedicated page with:
  - Game overview
  - Screenshots (CLI displays)
  - Play instructions
  - Development blog posts
  - Feedback form (integrated)
  - Download/play online link

**Not needed immediately - Lab entry sufficient for now**

---

## ✂️ MVP Scope Definition (LOCKED)

### What's IN v1.0 ✅

**Core Systems:**
- ✅ Turn-based combat (ATB system)
- ✅ 3 combat stances (Flowing, Weathered, Hungry)
- ✅ Chi management system
- ✅ Technique discovery (5-7 basic combos)
- ✅ Mastery progression
- ✅ Save/load system (JSON)

**Content:**
- ✅ Chapters 1-3 (complete story arc)
- ✅ 15-20 palm techniques total
- ✅ 5-7 enemy types
- ✅ 3-4 Beggars Sect elders (NPCs)
- ✅ 1 boss fight (end of Chapter 3)
- ✅ Cliffhanger ending setup

**AI Integration:**
- ✅ Procedural enemy variations (Claude API)
- ✅ Dynamic NPC dialogue generation
- ✅ Dynamic difficulty adjustment
- ✅ Combo discovery hints

**Polish:**
- ✅ ASCII art for key moments
- ✅ Clean CLI UX with Ink
- ✅ Tutorial and onboarding
- ✅ Combat animations (text-based)

### What's OUT v1.0 ❌ (Post-launch features)

- ❌ Environmental combat → v1.5
- ❌ Deceptive stance (4th stance) → v1.5
- ❌ Community features → v2.0
- ❌ Chapters 4-5 → Sequel or DLC
- ❌ Web version → v2.0
- ❌ Advanced boss AI (multi-phase) → v1.5
- ❌ Weather/time systems → v2.0

### Why This Scope Works

**Achievable:**
- 3 chapters = focused story
- Core combat systems only
- AI where it matters most (enemies)
- Realistic 10-12 week timeline

**Complete:**
- Full story arc with satisfying ending
- All core mechanics present
- Replayable (technique discovery)
- Showcase-ready

**Expandable:**
- Clear upgrade path (v1.5, v2.0)
- Modular design allows additions
- Foundation for sequel

---

## 📚 Documentation Split Plan

### Current Problem
- GAME_DESIGN.md = 950 lines (too much)
- COMBAT_SYSTEM.md = 1,350 lines (very detailed)
- Both will grow even larger
- Hard to navigate and maintain

### New Structure

#### 1. CORE_COMBAT.md (Combat Mechanics)
**Focus:** Pure game mechanics, no AI
**Contents:**
- Turn order system (ATB)
- Action types (Attack, Defend, Technique, etc.)
- Combat stats (STR, DEX, END, CHI)
- Damage formulas (exact calculations)
- Stance system (3 stances detailed)
- Chi management (generation/consumption)
- Combo system mechanics
- Status effects
- Balance spreadsheet
- Tutorial progression

**Size:** ~800-1000 lines
**Audience:** Game designers, balancing, implementation
**Use case:** Reference for coding combat logic

#### 2. AI_INTEGRATION.md (Automation & AI)
**Focus:** How AI enhances gameplay
**Contents:**
- Claude API integration architecture
- Procedural enemy generation
  - Template system
  - Variation algorithms
  - Example outputs
- Dynamic NPC dialogue
  - Personality injection
  - Context-aware responses
- Dynamic difficulty system
  - Performance tracking
  - Adjustment algorithms
- Combo discovery hints
- Boss adaptive behavior
- Cost projections & rate limiting
- Error handling & fallbacks
- Testing AI-generated content

**Size:** ~600-800 lines
**Audience:** AI integration, automation planning
**Use case:** Reference for Claude API implementation

#### 3. GAME_DESIGN.md (Narrative & World)
**Focus:** Story, world, characters
**Contents:**
- Vision & concept
- Story overview (3 chapters)
- Worldbuilding (Martial Arts Haven)
- Character designs (Li Wei, elders, enemies)
- Faction descriptions
- Progression philosophy
- Chapter structure
- Scene breakdowns

**Reduced to:** ~500-600 lines
**Audience:** Writers, designers, narrative planning
**Use case:** Story implementation reference

#### 4. TECHNIQUES.md (Database)
**Focus:** Complete technique list
**Contents:**
- All 15-20 palm techniques
- Stats, costs, effects
- Mastery progression
- Combo chains
- Unlock conditions
- Flavor text templates

**Size:** ~300-400 lines
**Audience:** Content creation, balancing
**Use case:** Implementation data source

### Benefits of Split
- ✅ Each doc focused and navigable
- ✅ Update one without touching others
- ✅ Clear ownership (mechanics vs AI vs story)
- ✅ Easier to share with others
- ✅ Modular like the codebase

---

## 🔄 Feedback System Design

### Purpose
**NOT** in-game integration. **Separate** feedback collection system for players.

### Architecture

```
┌─────────────────────────────────────────────┐
│  The Beggars Sect Game (CLI)                │
│  - At end of session                        │
│  - "Share feedback? Visit: [URL]"           │
└─────────────────┬───────────────────────────┘
                  │
                  ↓
┌─────────────────────────────────────────────┐
│  feedback.genkaw.com/beggars-sect           │
│  (Simple web form)                          │
│  - Rating (1-5 stars)                       │
│  - Feedback text                            │
│  - What chapter reached?                    │
│  - Optional: Email for updates              │
│  - Anonymous user ID (from save file)       │
└─────────────────┬───────────────────────────┘
                  │
                  ↓
┌─────────────────────────────────────────────┐
│  Backend API                                │
│  - Receives form submission                 │
│  - Validates data                           │
│  - Stores in database                       │
│  - Triggers analytics                       │
│  - Sends thank you email (if provided)      │
└─────────────────┬───────────────────────────┘
                  │
                  ↓
┌─────────────────────────────────────────────┐
│  Database (PostgreSQL / Airtable / Notion)  │
│  Tables:                                    │
│  - feedback (text, rating, timestamp)       │
│  - users (id, chapter_reached, playtime)    │
│  - analytics (aggregated stats)             │
└─────────────────────────────────────────────┘
```

### Database Schema (Simple)

**Table: feedback**
```sql
id              UUID PRIMARY KEY
created_at      TIMESTAMP
user_id         VARCHAR (anonymous, from save file)
rating          INTEGER (1-5)
feedback_text   TEXT
chapter_reached INTEGER
email           VARCHAR (optional)
playtime        INTEGER (minutes, from save file)
```

**Table: game_analytics**
```sql
id              UUID PRIMARY KEY
user_id         VARCHAR
session_date    DATE
chapter_reached INTEGER
techniques_learned INTEGER
deaths          INTEGER
playtime        INTEGER
combat_wins     INTEGER
```

### Data Collected

**Automatically (from save file):**
- Anonymous user ID (UUID generated on first play)
- Chapter reached
- Techniques learned count
- Deaths count
- Total playtime
- Combat stats (wins/losses)

**User-submitted:**
- Rating (1-5 stars)
- Feedback text
- Email (optional)

### Backend Workflow Steps

1. **API Endpoint** - Receives form POST
2. **Validate Data** - Check required fields
3. **Enrich Data** - Add timestamp, IP hash (privacy)
4. **Store in DB** - INSERT into feedback table
5. **Update Analytics** - Aggregate stats
6. **Conditional:**
   - If email provided → Send thank you
   - If critical rating (1-2 stars) → Alert Mito
7. **Success Response** - Return to user

### Privacy Considerations

- Anonymous user IDs (UUID, not personal)
- IP addresses hashed
- Email optional
- No tracking cookies
- GDPR-friendly
- Clear privacy policy

### Benefits

**For Development:**
- Know what players enjoy/hate
- See where players get stuck
- Balance data (technique usage)
- Chapter completion rates

**For Players:**
- Feel heard
- Contribute to development
- Optional email for updates
- Simple, non-intrusive

### Implementation Timeline

**Week 10-11 (During polish phase):**
- Create feedback form page
- Set up backend API
- Choose database (Airtable easiest to start)
- Test submission flow
- Add feedback link to game

**Week 12 (Launch):**
- Deploy feedback system
- Monitor submissions
- Iterate based on feedback

---

## 📅 Realistic Roadmap (12 Weeks)

### Current Reality Check

**We're at:** Design phase, documentation
**Timeline:** 12 weeks realistic for scoped MVP
**Constraints:**
- Solo development (+ Claude)
- Learning as we build
- First game of this type
- Need playtesting time

### Week-by-Week Breakdown

#### **PHASE 1: COMPLETE DESIGN (Weeks 1-2)**

**Week 1: Documentation Split & Core Design**
- [ ] Split docs: CORE_COMBAT.md, AI_INTEGRATION.md, GAME_DESIGN.md, TECHNIQUES.md
- [ ] Create balance spreadsheet (all techniques, stats, formulas)
- [ ] Design Chapter 1 scene-by-scene (complete beats)
- [ ] Create CLI mockups (ASCII layouts for every screen)
- [ ] Define all 15-20 techniques with exact stats

**Deliverable:** Complete design foundation, ready to code

**Week 2: Content Creation & Planning**
- [ ] Write all Chapter 1 dialogue
- [ ] Design 5-7 enemy types (stats, AI patterns)
- [ ] Create 3-4 elder NPCs (personalities, techniques taught)
- [ ] Outline Chapters 2-3 (high level)
- [ ] Finalize scope (lock features, no additions)

**Deliverable:** All content designed, implementation-ready

---

#### **PHASE 2: CORE PROTOTYPE (Weeks 3-4)**

**Week 3: Combat Foundation**
- [ ] Set up TypeScript + Ink project (npm install, verify)
- [ ] Build turn order system (ATB)
- [ ] Implement basic combat loop (attack, defend)
- [ ] Create character stats system (STR, DEX, END, CHI)
- [ ] Build chi management (generation, consumption)
- [ ] Simple UI (combat display, basic menus)

**Deliverable:** Can fight one enemy with basic attacks

**Week 4: Techniques & Stances**
- [ ] Implement technique system (5 techniques)
- [ ] Build 2 stances (Flowing, Hungry)
- [ ] Stance switching mechanics
- [ ] Damage calculation (formulas from spreadsheet)
- [ ] Add 1 simple enemy with AI
- [ ] Test combat feel (iterate until fun!)

**Deliverable:** Playable combat prototype, feels good

**CRITICAL:** If combat doesn't feel fun, STOP and iterate. Everything depends on this.

---

#### **PHASE 3: CHAPTER 1 + AI (Weeks 5-6)**

**Week 5: Chapter 1 Story**
- [ ] Implement Chapter 1 scenes (opening → beggar acceptance)
- [ ] Navigation system (areas, exploration)
- [ ] NPC dialogue system
- [ ] Tutorial integration (gradual mechanic introduction)
- [ ] Add 3 more techniques (total: 8)
- [ ] Add Weathered stance (3 stances total)

**Deliverable:** Playable Chapter 1, no AI yet

**Week 6: AI Integration**
- [ ] Claude API setup (authentication, testing)
- [ ] Procedural enemy variation system
- [ ] NPC dialogue generation (context-aware)
- [ ] Test AI-generated content (quality check)
- [ ] Dynamic difficulty foundation (tracking system)
- [ ] Combo hint system (AI suggestions)

**Deliverable:** Chapter 1 with AI enhancements working

---

#### **PHASE 4: EXPAND CONTENT (Weeks 7-8)**

**Week 7: Chapters 2-3 Implementation**
- [ ] Chapter 2 story + encounters
- [ ] Chapter 3 story + encounters
- [ ] Add remaining techniques (total: 15-20)
- [ ] Implement 5-7 combo chains
- [ ] Add all enemy types (5-7 total)
- [ ] Boss fight (end of Chapter 3)

**Deliverable:** Complete 3-chapter game, rough

**Week 8: Systems Integration**
- [ ] Mastery progression (technique leveling)
- [ ] Save/load system (JSON, multiple slots)
- [ ] Technique discovery mechanics
- [ ] Dynamic difficulty implementation (full system)
- [ ] Item system (basic healing, chi recovery)

**Deliverable:** All core systems working together

---

#### **PHASE 5: POLISH & BALANCE (Weeks 9-10)**

**Week 9: Balance Pass**
- [ ] Combat balance (damage, chi costs, enemy stats)
- [ ] Difficulty curve (Chapter 1 → 3 progression)
- [ ] Technique costs/rewards tuning
- [ ] Boss fight difficulty
- [ ] Playtest internally (run through full game 3-5 times)
- [ ] Fix major issues

**Deliverable:** Balanced, playable game

**Week 10: Polish & Feedback System**
- [ ] ASCII art for key moments
- [ ] Combat animations (text-based, juice)
- [ ] UI polish (menus, displays)
- [ ] Tutorial refinement
- [ ] Create feedback form page
- [ ] Set up backend API
- [ ] Set up database (Airtable)
- [ ] Integrate feedback link in game

**Deliverable:** Polished game + feedback system

---

#### **PHASE 6: LAUNCH PREP (Weeks 11-12)**

**Week 11: Documentation & Showcase**
- [ ] Epic README.md for game repo
- [ ] Player guide (controls, mechanics)
- [ ] Technique reference guide
- [ ] Add to genkaw.com Lab section
- [ ] Create demo video/GIF (asciinema recording)
- [ ] Write dev blog post #1: "Building an AI-Powered CLI RPG"
- [ ] Test feedback system (end-to-end)

**Deliverable:** Launch-ready documentation

**Week 12: External Testing & Launch**
- [ ] Recruit 3-5 playtesters (friends, community)
- [ ] Gather feedback, fix critical bugs
- [ ] Final balance tweaks
- [ ] Publish to npm (`npx the-beggars-sect`)
- [ ] GitHub release (v1.0)
- [ ] Update genkaw.com with launch announcement
- [ ] Share on socials (GitHub, Twitter, etc.)
- [ ] Write dev blog post #2: "What I Learned"

**Deliverable:** Public launch! 🎉

---

### Milestone Checklist

**End of Week 2:**
- ✅ All docs complete and detailed
- ✅ Balance spreadsheet done
- ✅ Chapter 1 fully designed
- ✅ CLI mockups created
- **Decision point:** Proceed to implementation?

**End of Week 4:**
- ✅ Combat prototype playable
- ✅ Combat feels fun (CRITICAL)
- ✅ 2 stances working
- ✅ Chi system working
- **Decision point:** Is core gameplay fun? If no, iterate.

**End of Week 6:**
- ✅ Chapter 1 complete with AI
- ✅ Claude API integration working
- ✅ Procedural enemies generating
- **Decision point:** Is AI adding value or just gimmick?

**End of Week 8:**
- ✅ 3 chapters playable start to finish
- ✅ All core systems integrated
- ✅ Save/load working
- **Decision point:** Feature complete? Scope creep check.

**End of Week 10:**
- ✅ Game balanced and polished
- ✅ Feedback system operational
- ✅ Ready for external testing
- **Decision point:** Launch quality? More polish needed?

**End of Week 12:**
- ✅ PUBLIC LAUNCH
- ✅ Showcase on genkaw.com
- ✅ Dev blog published
- **Decision point:** What's next? v1.5 or new project?

---

### Risk Management

**High-Risk Items:**

1. **Combat feel (Week 4)**
   - Mitigation: Iterate until fun, don't rush
   - Contingency: Add extra week if needed

2. **AI API costs (Week 6)**
   - Mitigation: Monitor usage, set limits
   - Contingency: Reduce procedural generation frequency

3. **Scope creep (Ongoing)**
   - Mitigation: Lock features after Week 2
   - Contingency: Cut non-essential features

4. **Balance issues (Week 9)**
   - Mitigation: Spreadsheet planning, playtesting
   - Contingency: Add extra polish week

5. **Playtesters availability (Week 12)**
   - Mitigation: Recruit early (Week 10)
   - Contingency: Extended beta period

---

### Success Metrics

**Development Goals:**
- ✅ Stay on 12-week schedule (± 1 week buffer)
- ✅ No scope creep beyond locked MVP
- ✅ Combat feels strategic and fun
- ✅ AI enhancements feel natural
- ✅ 3 complete chapters with satisfying cliffhanger

**Quality Targets:**
- ✅ 0 game-breaking bugs
- ✅ Average playthrough: 3-5 hours
- ✅ Chapter 1 completion rate: >80% (from testers)
- ✅ Combat depth: 5-7 viable strategies
- ✅ Technique discovery: Feel rewarding

**Showcase Goals:**
- ✅ Featured prominently on genkaw.com
- ✅ 2+ dev blog posts published
- ✅ Demo video created and shared
- ✅ 20+ feedback submissions (Week 1-2 post-launch)
- ✅ GitHub stars target: 50+ (realistic for niche)

---

## 🎯 Immediate Next Actions

### This Week (Week 1):

**Monday-Tuesday:**
1. Create 4 new design docs (split current docs)
2. Build balance spreadsheet (techniques, stats, formulas)

**Wednesday-Thursday:**
3. Design Chapter 1 scene-by-scene
4. Create CLI mockups for all screens

**Friday-Weekend:**
5. Review with Mito, finalize scope
6. Lock MVP features (no more additions)
7. Add The Beggars Sect to genkaw.com Lab section

**Next Week (Week 2):**
- Content creation (dialogue, enemies, NPCs)
- Chapter 2-3 outlines
- Final design review before implementation

---

## 📝 Notes

### What Makes This Realistic

**Focused Scope:**
- 3 chapters, not 5
- Core systems only
- AI where it matters
- No fancy extras

**Clear Milestones:**
- Weekly deliverables
- Decision points
- Risk mitigation
- Realistic timelines

**Leveraging Strengths:**
- AI integration (your focus)
- Claude Code assistance
- Automation mindset
- Logical planning

**Accepting Constraints:**
- Solo development
- Learning curve
- First game
- Time limits

### Why This Will Work

**Design-First:**
- Complete docs before code
- Know exactly what to build
- No mid-development confusion

**Iterative:**
- Build → Test → Iterate
- Decision points at key milestones
- Can adjust if needed

**Achievable:**
- Scoped to realistic timeline
- No overengineering
- Focus on core experience

**Showcase-Worthy:**
- Unique AI integration
- Original IP
- Complete game
- Portfolio piece

---

**This plan is locked. Execution starts next.**

**Next session: Begin documentation split + balance spreadsheet.**
