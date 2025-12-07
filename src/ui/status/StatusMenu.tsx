/**
 * Status Menu Component
 * Main status/info screen showing character progression, paths, and relationships
 * Can be triggered in-scene with keyboard shortcut
 */

import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import type { Character, StoryState } from '../../types/index';
import { PathDisplay } from './PathDisplay';
import { StatsDisplay } from './StatsDisplay';
import { RelationshipsDisplay } from './RelationshipsDisplay';
import { AspectLoadoutDisplay } from './AspectLoadoutDisplay';
import { SaveLoadTab } from './SaveLoadTab';
import { CenteredScreen, useTerminalHeight } from '../components/PolishedBox';
import { Header } from '../components/Decorative';
import { SEMANTIC_DIVIDERS } from '../theme/dividers';

interface StatusMenuProps {
  player: Character;
  storyState: StoryState;
  onClose: () => void;
  onSaveLoad?: () => void;
  onQuitToMenu?: () => void;
}

type TabKey = 'stats' | 'paths' | 'aspects' | 'relationships' | 'progress' | 'saveload';

interface Tab {
  key: TabKey;
  label: string;
  shortcut: string;
}

const TABS: Tab[] = [
  { key: 'stats', label: 'Stats', shortcut: '1' },
  { key: 'paths', label: 'Paths', shortcut: '2' },
  { key: 'aspects', label: 'Aspects', shortcut: '3' },
  { key: 'relationships', label: 'Relationships', shortcut: '4' },
  { key: 'progress', label: 'Progress', shortcut: '5' },
  { key: 'saveload', label: 'Save/Load', shortcut: '6' },
];

export const StatusMenu: React.FC<StatusMenuProps> = ({ player, storyState, onClose, onSaveLoad, onQuitToMenu }) => {
  const [activeTab, setActiveTab] = useState<TabKey>('paths');
  const terminalHeight = useTerminalHeight();

  const handleSaveLoadComplete = () => {
    onSaveLoad?.();
    onClose();
  };

  const handleQuitToMenu = () => {
    onQuitToMenu?.();
  };

  useInput((input, key) => {
    // Close with escape
    if (key.escape) {
      onClose();
      return;
    }

    // Tab navigation with left/right arrows
    if (key.leftArrow) {
      const currentIndex = TABS.findIndex(t => t.key === activeTab);
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : TABS.length - 1;
      setActiveTab(TABS[prevIndex]!.key);
    } else if (key.rightArrow) {
      const currentIndex = TABS.findIndex(t => t.key === activeTab);
      const nextIndex = currentIndex < TABS.length - 1 ? currentIndex + 1 : 0;
      setActiveTab(TABS[nextIndex]!.key);
    }
  });

  return (
    <Box flexDirection="column" borderStyle="double" borderColor="yellow" paddingX={2} paddingY={0} width={74}>
      {/* Header */}
      <Box marginY={1} justifyContent="center">
        <Text bold color="yellow">
          ⚡ CHARACTER STATUS
        </Text>
      </Box>

      {/* Divider */}
      <Box justifyContent="center">
        <Text color="yellow" dimColor>{SEMANTIC_DIVIDERS.status}</Text>
      </Box>

      {/* Tab Navigation */}
      <Box marginY={1} justifyContent="space-around">
        {TABS.map((tab) => (
          <Text
            key={tab.key}
            bold={activeTab === tab.key}
            color={activeTab === tab.key ? 'cyan' : 'white'}
            dimColor={activeTab === tab.key ? false : true}
          >
            {tab.label}
          </Text>
        ))}
      </Box>

      {/* Divider */}
      <Box justifyContent="center">
        <Text color="yellow" dimColor>{SEMANTIC_DIVIDERS.status}</Text>
      </Box>

      {/* Tab Content */}
      <Box
        minHeight={22}
        paddingX={1}
        paddingY={1}
        flexDirection="column"
      >
        {activeTab === 'stats' && <StatsDisplay player={player} />}
        {activeTab === 'paths' && <PathDisplay pathScores={storyState.pathPercentages} />}
        {activeTab === 'aspects' && (
          <AspectLoadoutDisplay
            player={player}
            currentChapter={parseInt(storyState.currentChapter.replace('prologue', '0').replace('chapter-', ''))}
          />
        )}
        {activeTab === 'relationships' && (
          <RelationshipsDisplay relationships={storyState.relationships} />
        )}
        {activeTab === 'progress' && (
          <Box flexDirection="column">
            <Box marginBottom={1} justifyContent="center">
              <Text bold color="cyan">
                道 JOURNEY
              </Text>
            </Box>
            <Box flexDirection="column" paddingX={2}>
              <Box marginBottom={1}>
                <Text dimColor>Chapter: </Text>
                <Text color="cyan" bold>{storyState.currentChapter.toUpperCase()}</Text>
              </Box>
              <Box marginBottom={1}>
                <Text dimColor>Scenes: </Text>
                <Text color="cyan">{storyState.completedScenes.length}</Text>
              </Box>
              <Box marginBottom={1}>
                <Text dimColor>Choices: </Text>
                <Text color="cyan">{storyState.choiceHistory.length}</Text>
              </Box>
              {storyState.discoveredItems.length > 0 && (
                <Box marginTop={1} flexDirection="column">
                  <Text bold>Items:</Text>
                  <Box paddingLeft={2} flexDirection="column">
                    {storyState.discoveredItems.map((item) => (
                      <Text key={item} dimColor>
                        • {item}
                      </Text>
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        )}
        {activeTab === 'saveload' && (
          <SaveLoadTab
            onSaveComplete={handleSaveLoadComplete}
            onLoadComplete={handleSaveLoadComplete}
            onQuitToMenu={handleQuitToMenu}
          />
        )}
      </Box>

      {/* Divider */}
      <Box justifyContent="center">
        <Text color="yellow" dimColor>{SEMANTIC_DIVIDERS.status}</Text>
      </Box>

      {/* Footer */}
      <Box marginY={1} justifyContent="center">
        <Text dimColor italic>← → switch tabs  •  ESC to close</Text>
      </Box>
    </Box>
  );
};
