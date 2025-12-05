# The Beggars Sect - Development Changelog

All notable changes to this project will be documented in this file.

---

## [Unreleased]

### Planned - Phase 1: Foundation & Design (Weeks 1-2)
- [ ] Complete worldbuilding document
- [ ] Design all Chapter 1 content
- [ ] Create complete technique database
- [ ] UI/UX wireframes (CLI mockups)
- [ ] NPC cast and dialogue design

### Planned - Phase 2: Core Systems (Weeks 3-4)
- [ ] Implement combat system
- [ ] Character stats and progression
- [ ] Save/load system
- [ ] Basic navigation

### Planned - Phase 3-6
See TODO.md for complete roadmap

---

## [2025-12-05] - MVP Scoping & Integration Planning

### Added
- **MVP_PLAN.md** (3,800+ lines) - Comprehensive scoped plan
  - Website integration strategy
  - Scoped MVP definition (locked features)
  - Documentation split plan (4 focused docs)
  - Feedback system design (n8n + database)
  - Realistic 12-week roadmap with milestones
  - Risk management and contingencies
  - Immediate next actions
- **SUMMARY.md** - Session summary and status tracking
  - Completed work overview
  - Key decisions made
  - Immediate next actions
  - Success criteria
- **Integration with genkaw.com**:
  - Added to Lab section (active project)
  - Dedicated dev log page created
  - Building in public infrastructure

### Changed
- **Scope reduction**: From 5 chapters → 3 chapters for v1.0
- **Feature cuts**: Environmental combat, 4th stance, n8n in-game → post-v1.0
- **Documentation strategy**: Split into 4 focused docs instead of 2 massive files
- **Feedback approach**: Separate web form (not in-game) using n8n + database

### Context
**Why:** Initial design was too ambitious for 12-week timeline. Ruthless scoping needed to create achievable MVP while maintaining core vision and showcase value.

**Strategic Decision:** Focus on core combat + AI enemy variations + 3-chapter story. Save advanced features for v1.5 and v2.0. This ensures we ship a complete, polished experience rather than incomplete ambitious project.

**Impact:** Clear, achievable roadmap with weekly milestones and decision points. Foundation for building in public with dev log tracking progress.

---

## [2025-12-04] - Project Foundation

### Added
- **Project structure** created with full directory scaffolding
- **README.md** - Project overview and vision document
- **GAME_DESIGN.md** - Comprehensive 600+ line game design document
  - Complete story arc (Li Wei's journey)
  - World building (Martial Arts Haven universe)
  - Character background
  - Faction design
  - Progression system concept
  - Development roadmap
- **COMBAT_SYSTEM.md** - Complete combat mechanics specification
  - Turn-based ATB system (FFX-inspired)
  - Stance system (4 stances with unique properties)
  - Combo system (beginner → master combos)
  - Chi management mechanics
  - Automation enhancement designs
  - Environmental combat
  - AI-powered enemies
  - Complete damage formulas
  - Visual feedback designs

### Technical Setup
- TypeScript + Ink project structure
- package.json with all dependencies
- tsconfig.json configured with path aliases
- Basic scaffolds (index.tsx, App.tsx)
- .gitignore configured

### Documentation
- .claude/ documentation directory
- Design docs in /design
- README with full project info

### Context
**Why:** Transform Mito's C learning project into showcase of AI-powered game development. First game in Martial Arts Haven multiverse.

**Strategic Alignment:**
- Demonstrates automation + AI capabilities
- Unique positioning (CLI RPG with procedural content)
- Portfolio piece for genkaw.com
- Foundation for game universe IP

**Vision:** "From nothing, to legend" - Li Wei's zero-to-hero journey as first game in ecosystem of interconnected games exploring different realms and characters.

---

## Format Guidelines

### Entry Structure
```markdown
## [YYYY-MM-DD] - Brief Title

### Added
- New features, files, systems

### Changed
- Modifications to existing features

### Fixed
- Bug fixes

### Removed
- Deprecated features

### Technical
- Implementation details

### Documentation
- Docs created or updated

### Context
**Why:** Strategic reasoning
**Impact:** Effect on project
```

---

**Changelog started:** 2024-12-04
**Last updated:** 2024-12-04
**Status:** Foundation complete, ready for implementation
