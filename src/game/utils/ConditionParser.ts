/**
 * Condition Parser Utility
 * Centralized parsing and evaluation of condition strings
 *
 * Eliminates duplication of HP condition parsing across:
 * - CombatEngine.ts:529-543
 * - AIController.ts:36-47
 * - AIController.ts:107-118
 */

import type { Character } from '../../types/index';

/**
 * Comparison operator types
 */
export type ComparisonOperator = '<' | '<=' | '>' | '>=';

/**
 * Result of parsing an HP condition
 */
export interface HPCondition {
  operator: ComparisonOperator;
  threshold: number;
  isPercent: boolean;
}

/**
 * Parse an HP condition string like "hp < 40%" or "hp >= 50"
 *
 * @param condition - The condition string to parse
 * @returns Parsed HP condition or null if invalid format
 *
 * @example
 * parseHPCondition("hp < 40%")  // { operator: '<', threshold: 40, isPercent: true }
 * parseHPCondition("hp >= 50")  // { operator: '>=', threshold: 50, isPercent: false }
 */
export function parseHPCondition(condition: string): HPCondition | null {
  // Match pattern: hp [operator] [number]%?
  const match = condition.match(/hp\s*([<>]=?)\s*(\d+)(%?)/);

  if (!match) {
    return null;
  }

  const operator = match[1] as ComparisonOperator;
  const threshold = parseInt(match[2]!, 10);
  const isPercent = match[3] === '%';

  return {
    operator,
    threshold,
    isPercent,
  };
}

/**
 * Evaluate a parsed HP condition against a character
 *
 * @param character - The character to check HP for
 * @param condition - The parsed HP condition
 * @returns True if the condition is met, false otherwise
 *
 * @example
 * evaluateHPCondition(character, { operator: '<', threshold: 40, isPercent: true })
 * // Returns true if character HP is less than 40% of max HP
 */
export function evaluateHPCondition(character: Character, condition: HPCondition): boolean {
  let value: number;

  if (condition.isPercent) {
    // Calculate HP percentage
    value = (character.hp / character.maxHp) * 100;
  } else {
    // Use raw HP value
    value = character.hp;
  }

  // Evaluate the comparison
  switch (condition.operator) {
    case '<':
      return value < condition.threshold;
    case '<=':
      return value <= condition.threshold;
    case '>':
      return value > condition.threshold;
    case '>=':
      return value >= condition.threshold;
    default:
      return false;
  }
}

/**
 * Parse and evaluate an HP condition string in one call
 *
 * @param character - The character to check
 * @param conditionString - The condition string (e.g., "hp < 40%")
 * @returns True if condition is met, false if not met or invalid format
 *
 * @example
 * checkHPCondition(player, "hp < 30%")  // True if player HP < 30%
 */
export function checkHPCondition(character: Character, conditionString: string): boolean {
  const condition = parseHPCondition(conditionString);

  if (!condition) {
    console.warn(`Invalid HP condition format: ${conditionString}`);
    return false;
  }

  return evaluateHPCondition(character, condition);
}

/**
 * Get current HP as percentage
 *
 * @param character - The character to check
 * @returns HP percentage (0-100)
 */
export function getHPPercent(character: Character): number {
  return (character.hp / character.maxHp) * 100;
}

/**
 * Check if character is at low HP (below threshold)
 *
 * @param character - The character to check
 * @param threshold - HP percentage threshold (default 30%)
 * @returns True if HP is below threshold
 */
export function isLowHP(character: Character, threshold: number = 30): boolean {
  return getHPPercent(character) < threshold;
}

/**
 * Check if character is at high HP (above threshold)
 *
 * @param character - The character to check
 * @param threshold - HP percentage threshold (default 70%)
 * @returns True if HP is above threshold
 */
export function isHighHP(character: Character, threshold: number = 70): boolean {
  return getHPPercent(character) > threshold;
}

/**
 * Check if character is at critical HP (very low)
 *
 * @param character - The character to check
 * @param threshold - HP percentage threshold (default 15%)
 * @returns True if HP is critically low
 */
export function isCriticalHP(character: Character, threshold: number = 15): boolean {
  return getHPPercent(character) < threshold;
}
