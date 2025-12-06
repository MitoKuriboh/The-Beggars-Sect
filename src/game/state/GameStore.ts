/**
 * Game State Store
 * Central state management for the game
 */

import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

import type {
  GameState,
  StoryProgress,
  StoryState,
  GameFlags,
  GameStats,
  SaveData,
  Character,
  Inventory,
  NPCRelationship,
  GameSettings,
} from '../../types/index';

import {
  DEFAULT_STORY_PROGRESS,
  DEFAULT_FLAGS,
  DEFAULT_STATS,
  DEFAULT_SETTINGS,
  generateChecksum,
} from '../../types/game';

import { createInventory } from '../../types/item';
import { SaveManager, SaveSlot } from './SaveManager';

// =============================================================================
// GAME STORE
// =============================================================================

/**
 * Singleton game state store
 * Manages all persistent game data
 */
class GameStoreClass {
  private static readonly SETTINGS_PATH = path.join(os.homedir(), '.beggars-sect', 'settings.json');

  private state: GameState | null = null;
  private settings: GameSettings = { ...DEFAULT_SETTINGS };
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.loadSettings();
  }

  // ---------------------------------------------------------------------------
  // SETTINGS PERSISTENCE
  // ---------------------------------------------------------------------------

  /**
   * Load settings from file
   */
  private loadSettings(): void {
    try {
      if (fs.existsSync(GameStoreClass.SETTINGS_PATH)) {
        const data = fs.readFileSync(GameStoreClass.SETTINGS_PATH, 'utf-8');
        const loadedSettings = JSON.parse(data) as GameSettings;
        this.settings = { ...DEFAULT_SETTINGS, ...loadedSettings };
      }
    } catch (error) {
      // Silent fail - use default settings
    }
  }

  /**
   * Save settings to file
   */
  private saveSettings(): void {
    try {
      const dir = path.dirname(GameStoreClass.SETTINGS_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(GameStoreClass.SETTINGS_PATH, JSON.stringify(this.settings, null, 2), 'utf-8');
    } catch (error) {
      // Silent fail
    }
  }

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
  // SETTINGS
  // ---------------------------------------------------------------------------

  /**
   * Get all settings
   */
  getSettings(): GameSettings {
    return this.settings;
  }

  /**
   * Check if typewriter effect is enabled
   */
  isTypewriterEnabled(): boolean {
    return this.settings.typewriterEnabled;
  }

  /**
   * Get typewriter speed (characters per second)
   */
  getTypewriterSpeed(): number {
    return this.settings.typewriterSpeed;
  }

  /**
   * Update settings
   */
  updateSettings(updates: Partial<GameSettings>): void {
    this.settings = { ...this.settings, ...updates };
    this.saveSettings();
    this.notifyListeners();
  }

  /**
   * Toggle typewriter effect
   */
  toggleTypewriter(): boolean {
    this.settings.typewriterEnabled = !this.settings.typewriterEnabled;
    this.saveSettings();
    this.notifyListeners();
    return this.settings.typewriterEnabled;
  }

  /**
   * Set typewriter speed (clamped to 20-100)
   */
  setTypewriterSpeed(speed: number): void {
    this.settings.typewriterSpeed = Math.max(20, Math.min(100, speed));
    this.saveSettings();
    this.notifyListeners();
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
  // STORY STATE SYNC
  // ---------------------------------------------------------------------------

  /**
   * Get story state (for StoryEngine)
   */
  getStoryState(): StoryState | undefined {
    return this.state?.storyState;
  }

  /**
   * Set story state (from StoryEngine)
   */
  setStoryState(storyState: StoryState): void {
    const state = this.getState();
    state.storyState = storyState;

    // Also update simplified storyProgress for UI display
    state.storyProgress.scene = storyState.currentScene;
    state.storyProgress.completedScenes = storyState.completedScenes;
    state.storyProgress.choices = storyState.choiceHistory.reduce((acc, ch) => {
      acc[ch.sceneId] = ch.choiceId;
      return acc;
    }, {} as Record<string, string>);

    state.updatedAt = Date.now();
    this.notifyListeners();
  }

  // ---------------------------------------------------------------------------
  // PERSISTENCE (In-Memory)
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
  // FILE-BASED PERSISTENCE
  // ---------------------------------------------------------------------------

  /**
   * Save game to a file slot
   */
  saveToSlot(slot: number, name?: string): { success: boolean; error?: string } {
    if (!this.state) {
      return { success: false, error: 'No game in progress' };
    }

    const data = this.save();
    const meta: Omit<SaveSlot, 'slot'> = {
      name: name || `Save ${slot}`,
      chapter: `Chapter ${this.state.storyProgress.chapter}`,
      scene: this.state.storyProgress.scene,
      playtime: this.state.stats.playTime,
      savedAt: Date.now(),
    };

    return SaveManager.save(slot, data, meta);
  }

  /**
   * Load game from a file slot
   */
  loadFromSlot(slot: number): { success: boolean; error?: string } {
    const result = SaveManager.load(slot);
    if (!result.success || !result.data) {
      return { success: false, error: result.error || 'Failed to load' };
    }

    return this.load(result.data);
  }

  /**
   * Auto-save current game
   */
  autoSave(): { success: boolean; error?: string } {
    if (!this.state) {
      return { success: false, error: 'No game in progress' };
    }

    const data = this.save();
    const meta: Omit<SaveSlot, 'slot' | 'name'> = {
      chapter: `Chapter ${this.state.storyProgress.chapter}`,
      scene: this.state.storyProgress.scene,
      playtime: this.state.stats.playTime,
      savedAt: Date.now(),
    };

    return SaveManager.autoSave(data, meta);
  }

  /**
   * Load from auto-save
   */
  loadAutoSave(): { success: boolean; error?: string } {
    const result = SaveManager.loadAutoSave();
    if (!result.success || !result.data) {
      return { success: false, error: result.error || 'No auto-save found' };
    }

    return this.load(result.data);
  }

  /**
   * Get all save slots
   */
  getSaveSlots(): SaveSlot[] {
    return SaveManager.listSlots();
  }

  /**
   * Check if auto-save exists
   */
  hasAutoSave(): boolean {
    return SaveManager.hasAutoSave();
  }

  /**
   * Delete a save slot
   */
  deleteSlot(slot: number): { success: boolean; error?: string } {
    return SaveManager.delete(slot);
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
