/**
 * Game Balance Configuration
 * Centralized location for all combat balance constants and magic numbers
 *
 * This file consolidates all hardcoded values from across the codebase
 * into a single source of truth for game balance tuning.
 */

// =============================================================================
// ATB (Active Time Battle) SYSTEM
// =============================================================================

export const ATB_CONFIG = {
  /**
   * Random variance applied to initial turn values (0-5)
   * Lower variance = DEX has more consistent impact on turn order
   */
  turnVariance: 5,

  /**
   * DEX divisor for turn speed calculation
   * Turn speed = base tick rate + (DEX / this value)
   */
  dexSpeedDivisor: 5,

  /**
   * Threshold value for when a character is ready to act
   * Default is 100 (from DEFAULT_COMBAT_CONFIG)
   */
  turnThreshold: 100,

  /**
   * Base tick rate for all characters
   * Default is 10 (from DEFAULT_COMBAT_CONFIG)
   */
  baseTickRate: 10,
} as const;

// =============================================================================
// COMBAT MECHANICS
// =============================================================================

export const COMBAT_CONFIG = {
  /**
   * Base power of basic attacks (no technique)
   */
  basicAttackPower: 10,

  /**
   * Minimum HP that self-damage effects can reduce a character to
   * Prevents killing yourself with recoil
   */
  minRecoilHp: 1,

  /**
   * Damage reduction when defending
   * Final damage = incoming damage * (1 - this value)
   */
  defendingDamageReduction: 0.5,

  /**
   * Critical hit chance per point of DEX
   * Total crit chance = DEX * this value
   * Example: 40 DEX = 40% crit chance
   */
  critChancePerDex: 0.01,

  /**
   * Critical hit damage multiplier
   */
  critDamageMultiplier: 1.5,

  /**
   * Minimum damage that can be dealt (prevents 0 or negative damage)
   */
  minDamage: 1,

  /**
   * Defense effectiveness multiplier
   * Final damage = base damage - (defense * this value)
   */
  defenseEffectiveness: 0.5,

  /**
   * Damage variance range (±)
   * Actual variance is random between (1 - this value) and (1 + this value)
   */
  damageVariance: 0.1,
} as const;

// =============================================================================
// STATUS EFFECTS
// =============================================================================

export const STATUS_EFFECT_CONFIG = {
  /**
   * Default duration for buff effects (in turns)
   */
  buffDefaultDuration: 3,

  /**
   * Default duration for debuff effects (in turns)
   */
  debuffDefaultDuration: 3,

  /**
   * Default duration for counter stance (in turns)
   */
  counterDuration: 1,

  /**
   * Default stun chance when effect doesn't specify
   */
  defaultStunChance: 0.3,

  /**
   * Poison damage per turn (as percentage of max HP)
   */
  poisonDamagePercent: 0.05,

  /**
   * Regeneration healing per turn (as percentage of max HP)
   */
  regenHealPercent: 0.05,
} as const;

// =============================================================================
// COMBO SYSTEM
// =============================================================================

export const COMBO_CONFIG = {
  /**
   * Maximum combo multiplier (1.6 = 60% damage bonus)
   */
  maxMultiplier: 1.6,

  /**
   * Multiplier increase per technique in combo
   * Each technique adds 15% to the multiplier
   */
  multiplierPerTechnique: 0.15,

  /**
   * Base combo multiplier (no bonus)
   */
  baseMultiplier: 1.0,

  /**
   * Chi refund per technique when combo is completed
   * Each technique in successful combo refunds 3 chi
   */
  chiRefundPerTechnique: 3,

  /**
   * Maximum combo length (starter + 2 followups + finisher = 4)
   */
  maxComboLength: 4,
} as const;

// =============================================================================
// MULTI-HIT ATTACKS
// =============================================================================

export const MULTI_HIT_CONFIG = {
  /**
   * Damage scale for multi-hit attacks
   * Each hit deals base damage * this value
   * (Prevents multi-hits from being overpowered)
   */
  damageScale: 0.8,

  /**
   * Maximum number of hits for multi-hit attacks
   */
  maxHits: 5,
} as const;

// =============================================================================
// FLEE MECHANICS
// =============================================================================

export const FLEE_CONFIG = {
  /**
   * Base chance to successfully flee (50%)
   */
  baseChance: 0.5,

  /**
   * DEX advantage multiplier for flee chance
   * Flee chance += (player DEX - avg enemy DEX) * this value
   */
  dexAdvantageMultiplier: 0.05,

  /**
   * Maximum flee chance (prevents guaranteed escape)
   */
  maxChance: 0.95,

  /**
   * Minimum flee chance (always some risk)
   */
  minChance: 0.1,
} as const;

