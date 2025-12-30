/**
 * Animated Title Screen
 *
 * Features:
 * - Line-by-line reveal of ASCII art
 * - Colour fade effect (dim → full colour)
 * - Staged colour transitions per section
 * - Thematic cultivation prompt with pulsing
 * - Skip on any keypress (reveals immediately)
 */

import React, { useState, useEffect, useCallback, useRef } from "react";
import { Box, Text, useInput } from "ink";
import { useLineReveal } from "../animations/textReveal";
import {
  atmosphericColors,
  animationTiming,
  type InkColor,
} from "../theme/colors";
import { SYMBOLS } from "../theme/decorations";

// =============================================================================
// TYPES
// =============================================================================

interface TitleScreenProps {
  onContinue: () => void;
}

type AnimationPhase =
  | "initial" // Black screen pause
  | "revealing" // Lines appearing
  | "colouring" // Lines shifting to full colour
  | "subtitle" // Subtitle fade in
  | "prompt" // Prompt appears
  | "ready"; // Waiting for input

// =============================================================================
// CONSTANTS
// =============================================================================

const TITLE_ART = [
  "╔════════════════════════════════════════════════════════════════╗",
  "║                                                                ║",
  "║   ████████╗██╗  ██╗███████╗                                    ║",
  "║   ╚══██╔══╝██║  ██║██╔════╝                                    ║",
  "║      ██║   ███████║█████╗                                      ║",
  "║      ██║   ██╔══██║██╔══╝                                      ║",
  "║      ██║   ██║  ██║███████╗                                    ║",
  "║      ╚═╝   ╚═╝  ╚═╝╚══════╝                                    ║",
  "║   ██████╗ ███████╗ ██████╗  ██████╗  █████╗ ██████╗ ███████╗   ║",
  "║   ██╔══██╗██╔════╝██╔════╝ ██╔════╝ ██╔══██╗██╔══██╗██╔════╝   ║",
  "║   ██████╔╝█████╗  ██║  ███╗██║  ███╗███████║██████╔╝███████╗   ║",
  "║   ██╔══██╗██╔══╝  ██║   ██║██║   ██║██╔══██║██╔══██╗╚════██║   ║",
  "║   ██████╔╝███████╗╚██████╔╝╚██████╔╝██║  ██║██║  ██║███████║   ║",
  "║   ╚═════╝ ╚══════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝   ║",
  "║   ███████╗███████╗ ██████╗████████╗                            ║",
  "║   ██╔════╝██╔════╝██╔════╝╚══██╔══╝                            ║",
  "║   ███████╗█████╗  ██║        ██║                               ║",
  "║   ╚════██║██╔══╝  ██║        ██║                               ║",
  "║   ███████║███████╗╚██████╗   ██║                               ║",
  "║   ╚══════╝╚══════╝ ╚═════╝   ╚═╝                               ║",
  "║                                                                ║",
  "║                    丐 帮 ： 李 伟 的 崛 起                     ║",
  "║                                                                ║",
  "╚════════════════════════════════════════════════════════════════╝",
];

// Enhanced decorative framing
const TOP_FLOURISH =
  "☯ ═══════════════════════════════════════════════════════════ ☯";
const BOTTOM_FLOURISH = "═══════════════════ 修 行 之 路 ═══════════════════";
const CORNER_ACCENT = "◆";

// Thematic prompts - randomly selected
const CULTIVATION_PROMPTS = [
  "Press ENTER to begin your cultivation...",
  "Press ENTER to walk the path of beggars...",
  "Press ENTER to embrace your destiny...",
  "Press ENTER to awaken your chi...",
  "Press ENTER to seek the dao...",
];

// Number of lines that lag behind for colour maturation
const COLOUR_LAG = 3;

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get the final colour for a title line based on its index
 */
