/**
 * Character Type Definitions
 * Core types for player and enemy characters
 */

// =============================================================================
// STATS
// =============================================================================

export interface Stats {
  str: number;  // Strength - physical damage
  dex: number;  // Dexterity - speed, crit chance
  end: number;  // Endurance - HP pool, defense
  wis: number;  // Wisdom - chi pool, chi recovery
  apt?: number; // Aptitude - mastery growth rate (hidden)
  inv?: number; // Inverse Potential - inverse chi capacity (Li Wei only)
}

// Base stats for new character
export const DEFAULT_CHARACTER_STATS: Stats = {
  str: 10,
  dex: 10,
  end: 10,
  wis: 10,
};

// =============================================================================
// STANCES
// =============================================================================

export type Stance = 'flowing' | 'weathered' | 'hungry';

export interface StanceModifiers {
  attack: number;    // Damage multiplier (1.0 = 100%)
  defense: number;   // Defense multiplier
  speed: number;     // DEX modifier
  chiGen: number;    // Chi generation multiplier
}

export const STANCE_MODIFIERS: Record<Stance, StanceModifiers> = {
  flowing: {
    attack: 1.0,     // Balanced
    defense: 1.0,
    speed: 1.0,
    chiGen: 1.0,
  },
  weathered: {
    attack: 0.9,     // -10% attack
    defense: 1.5,    // +50% defense
    speed: 0.8,      // -20% speed
    chiGen: 1.3,     // +30% chi generation
  },
  hungry: {
    attack: 1.3,     // +30% attack
    defense: 0.7,    // -30% defense
    speed: 1.1,      // +10% speed
    chiGen: 1.5,     // +50% chi generation
  },
};

// =============================================================================
// CHI ASPECTS
// =============================================================================

export type ChiAspect =
  | 'force'     // 力 - Raw power, breaking guard
  | 'flow'      // 流 - Continuous motion, combos
  | 'precision' // 准 - Exact targeting, criticals
  | 'burst'     // 爆 - Explosive release, speed
  | 'armor'     // 甲 - Defensive density
  | 'sense'     // 感 - Awareness, reading opponents
  | 'will'      // 意 - Mental projection, intimidation
  | 'inverse';  // 逆 - Reversed flow, desperation power

// =============================================================================
// STATUS EFFECTS
// =============================================================================

export interface StatusEffect {
  id: string;
  name: string;
  type: 'buff' | 'debuff';
  stat?: keyof Stats;          // Which stat is affected
  modifier: number;            // Percentage modifier (+/-)
  duration: number;            // Turns remaining
  stackable: boolean;
  description?: string;
}

// Common status effects
export const STATUS_EFFECTS = {
  DEFENDING: {
    id: 'defending',
    name: 'Defending',
    type: 'buff' as const,
    stat: 'end' as const,
    modifier: 50,
    duration: 1,
    stackable: false,
    description: 'Damage reduced by 50%',
  },
  STUNNED: {
    id: 'stunned',
    name: 'Stunned',
    type: 'debuff' as const,
    modifier: 0,
    duration: 1,
    stackable: false,
    description: 'Cannot act this turn',
  },
  ARMOR_BROKEN: {
    id: 'armor-broken',
    name: 'Armor Broken',
    type: 'debuff' as const,
    stat: 'end' as const,
    modifier: -25,
    duration: 2,
    stackable: false,
    description: 'Defense reduced by 25%',
  },
};

// =============================================================================
// ASPECT LOADOUT SYSTEM
// =============================================================================

/**
 * Chi aspect loadout - equippable passive bonuses
 * Player can equip 1 primary (path-locked) + up to 3 secondary aspects
 */
export interface AspectLoadout {
  /** Primary aspect (locked by path, cannot change) */
  primary: ChiAspect;
  /** Secondary aspect slots (unlock through progression) */
  secondary: {
    slot1: ChiAspect | null;
    slot2: ChiAspect | null;
    slot3: ChiAspect | null;
  };
  /** Unlocked aspects available for equipping */
  unlocked: ChiAspect[];
}

export const DEFAULT_ASPECT_LOADOUT: AspectLoadout = {
  primary: 'force', // Default, gets overridden by path
  secondary: {
    slot1: null,
    slot2: null,
    slot3: null,
  },
  unlocked: ['force'], // Start with primary only
};

// =============================================================================
// TRAINING PROGRESS
// =============================================================================

export interface TrainingProgress {
  /** Total mastery points earned */
  masteryPoints: number;
  /** Techniques unlocked through training */
  techniquesUnlocked: string[];
  /** Completed training challenges */
  challengesCompleted: string[];
  /** Path trial completion status */
  pathTrialCompleted: {
    blade: boolean;
    stream: boolean;
    shadow: boolean;
  };
  /** Total sparring victories */
  sparringWins: number;
  /** Best performance records */
  bestPerformance: {
    fastestWin: number;      // Turns
    mostDamage: number;
    longestCombo: number;
  };
}

