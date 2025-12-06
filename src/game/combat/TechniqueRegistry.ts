/**
 * Technique Registry
 * Defines all techniques available in the game
 */

import type { Technique, ChiAspect, ComboRole, TechniqueEffect } from '../../types/index';

// =============================================================================
// TECHNIQUE DEFINITIONS
// =============================================================================

const TECHNIQUES: Record<string, Technique> = {
  // ---------------------------------------------------------------------------
  // BASIC ATTACKS (unlocked by default)
  // ---------------------------------------------------------------------------

  'palm-strike': {
    id: 'palm-strike',
    name: 'Palm Strike',
    chinese: '掌击',
    stance: 'any',
    power: 12,
    chiCost: 0,
    speed: 0,
    aspect: 'force',
    effects: [],
    comboRole: 'starter',
    comboLinks: [{ techniqueId: 'flowing-strike' }, { techniqueId: 'double-palm' }],
    description: 'A basic palm strike. Generates chi on hit.',
    masteryBonuses: [],
    unlockedByDefault: true,
  },

  'flowing-strike': {
    id: 'flowing-strike',
    name: 'Flowing Strike',
    chinese: '流击',
    stance: 'flowing',
    power: 15,
    chiCost: 5,
    speed: 1,
    aspect: 'flow',
    effects: [],
    comboRole: 'followup',
    comboLinks: [{ techniqueId: 'finishing-palm' }, { techniqueId: 'double-palm' }],
    description: 'A smooth, continuous palm technique. Faster than basic attacks.',
    masteryBonuses: [],
    unlockedByDefault: true,
  },

  // ---------------------------------------------------------------------------
  // CHAPTER 1 TECHNIQUES
  // ---------------------------------------------------------------------------

  'double-palm': {
    id: 'double-palm',
    name: 'Double Palm',
    chinese: '双掌',
    stance: 'any',
    power: 20,
    chiCost: 8,
    speed: 0,
    aspect: 'force',
    effects: [
      {
        type: 'multi-hit',
        value: 2,
        target: 'enemy',
        description: 'Strikes twice',
      },
    ],
    comboRole: 'followup',
    comboLinks: [{ techniqueId: 'finishing-palm' }],
    description: 'Two rapid palm strikes in succession.',
    masteryBonuses: [],
    unlockedByDefault: false,
    unlockChapter: 1,
  },

  'finishing-palm': {
    id: 'finishing-palm',
    name: 'Finishing Palm',
    chinese: '终掌',
    stance: 'any',
    power: 25,
    chiCost: 12,
    speed: -1,
    aspect: 'force',
    effects: [],
    comboRole: 'finisher',
    comboLinks: [],
    description: 'A powerful finisher that ends combos. Refunds chi on combo completion.',
    masteryBonuses: [],
    unlockedByDefault: false,
    unlockChapter: 1,
  },

  'weathered-guard': {
    id: 'weathered-guard',
    name: 'Weathered Guard',
    chinese: '风雨守',
    stance: 'weathered',
    power: 0,
    chiCost: 6,
    speed: 2,
    aspect: 'armor',
    effects: [
      {
        type: 'buff',
        value: 30,
        target: 'self',
        duration: 2,
        description: '+30% defense for 2 turns',
      },
    ],
    comboRole: 'any',
    comboLinks: [],
    description: 'A defensive technique that hardens your stance.',
    masteryBonuses: [],
    unlockedByDefault: false,
    unlockChapter: 1,
  },

  'hungry-fang': {
    id: 'hungry-fang',
    name: 'Hungry Fang',
    chinese: '饿牙',
    stance: 'hungry',
    power: 22,
    chiCost: 10,
    speed: 1,
    aspect: 'burst',
    effects: [
      {
        type: 'heal',
        value: 20,
        target: 'self',
        condition: 'hp < 50%',
        description: 'Heals 20% HP if below half health',
      },
    ],
    comboRole: 'starter',
    comboLinks: [{ techniqueId: 'desperate-claw' }],
    description: 'A desperate attack that heals when wounded.',
    masteryBonuses: [],
    unlockedByDefault: false,
    unlockChapter: 1,
  },

  'desperate-claw': {
    id: 'desperate-claw',
    name: 'Desperate Claw',
    chinese: '绝爪',
    stance: 'hungry',
    power: 30,
    chiCost: 15,
    speed: 0,
    aspect: 'inverse',
    effects: [
      {
        type: 'damage',
        value: 10,
        target: 'self',
        description: 'Costs 10% of your HP',
      },
    ],
    comboRole: 'finisher',
    comboLinks: [],
    description: 'A desperate technique that sacrifices HP for power.',
    masteryBonuses: [],
    unlockedByDefault: false,
    unlockChapter: 1,
  },

  // ---------------------------------------------------------------------------
  // COUNTER TECHNIQUES
  // ---------------------------------------------------------------------------

  'deflecting-palm': {
    id: 'deflecting-palm',
    name: 'Deflecting Palm',
    chinese: '拨掌',
    stance: 'flowing',
    power: 8,
    chiCost: 4,
    speed: 2,
    aspect: 'sense',
    effects: [
      {
        type: 'counter-setup',
        value: 1,
        target: 'self',
        duration: 1,
        description: 'Counter the next attack',
      },
    ],
    comboRole: 'any',
    comboLinks: [{ techniqueId: 'flowing-strike' }],
    description: 'Prepare to deflect and counter the next attack.',
    masteryBonuses: [],
    unlockedByDefault: false,
    unlockChapter: 1,
  },

  // ---------------------------------------------------------------------------
  // ENEMY-ONLY TECHNIQUES
  // ---------------------------------------------------------------------------

  'punch': {
    id: 'punch',
    name: 'Punch',
    chinese: '拳',
    stance: 'any',
    power: 10,
    chiCost: 0,
    speed: 0,
    aspect: 'force',
    effects: [],
    comboRole: 'any',
    comboLinks: [],
    description: 'A basic punch.',
    masteryBonuses: [],
    unlockedByDefault: false,
  },

  'wild-swing': {
    id: 'wild-swing',
    name: 'Wild Swing',
    chinese: '狂挥',
    stance: 'any',
    power: 18,
    chiCost: 0,
    speed: -1,
    aspect: 'force',
    effects: [],
    comboRole: 'any',
    comboLinks: [],
    description: 'A desperate, powerful swing.',
    masteryBonuses: [],
    unlockedByDefault: false,
  },

  'headbutt': {
    id: 'headbutt',
    name: 'Headbutt',
    chinese: '头撞',
    stance: 'any',
    power: 15,
    chiCost: 0,
    speed: 0,
    aspect: 'force',
    effects: [
      {
        type: 'stun',
        value: 1,
        target: 'enemy',
        description: '20% chance to stun',
      },
    ],
    comboRole: 'any',
    comboLinks: [],
    description: 'A brutal headbutt that can stun.',
    masteryBonuses: [],
    unlockedByDefault: false,
  },

  'heavy-punch': {
    id: 'heavy-punch',
    name: 'Heavy Punch',
    chinese: '重拳',
    stance: 'any',
    power: 16,
    chiCost: 0,
    speed: -1,
    aspect: 'force',
    effects: [],
    comboRole: 'any',
    comboLinks: [],
    description: 'A slow but powerful punch.',
    masteryBonuses: [],
    unlockedByDefault: false,
  },

  'crushing-blow': {
    id: 'crushing-blow',
    name: 'Crushing Blow',
    chinese: '碎击',
    stance: 'any',
    power: 22,
    chiCost: 5,
    speed: -2,
    aspect: 'force',
    effects: [
      {
        type: 'armor-break',
        value: 20,
        target: 'enemy',
        duration: 2,
        description: 'Reduces defense by 20%',
      },
    ],
    comboRole: 'any',
    comboLinks: [],
    description: 'A crushing attack that breaks armor.',
    masteryBonuses: [],
    unlockedByDefault: false,
  },

  'intimidate': {
    id: 'intimidate',
    name: 'Intimidate',
    chinese: '威吓',
    stance: 'any',
    power: 0,
    chiCost: 0,
    speed: 2,
    aspect: 'will',
    effects: [
      {
        type: 'debuff',
        value: -10,
        target: 'enemy',
        duration: 3,
        description: 'Reduces attack by 10%',
      },
    ],
    comboRole: 'any',
    comboLinks: [],
    description: 'Intimidate the opponent, weakening their attacks.',
    masteryBonuses: [],
    unlockedByDefault: false,
  },

  'desperate-flurry': {
    id: 'desperate-flurry',
    name: 'Desperate Flurry',
    chinese: '绝望连击',
    stance: 'any',
    power: 12,
    chiCost: 8,
    speed: 1,
    aspect: 'burst',
    effects: [
      {
        type: 'multi-hit',
        value: 3,
        target: 'enemy',
        description: 'Strikes 3 times',
      },
    ],
    comboRole: 'finisher',
    comboLinks: [],
    description: 'A desperate flurry of attacks.',
    masteryBonuses: [],
    unlockedByDefault: false,
  },
};

