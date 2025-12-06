/**
 * Settings Screen
 * Allows players to customize game options
 */

import React, { useState, useCallback } from 'react';
import { Box, Text, useInput } from 'ink';
import SelectInput from 'ink-select-input';
import { GameStore } from '../game/state/GameStore';

const SelectInputComponent = (SelectInput as any).default || SelectInput;

// =============================================================================
// TYPES
// =============================================================================

interface MenuItem {
  label: string;
  value: string;
}

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
      <Box flexDirection="column" padding={1}>
        <Text bold color="cyan">
          ═══ TEXT SPEED ═══
        </Text>
        <Box marginTop={1}>
          <Text dimColor>
            Characters per second (cps). Higher = faster text.
          </Text>
        </Box>
        <Box marginTop={1} flexDirection="column">
          <SelectInputComponent items={speedOptions} onSelect={handleSpeedSelect} />
        </Box>
        <Box marginTop={1}>
          <Text dimColor>
            Current: {settings.typewriterSpeed} cps
          </Text>
        </Box>
        <Box marginTop={1}>
          <Text color="gray">ESC to go back</Text>
        </Box>
      </Box>
    );
  }

  // Main settings menu
  return (
    <Box flexDirection="column" padding={1}>
      <Text bold color="cyan">
        ═══ SETTINGS ═══
      </Text>
      <Box marginTop={1} flexDirection="column">
        <Text dimColor>Accessibility & Display Options</Text>
      </Box>

      <Box marginTop={1} flexDirection="column">
        <SelectInputComponent items={menuItems} onSelect={handleMainSelect} />
      </Box>

      {/* Setting descriptions */}
      <Box marginTop={2} flexDirection="column" borderStyle="single" borderColor="gray" padding={1}>
        <Text bold color="yellow">Setting Info:</Text>
        <Box marginTop={1}>
          <Text>
            <Text bold>Typewriter Effect:</Text> When ON, text appears character
          </Text>
        </Box>
        <Text>
          by character for immersive storytelling. Press SPACE to skip.
        </Text>
        <Box marginTop={1}>
          <Text>
            <Text bold>Text Speed:</Text> How fast text appears when typewriter
          </Text>
        </Box>
        <Text>
          is enabled. Higher values = faster text display.
        </Text>
      </Box>

      <Box marginTop={1}>
        <Text color="gray">ESC to go back</Text>
      </Box>
    </Box>
  );
};
