/**
 * Comparison Evaluator Utility
 * Reusable comparison logic for numeric conditions
 *
 * Eliminates duplication of operator switch statements across:
 * - CombatEngine.ts:536-540
 * - AIController.ts:42-46
 * - AIController.ts:113-117
 */

import type { ComparisonOperator } from './ConditionParser';

/**
 * Evaluate a comparison between two numeric values
 *
 * @param operator - The comparison operator (<, <=, >, >=, ==, !=)
 * @param actual - The actual value (left side of comparison)
 * @param threshold - The threshold to compare against (right side)
 * @returns True if the comparison is true, false otherwise
 *
 * @example
 * evaluateComparison('<', 30, 50)   // true (30 < 50)
 * evaluateComparison('>=', 75, 50)  // true (75 >= 50)
 * evaluateComparison('==', 42, 42)  // true (42 == 42)
 */
export function evaluateComparison(
  operator: string,
  actual: number,
  threshold: number
): boolean {
  switch (operator) {
    case '<':
      return actual < threshold;
    case '<=':
      return actual <= threshold;
    case '>':
      return actual > threshold;
    case '>=':
      return actual >= threshold;
    case '==':
    case '===':
      return actual === threshold;
    case '!=':
    case '!==':
      return actual !== threshold;
    default:
      console.warn(`Unknown comparison operator: ${operator}`);
      return false;
  }
}

/**
 * Check if a value is within a range (inclusive)
 *
 * @param value - The value to check
 * @param min - Minimum value (inclusive)
 * @param max - Maximum value (inclusive)
 * @returns True if value is within range
 */
export function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

/**
 * Check if a value is outside a range
 *
 * @param value - The value to check
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns True if value is outside range
 */
export function isOutOfRange(value: number, min: number, max: number): boolean {
  return value < min || value > max;
}

/**
 * Clamp a value between min and max
 *
 * @param value - The value to clamp
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Clamped value
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Check if a value matches a modulo condition
 * Commonly used for "every Nth turn" conditions
 *
 * @param value - The value to check
 * @param divisor - The divisor for modulo
 * @param remainder - Expected remainder (default 0)
 * @returns True if value % divisor === remainder
 *
 * @example
 * checkModulo(9, 3, 0)  // true (9 % 3 === 0, every 3rd turn)
 * checkModulo(10, 3, 1) // true (10 % 3 === 1)
 */
export function checkModulo(value: number, divisor: number, remainder: number = 0): boolean {
  return value % divisor === remainder;
}

/**
 * Check if a percentage chance succeeds
 *
 * @param chance - Probability of success (0-100 for percent, 0-1 for decimal)
 * @param useDecimal - If true, treat chance as 0-1 decimal, else 0-100 percent
 * @returns True if random roll succeeds
 *
 * @example
 * checkChance(75)      // 75% chance to return true
 * checkChance(0.75, true)  // 75% chance to return true
 */
export function checkChance(chance: number, useDecimal: boolean = false): boolean {
  const threshold = useDecimal ? chance : chance / 100;
  return Math.random() < threshold;
}

/**
 * Compare two values with tolerance (for floating point comparisons)
 *
 * @param a - First value
 * @param b - Second value
 * @param tolerance - Maximum difference to consider equal (default 0.0001)
 * @returns True if values are within tolerance
 */
export function approximatelyEqual(a: number, b: number, tolerance: number = 0.0001): boolean {
  return Math.abs(a - b) < tolerance;
}

/**
 * Parse and evaluate a comparison string like "value < 50"
 *
 * @param comparisonString - String in format "value operator threshold"
 * @param value - The actual value to compare
 * @returns True if comparison is true, false if false or invalid format
 *
 * @example
 * evaluateComparisonString("< 50", 30)   // true
 * evaluateComparisonString(">= 100", 150) // true
 */
export function evaluateComparisonString(comparisonString: string, value: number): boolean {
  const match = comparisonString.match(/([<>=!]+)\s*(\d+(?:\.\d+)?)/);

  if (!match) {
    console.warn(`Invalid comparison string format: ${comparisonString}`);
    return false;
  }

  const operator = match[1]!;
  const threshold = parseFloat(match[2]!);

  return evaluateComparison(operator, value, threshold);
}
