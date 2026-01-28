/**
 * Story System Types
 * Defines scenes, dialogue, choices, and narrative flow
 */

import type { LocationId } from './navigation';

// =============================================================================
// CONTENT TYPES
// =============================================================================

/**
 * A single line of content in a scene
 */
export type ContentLine =
  | { type: 'narration'; text: string }
  | { type: 'internal'; text: string }  // Li Wei's internal monologue
  | { type: 'dialogue'; speaker: string; text: string; emotion?: string }
  | { type: 'system'; text: string }  // Tutorial/game messages
  | { type: 'instruction'; text: string; key?: string }  // Press [SPACE] to continue
  | { type: 'pause'; duration: number }  // Beat/pause in ms
  | { type: 'divider'; label?: string }  // Visual separator (e.g., "DAY ONE")
  | { type: 'effect'; effect: SceneEffect };

/**
 * Visual/audio effects that can be triggered
 */
export type SceneEffect =
  | { type: 'fade'; direction: 'in' | 'out'; color?: string }
  | { type: 'flash'; color?: string; duration?: number }
  | { type: 'shake' }
  | { type: 'pendant-glow'; intensity: 'faint' | 'bright' | 'intense' }
  | { type: 'sound'; sound: string };

// =============================================================================
// CHOICE SYSTEM
// =============================================================================

/**
 * A choice the player can make
 */
export interface Choice {
  id: string;
  label: string;
  /** Optional tag shown in parentheses, e.g., "(Suspicious)" */
  tag?: string;
  /** Content to show after this choice is selected */
  response?: ContentLine[];
  /** Scene to jump to after this choice (if branching) */
  nextScene?: string;
  /** Effects on game state */
  effects?: ChoiceEffect[];
  /** Condition for this choice to be available */
  condition?: ChoiceCondition;
}

export type ChoiceEffect =
  | { type: 'relationship'; character: string; delta: number }
  | { type: 'flag'; flag: string; value: boolean | string | number }
  | { type: 'path'; path: 'blade' | 'stream' | 'shadow'; delta: number }
  | { type: 'item'; action: 'add' | 'remove'; itemId: string }
  | { type: 'stat'; stat: string; delta: number };

export type ChoiceCondition =
  | { type: 'flag'; flag: string; value: boolean | string | number }
  | { type: 'relationship'; character: string; min?: number; max?: number }
  | { type: 'path'; path: 'blade' | 'stream' | 'shadow'; min?: number }
  | { type: 'item'; itemId: string; has: boolean };

// =============================================================================
// SCENE STRUCTURE
// =============================================================================

/**
 * A scene in the story
 */
export interface Scene {
  id: string;
  /** Display title (e.g., "The Void") */
  title: string;
  /** Scene type affects UI behavior */
  type: 'cutscene' | 'interactive' | 'exploration' | 'combat' | 'montage' | 'dialogue';
  /** Location shown in UI */
  location?: string;
  /** Estimated duration for pacing */
  estimatedMinutes?: number;
  /** Content blocks in order */
  content: SceneBlock[];
  /** Default next scene if no branching */
  nextScene?: string;
  /** Enemy IDs if this is a combat scene */
  enemies?: string[];
  /** Callbacks for scene events */
  onEnter?: SceneCallback;
  onExit?: SceneCallback;
}

/**
 * A block of content within a scene
 */
export type SceneBlock =
  | { type: 'content'; lines: ContentLine[] }
  | { type: 'choice'; prompt?: string; choices: Choice[] }
  | { type: 'combat'; enemies: string[]; canLose?: boolean; loseScene?: string }
  | { type: 'exploration'; areas: ExplorationArea[] }
  | { type: 'montage'; days: MontageDay[] }
  | { type: 'navigation'; locationId?: LocationId; allowTravel: boolean; returnSceneId?: string };

/**
 * An area that can be explored
 */
export interface ExplorationArea {
  id: string;
  name: string;
  description: string;
  /** Content when player examines this area */
  content: ContentLine[];
  /** Is this area required before proceeding? */
  required?: boolean;
  /** Has this area been visited? (runtime state) */
  visited?: boolean;
}

/**
 * A day in a montage sequence
 */
export interface MontageDay {
  label: string;  // "DAY ONE"
  content: ContentLine[];
  /** Optional auto-combat that resolves without full combat UI */
  autoCombat?: { enemy: string; outcome: 'win' | 'lose' };
}

/**
 * Callback for scene events
 */
export type SceneCallback =
  | { type: 'set-flag'; flag: string; value: boolean | string | number }
  | { type: 'unlock-technique'; techniqueId: string }
  | { type: 'add-item'; itemId: string }
  | { type: 'heal'; percent: number }
  | { type: 'custom'; handler: string };

// =============================================================================
// CHAPTER STRUCTURE
// =============================================================================

