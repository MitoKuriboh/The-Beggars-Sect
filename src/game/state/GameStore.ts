/**
 * Game State Store
 * Central state management for the game
 */

import type {
  GameState,
  StoryProgress,
  GameFlags,
  GameStats,
  SaveData,
  Character,
  Inventory,
  NPCRelationship,
} from '../../types/index';

import {
  DEFAULT_STORY_PROGRESS,
  DEFAULT_FLAGS,
  DEFAULT_STATS,
  generateChecksum,
} from '../../types/game';

import { createInventory } from '../../types/item';

// =============================================================================
// GAME STORE
// =============================================================================

/**
 * Singleton game state store
 * Manages all persistent game data
 */
class GameStoreClass {
  private state: GameState | null = null;
  private listeners: Set<() => void> = new Set();

  // ---------------------------------------------------------------------------
  // INITIALIZATION
  // ---------------------------------------------------------------------------

  /**
   * Initialize new game with player character
   */
  initializeNewGame(player: Character): void {
    this.state = {
      // Meta
      version: '1.0.0',
      saveSlot: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),

      // Player
      player,
      inventory: createInventory(20),

      // Progression
      storyProgress: { ...DEFAULT_STORY_PROGRESS },
      currentLocation: 'lower-streets-alley',

      // Unlocks
      discoveredTechniques: [...player.techniques],
      discoveredCombos: [],
      discoveredLocations: ['lower-streets-alley'],

      // Relationships
      npcRelationships: [],

      // Flags
      flags: { ...DEFAULT_FLAGS },

      // Statistics
      stats: { ...DEFAULT_STATS },
    };

