import React, { useState, useCallback, useRef } from "react";
import { Box, Text, useApp, useInput } from "ink";

import { GameStore } from "../game/state/GameStore";
import {
  createPlayer,
  createEnemy,
  createTrainingDummy,
  scaleEnemyForChapter,
} from "../game/factories/CharacterFactory";
import {
  getChallengeById,
  completeChallengeAttempt,
  calculateMasteryGain,
  getMasteryBreakdown,
} from "../game/training/TrainingManager";
import type { CombatPerformanceMetrics } from "./combat/CombatScreen";
import { CombatScreen } from "./combat/CombatScreen";
import { StoryScreen } from "./story/StoryScreen";
import { TrainingMenu } from "./training/TrainingMenu";
import { SaveLoadScreen } from "./SaveLoadScreen";
import { SettingsScreen } from "./SettingsScreen";
import { CenteredScreen, PolishedBox } from "./components/PolishedBox";
import { SelectMenu } from "./components/Menu";
import { TitleScreen } from "./screens/TitleScreen";
import { DIVIDERS } from "./theme/dividers";
import { MENU_DECORATIONS, getRandomQuote, SYMBOLS } from "./theme/decorations";
import { atmosphericColors } from "./theme/colors";
import type { Character, Enemy, StoryState } from "../types/index";

// =============================================================================
// TYPES
// =============================================================================

type Screen =
  | "title"
  | "menu"
  | "newgame"
  | "skip-prologue"
  | "stats"
  | "story"
  | "combat"
  | "training"
  | "credits"
  | "save"
  | "load"
  | "settings";

interface MenuItem {
  label: string;
  value: string;
}

// =============================================================================
// COMPONENTS
// =============================================================================

// TitleScreen moved to ./screens/TitleScreen.tsx (animated version)

/**
 * Main Menu - New Game, Load, Credits, Quit
 */
