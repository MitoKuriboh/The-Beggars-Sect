/**
 * Encounter System
 * Handles random encounters during navigation
 */

import type {
  NavigationLocation,
  NavigationState,
  Encounter,
  DangerLevel,
} from '../../types/navigation';

// =============================================================================
// CONFIGURATION
// =============================================================================

/**
 * Minimum turns between encounters to prevent spam
 */
const ENCOUNTER_COOLDOWN = 2;

/**
 * Danger level encounter rate multipliers
 */
const DANGER_MULTIPLIERS: Record<DangerLevel, number> = {
  safe: 0,
  neutral: 1,
  dangerous: 1.5,
  deadly: 2,
};

/**
 * Base flee chance by danger level
 */
const FLEE_CHANCE: Record<DangerLevel, number> = {
  safe: 1,
  neutral: 0.9,
  dangerous: 0.7,
  deadly: 0.5,
};

// =============================================================================
// ENCOUNTER SYSTEM
// =============================================================================

export class EncounterSystem {
  /**
   * Roll for a random encounter when travelling
   * @param location - The location being entered
   * @param state - Current navigation state
   * @returns Encounter if triggered, null otherwise
   */
  rollEncounter(
    location: NavigationLocation,
    state: NavigationState
  ): Encounter | null {
    // Safe zones never have encounters
    if (location.dangerLevel === 'safe') {
      return null;
    }

    // Check cooldown
    if (state.turnsSinceEncounter < ENCOUNTER_COOLDOWN) {
      return null;
    }

    // Empty encounter pool means no encounters possible
    if (location.encounterPool.length === 0) {
      return null;
    }

    // Calculate effective encounter chance
    const baseChance = location.encounterChance;
    const dangerMultiplier = DANGER_MULTIPLIERS[location.dangerLevel];
    const effectiveChance = Math.min(1, baseChance * dangerMultiplier);

    // Roll the dice
    if (Math.random() > effectiveChance) {
      return null;
    }

    // Encounter triggered - select enemy
    const enemyId = this.selectEnemy(location.encounterPool);
    const canFlee = this.canFleeEncounter(location.dangerLevel);

    return {
      enemies: [enemyId],
      canFlee,
      intro: this.generateEncounterIntro(location, enemyId),
    };
  }

  /**
   * Select an enemy from the pool
   * Weighted toward weaker enemies (more common)
   */
  private selectEnemy(pool: string[]): string {
    // For now, simple random selection
    // Could be enhanced with tier weighting
    const index = Math.floor(Math.random() * pool.length);
    return pool[index] ?? pool[0] ?? 'desperate-thug';
  }

  /**
   * Determine if player can flee from an encounter
   */
  private canFleeEncounter(dangerLevel: DangerLevel): boolean {
    const chance = FLEE_CHANCE[dangerLevel];
    return Math.random() < chance;
  }

  /**
   * Generate narrative intro for encounter
   */
  private generateEncounterIntro(
    location: NavigationLocation,
    _enemyId: string
  ): Encounter['intro'] {
    // Location-specific intros
    const intros: Record<string, Encounter['intro']> = {
      'lower-streets': [
        {
          type: 'narration',
          text: 'A figure emerges from a side alley, blocking the path.',
        },
      ],
      'gang-territory': [
        {
          type: 'narration',
          text: "You've been spotted. A gang member approaches, hand on weapon.",
        },
        {
          type: 'dialogue',
          speaker: 'THUG',
          text: '"Wrong neighbourhood, beggar."',
        },
      ],
      'bone-yard': [
        {
          type: 'narration',
          text: 'Movement in the shadows. Someone has been watching you.',
        },
      ],
      'rust-heap': [
        {
          type: 'narration',
          text: 'A scavenger looks up from their work, eyes narrowing.',
        },
      ],
      'the-drain': [
        {
          type: 'narration',
          text: "Razor's guards block your path. There's no talking your way out of this.",
        },
        {
          type: 'dialogue',
          speaker: 'GUARD',
          text: '"No one enters the Drain uninvited."',
        },
      ],
      'guttermouth-plaza': [
        {
          type: 'narration',
          text: 'A Spartan patrol notices you. One of them points.',
        },
        {
          type: 'dialogue',
          speaker: 'SPARTAN',
          text: '"You there. Papers. Now."',
        },
      ],
    };

    return intros[location.id] ?? [
      {
        type: 'narration',
        text: 'A hostile figure bars your way.',
      },
    ];
  }

  /**
   * Roll for a group encounter (multiple enemies)
   * Higher chance in deadly zones
   */
  rollGroupEncounter(
    location: NavigationLocation,
    state: NavigationState
  ): Encounter | null {
    // Only in dangerous/deadly zones
    if (location.dangerLevel !== 'dangerous' && location.dangerLevel !== 'deadly') {
      return null;
    }

    // 20% chance of group if encounter triggers
    const baseEncounter = this.rollEncounter(location, state);
    if (!baseEncounter) return null;

    const groupChance = location.dangerLevel === 'deadly' ? 0.3 : 0.15;
    if (Math.random() > groupChance) {
      return baseEncounter;
    }

    // Add a second enemy
    const secondEnemy = this.selectEnemy(location.encounterPool);
    return {
      ...baseEncounter,
      enemies: [baseEncounter.enemies[0] ?? 'desperate-thug', secondEnemy],
      intro: [
        {
          type: 'narration',
          text: "You're surrounded. They've been waiting for you.",
        },
      ],
    };
  }

  /**
   * Get encounter chance display text
   */
  getEncounterRisk(location: NavigationLocation): string {
    if (location.dangerLevel === 'safe') return 'None';

    const effective = location.encounterChance * DANGER_MULTIPLIERS[location.dangerLevel];
    if (effective < 0.15) return 'Low';
    if (effective < 0.3) return 'Moderate';
    if (effective < 0.5) return 'High';
    return 'Very High';
  }
}

/**
 * Singleton instance
 */
export const encounterSystem = new EncounterSystem();
