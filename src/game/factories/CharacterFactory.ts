/**
 * Character Factory
 * Creates player and enemy characters from templates
 */

import type {
  Character,
  Enemy,
  Stats,
  Stance,
  ChiAspect,
  EnemyFaction,
  EnemyTier,
  AIPattern,
  LootDrop,
  EnemyDialogue,
} from '../../types/index';

import { calculateMaxHp, calculateMaxChi } from '../../types/character';

// =============================================================================
// PLAYER CREATION
// =============================================================================

/**
 * Create Li Wei (player character)
 * Starts with balanced stats and unique inverse chi potential
 */
export function createPlayer(): Character {
  const stats: Stats = {
    str: 10,
    dex: 10,
    end: 10,
    wis: 10,
    apt: 15,  // High aptitude for mastery growth
    inv: 99,  // Maximum inverse potential (unique to Li Wei)
  };

  return {
    id: 'li-wei',
    name: 'Li Wei',
    hp: calculateMaxHp(stats.end),      // 100
    maxHp: calculateMaxHp(stats.end),
    chi: calculateMaxChi(stats.wis),    // 50
    maxChi: calculateMaxChi(stats.wis),
    inverseChi: 0,
    maxInverseChi: 100,
    stats,
    stance: 'flowing' as Stance,
    techniques: ['palm-strike', 'flowing-strike'],
    masteryLevels: {},
    statusEffects: [],
    isPlayer: true,
  };
}

// =============================================================================
// ENEMY TEMPLATES
// =============================================================================

interface EnemyTemplate {
  id: string;
  name: string;
  chinese: string;
  faction: EnemyFaction;
  tier: EnemyTier;
  chiAspect: ChiAspect;
  stats: Stats;
  speed: number;
  defense: number;
  techniques: string[];
  aiPattern: AIPattern;
  drops: LootDrop[];
  dialogue: EnemyDialogue;
  phase?: number;
  maxPhase?: number;
  phaseThresholds?: number[];
}

