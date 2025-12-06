/**
 * Technique Learning ASCII Art
 * Celebratory displays when learning new techniques
 */

export interface TechniqueArtConfig {
  name: string;
  art: string[];
  quote: string;
  color?: string;
}

// =============================================================================
// TECHNIQUE ASCII ART
// =============================================================================

export const TECHNIQUE_ART: Record<string, TechniqueArtConfig> = {
  'flowing-palm': {
    name: 'Flowing Palm',
    art: [
      '╔═══════════════════════════════════════════╗',
      '║                                           ║',
      '║      ★  NEW TECHNIQUE LEARNED  ★          ║',
      '║                                           ║',
      '║           FLOWING PALM (流掌)             ║',
      '║              ~~~╱╲~~~                     ║',
      '║             ~~~~╲╱~~~~                    ║',
      '║                                           ║',
      '║   "Water that strikes will break stone"  ║',
      '║                                           ║',
      '╚═══════════════════════════════════════════╝',
    ],
    quote: 'Water that strikes will break stone',
    color: 'cyan',
  },

  'weathered-guard': {
    name: 'Weathered Guard',
    art: [
      '╔═══════════════════════════════════════════╗',
      '║                                           ║',
      '║      ★  NEW TECHNIQUE LEARNED  ★          ║',
      '║                                           ║',
      '║        WEATHERED GUARD (風化守)           ║',
      '║              ███████                      ║',
      '║             ███████████                   ║',
      '║              ███████                      ║',
      '║                                           ║',
      '║    "The mountain endures all storms"     ║',
      '║                                           ║',
      '╚═══════════════════════════════════════════╝',
    ],
    quote: 'The mountain endures all storms',
    color: 'gray',
  },

  'starving-strike': {
    name: 'Starving Strike',
    art: [
      '╔═══════════════════════════════════════════╗',
      '║                                           ║',
      '║      ★  NEW TECHNIQUE LEARNED  ★          ║',
      '║                                           ║',
      '║        STARVING STRIKE (餓擊)             ║',
      '║              >>>===>>>                    ║',
      '║             >>>>===>>>>                   ║',
      '║              >>>===>>>                    ║',
      '║                                           ║',
      '║      "Hunger sharpens the blade"         ║',
      '║                                           ║',
      '╚═══════════════════════════════════════════╝',
    ],
    quote: 'Hunger sharpens the blade',
    color: 'red',
  },

  'double-palm': {
    name: 'Double Palm',
    art: [
      '╔═══════════════════════════════════════════╗',
      '║                                           ║',
      '║      ★  NEW TECHNIQUE LEARNED  ★          ║',
      '║                                           ║',
      '║          DOUBLE PALM (雙掌)               ║',
      '║            ╱╲    ╱╲                       ║',
      '║           ╱══╲  ╱══╲                      ║',
      '║            ╲╱    ╲╱                       ║',
      '║                                           ║',
      '║     "Two strikes, one intention"         ║',
      '║                                           ║',
      '╚═══════════════════════════════════════════╝',
    ],
    quote: 'Two strikes, one intention',
    color: 'cyan',
  },

  // Generic fallback
  default: {
    name: 'New Technique',
    art: [
      '╔═══════════════════════════════════════════╗',
      '║                                           ║',
      '║      ★  NEW TECHNIQUE LEARNED  ★          ║',
      '║                                           ║',
      '║              {name}                       ║',
      '║                 ≋≋≋                       ║',
      '║                ≋≋≋≋≋                      ║',
      '║                 ≋≋≋                       ║',
      '║                                           ║',
      '║         "{quote}"                         ║',
      '║                                           ║',
      '╚═══════════════════════════════════════════╝',
    ],
    quote: 'A new path opens before you',
    color: 'yellow',
  },
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get technique art by ID
 */
export function getTechniqueArt(techniqueId: string, techniqueName?: string): TechniqueArtConfig {
  const safeArt = TECHNIQUE_ART[techniqueId] ?? TECHNIQUE_ART.default!;

  // If using default, customize with technique name
  if (safeArt === TECHNIQUE_ART.default && techniqueName) {
    return {
      ...safeArt,
      name: techniqueName,
      quote: safeArt.quote ?? 'A new path opens before you',
      art: safeArt.art.map(line => line.replace('{name}', techniqueName)),
    };
  }

  return safeArt;
}

/**
 * Get technique art as a single string
 */
export function getTechniqueArtString(techniqueId: string, techniqueName?: string): string {
  const art = getTechniqueArt(techniqueId, techniqueName);
  return art.art.join('\n');
}
