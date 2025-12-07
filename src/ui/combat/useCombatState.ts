/**
 * Combat State Management Hook
 * Manages combat phase state machine
 *
 * Following AAA game UI patterns:
 * - State machine for phase management
 * - Clear state transitions
 * - Predictable behavior
 *
 * Based on research findings:
 * - State Pattern for UI state management
 * - Each phase encapsulated
 * - Clean transitions between states
 */

import { useState, useCallback } from 'react';
import type { CombatState } from '../../types/index';

export type CombatPhase =
  | 'initial-stance-select'
  | 'action-select'
  | 'technique-select'
  | 'stance-select'
  | 'target-select'
  | 'enemy-turn'
  | 'animating'
  | 'victory'
  | 'defeat'
  | 'fled';

export type PendingActionType = 'attack' | 'technique' | 'stance' | 'flee' | null;

export interface CombatUIState {
  phase: CombatPhase;
  pendingAction: PendingActionType;
  selectedTechniqueId: string | null;
  message: string;
  messageType: 'normal' | 'damage' | 'heal' | 'status';
}

export interface UseCombatStateReturn {
  uiState: CombatUIState;
  setPhase: (phase: CombatPhase) => void;
  setPendingAction: (action: PendingActionType) => void;
  setSelectedTechnique: (id: string | null) => void;
  showMessage: (message: string, type?: CombatUIState['messageType']) => void;
  clearMessage: () => void;
  resetUI: () => void;
}

const INITIAL_STATE: CombatUIState = {
  phase: 'initial-stance-select',
  pendingAction: null,
  selectedTechniqueId: null,
  message: '',
  messageType: 'normal',
};

/**
 * Custom hook for managing combat UI state
 *
 * Implements a state machine pattern for combat phases.
 * Each phase represents a distinct UI state with specific interactions.
 *
 * @param combatState - The actual combat game state
 * @returns Combat UI state and control functions
 *
 * @example
 * ```tsx
 * const { uiState, setPhase, showMessage } = useCombatState(combatState);
 *
 * // Transition to action selection
 * setPhase('action-select');
 *
 * // Show feedback message
 * showMessage('You dealt 45 damage!', 'damage');
 * ```
 */
export function useCombatState(combatState: CombatState): UseCombatStateReturn {
  const [uiState, setUIState] = useState<CombatUIState>(INITIAL_STATE);

  /**
   * Transition to a new phase
   */
  const setPhase = useCallback((phase: CombatPhase) => {
    setUIState((prev) => ({
      ...prev,
      phase,
      // Clear transient state on phase change
      message: '',
    }));
  }, []);

  /**
   * Set the pending player action
   */
  const setPendingAction = useCallback((action: PendingActionType) => {
    setUIState((prev) => ({
      ...prev,
      pendingAction: action,
    }));
  }, []);

  /**
   * Set selected technique ID
   */
  const setSelectedTechnique = useCallback((id: string | null) => {
    setUIState((prev) => ({
      ...prev,
      selectedTechniqueId: id,
    }));
  }, []);

  /**
   * Display a message to the player
   */
  const showMessage = useCallback(
    (message: string, type: CombatUIState['messageType'] = 'normal') => {
      setUIState((prev) => ({
        ...prev,
        message,
        messageType: type,
      }));
    },
    []
  );

  /**
   * Clear the current message
   */
  const clearMessage = useCallback(() => {
    setUIState((prev) => ({
      ...prev,
      message: '',
    }));
  }, []);

  /**
   * Reset UI to initial state (for new combat)
   */
  const resetUI = useCallback(() => {
    setUIState(INITIAL_STATE);
  }, []);

  return {
    uiState,
    setPhase,
    setPendingAction,
    setSelectedTechnique,
    showMessage,
    clearMessage,
    resetUI,
  };
}