const MainMenu: React.FC<{ onSelect: (screen: Screen) => void }> = ({
  onSelect,
}) => {
  const { exit } = useApp();
  const isGameActive = GameStore.isInitialized();
  const hasSaves = GameStore.getSaveSlots().length > 0;

  // Random cultivation quote for atmosphere
  const [quote] = useState(getRandomQuote);

  // Always show all menu items for consistent box size
  const menuItems: MenuItem[] = [
    {
      label: `${SYMBOLS.bullet} Continue Journey`,
      value: isGameActive ? "stats" : "disabled-continue",
    },
    { label: `${SYMBOLS.star} New Game`, value: "newgame" },
    {
      label: `${SYMBOLS.arrowRight} Skip to Chapter 1`,
      value: "skip-prologue",
    },
    {
      label: `${SYMBOLS.diamond} Load Game`,
      value: hasSaves ? "load" : "disabled-load",
    },
    { label: `${SYMBOLS.circle} Settings`, value: "settings" },
    { label: `${SYMBOLS.starHollow} Credits`, value: "credits" },
    { label: `${SYMBOLS.arrowLeft} Quit`, value: "quit" },
  ];

  const handleSelect = useCallback(
    (item: MenuItem) => {
      // Ignore disabled items
      if (item.value.startsWith("disabled-")) {
        return;
      }

      if (item.value === "quit") {
        exit();
      } else {
        onSelect(item.value as Screen);
      }
    },
    [exit, onSelect],
  );

  // Game status info (only if game is active)
  const progress = isGameActive ? GameStore.getState().storyProgress : null;
  const player = isGameActive ? GameStore.getPlayer() : null;

  return (
    <CenteredScreen>
      <Box flexDirection="column" alignItems="center">
        {/* Top flourish */}
        <Box marginBottom={1}>
          <Text color={atmosphericColors.menuAccent}>
            {MENU_DECORATIONS.headerFlourish}
          </Text>
        </Box>

        <Box
          flexDirection="column"
          borderStyle="double"
          borderColor="yellow"
          paddingX={2}
          paddingY={0}
          width={74}
        >
          {/* Header with Yin-Yang */}
          <Box marginY={1} justifyContent="center">
            <Text color={atmosphericColors.titleBorder}>{SYMBOLS.yinYang}</Text>
            <Text bold color={atmosphericColors.titleThe}>
              {" "}
              THE BEGGARS SECT{" "}
            </Text>
            <Text color={atmosphericColors.titleBorder}>{SYMBOLS.yinYang}</Text>
          </Box>

          {/* Subtitle - Chinese characters */}
          <Box justifyContent="center" marginBottom={1}>
            <Text dimColor italic color={atmosphericColors.titleChinese}>
              丐 帮 ： 李 伟 的 崛 起
            </Text>
          </Box>

          {/* Decorative section break */}
          <Box justifyContent="center">
            <Text color={atmosphericColors.menuAccent}>
              {MENU_DECORATIONS.sectionBreak}
            </Text>
          </Box>

          {/* Current game status (if active) */}
          {isGameActive && player && progress && (
            <>
              <Box flexDirection="column" alignItems="center" marginY={1}>
                <Text color={atmosphericColors.cultivationHint} bold>
                  {SYMBOLS.diamond} CURRENT JOURNEY {SYMBOLS.diamond}
                </Text>
                <Box marginTop={1}>
                  <Text bold color="yellow">
                    {player.name}
                  </Text>
                  <Text dimColor> • </Text>
                  <Text color="magenta">
                    {player.stance.charAt(0).toUpperCase() +
                      player.stance.slice(1)}
                  </Text>
                </Box>
                <Text dimColor>
                  Chapter {progress.chapter} • Scene {progress.scene}
                </Text>
              </Box>

              {/* Divider */}
              <Box justifyContent="center">
                <Text color={atmosphericColors.menuAccent}>
                  {MENU_DECORATIONS.sectionBreak}
                </Text>
              </Box>
            </>
          )}

          {/* Menu */}
          <Box paddingY={2} flexDirection="column" alignItems="center">
            <SelectMenu items={menuItems} onSelect={handleSelect} />
          </Box>

          {/* Cultivation quote */}
          <Box justifyContent="center">
            <Text color={atmosphericColors.menuAccent}>
              {MENU_DECORATIONS.sectionBreak}
            </Text>
          </Box>
          <Box marginY={1} justifyContent="center" paddingX={2}>
            <Text dimColor italic wrap="wrap">
              "{quote}"
            </Text>
          </Box>

          {/* Footer */}
          <Box justifyContent="center">
            <Text color="gray" dimColor>
              {DIVIDERS.short}
            </Text>
          </Box>
          <Box marginY={1} justifyContent="center">
            <Text dimColor>v0.3.7 • ↑↓ navigate • Enter select</Text>
          </Box>
        </Box>

        {/* Bottom flourish */}
        <Box marginTop={1}>
          <Text color={atmosphericColors.menuAccent} dimColor>
            {MENU_DECORATIONS.footerFlourish}
          </Text>
        </Box>
      </Box>
    </CenteredScreen>
  );
};

/**
 * New Game Screen - Initialize game state
 */
