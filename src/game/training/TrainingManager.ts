/**
 * Training Manager
 * Handles mastery point calculations, unlocks, and training progression
 */

import type { Character } from "../../types/character";

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
    speedBonus: 5, // Win under 10 turns
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
    mastery +=
      performance.combosExecuted * TRAINING_CONFIG.bonuses.comboExecuted;
  }

  // Stance switch bonuses
  if (performance.stanceSwitches > 0) {
    mastery +=
      performance.stanceSwitches * TRAINING_CONFIG.bonuses.stanceSwitch;
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
      bonuses: [{ reason: "Participation (loss)", amount: 1 }],
      total: 1,
    };
  }

  const base = TRAINING_CONFIG.baseMastery;

  if (performance.damageTaken === 0) {
    bonuses.push({
      reason: "No Damage Taken",
      amount: TRAINING_CONFIG.bonuses.noDamageTaken,
    });
  }

  if (performance.combosExecuted > 0) {
    bonuses.push({
      reason: `${performance.combosExecuted} Combo${performance.combosExecuted > 1 ? "s" : ""}`,
      amount:
        performance.combosExecuted * TRAINING_CONFIG.bonuses.comboExecuted,
    });
  }

  if (performance.stanceSwitches > 0) {
    bonuses.push({
      reason: `${performance.stanceSwitches} Stance Switch${performance.stanceSwitches > 1 ? "es" : ""}`,
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
    TRAINING_CONFIG.maxMasteryPerMatch,
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
      unlockName: "Path-Exclusive Technique",
      unlockDescription: "Unlock your first path-aligned technique",
    },
    {
      threshold: TRAINING_CONFIG.unlocks.secondStance,
      unlockName: "Secondary Stance",
      unlockDescription: "Unlock a second stance for tactical flexibility",
    },
    {
      threshold: TRAINING_CONFIG.unlocks.advancedCombo,
      unlockName: "Advanced Combo",
      unlockDescription: "Learn a powerful multi-technique combo",
    },
    {
      threshold: TRAINING_CONFIG.unlocks.finalTechnique,
      unlockName: "Final Prologue Technique",
      unlockDescription: "Master a powerful finishing move",
    },
    {
      threshold: TRAINING_CONFIG.unlocks.demoMastery,
      unlockName: "Demo Master",
      unlockDescription: "You have mastered the demo - Chapter 1 awaits!",
    },
  ];

  return unlocks.find((u) => currentMastery < u.threshold) || null;
}

/**
 * Check if mastery threshold was crossed
 */