export const DEFAULT_TRAINING_PROGRESS: TrainingProgress = {
  masteryPoints: 0,
  techniquesUnlocked: [],
  challengesCompleted: [],
  pathTrialCompleted: {
    blade: false,
    stream: false,
    shadow: false,
  },
  sparringWins: 0,
  bestPerformance: {
    fastestWin: 999,
    mostDamage: 0,
    longestCombo: 0,
  },
};

// =============================================================================
// CHARACTER
// =============================================================================

export interface Character {
  id: string;
  name: string;

  // Health
  hp: number;
  maxHp: number;

  // Chi (standard)
  chi: number;
  maxChi: number;

  // Inverse Chi (Li Wei only)
  inverseChi: number;
  maxInverseChi: number;

  // Core stats
  stats: Stats;

  // Current stance
  stance: Stance;

  // Known technique IDs
  techniques: string[];

  // Mastery tracking: techniqueId -> usage count
  masteryLevels: Record<string, number>;

  // Active status effects
  statusEffects: StatusEffect[];

  // Path alignment percentages (player only, zero-sum totaling 100%)
  pathAlignment?: {
    blade: number;    // 0-100%
    stream: number;   // 0-100%
    shadow: number;   // 0-100%
  };

  // Aspect loadout (player only)
  aspectLoadout?: AspectLoadout;

  // Training progress (player only)
  trainingProgress?: TrainingProgress;

  // Is this the player character?
  isPlayer: boolean;
}

// =============================================================================
// ENEMY
// =============================================================================

export type EnemyFaction = 'thugs' | 'spartans' | 'lone-wolf' | 'beggars';
export type EnemyTier = 'common' | 'uncommon' | 'rare' | 'boss';

export interface EnemyDialogue {
  intro?: string[];      // Said at combat start
  lowHp?: string[];      // Said when HP < 30%
  victory?: string[];    // Said on player defeat
  defeat?: string[];     // Said when defeated
  phase?: Record<number, string[]>; // Boss phase transition dialogue
}

export interface AIRule {
  condition: string;     // e.g., "hp < 30%" or "player.defending"
  action: string;        // e.g., "use:desperate-strike" or "defend"
  priority: number;      // Higher = checked first
}

export interface AIPattern {
  name: string;
  behavior: 'aggressive' | 'balanced' | 'tactical' | 'predator';
  rules: AIRule[];
}

export interface LootDrop {
  itemId: string;
  chance: number;        // 0-1 probability
  quantity: number;
}

export interface Enemy extends Character {
  templateId: string;    // Original template ID for recreation
  faction: EnemyFaction;
  tier: EnemyTier;
  chiAspect: ChiAspect;
  aiPattern: AIPattern;
  drops: LootDrop[];
  dialogue: EnemyDialogue;

  // Boss-specific
  phase?: number;        // Current phase (1, 2, 3...)
  maxPhase?: number;     // Total phases
  phaseThresholds?: number[]; // HP percentages that trigger phase change
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Calculate HP from Endurance
 * Formula: Base 50 + (END * 5)
 */
export function calculateMaxHp(end: number): number {
  return 50 + (end * 5);
}

/**
 * Calculate Max Chi from Wisdom
 * Formula: Base 20 + (WIS * 3)
 */
export function calculateMaxChi(wis: number): number {
  return 20 + (wis * 3);
}

/**
 * Get effective stat with stance and status modifiers
 */
export function getEffectiveStat(
  character: Character,
  stat: keyof Stats
): number {
  const base = character.stats[stat] ?? 0;
  const stanceModifier = getStanceStatModifier(character.stance, stat);
  const statusModifier = getStatusStatModifier(character.statusEffects, stat);

  return Math.floor(base * stanceModifier * (1 + statusModifier / 100));
}

function getStanceStatModifier(stance: Stance, stat: keyof Stats): number {
  const mods = STANCE_MODIFIERS[stance];
  switch (stat) {
    case 'str': return mods.attack;
    case 'end': return mods.defense;
    case 'dex': return mods.speed;
    default: return 1.0;
  }
}

function getStatusStatModifier(effects: StatusEffect[], stat: keyof Stats): number {
  return effects
    .filter(e => e.stat === stat)
    .reduce((sum, e) => sum + e.modifier, 0);
}

/**
 * Get all equipped aspects from loadout
 */
export function getEquippedAspects(loadout: AspectLoadout): ChiAspect[] {
  const aspects: ChiAspect[] = [loadout.primary];

  if (loadout.secondary.slot1) aspects.push(loadout.secondary.slot1);
  if (loadout.secondary.slot2) aspects.push(loadout.secondary.slot2);
  if (loadout.secondary.slot3) aspects.push(loadout.secondary.slot3);

  return aspects;
}

/**
 * Check if character has specific aspect equipped
 */
export function hasAspectEquipped(character: Character, aspect: ChiAspect): boolean {
  if (!character.aspectLoadout) return false;
  return getEquippedAspects(character.aspectLoadout).includes(aspect);
}

/**
 * Get primary aspect based on dominant path
 */
export function getPrimaryAspectForPath(path: 'blade' | 'stream' | 'shadow'): ChiAspect {
  const mapping: Record<'blade' | 'stream' | 'shadow', ChiAspect> = {
    blade: 'force',
    stream: 'flow',
    shadow: 'precision',
  };
  return mapping[path];
}
