/**
 * Semantic Color System for The Beggars Sect
 *
 * Provides consistent color values across the game for use with Ink's Text component
 *
 * Usage:
 * import { colors, getSpeakerColor } from '../theme/colors';
 * <Text color={colors.damage}>-50 HP</Text>
 */

// Ink Text component accepts these color values
export type InkColor =
  | "black"
  | "red"
  | "green"
  | "yellow"
  | "blue"
  | "magenta"
  | "cyan"
  | "white"
  | "gray"
  | "grey"
  | "blackBright"
  | "redBright"
  | "greenBright"
  | "yellowBright"
  | "blueBright"
  | "magentaBright"
  | "cyanBright"
  | "whiteBright";

// =============================================================================
// PATH COLORS
// =============================================================================

export const pathColors = {
  blade: "red" as InkColor,
  stream: "blue" as InkColor,
  shadow: "magenta" as InkColor,
};

// =============================================================================
// CHI & ENERGY
// =============================================================================

export const chiColors = {
  chi: "yellow" as InkColor,
  inverseChi: "yellowBright" as InkColor,
  chiDrain: "yellow" as InkColor,
  chiGain: "yellowBright" as InkColor,
};

// =============================================================================
// COMBAT STATUS
// =============================================================================

export const combatColors = {
  // Damage & Healing
  damage: "red" as InkColor,
  criticalDamage: "redBright" as InkColor,
  heal: "green" as InkColor,

  // Chi effects
  chiRestore: "yellowBright" as InkColor,
  chiCost: "yellow" as InkColor,

  // Status effects
  buff: "cyan" as InkColor,
  debuff: "magenta" as InkColor,
  stun: "red" as InkColor,
  armorBreak: "redBright" as InkColor,
  counter: "yellow" as InkColor,

  // Turn actions
  action: "cyan" as InkColor,
  technique: "yellowBright" as InkColor,
  stance: "blue" as InkColor,
};

// =============================================================================
// HEALTH STATUS
// =============================================================================

export const healthColors = {
  healthy: "green" as InkColor,
  wounded: "yellow" as InkColor,
  critical: "red" as InkColor,
  dead: "gray" as InkColor,
};

// =============================================================================
// NARRATIVE
// =============================================================================

export const narrativeColors = {
  // Content types
  narration: "gray" as InkColor,
  dialogue: "white" as InkColor,
  internal: "gray" as InkColor, // Will use italic too
  system: "cyan" as InkColor,

  // Speakers (for dialogue)
  player: "green" as InkColor,
  ally: "cyan" as InkColor,
  enemy: "red" as InkColor,
  elder: "yellow" as InkColor,
  beggar: "cyan" as InkColor,
  neutral: "white" as InkColor,
  voice: "magenta" as InkColor,

  // Chi voices (special)
  chiVoiceInverse: "yellow" as InkColor,
  chiVoiceFlowing: "blue" as InkColor,
  chiVoiceWeathered: "gray" as InkColor,
  chiVoiceHungry: "red" as InkColor,
};

// =============================================================================
// UI ELEMENTS
// =============================================================================

export const uiColors = {
  // Headers & Titles
  header: "cyan" as InkColor,
  title: "white" as InkColor,
  subtitle: "gray" as InkColor,

  // Interactive elements
  selected: "cyan" as InkColor,
  unselected: "white" as InkColor,
  disabled: "gray" as InkColor,

  // Feedback
  success: "green" as InkColor,
  warning: "yellow" as InkColor,
  error: "red" as InkColor,
  info: "cyan" as InkColor,

  // Progress indicators
  progressFull: "green" as InkColor,
  progressMid: "yellow" as InkColor,
  progressLow: "red" as InkColor,
  progressEmpty: "gray" as InkColor,
};

// =============================================================================
// SPECIAL EFFECTS
// =============================================================================

export const effectColors = {
  pendantGlow: "yellow" as InkColor,
  flash: "white" as InkColor,
  fade: "gray" as InkColor,
  emphasis: "whiteBright" as InkColor,
};

// =============================================================================
// ACCESSIBILITY - COLOUR-BLIND SYMBOLS
// =============================================================================

/**
 * Symbol prefixes for status effects to aid colour-blind players
 * Used in combat messages when high contrast mode is enabled
 */
export const EFFECT_SYMBOLS = {
  damage: "[!]",
  criticalDamage: "[!!]",
  heal: "[+]",
  chiRestore: "[*]",
  chiCost: "[-]",
  buff: "[^]",
  debuff: "[v]",
  stun: "[#]",
  armorBreak: "[/]",
  counter: "[<]",
} as const;

export type EffectSymbolType = keyof typeof EFFECT_SYMBOLS;

