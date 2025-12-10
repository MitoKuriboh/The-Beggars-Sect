/**
 * AI Controller
 * Evaluates AI rules and selects enemy actions in combat
 *
 * This module implements a priority-based rule system for enemy AI behavior.
 * Rules are evaluated in priority order until a matching condition is found,
 * creating emergent tactical behavior without complex state machines.
 *
 * @module AIController
 * @example
 * // Enemy with tactical AI pattern
 * const enemy = {
 *   aiPattern: {
 *     behavior: 'tactical',
 *     rules: [
 *       { condition: 'hp < 30%', action: 'use:second-wind', priority: 100 },
 *       { condition: 'player.usedHeavyTechnique', action: 'use:quick-counter', priority: 80 },
 *       { condition: 'turn % 3 === 0', action: 'use:power-attack', priority: 50 },
 *       { condition: 'default', action: 'use:basic-attack', priority: 0 }
 *     ]
 *   }
 * };
 *
 * // AI selects action based on combat state
 * const action = AIController.selectAction(enemy, player, combatState);
 */

import type {
  Character,
  Enemy,
  CombatAction,
  AIRule,
  CombatState,
} from "../../types/index";

import { getTechnique } from "./TechniqueRegistry";
import {
  checkHPCondition,
  getHPPercent, // Import from ConditionParser to avoid duplication
} from "../utils/ConditionParser";
import { evaluateComparison } from "../utils/ComparisonEvaluator";
import {
  STATUS_EFFECTS,
  COMBAT_LOG_KEYWORDS,
  AI_BEHAVIOR_HINTS,
  CONDITION_TYPES,
  ACTION_PREFIXES,
  LOG_ENTRY_TYPES,
} from "../config/CombatConstants";

// =============================================================================
// HELPER UTILITIES
// =============================================================================

/**
 * Find the most recent player action in combat log
 *
 * Searches backwards through the combat log to find the last action
 * performed by the player within the specified round window.
 *
 * @param log - Combat log entries
 * @param playerName - Player's name
 * @param currentRound - Current combat round
 * @param maxRoundsBack - Maximum rounds to search back (default: 1)
 * @returns The most recent player action or null if none found
 *
 * @example
 * const lastAction = findRecentPlayerAction(log, 'Li Wei', 5, 2);
 * // Searches rounds 4-5 for player actions
 */
function findRecentPlayerAction(
  log: CombatState["combatLog"],
  playerName: string,
  currentRound: number,
  maxRoundsBack: number = 1,
) {
  for (let i = log.length - 1; i >= 0; i--) {
    const entry = log[i];
    if (!entry) continue;

    // Stop searching if we've gone too far back
    if (entry.round < currentRound - maxRoundsBack) break;

    if (
      entry.actorName === playerName &&
      entry.type === LOG_ENTRY_TYPES.ACTION
    ) {
      return entry;
    }
  }
  return null;
}

/**
 * Check if combat log contains specific keywords for an actor
 *
 * Searches the entire combat log for any actions by the specified actor
 * that contain any of the provided keywords. Useful for checking if an
 * enemy has already used certain abilities (healing, buffs, etc.).
 *
 * @param log - Combat log entries
 * @param actorName - Name of the actor to check
 * @param keywords - Keywords to search for in action messages
 * @returns True if any keyword is found in actor's actions
 *
 * @example
 * const hasHealed = logContainsKeywords(log, enemy.name, ['heal', 'second-wind']);
 * // Returns true if enemy has used any healing technique
 */
function logContainsKeywords(
  log: CombatState["combatLog"],
  actorName: string,
  keywords: readonly string[],
): boolean {
  for (const entry of log) {
    if (
      entry.actorName === actorName &&
      entry.type === LOG_ENTRY_TYPES.ACTION
    ) {
      const messageLower = entry.message.toLowerCase();
      if (keywords.some((kw) => messageLower.includes(kw))) {
        return true;
      }
    }
  }
  return false;
}

/**
 * Validate an AI rule structure
 *
 * Checks if an AI rule has required fields and valid values.
 * Used during development to catch configuration errors early.
 *
 * @param rule - The AI rule to validate
 * @returns Object with isValid flag and optional error message
 */
function validateAIRule(rule: AIRule): { isValid: boolean; error?: string } {
  if (!rule.condition || typeof rule.condition !== "string") {
    return { isValid: false, error: "Rule missing valid condition string" };
  }

  if (!rule.action || typeof rule.action !== "string") {
    return { isValid: false, error: "Rule missing valid action string" };
  }

  if (typeof rule.priority !== "number") {
    return { isValid: false, error: "Rule missing valid priority number" };
  }

  return { isValid: true };
}

