/**
 * Divider Utilities
 * Consistent visual separators throughout the UI
 *
 * Following AAA UI design principles:
 * - Consistent visual language
 * - Scalable to different widths
 * - Semantic naming for different contexts
 */

/**
 * Predefined divider lengths for common use cases
 */
export const DIVIDER_LENGTHS = {
  /** Short divider for compact spaces (65 chars) */
  short: 65,

  /** Standard divider for most UI elements (75 chars) */
  standard: 75,

  /** Long divider for wide screens (85 chars) */
  long: 85,

  /** Full width for 84-char screens */
  fullWidth: 84,
} as const;

/**
 * Divider character sets for different visual styles
 */
export const DIVIDER_STYLES = {
  /** Solid line (─) */
  solid: '─',

  /** Dotted line (·) */
  dotted: '·',

  /** Double line (═) */
  double: '═',

  /** Dashed line (╍) */
  dashed: '╍',

  /** Wave line (~) */
  wave: '~',

  /** Equals (=) */
  equals: '=',
} as const;

/**
 * Predefined dividers for common use cases
 */
export const DIVIDERS = {
  /** Short solid divider */
  short: DIVIDER_STYLES.solid.repeat(DIVIDER_LENGTHS.short),

  /** Standard solid divider */
  standard: DIVIDER_STYLES.solid.repeat(DIVIDER_LENGTHS.standard),

  /** Long solid divider */
  long: DIVIDER_STYLES.solid.repeat(DIVIDER_LENGTHS.long),

  /** Full width solid divider */
  fullWidth: DIVIDER_STYLES.solid.repeat(DIVIDER_LENGTHS.fullWidth),

  /** Dotted divider for subtle separation */
  dotted: DIVIDER_STYLES.dotted.repeat(DIVIDER_LENGTHS.standard),

  /** Dashed divider for decorative elements */
  dashed: DIVIDER_STYLES.dashed.repeat(DIVIDER_LENGTHS.standard),

  /** Wave divider for water/flow themes */
  wave: DIVIDER_STYLES.wave.repeat(DIVIDER_LENGTHS.standard),

  /** Double divider for emphasis */
  double: DIVIDER_STYLES.double.repeat(DIVIDER_LENGTHS.standard),

  /** Equals divider for technical contexts */
  equals: DIVIDER_STYLES.equals.repeat(DIVIDER_LENGTHS.standard),
} as const;

/**
 * Create a custom divider with specific style and length
 *
 * @param style - Character to repeat
 * @param length - Number of repetitions
 * @returns Divider string
 *
 * @example
 * ```ts
 * const customDivider = createDivider('─', 60);
 * ```
 */
export function createDivider(
  style: keyof typeof DIVIDER_STYLES | string,
  length: number
): string {
  const char = style in DIVIDER_STYLES ? DIVIDER_STYLES[style as keyof typeof DIVIDER_STYLES] : style;
  return char.repeat(length);
}

/**
 * Semantic dividers for specific UI contexts
 */
export const SEMANTIC_DIVIDERS = {
  /** Combat screen sections */
  combat: DIVIDERS.long,

  /** Story content blocks */
  story: DIVIDERS.fullWidth,

  /** Menu separators */
  menu: DIVIDERS.standard,

  /** Status display sections */
  status: DIVIDERS.short,

  /** Decorative accent */
  accent: DIVIDERS.dashed,
} as const;

/**
 * Type exports for type-safe divider usage
 */
export type DividerStyle = keyof typeof DIVIDER_STYLES;
export type DividerLength = keyof typeof DIVIDER_LENGTHS;
export type SemanticDivider = keyof typeof SEMANTIC_DIVIDERS;
