/**
 * Navigation Screen
 * UI for multi-area movement and location exploration
 */

import React, { useState, useCallback, useEffect } from 'react';
import { Box, Text, useInput } from 'ink';
import type { NavigationLocation, TravelOption, DangerLevel } from '../../types/navigation';
import type { NavigationExplorationArea } from '../../types/navigation';
import { SelectInputComponent } from '../components/SelectInputWrapper';
import { ContentBlock } from '../story/ContentRenderer';
import { SYMBOLS } from '../theme/decorations';
import { atmosphericColors } from '../theme/colors';
import { NavigationEngine } from '../../game/navigation/NavigationEngine';

// =============================================================================
// TYPES
// =============================================================================

interface NavigationMenuItem {
  label: string;
  value: string;
}

interface NavigationScreenProps {
  engine: NavigationEngine;
  onCombat: (enemies: string[], canFlee: boolean) => void;
  onStoryTrigger: (sceneId: string) => void;
  onExit: () => void;
  allowTravel: boolean;
}

// =============================================================================
// HELPERS
// =============================================================================

/**
 * Get colour for danger level
 */
function getDangerColour(level: DangerLevel): string {
  switch (level) {
    case 'safe':
      return 'green';
    case 'neutral':
      return 'yellow';
    case 'dangerous':
      return 'red';
    case 'deadly':
      return 'magenta';
  }
}

/**
 * Get symbol for danger level
 */
function getDangerSymbol(level: DangerLevel): string {
  switch (level) {
    case 'safe':
      return SYMBOLS.starHollow;
    case 'neutral':
      return SYMBOLS.circleHollow;
    case 'dangerous':
      return SYMBOLS.circle;
    case 'deadly':
      return SYMBOLS.crossedSwords;
  }
}

// =============================================================================
// COMPONENT
// =============================================================================

