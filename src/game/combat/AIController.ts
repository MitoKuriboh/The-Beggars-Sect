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
  const hpMatch = condition.match(/hp\s*([<>]=?)\s*(\d+)%/);
  if (hpMatch) {
    const operator = hpMatch[1];
    const threshold = parseInt(hpMatch[2]) / 100;
    const hpPercent = ctx.enemy.hp / ctx.enemy.maxHp;

    switch (operator) {
      case '<': return hpPercent < threshold;
      case '<=': return hpPercent <= threshold;
      case '>': return hpPercent > threshold;
      case '>=': return hpPercent >= threshold;
    }
  }

  // Turn-based conditions
  const turnMatch = condition.match(/turn\s*===?\s*(\d+)/);
  if (turnMatch) {
    return ctx.turn === parseInt(turnMatch[1]);
  }

  const turnModMatch = condition.match(/turn\s*%\s*(\d+)\s*===?\s*(\d+)/);
  if (turnModMatch) {
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
    // Check if player's last action was a slow technique
    // For now, just return false - would need combat log analysis
    return false;
  }

  if (condition === 'player.usedTechnique') {
    // Check if player used a technique last turn
    return false; // Would need combat log
  }

  // Player HP conditions
  const playerHpMatch = condition.match(/player\.hp\s*([<>]=?)\s*(\d+)%/);
  if (playerHpMatch) {
    const operator = playerHpMatch[1];
    const threshold = parseInt(playerHpMatch[2]) / 100;
    const hpPercent = ctx.player.hp / ctx.player.maxHp;

    switch (operator) {
      case '<': return hpPercent < threshold;
      case '<=': return hpPercent <= threshold;
      case '>': return hpPercent > threshold;
      case '>=': return hpPercent >= threshold;
    }
  }

  // Chi conditions
  const chiMatch = condition.match(/chi\s*([<>]=?)\s*(\d+)/);
  if (chiMatch) {
    const operator = chiMatch[1];
    const threshold = parseInt(chiMatch[2]);

    switch (operator) {
      case '<': return ctx.enemy.chi < threshold;
      case '<=': return ctx.enemy.chi <= threshold;
      case '>': return ctx.enemy.chi > threshold;
      case '>=': return ctx.enemy.chi >= threshold;
    }
  }

  // Self state conditions
  if (condition === 'hasBuff') {
    return ctx.enemy.statusEffects.some((e) => e.type === 'buff');
  }

  if (condition === 'justDefended') {
    return ctx.enemy.statusEffects.some((e) => e.id === 'defending');
  }

  if (condition.includes('!healed')) {
    // Track if enemy has used a heal - would need state tracking
    return true;
  }

  if (condition.includes('!shielded')) {
    return !ctx.enemy.statusEffects.some((e) => e.id === 'shielded');
  }

  if (condition.includes('!prideBuff')) {
    return !ctx.enemy.statusEffects.some((e) => e.id === 'pride');
  }

  if (condition.includes('!meditated')) {
    return true; // Would need state tracking
  }

  if (condition.includes('!enlightened')) {
    return !ctx.enemy.statusEffects.some((e) => e.id === 'enlightened');
  }

  // Unknown condition - don't match
  return false;
}

/**
 * Parse an action string into a CombatAction
 */
function parseAction(actionStr: string, enemy: Enemy, player: Character): CombatAction {
  // Defend action
  if (actionStr === 'defend') {
    return {
      type: 'defend',
      actor: enemy,
    };
  }

  // Technique action: "use:technique-id"
  const useMatch = actionStr.match(/use:(.+)/);
  if (useMatch) {
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
