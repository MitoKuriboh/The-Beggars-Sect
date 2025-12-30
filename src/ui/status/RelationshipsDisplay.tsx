/**
 * Relationships Display Component
 * Shows player relationships with NPCs
 */

import React from "react";
import { Box, Text } from "ink";

interface RelationshipsDisplayProps {
  relationships: Record<string, number>;
}

interface RelationshipLevel {
  label: string;
  color: string;
  min: number;
}

const RELATIONSHIP_LEVELS: RelationshipLevel[] = [
  { label: "Hostile", color: "red", min: -10 },
  { label: "Unfriendly", color: "yellow", min: -5 },
  { label: "Neutral", color: "white", min: -1 },
  { label: "Friendly", color: "cyan", min: 3 },
  { label: "Trusted", color: "green", min: 7 },
  { label: "Devoted", color: "magenta", min: 12 },
];

function getRelationshipLevel(value: number): RelationshipLevel {
  // Find the highest level that the value qualifies for
  for (let i = RELATIONSHIP_LEVELS.length - 1; i >= 0; i--) {
    const level = RELATIONSHIP_LEVELS[i];
    if (level && value >= level.min) {
      return level;
    }
  }
  // Default to Neutral if no match found
  return RELATIONSHIP_LEVELS[2] || { label: "Neutral", color: "white", min: 0 };
}

function formatCharacterName(id: string): string {
  // Convert "elder-chen" to "Elder Chen"
  return id
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function renderRelationshipBar(
  value: number,
  maxValue: number = 15,
  width: number = 10,
): string {
  // Normalize value to 0-maxValue range
  const normalized = Math.max(0, value + 10); // Shift range so -10 = 0
  const filled = Math.floor((normalized / (maxValue + 10)) * width);
  const empty = width - filled;
  return "█".repeat(filled) + "░".repeat(empty);
}

export const RelationshipsDisplay: React.FC<RelationshipsDisplayProps> = ({
  relationships,
}) => {
  const entries = Object.entries(relationships);

  if (entries.length === 0) {
    return (
      <Box flexDirection="column">
        <Box marginBottom={1}>
          <Text bold color="yellow">
            人 RELATIONSHIPS
          </Text>
        </Box>
        <Box>
          <Text dimColor italic>
            You have not yet formed any meaningful connections...
          </Text>
        </Box>
      </Box>
    );
  }

  return (
    <Box flexDirection="column">
      <Box marginBottom={1}>
        <Text bold color="yellow">
          人 RELATIONSHIPS
        </Text>
      </Box>

      <Box flexDirection="column">
        {entries.map(([characterId, value]) => {
          const level = getRelationshipLevel(value);
          const name = formatCharacterName(characterId);

          return (
            <Box key={characterId} marginBottom={1} flexDirection="column">
              <Box>
                <Text bold>{name}</Text>
                <Text dimColor> — </Text>
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any -- ink color type is stricter than our dynamic colors */}
                <Text color={level.color as any}>{level.label}</Text>
              </Box>
              <Box marginLeft={2}>
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any -- ink color type is stricter than our dynamic colors */}
                <Text color={level.color as any}>
                  {renderRelationshipBar(value)} {value > 0 ? "+" : ""}
                  {value}
                </Text>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
