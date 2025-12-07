# Training System Integration

**Last Updated:** 2025-12-07
**Status:** Complete
**Version:** v0.3.7

---

## Overview

The training system provides a post-prologue progression loop where players:
1. Enter Training Grounds from main hub
2. Fight training dummy (sparring match)
3. Earn mastery points (5-10 per win)
4. Unlock new techniques as mastery increases
5. Return to training menu to repeat

This creates a satisfying gameplay loop that gates technique progression while allowing players to practice combat.

---

## System Components

### 1. Training Menu (`src/ui/training/TrainingMenu.tsx`)

**Features:**
- Displays current mastery points
- Shows progress to next unlock
- Training statistics (wins, best performance)
- Technique unlock preview (toggle with T key)
- Access to sparring matches

**Navigation:**
- `[1]` - Start sparring match
- `[T]` - Toggle technique unlock details
- `[ESC]` - Return to main hub

### 2. Sparring Match Flow

**Flow:**
```
Stats Screen → Training Grounds → Sparring Match → Combat → Training Grounds
     ↑                                                              ↓
     └──────────────────────────────────────────────────────────────┘
```

**Implementation (`src/ui/App.tsx`):**

1. **Navigation State:**
   ```typescript
   const [returnToTraining, setReturnToTraining] = useState(false);
   ```

2. **Handler:**
   ```typescript
   const handleSparring = useCallback(() => {
     const player = GameStore.getPlayer();
     const difficulty = GameStore.getState()?.difficulty || 'medium';
     const dummy = createTrainingDummy(player, difficulty);
     setCombatEnemies([dummy]);
     setReturnToTraining(true);
     setScreen('combat');
   }, []);
   ```

3. **Combat End:**
   ```typescript
   if (returnToTraining) {
     goToTraining();
   }
   ```

### 3. Training Dummy (`src/game/factories/CharacterFactory.ts`)

**Function:** `createTrainingDummy(player: Character, difficulty: Difficulty): Character`

**Behavior:**
- Mirrors player stats (HP, Chi, Attack, Defense)
- Scaled by difficulty multiplier
- Has same techniques as player
- Named "Training Dummy" for clarity

**Scaling:**
- **Easy:** 0.6x stats
- **Medium:** 0.8x stats
- **Hard:** 1.0x stats
- **Hell:** 1.2x stats

### 4. Mastery Point Rewards

**Source:** `src/game/training/TrainingManager.ts`

```typescript
export function calculateSparringReward(
  performance: {
    fastestWin: number;
    mostDamage: number;
    longestCombo: number;
  },
  difficulty: Difficulty
): number {
  const baseReward = 5; // Base mastery points

  // Bonus for performance
  const performanceBonus =
    (performance.longestCombo >= 3 ? 2 : 0) +
    (performance.fastestWin <= 5 ? 2 : 0) +
    (performance.mostDamage >= 50 ? 1 : 0);

  // Difficulty multiplier
  const difficultyMultiplier = {
    easy: 0.8,
    medium: 1.0,
    hard: 1.3,
    hell: 1.5,
  }[difficulty];

  const total = Math.floor((baseReward + performanceBonus) * difficultyMultiplier);
  return Math.max(total, 3); // Minimum 3 points
}
```

**Typical Rewards:**
- **Easy:** 3-8 points
- **Medium:** 5-10 points
- **Hard:** 7-13 points
- **Hell:** 8-15 points

### 5. Technique Unlock Display

**Feature:** Press `T` in Training Menu to toggle detailed technique list

**Shows 3 Categories:**

1. **Available to Unlock (Green):**
   - Player meets all requirements
   - Can be unlocked immediately
   - Shows technique name, Chinese name, description

2. **Locked (Dimmed):**
   - Player does NOT meet requirements yet
   - Shows what's needed (e.g., "Requires: 30% Blade, 50 mastery")
   - Preview of upcoming techniques

3. **Known (Cyan):**
   - Techniques player already has
   - Includes unlocked-by-default techniques

**Example Display:**
```
AVAILABLE TO UNLOCK:
  ● Shattering Strike (破击) - A powerful strike that breaks through defenses...
  ● Calm Water Palm (静水掌) - A gentle palm strike that flows around attacks...

UPCOMING (Locked):
  ○ Explosive Fist (爆拳)
     → Requires: 40% Blade, 100 mastery, Burst aspect
  ○ Vital Point Strike (要穴击)
     → Requires: 35% Shadow, 80 mastery, Precision aspect
```

---

## Integration Points

### Stats Screen Menu

**Location:** `src/ui/App.tsx` - `StatsScreen` component

**Added Menu Item:**
```typescript
{ label: '🥋 Training Grounds', value: 'training' }
```

**Props:**
- Added `onTraining: () => void` prop
- Calls `goToTraining()` navigation handler

### Screen Navigation

**New Screen Type:**
```typescript
type Screen = 'title' | 'menu' | 'newgame' | 'skip-prologue' | 'stats' | 'story' | 'combat' | 'training' | 'credits' | 'save' | 'load' | 'settings';
```

**Navigation Handlers:**
```typescript
const goToTraining = useCallback(() => {
  console.clear();
  setScreen('training');
}, []);
```

### Combat Screen Integration