export function checkUnlockThreshold(
  oldMastery: number,
  newMastery: number,
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
  performance: CombatPerformance,
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
    throw new Error("Character has no training progress");
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
  const thresholds = Object.values(TRAINING_CONFIG.unlocks).sort(
    (a, b) => a - b,
  );
  const currentThresholdIndex = thresholds.findIndex((t) => t > currentMastery);
  const previousThreshold =
    currentThresholdIndex > 0 ? thresholds[currentThresholdIndex - 1] : 0;

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

// =============================================================================
// TRAINING CHALLENGES
// =============================================================================

export type ChallengeDifficulty =
  | "beginner"
  | "intermediate"
  | "advanced"
  | "master";
export type ChallengeCategory =
  | "technique"
  | "stance"
  | "survival"
  | "path-trial";

export interface TrainingChallenge {
  id: string;
  name: string;
  chinese: string;
  description: string;
  category: ChallengeCategory;
  difficulty: ChallengeDifficulty;
  opponentId: string; // Enemy template ID
  conditions: ChallengeCondition[];
  rewards: {
    masteryPoints: number;
    techniqueTaught?: string;
  };
  requiredMastery?: number;
  pathRequirement?: "blade" | "stream" | "shadow";
}

export interface ChallengeCondition {
  type:
    | "win"
    | "no-damage"
    | "max-turns"
    | "min-combos"
    | "min-stance-switches"
    | "use-technique"
    | "use-stance";
  value?: number;
  techniqueId?: string;
  stanceId?: string;
}

export interface ChallengeResult {
  challengeId: string;
  passed: boolean;
  conditionsMet: Record<string, boolean>;
  performance: CombatPerformance;
  rewardsEarned: {
    masteryPoints: number;
    techniqueTaught?: string;
  };
}

/**
 * Training Challenges Registry
 * Structured combat scenarios with specific victory conditions
 */
export const TRAINING_CHALLENGES: TrainingChallenge[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // BEGINNER CHALLENGES
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "basics-101",
    name: "The Fundamentals",
    chinese: "基础功",
    description: "Defeat a training partner using only basic attacks.",
    category: "technique",
    difficulty: "beginner",
    opponentId: "brother-kang",
    conditions: [{ type: "win" }],
    rewards: { masteryPoints: 10 },
  },
  {
    id: "perfect-defense",
    name: "Perfect Defense",
    chinese: "完美防守",
    description: "Win a match without taking any damage.",
    category: "survival",
    difficulty: "beginner",
    opponentId: "brother-kang",
    conditions: [{ type: "win" }, { type: "no-damage" }],
    rewards: { masteryPoints: 20 },
    requiredMastery: 25,
  },
  {
    id: "swift-victory",
    name: "Swift Victory",
    chinese: "速胜",
    description: "Defeat your opponent in 8 turns or fewer.",
    category: "technique",
    difficulty: "beginner",
    opponentId: "brother-kang",
    conditions: [{ type: "win" }, { type: "max-turns", value: 8 }],
    rewards: { masteryPoints: 15 },
    requiredMastery: 15,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // INTERMEDIATE CHALLENGES
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "flowing-water",
    name: "Flowing Water",
    chinese: "流水",
    description: "Switch stances at least 3 times during combat.",
    category: "stance",
    difficulty: "intermediate",
    opponentId: "brother-feng-sparring",
    conditions: [{ type: "win" }, { type: "min-stance-switches", value: 3 }],
    rewards: { masteryPoints: 25 },
    requiredMastery: 50,
  },
  {
    id: "combo-master",
    name: "Combo Master",
    chinese: "连击大师",
    description: "Execute at least 2 combos during the match.",
    category: "technique",
    difficulty: "intermediate",
    opponentId: "brother-feng-sparring",
    conditions: [{ type: "win" }, { type: "min-combos", value: 2 }],
    rewards: { masteryPoints: 25 },
    requiredMastery: 75,
  },
  {
    id: "elder-test",
    name: "Elder's Test",
    chinese: "长老试炼",
    description: "Prove your worth against Elder Wu in under 10 turns.",
    category: "survival",
    difficulty: "intermediate",
    opponentId: "elder-wu-training",
    conditions: [{ type: "win" }, { type: "max-turns", value: 10 }],
    rewards: { masteryPoints: 30 },
    requiredMastery: 100,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // ADVANCED CHALLENGES
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "flawless-elder",
    name: "Flawless Victory",
    chinese: "完胜",
    description: "Defeat Elder Mei without taking damage.",
    category: "survival",
    difficulty: "advanced",
    opponentId: "elder-mei-training",
    conditions: [{ type: "win" }, { type: "no-damage" }],
    rewards: { masteryPoints: 40 },
    requiredMastery: 150,
  },
  {
    id: "tactical-genius",
    name: "Tactical Genius",
    chinese: "战术天才",
    description: "Win with 3+ combos and 3+ stance switches.",
    category: "stance",
    difficulty: "advanced",
    opponentId: "elder-mei-training",
    conditions: [
      { type: "win" },
      { type: "min-combos", value: 3 },
      { type: "min-stance-switches", value: 3 },
    ],
    rewards: { masteryPoints: 50 },
    requiredMastery: 175,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // PATH TRIALS
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "trial-blade",
    name: "Trial of the Blade",
    chinese: "刀锋试炼",
    description:
      "Overwhelming force. Win in 6 turns or less without switching stance.",
    category: "path-trial",
    difficulty: "master",
    opponentId: "brother-feng-sparring",
    conditions: [
      { type: "win" },
      { type: "max-turns", value: 6 },
      { type: "min-stance-switches", value: 0 }, // No switches = pure aggression
    ],
    rewards: { masteryPoints: 75, techniqueTaught: "iron-palm" },
    requiredMastery: 200,
    pathRequirement: "blade",
  },
  {
    id: "trial-stream",
    name: "Trial of the Stream",
    chinese: "流水试炼",
    description:
      "Adaptability through flow. Win with 5+ stance switches and no damage.",
    category: "path-trial",
    difficulty: "master",
    opponentId: "elder-mei-training",
    conditions: [
      { type: "win" },
      { type: "min-stance-switches", value: 5 },
      { type: "no-damage" },
    ],
    rewards: { masteryPoints: 75, techniqueTaught: "flowing-counter" },
    requiredMastery: 200,
    pathRequirement: "stream",
  },
  {
    id: "trial-shadow",
    name: "Trial of the Shadow",
    chinese: "暗影试炼",
    description:
      "Patience and precision. Win with 4+ combos, taking no damage.",
    category: "path-trial",
    difficulty: "master",
    opponentId: "elder-wu-training",
    conditions: [
      { type: "win" },
      { type: "min-combos", value: 4 },
      { type: "no-damage" },
    ],
    rewards: { masteryPoints: 75, techniqueTaught: "shadow-step" },
    requiredMastery: 200,
    pathRequirement: "shadow",
  },
];

