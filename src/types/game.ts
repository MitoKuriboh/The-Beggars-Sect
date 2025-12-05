/**
 * Game State Type Definitions
 * Overall game progress, story, and save/load
 */

import type { Character } from './character.js';
import type { Inventory } from './item.js';

// =============================================================================
// STORY PROGRESS
// =============================================================================

export type StoryPath = 'blade' | 'stream' | 'shadow' | null;
export type Ending = 'destroyer' | 'reformer' | 'wanderer' | null;

export interface StoryProgress {
  // Current position
  chapter: number;            // 0 = Prologue, 1-3 = Chapters
  scene: string;              // Current scene ID

  // Player choices
  choices: Record<string, string>;  // choiceId -> selectedOption
  path: StoryPath;            // Chosen path (set after Chapter 1)

  // Ending (set after Chapter 3)
  ending: Ending;

  // Scene completion
  completedScenes: string[];

  // Memory fragments unlocked
  memoriesUnlocked: string[];
}

// =============================================================================
// LOCATION
// =============================================================================

export interface Location {
  id: string;
  name: string;
  chinese?: string;           // Chinese name
  description: string;
  chapter: number;            // First available chapter

  // Connections
  connectedTo: string[];      // Other location IDs

  // Content
  hasShop: boolean;
  hasTraining: boolean;
  hasSavePoint: boolean;

  // NPCs present
  npcs: string[];             // NPC IDs

  // Possible encounters
  encounters: string[];       // Enemy template IDs
  encounterRate: number;      // 0-1 chance per move
}

// =============================================================================
// NPC STATE
// =============================================================================

export interface NPCRelationship {
  npcId: string;
  affinity: number;           // -100 to 100
  dialogueState: string;      // Current dialogue tree node
  questsCompleted: string[];
  flags: Record<string, boolean>;
}

// =============================================================================
// GAME FLAGS
// =============================================================================

// Global flags that track game events
export interface GameFlags {
  // Tutorial
  tutorialCompleted: boolean;
  firstCombatWon: boolean;

  // Story flags
  metElderChen: boolean;
  metElderWu: boolean;
  metElderMei: boolean;
  metOldDao: boolean;

  // Boss defeats
  defeatedRazor: boolean;
  defeatedVex: boolean;
  defeatedHollowOne: boolean;

  // Memory recovery
  firstMemoryRestored: boolean;
  allMemoriesRestored: boolean;

  // Technique discovery
  learnedRisingDragon: boolean;
  learnedEldersTeaching: boolean;

  // Secrets
  foundHiddenScroll: boolean;
  discoveredInverseChi: boolean;

  // Dynamic flags from choices
  [key: string]: boolean;
}

// =============================================================================
// STATISTICS
// =============================================================================

export interface GameStats {
  // Combat
  battlesWon: number;
  battlesLost: number;
  battlesFled: number;
  totalDamageDealt: number;
  totalDamageTaken: number;
  criticalHits: number;

  // Techniques
  techniquesUsed: number;
  combosCompleted: number;
  longestCombo: number;

  // Progression
  techniquesMastered: number; // Level 5 techniques
  enemyTypesDefeated: string[];

  // Time
  playTime: number;           // Seconds
  sessionsPlayed: number;
}

// =============================================================================
// GAME STATE
// =============================================================================

export interface GameState {
  // Meta
  version: string;            // Save format version
  saveSlot: number;
  createdAt: number;          // Timestamp
  updatedAt: number;          // Last save timestamp

  // Player
  player: Character;
  inventory: Inventory;

  // Progression
  storyProgress: StoryProgress;
  currentLocation: string;    // Location ID

  // Unlocks
  discoveredTechniques: string[];
  discoveredCombos: string[];
  discoveredLocations: string[];

  // Relationships
  npcRelationships: NPCRelationship[];

  // Flags
  flags: GameFlags;

  // Statistics
  stats: GameStats;
}

// =============================================================================
// SAVE/LOAD
// =============================================================================

export interface SaveData {
  state: GameState;
  checksum: string;           // For validation
}

// =============================================================================
// DEFAULT VALUES
// =============================================================================

export const DEFAULT_STORY_PROGRESS: StoryProgress = {
  chapter: 0,
  scene: 'prologue-awakening',
  choices: {},
  path: null,
  ending: null,
  completedScenes: [],
  memoriesUnlocked: [],
};

export const DEFAULT_FLAGS: GameFlags = {
  tutorialCompleted: false,
  firstCombatWon: false,
  metElderChen: false,
  metElderWu: false,
  metElderMei: false,
  metOldDao: false,
  defeatedRazor: false,
  defeatedVex: false,
  defeatedHollowOne: false,
  firstMemoryRestored: false,
  allMemoriesRestored: false,
  learnedRisingDragon: false,
  learnedEldersTeaching: false,
  foundHiddenScroll: false,
  discoveredInverseChi: false,
};

export const DEFAULT_STATS: GameStats = {
  battlesWon: 0,
  battlesLost: 0,
  battlesFled: 0,
  totalDamageDealt: 0,
  totalDamageTaken: 0,
  criticalHits: 0,
  techniquesUsed: 0,
  combosCompleted: 0,
  longestCombo: 0,
  techniquesMastered: 0,
  enemyTypesDefeated: [],
  playTime: 0,
  sessionsPlayed: 0,
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Check if player can access a chapter
 */
export function canAccessChapter(
  progress: StoryProgress,
  chapter: number
): boolean {
  return progress.chapter >= chapter - 1;
}

/**
 * Check if player has made a specific choice
 */
export function hasChoice(
  progress: StoryProgress,
  choiceId: string,
  option?: string
): boolean {
  if (option) {
    return progress.choices[choiceId] === option;
  }
  return choiceId in progress.choices;
}

/**
 * Calculate completion percentage
 */
export function getCompletionPercentage(state: GameState): number {
  let total = 0;
  let completed = 0;

  // Story progress (40%)
  total += 40;
  completed += (state.storyProgress.chapter / 3) * 40;

  // Techniques discovered (20%)
  const totalTechniques = 15;
  total += 20;
  completed += (state.discoveredTechniques.length / totalTechniques) * 20;

  // Enemies defeated (20%)
  const totalEnemyTypes = 11;
  total += 20;
  completed += (state.stats.enemyTypesDefeated.length / totalEnemyTypes) * 20;

  // Bosses (20%)
  total += 20;
  if (state.flags.defeatedRazor) completed += 6.67;
  if (state.flags.defeatedVex) completed += 6.67;
  if (state.flags.defeatedHollowOne) completed += 6.66;

  return Math.round((completed / total) * 100);
}

/**
 * Generate save checksum
 */
export function generateChecksum(state: GameState): string {
  // Simple checksum: hash of key values
  const data = [
    state.player.name,
    state.player.hp,
    state.storyProgress.chapter,
    state.storyProgress.scene,
    state.stats.battlesWon,
    state.updatedAt,
  ].join('|');

  // Basic hash (for production, use proper hashing)
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }

  return hash.toString(16);
}
