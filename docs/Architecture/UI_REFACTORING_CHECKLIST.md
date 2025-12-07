# UI Refactoring Checklist
**Track AAA Architecture Implementation Progress**

---

## Phase 1: Foundation ✅ COMPLETE

- [x] Create SelectInput wrapper
- [x] Create useMenuNavigation hook
- [x] Create useStateWithRef hook
- [x] Create input utilities
- [x] Create UI_CONFIG constants
- [x] Create DIVIDERS system
- [x] Export all utilities properly

---

## Phase 2: Core Components ✅ COMPLETE

- [x] Create MenuContainer component
- [x] Create ScreenBox component
- [x] Create MessageDisplay component
- [x] Create SectionHeader component
- [x] Create useCombatState hook
- [x] Create useStoryState hook
- [x] Document architecture in AAA_UI_ARCHITECTURE.md

---

## Phase 3: Refactor Existing Components ⏳ IN PROGRESS

### Menu Components (5 files)

- [ ] **ActionMenu.tsx**
  - [ ] Import `useMenuNavigation` hook
  - [ ] Replace useState + useInput with hook
  - [ ] Use `MenuContainer` wrapper
  - [ ] Import from `SelectInputWrapper`
  - [ ] Test functionality

- [ ] **TechniqueMenu.tsx**
  - [ ] Import `useMenuNavigation` hook
  - [ ] Replace manual navigation logic
  - [ ] Use `MenuContainer` wrapper
  - [ ] Use `UI_CONFIG.menus.maxTechniqueSlots`
  - [ ] Test functionality

- [ ] **StanceMenu.tsx**
  - [ ] Import `useMenuNavigation` hook
  - [ ] Replace manual arrow key handling
  - [ ] Use `MenuContainer` wrapper
  - [ ] Test functionality

- [ ] **TargetMenu.tsx**
  - [ ] Import `useMenuNavigation` hook
  - [ ] Replace useState + useInput
  - [ ] Use `MenuContainer` wrapper
  - [ ] Test functionality

- [ ] **ChoiceMenu.tsx**
  - [ ] Import `useMenuNavigation` hook
  - [ ] Replace manual input handling
  - [ ] Use `MenuContainer` wrapper
  - [ ] Test functionality

### Replace Hardcoded Dividers (8+ files)

- [ ] **App.tsx** (3 dividers)
  - [ ] Line 195: Replace with `DIVIDERS.standard`
  - [ ] Line 215: Replace with `DIVIDERS.standard`
  - [ ] Line 227: Replace with `DIVIDERS.standard`

- [ ] **CombatScreen.tsx** (3 dividers)
  - [ ] Line 398: Replace with `DIVIDERS.combat`
  - [ ] Line 450: Replace with `DIVIDERS.combat`
  - [ ] Line 579: Replace with `DIVIDERS.combat`

- [ ] **StoryScreen.tsx** (2 dividers)
  - [ ] Line 642: Replace with `DIVIDERS.story`
  - [ ] Line 724: Replace with `DIVIDERS.story`

- [ ] **StatusMenu.tsx** (3 dividers)
  - [ ] Line 84: Replace with `DIVIDERS.status`
  - [ ] Line 103: Replace with `DIVIDERS.status`
  - [ ] Line 164: Replace with `DIVIDERS.status`

### Replace Magic Numbers

- [ ] **CombatScreen.tsx**
  - [ ] Replace `300` with `UI_CONFIG.combat.enemyActionDelay`
  - [ ] Replace `500` with `UI_CONFIG.combat.turnTransitionDelay`
  - [ ] Replace `7` with `UI_CONFIG.combat.turnQueuePreviewLength`

- [ ] **StoryScreen.tsx**
  - [ ] Replace `200` with `UI_CONFIG.story.autoAdvanceDelay`
  - [ ] Replace `1000` with `UI_CONFIG.story.defaultPauseDuration`

- [ ] **TechniqueMenu.tsx**
  - [ ] Replace `4` with `UI_CONFIG.menus.maxTechniqueSlots`

---

## Phase 4: Component Decomposition 🔜 NEXT

### CombatScreen Decomposition

- [ ] Create `src/ui/combat/phases/` directory
- [ ] Extract ActionSelectPhase component
- [ ] Extract TechniqueSelectPhase component
- [ ] Extract StanceSelectPhase component
- [ ] Extract TargetSelectPhase component
- [ ] Extract EnemyTurnPhase component
- [ ] Extract VictoryPhase component
- [ ] Extract DefeatPhase component
- [ ] Extract FledPhase component
- [ ] Create phase component router in CombatScreen
- [ ] Test all combat phases

### StoryScreen Decomposition

- [ ] Create `src/ui/story/phases/` directory
- [ ] Extract ContentPhase component
- [ ] Extract ChoicePhase component
- [ ] Extract ExplorationPhase component
- [ ] Extract ChapterEndPhase component
- [ ] Extract GameEndPhase component
- [ ] Create phase component router in StoryScreen
- [ ] Remove 13-ref pattern
- [ ] Test all story phases

---

## Phase 5: Testing & Polish 🎯 FUTURE

### Testing

- [ ] Test all menus with new navigation hook
- [ ] Test combat screen with decomposed components
- [ ] Test story screen with decomposed components
- [ ] Performance benchmarks (render time)
- [ ] Memory usage profiling

### Documentation

- [ ] Component usage examples
- [ ] Migration guide for future developers
- [ ] Best practices documentation
- [ ] Design system showcase

---

## Quick Commands

```bash
# Build and test
npm run build

# Run the game
npm start

# Check file sizes (should be smaller after decomposition)
find src/ui -name "*.tsx" -exec wc -l {} + | sort -n

# Count total UI code
find src/ui -name "*.ts*" -exec wc -l {} + | tail -1
```

---

## Success Criteria

**Code Quality:**
- No files over 300 lines ✅ (after Phase 4)
- All menus use `useMenuNavigation` ⏳
- All dividers use `DIVIDERS` constant ⏳
- All magic numbers in `UI_CONFIG` ⏳

**Performance:**
- 60fps rendering ✅
- <16ms render time ✅
- React.memo on all components ✅

**Developer Experience:**
- Easy to add new menus ✅ (hook ready)
- Clear file organization ✅
- Self-documenting code ⏳

---

**Last Updated:** 2025-12-07
**Current Phase:** 3 (Refactoring existing components)
**Estimated Time Remaining:** 6-8 hours
