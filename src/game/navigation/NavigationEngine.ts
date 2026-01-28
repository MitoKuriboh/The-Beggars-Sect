/**
 * Navigation Engine
 * Core logic for multi-area movement and exploration
 */

import type {
  NavigationLocation,
  NavigationState,
  NavigationResult,
  TravelOption,
  LocationId,
  UnlockCondition,
  Encounter,
} from '../../types/navigation';
import type { StoryState } from '../../types/story';
import { createNavigationState } from '../../types/navigation';
import { EncounterSystem } from './EncounterSystem';
import { CHAPTER1_LOCATIONS } from './locations/chapter1';

// =============================================================================
// NAVIGATION ENGINE
// =============================================================================

export class NavigationEngine {
  private locations: Map<LocationId, NavigationLocation>;
  private encounterSystem: EncounterSystem;
  private state: NavigationState;
  private storyState: StoryState | null = null;
  private onStateChange?: () => void;

  constructor() {
    this.locations = new Map();
    this.encounterSystem = new EncounterSystem();
    this.state = createNavigationState();

    // Load Chapter 1 locations by default
    this.loadLocations(CHAPTER1_LOCATIONS);
  }

  /**
   * Load locations into the engine
   */
  loadLocations(locations: NavigationLocation[]): void {
    for (const location of locations) {
      this.locations.set(location.id, location);
    }
  }

  /**
   * Initialize navigation from a starting location
   */
  initialize(
    startLocation: LocationId,
    storyState: StoryState,
    onStateChange?: () => void
  ): NavigationResult {
    this.state = createNavigationState(startLocation);
    this.state.isNavigating = true;
    this.storyState = storyState;
    this.onStateChange = onStateChange;

    const location = this.locations.get(startLocation);
    if (!location) {
      throw new Error(`Unknown starting location: ${startLocation}`);
    }

    // Mark as visited
    if (!this.state.visitedLocations.includes(startLocation)) {
      this.state.visitedLocations.push(startLocation);
    }

    this.notifyStateChange();

    return {
      action: 'moved',
      state: { ...this.state },
      location,
      message: `You are at ${location.name}.`,
    };
  }

  /**
   * Get current navigation state
   */
  getState(): NavigationState {
    return { ...this.state };
  }

  /**
   * Set story state reference (for checking unlock conditions)
   */
  setStoryState(storyState: StoryState): void {
    this.storyState = storyState;
  }

  /**
   * Get current location
   */
  getCurrentLocation(): NavigationLocation | undefined {
    return this.locations.get(this.state.currentLocation);
  }

  /**
   * Get all available travel options from current location
   */
  getTravelOptions(): TravelOption[] {
    const current = this.getCurrentLocation();
    if (!current) return [];

    return current.connectedTo.map(locationId => {
      const location = this.locations.get(locationId);
      if (!location) {
        return {
          locationId,
          location: {
            id: locationId,
            name: 'Unknown',
            description: 'This location cannot be found.',
            connectedTo: [],
            dangerLevel: 'safe' as const,
            encounterPool: [],
            encounterChance: 0,
            features: { hasRest: false, hasTraining: false, hasSavePoint: false, hasShop: false },
            chapter: 1,
          },
          isUnlocked: false,
          lockReason: 'Location not found',
          visited: false,
          dangerLevel: 'safe' as const,
        };
      }

      const unlockCheck = this.checkUnlockCondition(location.unlockCondition);

      return {
        locationId,
        location,
        isUnlocked: unlockCheck.unlocked,
        lockReason: unlockCheck.reason,
        visited: this.state.visitedLocations.includes(locationId),
        dangerLevel: location.dangerLevel,
      };
    });
  }

  /**
   * Travel to a connected location
   */
  travel(destinationId: LocationId): NavigationResult {
    const current = this.getCurrentLocation();
    if (!current) {
      return {
        action: 'blocked',
        state: { ...this.state },
        message: 'You are nowhere.',
      };
    }

    // Check if destination is connected
    if (!current.connectedTo.includes(destinationId)) {
      return {
        action: 'blocked',
        state: { ...this.state },
        message: `You cannot travel directly to that location from ${current.name}.`,
      };
    }

    const destination = this.locations.get(destinationId);
    if (!destination) {
      return {
        action: 'blocked',
        state: { ...this.state },
        message: 'That location does not exist.',
      };
    }

    // Check unlock condition
    const unlockCheck = this.checkUnlockCondition(destination.unlockCondition);
    if (!unlockCheck.unlocked) {
      return {
        action: 'blocked',
        state: { ...this.state },
        message: unlockCheck.reason ?? `${destination.name} is not accessible yet.`,
      };
    }

    // Check for random encounter
    const encounter = this.encounterSystem.rollEncounter(destination, this.state);
    if (encounter) {
      // Update state for encounter
      this.state.turnsSinceEncounter = 0;
      this.state.returnLocation = this.state.currentLocation;
      this.notifyStateChange();

      return {
        action: 'encounter',
        state: { ...this.state },
        encounter,
        message: 'You are ambushed!',
      };
    }

    // Safe travel - update state
    this.state.currentLocation = destinationId;
    this.state.turnsSinceEncounter++;

    if (!this.state.visitedLocations.includes(destinationId)) {
      this.state.visitedLocations.push(destinationId);
    }

    this.notifyStateChange();

    return {
      action: 'moved',
      state: { ...this.state },
      location: destination,
      message: `You arrive at ${destination.name}.`,
    };
  }