const NewGameScreen: React.FC<{
  onComplete: () => void;
  onBack: () => void;
}> = ({ onComplete, onBack }) => {
  const [stage, setStage] = useState<
    "confirm" | "difficulty" | "creating" | "done"
  >("confirm");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- used to track selection for potential UI display
  const [_selectedDifficulty, setSelectedDifficulty] = useState<
    "easy" | "medium" | "hard" | "hell"
  >("medium");
  const completionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (completionTimeoutRef.current) {
        clearTimeout(completionTimeoutRef.current);
      }
    };
  }, []);

  const handleConfirm = useCallback(
    (item: MenuItem) => {
      if (item.value === "yes") {
        setStage("difficulty");
      } else {
        onBack();
      }
    },
    [onBack],
  );

  const handleDifficultySelect = useCallback(
    (item: MenuItem) => {
      if (item.value === "back") {
        setStage("confirm");
        return;
      }

      const difficulty = item.value as "easy" | "medium" | "hard" | "hell";
      setSelectedDifficulty(difficulty);
      setStage("creating");

      // Initialize game with selected difficulty
      const player = createPlayer();
      GameStore.initializeNewGame(player, difficulty);
      setStage("done");

      completionTimeoutRef.current = setTimeout(() => {
        completionTimeoutRef.current = null;
        onComplete();
      }, 1000);
    },
    [onComplete],
  );

  if (stage === "confirm") {
    const confirmItems: MenuItem[] = [
      { label: "Yes, Begin Journey", value: "yes" },
      { label: "No, Return to Menu", value: "no" },
    ];
    return (
      <CenteredScreen>
        <PolishedBox title="NEW GAME" subtitle="Begin Your Journey" icon="⚡">
          <Box flexDirection="column" alignItems="center" marginBottom={2}>
            <Text>You are about to begin a new journey as</Text>
            <Text bold color="yellow">
              Li Wei
            </Text>
            <Text dimColor>a beggar with no memory of his past.</Text>
          </Box>
          <SelectMenu items={confirmItems} onSelect={handleConfirm} />
        </PolishedBox>
      </CenteredScreen>
    );
  }

  if (stage === "difficulty") {
    const difficultyItems: MenuItem[] = [
      {
        label: "🌸 Easy - Forgiving enemies, gentle introduction",
        value: "easy",
      },
      {
        label: "⚔️  Medium - Balanced challenge (Recommended)",
        value: "medium",
      },
      { label: "🔥 Hard - Demanding combat, tactical thinking", value: "hard" },
      { label: "💀 Hell - Brutal, relentless, unforgiving", value: "hell" },
      { label: "← Back", value: "back" },
    ];
    return (
      <CenteredScreen>
        <PolishedBox
          title="DIFFICULTY SELECTION"
          subtitle="Choose Your Challenge"
          icon="⚡"
        >
          <Box flexDirection="column" marginBottom={2}>
            <Text bold color="yellow">
              Select Difficulty:
            </Text>
            <Box marginTop={1}>
              <Text dimColor>
                Difficulty affects enemy AI quality, stats, and player damage.
              </Text>
            </Box>
            <Box marginTop={1}>
              <Text dimColor italic>
                You can change this later in Settings (coming soon).
              </Text>
            </Box>
          </Box>

          <Box marginBottom={2}>
            <SelectMenu
              items={difficultyItems}
              onSelect={handleDifficultySelect}
            />
          </Box>

          <Box
            flexDirection="column"
            paddingX={2}
            paddingY={1}
            borderStyle="round"
            borderColor="gray"
          >
            <Text bold color="cyan">
              Difficulty Details:
            </Text>
            <Box marginTop={0.5} flexDirection="column">
              <Text dimColor>
                • Easy: Enemies make mistakes 30% of the time
              </Text>
              <Text dimColor>• Medium: Standard AI behavior</Text>
              <Text dimColor>• Hard: Optimal enemy tactics, +30% damage</Text>
              <Text dimColor>• Hell: Perfect AI, +50% stats, relentless</Text>
            </Box>
          </Box>
        </PolishedBox>
      </CenteredScreen>
    );
  }

  if (stage === "creating") {
    return (
      <CenteredScreen>
        <Box
          flexDirection="column"
          alignItems="center"
          borderStyle="round"
          borderColor="yellow"
          paddingX={4}
          paddingY={2}
        >
          <Text color="yellow">✨ Awakening in the alley... ✨</Text>
        </Box>
      </CenteredScreen>
    );
  }

  return (
    <CenteredScreen>
      <Box
        flexDirection="column"
        alignItems="center"
        borderStyle="round"
        borderColor="green"
        paddingX={4}
        paddingY={2}
      >
        <Text bold color="green">
          ✓ Li Wei opens his eyes.
        </Text>
      </Box>
    </CenteredScreen>
  );
};

/**
 * Player Stats Screen - Show current character status
 */
