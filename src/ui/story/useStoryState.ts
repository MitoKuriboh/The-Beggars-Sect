/**
 * Story State Management Hook
 * Manages story phase state machine
 *
 * Following AAA game UI patterns:
 * - State machine for narrative flow
 * - Clear phase transitions
 * - Predictable content delivery
 *
 * Solves the "13 states + 13 refs" problem in StoryScreen
 * by encapsulating related state into logical groups.
 */

import { useState, useCallback } from 'react';
import { useStateWithRef } from '../hooks/useStateWithRef';
import type { ContentLine, Choice } from '../../types/index';

export type StoryPhase =
  | 'content'
  | 'choice'
  | 'exploration'
  | 'chapter-end'
  | 'game-end'
  | 'combat';

export interface StoryUIState {
  phase: StoryPhase;
  content: ContentLine[];
  contentIndex: number;
  isTyping: boolean;
  isPaused: boolean;
  choices: Choice[];
  canAdvance: boolean;
}

export interface UseStoryStateReturn {
  // Current state
  state: StoryUIState;
  stateRef: React.MutableRefObject<StoryUIState>;

  // Phase control
  setPhase: (phase: StoryPhase) => void;

  // Content control
  setContent: (content: ContentLine[]) => void;
  setContentIndex: (index: number | ((prev: number) => number)) => void;
  advanceContent: () => void;
  resetContent: () => void;

  // Typing control
  setIsTyping: (typing: boolean) => void;
  setPaused: (paused: boolean) => void;

  // Choice control
  setChoices: (choices: Choice[]) => void;
  clearChoices: () => void;

  // Advance control
  setCanAdvance: (canAdvance: boolean) => void;

  // Complete reset
  resetState: () => void;
}

const INITIAL_STATE: StoryUIState = {
  phase: 'content',
  content: [],
  contentIndex: 0,
  isTyping: false,
  isPaused: false,
  choices: [],
  canAdvance: false,
};

/**
 * Custom hook for managing story UI state
 *
 * Consolidates the complex state management from StoryScreen
 * into a single, manageable hook with ref synchronization.
 *
 * @returns Story state and control functions
 *
 * @example
 * ```tsx
 * const {
 *   state,
 *   stateRef,
 *   setPhase,
 *   advanceContent,
 * } = useStoryState();
 *
 * // Transition to choice phase
 * setPhase('choice');
 *
 * // Advance to next content block
 * advanceContent();
 *
 * // Access current state in callbacks
 * const currentPhase = stateRef.current.phase;
 * ```
 */
export function useStoryState(): UseStoryStateReturn {
  const [state, setState, stateRef] = useStateWithRef<StoryUIState>(INITIAL_STATE);

  /**
   * Set the current story phase
   */
  const setPhase = useCallback(
    (phase: StoryPhase) => {
      setState((prev: StoryUIState) => ({ ...prev, phase }));
    },
    [setState]
  );

  /**
   * Set content lines to display
   */
  const setContent = useCallback(
    (content: ContentLine[]) => {
      setState((prev: StoryUIState) => ({
        ...prev,
        content,
        contentIndex: 0, // Reset index when content changes
      }));
    },
    [setState]
  );

  /**
   * Set current content index
   */
  const setContentIndex = useCallback(
    (index: number | ((prev: number) => number)) => {
      setState((prev: StoryUIState) => ({
        ...prev,
        contentIndex: typeof index === 'function' ? index(prev.contentIndex) : index,
      }));
    },
    [setState]
  );

  /**
   * Advance to next content block
   */
  const advanceContent = useCallback(() => {
    setState((prev: StoryUIState) => ({
      ...prev,
      contentIndex: prev.contentIndex + 1,
      isTyping: false,
    }));
  }, [setState]);

  /**
   * Reset content to beginning
   */
  const resetContent = useCallback(() => {
    setState((prev: StoryUIState) => ({
      ...prev,
      content: [],
      contentIndex: 0,
      isTyping: false,
    }));
  }, [setState]);

  /**
   * Set typing state
   */
  const setIsTyping = useCallback(
    (typing: boolean) => {
      setState((prev: StoryUIState) => ({ ...prev, isTyping: typing }));
    },
    [setState]
  );

  /**
   * Set paused state
   */
  const setPaused = useCallback(
    (paused: boolean) => {
      setState((prev: StoryUIState) => ({ ...prev, isPaused: paused }));
    },
    [setState]
  );

  /**
   * Set available choices
   */
  const setChoices = useCallback(
    (choices: Choice[]) => {
      setState((prev: StoryUIState) => ({
        ...prev,
        choices,
        phase: 'choice', // Auto-transition to choice phase
      }));
    },
    [setState]
  );

  /**
   * Clear choices
   */
  const clearChoices = useCallback(() => {
    setState((prev: StoryUIState) => ({ ...prev, choices: [] }));
  }, [setState]);

  /**
   * Set whether content can be advanced
   */
  const setCanAdvance = useCallback(
    (canAdvance: boolean) => {
      setState((prev: StoryUIState) => ({ ...prev, canAdvance }));
    },
    [setState]
  );

  /**
   * Reset entire state (for new chapter/game)
   */
  const resetState = useCallback(() => {
    setState(INITIAL_STATE);
  }, [setState]);

  return {
    state,
    stateRef,
    setPhase,
    setContent,
    setContentIndex,
    advanceContent,
    resetContent,
    setIsTyping,
    setPaused,
    setChoices,
    clearChoices,
    setCanAdvance,
    resetState,
  };
}
