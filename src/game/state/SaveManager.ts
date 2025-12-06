/**
 * Save Manager
 * Handles file-based game saves for standalone builds
 */

import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

// =============================================================================
// TYPES
// =============================================================================

export interface SaveSlot {
  slot: number;
  name: string;
  chapter: string;
  scene: string;
  playtime: number;
  savedAt: number;
}

export interface SaveManagerConfig {
  maxSlots: number;
  saveDir: string;
}

// =============================================================================
// CONSTANTS
// =============================================================================

const DEFAULT_CONFIG: SaveManagerConfig = {
  maxSlots: 3,
  saveDir: path.join(os.homedir(), '.beggars-sect', 'saves'),
};

// =============================================================================
// SAVE MANAGER
// =============================================================================

class SaveManagerClass {
  private config: SaveManagerConfig;

  constructor(config: Partial<SaveManagerConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.ensureSaveDir();
  }

  // ---------------------------------------------------------------------------
  // DIRECTORY MANAGEMENT
  // ---------------------------------------------------------------------------

  /**
   * Ensure save directory exists
   */
  private ensureSaveDir(): void {
    try {
      if (!fs.existsSync(this.config.saveDir)) {
        fs.mkdirSync(this.config.saveDir, { recursive: true });
      }
    } catch (error) {
      // Silent fail - will handle errors on actual save/load
    }
  }

  /**
   * Get path for a save slot
   */
  private getSlotPath(slot: number): string {
    return path.join(this.config.saveDir, `save_${slot}.json`);
  }

  /**
   * Get path for metadata file
   */
  private getMetaPath(): string {
    return path.join(this.config.saveDir, 'saves.json');
  }

  // ---------------------------------------------------------------------------
  // SAVE OPERATIONS
  // ---------------------------------------------------------------------------

  /**
   * Save game data to a slot
   */
  save(slot: number, data: string, meta: Omit<SaveSlot, 'slot'>): {
    success: boolean;
    error?: string;
  } {
    try {
      this.ensureSaveDir();

      const savePath = this.getSlotPath(slot);

      // Backup existing save before overwriting
      if (fs.existsSync(savePath)) {
        const backupPath = `${savePath}.bak`;
        try {
          fs.copyFileSync(savePath, backupPath);
        } catch (backupError) {
          // Non-fatal - continue with save even if backup fails
        }
      }

      // Write save file
      fs.writeFileSync(savePath, data, 'utf-8');

      // Update metadata
      const slots = this.listSlots();
      const existingIndex = slots.findIndex((s) => s.slot === slot);
      const slotData: SaveSlot = { ...meta, slot };

      if (existingIndex >= 0) {
        slots[existingIndex] = slotData;
      } else {
        slots.push(slotData);
      }

      fs.writeFileSync(this.getMetaPath(), JSON.stringify(slots, null, 2), 'utf-8');

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Load game data from a slot
   */
  load(slot: number): { success: boolean; data?: string; error?: string } {
    try {
      const savePath = this.getSlotPath(slot);

      if (!fs.existsSync(savePath)) {
        return { success: false, error: 'Save file not found' };
      }

      const data = fs.readFileSync(savePath, 'utf-8');
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Delete a save slot
   */
  delete(slot: number): { success: boolean; error?: string } {
    try {
      const savePath = this.getSlotPath(slot);

      if (fs.existsSync(savePath)) {
        fs.unlinkSync(savePath);
      }

      // Update metadata
      const slots = this.listSlots().filter((s) => s.slot !== slot);
      fs.writeFileSync(this.getMetaPath(), JSON.stringify(slots, null, 2), 'utf-8');

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // ---------------------------------------------------------------------------
  // QUERY OPERATIONS
  // ---------------------------------------------------------------------------

  /**
   * List all save slots
   */
  listSlots(): SaveSlot[] {
    try {
      const metaPath = this.getMetaPath();

      if (!fs.existsSync(metaPath)) {
        return [];
      }

      const data = fs.readFileSync(metaPath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  /**
   * Check if a slot has a save
   */
  hasSlot(slot: number): boolean {
    return fs.existsSync(this.getSlotPath(slot));
  }

  /**
   * Get slot metadata
   */
  getSlotMeta(slot: number): SaveSlot | undefined {
    return this.listSlots().find((s) => s.slot === slot);
  }

  /**
   * Get max slots
   */
  getMaxSlots(): number {
    return this.config.maxSlots;
  }

  /**
   * Get save directory path
   */
  getSaveDir(): string {
    return this.config.saveDir;
  }

  // ---------------------------------------------------------------------------
  // AUTO-SAVE
  // ---------------------------------------------------------------------------

  /**
   * Auto-save to slot 0 (reserved for auto-save)
   */
  autoSave(data: string, meta: Omit<SaveSlot, 'slot' | 'name'>): {
    success: boolean;
    error?: string;
  } {
    return this.save(0, data, { ...meta, name: 'Auto-Save' });
  }

  /**
   * Check if auto-save exists
   */
  hasAutoSave(): boolean {
    return this.hasSlot(0);
  }

  /**
   * Load auto-save
   */
  loadAutoSave(): { success: boolean; data?: string; error?: string } {
    return this.load(0);
  }
}

// Export singleton instance
export const SaveManager = new SaveManagerClass();

// Export class for testing/custom configs
export { SaveManagerClass };
