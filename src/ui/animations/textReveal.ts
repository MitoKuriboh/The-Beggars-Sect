/**
 * Text Reveal Animation Utilities
 *
 * Provides hooks and utilities for character-by-character and line-by-line
 * text reveal animations in the terminal UI.
 */

import { useState, useEffect, useCallback, useRef } from "react";
import { animationTiming } from "../theme/colors";

// =============================================================================
// TYPES
// =============================================================================

export interface RevealState {
  /** Current number of characters/lines revealed */
  revealed: number;
  /** Whether the reveal animation is complete */
  isComplete: boolean;
  /** Whether the animation was skipped */
  wasSkipped: boolean;
}

export interface UseTextRevealOptions {
  /** Total items to reveal (characters or lines) */
  total: number;
  /** Milliseconds between each reveal step */
  speed?: number;
  /** Delay before starting the animation */
  delay?: number;
  /** Whether to start automatically */
  autoStart?: boolean;
  /** Callback when reveal completes */
  onComplete?: () => void;
}

export interface UseLineRevealOptions {
  /** Array of lines to reveal */
  lines: string[];
  /** Milliseconds between each line */
  speed?: number;
  /** Delay before starting */
  delay?: number;
  /** Whether to start automatically */
  autoStart?: boolean;
  /** Callback when complete */
  onComplete?: () => void;
}

// =============================================================================
// HOOKS
// =============================================================================

/**
 * Hook for character-by-character or step-by-step reveal animations
 *
 * @example
 * const { revealed, isComplete, skip } = useTextReveal({ total: text.length });
 * const visibleText = text.slice(0, revealed);
 */
export function useTextReveal(options: UseTextRevealOptions): RevealState & {
  skip: () => void;
  reset: () => void;
} {
  const {
    total,
    speed = animationTiming.titleCharReveal,
    delay = 0,
    autoStart = true,
    onComplete,
  } = options;

  const [revealed, setRevealed] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [wasSkipped, setWasSkipped] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const onCompleteRef = useRef(onComplete);

  // Keep onComplete ref current
  onCompleteRef.current = onComplete;

  const cleanup = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const skip = useCallback(() => {
    cleanup();
    setRevealed(total);
    setIsComplete(true);
    setWasSkipped(true);
    onCompleteRef.current?.();
  }, [total, cleanup]);

  const reset = useCallback(() => {
    cleanup();
    setRevealed(0);
    setIsComplete(false);
    setWasSkipped(false);
  }, [cleanup]);

  useEffect(() => {
    if (!autoStart || total === 0) return;

    const startReveal = () => {
      intervalRef.current = setInterval(() => {
        setRevealed((prev) => {
          if (prev >= total) {
            cleanup();
            setIsComplete(true);
            onCompleteRef.current?.();
            return total;
          }
          return prev + 1;
        });
      }, speed);
    };

    if (delay > 0) {
      timeoutRef.current = setTimeout(startReveal, delay);
    } else {
      startReveal();
    }

    return cleanup;
  }, [total, speed, delay, autoStart, cleanup]);

  return { revealed, isComplete, wasSkipped, skip, reset };
}

/**
 * Hook for line-by-line reveal with optional character animation per line
 *
 * @example
 * const { visibleLines, currentLineChars, isComplete } = useLineReveal({ lines });
 */
export function useLineReveal(options: UseLineRevealOptions): {
  /** Number of fully visible lines */
  visibleLines: number;
  /** Characters visible in the current revealing line */
  currentLineChars: number;
  /** Whether all lines are fully revealed */
  isComplete: boolean;
  /** Skip to full reveal */
  skip: () => void;
  /** Reset animation */
  reset: () => void;
} {
  const {
    lines,
    speed = animationTiming.titleLineReveal,
    delay = 0,
    autoStart = true,
    onComplete,
  } = options;

  const [visibleLines, setVisibleLines] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const onCompleteRef = useRef(onComplete);

  onCompleteRef.current = onComplete;

  const cleanup = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const skip = useCallback(() => {
    cleanup();
    setVisibleLines(lines.length);
    setIsComplete(true);
    onCompleteRef.current?.();
  }, [lines.length, cleanup]);

  const reset = useCallback(() => {
    cleanup();
    setVisibleLines(0);
    setIsComplete(false);
  }, [cleanup]);

  useEffect(() => {
    if (!autoStart || lines.length === 0) return;

    const startReveal = () => {
      intervalRef.current = setInterval(() => {
        setVisibleLines((prev) => {
          if (prev >= lines.length) {
            cleanup();
            setIsComplete(true);
            onCompleteRef.current?.();
            return lines.length;
          }
          return prev + 1;
        });
      }, speed);
    };

    if (delay > 0) {
      timeoutRef.current = setTimeout(startReveal, delay);
    } else {
      startReveal();
    }

    return cleanup;
  }, [lines.length, speed, delay, autoStart, cleanup]);

  return {
    visibleLines,
    currentLineChars: 0, // Could be expanded for per-line char animation
    isComplete,
    skip,
    reset,
  };
}

// =============================================================================
// UTILITIES
// =============================================================================

/**
 * Truncate text to a specific number of visible characters
 * (preserves full-width characters properly)
 */
export function truncateToChars(text: string, chars: number): string {
  if (chars >= text.length) return text;
  return text.slice(0, chars);
}

/**
 * Get lines up to a certain index (for line-by-line reveal)
 */
export function getVisibleLines<T>(lines: T[], count: number): T[] {
  return lines.slice(0, count);
}

/**
 * Calculate total characters across multiple lines
 */
export function getTotalChars(lines: string[]): number {
  return lines.reduce((sum, line) => sum + line.length, 0);
}
