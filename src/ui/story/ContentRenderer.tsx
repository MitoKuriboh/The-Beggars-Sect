/**
 * Content Renderer
 * Renders different types of story content lines
 */

import React from 'react';
import { Box, Text } from 'ink';
import type { ContentLine } from '../../types/index';

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
      return (
        <Box marginY={1}>
          <Text>
            <Text color="cyan" bold>
              {line.speaker}:
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
          {label && (
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
