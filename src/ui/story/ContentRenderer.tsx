/**
 * Content Renderer
 * Renders different types of story content lines
 */

import React from 'react';
import { Box, Text } from 'ink';
import type { ContentLine } from '../../types/index';

// =============================================================================
// SPEAKER COLOR MAPPING
// =============================================================================

type SpeakerColor = 'green' | 'yellow' | 'cyan' | 'magenta' | 'red' | 'blue' | 'white';

function getSpeakerColor(speaker: string): SpeakerColor {
  const upper = speaker.toUpperCase();

  // Player
  if (upper.includes('LI WEI')) return 'green';

  // Mysterious voices
  if (upper.includes('VOICE')) return 'magenta';

  // Enemies/Hostile
  if (upper.includes('THUG') || upper.includes('PUNK') || upper.includes('BRAWLER')) return 'red';
  if (upper.includes('SPARTAN')) return 'red';

  // Important friendly characters
  if (upper.includes('OLD DAO') || upper.includes('DAO')) return 'yellow';
  if (upper.includes('ELDER')) return 'yellow';

  // Beggars Sect
  if (upper.includes('BEGGAR')) return 'cyan';

  // Generic NPCs
  return 'white';
}

function getEmotionIndicator(emotion?: string): string {
  if (!emotion) return '';
  switch (emotion.toLowerCase()) {
    case 'angry': return ' 😠';
    case 'laughing': return ' 😄';
    case 'nervous': return ' 😰';
    case 'sad': return ' 😢';
    case 'threatening': return ' 😈';
    case 'greedy': return ' 🤑';
    case 'panicked': return ' 😱';
    case 'dismissive': return ' 😒';
    case 'bitter': return ' 😞';
    case 'kind': return ' 😊';
    case 'stern': return ' 😐';
    case 'intense': return ' 🔥';
    case 'amused': return ' 😏';
    case 'smiling': return ' 🙂';
    case 'gruff': return ' 😤';
    case 'grinning': return ' 😁';
    case 'quiet': return '';
    default: return '';
  }
}

// =============================================================================
// CONTENT RENDERER
// =============================================================================

interface ContentRendererProps {
  line: ContentLine;
}

export const ContentRenderer: React.FC<ContentRendererProps> = ({ line }) => {
  switch (line.type) {
    case 'narration':
      return (
        <Box marginY={1}>
          <Text color="white">{line.text}</Text>
        </Box>
      );

    case 'internal':
      return (
        <Box marginY={1} paddingLeft={2}>
          <Text color="gray" italic>
            {line.text}
          </Text>
        </Box>
      );

    case 'dialogue':
      const speakerColor = getSpeakerColor(line.speaker);
      const emotion = getEmotionIndicator(line.emotion);
      return (
        <Box marginY={1}>
          <Text>
            <Text color={speakerColor} bold>
              {line.speaker}{emotion}:
            </Text>
            {' '}
            <Text color="white">{line.text}</Text>
          </Text>
        </Box>
      );

    case 'system':
      return (
        <Box marginY={1} paddingX={2}>
          <Text color="yellow" bold>
            [{line.text}]
          </Text>
        </Box>
      );

    case 'instruction':
      return (
        <Box marginY={1}>
          <Text color="gray" dimColor>
            {line.text}
          </Text>
        </Box>
      );

    case 'divider':
      const label = line.label || '';
      const padding = Math.max(0, Math.floor((40 - label.length) / 2));
      return (
        <Box marginY={2} flexDirection="column" alignItems="center">
          <Text color="gray">{'═'.repeat(40)}</Text>
          {label.length > 0 && (
            <Text color="white" bold>
              {' '.repeat(padding)}{label}
            </Text>
          )}
          <Text color="gray">{'═'.repeat(40)}</Text>
        </Box>
      );

    case 'pause':
      // Pauses are handled by the parent component
      return null;

    case 'effect':
      // Effects are handled by the parent component
      // But we can show a hint for some effects
      if (line.effect.type === 'pendant-glow') {
        const intensity = line.effect.intensity;
        const color = intensity === 'intense' ? 'magenta' :
                      intensity === 'bright' ? 'cyan' : 'blue';
        return (
          <Box marginY={1}>
            <Text color={color} italic>
              *The pendant {intensity === 'intense' ? 'flares brilliantly' :
                           intensity === 'bright' ? 'glows warmly' : 'pulses faintly'}*
            </Text>
          </Box>
        );
      }
      return null;

    default:
      return null;
  }
};

interface ContentBlockProps {
  lines: ContentLine[];
  currentIndex?: number;
  showAll?: boolean;
}

export const ContentBlock: React.FC<ContentBlockProps> = ({
  lines,
  currentIndex,
  showAll = false,
}) => {
  const visibleLines = showAll
    ? lines
    : currentIndex !== undefined
    ? lines.slice(0, currentIndex + 1)
    : lines;

  return (
    <Box flexDirection="column">
      {visibleLines.map((line, index) => (
        <ContentRenderer key={index} line={line} />
      ))}
    </Box>
  );
};
