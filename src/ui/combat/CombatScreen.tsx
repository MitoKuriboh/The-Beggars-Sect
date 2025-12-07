/**
 * Combat Screen
 * Main combat UI that orchestrates all combat components
 */

import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { Box, Text, useInput } from 'ink';
import type { Character, Enemy, CombatState, Technique, Stance } from '../../types/index';
import { CombatEngine, AIController, getTechniquesForCharacter, getTechnique } from '../../game/combat';

import { TurnQueue } from './TurnQueue';
import { CharacterStatus } from './HealthBar';
import { ActionMenu, ActionType } from './ActionMenu';
import { TechniqueMenu } from './TechniqueMenu';
import { StanceMenu } from './StanceMenu';
import { TargetMenu } from './TargetMenu';

// =============================================================================
// CONSTANTS
// =============================================================================

const ENEMY_ACTION_DELAY = 300; // ms before enemy action executes
const TURN_TRANSITION_DELAY = 500; // ms between turns
const TURN_QUEUE_PREVIEW_LENGTH = 7; // Number of turns to show

// =============================================================================
// TYPES
// =============================================================================

type CombatPhase =
  | 'initial-stance-select' // Initial stance selection before combat
  | 'action-select'      // Player choosing action
  | 'technique-select'   // Player choosing technique
  | 'stance-select'      // Player choosing stance
  | 'target-select'      // Player choosing target
  | 'enemy-turn'         // Enemy is acting
  | 'animating'          // Action animation/delay
  | 'victory'            // Player won
  | 'defeat'             // Player lost
  | 'fled';              // Player escaped

interface PendingAction {
  type: ActionType;
  technique?: Technique;
}