export const NavigationScreen: React.FC<NavigationScreenProps> = ({
  engine,
  onCombat,
  onStoryTrigger,
  onExit,
  allowTravel,
}) => {
  const [location, setLocation] = useState<NavigationLocation | undefined>(
    engine.getCurrentLocation()
  );
  const [travelOptions, setTravelOptions] = useState<TravelOption[]>([]);
  const [explorationArea, setExplorationArea] = useState<NavigationExplorationArea | null>(null);
  const [showingContent, setShowingContent] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // Refresh state from engine
  const refreshState = useCallback(() => {
    setLocation(engine.getCurrentLocation());
    setTravelOptions(engine.getTravelOptions());
  }, [engine]);

  // Initial load
  useEffect(() => {
    refreshState();
  }, [refreshState]);

  // Build menu items
  const buildMenuItems = useCallback((): NavigationMenuItem[] => {
    const items: NavigationMenuItem[] = [];

    // Exploration areas
    if (location?.explorationAreas) {
      for (const area of location.explorationAreas) {
        const explored = engine.hasExplored(location.id, area.id);
        items.push({
          label: explored ? `${SYMBOLS.starHollow} ${area.name}` : `${SYMBOLS.bullet} ${area.name}`,
          value: `explore:${area.id}`,
        });
      }

      // Divider
      if (location.explorationAreas.length > 0 && allowTravel) {
        items.push({
          label: '───────────',
          value: '__divider__',
        });
      }
    }

    // Travel options (if enabled)
    if (allowTravel) {
      for (const option of travelOptions) {
        const danger = getDangerSymbol(option.dangerLevel);
        const visited = option.visited ? '(visited)' : '';
        const locked = !option.isUnlocked;

        if (locked) {
          items.push({
            label: `${SYMBOLS.circleHollow} ${option.location.name} [LOCKED]`,
            value: `travel:${option.locationId}`,
          });
        } else {
          items.push({
            label: `${danger} ${option.location.name} ${visited}`.trim(),
            value: `travel:${option.locationId}`,
          });
        }
      }
    }

    // Exit/Continue option
    items.push({
      label: `${SYMBOLS.arrowRight} Continue Story`,
      value: '__exit__',
    });

    return items;
  }, [location, travelOptions, allowTravel, engine]);

  // Handle menu selection
  const handleSelect = useCallback(
    (item: NavigationMenuItem) => {
      if (item.value === '__divider__') return;

      if (item.value === '__exit__') {
        onExit();
        return;
      }

      if (item.value.startsWith('explore:')) {
        const areaId = item.value.slice(8);
        const area = location?.explorationAreas?.find(a => a.id === areaId);
        if (area) {
          setExplorationArea(area);
          setShowingContent(true);
          engine.explore(areaId);
        }
        return;
      }

      if (item.value.startsWith('travel:')) {
        const destinationId = item.value.slice(7);
        const result = engine.travel(destinationId);

        switch (result.action) {
          case 'moved':
            setMessage(`Arrived at ${result.location?.name ?? 'unknown'}.`);
            refreshState();
            break;

          case 'encounter':
            if (result.encounter) {
              onCombat(result.encounter.enemies, result.encounter.canFlee);
            }
            break;

          case 'blocked':
            setMessage(result.message ?? 'Cannot travel there.');
            break;

          case 'story-trigger':
            if (result.storySceneId) {
              onStoryTrigger(result.storySceneId);
            }
            break;
        }
      }
    },
    [location, engine, onCombat, onStoryTrigger, onExit, refreshState]
  );

  // Handle input when viewing content
  useInput((input, key) => {
    if (showingContent && (key.return || input === ' ' || key.escape)) {
      setShowingContent(false);
      setExplorationArea(null);
    }

    // Clear message on any input
    if (message) {
      setMessage(null);
    }
  });

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER: Exploration area content
  // ─────────────────────────────────────────────────────────────────────────

  if (showingContent && explorationArea) {
    return (
      <Box flexDirection="column">
        {/* Header flourish */}
        <Box marginBottom={1} justifyContent="center">
          <Text color={atmosphericColors.menuAccent} dimColor>
            ─────────── {SYMBOLS.diamond} ───────────
          </Text>
        </Box>

        {/* Area name */}
        <Box justifyContent="center" marginBottom={1}>
          <Text bold color="cyan">
            {SYMBOLS.star} {explorationArea.name.toUpperCase()} {SYMBOLS.star}
          </Text>
        </Box>

        {/* Description */}
        <Box justifyContent="center" marginBottom={1}>
          <Text dimColor italic>
            {explorationArea.description}
          </Text>
        </Box>

        {/* Divider */}
        <Box marginBottom={1} justifyContent="center">
          <Text color={atmosphericColors.menuAccent} dimColor>
            ─────────── {SYMBOLS.yinYang} ───────────
          </Text>
        </Box>

        {/* Content */}
        <Box marginY={1} paddingX={2}>
          <ContentBlock
            lines={explorationArea.content.map(c => {
              if (c.type === 'dialogue' && c.speaker) {
                return { type: 'dialogue' as const, speaker: c.speaker, text: c.text };
              }
              if (c.type === 'system') {
                return { type: 'system' as const, text: c.text };
              }
              return { type: 'narration' as const, text: c.text };
            })}
            showAll
          />
        </Box>

        {/* Bottom flourish */}
        <Box marginTop={1} justifyContent="center">
          <Text color={atmosphericColors.menuAccent} dimColor>
            ─────────── {SYMBOLS.diamond} ───────────
          </Text>
        </Box>

        {/* Return prompt */}
        <Box marginTop={1} justifyContent="center">
          <Text color="cyan">
            {SYMBOLS.bullet} Press SPACE to return {SYMBOLS.bulletHollow}
          </Text>
        </Box>
      </Box>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER: Main navigation menu
  // ─────────────────────────────────────────────────────────────────────────

  if (!location) {
    return (
      <Box>
        <Text color="red">Error: No location loaded</Text>
      </Box>
    );
  }

  const dangerColour = getDangerColour(location.dangerLevel);

  return (
    <Box flexDirection="column">
      {/* Header flourish */}
      <Box marginBottom={1} justifyContent="center">
        <Text color={atmosphericColors.menuAccent} dimColor>
          ═════════════ {SYMBOLS.yinYang} ═════════════
        </Text>
      </Box>

      {/* Location name */}
      <Box justifyContent="center" marginBottom={1}>
        <Text bold color="yellow">
          {SYMBOLS.star} {location.name.toUpperCase()} {SYMBOLS.star}
        </Text>
      </Box>

      {/* Chinese name */}
      {location.chinese && (
        <Box justifyContent="center" marginBottom={1}>
          <Text color="gray">{location.chinese}</Text>
        </Box>
      )}

      {/* Danger indicator */}
      <Box justifyContent="center" marginBottom={1}>
        <Text color={dangerColour}>
          {getDangerSymbol(location.dangerLevel)} {location.dangerLevel.toUpperCase()}{' '}
          {getDangerSymbol(location.dangerLevel)}
        </Text>
      </Box>

      {/* Divider */}
      <Box marginBottom={1} justifyContent="center">
        <Text color={atmosphericColors.menuAccent} dimColor>
          ─────────── {SYMBOLS.diamond} ───────────
        </Text>
      </Box>

      {/* Description */}
      <Box justifyContent="center" marginBottom={1} paddingX={4}>
        <Text dimColor italic wrap="wrap">
          {location.description}
        </Text>
      </Box>

      {/* Features */}
      <Box justifyContent="center" marginBottom={1}>
        {location.features.hasRest && (
          <Text color="green"> [Rest] </Text>
        )}
        {location.features.hasTraining && (
          <Text color="cyan"> [Training] </Text>
        )}
        {location.features.hasSavePoint && (
          <Text color="blue"> [Save] </Text>
        )}
        {location.features.hasShop && (
          <Text color="yellow"> [Shop] </Text>
        )}
      </Box>

      {/* Divider */}
      <Box marginBottom={1} justifyContent="center">
        <Text color={atmosphericColors.menuAccent} dimColor>
          ─────────── {SYMBOLS.diamond} ───────────
        </Text>
      </Box>

      {/* Message */}
      {message && (
        <Box justifyContent="center" marginBottom={1}>
          <Text color="cyan">{message}</Text>
        </Box>
      )}

      {/* Menu */}
      <Box marginY={1} flexDirection="column" alignItems="center">
        <SelectInputComponent items={buildMenuItems()} onSelect={handleSelect} />
      </Box>

      {/* Navigation hint */}
      <Box marginTop={1} justifyContent="center">
        <Text dimColor>
          {allowTravel
            ? 'Use arrow keys to select, ENTER to confirm'
            : 'Explore the area or continue the story'}
        </Text>
      </Box>

      {/* Danger legend */}
      <Box marginTop={1} justifyContent="center">
        <Text dimColor>
          <Text color="green">{SYMBOLS.starHollow} Safe</Text>
          {'  '}
          <Text color="yellow">{SYMBOLS.circleHollow} Neutral</Text>
          {'  '}
          <Text color="red">{SYMBOLS.circle} Dangerous</Text>
          {'  '}
          <Text color="magenta">{SYMBOLS.crossedSwords} Deadly</Text>
        </Text>
      </Box>
    </Box>
  );
};
