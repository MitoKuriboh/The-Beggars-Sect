/**
 * AI Controller
 * Evaluates AI rules and selects enemy actions
 */

import type {
  Character,
  Enemy,
  CombatAction,
  AIRule,
  CombatState,
} from '../../types/index';

import { getTechnique } from './TechniqueRegistry';
import {
  parseHPCondition,
  evaluateHPCondition,
  checkHPCondition,
} from '../utils/ConditionParser';
import { evaluateComparison, checkModulo } from '../utils/ComparisonEvaluator';

// =============================================================================
// AI CONDITION EVALUATOR
// =============================================================================

interface EvalContext {
  enemy: Enemy;
  player: Character;
  turn: number;
  round: number;
  state: CombatState;
}

/**
 * Evaluate a condition string against the current combat context
 */
function evaluateCondition(condition: string, ctx: EvalContext): boolean {
  // Default always matches
  if (condition === 'default') return true;

  // HP conditions
  if (condition.includes('hp')) {
    return checkHPCondition(ctx.enemy, condition);
  }

  // Turn-based conditions
  const turnMatch = condition.match(/turn\s*===?\s*(\d+)/);
  if (turnMatch && turnMatch[1]) {
    return ctx.turn === parseInt(turnMatch[1]);
  }

  const turnModMatch = condition.match(/turn\s*%\s*(\d+)\s*===?\s*(\d+)/);
  if (turnModMatch && turnModMatch[1] && turnModMatch[2]) {
    return ctx.turn % parseInt(turnModMatch[1]) === parseInt(turnModMatch[2]);
  }

  // Player state conditions
  if (condition === 'player.defending') {
    return ctx.player.statusEffects.some((e) => e.id === 'defending');
  }

  if (condition === 'player.stunned') {
    return ctx.player.statusEffects.some((e) => e.id === 'stunned');
  }

  if (condition === 'player.usedHeavyTechnique') {
    // Check if player's last action was a slow technique (negative speed)
    const log = ctx.state.combatLog;
    if (log.length === 0) return false;

    // Find most recent player action
    for (let i = log.length - 1; i >= 0; i--) {
      const entry = log[i];
      if (!entry) continue;
      if (entry.actorName === ctx.player.name && entry.type === 'action' && entry.techniqueId) {
        // Check if the technique has isHeavy flag
        const technique = getTechnique(entry.techniqueId);
        return technique?.isHeavy === true;
      }
    }
    return false;
  }

  if (condition === 'player.usedTechnique') {
    // Check if player used a technique last turn
    const log = ctx.state.combatLog;
    if (log.length === 0) return false;

    // Find most recent player action in current or previous round
    for (let i = log.length - 1; i >= 0; i--) {
      const entry = log[i];
      if (!entry) continue;
      if (entry.round < ctx.round - 1) break; // Too old
      if (entry.actorName === ctx.player.name && entry.type === 'action') {
        // Check if it was a technique (not basic attack or defend)
        return entry.message.includes('uses') && !entry.message.includes('attacks');
      }
    }
    return false;
  }

  // Player HP conditions
  if (condition.includes('player.hp')) {
    const hpCondition = condition.replace('player.hp', 'hp');
    return checkHPCondition(ctx.player, hpCondition);
  }

  // Chi conditions
  const chiMatch = condition.match(/chi\s*([<>]=?)\s*(\d+)/);
  if (chiMatch && chiMatch[1] && chiMatch[2]) {
    const operator = chiMatch[1];
    const threshold = parseInt(chiMatch[2]);
    return evaluateComparison(operator, ctx.enemy.chi, threshold);
  }

  // Self state conditions
  if (condition === 'hasBuff') {
    return ctx.enemy.statusEffects.some((e) => e.type === 'buff');
  }

  if (condition === 'justDefended') {
    return ctx.enemy.statusEffects.some((e) => e.id === 'defending');
  }

  if (condition.includes('!healed')) {
    // Check if enemy has used a heal this combat by searching combat log
    const log = ctx.state.combatLog;
    const healKeywords = ['heals', 'second-wind', 'rally-cry', 'heal'];
    for (const entry of log) {
      if (entry.actorName === ctx.enemy.name && entry.type === 'action') {
        if (healKeywords.some(kw => entry.message.toLowerCase().includes(kw))) {
          return false; // Already healed
        }
      }
    }
    return true; // Has not healed yet
  }

  if (condition.includes('!shielded')) {
    // Check status effects for shield-related buffs
    return !ctx.enemy.statusEffects.some((e) =>
      e.id === 'shielded' ||
      e.description?.toLowerCase().includes('shield') ||
      e.name?.toLowerCase().includes('shield')
    );
  }

  if (condition.includes('!prideBuff')) {
    return !ctx.enemy.statusEffects.some((e) =>
      e.id === 'pride' ||
      e.description?.toLowerCase().includes('pride')
    );
  }

  if (condition.includes('!meditated')) {
    // Check if enemy has used meditation this combat
    const log = ctx.state.combatLog;
    for (const entry of log) {
      if (entry.actorName === ctx.enemy.name && entry.type === 'action') {
        if (entry.message.toLowerCase().includes('meditate')) {
          return false; // Already meditated
        }
      }
    }
    return true; // Has not meditated yet
  }

  if (condition.includes('!enlightened')) {
    return !ctx.enemy.statusEffects.some((e) =>
      e.id === 'enlightened' ||
      e.description?.toLowerCase().includes('enlightened')
    );
  }

  // Unknown condition - don't match
  return false;
}

