/**
 * UI Configuration Constants
 * Centralized configuration for all UI timing, sizing, and behavior
 *
 * Following AAA game UI best practices:
 * - Single source of truth for magic numbers
 * - Easy tweaking for game feel
 * - Consistent timing across systems
 */

export const UI_CONFIG = {
  /**
   * Combat System Timings
   */
  combat: {
    /** Delay before enemy executes their action (ms) */
    enemyActionDelay: 300,

    /** Delay between turns for readability (ms) */
    turnTransitionDelay: 500,

    /** Number of upcoming turns to display in queue */
    turnQueuePreviewLength: 7,

    /** Animation duration for damage numbers (ms) */
    damageAnimationDuration: 400,

    /** Message display duration before auto-clear (ms) */
    messageDisplayDuration: 2000,
  },

  /**
   * Story/Narrative System Timings
   */
  story: {
    /** Delay for auto-advancing to next content block (ms) */
    autoAdvanceDelay: 200,

    /** Default pause duration between scenes (ms) */
    defaultPauseDuration: 1000,

    /** Typewriter speed (characters per second) */
    typewriterSpeed: 50,

    /** Faster typewriter for action sequences */
    typewriterSpeedFast: 100,

    /** Slower typewriter for dramatic moments */
    typewriterSpeedSlow: 30,
  },

  /**
   * Menu System Configuration
   */
  menus: {
    /** Maximum technique slots visible */
    maxTechniqueSlots: 4,

    /** Maximum saved games to display */
    maxSaveSlots: 10,

    /** Scroll offset for long lists */
    scrollOffset: 5,
  },

  /**
   * Layout & Sizing
   */
  layout: {
    /** Standard screen width for main UI */
    standardWidth: 84,

    /** Narrow screen width for menus */
    menuWidth: 70,

    /** Status panel width */
    statusWidth: 74,

    /** Minimum terminal height */
    minTerminalHeight: 24,

    /** Title screen content height */
    titleScreenHeight: 20,
  },

  /**
   * Performance & Rendering
   */
  performance: {
    /** Frame rate cap for terminal rendering */
    maxFps: 60,

    /** Debounce delay for resize events (ms) */
    resizeDebounce: 100,

    /** Throttle delay for input events (ms) */
    inputThrottle: 50,
  },

  /**
   * Accessibility
   */
  accessibility: {
    /** Enable screen reader hints */
    screenReaderHints: true,

    /** Show keyboard shortcuts in menus */
    showKeyboardHints: true,

    /** High contrast mode */
    highContrastMode: false,
  },
} as const;

/**
 * Type-safe access to nested config
 */
export type UIConfig = typeof UI_CONFIG;
