/**
 * Combat Screen
 * Main combat UI that orchestrates all combat components
 */

import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { Box, Text, useInput } from "ink";
import type {
  Character,
  Enemy,
  CombatState,
  Technique,
  Stance,
} from "../../types/index";
import {
  CombatEngine,
  AIController,
  getTechniquesForCharacter,
} from "../../game/combat";

import { TurnQueue } from "./TurnQueue";
import { CharacterStatus } from "./HealthBar";
import { ActionMenu, ActionType } from "./ActionMenu";
import { TechniqueMenu } from "./TechniqueMenu";
import { StanceMenu } from "./StanceMenu";
import { TargetMenu } from "./TargetMenu";
import { CenteredScreen } from "../components/PolishedBox";
import { COMBAT_DECORATIONS, COMBAT_QUOTES } from "../theme/decorations";
import { atmosphericColors } from "../theme/colors";
import { UI_CONFIG } from "../config/constants";

// =============================================================================
// CONSTANTS
// =============================================================================

const { combat: COMBAT_CONFIG } = UI_CONFIG;

// Get a random combat quote for atmosphere
function getRandomCombatQuote(): string {
  const index = Math.floor(Math.random() * COMBAT_QUOTES.length);
  return COMBAT_QUOTES[index] ?? COMBAT_QUOTES[0]!;
}

// =============================================================================
// TYPES
// =============================================================================

type CombatPhase =
  | "initial-stance-select" // Initial stance selection before combat
  | "action-select" // Player choosing action
  | "technique-select" // Player choosing technique
  | "stance-select" // Player choosing stance
  | "target-select" // Player choosing target
  | "enemy-turn" // Enemy is acting
  | "animating" // Action animation/delay
  | "victory" // Player won
  | "defeat" // Player lost
  | "fled"; // Player escaped

interface PendingAction {
  type: ActionType;
  technique?: Technique;
}

// Combat performance metrics for challenge evaluation
export interface CombatPerformanceMetrics {
  won: boolean;
  turns: number;
  damageTaken: number;
  damageDealt: number;
  combosExecuted: number;
  stanceSwitches: number;
  techniquesUsed: number;
}

interface CombatScreenProps {
  player: Character;
  enemies: Enemy[];
  onCombatEnd: (
    result: "victory" | "defeat" | "fled",
    updatedPlayer: Character,
    performance?: CombatPerformanceMetrics,
  ) => void;
}

// =============================================================================
// COMBAT SCREEN
// =============================================================================