// =============================================================================
// AI CONDITION EVALUATOR
// =============================================================================

/**
 * Evaluation context for AI decision making
 * Contains all relevant combat state for rule evaluation
 */
interface EvalContext {
  enemy: Enemy;
  player: Character;
  turn: number;
  round: number;
  state: CombatState;
}

/**
 * Evaluate a condition string against the current combat context
 *
 * Supported condition types:
 * - HP conditions: "hp < 50", "hp >= 80", "player.hp < 30%"
 * - Turn conditions: "turn === 3", "turn % 4 === 0" (every 4th turn)
 * - Status conditions: "player.defending", "player.stunned"
 * - Chi conditions: "chi >= 3", "chi < 10"
 * - History conditions: "!healed", "!meditated", "!shielded"
 * - Player actions: "player.usedHeavyTechnique", "player.usedTechnique"
 * - Self state: "hasBuff", "justDefended"
 *
 * @param condition - The condition string to evaluate
 * @param ctx - The evaluation context containing combat state
 * @returns True if the condition matches, false otherwise
 *
 * @example
 * evaluateCondition('hp < 50%', ctx); // True if enemy HP below 50%
 * evaluateCondition('player.usedHeavyTechnique', ctx); // True if player just used heavy attack
 * evaluateCondition('turn % 3 === 0', ctx); // True every 3rd turn
 */
function evaluateCondition(condition: string, ctx: EvalContext): boolean {
  // Default always matches
  if (condition === CONDITION_TYPES.DEFAULT) return true;

  // HP conditions (check player.hp first before general hp to avoid substring match issues)
  if (condition.includes(CONDITION_TYPES.PLAYER_HP)) {
    const hpCondition = condition.replace(
      CONDITION_TYPES.PLAYER_HP,
      CONDITION_TYPES.HP,
    );
    return checkHPCondition(ctx.player, hpCondition);
  }

  if (condition.includes(CONDITION_TYPES.HP)) {
    return checkHPCondition(ctx.enemy, condition);
  }

  // Turn-based conditions
  const turnMatch = condition.match(/turn\s*===?\s*(\d+)/);
  if (turnMatch && turnMatch[1]) {
    return ctx.turn === parseInt(turnMatch[1], 10);
  }

  const turnModMatch = condition.match(/turn\s*%\s*(\d+)\s*===?\s*(\d+)/);
  if (turnModMatch && turnModMatch[1] && turnModMatch[2]) {
    return (
      ctx.turn % parseInt(turnModMatch[1], 10) === parseInt(turnModMatch[2], 10)
    );
  }

  // Player state conditions
  if (condition === CONDITION_TYPES.PLAYER_DEFENDING) {
    return ctx.player.statusEffects.some(
      (e) => e.id === STATUS_EFFECTS.DEFENDING,
    );
  }

  if (condition === CONDITION_TYPES.PLAYER_STUNNED) {
    return ctx.player.statusEffects.some(
      (e) => e.id === STATUS_EFFECTS.STUNNED,
    );
  }

  if (condition === CONDITION_TYPES.PLAYER_USED_HEAVY) {
    const recentAction = findRecentPlayerAction(
      ctx.state.combatLog,
      ctx.player.name,
      ctx.round,
    );
    if (!recentAction || !recentAction.techniqueId) return false;

    const technique = getTechnique(recentAction.techniqueId);
    return technique?.isHeavy === true;
  }

  if (condition === CONDITION_TYPES.PLAYER_USED_TECHNIQUE) {
    const recentAction = findRecentPlayerAction(
      ctx.state.combatLog,
      ctx.player.name,
      ctx.round,
    );
    if (!recentAction) return false;

    // Check if it was a technique (not basic attack or defend)
    return (
      recentAction.message.includes(COMBAT_LOG_KEYWORDS.TECHNIQUES[0]) &&
      !recentAction.message.includes(COMBAT_LOG_KEYWORDS.BASIC_ATTACKS[0])
    );
  }

  // Chi conditions
  const chiMatch = condition.match(/chi\s*([<>]=?)\s*(\d+)/);
  if (chiMatch && chiMatch[1] && chiMatch[2]) {
    const operator = chiMatch[1];
    const threshold = parseInt(chiMatch[2], 10);
    return evaluateComparison(operator, ctx.enemy.chi, threshold);
  }

  // Self state conditions
  if (condition === CONDITION_TYPES.HAS_BUFF) {
    return ctx.enemy.statusEffects.some((e) => e.type === "buff");
  }

  if (condition === CONDITION_TYPES.JUST_DEFENDED) {
    return ctx.enemy.statusEffects.some(
      (e) => e.id === STATUS_EFFECTS.DEFENDING,
    );
  }

  if (condition.includes(CONDITION_TYPES.NOT_HEALED)) {
    return !logContainsKeywords(
      ctx.state.combatLog,
      ctx.enemy.name,
      COMBAT_LOG_KEYWORDS.HEALS,
    );
  }

  if (condition.includes(CONDITION_TYPES.NOT_SHIELDED)) {
    return !ctx.enemy.statusEffects.some(
      (e) =>
        e.id === STATUS_EFFECTS.SHIELDED ||
        e.description?.toLowerCase().includes("shield") ||
        e.name?.toLowerCase().includes("shield"),
    );
  }

  if (condition.includes(CONDITION_TYPES.NOT_PRIDE_BUFF)) {
    return !ctx.enemy.statusEffects.some(
      (e) =>
        e.id === STATUS_EFFECTS.PRIDE ||
        e.description?.toLowerCase().includes("pride"),
    );
  }

  if (condition.includes(CONDITION_TYPES.NOT_MEDITATED)) {
    return !logContainsKeywords(
      ctx.state.combatLog,
      ctx.enemy.name,
      COMBAT_LOG_KEYWORDS.MEDITATION,
    );
  }

  if (condition.includes(CONDITION_TYPES.NOT_ENLIGHTENED)) {
    return !ctx.enemy.statusEffects.some(
      (e) =>
        e.id === STATUS_EFFECTS.ENLIGHTENED ||
        e.description?.toLowerCase().includes("enlightened"),
    );
  }

  // Unknown condition - log warning and don't match
  if (process.env.NODE_ENV !== "production") {
    console.warn(`[AIController] Unknown condition: "${condition}"`);
  }
  return false;
}