// =============================================================================
// REGISTRY FUNCTIONS
// =============================================================================

/**
 * Get a technique by ID
 */
export function getTechnique(id: string): Technique | undefined {
  return TECHNIQUES[id];
}

/**
 * Get all techniques
 */
export function getAllTechniques(): Technique[] {
  return Object.values(TECHNIQUES);
}

/**
 * Get techniques available to the player at a given chapter
 */
export function getPlayerTechniques(chapter: number): Technique[] {
  return Object.values(TECHNIQUES).filter((t) => {
    if (t.unlockedByDefault) return true;
    if (t.unlockChapter && t.unlockChapter <= chapter) return true;
    return false;
  });
}

/**
 * Get techniques for a character by their technique IDs
 */
export function getTechniquesForCharacter(techniqueIds: string[]): Technique[] {
  return techniqueIds
    .map((id) => TECHNIQUES[id])
    .filter((t): t is Technique => t !== undefined);
}

/**
 * Check if a technique can be used
 */
export function canUseTechnique(
  technique: Technique,
  currentStance: string,
  currentChi: number
): { canUse: boolean; reason?: string } {
  if (technique.stance !== 'any' && technique.stance !== currentStance) {
    return {
      canUse: false,
      reason: `Requires ${technique.stance} stance`,
    };
  }

  if (currentChi < technique.chiCost) {
    return {
      canUse: false,
      reason: `Need ${technique.chiCost} chi (have ${currentChi})`,
    };
  }

  return { canUse: true };
}

/**
 * Get techniques that can follow from a given technique (for combo hints)
 */
export function getComboFollowups(techniqueId: string): Technique[] {
  const technique = TECHNIQUES[techniqueId];
  if (!technique) return [];

  return technique.comboLinks
    .map((link) => TECHNIQUES[link.techniqueId])
    .filter((t): t is Technique => t !== undefined);
}

/**
 * Get all starter techniques (for beginning combos)
 */
export function getStarterTechniques(techniqueIds: string[]): Technique[] {
  return techniqueIds
    .map((id) => TECHNIQUES[id])
    .filter((t): t is Technique => t !== undefined && t.comboRole === 'starter');
}

/**
 * Get all finisher techniques
 */
export function getFinisherTechniques(techniqueIds: string[]): Technique[] {
  return techniqueIds
    .map((id) => TECHNIQUES[id])
    .filter((t): t is Technique => t !== undefined && t.comboRole === 'finisher');
}