export const CombatScreen: React.FC<CombatScreenProps> = ({
  player,
  enemies,
  onCombatEnd,
}) => {
  // Combat engine
  const engineRef = useRef<CombatEngine | null>(null);

  // Timeout refs for cleanup
  const enemyActionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const enemyTurnDelayRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [combatState, setCombatState] = useState<CombatState | null>(null);
  const [phase, setPhase] = useState<CombatPhase>("initial-stance-select");
  const [pendingAction, setPendingAction] = useState<PendingAction | null>(
    null,
  );
  const [message, setMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<
    "normal" | "damage" | "heal" | "status"
  >("normal");
  // Atmospheric combat quote - set once on mount
  const [combatQuote] = useState(getRandomCombatQuote);

  // Track which enemies have said their lowHp dialogue (only say once)
  const lowHpDialogueShown = useRef<Set<string>>(new Set());

  // Performance tracking for challenges
  const performanceRef = useRef({
    startingHp: player.hp,
    damageTaken: 0,
    damageDealt: 0,
    combosExecuted: 0,
    stanceSwitches: 0,
    techniquesUsed: new Set<string>(),
    lastPlayerStance: player.stance,
  });

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (enemyActionTimeoutRef.current) {
        clearTimeout(enemyActionTimeoutRef.current);
      }
      if (enemyTurnDelayRef.current) {
        clearTimeout(enemyTurnDelayRef.current);
      }
    };
  }, []);

  // Initialize combat engine
  useEffect(() => {
    if (enemies.length === 0) {
      if (process.env.NODE_ENV !== "production") {
        console.error("No enemies provided to combat!");
      }
      return;
    }

    const engine = new CombatEngine(player, enemies, {}, (state) => {
      setCombatState({ ...state });
    });
    engineRef.current = engine;
    setCombatState(engine.getState());

    // Show intro dialogue
    const firstEnemy = enemies[0];
    if (firstEnemy?.dialogue.intro?.[0]) {
      setMessage(`${firstEnemy.name}: "${firstEnemy.dialogue.intro[0]}"`);
      setMessageType("normal");
    }
  }, [player, enemies]);

  // Handle combat result changes and turn transitions
  useEffect(() => {
    if (!combatState) return;

    // Combat ended - show result screen
    if (combatState.combatResult === "victory") {
      setPhase("victory");
      const defeatedEnemies = combatState.enemies.filter((e) => e.hp === 0);
      const lastEnemy = defeatedEnemies[defeatedEnemies.length - 1];
      if (lastEnemy?.dialogue.defeat?.[0]) {
        setMessage(`${lastEnemy.name}: "${lastEnemy.dialogue.defeat[0]}"`);
        setMessageType("normal");
      }
    } else if (combatState.combatResult === "defeat") {
      setPhase("defeat");
      // Show enemy victory dialogue
      const livingEnemy = combatState.enemies.find((e) => e.hp > 0);
      if (livingEnemy?.dialogue.victory?.[0]) {
        setMessage(`${livingEnemy.name}: "${livingEnemy.dialogue.victory[0]}"`);
        setMessageType("normal");
      }
    } else if (combatState.combatResult === "fled") {
      setPhase("fled");
    } else if (
      !combatState.isPlayerTurn &&
      phase !== "enemy-turn" &&
      phase !== "animating" &&
      phase !== "initial-stance-select"
    ) {
      // Switch to enemy turn (but not during initial stance selection)
      setPhase("enemy-turn");
      handleEnemyTurn();
    } else if (combatState.isPlayerTurn && phase === "enemy-turn") {
      // Back to player turn
      setPhase("action-select");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [combatState?.combatResult, combatState?.isPlayerTurn, phase]);

  // Check for low HP dialogue triggers (below 30%)
  useEffect(() => {
    if (!combatState || combatState.combatResult) return;

    for (const enemy of combatState.enemies) {
      const hpPercent = (enemy.hp / enemy.maxHp) * 100;
      const hasLowHpDialogue = enemy.dialogue.lowHp?.[0];
      const alreadyShown = lowHpDialogueShown.current.has(enemy.id);

      if (
        hpPercent > 0 &&
        hpPercent <= 30 &&
        hasLowHpDialogue &&
        !alreadyShown
      ) {
        lowHpDialogueShown.current.add(enemy.id);
        setMessage(`${enemy.name}: "${enemy.dialogue.lowHp![0]}"`);
        setMessageType("status");
        break; // Only show one dialogue at a time
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Intentionally only trigger on enemies array changes
  }, [combatState?.enemies]);

  // Track performance metrics for challenges
  useEffect(() => {
    if (!combatState) return;
    const perf = performanceRef.current;

    // Track damage taken by player
    const currentHp = combatState.player.hp;
    const expectedHp = perf.startingHp - perf.damageTaken;
    if (currentHp < expectedHp) {
      perf.damageTaken += expectedHp - currentHp;
    }

    // Track stance switches
    if (combatState.player.stance !== perf.lastPlayerStance) {
      perf.stanceSwitches++;
      perf.lastPlayerStance = combatState.player.stance;
    }

    // Track combos (when a combo is completed/broken, it resets)
    if (combatState.comboChain.techniques.length >= 2) {
      // This is an active combo; we'll count it when it breaks or combat ends
    }

    // Track damage dealt to enemies (sum up missing HP from all enemies)
    let totalEnemyDamage = 0;
    for (const enemy of combatState.enemies) {
      totalEnemyDamage += enemy.maxHp - enemy.hp;
    }
    perf.damageDealt = totalEnemyDamage;
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Track on state changes
  }, [combatState]);

  // Handle enemy turn
  const handleEnemyTurn = useCallback(() => {
    if (!engineRef.current || !combatState) return;

    const engine = engineRef.current;
    const livingEnemies = engine.getLivingEnemies();

    if (livingEnemies.length === 0) return;

    // Find the ready enemy
    const readyEntry = engine
      .getTurnQueue()
      .find((e) => e.isReady && !e.character.isPlayer);
    if (!readyEntry) return;

    const enemy = readyEntry.character as Enemy;

    // Clear any existing timeouts before starting new turn
    if (enemyActionTimeoutRef.current) {
      clearTimeout(enemyActionTimeoutRef.current);
      enemyActionTimeoutRef.current = null;
    }
    if (enemyTurnDelayRef.current) {
      clearTimeout(enemyTurnDelayRef.current);
      enemyTurnDelayRef.current = null;
    }

    // Brief delay for readability
    setPhase("animating");
    setMessage(`${enemy.name} is preparing to act...`);
    setMessageType("status");

    enemyActionTimeoutRef.current = setTimeout(() => {
      enemyActionTimeoutRef.current = null;

      const result = engine.executeEnemyTurn(enemy);
      setMessage(result.message);
      // Determine message type based on content
      if (
        result.message.includes("damage") ||
        result.message.includes("hits")
      ) {
        setMessageType("damage");
      } else {
        setMessageType("normal");
      }

      // Check for boss phase transition
      const { shouldTransition, newPhase } =
        AIController.checkPhaseTransition(enemy);
      if (shouldTransition) {
        enemy.phase = newPhase;
        const phaseDialogue = AIController.getPhaseDialogue(enemy, newPhase);
        if (phaseDialogue) {
          setMessage(`${enemy.name}: "${phaseDialogue}"`);
          setMessageType("status");
        }
      }

      // Small delay before next turn
      enemyTurnDelayRef.current = setTimeout(() => {
        enemyTurnDelayRef.current = null;

        if (engine.getCombatResult() === "ongoing") {
          if (engine.isPlayerTurn()) {
            setPhase("action-select");
          } else {
            handleEnemyTurn();
          }
        }
      }, COMBAT_CONFIG.turnTransitionDelay);
    }, COMBAT_CONFIG.enemyActionDelay);
  }, [combatState]);

  // Handle player action selection
  const handleActionSelect = useCallback(
    (action: ActionType) => {
      if (!engineRef.current || !combatState) return;

      const engine = engineRef.current;
      const livingEnemies = engine.getLivingEnemies();

      switch (action) {
        case "attack":
          setPendingAction({ type: "attack" });
          if (livingEnemies.length > 1) {
            setPhase("target-select");
          } else {
            const target = livingEnemies[0];
            if (target) {
              const result = engine.executeAction({
                type: "attack",
                actor: combatState.player,
                target,
              });
              setMessage(result.message);
              setMessageType("damage");
              setPendingAction(null);
            }
          }
          break;

        case "technique":
          setPhase("technique-select");
          break;

        case "stance":
          setPhase("stance-select");
          break;

        case "flee": {
          const fleeResult = engine.executeAction({
            type: "flee",
            actor: combatState.player,
          });
          setMessage(fleeResult.message);
          setMessageType("status");
          break;
        }
      }
    },
    [combatState],
  );

  // Handle technique selection
  const handleTechniqueSelect = useCallback(
    (technique: Technique) => {
      if (!engineRef.current || !combatState) return;

      const engine = engineRef.current;
      const livingEnemies = engine.getLivingEnemies();

      setPendingAction({ type: "technique", technique });

      // If technique needs a target
      if (technique.power > 0) {
        if (livingEnemies.length > 1) {
          setPhase("target-select");
        } else {
          const target = livingEnemies[0];
          if (target) {
            const result = engine.executeAction({
              type: "technique",
              actor: combatState.player,
              target,
              technique,
            });
            setMessage(result.message);
            setMessageType("damage");
            setPendingAction(null);
          }
        }
      } else {
        // Self-target technique (buffs, heals, etc.)
        const result = engine.executeAction({
          type: "technique",
          actor: combatState.player,
          technique,
        });
        setMessage(result.message);
        setMessageType("heal");
        setPendingAction(null);
      }
    },
    [combatState],
  );

  // Handle initial stance selection (doesn't consume a turn)
  const handleInitialStanceSelect = useCallback(
    (stance: Stance) => {
      if (!engineRef.current || !combatState) return;

      engineRef.current.setPlayerStance(stance);
      const stanceName = stance.charAt(0).toUpperCase() + stance.slice(1);
      setMessage(`You assume ${stanceName} Stance.`);
      setMessageType("status");
      setPhase("action-select");
    },
    [combatState],
  );

  // Handle stance selection (during combat)
  const handleStanceSelect = useCallback(
    (stance: Stance) => {
      if (!engineRef.current || !combatState) return;

      const result = engineRef.current.executeAction({
        type: "stance",
        actor: combatState.player,
        newStance: stance,
      });
      setMessage(result.message);
      setMessageType("status");
    },
    [combatState],
  );

  // Handle target selection
  const handleTargetSelect = useCallback(
    (enemy: Enemy) => {
      if (!engineRef.current || !combatState || !pendingAction) return;

      const result = engineRef.current.executeAction({
        type: pendingAction.type,
        actor: combatState.player,
        target: enemy,
        technique: pendingAction.technique,
      });
      setMessage(result.message);
      setMessageType(pendingAction.type === "technique" ? "damage" : "damage");
      setPendingAction(null);
    },
    [combatState, pendingAction],
  );

  // Handle end screen input
  useInput((input, key) => {
    if (phase === "victory" || phase === "defeat" || phase === "fled") {
      if (key.return) {
        const perf = performanceRef.current;
        const currentState = engineRef.current?.getState();

        // Count completed combos from combat log
        const comboEntries =
          currentState?.combatLog.filter(
            (entry) =>
              entry.message.toLowerCase().includes("combo complete") &&
              entry.type === "system",
          ) ?? [];

        const performance: CombatPerformanceMetrics = {
          won: phase === "victory",
          turns: currentState?.round ?? 0,
          damageTaken: perf.damageTaken,
          damageDealt: perf.damageDealt,
          combosExecuted: Math.max(perf.combosExecuted, comboEntries.length),
          stanceSwitches: perf.stanceSwitches,
          techniquesUsed: perf.techniquesUsed.size,
        };

        onCombatEnd(
          phase as "victory" | "defeat" | "fled",
          engineRef.current?.getPlayer() ?? player,
          performance,
        );
      }
    }
  });

  // Memoized values for performance
  const playerTechniques = useMemo(() => {
    if (!combatState) return [];
    return getTechniquesForCharacter(combatState.player.techniques);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only re-compute when techniques change
  }, [combatState?.player.techniques]);

  const turnOrder = useMemo(() => {
    if (!engineRef.current) return [];
    return engineRef.current.getTurnOrderPreview(
      COMBAT_CONFIG.turnQueuePreviewLength,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps -- turnQueue triggers recalc
  }, [combatState?.turnQueue]);

  const livingEnemies = useMemo(() => {
    if (!combatState) return [];
    return combatState.enemies.filter((e) => e.hp > 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only re-compute when enemies change
  }, [combatState?.enemies]);

  // Get message color based on type
  const getMessageColor = () => {
    switch (messageType) {
      case "damage":
        return "red";
      case "heal":
        return "green";
      case "status":
        return "cyan";
      default:
        return "white";
    }
  };

  // Render
  if (!combatState) {
    return (
      <CenteredScreen>
        <Box
          flexDirection="column"
          borderStyle="double"
          borderColor="yellow"
          padding={2}
          alignItems="center"
          width={84}
        >
          <Box marginBottom={1}>
            <Text bold color="yellow">
              ⚔ Preparing for battle...
            </Text>
          </Box>
          <Text dimColor italic>
            Loading combat system...
          </Text>
        </Box>
      </CenteredScreen>
    );
  }

  return (
    <CenteredScreen>
      <Box
        flexDirection="column"
        borderStyle="double"
        borderColor="red"
        paddingX={2}
        paddingY={0}
        width={84}
      >
        {/* Atmospheric Header Flourish */}
        <Box justifyContent="center" marginTop={1}>
          <Text color={atmosphericColors.menuAccent} dimColor>
            {combatState.isBossFight
              ? COMBAT_DECORATIONS.headerBoss
              : COMBAT_DECORATIONS.headerFlourish}
          </Text>
        </Box>

        {/* Header */}
        <Box marginY={1} justifyContent="center">
          <Text bold color="red">
            ⚔ COMBAT ⚔
          </Text>
          {combatState.isBossFight && (
            <Text color="yellow" bold>
              {" "}
              [BOSS]
            </Text>
          )}
          {combatState.comboChain.isActive && (
            <Text color="magenta" bold>
              {" "}
              [COMBO×{combatState.comboChain.techniques.length}]
            </Text>
          )}
        </Box>

        {/* Combat Quote */}
        <Box justifyContent="center" marginBottom={1}>
          <Text dimColor italic>
            "{combatQuote}"
          </Text>
        </Box>

        {/* Divider */}
        <Box justifyContent="center">
          <Text color="red" dimColor>
            {COMBAT_DECORATIONS.combatDividerWide}
          </Text>
        </Box>

        {/* Combatants */}
        <Box
          flexDirection="row"
          justifyContent="space-between"
          marginY={1}
          marginTop={2}
        >
          {/* Player Status */}
          <Box width="47%" borderStyle="round" borderColor="cyan" paddingX={2}>
            <CharacterStatus
              name={combatState.player.name}
              hp={combatState.player.hp}
              maxHp={combatState.player.maxHp}
              chi={combatState.player.chi}
              maxChi={combatState.player.maxChi}
              stance={combatState.player.stance}
              isPlayer={true}
              inverseChi={combatState.player.inverseChi}
              maxInverseChi={combatState.player.maxInverseChi}
            />
          </Box>

          {/* VS */}
          <Box
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            paddingX={1}
          >
            <Text bold color="yellow">
              ⚡
            </Text>
            <Text bold color="yellow" dimColor>
              VS
            </Text>
            <Text bold color="yellow">
              {combatState.isPlayerTurn ? "⇣" : "⇡"}
            </Text>
          </Box>

          {/* Enemy Status */}
          <Box
            width="47%"
            borderStyle="round"
            borderColor="red"
            paddingX={2}
            flexDirection="column"
          >
            {livingEnemies.map((enemy, index) => (
              <Box
                key={enemy.id}
                marginBottom={index < livingEnemies.length - 1 ? 1 : 0}
              >
                <CharacterStatus
                  name={enemy.name}
                  hp={enemy.hp}
                  maxHp={enemy.maxHp}
                  chi={enemy.chi}
                  maxChi={enemy.maxChi}
                  stance={enemy.stance}
                />
              </Box>
            ))}
          </Box>
        </Box>

        {/* Divider */}
        <Box justifyContent="center">
          <Text color="red" dimColor>
            {COMBAT_DECORATIONS.combatDividerWide}
          </Text>
        </Box>

        {/* Message */}
        {message.length > 0 && (
          <Box
            marginY={1}
            borderStyle="round"
            borderColor={getMessageColor()}
            paddingY={1}
            paddingX={2}
          >
            <Text color={getMessageColor()} wrap="wrap">
              {message}
            </Text>
          </Box>
        )}

        {/* Action Area */}
        <Box marginTop={1}>
          {phase === "initial-stance-select" && (
            <Box flexDirection="column" alignItems="center">
              <Box marginBottom={1}>
                <Text bold color="yellow">
                  ⚡ Choose Your Starting Stance
                </Text>
              </Box>
              <Box marginBottom={1}>
                <Text dimColor italic>
                  This choice affects your combat style for the entire battle
                </Text>
              </Box>
              <StanceMenu
                currentStance={combatState.player.stance}
                onSelect={handleInitialStanceSelect}
                onBack={() => {}} // No back option on initial selection
              />
            </Box>
          )}

          {phase === "action-select" && (
            <ActionMenu
              onSelect={handleActionSelect}
              canFlee={!combatState.isBossFight}
              disabled={!combatState.isPlayerTurn}
            />
          )}

          {phase === "technique-select" && (
            <TechniqueMenu
              techniques={playerTechniques}
              currentChi={combatState.player.chi}
              currentStance={combatState.player.stance}
              comboActive={combatState.comboChain.isActive}
              comboTechniques={combatState.comboChain.techniques}
              onSelect={handleTechniqueSelect}
              onBack={() => setPhase("action-select")}
            />
          )}

          {phase === "stance-select" && (
            <StanceMenu
              currentStance={combatState.player.stance}
              onSelect={handleStanceSelect}
              onBack={() => setPhase("action-select")}
            />
          )}

          {phase === "target-select" && (
            <TargetMenu
              enemies={combatState.enemies}
              onSelect={handleTargetSelect}
              onBack={() => setPhase("action-select")}
            />
          )}

          {phase === "enemy-turn" && (
            <Box
              borderStyle="round"
              borderColor="red"
              padding={1}
              justifyContent="center"
            >
              <Text color="red" italic bold>
                ⚔ Enemy Turn
              </Text>
            </Box>
          )}

          {phase === "animating" && (
            <Box
              borderStyle="round"
              borderColor="yellow"
              padding={1}
              justifyContent="center"
            >
              <Text color="yellow" bold>
                ⚡ Processing ⚡
              </Text>
            </Box>
          )}

          {phase === "victory" && (
            <Box flexDirection="column" alignItems="center" paddingY={1}>
              {/* Victory Banner */}
              <Text color="green">{COMBAT_DECORATIONS.victoryBanner.top}</Text>
              <Text bold color="greenBright">
                {COMBAT_DECORATIONS.victoryBanner.title}
              </Text>
              <Text color="green">
                {COMBAT_DECORATIONS.victoryBanner.bottom}
              </Text>

              {/* Decorative flourish */}
              <Box marginY={1}>
                <Text color={atmosphericColors.menuAccent} dimColor>
                  ═══════════════ ☯ ═══════════════
                </Text>
              </Box>

              {/* Victory message */}
              <Box marginBottom={1}>
                <Text color="yellow">
                  You defeated{" "}
                  {livingEnemies.length === 0
                    ? combatState.enemies.map((e) => e.name).join(", ")
                    : "your enemies"}
                  !
                </Text>
              </Box>

              {/* Cultivation wisdom */}
              <Box marginBottom={2}>
                <Text dimColor italic>
                  "Victory belongs to the patient."
                </Text>
              </Box>

              <Box>
                <Text color="cyan">▸ Press Enter to continue ◂</Text>
              </Box>
            </Box>
          )}

          {phase === "defeat" && (
            <Box flexDirection="column" alignItems="center" paddingY={1}>
              {/* Defeat Banner */}
              <Text color="red">{COMBAT_DECORATIONS.defeatBanner.top}</Text>
              <Text bold color="redBright">
                {COMBAT_DECORATIONS.defeatBanner.title}
              </Text>
              <Text color="red">{COMBAT_DECORATIONS.defeatBanner.bottom}</Text>

              {/* Decorative flourish */}
              <Box marginY={1}>
                <Text color="red" dimColor>
                  ═══════════════ ✗ ═══════════════
                </Text>
              </Box>

              {/* Defeat message */}
              <Box marginBottom={1}>
                <Text>You have been defeated...</Text>
              </Box>

              {/* Cultivation wisdom */}
              <Box marginBottom={2}>
                <Text dimColor italic>
                  "Defeat is the first teacher on the path."
                </Text>
              </Box>

              <Box>
                <Text color="cyan">▸ Press Enter to continue ◂</Text>
              </Box>
            </Box>
          )}

          {phase === "fled" && (
            <Box flexDirection="column" alignItems="center" paddingY={1}>
              {/* Escape Banner */}
              <Text color="yellow">{COMBAT_DECORATIONS.fleeBanner.top}</Text>
              <Text bold color="yellowBright">
                {COMBAT_DECORATIONS.fleeBanner.title}
              </Text>
              <Text color="yellow">{COMBAT_DECORATIONS.fleeBanner.bottom}</Text>

              {/* Decorative flourish */}
              <Box marginY={1}>
                <Text color="yellow" dimColor>
                  ═══════════════ ⚡ ═══════════════
                </Text>
              </Box>

              {/* Escape message */}
              <Box marginBottom={1}>
                <Text>You fled from battle!</Text>
              </Box>

              {/* Cultivation wisdom */}
              <Box marginBottom={2}>
                <Text dimColor italic>
                  "To flee is not cowardice—it is wisdom."
                </Text>
              </Box>

              <Box>
                <Text color="cyan">▸ Press Enter to continue ◂</Text>
              </Box>
            </Box>
          )}
        </Box>

        {/* Bottom Flourish */}
        <Box justifyContent="center" marginTop={1}>
          <Text color={atmosphericColors.menuAccent} dimColor>
            {COMBAT_DECORATIONS.combatDividerWide}
          </Text>
        </Box>

        {/* Turn Queue */}
        <TurnQueue
          turnOrder={turnOrder}
          currentActorId={combatState.player.id}
        />
      </Box>
    </CenteredScreen>
  );
};
