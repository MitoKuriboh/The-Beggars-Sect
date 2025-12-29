# Beggars Sect - Codebase Hardening Plan

**Created:** 2025-12-30 | **Status:** Ready for Implementation | **Est. Effort:** 3-4 sessions

---

## TL;DR

| Priority | Category | Items | Effort |
|----------|----------|-------|--------|
| 🔴 Critical | Memory Leaks + Error Handling | 3 | ~1 session |
| 🟠 High | Type Safety + Edge Cases | 4 | ~1 session |
| 🟡 Medium | Testing + Documentation | 4 | ~2 sessions |
| 🟢 Low | Polish | 3 | As-needed |

**Overall codebase health:** Good. Combat/Story engines are solid. UI layer needs attention.

---

## 🔴 CRITICAL (Session 1)

### 1. Memory Leaks in Save/Load Components

**Problem:** `setTimeout` callbacks without cleanup - components may fire after unmount.

| File | Lines | Issue |
|------|-------|-------|
| `src/ui/SaveLoadScreen.tsx` | 163, 196, 209, 221, 228, 245 | setTimeout without cleanup |
| `src/ui/status/SaveLoadTab.tsx` | 134, 140, 170, 178, 188, 210, 228, 235 | Same issue |

**Fix Pattern:**
```typescript
// BAD - current
setTimeout(() => {
  onComplete?.();
}, 1000);

// GOOD - with cleanup
const timeoutRef = useRef<NodeJS.Timeout>();

useEffect(() => {
  return () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };
}, []);

// Usage
timeoutRef.current = setTimeout(() => {
  onComplete?.();
}, 1000);
```

**Reference:** See `StoryScreen.tsx:143-150` for correct pattern already in codebase.

---

### 2. Error Handling in Save/Load Operations

**Problem:** Async operations catch errors but don't propagate to UI properly.

| File | Lines | Issue |
|------|-------|-------|
| `src/ui/SaveLoadScreen.tsx` | 163-245 | No try/catch in setTimeout callbacks |
| `src/ui/status/SaveLoadTab.tsx` | 134-252 | Same issue |
| `src/game/state/GameStore.ts` | 61-82 | Errors caught silently |

**Fix Pattern:**
```typescript
// Wrap operations with proper error handling
try {
  await GameStore.getInstance().saveGame(slot);
  setMessage({ type: 'success', text: 'Game saved!' });
} catch (error) {
  setMessage({
    type: 'error',
    text: error instanceof Error ? error.message : 'Save failed'
  });
}
```

---

### 3. Add ESLint Configuration

**Problem:** No linting enforcement - code quality can regress.

**Action:** Create `.eslintrc.json`:
```json
{
  "extends": [
    "eslint:recommended",
    "@typescript-eslint/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint", "react-hooks"],
  "rules": {
    "@typescript-eslint/no-explicit-any": "warn",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "no-console": ["warn", { "allow": ["warn", "error"] }]
  }
}
```

**Add to package.json:**
```json
"scripts": {
  "lint": "eslint src --ext .ts,.tsx",
  "lint:fix": "eslint src --ext .ts,.tsx --fix"
}
```

---

## 🟠 HIGH (Session 2)

### 4. Division by Zero Guard

**File:** `src/game/utils/ConditionParser.ts:75`

**Current:**
```typescript
value = (character.hp / character.maxHp) * 100;
```

**Fix:**
```typescript
value = character.maxHp > 0
  ? (character.hp / character.maxHp) * 100
  : 0;
```

Also check: `getHPPercent()` at line 129.

---

### 5. Type Safety - Remove `any` Types

| File | Lines | Current | Replacement |
|------|-------|---------|-------------|
| `src/ui/utils/input.ts` | 96, 106, 116 | `key: any` | `key: KeyEvent` |
| `src/ui/hooks/useMenuNavigation.ts` | 45 | `key: any` | `key: KeyEvent` |
| `src/ui/hooks/useStateWithRef.ts` | 25-28 | `any` return | Generic types |
| `src/ui/utils/input.ts` | 194, 213 | `any` in generics | Function constraints |

**Create shared type:**
```typescript
// src/types/ui.ts
export interface KeyEvent {
  upArrow?: boolean;
  downArrow?: boolean;
  leftArrow?: boolean;
  rightArrow?: boolean;
  return?: boolean;
  escape?: boolean;
  tab?: boolean;
  shift?: boolean;
  ctrl?: boolean;
  meta?: boolean;
}
```

---

### 6. Array Bounds Check

**File:** `src/ui/combat/CombatScreen.tsx:145`

**Current:**
```typescript
defeatedEnemies[defeatedEnemies.length - 1]
```

**Fix:**
```typescript
defeatedEnemies.length > 0
  ? defeatedEnemies[defeatedEnemies.length - 1]
  : null
```

---

### 7. Complete or Defer TODOs

| File | Line | TODO | Action |
|------|------|------|--------|
| `src/ui/status/AspectLoadoutDisplay.tsx` | 220 | `TODO: Implement slot selection UI` | Mark as Phase 2 |
| `src/ui/App.tsx` | 700 | `TODO: Skip to Chapter 1` | Implement when Chapter 1 ready |

**Pattern:** Replace `// TODO:` with `// DEFERRED:` for acknowledged future work.

---

## 🟡 MEDIUM (Sessions 3-4)

### 8. Add Unit Tests

**Priority test targets:**

