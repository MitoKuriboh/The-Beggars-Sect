/**
 * High-Resolution Progress Bars
 * Uses Unicode eighth-block characters for smoother visual feedback
 */

import type { InkColor } from './colors';
import { getHealthColor, getProgressColor } from './colors';

// =============================================================================
// BLOCK CHARACTERS
// =============================================================================

/** Unicode eighth-block characters for smooth progress */
const EIGHTH_BLOCKS = ['', '▏', '▎', '▍', '▌', '▋', '▊', '▉', '█'];

/** Full block character */
const FULL_BLOCK = '█';

/** Empty block character */
const EMPTY_BLOCK = '░';

// =============================================================================
// PROGRESS BAR GENERATION
// =============================================================================

export interface ProgressBarOptions {
  /** Current value */
  current: number;
  /** Maximum value */
  max: number;
  /** Width in characters */
  width: number;
  /** Show percentage text */
  showPercentage?: boolean;
  /** Use color based on percentage */
  useColorGradient?: boolean;
  /** Custom color (overrides gradient) */
  color?: InkColor;
  /** Show numerical values (e.g., "50/100") */
  showValues?: boolean;
}

/**
 * Create a high-resolution progress bar using eighth-block characters
 */
export function createProgressBar(options: ProgressBarOptions): {
  bar: string;
  color: InkColor;
  percentage: number;
} {
  const {
    current,
    max,
    width,
    showPercentage = false,
    useColorGradient = true,
    color,
    showValues = false,
  } = options;

  // Calculate percentage
  const percentage = max > 0 ? (current / max) * 100 : 0;
  const clampedPercentage = Math.max(0, Math.min(100, percentage));

  // Calculate how many characters should be filled
  const fillAmount = (clampedPercentage / 100) * width;
  const fullBlocks = Math.floor(fillAmount);
  const remainder = fillAmount - fullBlocks;

  // Determine which eighth-block character to use for partial fill
  const eighthIndex = Math.floor(remainder * 8);
  const partialBlock = EIGHTH_BLOCKS[eighthIndex] ?? '';

  // Build the bar
  const filledPart = FULL_BLOCK.repeat(fullBlocks);
  const emptyPart = EMPTY_BLOCK.repeat(Math.max(0, width - fullBlocks - (partialBlock ? 1 : 0)));

  let bar = filledPart + partialBlock + emptyPart;

  // Add percentage or values if requested
  if (showPercentage) {
    bar += ` ${Math.round(clampedPercentage)}%`;
  }

  if (showValues) {
    bar += ` ${current}/${max}`;
  }

  // Determine color
  const barColor = color ?? (useColorGradient ? getProgressColor(clampedPercentage) : 'white');

  return {
    bar,
    color: barColor,
    percentage: clampedPercentage,
  };
}

/**
 * Create a health bar (HP) with color gradient
 */
export function createHealthBar(current: number, max: number, width: number): {
  bar: string;
  color: InkColor;
  percentage: number;
} {
  const percentage = max > 0 ? (current / max) * 100 : 0;
  const color = getHealthColor(percentage);

  return createProgressBar({
    current,
    max,
    width,
    color,
    useColorGradient: false,
  });
}

/**
 * Create a chi bar with yellow color
 */
export function createChiBar(current: number, max: number, width: number): {
  bar: string;
  color: InkColor;
} {
  const result = createProgressBar({
    current,
    max,
    width,
    color: 'yellow',
    useColorGradient: false,
  });

  return {
    bar: result.bar,
    color: result.color,
  };
}

/**
 * Create a simple percentage bar
 */
export function createPercentageBar(percentage: number, width: number, showPercentage: boolean = true): {
  bar: string;
  color: InkColor;
} {
  const result = createProgressBar({
    current: percentage,
    max: 100,
    width,
    showPercentage,
    useColorGradient: true,
  });

  return {
    bar: result.bar,
    color: result.color,
  };
}

// =============================================================================
// LEGACY COMPATIBILITY (for gradual migration)
// =============================================================================

/**
 * Create a simple block-based bar (8 characters resolution)
 * For components that haven't migrated to high-res yet
 */
export function createSimpleBar(current: number, max: number, width: number): string {
  const percentage = max > 0 ? (current / max) : 0;
  const filled = Math.floor(percentage * width);
  const empty = width - filled;

  return FULL_BLOCK.repeat(filled) + EMPTY_BLOCK.repeat(empty);
}

// =============================================================================
// EXPORTS
// =============================================================================

export default {
  createProgressBar,
  createHealthBar,
  createChiBar,
  createPercentageBar,
  createSimpleBar,
};