// =============================================================================
// CHI MANAGEMENT
// =============================================================================

export const CHI_CONFIG = {
  /**
   * Base chi generation from attacking
   */
  baseAttackGeneration: 5,

  /**
   * Chi generation from chi-focus action
   */
  focusGeneration: 20,

  /**
   * Chi generation from defending
   */
  defendGeneration: 10,

  /**
   * Maximum chi capacity
   * Default is 100 (from character stats)
   */
  maxChi: 100,

  /**
   * Starting chi at combat start
   * Default is 30 (from character stats)
   */
  startingChi: 30,
} as const;

// =============================================================================
// CHAPTER SCALING
// =============================================================================

export const CHAPTER_SCALING_CONFIG = {
  /**
   * Enemy stat scaling per chapter
   */
  chapterScaling: {
    prologue: {
      hpMultiplier: 1.0,
      statMultiplier: 1.0,
      damageScale: 1.0,
    },
    chapter1: {
      hpMultiplier: 1.5,
      statMultiplier: 1.2,
      damageScale: 1.2,
    },
    chapter2: {
      hpMultiplier: 2.0,
      statMultiplier: 1.5,
      damageScale: 1.5,
    },
    chapter3: {
      hpMultiplier: 2.5,
      statMultiplier: 1.8,
      damageScale: 1.8,
    },
  },

  /**
   * Boss stat multipliers (on top of chapter scaling)
   */
  bossMultipliers: {
    hp: 2.0,
    stats: 1.3,
    damage: 1.2,
  },
} as const;

// =============================================================================
// TECHNIQUE DEFAULTS
// =============================================================================

export const TECHNIQUE_DEFAULTS = {
  /**
   * Default technique speed (lower = faster)
   */
  speed: 50,

  /**
   * Default chi cost
   */
  chiCost: 10,

  /**
   * Default aspect (elemental type)
   */
  aspect: 'neutral' as const,

  /**
   * Default combo role
   */
  comboRole: 'none' as const,

  /**
   * Default unlock chapter
   */
  unlockChapter: 'prologue' as const,

  /**
   * Default unlocked status
   */
  unlockedByDefault: false,

  /**
   * Default effects array
   */
  effects: [],

  /**
   * Default mastery bonuses
   */
  masteryBonuses: {},

  /**
   * Default combo links
   */
  comboLinks: [],
} as const;

// =============================================================================
// PATH SYSTEM
// =============================================================================

export const PATH_CONFIG = {
  /**
   * Mapping of paths to their recommended stances
   * Auto-selected at combat start based on dominant path
   */
  stanceMapping: {
    blade: 'hungry' as const,    // Aggressive: High ATK, Low DEF, High SPD
    stream: 'flowing' as const,  // Balanced: Equal stats
    shadow: 'weathered' as const, // Defensive: Low ATK, High DEF, Low SPD
  },

  /**
   * Minimum path points required to unlock stance specialization
   * Below this, defaults to Flowing stance
   */
  specializationThreshold: 5,
} as const;

/**
 * Determine recommended stance based on character's path alignment
 * @param pathAlignment - Character's path points {blade, stream, shadow}
 * @returns Recommended stance type
 */
export function getRecommendedStance(pathAlignment: {
  blade: number;
  stream: number;
  shadow: number;
}): 'flowing' | 'weathered' | 'hungry' {
  // Find dominant path
  const paths = [
    { name: 'blade' as const, points: pathAlignment.blade },
    { name: 'stream' as const, points: pathAlignment.stream },
    { name: 'shadow' as const, points: pathAlignment.shadow },
  ];

  const dominant = paths.reduce((max, path) => (path.points > max.points ? path : max));

  // If below specialization threshold, default to Flowing
  if (dominant.points < PATH_CONFIG.specializationThreshold) {
    return 'flowing';
  }

  // Return stance for dominant path
  return PATH_CONFIG.stanceMapping[dominant.name];
}

// =============================================================================
// DIFFICULTY LEVEL SYSTEM (Easy/Medium/Hard/Hell)
// =============================================================================

export type DifficultyLevel = 'easy' | 'medium' | 'hard' | 'hell';

