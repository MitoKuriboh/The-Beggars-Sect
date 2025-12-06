/**
 * Boss ASCII Art
 * Dramatic boss introduction displays
 */

export interface BossArtConfig {
  name: string;
  title: string;
  art: string[];
  quote: string;
  color?: string;
}

// =============================================================================
// BOSS ASCII ART
// =============================================================================

export const BOSS_ART: Record<string, BossArtConfig> = {
  'razor': {
    name: 'Razor',
    title: 'STREET KING OF THE GUTTERS',
    art: [
      '',
      '╔══════════════════════════════════════════════════════════╗',
      '║                                                          ║',
      '║                    ⚔️  BOSS FIGHT  ⚔️                     ║',
      '║                                                          ║',
      '║                       R A Z O R                          ║',
      '║              STREET KING OF THE GUTTERS                  ║',
      '║                                                          ║',
      '║                    ╱╲     ╱╲                             ║',
      '║                   ╱  ╲   ╱  ╲                            ║',
      '║                  ╱ ⚡ ╲ ╱ ⚡ ╲                            ║',
      '║                 ╱      ╲      ╲                          ║',
      '║                ══════════════════                        ║',
      '║                     ║    ║                               ║',
      '║                     ║    ║                               ║',
      '║                                                          ║',
      '║   "You beggars think you can challenge ME?"             ║',
      '║                                                          ║',
      '╚══════════════════════════════════════════════════════════╝',
      '',
    ],
    quote: 'You beggars think you can challenge ME?',
    color: 'red',
  },

  'commander-vex': {
    name: 'Commander Vex',
    title: 'LEADER OF THE IRON SPARTANS',
    art: [
      '',
      '╔══════════════════════════════════════════════════════════╗',
      '║                                                          ║',
      '║                    ⚔️  BOSS FIGHT  ⚔️                     ║',
      '║                                                          ║',
      '║                  COMMANDER VEX                           ║',
      '║            LEADER OF THE IRON SPARTANS                   ║',
      '║                                                          ║',
      '║                      ╔═══╗                               ║',
      '║                      ║ ◉ ║                               ║',
      '║                  ════╬═══╬════                           ║',
      '║                  ║           ║                           ║',
      '║                  ║    ║║║    ║                           ║',
      '║                  ║    ║║║    ║                           ║',
      '║                  ═════════════                           ║',
      '║                                                          ║',
      '║     "Discipline. Order. Victory."                        ║',
      '║                                                          ║',
      '╚══════════════════════════════════════════════════════════╝',
      '',
    ],
    quote: 'Discipline. Order. Victory.',
    color: 'blue',
  },

  'hollow-one': {
    name: 'The Hollow One',
    title: 'MASTER OF THE EMPTY PALM',
    art: [
      '',
      '╔══════════════════════════════════════════════════════════╗',
      '║                                                          ║',
      '║                    ⚔️  BOSS FIGHT  ⚔️                     ║',
      '║                                                          ║',
      '║                  THE HOLLOW ONE                          ║',
      '║              MASTER OF THE EMPTY PALM                    ║',
      '║                                                          ║',
      '║                       ( )                                ║',
      '║                      (   )                               ║',
      '║                     (     )                              ║',
      '║                      (   )                               ║',
      '║                       ( )                                ║',
      '║                        ○                                 ║',
      '║                      ╱ ║ ╲                               ║',
      '║                                                          ║',
      '║  "Form is emptiness. Emptiness is form."                ║',
      '║                                                          ║',
      '╚══════════════════════════════════════════════════════════╝',
      '',
    ],
    quote: 'Form is emptiness. Emptiness is form.',
    color: 'magenta',
  },

  // Generic boss fallback
  default: {
    name: 'Boss',
    title: 'WORTHY OPPONENT',
    art: [
      '',
      '╔══════════════════════════════════════════════════════════╗',
      '║                                                          ║',
      '║                    ⚔️  BOSS FIGHT  ⚔️                     ║',
      '║                                                          ║',
      '║                     {name}                               ║',
      '║                  {title}                                 ║',
      '║                                                          ║',
      '║                      ╔═══╗                               ║',
      '║                      ║ ◉ ║                               ║',
      '║                      ╚═══╝                               ║',
      '║                        ║                                 ║',
      '║                      ══╬══                               ║',
      '║                       ╱ ╲                                ║',
      '║                                                          ║',
      '║              "Prepare yourself!"                         ║',
      '║                                                          ║',
      '╚══════════════════════════════════════════════════════════╝',
      '',
    ],
    quote: 'Prepare yourself!',
    color: 'red',
  },
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get boss art by enemy ID
 */
export function getBossArt(enemyId: string, enemyName?: string, enemyTitle?: string): BossArtConfig {
  const safeArt = BOSS_ART[enemyId] ?? BOSS_ART.default!;

  // If using default, customize with enemy info
  if (safeArt === BOSS_ART.default && (enemyName || enemyTitle)) {
    return {
      ...safeArt,
      name: enemyName ?? safeArt.name,
      title: enemyTitle ?? safeArt.title,
      quote: safeArt.quote ?? 'Prepare yourself!',
      art: safeArt.art.map(line =>
        line
          .replace('{name}', enemyName ?? 'Boss')
          .replace('{title}', enemyTitle ?? 'Worthy Opponent')
      ),
    };
  }

  return safeArt;
}

/**
 * Get boss art as a single string
 */
export function getBossArtString(enemyId: string, enemyName?: string, enemyTitle?: string): string {
  const art = getBossArt(enemyId, enemyName, enemyTitle);
  return art.art.join('\n');
}

/**
 * Get victory art for defeating a boss
 */
export function getVictoryArt(bossName: string): string[] {
  return [
    '',
    '╔══════════════════════════════════════════════════════════╗',
    '║                                                          ║',
    '║                    ★★★ VICTORY ★★★                       ║',
    '║                                                          ║',
    `║              ${bossName} has been defeated!              ║`,
    '║                                                          ║',
    '║                       ╱╲                                 ║',
    '║                      ╱  ╲                                ║',
    '║                     ╱ ★  ╲                               ║',
    '║                    ╱      ╲                              ║',
    '║                   ══════════                             ║',
    '║                                                          ║',
    '║            "Another step on the path..."                ║',
    '║                                                          ║',
    '╚══════════════════════════════════════════════════════════╝',
    '',
  ];
}
