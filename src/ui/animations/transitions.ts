/**
 * Screen Transition Utilities
 *
 * Provides smooth transitions between screens instead of jarring console.clear()
 * Uses dimming effects and staged reveals.
 */

import { useState, useEffect, useCallback, useRef } from "react";
import { animationTiming } from "../theme/colors";

// =============================================================================
// TYPES
// =============================================================================

export type TransitionType = "fade" | "wipe" | "instant";

export type TransitionPhase =
  | "idle" // No transition
  | "out" // Fading/wiping out current screen
  | "clear" // Screen cleared, ready for new content
  | "in" // Fading/wiping in new screen
  | "complete"; // Transition complete

export interface TransitionState {
  /** Current phase of the transition */
  phase: TransitionPhase;
  /** Progress from 0 to 1 */
  progress: number;
  /** Whether currently transitioning */
  isTransitioning: boolean;
  /** Opacity for fade effects (0-1) */
  opacity: number;
  /** Lines visible for wipe effects */
  visibleLines: number;
}

export interface UseTransitionOptions {
  /** Type of transition effect */
  type?: TransitionType;
  /** Duration of transition in ms */
  duration?: number;
  /** Callback when transition completes */
  onComplete?: () => void;
}

// =============================================================================
// HOOKS
// =============================================================================

/**
 * Hook for managing screen transitions
 *
 * @example
 * const { startTransition, phase, opacity } = useTransition();
 * // Start transition, run callback when out phase completes
 * startTransition(() => setScreen("menu"));
 */
export function useTransition(options: UseTransitionOptions = {}): {
  state: TransitionState;
  startTransition: (onMidpoint?: () => void) => void;
  reset: () => void;
} {
  const {
    type = "fade",
    duration = animationTiming.transitionFadeDuration,
    onComplete,
  } = options;

  const [phase, setPhase] = useState<TransitionPhase>("idle");
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const midpointCallbackRef = useRef<(() => void) | undefined>();
  const onCompleteRef = useRef(onComplete);

  onCompleteRef.current = onComplete;

  const cleanup = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const reset = useCallback(() => {
    cleanup();
    setPhase("idle");
    setProgress(0);
  }, [cleanup]);

  const startTransition = useCallback(
    (onMidpoint?: () => void) => {
      if (type === "instant") {
        // No animation, just run callback
        onMidpoint?.();
        onCompleteRef.current?.();
        return;
      }

      cleanup();
      midpointCallbackRef.current = onMidpoint;
      setPhase("out");
      setProgress(0);

      const steps = 10;
      const stepDuration = duration / steps;
      let currentStep = 0;

      intervalRef.current = setInterval(() => {
        currentStep++;
        setProgress(currentStep / steps);

        if (currentStep >= steps) {
          // Midpoint reached - "out" phase complete
          setPhase("clear");
          midpointCallbackRef.current?.();

          // Start "in" phase after a brief pause
          setTimeout(() => {
            setPhase("in");
            currentStep = 0;

            intervalRef.current = setInterval(() => {
              currentStep++;
              setProgress(1 - currentStep / steps);

              if (currentStep >= steps) {
                cleanup();
                setPhase("complete");
                setProgress(0);
                onCompleteRef.current?.();

                // Reset to idle after a tick
                setTimeout(() => setPhase("idle"), 50);
              }
            }, stepDuration);
          }, 50);
        }
      }, stepDuration);
    },
    [type, duration, cleanup],
  );

  // Cleanup on unmount
  useEffect(() => cleanup, [cleanup]);

  // Calculate derived values
  const isTransitioning = phase !== "idle" && phase !== "complete";

  // Opacity: 1 during idle, decreasing during out, 0 at clear, increasing during in
  let opacity = 1;
  if (phase === "out") {
    opacity = 1 - progress;
  } else if (phase === "clear") {
    opacity = 0;
  } else if (phase === "in") {
    opacity = 1 - progress; // progress goes from 1 to 0 during "in"
  }

  const state: TransitionState = {
    phase,
    progress,
    isTransitioning,
    opacity,
    visibleLines: phase === "idle" ? Infinity : Math.floor(progress * 50),
  };

  return { state, startTransition, reset };
}

/**
 * Simplified hook for applying fade effect to content
 * Returns CSS-like dim values based on transition state
 */
export function useTransitionStyle(state: TransitionState): {
  dimColor: boolean;
  visible: boolean;
} {
  return {
    dimColor: state.phase === "out" || state.phase === "in",
    visible: state.phase !== "clear",
  };
}

// =============================================================================
// UTILITIES
// =============================================================================

/**
 * Calculate opacity from transition progress
 */
export function getTransitionOpacity(
  phase: TransitionPhase,
  progress: number,
): number {
  switch (phase) {
    case "out":
      return 1 - progress;
    case "clear":
      return 0;
    case "in":
      return progress;
    default:
      return 1;
  }
}

/**
 * Get dim color prop based on transition state
 * Ink doesn't support opacity, so we use dimColor for fade effect
 */
export function shouldDim(phase: TransitionPhase): boolean {
  return phase === "out" || phase === "in";
}
