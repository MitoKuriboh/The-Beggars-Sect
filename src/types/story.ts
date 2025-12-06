/**
 * Story System Types
 * Defines scenes, dialogue, choices, and narrative flow
 */

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
  | { type: 'montage'; days: MontageDay[] };

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
  /** Path alignment scores */
  pathScores: {
    blade: number;
    stream: number;
    shadow: number;
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
    pathScores: {
      blade: 0,
      stream: 0,
      shadow: 0,
    },
    completedScenes: [],
    choiceHistory: [],
    discoveredItems: [],
    discoveredLore: [],
  };
}

// =============================================================================
// STORY RESULT
// =============================================================================

/**
 * Result from processing a story action
 */
export interface StoryResult {
  /** What happened */
  action: 'continue' | 'choice' | 'combat' | 'exploration' | 'chapter-end' | 'game-end';
  /** Updated state */
  state: StoryState;
  /** Content to display (if any) */
  content?: ContentLine[];
  /** Choices to present (if action is 'choice') */
  choices?: Choice[];
  /** Enemy IDs for combat (if action is 'combat') */
  enemies?: string[];
  /** Areas for exploration (if action is 'exploration') */
  areas?: ExplorationArea[];
  /** Next chapter ID (if action is 'chapter-end') */
  nextChapter?: string;
}
