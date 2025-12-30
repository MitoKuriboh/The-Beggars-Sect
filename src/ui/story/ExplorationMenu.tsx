/**
 * Exploration Menu
 * Allows player to explore different areas in a scene with wuxia atmosphere
 */

import React, { useState, useCallback } from "react";
import { Box, Text, useInput } from "ink";
import SelectInput from "ink-select-input";
import type { ExplorationArea } from "../../types/index";
import { ContentBlock } from "./ContentRenderer";
import { STORY_DECORATIONS, SYMBOLS } from "../theme/decorations";
import { atmosphericColors } from "../theme/colors";

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- ink-select-input has conflicting CJS/ESM exports
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
  const allRequiredVisited = requiredAreas.every((a) => visitedAreas.has(a.id));

  // Build menu items
  const items: ExplorationMenuItem[] = areas.map((area) => ({
    label: visitedAreas.has(area.id) ? `✓ ${area.name}` : `• ${area.name}`,
    value: area.id,
  }));

  // Add continue option if available
  if (allRequiredVisited) {
    items.push({
      label: "→ Continue",
      value: "__continue__",
    });
  }

  const handleSelect = useCallback(
    (item: ExplorationMenuItem) => {
      if (item.value === "__continue__") {
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
    [areas, onComplete],
  );

  // Handle input when viewing area content
  useInput((input, key) => {
    if (showingContent && (key.return || input === " " || key.escape)) {
      setShowingContent(false);
      setCurrentArea(null);
    }
  });

  // Show area content
  if (showingContent && currentArea) {
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
            {SYMBOLS.star} {currentArea.name.toUpperCase()} {SYMBOLS.star}
          </Text>
        </Box>

        {/* Description */}
        <Box justifyContent="center" marginBottom={1}>
          <Text dimColor italic>
            {currentArea.description}
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
          <ContentBlock lines={currentArea.content} showAll />
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

  // Show exploration menu
  return (
    <Box flexDirection="column">
      {/* Header flourish */}
      <Box marginBottom={1} justifyContent="center">
        <Text color={atmosphericColors.menuAccent} dimColor>
          ─────────── {SYMBOLS.yinYang} ───────────
        </Text>
      </Box>

      {/* Header */}
      <Box justifyContent="center" marginBottom={1}>
        <Text bold color="yellow">
          {STORY_DECORATIONS.explorationHeader}
        </Text>
      </Box>

      {/* Subtitle */}
      <Box justifyContent="center" marginBottom={1}>
        <Text dimColor italic>
          "Observe carefully. Every detail holds meaning."
        </Text>
      </Box>

      {/* Divider */}
      <Box marginBottom={1} justifyContent="center">
        <Text color={atmosphericColors.menuAccent} dimColor>
          ─────────── {SYMBOLS.diamond} ───────────
        </Text>
      </Box>

      {/* Menu */}
      <Box marginY={1} flexDirection="column" alignItems="center">
        <SelectInputComponent items={items} onSelect={handleSelect} />
      </Box>

      {/* Required areas message */}
      {!allRequiredVisited && requiredAreas.length > 0 && (
        <Box marginTop={1} justifyContent="center">
          <Text color="gray" italic>
            {SYMBOLS.bullet} Visit required areas before continuing
          </Text>
        </Box>
      )}

      {/* Progress indicator */}
      <Box marginTop={1} justifyContent="center">
        <Text dimColor>
          Explored: {visitedAreas.size}/{areas.length}
          {allRequiredVisited && (
            <Text color="green"> {SYMBOLS.star} Ready to continue</Text>
          )}
        </Text>
      </Box>
    </Box>
  );
};
