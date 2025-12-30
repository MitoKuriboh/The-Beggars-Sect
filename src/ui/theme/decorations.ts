/**
 * ASCII Decorative Elements for Wuxia Atmosphere
 *
 * Reusable flourishes, symbols, and decorative text for the UI.
 */

// =============================================================================
// SYMBOLS
// =============================================================================

export const SYMBOLS = {
  // Weapons & Combat
  sword: "⚔",
  crossedSwords: "⚔",
  dagger: "🗡",
  bow: "🏹",
  shield: "🛡",

  // Eastern
  yinYang: "☯",
  dragon: "🐉",
  lotus: "🪷",
  bamboo: "🎋",

  // UI
  bullet: "▸",
  bulletHollow: "▹",
  diamond: "◆",
  diamondHollow: "◇",
  star: "★",
  starHollow: "☆",
  circle: "●",
  circleHollow: "○",

  // Arrows
  arrowRight: "→",
  arrowLeft: "←",
  arrowUp: "↑",
  arrowDown: "↓",
  arrowDouble: "⟷",

  // Decorative
  flourishLeft: "═══╡",
  flourishRight: "╞═══",
  cornerTL: "╔",
  cornerTR: "╗",
  cornerBL: "╚",
  cornerBR: "╝",
};

// =============================================================================
// FLOURISHES
// =============================================================================

export const FLOURISHES = {
  // Simple horizontal lines with decorative elements
  simple: "═══════════════════════════════════════",
  withCenter: "═══════════════ ☯ ═══════════════",
  withEnds: "╡═══════════════════════════════════╞",
  withDiamond: "════════════◆════════════",
  withStars: "★═══════════════════════════════════★",

  // Decorative banners
  bannerTop:
    "╔════════════════════════════════════════════════════════════════════╗",
  bannerBottom:
    "╚════════════════════════════════════════════════════════════════════╝",

  // Cultivation themed
  chiFlow: "～～～～～～～ ॐ ～～～～～～～",
  sectBanner: "═══════ 丐帮 ═══════",
};

// =============================================================================
// CULTIVATION QUOTES
// =============================================================================

/**
 * Cultivation-themed quotes for atmosphere
 * Can be displayed in menus, loading screens, etc.
 */
export const CULTIVATION_QUOTES = [
  "The journey of a thousand li begins with a single step.",
  "In stillness, find strength. In motion, find peace.",
  "A beggar's bowl holds more wisdom than a king's treasury.",
  "The mountain does not bow to the wind.",
  "Chi flows where the mind leads.",
  "The weakest reed bends before the storm, yet stands when it passes.",
  "True strength is knowing when not to fight.",
  "The path of cultivation has no shortcuts.",
  "Even the mightiest river began as a single drop.",
  "Patience is the warrior's greatest weapon.",
];

/**
 * Get a random cultivation quote
 */
export function getRandomQuote(): string {
  const index = Math.floor(Math.random() * CULTIVATION_QUOTES.length);
  return CULTIVATION_QUOTES[index] ?? CULTIVATION_QUOTES[0]!;
}

// =============================================================================
// MENU DECORATIONS
// =============================================================================

export const MENU_DECORATIONS = {
  // Header flourish
  headerFlourish:
    "☯ ════════════════════════════════════════════════════════ ☯",

  // Footer flourish
  footerFlourish: "═══════════════ 修 行 之 路 ═══════════════",

  // Section breaks
  sectionBreak: "─────── ◆ ───────",
  sectionBreakWide: "─────────────────── ◆ ───────────────────",

  // Menu accents
  menuAccentLeft: "  ☯ ",
  menuAccentRight: " ☯  ",
};

// =============================================================================
// TITLE ELEMENTS
// =============================================================================

export const TITLE_ELEMENTS = {
  // Subtitle decorations
  subtitleLeft: "═══╡ ",
  subtitleRight: " ╞═══",

  // Version badge
  versionBadge: (version: string) => `【 v${version} 】`,
};

// =============================================================================
// COMBAT DECORATIONS
// =============================================================================

export const COMBAT_DECORATIONS = {
  // Header flourishes
  headerFlourish: "⚔ ═══════════════════════════════════════════════════════ ⚔",
  headerBoss: "⚔ ════════════════ BOSS ENCOUNTER ════════════════ ⚔",

  // Combat dividers
  combatDivider: "─────────── ⚔ ───────────",
  combatDividerWide: "───────────────────── ⚔ ─────────────────────",

  // Result banners
  victoryBanner: {
    top: "╔═══════════════════════════════════════════════════════════════╗",
    title: "║                      ✦ VICTORY ✦                             ║",
    bottom: "╚═══════════════════════════════════════════════════════════════╝",
  },
  defeatBanner: {
    top: "╔═══════════════════════════════════════════════════════════════╗",
    title: "║                      ✗ DEFEATED ✗                             ║",
    bottom: "╚═══════════════════════════════════════════════════════════════╝",
  },
  fleeBanner: {
    top: "╔═══════════════════════════════════════════════════════════════╗",
    title: "║                      ⚡ ESCAPED ⚡                             ║",
    bottom: "╚═══════════════════════════════════════════════════════════════╝",
  },

  // Combat markers
  playerTurn: "▸ YOUR TURN ◂",
  enemyTurn: "◂ ENEMY TURN ▸",

  // Stance icons
  stanceFlowing: "～",
  stanceWeathered: "◆",
  stanceHungry: "☯",
};

// =============================================================================
// STORY DECORATIONS
// =============================================================================

export const STORY_DECORATIONS = {
  // Scene header flourishes
  sceneHeader: "═══════════════════════════════════════════════════════════",
  sceneHeaderWithYinYang: "═══════════════════ ☯ ═══════════════════",

  // Chapter transitions
  chapterEnd: {
    top: "╔═══════════════════════════════════════════════════════════════╗",
    title: "║                   CHAPTER COMPLETE                            ║",
    bottom: "╚═══════════════════════════════════════════════════════════════╝",
  },
  gameEnd: {
    top: "╔═══════════════════════════════════════════════════════════════╗",
    title: "║                      THE END                                  ║",
    subtitle:
      "║             Thank you for playing                             ║",
    bottom: "╚═══════════════════════════════════════════════════════════════╝",
  },

  // Exploration
  explorationHeader: "◆ EXPLORE THE AREA ◆",
  locationMarker: "📍",
  sceneMarker: "📖",
};

// =============================================================================
// COMBAT QUOTES
// =============================================================================

/**
 * Combat-specific atmospheric quotes
 */
export const COMBAT_QUOTES = [
  "Steel meets steel.",
  "The dance of death begins.",
  "Your chi surges within.",
  "Focus. Breathe. Strike.",
  "The enemy reveals an opening.",
  "Victory awaits the prepared mind.",
  "Pain is but a teacher.",
  "Let your training guide you.",
];
