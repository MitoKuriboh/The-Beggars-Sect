/**
 * Chapter Title ASCII Art
 * Dramatic chapter introduction displays
 */

export interface ChapterArtConfig {
  number: number;
  title: string;
  subtitle?: string;
  art: string[];
  color?: string;
}

// =============================================================================
// CHAPTER ASCII ART
// =============================================================================

export const CHAPTER_ART: Record<string, ChapterArtConfig> = {
  prologue: {
    number: 0,
    title: 'THE AWAKENING',
    subtitle: 'From Nothing, a Beginning',
    art: [
      '',
      '═══════════════════════════════════════════════════════════',
      '',
      '               P R O L O G U E',
      '',
      '                THE AWAKENING',
      '                  覚  醒',
      '',
      '          From Nothing, a Beginning',
      '',
      '═══════════════════════════════════════════════════════════',
      '',
    ],
    color: 'gray',
  },

  'chapter-1': {
    number: 1,
    title: 'STREETS OF THE FORGOTTEN',
    subtitle: 'Finding Family in the Shadows',
    art: [
      '',
      '═══════════════════════════════════════════════════════════',
      '',
      '               C H A P T E R   O N E',
      '',
      '          STREETS OF THE FORGOTTEN',
      '               忘れられた街',
      '',
      '        Finding Family in the Shadows',
      '',
      '═══════════════════════════════════════════════════════════',
      '',
    ],
    color: 'cyan',
  },

  'chapter-2': {
    number: 2,
    title: 'SHADOWS AND IRON',
    subtitle: 'When Order Meets Chaos',
    art: [
      '',
      '═══════════════════════════════════════════════════════════',
      '',
      '               C H A P T E R   T W O',
      '',
      '             SHADOWS AND IRON',
      '                影  と  鉄',
      '',
      '          When Order Meets Chaos',
      '',
      '═══════════════════════════════════════════════════════════',
      '',
    ],
    color: 'blue',
  },

  'chapter-3': {
    number: 3,
    title: 'THE EMPTY PALM',
    subtitle: 'Face the Void Within',
    art: [
      '',
      '═══════════════════════════════════════════════════════════',
      '',
      '             C H A P T E R   T H R E E',
      '',
      '              THE EMPTY PALM',
      '                  空  掌',
      '',
      '            Face the Void Within',
      '',
      '═══════════════════════════════════════════════════════════',
      '',
    ],
    color: 'magenta',
  },
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get chapter art by chapter ID
 */
export function getChapterArt(chapterId: string): ChapterArtConfig | null {
  return CHAPTER_ART[chapterId] ?? null;
}

/**
 * Get chapter art as a single string
 */
export function getChapterArtString(chapterId: string): string {
  const art = getChapterArt(chapterId);
  if (!art) return '';
  return art.art.join('\n');
}

/**
 * Create a generic chapter intro
 */
export function createChapterIntro(number: number, title: string, subtitle?: string): string[] {
  return [
    '',
    '═══════════════════════════════════════════════════════════',
    '',
    `               C H A P T E R   ${number}`,
    '',
    `                ${title}`,
    '',
    subtitle ? `           ${subtitle}` : '',
    '',
    '═══════════════════════════════════════════════════════════',
    '',
  ].filter(line => line !== undefined);
}