/**
 * Get effect symbol for accessibility
 * Returns empty string if high contrast mode is disabled
 */
export function getEffectSymbol(
  effectType: EffectSymbolType,
  highContrastEnabled: boolean = false,
): string {
  if (!highContrastEnabled) return "";
  return EFFECT_SYMBOLS[effectType] + " ";
}

// =============================================================================
// ATMOSPHERIC / TITLE SEQUENCE
// =============================================================================

/**
 * Wuxia-themed atmospheric colours for title screen and transitions
 * Evokes jade, gold, ink, and cultivation aesthetics
 */
export const atmosphericColors = {
  // Title sequence
  titleBorder: "yellow" as InkColor, // Gold border - prestige
  titleThe: "cyan" as InkColor, // "THE" - ethereal
  titleBeggars: "magenta" as InkColor, // "BEGGARS" - sect identity
  titleSect: "green" as InkColor, // "SECT" - jade/cultivation
  titleChinese: "white" as InkColor, // Chinese characters
  titleSubtitle: "white" as InkColor, // Li Wei's Ascension

  // Reveal animation phases
  revealDim: "gray" as InkColor, // Starting dim state
  revealMid: "white" as InkColor, // Mid-reveal
  revealFull: "whiteBright" as InkColor, // Full brightness

  // Transitions
  transitionFade: "gray" as InkColor, // Fading out
  transitionWipe: "blackBright" as InkColor, // Wipe effect

  // Menu atmosphere
  menuAccent: "yellow" as InkColor, // Gold accents
  menuGlow: "cyan" as InkColor, // Selected item glow
  cultivationHint: "green" as InkColor, // Cultivation references
};

/**
 * Animation timing presets (in milliseconds)
 */
export const animationTiming = {
  // Title sequence
  titleInitialDelay: 300, // Pause before reveal starts
  titleCharReveal: 25, // Per-character reveal speed
  titleLineReveal: 80, // Per-line reveal speed
  titleColorShift: 150, // Colour transition timing
  titleSubtitleDelay: 400, // Pause before subtitle
  titlePromptDelay: 600, // Pause before "Press Enter"

  // Transitions
  transitionFadeDuration: 200,
  transitionWipeDuration: 150,

  // General
  pulseInterval: 800, // Pulsing effect cycle
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get color for a path by name
 */
export function getPathColor(path: "blade" | "stream" | "shadow"): InkColor {
  return pathColors[path];
}

/**
 * Get color based on health percentage
 */
export function getHealthColor(percentage: number): InkColor {
  if (percentage > 60) return healthColors.healthy;
  if (percentage > 30) return healthColors.wounded;
  if (percentage > 0) return healthColors.critical;
  return healthColors.dead;
}

/**
 * Get color for progress indicators
 */
export function getProgressColor(percentage: number): InkColor {
  if (percentage > 66) return uiColors.progressFull;
  if (percentage > 33) return uiColors.progressMid;
  return uiColors.progressLow;
}

/**
 * Color a delta value (positive = green, negative = red)
 */
export function getDeltaColor(value: number): InkColor {
  if (value > 0) return combatColors.heal;
  if (value < 0) return combatColors.damage;
  return "white";
}

/**
 * Get speaker color by name/type
 * Enhanced version of the one in ContentRenderer
 */
export function getSpeakerColor(speaker: string): InkColor {
  const upper = speaker.toUpperCase();

  // Player
  if (upper.includes("LI WEI") || upper.includes("YOU")) {
    return narrativeColors.player;
  }

  // Mysterious voices
  if (upper.includes("VOICE") || upper.includes("WHISPER")) {
    return narrativeColors.voice;
  }

  // Elders and important characters
  if (
    upper.includes("OLD DAO") ||
    upper.includes("DAO") ||
    upper.includes("ELDER")
  ) {
    return narrativeColors.elder;
  }

  // Enemies/Hostile
  if (
    upper.includes("THUG") ||
    upper.includes("PUNK") ||
    upper.includes("BRAWLER") ||
    upper.includes("SPARTAN") ||
    upper.includes("RAZOR") ||
    upper.includes("VEX") ||
    upper.includes("HOLLOW")
  ) {
    return narrativeColors.enemy;
  }

  // Beggars Sect members
  if (
    upper.includes("BEGGAR") ||
    upper.includes("RAT") ||
    upper.includes("FENG")
  ) {
    return narrativeColors.beggar;
  }

  // Generic NPCs
  return narrativeColors.neutral;
}

// =============================================================================
// COMBINED EXPORT
// =============================================================================

export const colors = {
  ...pathColors,
  ...chiColors,
  ...combatColors,
  ...healthColors,
  ...narrativeColors,
  ...uiColors,
  ...effectColors,
  ...atmosphericColors,
};

export default colors;