interface CombatScreenProps {
  player: Character;
  enemies: Enemy[];
  onCombatEnd: (result: 'victory' | 'defeat' | 'fled', updatedPlayer: Character) => void;
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
  const enemyActionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const enemyTurnDelayRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [combatState, setCombatState] = useState<CombatState | null>(null);
  const [phase, setPhase] = useState<CombatPhase>('initial-stance-select');
  const [pendingAction, setPendingAction] = useState<PendingAction | null>(null);
  const [message, setMessage] = useState<string>('');
  const [messageType, setMessageType] = useState<'normal' | 'damage' | 'heal' | 'status'>('normal');

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
      console.error('No enemies provided to combat!');
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
      setMessageType('normal');
    }
  }, [player, enemies]);

  // Handle combat result changes and turn transitions
  useEffect(() => {
    if (!combatState) return;

    // Combat ended - show result screen
    if (combatState.combatResult === 'victory') {
      setPhase('victory');
      const defeatedEnemies = combatState.enemies.filter(e => e.hp === 0);
      const lastEnemy = defeatedEnemies[defeatedEnemies.length - 1];
      if (lastEnemy?.dialogue.defeat?.[0]) {
        setMessage(`${lastEnemy.name}: "${lastEnemy.dialogue.defeat[0]}"`);
        setMessageType('normal');
      }
    } else if (combatState.combatResult === 'defeat') {
      setPhase('defeat');
    } else if (combatState.combatResult === 'fled') {
      setPhase('fled');
    } else if (!combatState.isPlayerTurn && phase !== 'enemy-turn' && phase !== 'animating' && phase !== 'initial-stance-select') {
      // Switch to enemy turn (but not during initial stance selection)
      setPhase('enemy-turn');
      handleEnemyTurn();
    } else if (combatState.isPlayerTurn && phase === 'enemy-turn') {
      // Back to player turn
      setPhase('action-select');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [combatState?.combatResult, combatState?.isPlayerTurn, phase]);

  // Handle enemy turn
  const handleEnemyTurn = useCallback(() => {
    if (!engineRef.current || !combatState) return;

    const engine = engineRef.current;
    const livingEnemies = engine.getLivingEnemies();

    if (livingEnemies.length === 0) return;

    // Find the ready enemy
    const readyEntry = engine.getTurnQueue().find((e) => e.isReady && !e.character.isPlayer);
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
    setPhase('animating');
    setMessage(`${enemy.name} is preparing to act...`);
    setMessageType('status');

    enemyActionTimeoutRef.current = setTimeout(() => {
      enemyActionTimeoutRef.current = null;

      const result = engine.executeEnemyTurn(enemy);
      setMessage(result.message);
      // Determine message type based on content
      if (result.message.includes('damage') || result.message.includes('hits')) {
        setMessageType('damage');
      } else {
        setMessageType('normal');
      }

      // Check for boss phase transition
      const { shouldTransition, newPhase } = AIController.checkPhaseTransition(enemy);
      if (shouldTransition) {
        enemy.phase = newPhase;
        const phaseDialogue = AIController.getPhaseDialogue(enemy, newPhase);
        if (phaseDialogue) {
          setMessage(`${enemy.name}: "${phaseDialogue}"`);
          setMessageType('status');
        }
      }

      // Small delay before next turn
      enemyTurnDelayRef.current = setTimeout(() => {
        enemyTurnDelayRef.current = null;

        if (engine.getCombatResult() === 'ongoing') {
          if (engine.isPlayerTurn()) {
            setPhase('action-select');
          } else {
            handleEnemyTurn();
          }
        }
      }, TURN_TRANSITION_DELAY);
    }, ENEMY_ACTION_DELAY);
  }, [combatState]);

  // Handle player action selection
  const handleActionSelect = useCallback((action: ActionType) => {
    if (!engineRef.current || !combatState) return;

    const engine = engineRef.current;
    const livingEnemies = engine.getLivingEnemies();

    switch (action) {
      case 'attack':
        setPendingAction({ type: 'attack' });
        if (livingEnemies.length > 1) {
          setPhase('target-select');
        } else {
          const target = livingEnemies[0];
          if (target) {
            const result = engine.executeAction({
              type: 'attack',
              actor: combatState.player,
              target,
            });
            setMessage(result.message);
            setMessageType('damage');
            setPendingAction(null);
          }
        }
        break;

      case 'technique':
        setPhase('technique-select');
        break;

      case 'stance':
        setPhase('stance-select');
        break;

      case 'flee':
        const fleeResult = engine.executeAction({
          type: 'flee',
          actor: combatState.player,
        });
        setMessage(fleeResult.message);
        setMessageType('status');
        break;
    }
  }, [combatState]);

  // Handle technique selection
  const handleTechniqueSelect = useCallback((technique: Technique) => {
    if (!engineRef.current || !combatState) return;

    const engine = engineRef.current;
    const livingEnemies = engine.getLivingEnemies();

    setPendingAction({ type: 'technique', technique });

    // If technique needs a target
    if (technique.power > 0) {
      if (livingEnemies.length > 1) {
        setPhase('target-select');
      } else {
        const target = livingEnemies[0];
        if (target) {
          const result = engine.executeAction({
            type: 'technique',
            actor: combatState.player,
            target,
            technique,
          });
          setMessage(result.message);
          setMessageType('damage');
          setPendingAction(null);
        }
      }
    } else {
      // Self-target technique (buffs, heals, etc.)
      const result = engine.executeAction({
        type: 'technique',
        actor: combatState.player,
        technique,
      });
      setMessage(result.message);
      setMessageType('heal');
      setPendingAction(null);
    }
  }, [combatState]);

  // Handle initial stance selection (doesn't consume a turn)
  const handleInitialStanceSelect = useCallback((stance: Stance) => {
    if (!engineRef.current || !combatState) return;

    engineRef.current.setPlayerStance(stance);
    const stanceName = stance.charAt(0).toUpperCase() + stance.slice(1);
    setMessage(`You assume ${stanceName} Stance.`);
    setMessageType('status');
    setPhase('action-select');
  }, [combatState]);

  // Handle stance selection (during combat)
  const handleStanceSelect = useCallback((stance: Stance) => {
    if (!engineRef.current || !combatState) return;

    const result = engineRef.current.executeAction({
      type: 'stance',
      actor: combatState.player,
      newStance: stance,
    });
    setMessage(result.message);
    setMessageType('status');
  }, [combatState]);

  // Handle target selection
  const handleTargetSelect = useCallback((enemy: Enemy) => {
    if (!engineRef.current || !combatState || !pendingAction) return;

    const result = engineRef.current.executeAction({
      type: pendingAction.type,
      actor: combatState.player,
      target: enemy,
      technique: pendingAction.technique,
    });
    setMessage(result.message);
    setMessageType(pendingAction.type === 'technique' ? 'damage' : 'damage');
    setPendingAction(null);
  }, [combatState, pendingAction]);

  // Handle end screen input
  useInput((input, key) => {
    if (phase === 'victory' || phase === 'defeat' || phase === 'fled') {
      if (key.return) {
        onCombatEnd(
          phase as 'victory' | 'defeat' | 'fled',
          engineRef.current?.getPlayer() ?? player
        );
      }
    }
  });

  // Memoized values for performance
  const playerTechniques = useMemo(() => {
    if (!combatState) return [];
    return getTechniquesForCharacter(combatState.player.techniques);
  }, [combatState?.player.techniques]);

  const turnOrder = useMemo(() => {
    if (!engineRef.current) return [];
    return engineRef.current.getTurnOrderPreview(TURN_QUEUE_PREVIEW_LENGTH);
  }, [combatState?.turnQueue]);

  const livingEnemies = useMemo(() => {
    if (!combatState) return [];
    return combatState.enemies.filter((e) => e.hp > 0);
  }, [combatState?.enemies]);

  // Get message color based on type
  const getMessageColor = () => {
    switch (messageType) {
      case 'damage': return 'red';
      case 'heal': return 'green';
      case 'status': return 'cyan';
      default: return 'white';
    }
  };

  // Render
  if (!combatState) {
    return (
      <Box flexDirection="column" padding={2} alignItems="center" justifyContent="center">
        <Text bold color="yellow">⚔  Preparing for battle...</Text>
        <Text dimColor>Loading combat system...</Text>
      </Box>
    );
  }

  return (
    <Box flexDirection="column" padding={1}>
      {/* Header */}
      <Box marginBottom={1} justifyContent="space-between" alignItems="center">
        <Text bold color="red">
          ═══ COMBAT ═══
        </Text>
        {combatState.isBossFight && (
          <Text color="yellow" bold>
            [BOSS FIGHT]
          </Text>
        )}
        {combatState.comboChain.isActive && (
          <Text color="magenta" bold>
            [COMBO ×{combatState.comboChain.techniques.length}]
          </Text>
        )}
      </Box>

      {/* Turn Queue */}
      <TurnQueue turnOrder={turnOrder} currentActorId={combatState.player.id} />

      {/* Combatants */}
      <Box marginTop={1} flexDirection="row" justifyContent="space-between">
        {/* Player Status */}
        <Box width="40%">
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
        <Box alignItems="center" justifyContent="center">
          <Text bold color="yellow">
            {combatState.isPlayerTurn ? '⟹' : '⟸'}
          </Text>
        </Box>

        {/* Enemy Status */}
        <Box width="40%" flexDirection="column">
          {livingEnemies.map((enemy) => (
            <CharacterStatus
              key={enemy.id}
              name={enemy.name}
              hp={enemy.hp}
              maxHp={enemy.maxHp}
              chi={enemy.chi}
              maxChi={enemy.maxChi}
              stance={enemy.stance}
            />
          ))}
        </Box>
      </Box>

      {/* Message */}
      {message.length > 0 && (
        <Box marginTop={1} borderStyle="round" borderColor={getMessageColor()} padding={1}>
          <Text color={getMessageColor()}>{message}</Text>
        </Box>
      )}

      {/* Action Area */}
      <Box marginTop={1}>
        {phase === 'initial-stance-select' && (
          <Box flexDirection="column">
            <Box marginBottom={1}>
              <Text bold color="cyan">⚡ Choose your starting stance</Text>
            </Box>
            <Box marginBottom={1}>
              <Text dimColor>Your stance affects damage, defense, and speed</Text>
            </Box>
            <StanceMenu
              currentStance={combatState.player.stance}
              onSelect={handleInitialStanceSelect}
              onBack={() => {}} // No back option on initial selection
            />
          </Box>
        )}

        {phase === 'action-select' && (
          <ActionMenu
            onSelect={handleActionSelect}
            canFlee={!combatState.isBossFight}
            disabled={!combatState.isPlayerTurn}
          />
        )}

        {phase === 'technique-select' && (
          <TechniqueMenu
            techniques={playerTechniques}
            currentChi={combatState.player.chi}
            currentStance={combatState.player.stance}
            comboActive={combatState.comboChain.isActive}
            comboTechniques={combatState.comboChain.techniques}
            onSelect={handleTechniqueSelect}
            onBack={() => setPhase('action-select')}
          />
        )}

        {phase === 'stance-select' && (
          <StanceMenu
            currentStance={combatState.player.stance}
            onSelect={handleStanceSelect}
            onBack={() => setPhase('action-select')}
          />
        )}

        {phase === 'target-select' && (
          <TargetMenu
            enemies={combatState.enemies}
            onSelect={handleTargetSelect}
            onBack={() => setPhase('action-select')}
          />
        )}

        {phase === 'enemy-turn' && (
          <Box borderStyle="single" borderColor="red" padding={1}>
            <Text color="red" italic>敵 Enemy Turn</Text>
          </Box>
        )}

        {phase === 'animating' && (
          <Box borderStyle="single" borderColor="yellow" padding={1}>
            <Text color="yellow">⚡ ⚡ ⚡</Text>
          </Box>
        )}

        {phase === 'victory' && (
          <Box flexDirection="column" borderStyle="double" borderColor="green" padding={1}>
            <Text bold color="green">
              ══════ VICTORY! ══════
            </Text>
            <Box marginTop={1}>
              <Text color="yellow">
                You defeated {livingEnemies.length === 0 ? combatState.enemies.map(e => e.name).join(', ') : 'your enemies'}!
              </Text>
            </Box>
            <Box marginTop={1}>
              <Text dimColor>Press Enter to continue...</Text>
            </Box>
          </Box>
        )}

        {phase === 'defeat' && (
          <Box flexDirection="column" borderStyle="double" borderColor="red" padding={1}>
            <Text bold color="red">
              ══════ DEFEAT ══════
            </Text>
            <Box marginTop={1}>
              <Text>You have been defeated...</Text>
            </Box>
            <Box marginTop={1}>
              <Text dimColor>Press Enter to continue...</Text>
            </Box>
          </Box>
        )}

        {phase === 'fled' && (
          <Box flexDirection="column" borderStyle="double" borderColor="yellow" padding={1}>
            <Text bold color="yellow">
              ══════ ESCAPED ══════
            </Text>
            <Box marginTop={1}>
              <Text>You fled from battle!</Text>
            </Box>
            <Box marginTop={1}>
              <Text dimColor>Press Enter to continue...</Text>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};
