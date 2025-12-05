/**
 * Combat Type Definitions
 * Turn-based combat system types
 */

import type { Character, Enemy, Stance } from './character';
import type { Technique } from './technique';
import type { Item } from './item';

// =============================================================================
// ACTIONS
// =============================================================================

export type ActionType =
  | 'attack'      // Basic palm strike
  | 'technique'   // Use a technique
  | 'defend'      // Guard stance
  | 'chi-focus'   // Meditate, recover chi
  | 'item'        // Use consumable
  | 'stance'      // Switch stance
  | 'flee';       // Escape combat

export interface CombatAction {
  type: ActionType;
  actor: Character;
  target?: Character;          // For attack/technique
  technique?: Technique;       // For technique action
  item?: Item;                 // For item action
  newStance?: Stance;          // For stance action
}

// =============================================================================
// ACTION RESULTS
// =============================================================================

export interface DamageModifier {
  name: string;
  value: number;               // Multiplier (e.g., 1.5 for crit)
}

export interface ActionResult {
  type: ActionType;
  success: boolean;
  message: string;

  // Damage dealt (if applicable)
  damage?: number;
  isCritical?: boolean;
  damageModifiers?: DamageModifier[];

  // Chi changes
  chiSpent?: number;
  chiGained?: number;
  inverseChiGained?: number;

  // Healing done
  healAmount?: number;

  // Status effects applied
  statusApplied?: string[];
  statusRemoved?: string[];

  // Combo info
  comboPosition?: number;
  comboDamageBonus?: number;

  // Flee result
  fleeSuccess?: boolean;

  // Target state after action
  targetHpAfter?: number;
  targetDefeated?: boolean;
}

// =============================================================================
// TURN ORDER (ATB)
// =============================================================================

export interface TurnQueueEntry {
  character: Character;
  turnValue: number;           // Accumulated turn points
  isReady: boolean;            // True when can act
}

// =============================================================================
// COMBO CHAIN
// =============================================================================

export interface ComboChain {
  techniques: string[];        // Technique IDs in chain
  damageMultiplier: number;    // Current bonus (1.0 - 1.3)
  chiRefund: number;           // Chi refunded on finisher
  isActive: boolean;
}

export const EMPTY_COMBO: ComboChain = {
  techniques: [],
  damageMultiplier: 1.0,
  chiRefund: 0,
  isActive: false,
};

// =============================================================================
// COMBAT LOG
// =============================================================================

export interface LogEntry {
  round: number;
  turn: number;
  actorName: string;
  message: string;
  type: 'action' | 'damage' | 'heal' | 'status' | 'system';
  timestamp: number;
}

// =============================================================================
// COMBAT STATE
// =============================================================================

export type CombatResult = 'ongoing' | 'victory' | 'defeat' | 'fled';

export interface CombatState {
  // Combatants
  player: Character;
  enemies: Enemy[];

  // Turn management
  turnQueue: TurnQueueEntry[];
  currentTurn: number;
  round: number;

  // Combo tracking
  comboChain: ComboChain;

  // Combat log
  combatLog: LogEntry[];

  // State flags
  isPlayerTurn: boolean;
  combatResult: CombatResult;

  // Boss phase tracking (if boss fight)
  isBossFight: boolean;
  currentBossPhase?: number;
}

// =============================================================================
// COMBAT CONFIGURATION
// =============================================================================

export interface CombatConfig {
  // ATB settings
  turnThreshold: number;       // Points needed to act (default: 100)
  baseTickRate: number;        // Points per tick (default: 10)

  // Turn queue preview
  previewLength: number;       // How many future turns to show (default: 7)

  // Flee settings
  minFleeChance: number;       // Minimum flee success (default: 0.3)
  maxFleeChance: number;       // Maximum flee success (default: 0.9)
  canFleeBoss: boolean;        // Can flee boss fights (default: false)

  // Damage settings
  minDamage: number;           // Minimum damage dealt (default: 1)
  critMultiplier: number;      // Critical hit multiplier (default: 1.5)
  varianceMin: number;         // Damage variance minimum (default: 0.9)
  varianceMax: number;         // Damage variance maximum (default: 1.1)
}

export const DEFAULT_COMBAT_CONFIG: CombatConfig = {
  turnThreshold: 100,
  baseTickRate: 10,
  previewLength: 7,
  minFleeChance: 0.3,
  maxFleeChance: 0.9,
  canFleeBoss: false,
  minDamage: 1,
  critMultiplier: 1.5,
  varianceMin: 0.9,
  varianceMax: 1.1,
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Create initial combat state
 */
export function createCombatState(
  player: Character,
  enemies: Enemy[]
): CombatState {
  const isBossFight = enemies.some(e => e.tier === 'boss');

  return {
    player,
    enemies,
    turnQueue: [],
    currentTurn: 0,
    round: 1,
    comboChain: { ...EMPTY_COMBO },
    combatLog: [],
    isPlayerTurn: false,
    combatResult: 'ongoing',
    isBossFight,
    currentBossPhase: isBossFight ? 1 : undefined,
  };
}

/**
 * Add entry to combat log
 */
export function addLogEntry(
  state: CombatState,
  actorName: string,
  message: string,
  type: LogEntry['type'] = 'action'
): void {
  state.combatLog.push({
    round: state.round,
    turn: state.currentTurn,
    actorName,
    message,
    type,
    timestamp: Date.now(),
  });
}

/**
 * Check if combat should end
 */
export function checkCombatEnd(state: CombatState): CombatResult {
  if (state.player.hp <= 0) {
    return 'defeat';
  }

  if (state.enemies.every(e => e.hp <= 0)) {
    return 'victory';
  }

  return 'ongoing';
}

/**
 * Get living enemies
 */
export function getLivingEnemies(state: CombatState): Enemy[] {
  return state.enemies.filter(e => e.hp > 0);
}

/**
 * Get all combatants (for turn order)
 */
export function getAllCombatants(state: CombatState): Character[] {
  return [state.player, ...getLivingEnemies(state)];
}
