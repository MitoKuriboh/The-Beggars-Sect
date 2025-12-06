/**
 * Box Drawing Styles
 * Provides consistent box characters for UI elements
 */

export interface BoxStyle {
  topLeft: string;
  topRight: string;
  bottomLeft: string;
  bottomRight: string;
  horizontal: string;
  vertical: string;
  name: string;
}

// =============================================================================
// BOX STYLES
// =============================================================================

export const BOX_STYLES = {
  /** Rounded corners - modern, soft aesthetic */
  rounded: {
    name: 'rounded',
    topLeft: '╭',
    topRight: '╮',
    bottomLeft: '╰',
    bottomRight: '╯',
    horizontal: '─',
    vertical: '│',
  },

  /** Double lines - emphasis, important sections */
  double: {
    name: 'double',
    topLeft: '╔',
    topRight: '╗',
    bottomLeft: '╚',
    bottomRight: '╝',
    horizontal: '═',
    vertical: '║',
  },

  /** Single lines - standard boxes */
  single: {
    name: 'single',
    topLeft: '┌',
    topRight: '┐',
    bottomLeft: '└',
    bottomRight: '┘',
    horizontal: '─',
    vertical: '│',
  },

  /** Heavy lines - strong emphasis */
  heavy: {
    name: 'heavy',
    topLeft: '┏',
    topRight: '┓',
    bottomLeft: '┗',
    bottomRight: '┛',
    horizontal: '━',
    vertical: '┃',
  },

  /** Dotted lines - subtle, background elements */
  dotted: {
    name: 'dotted',
    topLeft: '┌',
    topRight: '┐',
    bottomLeft: '└',
    bottomRight: '┘',
    horizontal: '┈',
    vertical: '┊',
  },
} as const;

// =============================================================================
// BOX BUILDING HELPERS
// =============================================================================

/**
 * Create a simple box header
 */
export function createBoxHeader(text: string, width: number, style: BoxStyle = BOX_STYLES.rounded): string {
  const padding = Math.max(0, width - text.length - 2);
  const leftPad = Math.floor(padding / 2);
  const rightPad = padding - leftPad;

  return (
    style.topLeft +
    style.horizontal.repeat(leftPad) +
    ' ' + text + ' ' +
    style.horizontal.repeat(rightPad) +
    style.topRight
  );
}

/**
 * Create a box footer
 */
export function createBoxFooter(width: number, style: BoxStyle = BOX_STYLES.rounded): string {
  return (
    style.bottomLeft +
    style.horizontal.repeat(width - 2) +
    style.bottomRight
  );
}

/**
 * Create a horizontal divider within a box
 */
export function createBoxDivider(width: number, style: BoxStyle = BOX_STYLES.rounded): string {
  // Use appropriate intersection characters
  let left = '├';
  let right = '┤';
  let horiz = style.horizontal;

  if (style.name === 'rounded') {
    left = '├';
    right = '┤';
  } else if (style.name === 'double') {
    left = '╠';
    right = '╣';
  } else if (style.name === 'heavy') {
    left = '┣';
    right = '┫';
  }

  return left + horiz.repeat(width - 2) + right;
}

/**
 * Wrap text in box borders
 */
export function createBoxLine(text: string, width: number, style: BoxStyle = BOX_STYLES.rounded): string {
  const contentWidth = width - 2; // Account for borders
  const padding = Math.max(0, contentWidth - text.length);

  return style.vertical + ' ' + text + ' '.repeat(padding) + style.vertical;
}

// =============================================================================
// EXPORTS
// =============================================================================

export default BOX_STYLES;
