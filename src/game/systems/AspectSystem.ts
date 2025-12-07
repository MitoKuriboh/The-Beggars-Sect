/**
 * Aspect System
 * Handles chi aspect loadouts, bonuses, and progression
 */

import type { Character, ChiAspect, AspectLoadout } from '../../types/character';
import { getEquippedAspects, getPrimaryAspectForPath } from '../../types/character';
import { getDominantPath } from '../../types/story';

// =============================================================================
// ASPECT PASSIVE BONUSES
// =============================================================================

export interface AspectBonus {
  name: string;
  description: string;
  effect: {
    type: 'damage' | 'defense' | 'crit' | 'chi' | 'special';
    value: number;
    condition?: string;
  };
}

export const ASPECT_BONUSES: Record<ChiAspect, AspectBonus> = {
  force: {
    name: 'Overwhelming Power',
    description: 'Deal +15% damage to defending enemies',
    effect: { type: 'damage', value: 0.15, condition: 'target.defending' },
  },
  flow: {
    name: 'Continuous Motion',
    description: '+10% combo damage',
    effect: { type: 'damage', value: 0.10, condition: 'in_combo' },
  },
  precision: {
    name: 'Perfect Timing',
    description: '+10% critical hit chance',
    effect: { type: 'crit', value: 0.10 },
  },
  burst: {
    name: 'Explosive Start',
    description: '+15% damage on first strike',
    effect: { type: 'damage', value: 0.15, condition: 'first_strike' },
  },
  armor: {
    name: 'Unbreakable Shell',
    description: '+20% defense when HP < 50%',
    effect: { type: 'defense', value: 0.20, condition: 'hp_below_50' },
  },
  sense: {
    name: 'Reading Intent',
    description: 'Preview enemy next move',
    effect: { type: 'special', value: 1, condition: 'always' },
  },
  will: {
    name: 'Iron Mind',
    description: '50% chance to resist stuns/debuffs',
    effect: { type: 'special', value: 0.5, condition: 'on_debuff' },
  },
  inverse: {
    name: 'Reversed Flow',
    description: '+25% damage BUT -10% max HP',
    effect: { type: 'damage', value: 0.25, condition: 'always' },
  },
};

// =============================================================================
// ASPECT PROGRESSION
// =============================================================================

export interface AspectUnlockRequirement {
  aspect: ChiAspect;
  requirements: {
    masteryPoints?: number;
    pathPercentage?: { path: 'blade' | 'stream' | 'shadow'; min: number };
    chapter?: number;
    special?: string;
  };
}

export const ASPECT_UNLOCK_TREE: AspectUnlockRequirement[] = [
  // Primary aspects (path-locked, unlocked at start)
  {
    aspect: 'force',
    requirements: { pathPercentage: { path: 'blade', min: 30 } },
  },
  {
    aspect: 'flow',
    requirements: { pathPercentage: { path: 'stream', min: 30 } },
  },
  {
    aspect: 'precision',
    requirements: { pathPercentage: { path: 'shadow', min: 30 } },
  },

  // Training unlocks
  {
    aspect: 'burst',
    requirements: { masteryPoints: 50 },
  },
  {
    aspect: 'armor',
    requirements: { masteryPoints: 100 },
  },

  // Chapter unlocks
  {
    aspect: 'sense',
    requirements: { chapter: 1, masteryPoints: 150 },
  },
  {
    aspect: 'will',
    requirements: { chapter: 2, masteryPoints: 200 },
  },

  // Special unlock (story-gated)
  {
    aspect: 'inverse',
    requirements: { special: 'inverse-chi-awakening', chapter: 2 },
  },
];

// =============================================================================
// ASPECT LOADOUT MANAGEMENT
// =============================================================================

/**
 * Initialize aspect loadout based on character's dominant path
 */
export function initializeAspectLoadout(character: Character): AspectLoadout {
  if (!character.pathAlignment) {
    return {
      primary: 'force',
      secondary: { slot1: null, slot2: null, slot3: null },
      unlocked: ['force'],
    };
  }

  const dominantPath = getDominantPath(character.pathAlignment);
  const primaryAspect =
    dominantPath === 'balanced' ? 'flow' : getPrimaryAspectForPath(dominantPath);

  return {
    primary: primaryAspect,
    secondary: { slot1: null, slot2: null, slot3: null },
    unlocked: [primaryAspect],
  };
}

/**
 * Check if aspect can be unlocked
 */