| Module | File | What to Test |
|--------|------|--------------|
| Combat | `CombatEngine.ts` | Damage calc, ATB, status effects |
| AI | `AIController.ts` | Condition evaluation, action selection |
| Save/Load | `SaveManager.ts` | File ops, corruption recovery |
| Story | `StoryEngine.ts` | State transitions, choice handling |
| Utils | `ConditionParser.ts` | Edge cases, invalid input |

**Setup:**
```bash
npm install -D vitest @testing-library/react
```

**package.json:**
```json
"scripts": {
  "test": "vitest",
  "test:coverage": "vitest --coverage"
}
```

---

### 9. Add Module Documentation

**Files needing overview docs:**

| File | Lines | Priority |
|------|-------|----------|
| `src/ui/App.tsx` | 700+ | High - main entry, complex state |
| `src/ui/story/StoryScreen.tsx` | 600+ | High - core gameplay screen |
| `src/ui/combat/CombatScreen.tsx` | 500+ | Medium - complex but well-typed |

**Template:**
```typescript
/**
 * @module StoryScreen
 * @description Main narrative gameplay screen - displays story blocks,
 * handles choices, manages combat transitions.
 *
 * State Machine:
 * - idle → reading → choice/combat → idle
 *
 * Key Dependencies:
 * - StoryEngine: narrative logic
 * - GameStore: persistence
 */
```

---

### 10. Extract Magic Numbers

**Create constants file:** `src/game/config/UIConstants.ts`

```typescript
export const UI_TIMING = {
  MESSAGE_DISPLAY_MS: 1500,
  SAVE_FEEDBACK_MS: 1000,
  ANIMATION_FRAME_MS: 100,
  DEBOUNCE_MS: 150,
} as const;

export const SAVE_SYSTEM = {
  MAX_SLOTS: 4,
  APP_NAME: 'beggars-sect',
} as const;
```

**Files to update:**
- `SaveLoadScreen.tsx` - delay values
- `SaveLoadTab.tsx` - delay values
- `SaveManager.ts` - app name, slot count

---

### 11. Error Catch Type Safety

**Current:**
```typescript
} catch (e) {
  console.warn('Error:', e);
}
```

**Fix:**
```typescript
} catch (e: unknown) {
  const message = e instanceof Error ? e.message : 'Unknown error';
  console.warn('Error:', message);
}
```

**Files:** `StoryScreen.tsx:174`, `GameStore.ts:61-82`

---

## 🟢 LOW (As-Needed)

### 12. Fix SelectInput Type Cast

**File:** `src/ui/status/SaveLoadTab.tsx:9`

**Current:** `(SelectInput as any).default`

**Investigation needed:** Check if `@types/ink-select-input` has proper types or create declaration file.

---

### 13. Pre-commit Hooks

**Setup:**
```bash
npm install -D husky lint-staged
npx husky init
```

**.husky/pre-commit:**
```bash
npx lint-staged
```

**package.json:**
```json
"lint-staged": {
  "*.{ts,tsx}": ["eslint --fix", "prettier --write"]
}
```

---

### 14. Consolidate Message Delays

After extracting to `UI_TIMING`, ensure all timeout values reference constants instead of magic numbers.

---

## Implementation Checklist

### Session 1: Critical Fixes
- [ ] Fix SaveLoadScreen.tsx memory leaks (6 locations)
- [ ] Fix SaveLoadTab.tsx memory leaks (8 locations)
- [ ] Add error handling to save/load operations
- [ ] Create ESLint config
- [ ] Run `npm run lint` and fix critical issues
- [ ] Verify build passes

### Session 2: Type Safety
- [ ] Create `KeyEvent` interface in `src/types/ui.ts`
- [ ] Update `input.ts` to use `KeyEvent`
- [ ] Update `useMenuNavigation.ts` to use `KeyEvent`
- [ ] Fix `useStateWithRef.ts` generics
- [ ] Add division-by-zero guards
- [ ] Add array bounds checks
- [ ] Update TODOs to DEFERRED

### Session 3: Testing Foundation
- [ ] Install Vitest
- [ ] Configure test environment
- [ ] Write tests for `ConditionParser.ts`
- [ ] Write tests for `ComparisonEvaluator.ts`
- [ ] Write tests for `CombatEngine.ts` (core calculations)

### Session 4: Documentation & Polish
- [ ] Add module docs to App.tsx
- [ ] Add module docs to StoryScreen.tsx
- [ ] Create UIConstants.ts
- [ ] Replace magic numbers
- [ ] Fix catch block types
- [ ] Setup pre-commit hooks

---

## Files Reference (By Priority)

### 🔴 Critical
1. `src/ui/SaveLoadScreen.tsx`
2. `src/ui/status/SaveLoadTab.tsx`
3. `.eslintrc.json` (create)

### 🟠 High
4. `src/game/utils/ConditionParser.ts`
5. `src/ui/utils/input.ts`
6. `src/ui/hooks/useMenuNavigation.ts`
7. `src/ui/hooks/useStateWithRef.ts`
8. `src/ui/combat/CombatScreen.tsx`
9. `src/types/ui.ts` (create)

### 🟡 Medium
10. `src/game/config/UIConstants.ts` (create)
11. `src/ui/App.tsx`
12. `src/ui/story/StoryScreen.tsx`
13. `vitest.config.ts` (create)
14. `src/__tests__/` (create)

---

**Last Updated:** 2025-12-30
**Agent Reference:** a47fd43 (exploration agent for follow-up)
