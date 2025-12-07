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
import { SaveLoadTab } from './SaveLoadTab';

interface StatusMenuProps {
  player: Character;
  storyState: StoryState;
  onClose: () => void;
  onSaveLoad?: () => void;
  onQuitToMenu?: () => void;
}

type TabKey = 'stats' | 'paths' | 'relationships' | 'progress' | 'saveload';

interface Tab {
  key: TabKey;
  label: string;
  shortcut: string;
}

const TABS: Tab[] = [
  { key: 'stats', label: 'Stats', shortcut: '1' },
  { key: 'paths', label: 'Paths', shortcut: '2' },
  { key: 'relationships', label: 'Relationships', shortcut: '3' },
  { key: 'progress', label: 'Progress', shortcut: '4' },
  { key: 'saveload', label: 'Save/Load', shortcut: '5' },
];

export const StatusMenu: React.FC<StatusMenuProps> = ({ player, storyState, onClose, onSaveLoad, onQuitToMenu }) => {
  const [activeTab, setActiveTab] = useState<TabKey>('paths');

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
    <Box flexDirection="column" borderStyle="double" borderColor="yellow" padding={1}>
      {/* Header */}
      <Box marginBottom={1} justifyContent="center">
        <Text bold color="yellow">
          ═══ CHARACTER STATUS ═══
        </Text>
      </Box>

      {/* Tab Navigation */}
      <Box marginBottom={1} justifyContent="space-around">
        {TABS.map((tab) => (
          <Box key={tab.key}>
            <Text
              bold={activeTab === tab.key}
              color={activeTab === tab.key ? 'cyan' : 'white'}
              dimColor={activeTab === tab.key ? false : true}
            >
              {activeTab === tab.key ? '▸ ' : ''}{tab.label}{activeTab === tab.key ? ' ◂' : ''}
            </Text>
          </Box>
        ))}
      </Box>

      {/* Tab Content */}
      <Box
        minHeight={20}
        borderStyle="single"
        borderColor="gray"
        padding={1}
        flexDirection="column"
      >
        {activeTab === 'stats' && <StatsDisplay player={player} />}
        {activeTab === 'paths' && <PathDisplay pathScores={storyState.pathScores} />}
        {activeTab === 'relationships' && (
          <RelationshipsDisplay relationships={storyState.relationships} />
        )}
        {activeTab === 'progress' && (
          <Box flexDirection="column">
            <Box marginBottom={1}>
              <Text bold color="yellow">
                道 JOURNEY PROGRESS
              </Text>
            </Box>
            <Box flexDirection="column">
              <Box marginBottom={1}>
                <Text bold>Current Chapter:</Text>
                <Text> {storyState.currentChapter.toUpperCase()}</Text>
              </Box>
              <Box marginBottom={1}>
                <Text bold>Scenes Completed:</Text>
                <Text> {storyState.completedScenes.length}</Text>
              </Box>
              <Box marginBottom={1}>
                <Text bold>Choices Made:</Text>
                <Text> {storyState.choiceHistory.length}</Text>
              </Box>
              {storyState.discoveredItems.length > 0 && (
                <Box marginBottom={1} flexDirection="column">
                  <Text bold>Items Discovered:</Text>
                  {storyState.discoveredItems.map((item) => (
                    <Text key={item} dimColor>
                      • {item}
                    </Text>
                  ))}
                </Box>
              )}
              {Object.keys(storyState.flags).length > 0 && (
                <Box marginTop={1} flexDirection="column">
                  <Text bold dimColor>
                    Story Flags:
                  </Text>
                  <Box flexDirection="column" marginLeft={2}>
                    {Object.entries(storyState.flags).map(([key, value]) => (
                      <Text key={key} dimColor>
                        {key}: {String(value)}
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

      {/* Footer */}
      <Box marginTop={1} justifyContent="center">
        <Text dimColor>[←→] Switch Tabs  |  [ESC] Close</Text>
      </Box>
    </Box>
  );
};
