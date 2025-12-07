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
// DIFFICULTY SCALING
// =============================================================================

export const DIFFICULTY_CONFIG = {
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
  difficulty: DIFFICULTY_CONFIG,
  techniques: TECHNIQUE_DEFAULTS,
  mastery: MASTERY_CONFIG,
} as const;

// Type export for strict typing
export type GameBalanceConfig = typeof GAME_BALANCE;