  /**
   * Explore an area within the current location
   */
  explore(areaId: string): NavigationResult {
    const location = this.getCurrentLocation();
    if (!location) {
      return {
        action: 'blocked',
        state: { ...this.state },
        message: 'You are nowhere.',
      };
    }

    if (!location.explorationAreas) {
      return {
        action: 'blocked',
        state: { ...this.state },
        message: 'There is nothing to explore here.',
      };
    }

    const area = location.explorationAreas.find(a => a.id === areaId);
    if (!area) {
      return {
        action: 'blocked',
        state: { ...this.state },
        message: 'That area does not exist.',
      };
    }

    // Mark area as explored
    const locationExplored = this.state.exploredAreas[location.id] ?? [];
    if (!locationExplored.includes(areaId)) {
      this.state.exploredAreas[location.id] = [...locationExplored, areaId];
    }

    this.notifyStateChange();

    return {
      action: 'exploration',
      state: { ...this.state },
      location,
      message: area.name,
    };
  }

  /**
   * Resume navigation after combat
   */
  resumeAfterCombat(won: boolean): NavigationResult {
    if (won) {
      // Continue to intended destination or stay where we are
      this.state.turnsSinceEncounter = 0;
      this.notifyStateChange();

      return {
        action: 'moved',
        state: { ...this.state },
        location: this.getCurrentLocation(),
        message: 'You continue on your way.',
      };
    } else {
      // Return to previous safe location
      const returnTo = this.state.returnLocation ?? 'beggars-corner';
      this.state.currentLocation = returnTo;
      this.state.returnLocation = undefined;
      this.state.turnsSinceEncounter = 0;
      this.notifyStateChange();

      return {
        action: 'moved',
        state: { ...this.state },
        location: this.locations.get(returnTo),
        message: 'You retreat to safety.',
      };
    }
  }

  /**
   * Exit navigation mode
   */
  exitNavigation(): void {
    this.state.isNavigating = false;
    this.notifyStateChange();
  }

  /**
   * Check if a location's unlock condition is met
   */
  private checkUnlockCondition(
    condition: UnlockCondition | undefined
  ): { unlocked: boolean; reason?: string } {
    if (!condition) {
      return { unlocked: true };
    }

    switch (condition.type) {
      case 'flag': {
        if (!this.storyState) return { unlocked: false, reason: 'Story not loaded.' };
        const flagValue = this.storyState.flags[condition.flag];
        const matches = flagValue === condition.value;
        return {
          unlocked: matches,
          reason: matches ? undefined : 'You need to discover how to access this location.',
        };
      }

      case 'scene-complete': {
        if (!this.storyState) return { unlocked: false, reason: 'Story not loaded.' };
        const completed = this.storyState.completedScenes.includes(condition.sceneId);
        return {
          unlocked: completed,
          reason: completed ? undefined : 'You must progress further in the story.',
        };
      }

      case 'chapter': {
        if (!this.storyState) return { unlocked: false, reason: 'Story not loaded.' };
        // Extract chapter number from currentChapter (e.g., 'chapter1' -> 1)
        const chapterMatch = this.storyState.currentChapter.match(/(\d+)/);
        const currentChapter = chapterMatch?.[1] ? parseInt(chapterMatch[1], 10) : 0;
        const meetsReq = currentChapter >= condition.minChapter;
        return {
          unlocked: meetsReq,
          reason: meetsReq ? undefined : `Requires Chapter ${condition.minChapter}.`,
        };
      }

      case 'location-visited': {
        const visited = this.state.visitedLocations.includes(condition.locationId);
        return {
          unlocked: visited,
          reason: visited ? undefined : 'You must visit another location first.',
        };
      }

      case 'all': {
        for (const subCondition of condition.conditions) {
          const result = this.checkUnlockCondition(subCondition);
          if (!result.unlocked) {
            return result;
          }
        }
        return { unlocked: true };
      }

      case 'any': {
        for (const subCondition of condition.conditions) {
          const result = this.checkUnlockCondition(subCondition);
          if (result.unlocked) {
            return { unlocked: true };
          }
        }
        return { unlocked: false, reason: 'Requirements not met.' };
      }

      default:
        return { unlocked: true };
    }
  }

  /**
   * Get location by ID
   */
  getLocation(id: LocationId): NavigationLocation | undefined {
    return this.locations.get(id);
  }

  /**
   * Check if location has been visited
   */
  hasVisited(locationId: LocationId): boolean {
    return this.state.visitedLocations.includes(locationId);
  }

  /**
   * Check if area within location has been explored
   */
  hasExplored(locationId: LocationId, areaId: string): boolean {
    const explored = this.state.exploredAreas[locationId];
    return explored ? explored.includes(areaId) : false;
  }

  /**
   * Notify state change listeners
   */
  private notifyStateChange(): void {
    if (this.onStateChange) {
      this.onStateChange();
    }
  }

  /**
   * Force an encounter (for story purposes)
   */
  forceEncounter(encounter: Encounter): NavigationResult {
    this.state.turnsSinceEncounter = 0;
    this.state.returnLocation = this.state.currentLocation;
    this.notifyStateChange();

    return {
      action: 'encounter',
      state: { ...this.state },
      encounter,
      message: 'Combat begins!',
    };
  }

  /**
   * Trigger a story scene from navigation
   */
  triggerStoryScene(sceneId: string): NavigationResult {
    this.state.isNavigating = false;
    this.notifyStateChange();

    return {
      action: 'story-trigger',
      state: { ...this.state },
      storySceneId: sceneId,
      message: 'Something happens...',
    };
  }
}

/**
 * Singleton instance
 */
export const navigationEngine = new NavigationEngine();
