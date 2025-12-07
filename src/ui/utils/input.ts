/**
 * Input Utilities
 * Helper functions for keyboard input handling and validation
 *
 * Following AAA game UI patterns:
 * - Predictable input behavior
 * - Reusable validation logic
 * - Consistent navigation feel
 */

/**
 * Navigate vertically through a list with wrap-around support
 *
 * @param current - Current index
 * @param total - Total number of items
 * @param direction - Navigation direction
 * @param circular - Allow wrap-around (default: true)
 * @returns New index after navigation
 *
 * @example
 * ```ts
 * const newIndex = handleVerticalNavigation(0, 5, 'up', true);
 * // returns 4 (wraps to end)
 * ```
 */
export function handleVerticalNavigation(
  current: number,
  total: number,
  direction: 'up' | 'down',
  circular: boolean = true
): number {
  if (direction === 'up') {
    if (circular) {
      return current > 0 ? current - 1 : total - 1;
    } else {
      return Math.max(0, current - 1);
    }
  } else {
    if (circular) {
      return current < total - 1 ? current + 1 : 0;
    } else {
      return Math.min(total - 1, current + 1);
    }
  }
}

/**
 * Navigate horizontally through a list with wrap-around support
 *
 * @param current - Current index
 * @param total - Total number of items
 * @param direction - Navigation direction
 * @param circular - Allow wrap-around (default: true)
 * @returns New index after navigation
 */
export function handleHorizontalNavigation(
  current: number,
  total: number,
  direction: 'left' | 'right',
  circular: boolean = true
): number {
  if (direction === 'left') {
    if (circular) {
      return current > 0 ? current - 1 : total - 1;
    } else {
      return Math.max(0, current - 1);
    }
  } else {
    if (circular) {
      return current < total - 1 ? current + 1 : 0;
    } else {
      return Math.min(total - 1, current + 1);
    }
  }
}

/**
 * Clamp a value between min and max
 *
 * @param value - Value to clamp
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Clamped value
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Check if a key is a selection key (ENTER or SPACE)
 *
 * @param input - Input character
 * @param key - Key object from useInput
 * @returns True if selection key
 */
export function isSelectionKey(input: string, key: any): boolean {
  return key.return || input === ' ';
}

/**
 * Check if a key is a cancel key (ESC)
 *
 * @param key - Key object from useInput
 * @returns True if cancel key
 */
export function isCancelKey(key: any): boolean {
  return key.escape;
}

/**
 * Check if a key is a navigation key (arrows)
 *
 * @param key - Key object from useInput
 * @returns Object indicating which arrow keys are pressed
 */
export function getNavigationKeys(key: any): {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
} {
  return {
    up: key.upArrow || false,
    down: key.downArrow || false,
    left: key.leftArrow || false,
    right: key.rightArrow || false,
  };
}

/**
 * Validate input against allowed characters
 *
 * @param input - Input string
 * @param allowedPattern - Regex pattern or predefined type
 * @returns True if valid
 *
 * @example
 * ```ts
 * validateInput('abc123', 'alphanumeric') // true
 * validateInput('abc!@#', 'alphanumeric') // false
 * validateInput('test', /^[a-z]+$/) // true
 * ```
 */
export function validateInput(
  input: string,
  allowedPattern: RegExp | 'alphanumeric' | 'alpha' | 'numeric' | 'filename'
): boolean {
  let pattern: RegExp;

  if (allowedPattern instanceof RegExp) {
    pattern = allowedPattern;
  } else {
    switch (allowedPattern) {
      case 'alphanumeric':
        pattern = /^[a-zA-Z0-9]+$/;
        break;
      case 'alpha':
        pattern = /^[a-zA-Z]+$/;
        break;
      case 'numeric':
        pattern = /^[0-9]+$/;
        break;
      case 'filename':
        pattern = /^[a-zA-Z0-9_\-. ]+$/;
        break;
      default:
        return false;
    }
  }

  return pattern.test(input);
}

/**
 * Sanitize filename input
 *
 * @param input - Raw input string
 * @returns Sanitized filename
 */
export function sanitizeFilename(input: string): string {
  return input
    .replace(/[^a-zA-Z0-9_\-. ]/g, '') // Remove invalid chars
    .replace(/\s+/g, '_') // Replace spaces with underscores
    .substring(0, 50); // Limit length
}

/**
 * Debounce function for input handling
 *
 * @param func - Function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;

  return function (...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

/**
 * Throttle function for input handling
 *
 * @param func - Function to throttle
 * @param limit - Minimum time between calls (ms)
 * @returns Throttled function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return function (...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