/**
 * Parse an action string into a CombatAction
 *
 * Supported action formats:
 * - "use:technique-id" - Use a specific technique
 * - "defend" - Use defend action
 * - "attack" - Use basic attack (default fallback)
 *
 * @param actionStr - The action string to parse
 * @param enemy - The enemy performing the action
 * @param player - The player target
 * @returns A CombatAction object
 *
 * @example
 * parseAction('use:second-wind', enemy, player);
 * // Returns technique action for second-wind
 */
function parseAction(
  actionStr: string,
  enemy: Enemy,
  player: Character,
): CombatAction {
  // Technique action: "use:technique-id"
  if (actionStr.startsWith(ACTION_PREFIXES.USE_TECHNIQUE)) {
    const techniqueId = actionStr.slice(ACTION_PREFIXES.USE_TECHNIQUE.length);
    const technique = getTechnique(techniqueId);

    if (technique) {
      return {
        type: "technique",
        actor: enemy,
        target: player,
        technique,
      };
    }

    // Log warning if technique not found
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        `[AIController] Technique not found: "${techniqueId}" for action "${actionStr}"`,
      );
    }
  }

  // Note: "defend" action strings fall through to basic attack
  // since defend is typically handled via status effects, not action types

  // Default to basic attack
  return {
    type: "attack",
    actor: enemy,
    target: player,
  };
}

// =============================================================================
// AI CONTROLLER
// =============================================================================

/**
 * AIController - Main class for enemy AI decision making
 *
 * This class provides static methods for:
 * - Selecting enemy actions based on AI patterns
 * - Checking phase transitions for boss enemies
 * - Providing UI hints about enemy behavior
 * - Validating AI configurations (development mode)
 */