function getLineColor(index: number): InkColor {
  // Border lines (top/bottom)
  if (index === 0 || index === TITLE_ART.length - 1) {
    return atmosphericColors.titleBorder;
  }
  // "THE" section (lines 2-7)
  if (index >= 2 && index <= 7) {
    return atmosphericColors.titleThe;
  }
  // "BEGGARS" section (lines 8-13)
  if (index >= 8 && index <= 13) {
    return atmosphericColors.titleBeggars;
  }
  // "SECT" section (lines 14-19)
  if (index >= 14 && index <= 19) {
    return atmosphericColors.titleSect;
  }
  // Chinese characters line
  if (index === 21) {
    return atmosphericColors.titleChinese;
  }
  // Default for decorative lines
  return "white";
}

/**
 * Get a random cultivation prompt
 */
function getRandomPrompt(): string {
  const index = Math.floor(Math.random() * CULTIVATION_PROMPTS.length);
  return CULTIVATION_PROMPTS[index] ?? CULTIVATION_PROMPTS[0]!;
}

// =============================================================================
// COMPONENT
// =============================================================================

export const TitleScreen: React.FC<TitleScreenProps> = ({ onContinue }) => {
  // Terminal dimensions
  const [terminalHeight, setTerminalHeight] = useState(
    process.stdout.rows || 24,
  );

  // Animation state
  const [phase, setPhase] = useState<AnimationPhase>("initial");
  const [maturedLines, setMaturedLines] = useState(0); // Lines with full colour
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [promptVisible, setPromptVisible] = useState(true); // For pulsing
  const [cultivationPrompt] = useState(getRandomPrompt);
  const [headerVisible, setHeaderVisible] = useState(false);

  // Refs for cleanup
  const phaseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pulseIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const maturityIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Line reveal animation
  const {
    visibleLines,
    isComplete: _revealComplete,
    skip,
  } = useLineReveal({
    lines: TITLE_ART,
    speed: animationTiming.titleLineReveal,
    delay: animationTiming.titleInitialDelay,
    autoStart: phase === "initial",
    onComplete: () => setPhase("colouring"),
  });

  // Handle terminal resize
  useEffect(() => {
    const handleResize = () => {
      setTerminalHeight(process.stdout.rows || 24);
    };
    process.stdout.on("resize", handleResize);
    return () => {
      process.stdout.off("resize", handleResize);
    };
  }, []);

  // Show header after brief delay
  useEffect(() => {
    const timeout = setTimeout(() => {
      setHeaderVisible(true);
    }, 150);
    return () => clearTimeout(timeout);
  }, []);

  // Colour maturation - lines shift from dim to full colour with a lag
  useEffect(() => {
    if (visibleLines > 0 && maturedLines < visibleLines) {
      maturityIntervalRef.current = setInterval(() => {
        setMaturedLines((prev) => {
          const target = Math.max(0, visibleLines - COLOUR_LAG);
          if (prev >= target) {
            return prev;
          }
          return prev + 1;
        });
      }, animationTiming.titleColorShift);
    }

    return () => {
      if (maturityIntervalRef.current) {
        clearInterval(maturityIntervalRef.current);
      }
    };
  }, [visibleLines, maturedLines]);

  // Phase transitions
  useEffect(() => {
    if (phase === "initial") {
      phaseTimeoutRef.current = setTimeout(() => {
        setPhase("revealing");
      }, animationTiming.titleInitialDelay);
    }

    if (phase === "colouring") {
      // Wait for all lines to mature, then show subtitle
      phaseTimeoutRef.current = setTimeout(() => {
        setMaturedLines(TITLE_ART.length);
        setPhase("subtitle");
      }, animationTiming.titleSubtitleDelay);
    }

    if (phase === "subtitle") {
      phaseTimeoutRef.current = setTimeout(() => {
        setShowSubtitle(true);
        setPhase("prompt");
      }, animationTiming.titleSubtitleDelay);
    }

    if (phase === "prompt") {
      phaseTimeoutRef.current = setTimeout(() => {
        setShowPrompt(true);
        setPhase("ready");
      }, animationTiming.titlePromptDelay);
    }

    if (phase === "ready") {
      pulseIntervalRef.current = setInterval(() => {
        setPromptVisible((prev) => !prev);
      }, animationTiming.pulseInterval);
    }

    return () => {
      if (phaseTimeoutRef.current) {
        clearTimeout(phaseTimeoutRef.current);
      }
    };
  }, [phase]);

  // Cleanup pulse interval
  useEffect(() => {
    return () => {
      if (pulseIntervalRef.current) {
        clearInterval(pulseIntervalRef.current);
      }
    };
  }, []);

  // Skip animation or continue
  const handleInput = useCallback(() => {
    if (phase !== "ready") {
      // Skip to end of animation
      skip();
      setMaturedLines(TITLE_ART.length);
      setShowSubtitle(true);
      setShowPrompt(true);
      setHeaderVisible(true);
      setPhase("ready");
    } else {
      // Proceed to menu
      onContinue();
    }
  }, [phase, skip, onContinue]);

  useInput((_input, _key) => {
    handleInput();
  });

  // Calculate how many lines to show
  const linesToShow = phase === "initial" ? 0 : visibleLines;

  /**
   * Determine if a line should be dim (not yet matured)
   */
  const isLineDim = (index: number): boolean => {
    return index >= maturedLines;
  };

  return (
    <Box
      flexDirection="column"
      width="100%"
      height={terminalHeight}
      justifyContent="center"
      alignItems="center"
    >
      <Box flexDirection="column" alignItems="center">
        {/* Top flourish - fades in */}
        <Box marginBottom={1}>
          {headerVisible ? (
            <Text color={atmosphericColors.menuAccent}>{TOP_FLOURISH}</Text>
          ) : (
            <Text color="black">{" ".repeat(TOP_FLOURISH.length)}</Text>
          )}
        </Box>

        {/* Version & decorative corners */}
        <Box marginBottom={1} justifyContent="center">
          {headerVisible ? (
            <>
              <Text color="gray">{CORNER_ACCENT}</Text>
              <Text dimColor> CLI RPG v0.3.7 </Text>
              <Text color="gray">{CORNER_ACCENT}</Text>
            </>
          ) : (
            <Text color="black"> </Text>
          )}
        </Box>

        {/* Animated title art with colour fade */}
        {TITLE_ART.slice(0, linesToShow).map((line, i) => (
          <Text
            key={i}
            color={isLineDim(i) ? "gray" : getLineColor(i)}
            dimColor={isLineDim(i)}
          >
            {line}
          </Text>
        ))}

        {/* Placeholder lines for spacing during reveal */}
        {linesToShow < TITLE_ART.length &&
          Array(TITLE_ART.length - linesToShow)
            .fill(null)
            .map((_, i) => (
              <Text key={`placeholder-${i}`} color="black">
                {" ".repeat(68)}
              </Text>
            ))}

        {/* Subtitle - fades in after title */}
        <Box marginTop={1}>
          {showSubtitle ? (
            <Text bold italic color="whiteBright">
              {SYMBOLS.star} Li Wei's Ascension {SYMBOLS.star}
            </Text>
          ) : (
            <Text color="black"> </Text>
          )}
        </Box>

        {/* Decorative separator */}
        <Box marginTop={1} marginBottom={1}>
          {showSubtitle ? (
            <Text color={atmosphericColors.menuAccent} dimColor>
              ─────────── {SYMBOLS.yinYang} ───────────
            </Text>
          ) : (
            <Text color="black"> </Text>
          )}
        </Box>

        {/* Cultivation prompt - pulses when ready */}
        <Box marginTop={1}>
          {showPrompt ? (
            <Text
              color={promptVisible ? "cyanBright" : "cyan"}
              bold={promptVisible}
              dimColor={!promptVisible}
            >
              {SYMBOLS.bullet} {cultivationPrompt} {SYMBOLS.bulletHollow}
            </Text>
          ) : (
            <Text color="black"> </Text>
          )}
        </Box>

        {/* Tagline - appears with prompt */}
        <Box marginTop={2}>
          {showPrompt ? (
            <Text dimColor italic>
              A tale of honor, chi, and redemption in the Martial Arts Haven
            </Text>
          ) : (
            <Text color="black"> </Text>
          )}
        </Box>

        {/* Bottom flourish */}
        <Box marginTop={1}>
          {showPrompt ? (
            <Text color={atmosphericColors.menuAccent} dimColor>
              {BOTTOM_FLOURISH}
            </Text>
          ) : (
            <Text color="black"> </Text>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default TitleScreen;
