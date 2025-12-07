/**
 * Training Manager
 * Handles mastery point calculations, unlocks, and training progression
 */

import type { Character, TrainingProgress } from '../../types/character';
import type { CombatResult } from '../../types/combat';
import { GAME_BALANCE } from '../config/GameBalance';

// =============================================================================
// MASTERY POINT CONFIGURATION
// =============================================================================

export const TRAINING_CONFIG = {
  /** Mastery points for training unlocks */
  unlocks: {
    firstTechnique: 50,
    secondStance: 100,
    advancedCombo: 150,
    finalTechnique: 200,
    demoMastery: 250,
  },

  /** Base mastery points per sparring win */
  baseMastery: 5,

  /** Bonus mastery points for performance */
  bonuses: {
    noDamageTaken: 5,
    comboExecuted: 3,
    stanceSwitch: 2,
    speedBonus: 5,       // Win under 10 turns
  },

  /** Maximum mastery per single match */
  maxMasteryPerMatch: 15,

  /** Speed bonus threshold (turns) */
  speedBonusThreshold: 10,
} as const;

// =============================================================================
// COMBAT RESULT ANALYSIS
// =============================================================================

export interface CombatPerformance {
  won: boolean;
  turns: number;
  damageTaken: number;
  damageDealt: number;
  combosExecuted: number;
  stanceSwitches: number;
  techniquesUsed: number;
}

/**
 * Calculate mastery points from combat performance
 */
export function calculateMasteryGain(performance: CombatPerformance): number {
  if (!performance.won) {
    return 1; // Small consolation prize for losing
  }

  let mastery = TRAINING_CONFIG.baseMastery;

  // No damage bonus
  if (performance.damageTaken === 0) {
    mastery += TRAINING_CONFIG.bonuses.noDamageTaken;
  }

  // Combo bonuses
  if (performance.combosExecuted > 0) {
    mastery += performance.combosExecuted * TRAINING_CONFIG.bonuses.comboExecuted;
  }

  // Stance switch bonuses
  if (performance.stanceSwitches > 0) {
    mastery += performance.stanceSwitches * TRAINING_CONFIG.bonuses.stanceSwitch;
  }

  // Speed bonus
  if (performance.turns <= TRAINING_CONFIG.speedBonusThreshold) {
    mastery += TRAINING_CONFIG.bonuses.speedBonus;
  }

  // Cap at maximum
  return Math.min(mastery, TRAINING_CONFIG.maxMasteryPerMatch);
}

/**
 * Get detailed mastery breakdown for display
 */
export function getMasteryBreakdown(performance: CombatPerformance): {
  base: number;
  bonuses: { reason: string; amount: number }[];
  total: number;
} {
  const bonuses: { reason: string; amount: number }[] = [];

  if (!performance.won) {
    return {
      base: 1,
      bonuses: [{ reason: 'Participation (loss)', amount: 1 }],
      total: 1,
    };
  }

  const base = TRAINING_CONFIG.baseMastery;

  if (performance.damageTaken === 0) {
    bonuses.push({
      reason: 'No Damage Taken',
      amount: TRAINING_CONFIG.bonuses.noDamageTaken,
    });
  }

  if (performance.combosExecuted > 0) {
    bonuses.push({
      reason: `${performance.combosExecuted} Combo${performance.combosExecuted > 1 ? 's' : ''}`,
      amount: performance.combosExecuted * TRAINING_CONFIG.bonuses.comboExecuted,
    });
  }

  if (performance.stanceSwitches > 0) {
    bonuses.push({
      reason: `${performance.stanceSwitches} Stance Switch${performance.stanceSwitches > 1 ? 'es' : ''}`,
      amount: performance.stanceSwitches * TRAINING_CONFIG.bonuses.stanceSwitch,
    });
  }

  if (performance.turns <= TRAINING_CONFIG.speedBonusThreshold) {
    bonuses.push({
      reason: `Speed Bonus (${performance.turns} turns)`,
      amount: TRAINING_CONFIG.bonuses.speedBonus,
    });
  }

  const total = Math.min(
    base + bonuses.reduce((sum, b) => sum + b.amount, 0),
    TRAINING_CONFIG.maxMasteryPerMatch
  );

  return { base, bonuses, total };
}

// =============================================================================
// UNLOCK PROGRESSION
// =============================================================================

/**
 * Get next unlock threshold and what it unlocks
 */