// Chapter 1 Enemies
const ENEMY_TEMPLATES: Record<string, EnemyTemplate> = {
  // ─────────────────────────────────────────────────────────────────────────
  // URBAN THUGS
  // ─────────────────────────────────────────────────────────────────────────

  'desperate-thug': {
    id: 'desperate-thug',
    name: 'Desperate Thug',
    chinese: '亡命徒',
    faction: 'thugs',
    tier: 'common',
    chiAspect: 'force',
    stats: { str: 6, dex: 5, end: 5, wis: 3 },
    speed: 100,
    defense: 2,
    techniques: ['punch', 'wild-swing'],
    aiPattern: {
      name: 'BASIC_DESPERATE',
      behavior: 'aggressive',
      rules: [
        { condition: 'hp < 40%', action: 'use:wild-swing', priority: 1 },
        { condition: 'default', action: 'use:punch', priority: 0 },
      ],
    },
    drops: [
      { itemId: 'coins', chance: 0.3, quantity: 2 },
    ],
    dialogue: {
      intro: ['Hand over the pendant!'],
      lowHp: ['This... this was supposed to be easy!'],
      victory: ['Heh... told you.'],
      defeat: ['Not worth it!'],
    },
  },

  'street-punk': {
    id: 'street-punk',
    name: 'Street Punk',
    chinese: '街痞',
    faction: 'thugs',
    tier: 'common',
    chiAspect: 'force',
    stats: { str: 8, dex: 6, end: 6, wis: 4 },
    speed: 108,
    defense: 3,
    techniques: ['punch', 'wild-swing'],
    aiPattern: {
      name: 'BASIC_AGGRESSIVE',
      behavior: 'aggressive',
      rules: [
        { condition: 'hp < 30%', action: 'use:wild-swing', priority: 1 },
        { condition: 'default', action: 'use:punch', priority: 0 },
      ],
    },
    drops: [
      { itemId: 'rice-ball', chance: 0.3, quantity: 1 },
      { itemId: 'coins', chance: 0.5, quantity: 5 },
    ],
    dialogue: {
      intro: ['Hey! Empty your pockets!'],
      lowHp: ["You... you'll regret this!"],
      victory: ['Ha! Not so tough now!'],
      defeat: ['Ugh...'],
    },
  },

  'alley-brawler': {
    id: 'alley-brawler',
    name: 'Alley Brawler',
    chinese: '巷打手',
    faction: 'thugs',
    tier: 'common',
    chiAspect: 'force',
    stats: { str: 10, dex: 8, end: 8, wis: 5 },
    speed: 112,
    defense: 4,
    techniques: ['punch', 'headbutt', 'block'],
    aiPattern: {
      name: 'BASIC_BALANCED',
      behavior: 'balanced',
      rules: [
        { condition: 'hp < 40%', action: 'defend', priority: 2 },
        { condition: 'turn % 3 === 0', action: 'use:headbutt', priority: 1 },
        { condition: 'default', action: 'use:punch', priority: 0 },
      ],
    },
    drops: [
      { itemId: 'rice-ball', chance: 0.4, quantity: 1 },
      { itemId: 'bandage', chance: 0.2, quantity: 1 },
      { itemId: 'coins', chance: 0.4, quantity: 10 },
    ],
    dialogue: {
      intro: ['Another beggar? Easy pickings.'],
      lowHp: ['Tch... you fight dirty!'],
      victory: ["Stay down if you know what's good for ya!"],
      defeat: ["The boss... won't like this..."],
    },
  },

  'scarred-enforcer': {
    id: 'scarred-enforcer',
    name: 'Scarred Enforcer',
    chinese: '疤执行者',
    faction: 'thugs',
    tier: 'uncommon',
    chiAspect: 'force',
    stats: { str: 12, dex: 10, end: 10, wis: 6 },
    speed: 116,
    defense: 5,
    techniques: ['heavy-punch', 'crushing-blow', 'intimidate', 'desperate-flurry'],
    aiPattern: {
      name: 'ADVANCED_AGGRESSIVE',
      behavior: 'aggressive',
      rules: [
        { condition: 'turn === 1', action: 'use:intimidate', priority: 3 },
        { condition: 'hp < 25%', action: 'use:desperate-flurry', priority: 2 },
        { condition: 'player.defending', action: 'use:crushing-blow', priority: 1 },
        { condition: 'default', action: 'use:heavy-punch', priority: 0 },
      ],
    },
    drops: [
      { itemId: 'rice-ball', chance: 0.5, quantity: 1 },
      { itemId: 'strength-tonic', chance: 0.15, quantity: 1 },
      { itemId: 'coins', chance: 0.5, quantity: 20 },
      { itemId: 'technique-scroll', chance: 0.03, quantity: 1 },
    ],
    dialogue: {
      intro: ["The boss wants this turf. You're in the way."],
      lowHp: ["You're... stronger than you look..."],
      victory: ['Just like all the others. Weak.'],
      defeat: ['Tell... tell Razor... I failed...'],
    },
  },

  'gang-lieutenant': {
    id: 'gang-lieutenant',
    name: 'Gang Lieutenant',
    chinese: '帮副官',
    faction: 'thugs',
    tier: 'rare',
    chiAspect: 'burst',
    stats: { str: 14, dex: 12, end: 12, wis: 8 },
    speed: 120,
    defense: 6,
    techniques: ['iron-fist', 'gang-tactics', 'takedown', 'last-stand'],
    aiPattern: {
      name: 'ADVANCED_TACTICAL',
      behavior: 'tactical',
      rules: [
        { condition: 'turn === 2', action: 'use:gang-tactics', priority: 3 },
        { condition: 'hasBuff', action: 'use:takedown', priority: 2 },
        { condition: 'hp < 20%', action: 'use:last-stand', priority: 1 },
        { condition: 'default', action: 'use:iron-fist', priority: 0 },
      ],
    },
    drops: [
      { itemId: 'beggars-feast', chance: 0.3, quantity: 1 },
      { itemId: 'strength-tonic', chance: 0.4, quantity: 1 },
      { itemId: 'coins', chance: 0.6, quantity: 50 },
      { itemId: 'technique-scroll', chance: 0.1, quantity: 1 },
    ],
    dialogue: {
      intro: ['A beggar dares challenge me? Know your place!'],
      lowHp: ['Impossible... I trained for years!'],
      victory: ['Crawl back to your gutter, beggar.'],
      defeat: ['The Spartans... they were right about you beggars...'],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // SPARTANS
  // ─────────────────────────────────────────────────────────────────────────

  'spartan-recruit': {
    id: 'spartan-recruit',
    name: 'Spartan Recruit',
    chinese: '斯巴达新兵',
    faction: 'spartans',
    tier: 'common',
    chiAspect: 'precision',
    stats: { str: 10, dex: 12, end: 10, wis: 8 },
    speed: 120,
    defense: 5,
    techniques: ['precision-strike', 'formation-guard', 'disciplined-thrust'],
    aiPattern: {
      name: 'ADVANCED_DEFENSIVE',
      behavior: 'balanced',
      rules: [
        { condition: 'hp < 60% && !defending', action: 'defend', priority: 2 },
        { condition: 'justDefended', action: 'use:disciplined-thrust', priority: 1 },
        { condition: 'default', action: 'use:precision-strike', priority: 0 },
      ],
    },
    drops: [
      { itemId: 'bandage', chance: 0.4, quantity: 1 },
      { itemId: 'swift-elixir', chance: 0.2, quantity: 1 },
      { itemId: 'coins', chance: 0.5, quantity: 25 },
    ],
    dialogue: {
      intro: ['Halt! State your business, vagrant.'],
      lowHp: ['Requesting backup... situation escalating...'],
      victory: ['Surrender now. This is your only warning.'],
      defeat: ['Command... target is... formidable...'],
    },
  },

  'spartan-warrior': {
    id: 'spartan-warrior',
    name: 'Spartan Warrior',
    chinese: '斯巴达战士',
    faction: 'spartans',
    tier: 'uncommon',
    chiAspect: 'armor',
    stats: { str: 14, dex: 14, end: 14, wis: 10 },
    speed: 124,
    defense: 7,
    techniques: ['lance-strike', 'shield-bash', 'phalanx-stance', 'execute'],
    aiPattern: {
      name: 'ADVANCED_TACTICAL',
      behavior: 'tactical',
      rules: [
        { condition: 'turn % 3 === 0', action: 'use:shield-bash', priority: 3 },
        { condition: 'player.stunned', action: 'use:execute', priority: 2 },
        { condition: 'hp < 40%', action: 'use:phalanx-stance', priority: 1 },
        { condition: 'default', action: 'use:lance-strike', priority: 0 },
      ],
    },
    drops: [
      { itemId: 'iron-skin-salve', chance: 0.3, quantity: 1 },
      { itemId: 'swift-elixir', chance: 0.3, quantity: 1 },
      { itemId: 'coins', chance: 0.6, quantity: 40 },
      { itemId: 'technique-scroll', chance: 0.08, quantity: 1 },
    ],
    dialogue: {
      intro: ["You've entered restricted territory. Prepare for detainment."],
      lowHp: ["Your technique... it's not from around here."],
      victory: ['Stand down. Resistance is futile.'],
      defeat: ['The beggars... they hide true warriors...'],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // LONE WOLVES
  // ─────────────────────────────────────────────────────────────────────────

  'wandering-fighter': {
    id: 'wandering-fighter',
    name: 'Wandering Fighter',
    chinese: '游侠',
    faction: 'lone-wolf',
    tier: 'uncommon',
    chiAspect: 'flow',
    stats: { str: 12, dex: 14, end: 10, wis: 12 },
    speed: 124,
    defense: 5,
    techniques: ['swift-palm', 'flowing-counter', 'chi-burst', 'second-wind'],
    aiPattern: {
      name: 'MASTER_ADAPTIVE',
      behavior: 'tactical',
      rules: [
        { condition: 'hp < 30% && !healed', action: 'use:second-wind', priority: 3 },
        { condition: 'chi > 20', action: 'use:chi-burst', priority: 2 },
        { condition: 'player.usedHeavyTechnique', action: 'use:flowing-counter', priority: 1 },
        { condition: 'default', action: 'use:swift-palm', priority: 0 },
      ],
    },
    drops: [
      { itemId: 'spirit-tea', chance: 0.4, quantity: 1 },
      { itemId: 'meditation-incense', chance: 0.3, quantity: 1 },
      { itemId: 'coins', chance: 0.5, quantity: 35 },
      { itemId: 'technique-scroll', chance: 0.15, quantity: 1 },
    ],
    dialogue: {
      intro: ["Another seeker of strength? Show me what you've learned."],
      lowHp: ['Good... very good. You have potential.'],
      victory: ["Don't give up. Pain is the teacher."],
      defeat: ['Impressive. The beggars have found a gem.'],
    },
  },

  'silent-master': {
    id: 'silent-master',
    name: 'Silent Master',
    chinese: '默师',
    faction: 'lone-wolf',
    tier: 'rare',
    chiAspect: 'sense',
    stats: { str: 16, dex: 16, end: 14, wis: 14 },
    speed: 128,
    defense: 7,
    techniques: ['shadowless-palm', 'void-step', 'killing-intent', 'perfect-strike', 'meditate'],
    aiPattern: {
      name: 'MASTER_PREDATOR',
      behavior: 'predator',
      rules: [
        { condition: 'turn === 1', action: 'use:void-step', priority: 4 },
        { condition: 'hp < 50% && !meditated', action: 'use:meditate', priority: 3 },
        { condition: 'hp < 25%', action: 'use:perfect-strike', priority: 2 },
        { condition: 'chi > 25 && player.hp < 40%', action: 'use:killing-intent', priority: 1 },
        { condition: 'default', action: 'use:shadowless-palm', priority: 0 },
      ],
    },
    drops: [
      { itemId: 'elders-brew', chance: 0.3, quantity: 1 },
      { itemId: 'mastery-pill', chance: 0.25, quantity: 1 },
      { itemId: 'coins', chance: 0.7, quantity: 100 },
      { itemId: 'rare-technique-scroll', chance: 0.2, quantity: 1 },
    ],
    dialogue: {
      intro: ['...'],
      lowHp: ["...You've trained well."],
      victory: ['...'],
      defeat: ["...Find me again. When you're stronger."],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // BOSSES
  // ─────────────────────────────────────────────────────────────────────────

  'razor': {
    id: 'razor',
    name: 'Razor',
    chinese: '剃刀',
    faction: 'thugs',
    tier: 'boss',
    chiAspect: 'burst',
    stats: { str: 14, dex: 12, end: 12, wis: 8 },
    speed: 120,
    defense: 6,
    techniques: [
      'razor-slash',
      'street-kings-authority',
      'brutal-combo',
      'desperate-fury',
      'last-resort',
    ],
    aiPattern: {
      name: 'BOSS_RAZOR',
      behavior: 'aggressive',
      rules: [
        { condition: 'turn === 1', action: 'use:street-kings-authority', priority: 4 },
        { condition: 'hp < 20%', action: 'use:last-resort', priority: 3 },
        { condition: 'hp < 50% && turn % 4 === 0', action: 'use:desperate-fury', priority: 2 },
        { condition: 'turn % 4 === 0', action: 'use:brutal-combo', priority: 1 },
        { condition: 'default', action: 'use:razor-slash', priority: 0 },
      ],
    },
    drops: [
      { itemId: 'coins', chance: 1.0, quantity: 200 },
      { itemId: 'razors-bandana', chance: 1.0, quantity: 1 },
      { itemId: 'technique-scroll-rising-dragon', chance: 0.5, quantity: 1 },
    ],
    dialogue: {
      intro: ['A beggar? In MY territory? Boys, teach this fool a lesson— wait, where are my boys?!'],
      lowHp: ['How... how did a beggar...'],
      victory: ["Hah! Should've stayed in your gutter!"],
      defeat: ['How... how did a beggar... No! This isn\'t over!'],
      phase: {
        2: ['You think you can beat ME? I RUN these streets!'],
      },
    },
    phase: 1,
    maxPhase: 2,
    phaseThresholds: [50],
  },

  'commander-vex': {
    id: 'commander-vex',
    name: 'Commander Vex',
    chinese: '维克斯指挥官',
    faction: 'spartans',
    tier: 'boss',
    chiAspect: 'precision',
    stats: { str: 18, dex: 16, end: 16, wis: 12 },
    speed: 128,
    defense: 8,
    techniques: [
      'commanders-strike',
      'analyze-opponent',
      'shield-formation',
      'disciplined-assault',
      'rally-cry',
      'final-command',
      'spartans-pride',
    ],
    aiPattern: {
      name: 'BOSS_VEX',
      behavior: 'tactical',
      rules: [
        { condition: 'turn === 1', action: 'use:analyze-opponent', priority: 5 },
        { condition: 'hp < 30% && !prideBuff', action: 'use:spartans-pride', priority: 4 },
        { condition: 'hp < 15%', action: 'use:final-command', priority: 3 },
        { condition: 'turn % 3 === 0 && hp < 60%', action: 'use:disciplined-assault', priority: 2 },
        { condition: 'hp < 80% && !shielded', action: 'use:shield-formation', priority: 1 },
        { condition: 'default', action: 'use:commanders-strike', priority: 0 },
      ],
    },
    drops: [
      { itemId: 'coins', chance: 1.0, quantity: 400 },
      { itemId: 'spartan-insignia', chance: 1.0, quantity: 1 },
      { itemId: 'technique-scroll-iron-palm', chance: 1.0, quantity: 1 },
      { itemId: 'swift-elixir', chance: 1.0, quantity: 2 },
    ],
    dialogue: {
      intro: ["So you're the beggar causing trouble. I expected... more."],
      lowHp: ["You've earned my respect, beggar. But I cannot lose!"],
      victory: ["Surrender now and I'll make your detainment... comfortable."],
      defeat: ["Impossible... defeated by a... No. You're no ordinary beggar. Who ARE you?"],
      phase: {
        2: ['Fascinating. Your style is unorthodox. Let me show you true discipline.'],
        3: ["You've earned my respect, beggar. But I cannot lose!"],
      },
    },
    phase: 1,
    maxPhase: 3,
    phaseThresholds: [60, 30],
  },

  'the-hollow-one': {
    id: 'the-hollow-one',
    name: 'The Hollow One',
    chinese: '空一',
    faction: 'lone-wolf',
    tier: 'boss',
    chiAspect: 'inverse',
    stats: { str: 22, dex: 20, end: 18, wis: 18 },
    speed: 136,
    defense: 9,
    techniques: [
      'empty-palm',
      'mirror-stance',
      'hollow-guard',
      'formless-strike',
      'chi-disruption',
      'perfect-form',
      'hollow-resonance',
      'enlightenment',
    ],
    aiPattern: {
      name: 'BOSS_HOLLOW_ONE',
      behavior: 'predator',
      rules: [
        { condition: 'hp < 25% && !enlightened', action: 'use:enlightenment', priority: 6 },
        { condition: 'hp < 15%', action: 'use:hollow-resonance', priority: 5 },
        { condition: 'turn % 5 === 0 && hp < 40%', action: 'use:perfect-form', priority: 4 },
        { condition: 'player.chi > 30', action: 'use:chi-disruption', priority: 3 },
        { condition: 'turn % 4 === 0 && hp < 70%', action: 'use:formless-strike', priority: 2 },
        { condition: 'player.usedTechnique', action: 'use:mirror-stance', priority: 1 },
        { condition: 'default', action: 'use:empty-palm', priority: 0 },
      ],
    },
    drops: [
      { itemId: 'coins', chance: 1.0, quantity: 800 },
      { itemId: 'hollow-ones-robe', chance: 1.0, quantity: 1 },
      { itemId: 'technique-scroll-elders-teaching', chance: 1.0, quantity: 1 },
      { itemId: 'mastery-pill', chance: 1.0, quantity: 2 },
    ],
    dialogue: {
      intro: ['又一个寻道者。告诉我，乞丐...你为何而战？'],
      lowHp: ['不要让我失望。战！'],
      victory: ['你还不够...再来。'],
      defeat: ['终于...有人理解了。打狗棒...藏在山里。找到它...再来找我。我会等着。'],
      phase: {
        2: ['你太依赖长老的教诲。给我看你自己的功夫。'],
        3: ['好...好！这就是我要找的！终于有一个值得的对手！'],
      },
    },
    phase: 1,
    maxPhase: 3,
    phaseThresholds: [70, 40],
  },
};

// =============================================================================
// ENEMY CREATION
// =============================================================================

/**
 * Create an enemy from a template ID
 */
// Counter for unique enemy IDs
let enemyIdCounter = 0;

export function createEnemy(templateId: string): Enemy {
  const template = ENEMY_TEMPLATES[templateId];

  if (!template) {
    throw new Error(`Unknown enemy template: ${templateId}`);
  }

  const hp = calculateMaxHp(template.stats.end);
  const chi = calculateMaxChi(template.stats.wis);

  // Generate unique ID using counter + timestamp + random
  const uniqueId = `${template.id}-${Date.now()}-${++enemyIdCounter}`;

  return {
    // Character base
    id: uniqueId,
    templateId: template.id,
    name: template.name,
    hp,
    maxHp: hp,
    chi,
    maxChi: chi,
    inverseChi: 0,
    maxInverseChi: template.chiAspect === 'inverse' ? 100 : 0,
    stats: { ...template.stats },
    stance: 'flowing' as Stance,
    techniques: [...template.techniques],
    masteryLevels: {},
    statusEffects: [],
    isPlayer: false,

    // Enemy specific
    faction: template.faction,
    tier: template.tier,
    chiAspect: template.chiAspect,
    aiPattern: { ...template.aiPattern },
    drops: [...template.drops],
    dialogue: { ...template.dialogue },

    // Boss specific
    phase: template.phase,
    maxPhase: template.maxPhase,
    phaseThresholds: template.phaseThresholds ? [...template.phaseThresholds] : undefined,
  };
}

/**
 * Create a boss enemy with phase tracking
 */
export function createBoss(bossId: string): Enemy {
  const validBosses = ['razor', 'commander-vex', 'the-hollow-one'];
  if (!validBosses.includes(bossId)) {
    throw new Error(`Unknown boss: ${bossId}. Valid bosses: ${validBosses.join(', ')}`);
  }

  return createEnemy(bossId);
}

/**
 * Get list of all available enemy template IDs
 */
export function getEnemyTemplateIds(): string[] {
  return Object.keys(ENEMY_TEMPLATES);
}

/**
 * Get enemies by faction
 */
export function getEnemiesByFaction(faction: EnemyFaction): string[] {
  return Object.entries(ENEMY_TEMPLATES)
    .filter(([, template]) => template.faction === faction)
    .map(([id]) => id);
}

/**
 * Get enemies by tier
 */
export function getEnemiesByTier(tier: EnemyTier): string[] {
  return Object.entries(ENEMY_TEMPLATES)
    .filter(([, template]) => template.tier === tier)
    .map(([id]) => id);
}

/**
 * Get random enemy from tier (for encounters)
 */
export function getRandomEnemyByTier(tier: EnemyTier): Enemy {
  const templateIds = getEnemiesByTier(tier);
  if (templateIds.length === 0) {
    throw new Error(`No enemies found for tier: ${tier}`);
  }

  const randomIndex = Math.floor(Math.random() * templateIds.length);
  const templateId = templateIds[randomIndex];
  if (!templateId) {
    throw new Error(`Invalid template index for tier: ${tier}`);
  }
  return createEnemy(templateId);
}

// =============================================================================
// STAT SCALING (for difficulty)
// =============================================================================

interface ScalingConfig {
  hpMultiplier: number;
  damageMultiplier: number;
}

const CHAPTER_SCALING: Record<number, ScalingConfig> = {
  1: { hpMultiplier: 1.0, damageMultiplier: 1.0 },
  2: { hpMultiplier: 1.3, damageMultiplier: 1.15 },
  3: { hpMultiplier: 1.6, damageMultiplier: 1.3 },
};

/**
 * Apply chapter-based scaling to an enemy
 */
export function scaleEnemyForChapter(enemy: Enemy, chapter: number): void {
  const scaling = CHAPTER_SCALING[chapter] ?? CHAPTER_SCALING[1] ?? { hpMultiplier: 1.0, damageMultiplier: 1.0 };

  enemy.maxHp = Math.floor(enemy.maxHp * scaling.hpMultiplier);
  enemy.hp = enemy.maxHp;

  // Note: damageMultiplier is applied during combat calculations
  // Store it on the enemy for reference
  (enemy as Enemy & { damageScale?: number }).damageScale = scaling.damageMultiplier;
}
