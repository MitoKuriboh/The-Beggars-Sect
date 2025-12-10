/**
 * Combat System Constants
 * Centralized constants for combat mechanics, status effects, and AI behavior
 */

/**
 * Status Effect IDs
 * Used for identifying status effects in combat
 */
export const STATUS_EFFECTS = {
  DEFENDING: "defending",
  STUNNED: "stunned",
  SHIELDED: "shielded",
  ENLIGHTENED: "enlightened",
  PRIDE: "pride",
} as const;

/**
 * Combat Log Keywords
 * Keywords used for parsing combat log entries
 */
export const COMBAT_LOG_KEYWORDS = {
  HEALS: ["heals", "second-wind", "rally-cry", "heal"],
  MEDITATION: ["meditate", "meditation"],
  TECHNIQUES: ["uses"],
  BASIC_ATTACKS: ["attacks"],
} as const;

/**
 * AI Behavior Types
 * Available AI behavior patterns for enemies
 */
export const AI_BEHAVIORS = {
  AGGRESSIVE: "aggressive",
  BALANCED: "balanced",
  TACTICAL: "tactical",
  PREDATOR: "predator",
} as const;

/**
 * AI Behavior Descriptions
 * Human-readable descriptions for each AI behavior type
 */
export const AI_BEHAVIOR_HINTS: Record<string, string> = {
  [AI_BEHAVIORS.AGGRESSIVE]: "Aggressive - attacks relentlessly",
  [AI_BEHAVIORS.BALANCED]: "Balanced - mixes offense and defense",
  [AI_BEHAVIORS.TACTICAL]: "Tactical - uses abilities strategically",
  [AI_BEHAVIORS.PREDATOR]: "Predator - exploits weaknesses",
};

/**
 * Condition Types
 * Standard condition patterns used in AI rule evaluation
 */
export const CONDITION_TYPES = {
  DEFAULT: "default",
  HP: "hp",
  PLAYER_HP: "player.hp",
  CHI: "chi",
  TURN: "turn",
  PLAYER_DEFENDING: "player.defending",
  PLAYER_STUNNED: "player.stunned",
  PLAYER_USED_HEAVY: "player.usedHeavyTechnique",
  PLAYER_USED_TECHNIQUE: "player.usedTechnique",
  HAS_BUFF: "hasBuff",
  JUST_DEFENDED: "justDefended",
  NOT_HEALED: "!healed",
  NOT_SHIELDED: "!shielded",
  NOT_PRIDE_BUFF: "!prideBuff",
  NOT_MEDITATED: "!meditated",
  NOT_ENLIGHTENED: "!enlightened",
} as const;

/**
 * Action Prefixes
 * Prefixes used in AI action strings
 */
export const ACTION_PREFIXES = {
  USE_TECHNIQUE: "use:",
} as const;

/**
 * Combat Log Entry Types
 */
export const LOG_ENTRY_TYPES = {
  ACTION: "action",
  DAMAGE: "damage",
  HEAL: "heal",
  STATUS: "status",
  PHASE: "phase",
} as const;

/**
 * Type exports for type safety
 */
export type StatusEffectId =
  (typeof STATUS_EFFECTS)[keyof typeof STATUS_EFFECTS];
export type AIBehavior = (typeof AI_BEHAVIORS)[keyof typeof AI_BEHAVIORS];
export type ConditionType =
  (typeof CONDITION_TYPES)[keyof typeof CONDITION_TYPES];
export type LogEntryType =
  (typeof LOG_ENTRY_TYPES)[keyof typeof LOG_ENTRY_TYPES];