const StatsScreen: React.FC<{
  onBack: () => void;
  onCombat: () => void;
  onStory: () => void;
  onSave: () => void;
  onTraining: () => void;
}> = ({ onBack, onCombat, onStory, onSave, onTraining }) => {
  const menuItems: MenuItem[] = [
    { label: "📖 Play Story (Prologue)", value: "story" },
    { label: "🥋 Training Grounds", value: "training" },
    { label: "⚔️  Test Combat", value: "combat" },
    { label: "💾 Save Game", value: "save" },
    { label: "Back to Menu", value: "back" },
  ];

  const handleSelect = useCallback(
    (item: MenuItem) => {
      if (item.value === "back") {
        onBack();
      } else if (item.value === "combat") {
        onCombat();
      } else if (item.value === "story") {
        onStory();
      } else if (item.value === "save") {
        onSave();
      } else if (item.value === "training") {
        onTraining();
      }
    },
    [onBack, onCombat, onStory, onSave, onTraining],
  );

  if (!GameStore.isInitialized()) {
    return (
      <CenteredScreen>
        <Box
          flexDirection="column"
          alignItems="center"
          borderStyle="round"
          borderColor="red"
          paddingX={4}
          paddingY={2}
        >
          <Text bold color="red">
            ✗ No game in progress.
          </Text>
        </Box>
      </CenteredScreen>
    );
  }

  const player = GameStore.getPlayer();
  const progress = GameStore.getStoryProgress();

  return (
    <CenteredScreen>
      <PolishedBox
        title="CHARACTER STATUS"
        subtitle={`${player.name} • The Beggar`}
        icon="⚔"
        footer="Select an option to continue"
      >
        {/* Stats */}
        <Box flexDirection="column" alignItems="center" width={55}>
          <Box flexDirection="row" justifyContent="space-between" width="100%">
            <Text>
              HP:{" "}
              <Text color={player.hp < player.maxHp * 0.3 ? "red" : "green"}>
                {player.hp}/{player.maxHp}
              </Text>
            </Text>
            <Text>
              Chi:{" "}
              <Text color="blue">
                {player.chi}/{player.maxChi}
              </Text>
            </Text>
          </Box>
          <Box flexDirection="row" justifyContent="space-between" width="100%">
            <Text>
              Inv.Chi:{" "}
              <Text color="magenta">
                {player.inverseChi}/{player.maxInverseChi}
              </Text>
            </Text>
            <Text>
              Stance: <Text color="cyan">{player.stance}</Text>
            </Text>
          </Box>

          <Box marginTop={1}>
            <Text dimColor>━━━━━━━ Base Stats ━━━━━━━</Text>
          </Box>
          <Box flexDirection="row" justifyContent="space-around" width="100%">
            <Text>
              STR:
              <Text bold color="yellow">
                {player.stats.str}
              </Text>
            </Text>
            <Text>
              DEX:
              <Text bold color="yellow">
                {player.stats.dex}
              </Text>
            </Text>
            <Text>
              END:
              <Text bold color="yellow">
                {player.stats.end}
              </Text>
            </Text>
            <Text>
              WIS:
              <Text bold color="yellow">
                {player.stats.wis}
              </Text>
            </Text>
          </Box>

          <Box marginTop={1}>
            <Text dimColor>
              Ch.{progress.chapter} • Scene {progress.scene}
            </Text>
          </Box>
          <Text dimColor>
            Techniques: {player.techniques.slice(0, 2).join(", ")}
            {player.techniques.length > 2 ? "..." : ""}
          </Text>
        </Box>

        {/* Menu */}
        <Box marginTop={1}>
          <SelectMenu items={menuItems} onSelect={handleSelect} />
        </Box>
      </PolishedBox>
    </CenteredScreen>
  );
};

/**
 * Credits Screen
 */
const CreditsScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  useInput((_input, key) => {
    if (key.escape || key.return) {
      onBack();
    }
  });

  return (
    <CenteredScreen>
      <PolishedBox
        title="CREDITS"
        subtitle="丐 帮 ： 李 伟 的 崛 起"
        icon="═"
        footer="▸ Press Enter or Escape to return ◂"
        borderColor="cyan"
      >
        <Box flexDirection="column" alignItems="center">
          <Text bold color="yellow">
            The Beggars Sect
          </Text>
          <Text bold color="yellow">
            Li Wei's Ascension
          </Text>
        </Box>

        <Box marginTop={1} flexDirection="column" alignItems="center">
          <Text dimColor>Created by</Text>
          <Text bold color="yellow">
            Mito (Mitchell Grebe)
          </Text>
          <Text dimColor>With assistance from Claude</Text>
        </Box>

        <Box marginTop={1} flexDirection="column" alignItems="center">
          <Text dimColor>
            Part of the <Text color="cyan">genkaw.com</Text> universe
          </Text>
        </Box>

        <Box marginTop={1} flexDirection="column" alignItems="center">
          <Text dimColor>Built with</Text>
          <Text color="magenta">Ink • React • TypeScript</Text>
        </Box>

        <Box marginTop={1}>
          <Text dimColor>Version 0.3.7</Text>
        </Box>
      </PolishedBox>
    </CenteredScreen>
  );
};

