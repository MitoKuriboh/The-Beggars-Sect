import React, { useState, useCallback, useRef } from 'react';
import { Box, Text, useApp, useInput } from 'ink';
import SelectInput from 'ink-select-input';
const SelectInputComponent = (SelectInput as any).default || SelectInput;

import { GameStore } from '../game/state/GameStore';
import { createPlayer, createEnemy, scaleEnemyForChapter } from '../game/factories/CharacterFactory';
import { CombatScreen } from './combat/CombatScreen';
import { StoryScreen } from './story/StoryScreen';
import { SaveLoadScreen } from './SaveLoadScreen';
import { SettingsScreen } from './SettingsScreen';
import type { Character, Enemy, StoryState } from '../types/index';

// =============================================================================
// TYPES
// =============================================================================

type Screen = 'title' | 'menu' | 'newgame' | 'stats' | 'story' | 'combat' | 'credits' | 'save' | 'load' | 'settings';

interface MenuItem {
  label: string;
  value: string;
}

// =============================================================================
// COMPONENTS
// =============================================================================

/**
 * Title Screen - Game logo and prompt
 */
const TitleScreen: React.FC<{ onContinue: () => void }> = ({ onContinue }) => {
  useInput((_input, _key) => {
    onContinue();
  });

  // ASCII Art Title
  const titleArt = [
    '╔════════════════════════════════════════════════════════════════╗',
    '║                                                                ║',
    '║   ████████╗██╗  ██╗███████╗                                    ║',
    '║   ╚══██╔══╝██║  ██║██╔════╝                                    ║',
    '║      ██║   ███████║█████╗                                      ║',
    '║      ██║   ██╔══██║██╔══╝                                      ║',
    '║      ██║   ██║  ██║███████╗                                    ║',
    '║      ╚═╝   ╚═╝  ╚═╝╚══════╝                                    ║',
    '║   ██████╗ ███████╗ ██████╗  ██████╗  █████╗ ██████╗ ███████╗   ║',
    '║   ██╔══██╗██╔════╝██╔════╝ ██╔════╝ ██╔══██╗██╔══██╗██╔════╝   ║',
    '║   ██████╔╝█████╗  ██║  ███╗██║  ███╗███████║██████╔╝███████╗   ║',
    '║   ██╔══██╗██╔══╝  ██║   ██║██║   ██║██╔══██║██╔══██╗╚════██║   ║',
    '║   ██████╔╝███████╗╚██████╔╝╚██████╔╝██║  ██║██║  ██║███████║   ║',
    '║   ╚═════╝ ╚══════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝   ║',
    '║   ███████╗███████╗ ██████╗████████╗                            ║',
    '║   ██╔════╝██╔════╝██╔════╝╚══██╔══╝                            ║',
    '║   ███████╗█████╗  ██║        ██║                               ║',
    '║   ╚════██║██╔══╝  ██║        ██║                               ║',
    '║   ███████║███████╗╚██████╗   ██║                               ║',
    '║   ╚══════╝╚══════╝ ╚═════╝   ╚═╝                               ║',
    '║                                                                ║',
    '║                    丐 帮 ： 李 伟 的 崛 起                     ║',
    '║                                                                ║',
    '╚════════════════════════════════════════════════════════════════╝',
  ];

  // Decorative elements
  const swordArt = '   ⚔                                                          ⚔   ';
  const dragonArt = '   🐉                    CLI RPG v0.3.7                      🐉   ';

  // Color mapping: border=yellow, THE=cyan, BEGGARS=magenta, SECT=green, chinese=white
  const getColor = (i: number): string => {
    if (i === 0 || i === titleArt.length - 1) return 'yellow';  // Border
    if (i >= 2 && i <= 7) return 'cyan';      // THE
    if (i >= 8 && i <= 13) return 'magenta';  // BEGGARS
    if (i >= 14 && i <= 19) return 'green';   // SECT
    return 'white';
  };

  return (
    <Box flexDirection="column" height="100%" justifyContent="center" alignItems="center">
      <Box flexDirection="column" alignItems="center">
        {/* Decorative top */}
        <Text color="yellow">{swordArt}</Text>
        <Text dimColor>{dragonArt}</Text>
        <Box marginBottom={1}>
          <Text color="gray">════════════════════════════════════════════════════════════════</Text>
        </Box>

        {/* Main title */}
        {titleArt.map((line, i) => (
          <Text key={i} color={getColor(i)}>
            {line}
          </Text>
        ))}

        {/* Subtitle */}
        <Box marginTop={1}>
          <Text bold italic color="white">
            Li Wei's Ascension
          </Text>
        </Box>

        {/* Decorative separator */}
        <Box marginTop={1} marginBottom={1}>
          <Text color="gray">─────────────────────────────────────</Text>
        </Box>

        {/* Prompt */}
        <Box marginTop={1}>
          <Text color="cyan">
            ▸ Press Enter or Space to begin ◂
          </Text>
        </Box>

        {/* Decorative bottom */}
        <Box marginTop={2}>
          <Text dimColor>A tale of honor, chi, and redemption in the Martial Arts Haven</Text>
        </Box>
      </Box>
    </Box>
  );
};

