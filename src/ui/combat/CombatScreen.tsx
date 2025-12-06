/**
 * Combat Screen
 * Main combat UI that orchestrates all combat components
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Box, Text, useInput } from 'ink';
import type { Character, Enemy, CombatState, Technique, Stance } from '../../types/index';
import { CombatEngine, AIController, getTechniquesForCharacter, getTechnique } from '../../game/combat';

import { TurnQueue } from './TurnQueue';
import { CombatLog } from './CombatLog';
import { CharacterStatus } from './HealthBar';
import { ActionMenu, ActionType } from './ActionMenu';
import { TechniqueMenu } from './TechniqueMenu';
import { StanceMenu } from './StanceMenu';
import { TargetMenu } from './TargetMenu';

// =============================================================================
// TYPES
// =============================================================================

type CombatPhase =
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
  const [combatState, setCombatState] = useState<CombatState | null>(null);
  const [phase, setPhase] = useState<CombatPhase>('action-select');
  const [pendingAction, setPendingAction] = useState<PendingAction | null>(null);
  const [message, setMessage] = useState<string>('');

  // Initialize combat engine
  useEffect(() => {
    const engine = new CombatEngine(player, enemies, {}, (state) => {
      setCombatState({ ...state });
    });
    engineRef.current = engine;
    setCombatState(engine.getState());

    // Show intro dialogue
    const firstEnemy = enemies[0];
    if (firstEnemy.dialogue.intro?.[0]) {
      setMessage(`${firstEnemy.name}: "${firstEnemy.dialogue.intro[0]}"`);
    }
  }, [player, enemies]);

  // Handle combat result changes
  useEffect(() => {
    if (!combatState) return;

    if (combatState.combatResult === 'victory') {
      setPhase('victory');
      const enemy = combatState.enemies[0];
      if (enemy.dialogue.defeat?.[0]) {
        setMessage(`${enemy.name}: "${enemy.dialogue.defeat[0]}"`);
      }
    } else if (combatState.combatResult === 'defeat') {
      setPhase('defeat');
    } else if (combatState.combatResult === 'fled') {
      setPhase('fled');
    } else if (!combatState.isPlayerTurn && phase !== 'enemy-turn' && phase !== 'animating') {
      // Switch to enemy turn
      setPhase('enemy-turn');
      handleEnemyTurn();
    } else if (combatState.isPlayerTurn && phase === 'enemy-turn') {
      // Back to player turn
      setPhase('action-select');
    }
  }, [combatState?.combatResult, combatState?.isPlayerTurn]);

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

    // Brief delay for readability
    setPhase('animating');
    setTimeout(() => {
      const result = engine.executeEnemyTurn(enemy);
      setMessage(result.message);

      // Check for boss phase transition
      const { shouldTransition, newPhase } = AIController.checkPhaseTransition(enemy);
      if (shouldTransition) {
        enemy.phase = newPhase;
        const phaseDialogue = AIController.getPhaseDialogue(enemy, newPhase);
        if (phaseDialogue) {
          setMessage(`${enemy.name}: "${phaseDialogue}"`);
        }
      }

      // Small delay before next turn
      setTimeout(() => {
        if (engine.getCombatResult() === 'ongoing') {
          if (engine.isPlayerTurn()) {
            setPhase('action-select');
          } else {
            handleEnemyTurn();
          }
        }
      }, 500);
    }, 300);
  }, [combatState]);

  // Handle player action selection
  const handleActionSelect = useCallback((action: ActionType) => {
    if (!engineRef.current || !combatState) return;

    const engine = engineRef.current;

    switch (action) {
      case 'attack':
        setPendingAction({ type: 'attack' });
        if (engine.getLivingEnemies().length > 1) {
          setPhase('target-select');
        } else {
          // Single enemy, attack directly
          const target = engine.getLivingEnemies()[0];
          const result = engine.executeAction({
            type: 'attack',
            actor: combatState.player,
            target,
          });
          setMessage(result.message);
        }
        break;

      case 'technique':
        setPhase('technique-select');
        break;

      case 'defend':
        const defendResult = engine.executeAction({
          type: 'defend',
          actor: combatState.player,
        });
        setMessage(defendResult.message);
        break;

      case 'chi-focus':
        const chiResult = engine.executeAction({
          type: 'chi-focus',
          actor: combatState.player,
        });
        setMessage(chiResult.message);
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
        break;
    }
  }, [combatState]);

  // Handle technique selection
  const handleTechniqueSelect = useCallback((technique: Technique) => {
    if (!engineRef.current || !combatState) return;

    setPendingAction({ type: 'technique', technique });

    // If technique needs a target
    if (technique.power > 0) {
      const engine = engineRef.current;
      if (engine.getLivingEnemies().length > 1) {
        setPhase('target-select');
      } else {
        // Single enemy
        const target = engine.getLivingEnemies()[0];
        const result = engine.executeAction({
          type: 'technique',
          actor: combatState.player,
          target,
          technique,
        });
        setMessage(result.message);
        setPhase('action-select');
      }
    } else {
      // Self-target technique
      const result = engineRef.current.executeAction({
        type: 'technique',
        actor: combatState.player,
        technique,
      });
      setMessage(result.message);
      setPhase('action-select');
    }
  }, [combatState]);

  // Handle stance selection
  const handleStanceSelect = useCallback((stance: Stance) => {
    if (!engineRef.current || !combatState) return;

    const result = engineRef.current.executeAction({
      type: 'stance',
      actor: combatState.player,
      newStance: stance,
    });
    setMessage(result.message);
    setPhase('action-select');
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
    setPendingAction(null);
    setPhase('action-select');
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

  // Render
  if (!combatState) {
    return <Text>Loading combat...</Text>;
  }

  const playerTechniques = getTechniquesForCharacter(combatState.player.techniques);
  const turnOrder = engineRef.current?.getTurnOrderPreview(7) ?? [];

  return (
    <Box flexDirection="column" padding={1}>
      {/* Header */}
      <Box marginBottom={1}>
        <Text bold color="red">
          ═══ COMBAT ═══
        </Text>
        {combatState.isBossFight && (
          <Text color="yellow" bold>
            {' '}[BOSS]
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
          <Text bold color="yellow">VS</Text>
        </Box>

        {/* Enemy Status */}
        <Box width="40%" flexDirection="column">
          {combatState.enemies.filter((e) => e.hp > 0).map((enemy) => (
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
      {message && (
        <Box marginTop={1}>
          <Text color="white">{message}</Text>
        </Box>
      )}

      {/* Combat Log */}
      <Box marginTop={1}>
        <CombatLog entries={combatState.combatLog} maxEntries={4} />
      </Box>

      {/* Action Area */}
      <Box marginTop={1}>
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
          <Box>
            <Text dimColor italic>Enemy is acting...</Text>
          </Box>
        )}

        {phase === 'animating' && (
          <Box>
            <Text dimColor>...</Text>
          </Box>
        )}

        {phase === 'victory' && (
          <Box flexDirection="column">
            <Text bold color="green">
              ══════ VICTORY! ══════
            </Text>
            <Text color="yellow">You defeated {combatState.enemies[0]?.name}!</Text>
            <Text dimColor>Press Enter to continue...</Text>
          </Box>
        )}

        {phase === 'defeat' && (
          <Box flexDirection="column">
            <Text bold color="red">
              ══════ DEFEAT ══════
            </Text>
            <Text>You have been defeated...</Text>
            <Text dimColor>Press Enter to continue...</Text>
          </Box>
        )}

        {phase === 'fled' && (
          <Box flexDirection="column">
            <Text bold color="yellow">
              ══════ ESCAPED ══════
            </Text>
            <Text>You fled from battle!</Text>
            <Text dimColor>Press Enter to continue...</Text>
          </Box>
        )}
      </Box>
    </Box>
  );
};