// =============================================================================
// MAIN APP
// =============================================================================

export const App: React.FC = () => {
  const [screen, setScreen] = useState<Screen>("title");
  const [combatEnemies, setCombatEnemies] = useState<Enemy[]>([]);
  const [returnToStory, setReturnToStory] = useState(false);
  const [returnToTraining, setReturnToTraining] = useState(false);
  const [storyCombatResult, setStoryCombatResult] = useState<
    "victory" | "defeat" | "fled" | null
  >(null);
  const [combatCanLose, setCombatCanLose] = useState(true);
  const [activeChallengeId, setActiveChallengeId] = useState<string | null>(
    null,
  );
  const [lastChallengeResult, setLastChallengeResult] = useState<{
    challengeName: string;
    passed: boolean;
    masteryEarned: number;
    techniqueUnlocked?: string;
  } | null>(null);
  const [lastSparringResult, setLastSparringResult] = useState<{
    won: boolean;
    masteryEarned: number;
    bonuses: { reason: string; amount: number }[];
  } | null>(null);

  // Timeout ref for combat retry screen transition
  const combatRetryTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (combatRetryTimeoutRef.current) {
        clearTimeout(combatRetryTimeoutRef.current);
      }
    };
  }, []);

  /* eslint-disable no-console -- intentional CLI screen clears for terminal game */
  const goToMenu = useCallback(() => {
    console.clear();
    setScreen("menu");
  }, []);
  const goToStats = useCallback(() => {
    console.clear();
    setScreen("stats");
  }, []);
  const goToStory = useCallback(() => {
    console.clear();
    setScreen("story");
  }, []);
  const goToSave = useCallback(() => {
    console.clear();
    setScreen("save");
  }, []);
  const _goToLoad = useCallback(() => {
    console.clear();
    setScreen("load");
  }, []);
  const goToTraining = useCallback(() => {
    console.clear();
    setScreen("training");
  }, []);
  /* eslint-enable no-console */

  /* eslint-disable no-console -- intentional CLI screen clears for terminal game */
  const startCombat = useCallback(() => {
    console.clear();
    // Create a test enemy
    const enemy = createEnemy("street-punk");
    setCombatEnemies([enemy]);
    setReturnToStory(false);
    setScreen("combat");
  }, []);

  // Handle combat starting from story
  const handleStoryCombat = useCallback(
    (enemies: Enemy[], canLose: boolean) => {
      console.clear();
      setCombatEnemies(enemies);
      setReturnToStory(true);
      setReturnToTraining(false);
      setCombatCanLose(canLose);
      setScreen("combat");
    },
    [],
  );

  // Handle sparring match from training
  const handleSparring = useCallback(() => {
    console.clear();
    const player = GameStore.getPlayer();
    const difficulty = GameStore.getState()?.difficulty || "medium";
    const dummy = createTrainingDummy(player, difficulty);
    setCombatEnemies([dummy]);
    setReturnToStory(false);
    setReturnToTraining(true);
    setActiveChallengeId(null);
    setCombatCanLose(true); // Can lose sparring
    setScreen("combat");
  }, []);

  // Handle training challenge
  const handleChallenge = useCallback((challengeId: string) => {
    console.clear();
    const challenge = getChallengeById(challengeId);
    if (!challenge) {
      console.error(`Challenge not found: ${challengeId}`);
      return;
    }
    const enemy = createEnemy(challenge.opponentId);
    setCombatEnemies([enemy]);
    setReturnToStory(false);
    setReturnToTraining(true);
    setActiveChallengeId(challengeId);
    setCombatCanLose(true);
    setScreen("combat");
  }, []);
  /* eslint-enable no-console */

  // Handle story completion
  const handleStoryEnd = useCallback(
    (_state: StoryState) => {
      // Story ended - could save state here
      goToStats();
    },
    [goToStats],
  );

  const handleCombatEnd = useCallback(
    (
      result: "victory" | "defeat" | "fled",
      updatedPlayer: Character,
      performance?: CombatPerformanceMetrics,
    ) => {
      // Process challenge results if this was a challenge fight
      if (activeChallengeId && performance) {
        const player = GameStore.getPlayer();
        const challengePerformance = {
          won: performance.won,
          turns: performance.turns,
          damageTaken: performance.damageTaken,
          damageDealt: performance.damageDealt,
          combosExecuted: performance.combosExecuted,
          stanceSwitches: performance.stanceSwitches,
          techniquesUsed: performance.techniquesUsed,
        };

        const challengeResult = completeChallengeAttempt(
          player,
          activeChallengeId,
          challengePerformance,
        );

        // Get challenge name for display
        const challenge = getChallengeById(activeChallengeId);

        // Store result for UI feedback
        setLastChallengeResult({
          challengeName: challenge?.name || activeChallengeId,
          passed: challengeResult.passed,
          masteryEarned: challengeResult.rewardsEarned.masteryPoints,
          techniqueUnlocked: challengeResult.rewardsEarned.techniqueTaught,
        });

        // Update player with challenge rewards (already applied by completeChallengeAttempt)
        GameStore.updatePlayer({
          trainingProgress: player.trainingProgress,
          techniques: player.techniques,
        });

        setActiveChallengeId(null);
      }

      // Update player state in GameStore
      if (result === "victory") {
        // Sync player state from combat
        GameStore.updatePlayer({
          hp: updatedPlayer.hp,
          chi: updatedPlayer.chi,
          inverseChi: updatedPlayer.inverseChi,
          masteryLevels: updatedPlayer.masteryLevels,
          statusEffects: [],
        });
      } else if (result === "defeat") {
        // If this combat can't be lost (tutorial), restart it
        if (returnToStory && !combatCanLose) {
          // Restore HP and restart combat
          const player = GameStore.getPlayer();
          GameStore.updatePlayer({
            hp: player.maxHp,
            chi: player.maxChi,
            statusEffects: [],
          });
          // Recreate enemies with chapter scaling and restart combat
          const currentChapter = GameStore.getState().storyProgress.chapter;
          const newEnemies = combatEnemies.map((e) => {
            const enemy = createEnemy(e.templateId);
            scaleEnemyForChapter(enemy, currentChapter);
            return enemy;
          });
          setCombatEnemies(newEnemies);
          // Force re-render by briefly changing screen
          setScreen("story");
          combatRetryTimeoutRef.current = setTimeout(() => {
            combatRetryTimeoutRef.current = null;
            setScreen("combat");
          }, 0);
          return;
        }
        // Normal defeat - restore some HP
        const player = GameStore.getPlayer();
        GameStore.updatePlayer({
          hp: Math.floor(player.maxHp * 0.3),
          chi: player.maxChi,
          statusEffects: [],
        });
      } else {
        // Fled - keep current state but clear status effects
        GameStore.updatePlayer({
          hp: updatedPlayer.hp,
          chi: updatedPlayer.chi,
          statusEffects: [],
        });
      }

      // Return to story or stats depending on where combat started
      if (returnToStory) {
        setStoryCombatResult(result);
        goToStory();
      } else if (returnToTraining) {
        // Calculate sparring mastery if this wasn't a challenge (challenge results handled above)
        if (!activeChallengeId && performance) {
          const player = GameStore.getPlayer();
          const sparringPerformance = {
            won: performance.won,
            turns: performance.turns,
            damageTaken: performance.damageTaken,
            damageDealt: performance.damageDealt,
            combosExecuted: performance.combosExecuted,
            stanceSwitches: performance.stanceSwitches,
            techniquesUsed: performance.techniquesUsed,
          };
          const breakdown = getMasteryBreakdown(sparringPerformance);
          const totalMastery = calculateMasteryGain(sparringPerformance);

          // Update player training progress
          if (player.trainingProgress) {
            player.trainingProgress.masteryPoints += totalMastery;
            if (performance.won) {
              player.trainingProgress.sparringWins += 1;
            }
            // Update best performance
            if (
              performance.turns <
                player.trainingProgress.bestPerformance.fastestWin ||
              player.trainingProgress.bestPerformance.fastestWin === 0
            ) {
              player.trainingProgress.bestPerformance.fastestWin =
                performance.turns;
            }
            if (
              performance.damageDealt >
              player.trainingProgress.bestPerformance.mostDamage
            ) {
              player.trainingProgress.bestPerformance.mostDamage =
                performance.damageDealt;
            }
            if (
              performance.combosExecuted >
              player.trainingProgress.bestPerformance.longestCombo
            ) {
              player.trainingProgress.bestPerformance.longestCombo =
                performance.combosExecuted;
            }
            GameStore.updatePlayer({
              trainingProgress: player.trainingProgress,
            });
          }

          // Store result for UI feedback
          setLastSparringResult({
            won: performance.won,
            masteryEarned: totalMastery,
            bonuses: breakdown.bonuses.filter((b) => b.amount > 0),
          });
        }
        goToTraining();
      } else {
        goToStats();
      }
    },
    [
      goToStats,
      goToStory,
      goToTraining,
      returnToStory,
      returnToTraining,
      combatCanLose,
      combatEnemies,
      activeChallengeId,
    ],
  );

  const handleCombatResultHandled = useCallback(() => {
    setStoryCombatResult(null);
  }, []);

  const handleChallengeResultDismiss = useCallback(() => {
    setLastChallengeResult(null);
  }, []);

  const handleSparringResultDismiss = useCallback(() => {
    setLastSparringResult(null);
  }, []);

  return (
    <Box flexDirection="column">
      {screen === "title" && <TitleScreen onContinue={goToMenu} />}
      {screen === "menu" && <MainMenu onSelect={setScreen} />}
      {screen === "newgame" && (
        <NewGameScreen onComplete={goToStats} onBack={goToMenu} />
      )}
      {screen === "skip-prologue" && (
        <NewGameScreen
          onComplete={() => {
            // Skip prologue - start at Chapter 1 with some mastery
            GameStore.updateStoryProgress({
              chapter: 1,
              scene: "1-1-hidden-home",
              completedScenes: [
                "prologue-awakening",
                "prologue-first-breath",
                "prologue-proving",
                "prologue-welcome",
              ],
            });
            // Grant mastery equivalent to completing prologue training
            const player = GameStore.getPlayer();
            if (player.trainingProgress) {
              player.trainingProgress.masteryPoints = 50;
              player.trainingProgress.sparringWins = 3;
              GameStore.updatePlayer({
                trainingProgress: player.trainingProgress,
              });
            }
            goToStats();
          }}
          onBack={goToMenu}
        />
      )}
      {screen === "stats" && (
        <StatsScreen
          onBack={goToMenu}
          onCombat={startCombat}
          onStory={goToStory}
          onSave={goToSave}
          onTraining={goToTraining}
        />
      )}
      {screen === "story" && GameStore.isInitialized() && (
        <StoryScreen
          player={GameStore.getPlayer()}
          onCombatStart={handleStoryCombat}
          onGameEnd={handleStoryEnd}
          onQuitToMenu={goToMenu}
          combatResult={storyCombatResult}
          onCombatResultHandled={handleCombatResultHandled}
        />
      )}
      {screen === "combat" && GameStore.isInitialized() && (
        <CombatScreen
          player={GameStore.getPlayer()}
          enemies={combatEnemies}
          onCombatEnd={handleCombatEnd}
        />
      )}
      {screen === "training" && GameStore.isInitialized() && (
        <TrainingMenu
          player={GameStore.getPlayer()}
          onSparring={handleSparring}
          onChallenge={handleChallenge}
          onClose={goToStats}
          lastChallengeResult={lastChallengeResult}
          onChallengeResultDismiss={handleChallengeResultDismiss}
          lastSparringResult={lastSparringResult}
          onSparringResultDismiss={handleSparringResultDismiss}
        />
      )}
      {screen === "credits" && <CreditsScreen onBack={goToMenu} />}
      {screen === "settings" && <SettingsScreen onBack={goToMenu} />}
      {screen === "save" && (
        <SaveLoadScreen mode="save" onComplete={goToStats} onBack={goToStats} />
      )}
      {screen === "load" && (
        <SaveLoadScreen mode="load" onComplete={goToStats} onBack={goToMenu} />
      )}
    </Box>
  );
};