/**
 * Main Menu - New Game, Load, Credits, Quit
 */
const MainMenu: React.FC<{ onSelect: (screen: Screen) => void }> = ({ onSelect }) => {
  const { exit } = useApp();
  const isGameActive = GameStore.isInitialized();
  const hasSaves = GameStore.getSaveSlots().length > 0;

  const menuItems: MenuItem[] = [];

  if (isGameActive) {
    menuItems.push({ label: '▸ Continue Journey', value: 'stats' });
  }
  menuItems.push({ label: '⚡ New Game', value: 'newgame' });
  if (hasSaves) {
    menuItems.push({ label: '📂 Load Game', value: 'load' });
  }
  menuItems.push({ label: '⚙️  Settings', value: 'settings' });
  menuItems.push({ label: '📜 Credits', value: 'credits' });
  menuItems.push({ label: '🚪 Quit', value: 'quit' });

  const handleSelect = useCallback(
    (item: MenuItem) => {
      if (item.value === 'quit') {
        exit();
      } else {
        onSelect(item.value as Screen);
      }
    },
    [exit, onSelect]
  );

  // Game status info (only if game is active)
  const progress = isGameActive ? GameStore.getState().storyProgress : null;
  const player = isGameActive ? GameStore.getPlayer() : null;

  return (
    <Box flexDirection="column" height="100%" justifyContent="center" alignItems="center">
      <Box flexDirection="column" alignItems="center" borderStyle="double" borderColor="yellow" padding={2}>
        {/* Header with decorative elements */}
        <Box marginBottom={1}>
          <Text color="yellow">════════════════════════════════════</Text>
        </Box>

        <Text bold color="cyan">
          THE BEGGARS SECT
        </Text>
        <Text dimColor italic>
          丐 帮
        </Text>

        <Box marginTop={1} marginBottom={1}>
          <Text color="yellow">════════════════════════════════════</Text>
        </Box>

        {/* Current game status (if active) */}
        {isGameActive && player && progress && (
          <Box flexDirection="column" alignItems="center" marginBottom={2} paddingX={2}>
            <Text dimColor>─── Current Game ───</Text>
            <Box marginTop={1}>
              <Text>
                <Text bold color="yellow">{player.name}</Text>
                <Text dimColor> | </Text>
                <Text color="magenta">{player.stance.charAt(0).toUpperCase() + player.stance.slice(1)} Stance</Text>
              </Text>
            </Box>
            <Box>
              <Text dimColor>
                Chapter: {progress.chapter} | Scene: {progress.scene}
              </Text>
            </Box>
            <Box marginTop={1} marginBottom={1}>
              <Text color="gray">───────────────────────────────────</Text>
            </Box>
          </Box>
        )}

        {/* Menu */}
        <Box flexDirection="column" minWidth={40}>
          <SelectInputComponent items={menuItems} onSelect={handleSelect} />
        </Box>

        {/* Footer */}
        <Box marginTop={2}>
          <Text dimColor>Use ↑↓ arrows and Enter to select</Text>
        </Box>
      </Box>
    </Box>
  );
};

/**
 * New Game Screen - Initialize game state
 */
