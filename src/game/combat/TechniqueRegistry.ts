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
    masteryBonuses: [
      { level: 2, usesRequired: 10, powerBonus: 1 },
      { level: 3, usesRequired: 25, powerBonus: 2 },
      { level: 4, usesRequired: 50, powerBonus: 3 },
      { level: 5, usesRequired: 100, powerBonus: 4, effectBonus: '+1 chi on hit' },
    ],
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
    masteryBonuses: [
      { level: 2, usesRequired: 10, powerBonus: 2 },
      { level: 3, usesRequired: 25, powerBonus: 3 },
      { level: 4, usesRequired: 50, powerBonus: 4 },
      { level: 5, usesRequired: 100, powerBonus: 6, effectBonus: 'Chi cost -2' },
    ],
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
    masteryBonuses: [
      { level: 2, usesRequired: 10, powerBonus: 2 },
      { level: 3, usesRequired: 25, powerBonus: 4 },
      { level: 4, usesRequired: 50, powerBonus: 5 },
      { level: 5, usesRequired: 100, powerBonus: 7, effectBonus: '3rd hit possible' },
    ],
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
    isHeavy: true,
    aspect: 'force',
    effects: [],
    comboRole: 'finisher',
    comboLinks: [],
    description: 'A powerful finisher that ends combos. Refunds chi on combo completion.',
    masteryBonuses: [
      { level: 2, usesRequired: 10, powerBonus: 3 },
      { level: 3, usesRequired: 25, powerBonus: 5 },
      { level: 4, usesRequired: 50, powerBonus: 7 },
      { level: 5, usesRequired: 100, powerBonus: 10, effectBonus: 'Chi refund +50%' },
    ],
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
    masteryBonuses: [
      { level: 2, usesRequired: 10, powerBonus: 0, effectBonus: 'Defense +5%' },
      { level: 3, usesRequired: 25, powerBonus: 0, effectBonus: 'Defense +10%, +1 turn' },
      { level: 4, usesRequired: 50, powerBonus: 0, effectBonus: 'Defense +15%, +1 turn' },
      { level: 5, usesRequired: 100, powerBonus: 0, effectBonus: 'Defense +20%, +1 turn, chi -2' },
    ],
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
    masteryBonuses: [
      { level: 2, usesRequired: 10, powerBonus: 2, effectBonus: 'Heal +5%' },
      { level: 3, usesRequired: 25, powerBonus: 4, effectBonus: 'Heal +10%' },
      { level: 4, usesRequired: 50, powerBonus: 5, effectBonus: 'Heal +15%' },
      { level: 5, usesRequired: 100, powerBonus: 7, effectBonus: 'Heal always triggers' },
    ],
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
    masteryBonuses: [
      { level: 2, usesRequired: 10, powerBonus: 3, effectBonus: 'HP cost -2%' },
      { level: 3, usesRequired: 25, powerBonus: 6, effectBonus: 'HP cost -4%' },
      { level: 4, usesRequired: 50, powerBonus: 8, effectBonus: 'HP cost -6%' },
      { level: 5, usesRequired: 100, powerBonus: 12, effectBonus: 'No HP cost' },
    ],
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
    masteryBonuses: [
      { level: 2, usesRequired: 10, powerBonus: 1, effectBonus: 'Counter damage +20%' },
      { level: 3, usesRequired: 25, powerBonus: 2, effectBonus: 'Counter damage +40%' },
      { level: 4, usesRequired: 50, powerBonus: 3, effectBonus: 'Counter damage +60%' },
      { level: 5, usesRequired: 100, powerBonus: 5, effectBonus: 'Perfect counter (stun)' },
    ],
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
    isHeavy: true,
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

  // Block (used by alley-brawler)
  'block': {
    id: 'block',
    name: 'Block',
    chinese: '挡',
    stance: 'any',
    power: 0,
    chiCost: 0,
    speed: 2,
    aspect: 'armor',
    effects: [
      {
        type: 'buff',
        value: 25,
        target: 'self',
        duration: 1,
        description: '+25% defense for 1 turn',
      },
    ],
    comboRole: 'any',
    comboLinks: [],
    description: 'A basic defensive block.',
    masteryBonuses: [],
    unlockedByDefault: false,
  },

  // ---------------------------------------------------------------------------
  // GANG LIEUTENANT TECHNIQUES
  // ---------------------------------------------------------------------------

  'iron-fist': {
    id: 'iron-fist',
    name: 'Iron Fist',
    chinese: '铁拳',
    stance: 'any',
    power: 18,
    chiCost: 6,
    speed: 0,
    aspect: 'force',
    effects: [],
    comboRole: 'starter',
    comboLinks: [{ techniqueId: 'takedown' }],
    description: 'A powerful punch hardened by street fighting.',
    masteryBonuses: [],
    unlockedByDefault: false,
  },

  'gang-tactics': {
    id: 'gang-tactics',
    name: 'Gang Tactics',
    chinese: '帮战术',
    stance: 'any',
    power: 0,
    chiCost: 8,
    speed: 2,
    aspect: 'will',
    effects: [
      {
        type: 'buff',
        value: 20,
        target: 'self',
        duration: 3,
        description: '+20% attack for 3 turns',
      },
    ],
    comboRole: 'any',
    comboLinks: [],
    description: 'Call upon street fighting experience.',
    masteryBonuses: [],
    unlockedByDefault: false,
  },

  'takedown': {
    id: 'takedown',
    name: 'Takedown',
    chinese: '摔倒',
    stance: 'any',
    power: 20,
    chiCost: 10,
    speed: -1,
    aspect: 'force',
    effects: [
      {
        type: 'stun',
        value: 1,
        target: 'enemy',
        description: '30% chance to stun',
      },
    ],
    comboRole: 'finisher',
    comboLinks: [],
    description: 'Throw the opponent to the ground.',
    masteryBonuses: [],
    unlockedByDefault: false,
  },

  'last-stand': {
    id: 'last-stand',
    name: 'Last Stand',
    chinese: '最后一战',
    stance: 'any',
    power: 28,
    chiCost: 15,
    speed: 0,
    aspect: 'burst',
    effects: [
      {
        type: 'damage',
        value: 15,
        target: 'self',
        description: 'Costs 15% HP',
      },
    ],
    comboRole: 'finisher',
    comboLinks: [],
    description: 'A desperate all-out attack.',
    masteryBonuses: [],
    unlockedByDefault: false,
  },

  // ---------------------------------------------------------------------------
  // SPARTAN RECRUIT TECHNIQUES
  // ---------------------------------------------------------------------------

  'precision-strike': {
    id: 'precision-strike',
    name: 'Precision Strike',
    chinese: '精准打击',
    stance: 'any',
    power: 14,
    chiCost: 4,
    speed: 1,
    aspect: 'precision',
    effects: [],
    comboRole: 'starter',
    comboLinks: [{ techniqueId: 'disciplined-thrust' }],
    description: 'A precise, measured strike.',
    masteryBonuses: [],
    unlockedByDefault: false,
  },

  'formation-guard': {
    id: 'formation-guard',
    name: 'Formation Guard',
    chinese: '阵型守卫',
    stance: 'any',
    power: 0,
    chiCost: 5,
    speed: 2,
    aspect: 'armor',
    effects: [
      {
        type: 'buff',
        value: 35,
        target: 'self',
        duration: 2,
        description: '+35% defense for 2 turns',
      },
    ],
    comboRole: 'any',
    comboLinks: [],
    description: 'Take a disciplined defensive stance.',
    masteryBonuses: [],
    unlockedByDefault: false,
  },

  'disciplined-thrust': {
    id: 'disciplined-thrust',
    name: 'Disciplined Thrust',
    chinese: '纪律突刺',
    stance: 'any',
    power: 18,
    chiCost: 6,
    speed: 0,
    aspect: 'precision',
    effects: [],
    comboRole: 'followup',
    comboLinks: [],
    description: 'A controlled forward thrust.',
    masteryBonuses: [],
    unlockedByDefault: false,
  },

  // ---------------------------------------------------------------------------
  // SPARTAN WARRIOR TECHNIQUES
  // ---------------------------------------------------------------------------

  'lance-strike': {
    id: 'lance-strike',
    name: 'Lance Strike',
    chinese: '矛击',
    stance: 'any',
    power: 20,
    chiCost: 8,
    speed: 0,
    aspect: 'precision',
    effects: [],
    comboRole: 'starter',
    comboLinks: [{ techniqueId: 'execute' }],
    description: 'A powerful lance thrust.',
    masteryBonuses: [],
    unlockedByDefault: false,
  },

  'shield-bash': {
    id: 'shield-bash',
    name: 'Shield Bash',
    chinese: '盾击',
    stance: 'any',
    power: 12,
    chiCost: 6,
    speed: 1,
    aspect: 'armor',
    effects: [
      {
        type: 'stun',
        value: 1,
        target: 'enemy',
        description: '40% chance to stun',
      },
    ],
    comboRole: 'any',
    comboLinks: [],
    description: 'Bash the enemy with a shield, potentially stunning.',
    masteryBonuses: [],
    unlockedByDefault: false,
  },

  'phalanx-stance': {
    id: 'phalanx-stance',
    name: 'Phalanx Stance',
    chinese: '方阵姿态',
    stance: 'any',
    power: 0,
    chiCost: 10,
    speed: 2,
    aspect: 'armor',
    effects: [
      {
        type: 'buff',
        value: 50,
        target: 'self',
        duration: 3,
        description: '+50% defense for 3 turns',
      },
    ],
    comboRole: 'any',
    comboLinks: [],
    description: 'Assume an impenetrable defensive formation.',
    masteryBonuses: [],
    unlockedByDefault: false,
  },

  'execute': {
    id: 'execute',
    name: 'Execute',
    chinese: '处决',
    stance: 'any',
    power: 35,
    chiCost: 15,
    speed: -2,
    isHeavy: true,
    aspect: 'precision',
    effects: [],
    comboRole: 'finisher',
    comboLinks: [],
    description: 'A devastating finishing blow against stunned targets.',
    masteryBonuses: [],
    unlockedByDefault: false,
  },

  // ---------------------------------------------------------------------------
  // WANDERING FIGHTER TECHNIQUES
  // ---------------------------------------------------------------------------

  'swift-palm': {
    id: 'swift-palm',
    name: 'Swift Palm',
    chinese: '快掌',
    stance: 'any',
    power: 14,
    chiCost: 4,
    speed: 2,
    aspect: 'flow',
    effects: [],
    comboRole: 'starter',
    comboLinks: [{ techniqueId: 'flowing-counter' }],
    description: 'A quick palm strike.',
    masteryBonuses: [],
    unlockedByDefault: false,
  },

  'flowing-counter': {
    id: 'flowing-counter',
    name: 'Flowing Counter',
    chinese: '流动反击',
    stance: 'any',
    power: 18,
    chiCost: 8,
    speed: 2,
    aspect: 'flow',
    effects: [
      {
        type: 'counter-setup',
        value: 1,
        target: 'self',
        duration: 1,
        description: 'Counter next attack',
      },
    ],
    comboRole: 'followup',
    comboLinks: [],
    description: 'Prepare to counter the next attack with flowing motion.',
    masteryBonuses: [],
    unlockedByDefault: false,
  },

  'chi-burst': {
    id: 'chi-burst',
    name: 'Chi Burst',
    chinese: '气爆',
    stance: 'any',
    power: 25,
    chiCost: 15,
    speed: 0,
    aspect: 'burst',
    effects: [],
    comboRole: 'finisher',
    comboLinks: [],
    description: 'Release accumulated chi in a powerful burst.',
    masteryBonuses: [],
    unlockedByDefault: false,
  },

  'second-wind': {
    id: 'second-wind',
    name: 'Second Wind',
    chinese: '二次呼吸',
    stance: 'any',
    power: 0,
    chiCost: 12,
    speed: 1,
    aspect: 'flow',
    effects: [
      {
        type: 'heal',
        value: 25,
        target: 'self',
        description: 'Heal 25% HP',
      },
    ],
    comboRole: 'any',
    comboLinks: [],
    description: 'Catch your breath and recover.',
    masteryBonuses: [],
    unlockedByDefault: false,
  },

  // ---------------------------------------------------------------------------
  // SILENT MASTER TECHNIQUES
  // ---------------------------------------------------------------------------

  'shadowless-palm': {
    id: 'shadowless-palm',
    name: 'Shadowless Palm',
    chinese: '无影掌',
    stance: 'any',
    power: 20,
    chiCost: 8,
    speed: 2,
    aspect: 'sense',
    effects: [],
    comboRole: 'starter',
    comboLinks: [{ techniqueId: 'void-step' }],
    description: 'A palm strike so fast it casts no shadow.',
    masteryBonuses: [],
    unlockedByDefault: false,
  },

  'void-step': {
    id: 'void-step',
    name: 'Void Step',
    chinese: '虚步',
    stance: 'any',
    power: 0,
    chiCost: 10,
    speed: 3,
    aspect: 'sense',
    effects: [
      {
        type: 'buff',
        value: 30,
        target: 'self',
        duration: 2,
        description: '+30% evasion for 2 turns',
      },
    ],
    comboRole: 'any',
    comboLinks: [],
    description: 'Step into the void, becoming harder to hit.',
    masteryBonuses: [],
    unlockedByDefault: false,
  },

  'killing-intent': {
    id: 'killing-intent',
    name: 'Killing Intent',
    chinese: '杀意',
    stance: 'any',
    power: 30,
    chiCost: 20,
    speed: 0,
    aspect: 'will',
    effects: [
      {
        type: 'debuff',
        value: -20,
        target: 'enemy',
        duration: 2,
        description: '-20% defense for 2 turns',
      },
    ],
    comboRole: 'any',
    comboLinks: [],
    description: 'Project murderous intent that weakens the enemy.',
    masteryBonuses: [],
    unlockedByDefault: false,
  },

  'perfect-strike': {
    id: 'perfect-strike',
    name: 'Perfect Strike',
    chinese: '完美一击',
    stance: 'any',
    power: 40,
    chiCost: 25,
    speed: -1,
    isHeavy: true,
    aspect: 'precision',
    effects: [],
    comboRole: 'finisher',
    comboLinks: [],
    description: 'A flawless strike that cannot miss.',
    masteryBonuses: [],
    unlockedByDefault: false,
  },

  'meditate': {
    id: 'meditate',
    name: 'Meditate',
    chinese: '冥想',
    stance: 'any',
    power: 0,
    chiCost: 0,
    speed: 1,
    aspect: 'sense',
    effects: [
      {
        type: 'heal',
        value: 15,
        target: 'self',
        description: 'Heal 15% HP',
      },
      {
        type: 'chi-restore',
        value: 20,
        target: 'self',
        description: 'Restore 20 chi',
      },
    ],
    comboRole: 'any',
    comboLinks: [],
    description: 'Meditate to recover health and chi.',
    masteryBonuses: [],
    unlockedByDefault: false,
  },

  // ---------------------------------------------------------------------------
  // BOSS: RAZOR TECHNIQUES
  // ---------------------------------------------------------------------------

  'razor-slash': {
    id: 'razor-slash',
    name: 'Razor Slash',
    chinese: '剃刀斩',
    stance: 'any',
    power: 18,
    chiCost: 5,
    speed: 1,
    aspect: 'burst',
    effects: [],
    comboRole: 'starter',
    comboLinks: [{ techniqueId: 'brutal-combo' }],
    description: "Razor's signature quick slash.",
    masteryBonuses: [],
    unlockedByDefault: false,
  },

  'street-kings-authority': {
    id: 'street-kings-authority',
    name: "Street King's Authority",
    chinese: '街王权威',
    stance: 'any',
    power: 0,
    chiCost: 10,
    speed: 2,
    aspect: 'will',
    effects: [
      {
        type: 'buff',
        value: 25,
        target: 'self',
        duration: 4,
        description: '+25% attack for 4 turns',
      },
      {
        type: 'debuff',
        value: -15,
        target: 'enemy',
        duration: 3,
        description: '-15% defense for 3 turns',
      },
    ],
    comboRole: 'any',
    comboLinks: [],
    description: 'Assert dominance as the king of the streets.',
    masteryBonuses: [],
    unlockedByDefault: false,
  },

  'brutal-combo': {
    id: 'brutal-combo',
    name: 'Brutal Combo',
    chinese: '残暴连击',
    stance: 'any',
    power: 14,
    chiCost: 12,
    speed: 0,
    aspect: 'burst',
    effects: [
      {
        type: 'multi-hit',
        value: 3,
        target: 'enemy',
        description: 'Strikes 3 times',
      },
    ],
    comboRole: 'followup',
    comboLinks: [{ techniqueId: 'desperate-fury' }],
    description: 'A brutal flurry of punches.',
    masteryBonuses: [],
    unlockedByDefault: false,
  },

  'desperate-fury': {
    id: 'desperate-fury',
    name: 'Desperate Fury',
    chinese: '绝望狂怒',
    stance: 'any',
    power: 28,
    chiCost: 15,
    speed: 0,
    aspect: 'burst',
    effects: [
      {
        type: 'damage',
        value: 10,
        target: 'self',
        description: 'Costs 10% HP',
      },
    ],
    comboRole: 'finisher',
    comboLinks: [],
    description: 'A desperate rage-fueled attack.',
    masteryBonuses: [],
    unlockedByDefault: false,
  },

  'last-resort': {
    id: 'last-resort',
    name: 'Last Resort',
    chinese: '最后手段',
    stance: 'any',
    power: 35,
    chiCost: 20,
    speed: -1,
    aspect: 'burst',
    effects: [
      {
        type: 'damage',
        value: 20,
        target: 'self',
        description: 'Costs 20% HP',
      },
    ],
    comboRole: 'finisher',
    comboLinks: [],
    description: "Razor's ultimate desperate attack.",
    masteryBonuses: [],
    unlockedByDefault: false,
  },

  // ---------------------------------------------------------------------------
  // BOSS: COMMANDER VEX TECHNIQUES
  // ---------------------------------------------------------------------------

  'commanders-strike': {
    id: 'commanders-strike',
    name: "Commander's Strike",
    chinese: '指挥官打击',
    stance: 'any',
    power: 22,
    chiCost: 8,
    speed: 0,
    aspect: 'precision',
    effects: [],
    comboRole: 'starter',
    comboLinks: [{ techniqueId: 'disciplined-assault' }],
    description: 'A precise strike from military training.',
    masteryBonuses: [],
    unlockedByDefault: false,
  },

  'analyze-opponent': {
    id: 'analyze-opponent',
    name: 'Analyze Opponent',
    chinese: '分析对手',
    stance: 'any',
    power: 0,
    chiCost: 5,
    speed: 2,
    aspect: 'sense',
    effects: [
      {
        type: 'buff',
        value: 20,
        target: 'self',
        duration: 5,
        description: '+20% critical chance for 5 turns',
      },
    ],
    comboRole: 'any',
    comboLinks: [],
    description: 'Study the opponent for weaknesses.',
    masteryBonuses: [],
    unlockedByDefault: false,
  },

  'shield-formation': {
    id: 'shield-formation',
    name: 'Shield Formation',
    chinese: '盾阵',
    stance: 'any',
    power: 0,
    chiCost: 12,
    speed: 1,
    aspect: 'armor',
    effects: [
      {
        type: 'buff',
        value: 40,
        target: 'self',
        duration: 3,
        description: '+40% defense for 3 turns (shield)',
      },
    ],
    comboRole: 'any',
    comboLinks: [],
    description: 'Assume a defensive shield formation.',
    masteryBonuses: [],
    unlockedByDefault: false,
  },

  'disciplined-assault': {
    id: 'disciplined-assault',
    name: 'Disciplined Assault',
    chinese: '纪律攻击',
    stance: 'any',
    power: 26,
    chiCost: 14,
    speed: 0,
    aspect: 'precision',
    effects: [],
    comboRole: 'followup',
    comboLinks: [],
    description: 'A controlled but powerful assault.',
    masteryBonuses: [],
    unlockedByDefault: false,
  },

  'rally-cry': {
    id: 'rally-cry',
    name: 'Rally Cry',
    chinese: '集结号',
    stance: 'any',
    power: 0,
    chiCost: 15,
    speed: 1,
    aspect: 'will',
    effects: [
      {
        type: 'buff',
        value: 30,
        target: 'self',
        duration: 3,
        description: '+30% attack for 3 turns',
      },
      {
        type: 'heal',
        value: 10,
        target: 'self',
        description: 'Heal 10% HP',
      },
    ],
    comboRole: 'any',
    comboLinks: [],
    description: 'Rally your fighting spirit.',
    masteryBonuses: [],
    unlockedByDefault: false,
  },

  'final-command': {
    id: 'final-command',
    name: 'Final Command',
    chinese: '最终命令',
    stance: 'any',
    power: 40,
    chiCost: 25,
    speed: -1,
    aspect: 'precision',
    effects: [
      {
        type: 'armor-break',
        value: 30,
        target: 'enemy',
        duration: 2,
        description: '-30% defense for 2 turns',
      },
    ],
    comboRole: 'finisher',
    comboLinks: [],
    description: "Vex's ultimate tactical strike.",
    masteryBonuses: [],
    unlockedByDefault: false,
  },

  'spartans-pride': {
    id: 'spartans-pride',
    name: "Spartan's Pride",
    chinese: '斯巴达之傲',
    stance: 'any',
    power: 0,
    chiCost: 18,
    speed: 1,
    aspect: 'will',
    effects: [
      {
        type: 'buff',
        value: 50,
        target: 'self',
        duration: 4,
        description: '+50% attack and defense for 4 turns (pride)',
      },
    ],
    comboRole: 'any',
    comboLinks: [],
    description: 'Channel the pride of the Spartans.',
    masteryBonuses: [],
    unlockedByDefault: false,
  },

  // ---------------------------------------------------------------------------
  // BOSS: THE HOLLOW ONE TECHNIQUES
  // ---------------------------------------------------------------------------

  'empty-palm': {
    id: 'empty-palm',
    name: 'Empty Palm',
    chinese: '空掌',
    stance: 'any',
    power: 24,
    chiCost: 8,
    speed: 1,
    aspect: 'inverse',
    effects: [],
    comboRole: 'starter',
    comboLinks: [{ techniqueId: 'formless-strike' }],
    description: 'A palm strike that embodies emptiness.',
    masteryBonuses: [],
    unlockedByDefault: false,
  },

  'mirror-stance': {
    id: 'mirror-stance',
    name: 'Mirror Stance',
    chinese: '镜姿',
    stance: 'any',
    power: 0,
    chiCost: 12,
    speed: 2,
    aspect: 'sense',
    effects: [
      {
        type: 'counter-setup',
        value: 1,
        target: 'self',
        duration: 2,
        description: 'Counter attacks for 2 turns',
      },
    ],
    comboRole: 'any',
    comboLinks: [],
    description: 'Mirror the opponent, countering their moves.',
    masteryBonuses: [],
    unlockedByDefault: false,
  },

  'hollow-guard': {
    id: 'hollow-guard',
    name: 'Hollow Guard',
    chinese: '空守',
    stance: 'any',
    power: 0,
    chiCost: 10,
    speed: 2,
    aspect: 'inverse',
    effects: [
      {
        type: 'buff',
        value: 45,
        target: 'self',
        duration: 2,
        description: '+45% defense for 2 turns',
      },
    ],
    comboRole: 'any',
    comboLinks: [],
    description: 'Guard with the emptiness within.',
    masteryBonuses: [],
    unlockedByDefault: false,
  },

  'formless-strike': {
    id: 'formless-strike',
    name: 'Formless Strike',
    chinese: '无形击',
    stance: 'any',
    power: 30,
    chiCost: 15,
    speed: 0,
    aspect: 'inverse',
    effects: [],
    comboRole: 'followup',
    comboLinks: [{ techniqueId: 'hollow-resonance' }],
    description: 'A strike without form or pattern.',
    masteryBonuses: [],
    unlockedByDefault: false,
  },

  'chi-disruption': {
    id: 'chi-disruption',
    name: 'Chi Disruption',
    chinese: '气乱',
    stance: 'any',
    power: 18,
    chiCost: 20,
    speed: 1,
    aspect: 'inverse',
    effects: [
      {
        type: 'debuff',
        value: -30,
        target: 'enemy',
        duration: 3,
        description: 'Drains chi and -30% chi regen for 3 turns',
      },
    ],
    comboRole: 'any',
    comboLinks: [],
    description: 'Disrupt the flow of chi in the opponent.',
    masteryBonuses: [],
    unlockedByDefault: false,
  },

  'perfect-form': {
    id: 'perfect-form',
    name: 'Perfect Form',
    chinese: '完美形态',
    stance: 'any',
    power: 0,
    chiCost: 25,
    speed: 1,
    aspect: 'inverse',
    effects: [
      {
        type: 'buff',
        value: 40,
        target: 'self',
        duration: 3,
        description: '+40% all stats for 3 turns',
      },
    ],
    comboRole: 'any',
    comboLinks: [],
    description: 'Achieve temporary perfection.',
    masteryBonuses: [],
    unlockedByDefault: false,
  },

  'hollow-resonance': {
    id: 'hollow-resonance',
    name: 'Hollow Resonance',
    chinese: '空鸣',
    stance: 'any',
    power: 45,
    chiCost: 30,
    speed: -1,
    aspect: 'inverse',
    effects: [
      {
        type: 'multi-hit',
        value: 2,
        target: 'enemy',
        description: 'Strikes twice',
      },
    ],
    comboRole: 'finisher',
    comboLinks: [],
    description: 'The hollow echoes with devastating force.',
    masteryBonuses: [],
    unlockedByDefault: false,
  },

  'enlightenment': {
    id: 'enlightenment',
    name: 'Enlightenment',
    chinese: '开悟',
    stance: 'any',
    power: 0,
    chiCost: 35,
    speed: 0,
    aspect: 'inverse',
    effects: [
      {
        type: 'heal',
        value: 30,
        target: 'self',
        description: 'Heal 30% HP',
      },
      {
        type: 'buff',
        value: 60,
        target: 'self',
        duration: 5,
        description: '+60% all stats for 5 turns (enlightened)',
      },
    ],
    comboRole: 'any',
    comboLinks: [],
    description: 'Achieve enlightenment, transcending limitations.',
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