    this.notifyListeners();
  }

  /**
   * Check if game is initialized
   */
  isInitialized(): boolean {
    return this.state !== null;
  }

  // ---------------------------------------------------------------------------
  // GETTERS
  // ---------------------------------------------------------------------------

  /**
   * Get current game state (throws if not initialized)
   */
  getState(): GameState {
    if (!this.state) {
      throw new Error('Game not initialized. Call initializeNewGame() first.');
    }
    return this.state;
  }

  /**
   * Get player character
   */
  getPlayer(): Character {
    return this.getState().player;
  }

  /**
   * Get inventory
   */
  getInventory(): Inventory {
    return this.getState().inventory;
  }

  /**
   * Get story progress
   */
  getStoryProgress(): StoryProgress {
    return this.getState().storyProgress;
  }

  /**
   * Get current location ID
   */
  getCurrentLocation(): string {
    return this.getState().currentLocation;
  }

  /**
   * Get game flags
   */
  getFlags(): GameFlags {
    return this.getState().flags;
  }

  /**
   * Get specific flag value
   */
  getFlag(key: string): boolean {
    return this.getState().flags[key] ?? false;
  }

  /**
   * Get game statistics
   */
  getStats(): GameStats {
    return this.getState().stats;
  }

  /**
   * Get discovered techniques
   */
  getDiscoveredTechniques(): string[] {
    return this.getState().discoveredTechniques;
  }

  // ---------------------------------------------------------------------------
  // MUTATIONS
  // ---------------------------------------------------------------------------

  /**
   * Update player character
   */
  updatePlayer(updates: Partial<Character>): void {
    const state = this.getState();
    state.player = { ...state.player, ...updates };
    state.updatedAt = Date.now();
    this.notifyListeners();
  }

  /**
   * Set player HP (clamped to 0-maxHp)
   */
  setPlayerHp(hp: number): void {
    const player = this.getPlayer();
    this.updatePlayer({
      hp: Math.max(0, Math.min(hp, player.maxHp)),
    });
  }

  /**
   * Set player chi (clamped to 0-maxChi)
   */
  setPlayerChi(chi: number): void {
    const player = this.getPlayer();
    this.updatePlayer({
      chi: Math.max(0, Math.min(chi, player.maxChi)),
    });
  }

  /**
   * Update inventory
   */
  updateInventory(updates: Partial<Inventory>): void {
    const state = this.getState();
    state.inventory = { ...state.inventory, ...updates };
    state.updatedAt = Date.now();
    this.notifyListeners();
  }

  /**
   * Add gold
   */
  addGold(amount: number): void {
    const inventory = this.getInventory();
    this.updateInventory({ gold: inventory.gold + amount });
  }

  /**
   * Spend gold (returns false if insufficient)
   */
  spendGold(amount: number): boolean {
    const inventory = this.getInventory();
    if (inventory.gold < amount) return false;
    this.updateInventory({ gold: inventory.gold - amount });
    return true;
  }

  /**
   * Update story progress
   */
  updateStoryProgress(updates: Partial<StoryProgress>): void {
    const state = this.getState();
    state.storyProgress = { ...state.storyProgress, ...updates };
    state.updatedAt = Date.now();
    this.notifyListeners();
  }

  /**
   * Record a story choice
   */
  recordChoice(choiceId: string, option: string): void {
    const progress = this.getStoryProgress();
    this.updateStoryProgress({
      choices: { ...progress.choices, [choiceId]: option },
    });
  }

  /**
   * Advance to next scene
   */
  advanceScene(sceneId: string): void {
    const progress = this.getStoryProgress();
    this.updateStoryProgress({
      scene: sceneId,
      completedScenes: [...progress.completedScenes, progress.scene],
    });
  }

  /**
   * Set current location
   */
  setLocation(locationId: string): void {
    const state = this.getState();
    state.currentLocation = locationId;

    // Track discovery
    if (!state.discoveredLocations.includes(locationId)) {
      state.discoveredLocations.push(locationId);
    }

    state.updatedAt = Date.now();
    this.notifyListeners();
  }

  /**
   * Set a flag
   */
  setFlag(key: string, value: boolean): void {
    const state = this.getState();
    state.flags[key] = value;
    state.updatedAt = Date.now();
    this.notifyListeners();
  }

  /**
   * Increment a stat
   */
  incrementStat(
    key: keyof Omit<GameStats, 'enemyTypesDefeated'>,
    amount: number = 1
  ): void {
    const state = this.getState();
    (state.stats[key] as number) += amount;
    state.updatedAt = Date.now();
    this.notifyListeners();
  }

  /**
   * Record enemy type defeated
   */
  recordEnemyDefeated(enemyId: string): void {
    const state = this.getState();
    if (!state.stats.enemyTypesDefeated.includes(enemyId)) {
      state.stats.enemyTypesDefeated.push(enemyId);
    }
    state.updatedAt = Date.now();
    this.notifyListeners();
  }

  /**
   * Discover a technique
   */
  discoverTechnique(techniqueId: string): boolean {
    const state = this.getState();
    if (state.discoveredTechniques.includes(techniqueId)) {
      return false; // Already discovered
    }

    state.discoveredTechniques.push(techniqueId);

    // Also add to player's available techniques
    if (!state.player.techniques.includes(techniqueId)) {
      state.player.techniques.push(techniqueId);
    }

    state.updatedAt = Date.now();
    this.notifyListeners();
    return true;
  }

  /**
   * Record technique mastery usage
   */
  recordTechniqueUse(techniqueId: string): number {
    const state = this.getState();
    const current = state.player.masteryLevels[techniqueId] ?? 0;
    state.player.masteryLevels[techniqueId] = current + 1;
    state.updatedAt = Date.now();
    this.notifyListeners();
    return current + 1;
  }

  /**
   * Update NPC relationship
   */
  updateNpcRelationship(npcId: string, affinityChange: number): void {
    const state = this.getState();
    let relationship = state.npcRelationships.find(r => r.npcId === npcId);

    if (!relationship) {
      relationship = {
        npcId,
        affinity: 0,
        dialogueState: 'initial',
        questsCompleted: [],
        flags: {},
      };
      state.npcRelationships.push(relationship);
    }

    relationship.affinity = Math.max(
      -100,
      Math.min(100, relationship.affinity + affinityChange)
    );

    state.updatedAt = Date.now();
    this.notifyListeners();
  }

  // ---------------------------------------------------------------------------
  // PERSISTENCE
  // ---------------------------------------------------------------------------

  /**
   * Serialize state to JSON string
   */
  save(): string {
    const state = this.getState();
    const saveData: SaveData = {
      state,
      checksum: generateChecksum(state),
    };
    return JSON.stringify(saveData, null, 2);
  }

  /**
   * Load state from JSON string
   */
  load(data: string): { success: boolean; error?: string } {
    try {
      const saveData: SaveData = JSON.parse(data);

      // Validate checksum
      const expectedChecksum = generateChecksum(saveData.state);
      if (saveData.checksum !== expectedChecksum) {
        return { success: false, error: 'Save file corrupted (checksum mismatch)' };
      }

      this.state = saveData.state;
      this.notifyListeners();
      return { success: true };
    } catch (e) {
      return { success: false, error: 'Invalid save data format' };
    }
  }

  /**
   * Reset game state
   */
  reset(): void {
    this.state = null;
    this.notifyListeners();
  }

  // ---------------------------------------------------------------------------
  // SUBSCRIPTIONS
  // ---------------------------------------------------------------------------

  /**
   * Subscribe to state changes
   */
  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  /**
   * Notify all listeners of state change
   */
  private notifyListeners(): void {
    this.listeners.forEach(listener => listener());
  }
}

// Export singleton instance
export const GameStore = new GameStoreClass();

// Export type for external use
export type { GameStoreClass };
