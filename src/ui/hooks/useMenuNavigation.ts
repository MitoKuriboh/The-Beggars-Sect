/**
 * Menu Navigation Hook
 * Reusable keyboard navigation for all menu systems
 *
 * Following React hooks best practices:
 * - Single responsibility (navigation only)
 * - Composable and reusable
 * - Clear, predictable API
 *
 * Based on AAA game UI patterns:
 * - Consistent input handling
 * - Customizable navigation behavior
 * - Support for circular/bounded navigation
 */

import { useState, useCallback } from 'react';
import { useInput } from 'ink';

export interface UseMenuNavigationOptions {
  /** Total number of items in the menu */
  itemCount: number;

  /** Callback when user cancels/goes back (ESC key) */
  onBack?: () => void;

  /** Callback when user selects an item (ENTER/SPACE) */
  onSelect?: (index: number) => void;

  /** Initial selected index (default: 0) */
  initialIndex?: number;

  /** Allow circular navigation (wrap around) (default: true) */
  circular?: boolean;

  /** Custom up arrow navigation (default: circular/bounded) */
  onUpArrow?: (currentIndex: number) => number;

  /** Custom down arrow navigation (default: circular/bounded) */
  onDownArrow?: (currentIndex: number) => number;

  /** Disable navigation (for loading states) */
  disabled?: boolean;

  /** Custom key handler for additional inputs */
  onCustomKey?: (input: string, key: any) => void;
}

export interface UseMenuNavigationReturn {
  /** Currently selected index */
  selectedIndex: number;

  /** Manually set the selected index */
  setSelectedIndex: (index: number | ((prev: number) => number)) => void;

  /** Navigate up one item */
  navigateUp: () => void;

  /** Navigate down one item */
  navigateDown: () => void;

  /** Select current item */
  selectCurrent: () => void;

  /** Go back/cancel */
  goBack: () => void;
}

/**
 * Custom hook for menu keyboard navigation
 */
export function useMenuNavigation(
  options: UseMenuNavigationOptions
): UseMenuNavigationReturn {
  const {
    itemCount,
    onBack,
    onSelect,
    initialIndex = 0,
    circular = true,
    onUpArrow,
    onDownArrow,
    disabled = false,
    onCustomKey,
  } = options;

  const [selectedIndex, setSelectedIndex] = useState(initialIndex);

  const defaultUpNavigation = useCallback(
    (currentIndex: number): number => {
      if (circular) {
        return currentIndex > 0 ? currentIndex - 1 : itemCount - 1;
      } else {
        return Math.max(0, currentIndex - 1);
      }
    },
    [circular, itemCount]
  );

  const defaultDownNavigation = useCallback(
    (currentIndex: number): number => {
      if (circular) {
        return currentIndex < itemCount - 1 ? currentIndex + 1 : 0;
      } else {
        return Math.min(itemCount - 1, currentIndex + 1);
      }
    },
    [circular, itemCount]
  );

  const navigateUp = useCallback(() => {
    setSelectedIndex((prev) =>
      onUpArrow ? onUpArrow(prev) : defaultUpNavigation(prev)
    );
  }, [onUpArrow, defaultUpNavigation]);

  const navigateDown = useCallback(() => {
    setSelectedIndex((prev) =>
      onDownArrow ? onDownArrow(prev) : defaultDownNavigation(prev)
    );
  }, [onDownArrow, defaultDownNavigation]);

  const selectCurrent = useCallback(() => {
    if (onSelect && selectedIndex >= 0 && selectedIndex < itemCount) {
      onSelect(selectedIndex);
    }
  }, [onSelect, selectedIndex, itemCount]);

  const goBack = useCallback(() => {
    if (onBack) {
      onBack();
    }
  }, [onBack]);

  useInput(
    (input, key) => {
      if (disabled) return;

      if (key.escape) {
        goBack();
        return;
      }

      if (key.upArrow) {
        navigateUp();
        return;
      }

      if (key.downArrow) {
        navigateDown();
        return;
      }

      if (key.return || input === ' ') {
        selectCurrent();
        return;
      }

      if (onCustomKey) {
        onCustomKey(input, key);
      }
    },
    { isActive: !disabled }
  );

  return {
    selectedIndex,
    setSelectedIndex,
    navigateUp,
    navigateDown,
    selectCurrent,
    goBack,
  };
}

export function useSimpleMenuNavigation(
  itemCount: number,
  onSelect: (index: number) => void,
  onBack?: () => void
): number {
  const { selectedIndex } = useMenuNavigation({
    itemCount,
    onSelect,
    onBack,
  });

  return selectedIndex;
}
