/**
 * Technique Type Definitions
 * Combat techniques and their effects
 */

import type { Stance, ChiAspect } from './character';

// =============================================================================
// TECHNIQUE EFFECTS
// =============================================================================

export type EffectType =
  | 'damage'          // Direct damage
  | 'heal'            // HP recovery
  | 'chi-restore'     // Chi recovery
  | 'buff'            // Positive status
  | 'debuff'          // Negative status
  | 'stun'            // Skip turn
  | 'armor-break'     // Reduce defense
  | 'counter-setup'   // Enable counter attack
  | 'multi-hit';      // Multiple strikes

export type EffectTarget = 'self' | 'enemy' | 'all-enemies';

export interface TechniqueEffect {
  type: EffectType;
  value: number;               // Amount/percentage
  target: EffectTarget;
  duration?: number;           // Turns (for buffs/debuffs)
  condition?: string;          // e.g., "hp < 30%"
  description: string;
}

// =============================================================================
// COMBO SYSTEM
// =============================================================================

export type ComboRole = 'starter' | 'followup' | 'finisher' | 'any';

export interface ComboLink {
  techniqueId: string;         // Can link to this technique
  bonusMultiplier?: number;    // Extra damage bonus for this specific link
}

// =============================================================================
// MASTERY SYSTEM
// =============================================================================

export interface MasteryBonus {
  level: number;               // 1-5
  usesRequired: number;        // Uses needed to reach this level
  powerBonus: number;          // +X to power
  effectBonus?: string;        // Description of enhanced effect
}

export const MASTERY_THRESHOLDS: MasteryBonus[] = [
  { level: 1, usesRequired: 0, powerBonus: 0 },
  { level: 2, usesRequired: 10, powerBonus: 2, effectBonus: 'Improved effect' },
  { level: 3, usesRequired: 25, powerBonus: 4, effectBonus: 'Better synergy' },
  { level: 4, usesRequired: 50, powerBonus: 6, effectBonus: 'New combos unlock' },
  { level: 5, usesRequired: 100, powerBonus: 8, effectBonus: 'Signature technique' },
];

// =============================================================================
// TECHNIQUE
// =============================================================================

export interface Technique {
  id: string;
  name: string;
  chinese: string;             // Chinese name (e.g., 掌击)

  // Requirements
  stance: Stance | 'any';      // Required stance, or any

  // Core stats
  power: number;               // Base damage (0 for non-damage)
  chiCost: number;             // Chi required (0 = generates chi)
  speed: number;               // Turn delay modifier (-3 slow to +2 fast)

  // Chi aspect alignment
  aspect: ChiAspect;

  // Effects
  effects: TechniqueEffect[];

  // Combo system
  comboRole: ComboRole;
  comboLinks: ComboLink[];     // Techniques this can link into

  // Flavor
  description: string;
  philosophy?: string;         // Lore text

  // Progression
  masteryBonuses: MasteryBonus[];

  // Unlock
  unlockedByDefault: boolean;
  unlockChapter?: number;      // First available in this chapter
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get mastery level from usage count
 */
export function getMasteryLevel(uses: number): number {
  for (let i = MASTERY_THRESHOLDS.length - 1; i >= 0; i--) {
    if (uses >= MASTERY_THRESHOLDS[i].usesRequired) {
      return MASTERY_THRESHOLDS[i].level;
    }
  }
  return 1;
}

/**
 * Get mastery bonus for a technique
 */
export function getMasteryBonus(uses: number): MasteryBonus {
  const level = getMasteryLevel(uses);
  return MASTERY_THRESHOLDS[level - 1];
}

/**
 * Calculate effective power with mastery
 */
export function getEffectivePower(technique: Technique, uses: number): number {
  const bonus = getMasteryBonus(uses);
  return technique.power + bonus.powerBonus;
}

/**
 * Check if character can use technique
 */
export function canUseTechnique(
  technique: Technique,
  currentStance: Stance,
  currentChi: number
): { canUse: boolean; reason?: string } {
  // Check stance requirement
  if (technique.stance !== 'any' && technique.stance !== currentStance) {
    return {
      canUse: false,
      reason: `Requires ${technique.stance} stance`,
    };
  }

  // Check chi cost
  if (currentChi < technique.chiCost) {
    return {
      canUse: false,
      reason: `Need ${technique.chiCost} chi (have ${currentChi})`,
    };
  }

  return { canUse: true };
}

/**
 * Get combo damage multiplier based on position
 */
export function getComboMultiplier(role: ComboRole, chainLength: number): number {
  if (chainLength === 0) return 1.0;

  switch (role) {
    case 'starter': return 1.0;
    case 'followup': return 1.1;  // +10%
    case 'finisher': return 1.3;  // +30%
    case 'any': return 1.0 + (chainLength * 0.05); // +5% per chain
  }
}