/**
 * Parse an action string into a CombatAction
 */
function parseAction(actionStr: string, enemy: Enemy, player: Character): CombatAction {
  // Technique action: "use:technique-id"
  const useMatch = actionStr.match(/use:(.+)/);
  if (useMatch && useMatch[1]) {
    const techniqueId = useMatch[1];
    const technique = getTechnique(techniqueId);

    if (technique) {
      return {
        type: 'technique',
        actor: enemy,
        target: player,
        technique,
      };
    }
  }

  // Default to basic attack
  return {
    type: 'attack',
    actor: enemy,
    target: player,
  };
}

// =============================================================================
// AI CONTROLLER
// =============================================================================

export class AIController {
  /**
   * Select an action for an enemy based on their AI pattern
   */
  static selectAction(
    enemy: Enemy,
    player: Character,
    state: CombatState
  ): CombatAction {
    const ctx: EvalContext = {
      enemy,
      player,
      turn: state.currentTurn,
      round: state.round,
      state,
    };

    // Sort rules by priority (highest first)
    const sortedRules = [...enemy.aiPattern.rules].sort(
      (a, b) => b.priority - a.priority
    );

    // Find first matching rule
    for (const rule of sortedRules) {
      if (evaluateCondition(rule.condition, ctx)) {
        const action = parseAction(rule.action, enemy, player);

        // Check if we can actually use this action
        if (action.type === 'technique' && action.technique) {
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
      type: 'attack',
      actor: enemy,
      target: player,
    };
  }

  /**
   * Get behavior description for UI hints
   */
  static getBehaviorHint(enemy: Enemy): string {
    switch (enemy.aiPattern.behavior) {
      case 'aggressive':
        return 'Aggressive - attacks relentlessly';
      case 'balanced':
        return 'Balanced - mixes offense and defense';
      case 'tactical':
        return 'Tactical - uses abilities strategically';
      case 'predator':
        return 'Predator - exploits weaknesses';
      default:
        return '';
    }
  }

  /**
   * Check if enemy should trigger phase transition (bosses)
   */
  static checkPhaseTransition(enemy: Enemy): { shouldTransition: boolean; newPhase: number } {
    if (!enemy.phase || !enemy.maxPhase || !enemy.phaseThresholds) {
      return { shouldTransition: false, newPhase: 1 };
    }

    const hpPercent = (enemy.hp / enemy.maxHp) * 100;
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
   * Get phase transition dialogue
   */
  static getPhaseDialogue(enemy: Enemy, phase: number): string | undefined {
    return enemy.dialogue.phase?.[phase]?.[0];
  }
}
