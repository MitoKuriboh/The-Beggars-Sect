/**
 * Game Utilities - Index
 * Centralized export for all game utility functions
 */

// Status Effect Utilities
export {
  tickCharacterStatusEffects,
  tickStatusEffectsForAll,
  hasStatusEffect,
  removeStatusEffect,
  getStatusEffectStatModifier,
  clearAllStatusEffects,
  extendStatusEffectDuration,
  refreshStatusEffectDuration,
} from './StatusEffectUtils';

// Condition Parser
export {
  parseHPCondition,
  evaluateHPCondition,
  checkHPCondition,
  getHPPercent,
  isLowHP,
  isHighHP,
  isCriticalHP,
  type HPCondition,
  type ComparisonOperator,
} from './ConditionParser';

// Comparison Evaluator
export {
  evaluateComparison,
  isInRange,
  isOutOfRange,
  clamp,
  checkModulo,
  checkChance,
  approximatelyEqual,
  evaluateComparisonString,
} from './ComparisonEvaluator';