export class AIController {
  /**
   * Select an action for an enemy based on their AI pattern
   *
   * The decision algorithm:
   * 1. Validate AI pattern exists
   * 2. Sort rules by priority (highest first)
   * 3. Evaluate each rule's condition in order
   * 4. For the first matching rule, parse its action
   * 5. Validate the action can be performed (chi cost, etc.)
   * 6. If validation fails, continue to next rule
   * 7. If no rules match or all fail validation, fall back to basic attack
   *
   * @param enemy - The enemy character making a decision
   * @param player - The player character being targeted
   * @param state - The current combat state
   * @returns A CombatAction to perform
   *
   * @example
   * const action = AIController.selectAction(enemy, player, combatState);
   * if (action.type === 'technique') {
   *   console.log(`Enemy uses ${action.technique.name}`);
   * }
   */
  static selectAction(
    enemy: Enemy,
    player: Character,
    state: CombatState,
  ): CombatAction {
    const ctx: EvalContext = {
      enemy,
      player,
      turn: state.currentTurn,
      round: state.round,
      state,
    };

    // Validate AI pattern exists
    if (
      !enemy.aiPattern ||
      !enemy.aiPattern.rules ||
      enemy.aiPattern.rules.length === 0
    ) {
      if (process.env.NODE_ENV !== "production") {
        console.warn(
          `[AIController] Enemy "${enemy.name}" has no AI pattern, defaulting to basic attack`,
        );
      }
      return {
        type: "attack",
        actor: enemy,
        target: player,
      };
    }

    // Validate rules in development mode
    if (process.env.NODE_ENV !== "production") {
      for (const rule of enemy.aiPattern.rules) {
        const validation = validateAIRule(rule);
        if (!validation.isValid) {
          console.warn(
            `[AIController] Invalid AI rule for "${enemy.name}": ${validation.error}`,
            rule,
          );
        }
      }
    }

    // Sort rules by priority (highest first)
    const sortedRules = [...enemy.aiPattern.rules].sort(
      (a, b) => b.priority - a.priority,
    );

    // Find first matching rule
    for (const rule of sortedRules) {
      if (evaluateCondition(rule.condition, ctx)) {
        const action = parseAction(rule.action, enemy, player);

        // Check if we can actually use this action
        if (action.type === "technique" && action.technique) {
          // Check chi cost
          if (enemy.chi < action.technique.chiCost) {
            continue; // Skip this rule, try next
          }
        }

        return action;
      }
    }

    // Fallback: basic attack
    return {
      type: "attack",
      actor: enemy,
      target: player,
    };
  }

  /**
   * Get behavior description for UI hints
   *
   * Returns a human-readable description of the enemy's AI behavior pattern.
   * Useful for displaying tooltips or enemy information to the player.
   *
   * @param enemy - The enemy to get behavior hint for
   * @returns A human-readable description of the enemy's behavior pattern
   *
   * @example
   * const hint = AIController.getBehaviorHint(enemy);
   * // Returns: "Tactical - uses abilities strategically"
   */
  static getBehaviorHint(enemy: Enemy): string {
    return AI_BEHAVIOR_HINTS[enemy.aiPattern.behavior] || "";
  }

  /**
   * Check if enemy should trigger phase transition (boss encounters)
   *
   * Boss enemies can have multiple phases triggered by HP thresholds.
   * Each phase typically has different AI patterns and abilities.
   *
   * For example, a boss with thresholds [70, 40, 10] will transition:
   * - Phase 1 → 2 at 70% HP
   * - Phase 2 → 3 at 40% HP
   * - Phase 3 → 4 at 10% HP
   *
   * @param enemy - The enemy to check for phase transition
   * @returns Object containing shouldTransition flag and newPhase number
   *
   * @example
   * const { shouldTransition, newPhase } = AIController.checkPhaseTransition(boss);
   * if (shouldTransition) {
   *   console.log(`Boss enters phase ${newPhase}!`);
   *   applyPhaseChanges(boss, newPhase);
   * }
   */
  static checkPhaseTransition(enemy: Enemy): {
    shouldTransition: boolean;
    newPhase: number;
  } {
    if (!enemy.phase || !enemy.maxPhase || !enemy.phaseThresholds) {
      return { shouldTransition: false, newPhase: 1 };
    }

    const hpPercent = getHPPercent(enemy);
    const currentPhase = enemy.phase;

    // Check each threshold
    for (let i = 0; i < enemy.phaseThresholds.length; i++) {
      const threshold = enemy.phaseThresholds[i];
      if (threshold === undefined) continue;
      const targetPhase = i + 2; // Phases are 1-indexed, thresholds start at phase 2

      if (hpPercent <= threshold && currentPhase < targetPhase) {
        return { shouldTransition: true, newPhase: targetPhase };
      }
    }

    return { shouldTransition: false, newPhase: currentPhase };
  }

  /**
   * Get phase transition dialogue for display
   *
   * Retrieves the dialogue line to display when an enemy transitions
   * to a new phase. Typically used for dramatic boss fight moments.
   *
   * @param enemy - The enemy transitioning phases
   * @param phase - The phase being transitioned to
   * @returns Dialogue string if available, undefined otherwise
   *
   * @example
   * const dialogue = AIController.getPhaseDialogue(boss, 2);
   * if (dialogue) {
   *   displayBossDialogue(dialogue); // "You've forced my hand!"
   * }
   */
  static getPhaseDialogue(enemy: Enemy, phase: number): string | undefined {
    return enemy.dialogue.phase?.[phase]?.[0];
  }
}
