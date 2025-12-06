/**
 * Art Display Components
 * Displays ASCII art with proper formatting and colors
 */

import React from 'react';
import { Box, Text } from 'ink';
import type { InkColor } from '../theme/colors';

// =============================================================================
// GENERIC ART DISPLAY
// =============================================================================

interface ArtDisplayProps {
  lines: string[];
  color?: InkColor;
  centered?: boolean;
}

export const ArtDisplay: React.FC<ArtDisplayProps> = ({
  lines,
  color = 'white',
  centered = true,
}) => {
  return (
    <Box flexDirection="column" alignItems={centered ? 'center' : 'flex-start'}>
      {lines.map((line, index) => (
        <Text key={index} color={color}>
          {line}
        </Text>
      ))}
    </Box>
  );
};

// =============================================================================
// TECHNIQUE LEARNED DISPLAY
// =============================================================================

interface TechniquelearnedProps {
  techniqueName: string;
  art: string[];
  quote: string;
  color?: InkColor;
  onDismiss?: () => void;
}

export const TechniqueLearnedDisplay: React.FC<TechniquelearnedProps> = ({
  techniqueName,
  art,
  quote,
  color = 'yellow',
  onDismiss,
}) => {
  return (
    <Box flexDirection="column" alignItems="center" padding={1}>
      <ArtDisplay lines={art} color={color} />
      <Box marginTop={1}>
        <Text dimColor>[SPACE] to continue</Text>
      </Box>
    </Box>
  );
};

// =============================================================================
// BOSS INTRO DISPLAY
// =============================================================================

interface BossIntroProps {
  bossName: string;
  title: string;
  art: string[];
  quote: string;
  color?: InkColor;
  onReady?: () => void;
}

export const BossIntroDisplay: React.FC<BossIntroProps> = ({
  bossName,
  title,
  art,
  quote,
  color = 'red',
  onReady,
}) => {
  return (
    <Box flexDirection="column" alignItems="center" padding={1}>
      <ArtDisplay lines={art} color={color} />
      <Box marginTop={1}>
        <Text bold color="red">
          Prepare for battle!
        </Text>
      </Box>
      <Box marginTop={1}>
        <Text dimColor>[SPACE] when ready</Text>
      </Box>
    </Box>
  );
};

// =============================================================================
// CHAPTER INTRO DISPLAY
// =============================================================================

interface ChapterIntroProps {
  chapterNumber: number;
  title: string;
  subtitle?: string;
  art: string[];
  color?: InkColor;
}

export const ChapterIntroDisplay: React.FC<ChapterIntroProps> = ({
  chapterNumber,
  title,
  subtitle,
  art,
  color = 'cyan',
}) => {
  return (
    <Box flexDirection="column" alignItems="center" padding={2}>
      <ArtDisplay lines={art} color={color} />
      <Box marginTop={2}>
        <Text dimColor>[SPACE] to begin</Text>
      </Box>
    </Box>
  );
};

// =============================================================================
// VICTORY DISPLAY
// =============================================================================

interface VictoryDisplayProps {
  bossName: string;
  art: string[];
  rewards?: string[];
}

export const VictoryDisplay: React.FC<VictoryDisplayProps> = ({
  bossName,
  art,
  rewards = [],
}) => {
  return (
    <Box flexDirection="column" alignItems="center" padding={1}>
      <ArtDisplay lines={art} color="green" />

      {rewards.length > 0 && (
        <Box flexDirection="column" marginTop={1} alignItems="center">
          <Text bold color="yellow">
            Rewards:
          </Text>
          {rewards.map((reward, index) => (
            <Text key={index} color="green">
              + {reward}
            </Text>
          ))}
        </Box>
      )}

      <Box marginTop={1}>
        <Text dimColor>[SPACE] to continue</Text>
      </Box>
    </Box>
  );
};

// =============================================================================
// COMBAT START BANNER
// =============================================================================

interface CombatStartBannerProps {
  playerName: string;
  enemies: string[];
  isBoss?: boolean;
}

export const CombatStartBanner: React.FC<CombatStartBannerProps> = ({
  playerName,
  enemies,
  isBoss = false,
}) => {
  const enemyList = enemies.join(', ');
  const banner = isBoss ? '⚔️  BOSS FIGHT  ⚔️' : '⚔️  COMBAT  ⚔️';

  return (
    <Box flexDirection="column" alignItems="center" marginY={1}>
      <Text bold color={isBoss ? 'red' : 'yellow'}>
        {banner}
      </Text>
      <Text color="cyan">
        {playerName}
      </Text>
      <Text dimColor>vs</Text>
      <Text color="red">
        {enemyList}
      </Text>
    </Box>
  );
};

// =============================================================================
// EXPORTS
// =============================================================================

export default ArtDisplay;
