/**
 * Navigation System Types
 * Multi-area movement with encounters and location features
 */

// =============================================================================
// LOCATION ID
// =============================================================================

/**
 * Location identifiers - strongly typed
 */
export type LocationId =
  // Chapter 1 locations
  | 'beggars-corner'
  | 'lower-streets'
  | 'guttermouth-plaza'
  | 'gang-territory'
  | 'bone-yard'
  | 'rust-heap'
  | 'the-drain'
  | 'bright-spot'
  // Future chapters can extend this
  | string;

// =============================================================================
// UNLOCK CONDITIONS
// =============================================================================

/**
 * Conditions that must be met to access a location
 */
export type UnlockCondition =
  | { type: 'flag'; flag: string; value: boolean | string | number }
  | { type: 'scene-complete'; sceneId: string }
  | { type: 'chapter'; minChapter: number }
  | { type: 'location-visited'; locationId: LocationId }
  | { type: 'all'; conditions: UnlockCondition[] }
  | { type: 'any'; conditions: UnlockCondition[] };

// =============================================================================
// LOCATION FEATURES
// =============================================================================

/**
 * Features available at a location
 */
export interface LocationFeatures {
  /** Can player rest here to recover HP/Chi? */
  hasRest: boolean;
  /** Can player train techniques here? */
  hasTraining: boolean;
  /** Can player save game here? */
  hasSavePoint: boolean;
  /** Can player shop here? */
  hasShop: boolean;
}

/**
 * Danger level affects encounter rate and enemy strength
 */
export type DangerLevel = 'safe' | 'neutral' | 'dangerous' | 'deadly';

// =============================================================================
// EXPLORATION AREA (reuse from story types)
// =============================================================================

/**
 * An area within a location that can be explored
 */
export interface NavigationExplorationArea {
  id: string;
  name: string;
  description: string;
  /** Content when exploring (dialogue, narration, etc.) */
  content: Array<{
    type: 'narration' | 'dialogue' | 'system';
    text: string;
    speaker?: string;
  }>;
  /** Is this area required before leaving? */
  required?: boolean;
  /** One-time discovery flag */
  discoveryFlag?: string;
}

// =============================================================================
// NAVIGATION LOCATION
// =============================================================================

/**
 * A location the player can travel to
 */
export interface NavigationLocation {
  id: LocationId;
  name: string;
  /** Chinese name (for flavour) */
  chinese?: string;
  /** Description shown when entering */
  description: string;
  /** Locations directly reachable from here */
  connectedTo: LocationId[];
  /** How dangerous is this area? */
  dangerLevel: DangerLevel;
  /** Enemy IDs that can appear here */
  encounterPool: string[];
  /** Chance of encounter on travel (0-1) */
  encounterChance: number;
  /** Condition to unlock this location (optional) */
  unlockCondition?: UnlockCondition;
  /** Features available */
  features: LocationFeatures;
  /** Optional exploration areas within this location */
  explorationAreas?: NavigationExplorationArea[];
  /** Which chapter this location belongs to */
  chapter: number;
}

// =============================================================================
// ENCOUNTER
// =============================================================================

/**
 * A random encounter
 */
export interface Encounter {
  /** Enemy ID(s) to fight */
  enemies: string[];
  /** Can player flee? */
  canFlee: boolean;
  /** Optional narrative intro */
  intro?: Array<{
    type: 'narration' | 'dialogue';
    text: string;
    speaker?: string;
  }>;
}

// =============================================================================
// NAVIGATION STATE
// =============================================================================

/**
 * Runtime state for navigation
 */
export interface NavigationState {
  /** Currently active location */
  currentLocation: LocationId;
  /** Locations the player has visited */
  visitedLocations: LocationId[];
  /** Exploration areas completed within locations */
  exploredAreas: Record<LocationId, string[]>;
  /** Turns since last encounter (for cooldown) */
  turnsSinceEncounter: number;
  /** Is navigation mode currently active? */
  isNavigating: boolean;
  /** Location to return to after combat/story */
  returnLocation?: LocationId;
}

/**
 * Create initial navigation state
 */
export function createNavigationState(
  startLocation: LocationId = 'beggars-corner'
): NavigationState {
  return {
    currentLocation: startLocation,
    visitedLocations: [startLocation],
    exploredAreas: {},
    turnsSinceEncounter: 0,
    isNavigating: false,
  };
}

// =============================================================================
// NAVIGATION RESULT
// =============================================================================

/**
 * Result from a navigation action
 */
export interface NavigationResult {
  /** What happened */
  action:
    | 'moved'           // Successfully moved to new location
    | 'encounter'       // Random encounter triggered
    | 'blocked'         // Location is locked
    | 'story-trigger'   // Story event triggered
    | 'exploration';    // Exploring area within location
  /** Updated state */
  state: NavigationState;
  /** Encounter details (if action is 'encounter') */
  encounter?: Encounter;
  /** Message to display */
  message?: string;
  /** Story scene to trigger (if action is 'story-trigger') */
  storySceneId?: string;
  /** Current location details */
  location?: NavigationLocation;
}

// =============================================================================
// TRAVEL OPTIONS
// =============================================================================

/**
 * Options for travelling to a location
 */
export interface TravelOption {
  locationId: LocationId;
  location: NavigationLocation;
  /** Is this location currently accessible? */
  isUnlocked: boolean;
  /** Why is it locked? (if locked) */
  lockReason?: string;
  /** Has player visited before? */
  visited: boolean;
  /** Danger level for display */
  dangerLevel: DangerLevel;
}
