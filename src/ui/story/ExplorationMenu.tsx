/**
 * Exploration Menu
 * Allows player to explore different areas in a scene
 */

import React, { useState, useCallback } from 'react';
import { Box, Text, useInput } from 'ink';
import SelectInput from 'ink-select-input';
import type { ExplorationArea } from '../../types/index';
import { ContentBlock } from './ContentRenderer';

const SelectInputComponent = (SelectInput as any).default || SelectInput;

interface ExplorationMenuItem {
  label: string;
  value: string;
}

interface ExplorationMenuProps {
  areas: ExplorationArea[];
  onComplete: () => void;
}

export const ExplorationMenu: React.FC<ExplorationMenuProps> = ({
  areas,
  onComplete,
}) => {
  const [visitedAreas, setVisitedAreas] = useState<Set<string>>(new Set());
  const [currentArea, setCurrentArea] = useState<ExplorationArea | null>(null);
  const [showingContent, setShowingContent] = useState(false);

  // Check if all required areas are visited
  const requiredAreas = areas.filter((a) => a.required);
  const allRequiredVisited = requiredAreas.every((a) =>
    visitedAreas.has(a.id)
  );

  // Build menu items
  const items: ExplorationMenuItem[] = areas.map((area) => ({
    label: visitedAreas.has(area.id)
      ? `✓ ${area.name}`
      : `• ${area.name}`,
    value: area.id,
  }));

  // Add continue option if available
  if (allRequiredVisited) {
    items.push({
      label: '→ Continue',
      value: '__continue__',
    });
  }

  const handleSelect = useCallback(
    (item: ExplorationMenuItem) => {
      if (item.value === '__continue__') {
        onComplete();
        return;
      }

      const area = areas.find((a) => a.id === item.value);
      if (area) {
        setCurrentArea(area);
        setShowingContent(true);
        setVisitedAreas((prev) => new Set(prev).add(area.id));
      }
    },
    [areas, onComplete]
  );

  // Handle input when viewing area content
  useInput((input, key) => {
    if (showingContent && (key.return || input === ' ' || key.escape)) {
      setShowingContent(false);
      setCurrentArea(null);
    }
  });

  // Show area content
  if (showingContent && currentArea) {
    return (
      <Box flexDirection="column">
        <Text bold color="cyan">
          {currentArea.name}
        </Text>
        <Text dimColor italic>
          {currentArea.description}
        </Text>
        <Box marginTop={1}>
          <ContentBlock lines={currentArea.content} showAll />
        </Box>
        <Box marginTop={1}>
          <Text dimColor>
            Press [SPACE] to return...
          </Text>
        </Box>
      </Box>
    );
  }

  // Show exploration menu
  return (
    <Box flexDirection="column">
      <Text bold color="yellow">
        Explore the area:
      </Text>
      <Text dimColor>
        (Optional areas can be skipped)
      </Text>

      <Box marginTop={1}>
        <SelectInputComponent items={items} onSelect={handleSelect} />
      </Box>

      {!allRequiredVisited && requiredAreas.length > 0 && (
        <Box marginTop={1}>
          <Text color="gray">
            Visit required areas before continuing.
          </Text>
        </Box>
      )}
    </Box>
  );
};
