/**
 * Status Effect Utilities
 * Reusable functions for managing status effects on characters
 *
 * Eliminates duplication of status effect ticking logic
 * across CombatEngine for player and enemies.
 */

import type { Character, StatusEffect } from '../../types/index';

/**
 * Tick down status effects on a character and remove expired ones
 *
 * This function:
 * 1. Decrements duration of all status effects by 1
 * 2. Filters out effects with duration <= 0
 * 3. Updates the character's statusEffects array in place
 *
 * @param character - The character whose status effects to tick
 */
export function tickCharacterStatusEffects(character: Character): void {
  character.statusEffects = character.statusEffects
    .map((effect) => ({
      ...effect,
      duration: effect.duration - 1,
    }))
    .filter((effect) => effect.duration > 0);
}

/**
 * Tick down status effects for all characters in an array
 *
 * @param characters - Array of characters to tick effects for
 */
export function tickStatusEffectsForAll(characters: Character[]): void {
  for (const character of characters) {
    tickCharacterStatusEffects(character);
  }
}

/**
 * Check if a character has a specific status effect
 *
 * @param character - The character to check
 * @param effectName - Name of the status effect to look for
 * @returns The status effect if found, undefined otherwise
 */
export function hasStatusEffect(
  character: Character,
  effectName: string
): StatusEffect | undefined {
  return character.statusEffects.find((e) => e.name === effectName);
}

/**
 * Remove a specific status effect from a character
 *
 * @param character - The character to remove effect from
 * @param effectName - Name of the status effect to remove
 * @returns True if effect was removed, false if not found
 */
export function removeStatusEffect(character: Character, effectName: string): boolean {
  const initialLength = character.statusEffects.length;
  character.statusEffects = character.statusEffects.filter((e) => e.name !== effectName);
  return character.statusEffects.length < initialLength;
}

/**
 * Get the sum of all stat modifiers from status effects
 *
 * @param character - The character to check
 * @param statType - The stat to sum modifiers for ('attack', 'defense', 'dex', 'spirit')
 * @returns Total modifier value (can be positive or negative)
 */
export function getStatusEffectStatModifier(
  character: Character,
  statType: 'attack' | 'defense' | 'dex' | 'spirit'
): number {
  let modifier = 0;

  for (const effect of character.statusEffects) {
    // Check if this effect affects the requested stat
    if (effect.stat === statType) {
      modifier += effect.modifier;
    }
  }

  return modifier;
}

/**
 * Clear all status effects from a character
 *
 * @param character - The character to clear effects from
 */
export function clearAllStatusEffects(character: Character): void {
  character.statusEffects = [];
}

/**
 * Extend the duration of a specific status effect
 *
 * @param character - The character with the effect
 * @param effectName - Name of the effect to extend
 * @param additionalDuration - How many turns to add
 * @returns True if effect was found and extended, false otherwise
 */
export function extendStatusEffectDuration(
  character: Character,
  effectName: string,
  additionalDuration: number
): boolean {
  const effect = hasStatusEffect(character, effectName);
  if (effect) {
    effect.duration += additionalDuration;
    return true;
  }
  return false;
}

/**
 * Refresh a status effect's duration to a new value (if longer)
 * Used when reapplying non-stackable effects
 *
 * @param character - The character with the effect
 * @param effectName - Name of the effect to refresh
 * @param newDuration - The new duration to set (only if longer than current)
 * @returns True if duration was refreshed, false otherwise
 */
export function refreshStatusEffectDuration(
  character: Character,
  effectName: string,
  newDuration: number
): boolean {
  const effect = hasStatusEffect(character, effectName);
  if (effect && newDuration > effect.duration) {
    effect.duration = newDuration;
    return true;
  }
  return false;
}