const NewGameScreen: React.FC<{ onComplete: () => void; onBack: () => void }> = ({
  onComplete,
  onBack,
}) => {
  const [stage, setStage] = useState<'confirm' | 'creating' | 'done'>('confirm');
  const completionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (completionTimeoutRef.current) {
        clearTimeout(completionTimeoutRef.current);
      }
    };
  }, []);

  const handleConfirm = useCallback((item: MenuItem) => {
    if (item.value === 'yes') {
      setStage('creating');
      // Initialize game
      const player = createPlayer();
      GameStore.initializeNewGame(player);
      setStage('done');
      completionTimeoutRef.current = setTimeout(() => {
        completionTimeoutRef.current = null;
        onComplete();
      }, 1000);
    } else {
      onBack();
    }
  }, [onComplete, onBack]);

  if (stage === 'confirm') {
    const confirmItems: MenuItem[] = [
      { label: 'Yes, Begin Journey', value: 'yes' },
      { label: 'No, Return to Menu', value: 'no' },
    ];
    return (
      <Box flexDirection="column" padding={1}>
        <Text bold color="cyan">
          NEW GAME
        </Text>
        <Box marginTop={1}>
          <Text>
            You are about to begin a new journey as <Text color="yellow">Li Wei</Text>,
          </Text>
        </Box>
        <Text>
          a beggar with no memory of his past.
        </Text>
        <Box marginTop={2}>
          <SelectInputComponent items={confirmItems} onSelect={handleConfirm} />
        </Box>
      </Box>
    );
  }

  if (stage === 'creating') {
    return (
      <Box flexDirection="column" padding={1}>
        <Text color="yellow">Awakening in the alley...</Text>
      </Box>
    );
  }

  return (
    <Box flexDirection="column" padding={1}>
      <Text color="green">Li Wei opens his eyes.</Text>
    </Box>
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
}> = ({
  onBack,
  onCombat,
  onStory,
  onSave,
}) => {
  const menuItems: MenuItem[] = [
    { label: '📖 Play Story (Prologue)', value: 'story' },
    { label: '⚔️  Test Combat', value: 'combat' },
    { label: '💾 Save Game', value: 'save' },
    { label: 'Back to Menu', value: 'back' },
  ];

  const handleSelect = useCallback(
    (item: MenuItem) => {
      if (item.value === 'back') {
        onBack();
      } else if (item.value === 'combat') {
        onCombat();
      } else if (item.value === 'story') {
        onStory();
      } else if (item.value === 'save') {
        onSave();
      }
    },
    [onBack, onCombat, onStory, onSave]
  );

  if (!GameStore.isInitialized()) {
    return (
      <Box flexDirection="column" padding={1}>
        <Text color="red">No game in progress.</Text>
      </Box>
    );
  }

  const player = GameStore.getPlayer();
  const progress = GameStore.getStoryProgress();

  return (
    <Box flexDirection="column" padding={1}>
      <Text bold color="cyan">
        CHARACTER STATUS
      </Text>
      <Box marginTop={1} flexDirection="column">
        <Box>
          <Text color="yellow">{player.name}</Text>
          <Text dimColor> - The Beggar</Text>
        </Box>
        <Box marginTop={1}>
          <Text>
            HP: <Text color={player.hp < player.maxHp * 0.3 ? 'red' : 'green'}>
              {player.hp}/{player.maxHp}
            </Text>
          </Text>
        </Box>
        <Box>
          <Text>
            Chi: <Text color="blue">{player.chi}/{player.maxChi}</Text>
          </Text>
        </Box>
        <Box>
          <Text>
            Inverse Chi: <Text color="magenta">{player.inverseChi}/{player.maxInverseChi}</Text>
          </Text>
        </Box>
        <Box marginTop={1}>
          <Text dimColor>Stats:</Text>
        </Box>
        <Box paddingLeft={2} flexDirection="column">
          <Text>STR: {player.stats.str} | DEX: {player.stats.dex}</Text>
          <Text>END: {player.stats.end} | WIS: {player.stats.wis}</Text>
        </Box>
        <Box marginTop={1}>
          <Text>
            Stance: <Text color="cyan">{player.stance}</Text>
          </Text>
        </Box>
        <Box>
          <Text>
            Chapter: <Text color="white">{progress.chapter}</Text> | Scene: <Text dimColor>{progress.scene}</Text>
          </Text>
        </Box>
        <Box marginTop={1}>
          <Text dimColor>Techniques: {player.techniques.join(', ')}</Text>
        </Box>
      </Box>
      <Box marginTop={2}>
        <SelectInputComponent items={menuItems} onSelect={handleSelect} />
      </Box>
    </Box>
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
    <Box flexDirection="column" height="100%" justifyContent="center" alignItems="center">
      <Box flexDirection="column" alignItems="center" borderStyle="round" borderColor="cyan" padding={3} minWidth={60}>
        {/* Header */}
        <Text bold color="cyan">
          ═══ CREDITS ═══
        </Text>

        <Box marginTop={2} flexDirection="column" alignItems="center">
          <Text bold color="yellow">
            The Beggars Sect: Li Wei's Ascension
          </Text>
          <Text dimColor italic>丐 帮 ： 李 伟 的 崛 起</Text>
        </Box>

        <Box marginTop={2} marginBottom={1}>
          <Text color="gray">─────────────────────────────────────</Text>
        </Box>

        {/* Creator */}
        <Box marginTop={1} flexDirection="column" alignItems="center">
          <Text dimColor>Created by</Text>
          <Text bold color="yellow">Mito (Mitchell Grebe)</Text>
          <Text dimColor>With assistance from Claude</Text>
        </Box>

        <Box marginTop={2} flexDirection="column" alignItems="center">
          <Text dimColor>Part of the <Text color="cyan">genkaw.com</Text> universe</Text>
        </Box>

        <Box marginTop={2} marginBottom={2}>
          <Text color="gray">─────────────────────────────────────</Text>
        </Box>

        {/* Tech */}
        <Box flexDirection="column" alignItems="center">
          <Text dimColor>Built with</Text>
          <Text color="magenta">Ink • React • TypeScript</Text>
        </Box>

        <Box marginTop={2}>
          <Text dimColor>Version 0.3.7</Text>
        </Box>

        {/* Back prompt */}
        <Box marginTop={3}>
          <Text color="cyan">▸ Press Enter or Escape to return ◂</Text>
        </Box>
      </Box>
    </Box>
  );
};