/**
 * A chapter containing multiple scenes
 */
export interface Chapter {
  id: string;
  /** Display number (0 for prologue) */
  number: number;
  title: string;
  subtitle?: string;
  /** All scenes in this chapter */
  scenes: Scene[];
  /** First scene ID */
  startScene: string;
  /** Boss fight scene ID (if any) */
  bossScene?: string;
  /** Scenes that end this chapter */
  endScenes: string[];
}

// =============================================================================
// STORY STATE
// =============================================================================

/**
 * Runtime state for story progression
 */
export interface StoryState {
  /** Current chapter ID */
  currentChapter: string;
  /** Current scene ID */
  currentScene: string;
  /** Index within current scene's content */
  contentIndex: number;
  /** Flags set by story choices/events */
  flags: Record<string, boolean | string | number>;
  /** Relationship values with characters */
  relationships: Record<string, number>;
  /** Path alignment percentages (zero-sum, total = 100) */
  pathPercentages: {
    blade: number;    // 0-100%
    stream: number;   // 0-100%
    shadow: number;   // 0-100%
  };
  /** Scenes that have been completed */
  completedScenes: string[];
  /** Choices made (for recap/consequences) */
  choiceHistory: { sceneId: string; choiceId: string }[];
  /** Items discovered */
  discoveredItems: string[];
  /** Lore entries unlocked */
  discoveredLore: string[];
}

/**
 * Create initial story state
 */
export function createStoryState(): StoryState {
  return {
    currentChapter: 'prologue',
    currentScene: 'p1-void',
    contentIndex: 0,
    flags: {},
    relationships: {},
    pathPercentages: {
      blade: 33.33,
      stream: 33.33,
      shadow: 33.34,  // Balanced start (totals 100%)
    },
    completedScenes: [],
    choiceHistory: [],
    discoveredItems: [],
    discoveredLore: [],
  };
}

/**
 * Apply path shift while maintaining zero-sum (total = 100%)
 * @param current - Current path percentages
 * @param path - Path to increase
 * @param amount - Percentage to add (will be subtracted from others)
 * @returns New path percentages
 */
export function applyPathShift(
  current: { blade: number; stream: number; shadow: number },
  path: 'blade' | 'stream' | 'shadow',
  amount: number
): { blade: number; stream: number; shadow: number } {
  const result = { ...current };

  // Increase target path
  result[path] = Math.min(100, result[path] + amount);

  // Calculate how much to subtract from others
  const otherPaths = (['blade', 'stream', 'shadow'] as const).filter(p => p !== path);
  const subtractPerPath = amount / 2;

  // Subtract from other paths proportionally
  otherPaths.forEach(p => {
    result[p] = Math.max(0, result[p] - subtractPerPath);
  });

  // Normalize to ensure exactly 100% (handle rounding)
  const total = result.blade + result.stream + result.shadow;
  if (total !== 100) {
    const correction = 100 - total;
    result[path] += correction;
  }

  // Round to 2 decimal places
  result.blade = Math.round(result.blade * 100) / 100;
  result.stream = Math.round(result.stream * 100) / 100;
  result.shadow = Math.round(result.shadow * 100) / 100;

  return result;
}

/**
 * Get dominant path from percentages
 */
export function getDominantPath(
  percentages: { blade: number; stream: number; shadow: number }
): 'blade' | 'stream' | 'shadow' | 'balanced' {
  const { blade, stream, shadow } = percentages;
  const max = Math.max(blade, stream, shadow);

  // If within 5% of each other, consider balanced
  if (max - Math.min(blade, stream, shadow) < 5) {
    return 'balanced';
  }

  if (blade === max) return 'blade';
  if (stream === max) return 'stream';
  return 'shadow';
}

// =============================================================================
// STORY RESULT
// =============================================================================

/**
 * Result from processing a story action
 */
export interface StoryResult {
  /** What happened */
  action: 'continue' | 'choice' | 'combat' | 'exploration' | 'navigation' | 'chapter-end' | 'game-end';
  /** Updated state */
  state: StoryState;
  /** Content to display (if any) */
  content?: ContentLine[];
  /** Choices to present (if action is 'choice') */
  choices?: Choice[];
  /** Enemy IDs for combat (if action is 'combat') */
  enemies?: string[];
  /** Can the player lose this combat? If false, must retry on defeat */
  canLose?: boolean;
  /** Areas for exploration (if action is 'exploration') */
  areas?: ExplorationArea[];
  /** Next chapter ID (if action is 'chapter-end') */
  nextChapter?: string;
  /** Navigation location (if action is 'navigation') */
  navigationLocationId?: LocationId;
  /** Can player travel to other locations? */
  navigationAllowTravel?: boolean;
  /** Scene to return to after navigation */
  navigationReturnSceneId?: string;
}