export function getNextUnlock(currentMastery: number): {
  threshold: number;
  unlockName: string;
  unlockDescription: string;
} | null {
  const unlocks = [
    {
      threshold: TRAINING_CONFIG.unlocks.firstTechnique,
      unlockName: 'Path-Exclusive Technique',
      unlockDescription: 'Unlock your first path-aligned technique',
    },
    {
      threshold: TRAINING_CONFIG.unlocks.secondStance,
      unlockName: 'Secondary Stance',
      unlockDescription: 'Unlock a second stance for tactical flexibility',
    },
    {
      threshold: TRAINING_CONFIG.unlocks.advancedCombo,
      unlockName: 'Advanced Combo',
      unlockDescription: 'Learn a powerful multi-technique combo',
    },
    {
      threshold: TRAINING_CONFIG.unlocks.finalTechnique,
      unlockName: 'Final Prologue Technique',
      unlockDescription: 'Master a powerful finishing move',
    },
    {
      threshold: TRAINING_CONFIG.unlocks.demoMastery,
      unlockName: 'Demo Master',
      unlockDescription: 'You have mastered the demo - Chapter 1 awaits!',
    },
  ];

  return unlocks.find(u => currentMastery < u.threshold) || null;
}

/**
 * Check if mastery threshold was crossed
 */
export function checkUnlockThreshold(
  oldMastery: number,
  newMastery: number
): {
  threshold: number;
  unlockName: string;
  unlockDescription: string;
} | null {
  const thresholds = Object.values(TRAINING_CONFIG.unlocks);

  for (const threshold of thresholds) {
    if (oldMastery < threshold && newMastery >= threshold) {
      const unlock = getNextUnlock(oldMastery);
      if (unlock && unlock.threshold === threshold) {
        return unlock;
      }
    }
  }

  return null;
}

// =============================================================================
// TRAINING PROGRESS MANAGEMENT
// =============================================================================

/**
 * Award mastery points and update training progress
 */
export function awardMasteryPoints(
  character: Character,
  performance: CombatPerformance
): {
  masteryGained: number;
  newTotal: number;
  unlockTriggered: {
    threshold: number;
    unlockName: string;
    unlockDescription: string;
  } | null;
  breakdown: ReturnType<typeof getMasteryBreakdown>;
} {
  if (!character.trainingProgress) {
    throw new Error('Character has no training progress');
  }

  const masteryGained = calculateMasteryGain(performance);
  const oldMastery = character.trainingProgress.masteryPoints;
  const newTotal = oldMastery + masteryGained;

  // Update character progress
  character.trainingProgress.masteryPoints = newTotal;

  if (performance.won) {
    character.trainingProgress.sparringWins += 1;

    // Update best performance records
    const best = character.trainingProgress.bestPerformance;
    if (performance.turns < best.fastestWin) {
      best.fastestWin = performance.turns;
    }
    if (performance.damageDealt > best.mostDamage) {
      best.mostDamage = performance.damageDealt;
    }
    if (performance.combosExecuted > best.longestCombo) {
      best.longestCombo = performance.combosExecuted;
    }
  }

  // Check for unlocks
  const unlockTriggered = checkUnlockThreshold(oldMastery, newTotal);
  const breakdown = getMasteryBreakdown(performance);

  return {
    masteryGained,
    newTotal,
    unlockTriggered,
    breakdown,
  };
}

/**
 * Get progress percentage to next unlock
 */
export function getProgressToNextUnlock(currentMastery: number): {
  percent: number;
  current: number;
  needed: number;
  unlockName: string;
} | null {
  const nextUnlock = getNextUnlock(currentMastery);

  if (!nextUnlock) {
    return null; // Max mastery reached
  }

  // Find previous threshold
  const thresholds = Object.values(TRAINING_CONFIG.unlocks).sort((a, b) => a - b);
  const currentThresholdIndex = thresholds.findIndex(t => t > currentMastery);
  const previousThreshold = currentThresholdIndex > 0 ? thresholds[currentThresholdIndex - 1] : 0;

  const current = currentMastery - (previousThreshold ?? 0);
  const needed = nextUnlock.threshold - (previousThreshold ?? 0);
  const percent = Math.floor((current / needed) * 100);

  return {
    percent,
    current: currentMastery,
    needed: nextUnlock.threshold,
    unlockName: nextUnlock.unlockName,
  };
}