/**
 * Evaluate if challenge conditions were met
 */
export function evaluateChallengeConditions(
  challenge: TrainingChallenge,
  performance: CombatPerformance,
): { passed: boolean; conditionsMet: Record<string, boolean> } {
  const conditionsMet: Record<string, boolean> = {};
  let allPassed = true;

  for (const condition of challenge.conditions) {
    let met = false;

    switch (condition.type) {
      case "win":
        met = performance.won;
        break;
      case "no-damage":
        met = performance.damageTaken === 0;
        break;
      case "max-turns":
        met = performance.turns <= (condition.value ?? 99);
        break;
      case "min-combos":
        met = performance.combosExecuted >= (condition.value ?? 0);
        break;
      case "min-stance-switches":
        // value of 0 means NO stance switches allowed
        if (condition.value === 0) {
          met = performance.stanceSwitches === 0;
        } else {
          met = performance.stanceSwitches >= (condition.value ?? 0);
        }
        break;
      default:
        met = true; // Unknown conditions pass by default
    }

    conditionsMet[condition.type] = met;
    if (!met) allPassed = false;
  }

  return { passed: allPassed, conditionsMet };
}

/**
 * Get challenges available to a player based on mastery and path
 */
export function getAvailableChallenges(
  currentMastery: number,
  completedChallenges: string[],
  dominantPath?: "blade" | "stream" | "shadow",
): TrainingChallenge[] {
  return TRAINING_CHALLENGES.filter((challenge) => {
    // Skip already completed
    if (completedChallenges.includes(challenge.id)) return false;

    // Check mastery requirement
    if (
      challenge.requiredMastery &&
      currentMastery < challenge.requiredMastery
    ) {
      return false;
    }

    // Check path requirement for path trials
    if (
      challenge.pathRequirement &&
      challenge.pathRequirement !== dominantPath
    ) {
      return false;
    }

    return true;
  });
}

/**
 * Get challenges by category
 */
export function getChallengesByCategory(
  category: ChallengeCategory,
): TrainingChallenge[] {
  return TRAINING_CHALLENGES.filter((c) => c.category === category);
}

/**
 * Get a specific challenge by ID
 */
export function getChallengeById(id: string): TrainingChallenge | undefined {
  return TRAINING_CHALLENGES.find((c) => c.id === id);
}

/**
 * Process challenge completion
 */
export function completeChallengeAttempt(
  character: Character,
  challengeId: string,
  performance: CombatPerformance,
): ChallengeResult {
  const challenge = getChallengeById(challengeId);

  if (!challenge) {
    throw new Error(`Unknown challenge: ${challengeId}`);
  }

  const { passed, conditionsMet } = evaluateChallengeConditions(
    challenge,
    performance,
  );

  const rewardsEarned: ChallengeResult["rewardsEarned"] = { masteryPoints: 0 };

  if (passed && character.trainingProgress) {
    // Award mastery points
    rewardsEarned.masteryPoints = challenge.rewards.masteryPoints;
    character.trainingProgress.masteryPoints += challenge.rewards.masteryPoints;

    // Mark challenge as completed
    if (!character.trainingProgress.challengesCompleted.includes(challengeId)) {
      character.trainingProgress.challengesCompleted.push(challengeId);
    }

    // Unlock technique if applicable
    if (challenge.rewards.techniqueTaught) {
      rewardsEarned.techniqueTaught = challenge.rewards.techniqueTaught;
      if (!character.techniques.includes(challenge.rewards.techniqueTaught)) {
        character.techniques.push(challenge.rewards.techniqueTaught);
      }
    }

    // Mark path trial as completed
    if (challenge.category === "path-trial" && challenge.pathRequirement) {
      character.trainingProgress.pathTrialCompleted[challenge.pathRequirement] =
        true;
    }
  }

  return {
    challengeId,
    passed,
    conditionsMet,
    performance,
    rewardsEarned,
  };
}

/**
 * Get player's dominant path based on alignment
 */
export function getDominantPath(pathAlignment: {
  blade: number;
  stream: number;
  shadow: number;
}): "blade" | "stream" | "shadow" {
  const { blade, stream, shadow } = pathAlignment;

  if (blade >= stream && blade >= shadow) return "blade";
  if (stream >= blade && stream >= shadow) return "stream";
  return "shadow";
}
