/**
 * UI Types
 * Type definitions for UI components and input handling
 */

/**
 * Key event from Ink's useInput hook
 * Represents the state of special keys during input
 */
export interface KeyEvent {
  upArrow: boolean;
  downArrow: boolean;
  leftArrow: boolean;
  rightArrow: boolean;
  return: boolean;
  escape: boolean;
  tab: boolean;
  backspace: boolean;
  delete: boolean;
  pageUp: boolean;
  pageDown: boolean;
  shift: boolean;
  ctrl: boolean;
  meta: boolean;
}

/**
 * Navigation direction for menu traversal
 */
export type NavigationDirection = "up" | "down" | "left" | "right";

/**
 * Menu item base interface
 */
export interface MenuItemBase {
  label: string;
  value: string;
  disabled?: boolean;
}