export const DIFFICULTY_LEVEL_CONFIG = {
  /**
   * AI decision-making quality multipliers
   */
  aiQuality: {
    easy: {
      reactionTime: 0.5,        // 50% chance to use optimal move
      mistakeChance: 0.3,       // 30% chance to make suboptimal choice
      aggressiveness: 0.7,      // Less aggressive
      defensiveness: 1.3,       // More defensive
      label: 'Easy',
      description: 'Forgiving difficulty - enemies make frequent mistakes',
    },
    medium: {
      reactionTime: 0.8,        // 80% chance to use optimal move
      mistakeChance: 0.15,      // 15% chance to make suboptimal choice
      aggressiveness: 1.0,      // Normal
      defensiveness: 1.0,       // Normal
      label: 'Medium',
      description: 'Balanced difficulty - standard enemy behavior',
    },
    hard: {
      reactionTime: 1.0,        // Always uses optimal move
      mistakeChance: 0.05,      // 5% chance to make suboptimal choice
      aggressiveness: 1.2,      // More aggressive
      defensiveness: 0.9,       // Less defensive
      label: 'Hard',
      description: 'Challenging difficulty - enemies fight optimally',
    },
    hell: {
      reactionTime: 1.0,        // Perfect AI
      mistakeChance: 0.0,       // No mistakes
      aggressiveness: 1.5,      // Maximum aggression
      defensiveness: 0.8,       // Minimal defense
      label: 'Hell',
      description: 'Brutal difficulty - enemies are relentless and perfect',
    },
  },

  /**
   * Enemy stat multipliers by difficulty
   */
  statMultipliers: {
    easy: {
      hp: 0.8,          // 80% HP
      damage: 0.7,      // 70% damage
      defense: 0.8,     // 80% defense
      speed: 0.9,       // 90% speed
    },
    medium: {
      hp: 1.0,          // 100% HP (default)
      damage: 1.0,      // 100% damage
      defense: 1.0,     // 100% defense
      speed: 1.0,       // 100% speed
    },
    hard: {
      hp: 1.2,          // 120% HP
      damage: 1.3,      // 130% damage
      defense: 1.1,     // 110% defense
      speed: 1.1,       // 110% speed
    },
    hell: {
      hp: 1.5,          // 150% HP
      damage: 1.5,      // 150% damage
      defense: 1.3,     // 130% defense
      speed: 1.2,       // 120% speed
    },
  },

  /**
   * Player stat adjustments by difficulty (for balancing)
   */
  playerAdjustments: {
    easy: {
      damageDealt: 1.2,     // Deal 120% damage
      damageTaken: 0.8,     // Take 80% damage
    },
    medium: {
      damageDealt: 1.0,     // Normal
      damageTaken: 1.0,     // Normal
    },
    hard: {
      damageDealt: 0.9,     // Deal 90% damage
      damageTaken: 1.1,     // Take 110% damage
    },
    hell: {
      damageDealt: 0.8,     // Deal 80% damage
      damageTaken: 1.3,     // Take 130% damage
    },
  },
} as const;

// =============================================================================
// MASTERY SYSTEM
// =============================================================================

export const MASTERY_CONFIG = {
  /**
   * Maximum mastery level for techniques
   */
  maxLevel: 5,

  /**
   * Uses required to reach each mastery level
   */
  usesPerLevel: {
    1: 0,    // Level 1 (starting level)
    2: 5,    // Level 2 (5 uses)
    3: 15,   // Level 3 (15 uses)
    4: 30,   // Level 4 (30 uses)
    5: 50,   // Level 5 (50 uses) - Master
  },

  /**
   * Power bonus per mastery level (%)
   */
  powerBonusPerLevel: 0.05,

  /**
   * Chi cost reduction per mastery level
   */
  chiCostReductionPerLevel: 1,
} as const;

// =============================================================================
// CONSOLIDATED GAME BALANCE EXPORT
// =============================================================================

/**
 * Complete game balance configuration
 * Import this to access all balance constants
 */
export const GAME_BALANCE = {
  atb: ATB_CONFIG,
  combat: COMBAT_CONFIG,
  statusEffects: STATUS_EFFECT_CONFIG,
  combos: COMBO_CONFIG,
  multiHit: MULTI_HIT_CONFIG,
  flee: FLEE_CONFIG,
  chi: CHI_CONFIG,
  chapterScaling: CHAPTER_SCALING_CONFIG,   // Chapter progression scaling
  difficultyLevels: DIFFICULTY_LEVEL_CONFIG, // Easy/Medium/Hard/Hell AI
  techniques: TECHNIQUE_DEFAULTS,
  mastery: MASTERY_CONFIG,
} as const;

// Type export for strict typing
export type GameBalanceConfig = typeof GAME_BALANCE;
