import React, { useState, useCallback } from 'react';
import { Box, Text, useApp, useInput } from 'ink';
import SelectInput from 'ink-select-input';

import { GameStore } from '../game/state/GameStore.js';
import { createPlayer } from '../game/factories/CharacterFactory.js';

// =============================================================================
// TYPES
// =============================================================================

type Screen = 'title' | 'menu' | 'newgame' | 'stats' | 'combat-test' | 'credits';

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

  return (
    <Box flexDirection="column" alignItems="center" padding={1}>
      <Text bold color="yellow">
        ═══════════════════════════════════════════
      </Text>
      <Text bold color="cyan">
        {' '}THE BEGGARS SECT{' '}
      </Text>
      <Text color="white">
        丐帮：李伟的崛起
      </Text>
      <Text bold color="yellow">
        ═══════════════════════════════════════════
      </Text>
      <Box marginTop={1}>
        <Text dimColor italic>
          Li Wei's Ascension
        </Text>
      </Box>
      <Box marginTop={2}>
        <Text color="gray">
          Press any key to continue...
        </Text>
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

  const menuItems: MenuItem[] = isGameActive
    ? [
        { label: 'Continue', value: 'stats' },
        { label: 'New Game', value: 'newgame' },
        { label: 'Credits', value: 'credits' },
        { label: 'Quit', value: 'quit' },
      ]
    : [
        { label: 'New Game', value: 'newgame' },
        { label: 'Credits', value: 'credits' },
        { label: 'Quit', value: 'quit' },
      ];

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

  return (
    <Box flexDirection="column" padding={1}>
      <Text bold color="cyan">
        THE BEGGARS SECT
      </Text>
      <Text dimColor>
        A CLI RPG in the Martial Arts Haven
      </Text>
      <Box marginTop={1} flexDirection="column">
        <SelectInput items={menuItems} onSelect={handleSelect} />
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

  useInput((input, key) => {
    if (stage === 'confirm') {
      if (input === 'y' || key.return) {
        setStage('creating');
        // Initialize game
        const player = createPlayer();
        GameStore.initializeNewGame(player);
        setStage('done');
        setTimeout(onComplete, 1000);
      } else if (input === 'n' || key.escape) {
        onBack();
      }
    }
  });

  if (stage === 'confirm') {
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
        <Box marginTop={1}>
          <Text dimColor>
            Start new game? (Y/n)
          </Text>
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
const StatsScreen: React.FC<{ onBack: () => void; onCombatTest: () => void }> = ({
  onBack,
  onCombatTest,
}) => {
  const menuItems: MenuItem[] = [
    { label: 'Combat Test (Dev)', value: 'combat-test' },
    { label: 'Back to Menu', value: 'back' },
  ];

  const handleSelect = useCallback(
    (item: MenuItem) => {
      if (item.value === 'back') {
        onBack();
      } else if (item.value === 'combat-test') {
        onCombatTest();
      }
    },
    [onBack, onCombatTest]
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
        <SelectInput items={menuItems} onSelect={handleSelect} />
      </Box>
    </Box>
  );
};

/**
 * Combat Test Screen - Dev feature to test combat creation
 */
const CombatTestScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  useInput((_input, key) => {
    if (key.escape || key.return) {
      onBack();
    }
  });

  return (
    <Box flexDirection="column" padding={1}>
      <Text bold color="red">
        COMBAT TEST (Dev)
      </Text>
      <Box marginTop={1}>
        <Text dimColor>
          Combat system is planned for Week 2.
        </Text>
      </Box>
      <Box marginTop={1}>
        <Text dimColor>
          Week 1 Foundation:
        </Text>
      </Box>
      <Box paddingLeft={2} flexDirection="column">
        <Text color="green">✓ Type definitions created</Text>
        <Text color="green">✓ GameStore implemented</Text>
        <Text color="green">✓ CharacterFactory implemented</Text>
        <Text color="green">✓ Basic CLI shell working</Text>
      </Box>
      <Box marginTop={2}>
        <Text color="gray">Press Enter to go back...</Text>
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
    <Box flexDirection="column" padding={1}>
      <Text bold color="cyan">
        CREDITS
      </Text>
      <Box marginTop={1} flexDirection="column">
        <Text>
          <Text bold>The Beggars Sect: Li Wei's Ascension</Text>
        </Text>
        <Box marginTop={1}>
          <Text>Created by: <Text color="yellow">Mito (Mitchell Grebe)</Text></Text>
        </Box>
        <Text dimColor>With assistance from Claude</Text>
        <Box marginTop={1}>
          <Text dimColor>
            Part of the genkaw.com universe
          </Text>
        </Box>
        <Box marginTop={1}>
          <Text dimColor>
            Built with Ink, React, and TypeScript
          </Text>
        </Box>
      </Box>
      <Box marginTop={2}>
        <Text color="gray">Press Enter to go back...</Text>
      </Box>
    </Box>
  );
};

// =============================================================================
// MAIN APP
// =============================================================================

export const App: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('title');

  const goToMenu = useCallback(() => setScreen('menu'), []);
  const goToStats = useCallback(() => setScreen('stats'), []);

  return (
    <Box flexDirection="column">
      {screen === 'title' && <TitleScreen onContinue={goToMenu} />}
      {screen === 'menu' && <MainMenu onSelect={setScreen} />}
      {screen === 'newgame' && (
        <NewGameScreen onComplete={goToStats} onBack={goToMenu} />
      )}
      {screen === 'stats' && (
        <StatsScreen onBack={goToMenu} onCombatTest={() => setScreen('combat-test')} />
      )}
      {screen === 'combat-test' && <CombatTestScreen onBack={goToStats} />}
      {screen === 'credits' && <CreditsScreen onBack={goToMenu} />}
    </Box>
  );
};
