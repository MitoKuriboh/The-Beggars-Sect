# UI Atmospheric Overhaul Plan

**Created:** 2025-12-30 | **Status:** ✅ Complete | **Approver:** Mito | **Session:** f7db66a0

---

## TL;DR

Transform the CLI UI from "functional" to "memorable" through atmospheric enhancements: animated title sequence, smooth screen transitions, cultivation-themed visuals, and wuxia colour palette.

---

## Design Philosophy

| Principle | Application |
|-----------|-------------|
| **Atmosphere over flash** | Subtle, purposeful animations - not gimmicks |
| **Wuxia aesthetic** | Jade, gold, crimson, ink - cultivation world colours |
| **Rhythm & pacing** | Transitions create anticipation, not impatience |
| **Terminal-native** | Works in any terminal, no special requirements |

---

## Phase 1: Title Sequence (Priority: HIGH)

### Current State
- Static ASCII art displayed all at once
- Generic "Press any key to continue"
- No atmosphere building

### Target State
- **Staged reveal**: Title fades in character-by-character or line-by-line
- **Colour shift**: Start dim, brighten to full colour
- **Thematic prompt**: "Press ENTER to begin your cultivation..." or similar
- **Optional**: Brief pause, then subtitle fade-in

### Implementation

| File | Changes |
|------|---------|
| `src/ui/App.tsx` | Extract TitleScreen to own component |
| `src/ui/screens/TitleScreen.tsx` | New file - animated title logic |
| `src/ui/animations/textReveal.ts` | Reusable text reveal utilities |
| `src/ui/theme/colors.ts` | Wuxia colour palette definitions |

### Animation Approach
```
Frame 0-500ms:   Black screen
Frame 500-2000ms: Title reveals character by character (or line by line)
Frame 2000-2500ms: Subtitle fades in
Frame 2500ms+:   "Press ENTER..." pulses or appears
```

---

## Phase 2: Colour Palette (Priority: HIGH)

### Current Palette
Standard terminal colours: cyan, yellow, magenta, white, gray

### Wuxia Palette

| Name | Hex/ANSI | Usage |
|------|----------|-------|
| **Jade** | `#50C878` / green | Cultivation, growth, qi |
| **Gold** | `#FFD700` / yellow | Achievement, treasure, enlightenment |
| **Crimson** | `#DC143C` / red | Combat, blood, passion |
| **Ink** | `#1C1C1C` / gray | Mystery, shadow, the unknown |
| **Ivory** | `#FFFFF0` / white | Purity, text, clarity |
| **Bronze** | `#CD7F32` / yellow dim | Age, wisdom, artifacts |
| **Sect Purple** | `#8B008B` / magenta | The Beggars Sect identity |

### Implementation

| File | Changes |
|------|---------|
| `src/ui/theme/colors.ts` | New file - semantic colour system |
| `src/ui/theme/index.ts` | Export colours |
| Various UI files | Migrate to semantic colours |

---

## Phase 3: Screen Transitions (Priority: MEDIUM)

### Current State
- `console.clear()` - instant, jarring
- No sense of movement between screens

### Target State
- **Fade out**: Current screen dims before clear
- **Fade in**: New screen appears progressively
- **Wipe option**: Horizontal or vertical wipe for dramatic transitions

### Implementation

| File | Changes |
|------|---------|
| `src/ui/animations/transitions.ts` | Transition effect utilities |
| `src/ui/hooks/useTransition.ts` | Hook for managing screen transitions |
| `src/ui/App.tsx` | Integrate transition system |

### Transition Types
- `fade`: Opacity transition (simulate with colour dimming)
- `wipe`: Line-by-line reveal
- `instant`: Current behaviour (for quick navigation)

---

## Phase 4: Menu Atmosphere (Priority: MEDIUM)

### Current State
- Double border box, functional layout
- Static decorations

### Target State
- **Cultivation flourishes**: Subtle decorative elements
- **Dynamic elements**: Breathing/pulsing effects on selected items
- **Contextual theming**: Menu style reflects game state (combat = crimson accents)

### Implementation

| File | Changes |
|------|---------|
| `src/ui/components/AtmosphericMenu.tsx` | Enhanced menu wrapper |
| `src/ui/theme/decorations.ts` | ASCII decorative elements |
| `src/ui/components/Menu.tsx` | Add animation support |

### Decoration Ideas
```
╔══════════════════════════════════════╗
║  ☯  THE BEGGARS SECT  ☯             ║
╠══════════════════════════════════════╣
║                                      ║
║   ▸ Continue Journey                 ║
║     New Game                         ║
║     Settings                         ║
║                                      ║
╚══════════════════════════════════════╝
      ═══ Cultivation Awaits ═══
```

---

## Phase 5: Navigation Polish (Priority: LOW)

### Enhancements
- Consistent transition timing across all screens
- Breadcrumb awareness (where am I, where can I go)
- Keyboard shortcut hints

---

## Technical Approach

### Animation in Terminal
Ink/React allows re-rendering - animations work via:
1. `useState` for animation frame/progress
2. `useEffect` with `setInterval` for timing
3. Render different content based on progress

### Performance Considerations
- Keep intervals reasonable (50-100ms minimum)
- Clean up intervals on unmount
- Allow skip (any key during animation)

---

## File Structure (New)

```
src/ui/
├── animations/
│   ├── index.ts
│   ├── textReveal.ts      # Character/line reveal
│   ├── transitions.ts     # Screen transitions
│   └── pulse.ts           # Pulsing/breathing effects
├── screens/
│   ├── TitleScreen.tsx    # Extracted, animated
│   └── ... (future extractions)
├── theme/
│   ├── colors.ts          # Wuxia palette
│   ├── decorations.ts     # ASCII flourishes
│   └── index.ts           # Theme exports
```

---

## Task Breakdown

| # | Task | Priority | Est. |
|---|------|----------|------|
| 1 | Create colour palette (`theme/colors.ts`) | HIGH | 15m |
| 2 | Create text reveal animation utilities | HIGH | 30m |
| 3 | Extract TitleScreen component | HIGH | 20m |
| 4 | Implement animated title sequence | HIGH | 45m |
| 5 | Add thematic prompt ("begin your cultivation") | HIGH | 10m |
| 6 | Create transition utilities | MEDIUM | 30m |
| 7 | Integrate transitions into App.tsx | MEDIUM | 30m |
| 8 | Add menu decorations | MEDIUM | 20m |
| 9 | Polish and test all animations | LOW | 30m |

---

## Success Criteria

| Metric | Target |
|--------|--------|
| Title sequence | Atmospheric reveal, not instant dump |
| Transitions | Smooth, not jarring |
| Colours | Wuxia-appropriate, consistent |
| Performance | No perceptible lag |
| Skip option | Any key skips animations |
| Tests | Still 148 passing |

---

## Reference: Wuxia Aesthetic Notes

- **Cultivation** = slow, deliberate growth (match with measured animations)
- **Sects** = hierarchy, tradition (structured layouts, formal borders)
- **Qi/Chi** = flowing energy (subtle movement, not static)
- **Martial arts** = precision, impact (crisp transitions when needed)

---

**Last Updated:** 2025-12-30