export function canUnlockAspect(
  character: Character,
  aspect: ChiAspect,
  currentChapter: number,
  storyFlags: Record<string, boolean | string | number>
): boolean {
  const requirement = ASPECT_UNLOCK_TREE.find(req => req.aspect === aspect);
  if (!requirement) return false;

  const { masteryPoints, pathPercentage, chapter, special } = requirement.requirements;

  // Check mastery points
  if (masteryPoints && (!character.trainingProgress || character.trainingProgress.masteryPoints < masteryPoints)) {
    return false;
  }

  // Check path percentage
  if (pathPercentage && character.pathAlignment) {
    if (character.pathAlignment[pathPercentage.path] < pathPercentage.min) {
      return false;
    }
  }

  // Check chapter
  if (chapter && currentChapter < chapter) {
    return false;
  }

  // Check special flag
  if (special && !storyFlags[special]) {
    return false;
  }

  return true;
}

/**
 * Unlock aspect for character
 */
export function unlockAspect(character: Character, aspect: ChiAspect): boolean {
  if (!character.aspectLoadout) {
    character.aspectLoadout = initializeAspectLoadout(character);
  }

  if (character.aspectLoadout.unlocked.includes(aspect)) {
    return false; // Already unlocked
  }

  character.aspectLoadout.unlocked.push(aspect);
  return true;
}

/**
 * Equip aspect to secondary slot
 */
export function equipAspect(
  character: Character,
  aspect: ChiAspect,
  slot: 'slot1' | 'slot2' | 'slot3'
): boolean {
  if (!character.aspectLoadout) return false;
  if (!character.aspectLoadout.unlocked.includes(aspect)) return false;
  if (aspect === character.aspectLoadout.primary) return false; // Can't equip primary in secondary

  character.aspectLoadout.secondary[slot] = aspect;
  return true;
}

/**
 * Unequip aspect from secondary slot
 */
export function unequipAspect(character: Character, slot: 'slot1' | 'slot2' | 'slot3'): void {
  if (!character.aspectLoadout) return;
  character.aspectLoadout.secondary[slot] = null;
}

/**
 * Get number of unlocked secondary slots based on progression
 */
export function getUnlockedSlotCount(masteryPoints: number, chapter: number): number {
  let slots = 0;
  if (masteryPoints >= 50) slots++; // Slot 1 at 50 mastery
  if (chapter >= 1) slots++; // Slot 2 at Chapter 1
  if (chapter >= 2) slots++; // Slot 3 at Chapter 2
  return Math.min(slots, 3);
}

// =============================================================================
// ASPECT BONUS CALCULATION
// =============================================================================

/**
 * Calculate total damage bonus from equipped aspects
 */
export function calculateAspectDamageBonus(
  character: Character,
  isCombo: boolean,
  isFirstStrike: boolean,
  targetDefending: boolean
): number {
  if (!character.aspectLoadout) return 0;

  let bonus = 0;
  const equipped = getEquippedAspects(character.aspectLoadout);

  for (const aspect of equipped) {
    const aspectBonus = ASPECT_BONUSES[aspect];

    if (aspectBonus.effect.type === 'damage') {
      const { value, condition } = aspectBonus.effect;

      // Check if condition is met
      if (!condition || condition === 'always') {
        bonus += value;
      } else if (condition === 'in_combo' && isCombo) {
        bonus += value;
      } else if (condition === 'first_strike' && isFirstStrike) {
        bonus += value;
      } else if (condition === 'target.defending' && targetDefending) {
        bonus += value;
      }
    }
  }

  return bonus;
}

/**
 * Calculate critical hit chance bonus from aspects
 */
export function calculateAspectCritBonus(character: Character): number {
  if (!character.aspectLoadout) return 0;

  let bonus = 0;
  const equipped = getEquippedAspects(character.aspectLoadout);

  for (const aspect of equipped) {
    const aspectBonus = ASPECT_BONUSES[aspect];
    if (aspectBonus.effect.type === 'crit') {
      bonus += aspectBonus.effect.value;
    }
  }

  return bonus;
}

/**
 * Check if character has Sense aspect (preview enemy moves)
 */
export function hasSenseAspect(character: Character): boolean {
  if (!character.aspectLoadout) return false;
  return getEquippedAspects(character.aspectLoadout).includes('sense');
}

/**
 * Check if character has Will aspect (resist debuffs)
 */
export function hasWillAspect(character: Character): boolean {
  if (!character.aspectLoadout) return false;
  return getEquippedAspects(character.aspectLoadout).includes('will');
}

/**
 * Get HP penalty from Inverse aspect
 */
export function getInverseHpPenalty(character: Character): number {
  if (!character.aspectLoadout) return 0;
  return getEquippedAspects(character.aspectLoadout).includes('inverse') ? 0.10 : 0;
}