// =============================================================================
// MAIN APP
// =============================================================================

export const App: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('title');
  const [combatEnemies, setCombatEnemies] = useState<Enemy[]>([]);
  const [returnToStory, setReturnToStory] = useState(false);
  const [storyCombatResult, setStoryCombatResult] = useState<'victory' | 'defeat' | 'fled' | null>(null);
  const [combatCanLose, setCombatCanLose] = useState(true);

  // Timeout ref for combat retry screen transition
  const combatRetryTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (combatRetryTimeoutRef.current) {
        clearTimeout(combatRetryTimeoutRef.current);
      }
    };
  }, []);

  const goToMenu = useCallback(() => setScreen('menu'), []);
  const goToStats = useCallback(() => setScreen('stats'), []);
  const goToStory = useCallback(() => setScreen('story'), []);
  const goToSave = useCallback(() => setScreen('save'), []);
  const goToLoad = useCallback(() => setScreen('load'), []);

  const startCombat = useCallback(() => {
    // Create a test enemy
    const enemy = createEnemy('street-punk');
    setCombatEnemies([enemy]);
    setReturnToStory(false);
    setScreen('combat');
  }, []);

  // Handle combat starting from story
  const handleStoryCombat = useCallback((enemies: Enemy[], canLose: boolean) => {
    setCombatEnemies(enemies);
    setReturnToStory(true);
    setCombatCanLose(canLose);
    setScreen('combat');
  }, []);

  // Handle story completion
  const handleStoryEnd = useCallback((state: StoryState) => {
    // Story ended - could save state here
    goToStats();
  }, [goToStats]);

  const handleCombatEnd = useCallback(
    (result: 'victory' | 'defeat' | 'fled', updatedPlayer: Character) => {
      // Update player state in GameStore
      if (result === 'victory') {
        // Sync player state from combat
        GameStore.updatePlayer({
          hp: updatedPlayer.hp,
          chi: updatedPlayer.chi,
          inverseChi: updatedPlayer.inverseChi,
          masteryLevels: updatedPlayer.masteryLevels,
          statusEffects: [],
        });
      } else if (result === 'defeat') {
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
          const newEnemies = combatEnemies.map(e => {
            const enemy = createEnemy(e.templateId);
            scaleEnemyForChapter(enemy, currentChapter);
            return enemy;
          });
          setCombatEnemies(newEnemies);
          // Force re-render by briefly changing screen
          setScreen('story');
          combatRetryTimeoutRef.current = setTimeout(() => {
            combatRetryTimeoutRef.current = null;
            setScreen('combat');
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
      } else {
        goToStats();
      }
    },
    [goToStats, goToStory, returnToStory, combatCanLose, combatEnemies]
  );

  const handleCombatResultHandled = useCallback(() => {
    setStoryCombatResult(null);
  }, []);

  return (
    <Box flexDirection="column">
      {screen === 'title' && <TitleScreen onContinue={goToMenu} />}
      {screen === 'menu' && <MainMenu onSelect={setScreen} />}
      {screen === 'newgame' && (
        <NewGameScreen onComplete={goToStats} onBack={goToMenu} />
      )}
      {screen === 'stats' && (
        <StatsScreen onBack={goToMenu} onCombat={startCombat} onStory={goToStory} onSave={goToSave} />
      )}
      {screen === 'story' && GameStore.isInitialized() && (
        <StoryScreen
          player={GameStore.getPlayer()}
          onCombatStart={handleStoryCombat}
          onGameEnd={handleStoryEnd}
          onQuitToMenu={goToMenu}
          combatResult={storyCombatResult}
          onCombatResultHandled={handleCombatResultHandled}
        />
      )}
      {screen === 'combat' && GameStore.isInitialized() && (
        <CombatScreen
          player={GameStore.getPlayer()}
          enemies={combatEnemies}
          onCombatEnd={handleCombatEnd}
        />
      )}
      {screen === 'credits' && <CreditsScreen onBack={goToMenu} />}
      {screen === 'settings' && <SettingsScreen onBack={goToMenu} />}
      {screen === 'save' && (
        <SaveLoadScreen mode="save" onComplete={goToStats} onBack={goToStats} />
      )}
      {screen === 'load' && (
        <SaveLoadScreen mode="load" onComplete={goToStats} onBack={goToMenu} />
      )}
    </Box>
  );
};
