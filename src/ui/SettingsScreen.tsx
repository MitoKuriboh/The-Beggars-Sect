/**
 * Settings Screen
 * Allows players to customize game options
 */

import React, { useState, useCallback } from 'react';
import { Box, Text, useInput } from 'ink';
import { GameStore } from '../game/state/GameStore';
import { CenteredScreen, PolishedBox } from './components/PolishedBox';
import { SelectMenu } from './components/Menu';
import type { MenuItem } from './components/Menu';

// =============================================================================
// TYPES
// =============================================================================

interface SettingsScreenProps {
  onBack: () => void;
}

// =============================================================================
// SETTINGS SCREEN
// =============================================================================

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ onBack }) => {
  const [selectedSetting, setSelectedSetting] = useState<string | null>(null);
  const settings = GameStore.getSettings();

  // Force re-render when settings change
  const [, forceUpdate] = useState({});
  const refresh = useCallback(() => forceUpdate({}), []);

  useInput((input, key) => {
    if (key.escape) {
      if (selectedSetting) {
        setSelectedSetting(null);
      } else {
        onBack();
      }
    }
  });

  // Main settings menu items
  const menuItems: MenuItem[] = [
    {
      label: `Typewriter Effect: ${settings.typewriterEnabled ? '✓ ON' : '✗ OFF'}`,
      value: 'typewriter-toggle',
    },
    {
      label: `Text Speed: ${settings.typewriterSpeed} cps`,
      value: 'typewriter-speed',
    },
    { label: '← Back', value: 'back' },
  ];

  // Speed options
  const speedOptions: MenuItem[] = [
    { label: 'Slow (30 cps)', value: '30' },
    { label: 'Normal (50 cps)', value: '50' },
    { label: 'Fast (70 cps)', value: '70' },
    { label: 'Very Fast (90 cps)', value: '90' },
    { label: '← Back', value: 'back' },
  ];

  const handleMainSelect = useCallback(
    (item: MenuItem) => {
      switch (item.value) {
        case 'typewriter-toggle':
          GameStore.toggleTypewriter();
          refresh();
          break;
        case 'typewriter-speed':
          setSelectedSetting('speed');
          break;
        case 'back':
          onBack();
          break;
      }
    },
    [onBack, refresh]
  );

  const handleSpeedSelect = useCallback(
    (item: MenuItem) => {
      if (item.value === 'back') {
        setSelectedSetting(null);
      } else {
        GameStore.setTypewriterSpeed(parseInt(item.value, 10));
        setSelectedSetting(null);
        refresh();
      }
    },
    [refresh]
  );

  // Speed selection submenu
  if (selectedSetting === 'speed') {
    return (
      <CenteredScreen>
        <PolishedBox
          title="TEXT SPEED"
          subtitle="Characters per second (cps). Higher = faster text."
          icon="⚙"
          footer="Press ESC to go back"
        >
          <SelectMenu items={speedOptions} onSelect={handleSpeedSelect} />

          <Box marginTop={1}>
            <Text dimColor>Current: <Text bold color="yellow">{settings.typewriterSpeed} cps</Text></Text>
          </Box>
        </PolishedBox>
      </CenteredScreen>
    );
  }

  // Main settings menu
  return (
    <CenteredScreen>
      <PolishedBox
        title="SETTINGS"
        subtitle="Accessibility & Display Options"
        icon="⚙"
        footer="Press ESC to return to main menu"
      >
        <SelectMenu items={menuItems} onSelect={handleMainSelect} />

        {/* Setting descriptions */}
        <Box marginTop={1} flexDirection="column" borderStyle="single" borderColor="gray" paddingX={2} paddingY={1} width={55}>
          <Text bold color="yellow">ℹ Setting Info</Text>
          <Text dimColor><Text bold color="cyan">Typewriter:</Text> Text appears character</Text>
          <Text dimColor>by character. Press SPACE to skip.</Text>
          <Text dimColor><Text bold color="cyan">Speed:</Text> How fast text appears (cps).</Text>
        </Box>
      </PolishedBox>
    </CenteredScreen>
  );
};