**Combat End Handler:**
```typescript
const handleCombatEnd = useCallback((result, updatedPlayer) => {
  // ... result handling ...

  if (returnToStory) {
    goToStory();
  } else if (returnToTraining) {
    goToTraining(); // Return to training after sparring
  } else {
    goToStats();
  }
}, [returnToStory, returnToTraining]);
```

---

## Progression Flow

### First-Time Flow

1. **New Game** → Select difficulty
2. **Prologue** → Complete story scenes
3. **Stats Screen** → See "🥋 Training Grounds" option
4. **Training Menu** → View mastery: 0 points, progress bar empty
5. **Sparring Match** → Fight dummy, win combat
6. **Training Menu** → Mastery: 5-10 points, progress bar updated
7. **Repeat** → Grind until 50 mastery reached
8. **Unlock** → First path techniques become available
9. **Aspect Tab** → Check unlocked aspects
10. **Continue** → Unlock more techniques, prepare for Chapter 1

### Mastery Milestones

| Mastery | Unlock |
|---------|--------|
| 0 | Game start, no techniques |
| 50 | **First path techniques** (e.g., Shattering Strike) |
| 80 | Secondary path techniques (Shadow) |
| 100 | More powerful techniques (e.g., Explosive Fist) |
| 150+ | Advanced techniques (Chapter 1+) |

### Technique Gating Example

**Shattering Strike (Blade Path):**
- Requires: 30% Blade path, Force aspect unlocked, 50 mastery
- Player starts at: 33% Blade, Force unlocked, 0 mastery
- **Bottleneck:** Mastery points (need 50)
- **Solution:** Win ~5-10 sparring matches

**Explosive Fist (Blade Path):**
- Requires: 40% Blade path, Burst aspect unlocked, 100 mastery
- **Bottleneck:** Burst aspect + mastery + path %
- **Solution:** Make Blade choices in story, unlock Burst aspect (50 mastery), grind to 100 mastery

---

## Player Experience

### Positive Feedback Loop

1. **Enter Training** → See locked techniques
2. **Spar** → Earn mastery points
3. **Progress Bar** → Visual progress toward unlock
4. **Unlock** → New technique available!
5. **Test Technique** → Use in next sparring match
6. **Improved Combat** → Better performance = more points
7. **Faster Unlocks** → Snowball effect

### UI/UX Features

**Clear Goals:**
- "Next Unlock: Shattering Strike"
- "Progress: 30/50 (60%)"
- Progress bar: `████████████░░░░░░░░` (visual feedback)

**Transparency:**
- Shows exactly what's needed for locked techniques
- "Requires: 30% Blade, 50 mastery, Force aspect"
- No hidden requirements

**Satisfying Progression:**
- Immediate feedback (points awarded after combat)
- Visible progress bar updates
- Technique unlock notifications (when implemented)

---

## Technical Details

### File Changes

**Modified:**
- `src/ui/App.tsx` - Added training screen, navigation, sparring handler
- `src/ui/training/TrainingMenu.tsx` - Added technique unlock display
- `src/ui/status/StatusMenu.tsx` - Added Aspects tab

**Created:**
- `docs/systems/TRAINING_INTEGRATION.md` (this file)

**Used Existing:**
- `src/game/factories/CharacterFactory.ts` - `createTrainingDummy()`
- `src/game/training/TrainingManager.ts` - Mastery point calculations
- `src/game/combat/TechniqueRegistry.ts` - Technique definitions with unlock requirements

### State Management

**Training Flow State:**
```typescript
const [returnToTraining, setReturnToTraining] = useState(false);
```

**Set when entering sparring:**
```typescript
setReturnToTraining(true);
```

**Cleared when exiting:**
```typescript
setReturnToTraining(false);
```

### Type Safety

All TypeScript interfaces extended properly:
- `Screen` type includes `'training'`
- `StatsScreen` props include `onTraining`
- No build errors, full type coverage

---

## Future Enhancements

**Potential Additions:**
1. **Unlock Notifications** - Toast/modal when technique unlocked
2. **Stance Training** - Practice stance switching (menu option exists, disabled)
3. **Technique Challenges** - Specific combat scenarios to master techniques
4. **Path Trials** - Test player's commitment to Blade/Stream/Shadow
5. **Training Dialogue** - Elder Wu comments on progress
6. **Daily Training Bonus** - First win of the day = bonus mastery
7. **Mastery Leaderboard** - Compare with friends (multiplayer feature)

**Not Planned for v0.3.x:**
- Advanced training modes (future chapters)
- Multiple training opponents
- Training story scenes

---

## Testing Checklist

- [x] Training menu accessible from Stats Screen
- [x] Sparring match starts combat with training dummy
- [x] Combat victory awards mastery points
- [x] Progress bar updates correctly
- [x] Technique unlock display shows available/locked techniques
- [x] Technique requirements displayed accurately
- [x] Returns to training menu after combat
- [x] ESC key returns to Stats Screen
- [x] T key toggles technique details
- [x] No TypeScript build errors
- [x] Difficulty scaling works for training dummy

---

## Related Documentation

- [Progression System](PROGRESSION_SYSTEM.md) - Overall progression design
- [Starter Techniques](STARTER_TECHNIQUES.md) - Path-specific technique trees
- [Combat System](COMBAT_SYSTEM.md) - ATB combat mechanics
- [Training Manager](../game/training/) - Mastery point logic

---

**Status:** ✅ Complete and integrated
**Version:** v0.3.7
**Last Updated:** 2025-12-07
