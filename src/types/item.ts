/**
 * Item Type Definitions
 * Consumables, equipment, scrolls, and key items
 */

// =============================================================================
// ITEM TYPES
// =============================================================================

export type ItemType =
  | 'consumable'   // One-time use items (potions, food)
  | 'scroll'       // Teaches techniques
  | 'equipment'    // Wearable gear (future)
  | 'key'          // Quest items
  | 'material';    // Crafting materials (future)

// =============================================================================
// ITEM EFFECTS
// =============================================================================

export type ItemEffectType =
  | 'heal-hp'           // Restore HP
  | 'heal-chi'          // Restore Chi
  | 'heal-both'         // Restore HP and Chi
  | 'buff-stat'         // Temporary stat boost
  | 'cure-status'       // Remove debuffs
  | 'teach-technique'   // Learn a technique
  | 'reveal-combo';     // Discover a combo chain

export interface ItemEffect {
  type: ItemEffectType;
  value: number;            // Amount or percentage
  stat?: string;            // For buff-stat
  duration?: number;        // Turns (for buffs)
  techniqueId?: string;     // For teach-technique
  comboId?: string;         // For reveal-combo
}

// =============================================================================
// ITEM
// =============================================================================

export interface Item {
  id: string;
  name: string;
  type: ItemType;
  description: string;

  // Effects when used
  effects: ItemEffect[];

  // Usage restrictions
  usableInCombat: boolean;
  usableOutOfCombat: boolean;

  // Economy
  buyPrice?: number;        // Price to buy (if purchasable)
  sellPrice?: number;       // Price when selling

  // Stacking
  maxStack: number;         // Max per inventory slot

  // Rarity for drops
  rarity: 'common' | 'uncommon' | 'rare' | 'unique';
}

// =============================================================================
// INVENTORY
// =============================================================================

export interface InventorySlot {
  item: Item;
  quantity: number;
}

export interface Inventory {
  slots: InventorySlot[];
  maxSlots: number;
  gold: number;
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Create empty inventory
 */
export function createInventory(maxSlots: number = 20): Inventory {
  return {
    slots: [],
    maxSlots,
    gold: 0,
  };
}

/**
 * Add item to inventory
 */
export function addItemToInventory(
  inventory: Inventory,
  item: Item,
  quantity: number = 1
): { success: boolean; reason?: string } {
  // Find existing stack
  const existingSlot = inventory.slots.find(s => s.item.id === item.id);

  if (existingSlot) {
    const newQty = existingSlot.quantity + quantity;
    if (newQty <= item.maxStack) {
      existingSlot.quantity = newQty;
      return { success: true };
    } else {
      // Partial add to existing stack
      const addToExisting = item.maxStack - existingSlot.quantity;
      existingSlot.quantity = item.maxStack;
      const remaining = quantity - addToExisting;

      // Try to create new slot for remainder
      if (inventory.slots.length < inventory.maxSlots) {
        inventory.slots.push({ item, quantity: remaining });
        return { success: true };
      }
      return { success: false, reason: 'Inventory full' };
    }
  }

  // Create new slot
  if (inventory.slots.length < inventory.maxSlots) {
    inventory.slots.push({ item, quantity: Math.min(quantity, item.maxStack) });
    return { success: true };
  }

  return { success: false, reason: 'Inventory full' };
}

/**
 * Remove item from inventory
 */
export function removeItemFromInventory(
  inventory: Inventory,
  itemId: string,
  quantity: number = 1
): { success: boolean; reason?: string } {
  const slotIndex = inventory.slots.findIndex(s => s.item.id === itemId);

  if (slotIndex === -1) {
    return { success: false, reason: 'Item not found' };
  }

  const slot = inventory.slots[slotIndex];
  if (!slot) {
    return { success: false, reason: 'Item not found' };
  }

  if (slot.quantity < quantity) {
    return { success: false, reason: 'Not enough items' };
  }

  slot.quantity -= quantity;

  // Remove empty slots
  if (slot.quantity <= 0) {
    inventory.slots.splice(slotIndex, 1);
  }

  return { success: true };
}

/**
 * Check if inventory has item
 */
export function hasItem(
  inventory: Inventory,
  itemId: string,
  quantity: number = 1
): boolean {
  const slot = inventory.slots.find(s => s.item.id === itemId);
  return slot !== undefined && slot.quantity >= quantity;
}

/**
 * Get item count
 */
export function getItemCount(inventory: Inventory, itemId: string): number {
  const slot = inventory.slots.find(s => s.item.id === itemId);
  return slot?.quantity ?? 0;
}
