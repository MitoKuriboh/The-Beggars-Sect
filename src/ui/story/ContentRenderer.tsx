/**
 * Content Renderer
 * Renders different types of story content lines with typewriter effect
 */

import React from 'react';
import { Box, Text } from 'ink';
import type { ContentLine } from '../../types/index';
import { useTypewriter } from '../hooks';

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
// TYPEWRITER TEXT COMPONENT
// =============================================================================

interface TypewriterTextProps {
  text: string;
  color?: string;
  italic?: boolean;
  speed?: number;
  onComplete?: () => void;
}

const TypewriterText: React.FC<TypewriterTextProps> = React.memo(({
  text,
  color = 'white',
  italic = false,
  speed = 50,
  onComplete,
}) => {
  const { displayedText, isComplete } = useTypewriter(text, {
    speed,
    autoStart: true,
    onComplete,
  });

  return (
    <Text color={color} italic={italic}>
      {displayedText}
      {!isComplete && <Text color="gray">▌</Text>}
    </Text>
  );
});

// =============================================================================
// CONTENT RENDERER
// =============================================================================

interface ContentRendererProps {
  line: ContentLine;
  isTyping?: boolean;
  typewriterSpeed?: number;
  onTypeComplete?: () => void;
}

export const ContentRenderer: React.FC<ContentRendererProps> = React.memo(({
  line,
  isTyping = false,
  typewriterSpeed = 50,
  onTypeComplete,
}) => {
  // Speed modifiers per content type (relative to base speed)
  const narrationSpeed = typewriterSpeed;
  const internalSpeed = Math.round(typewriterSpeed * 0.9);  // Slower for contemplation
  const dialogueSpeed = Math.round(typewriterSpeed * 1.1);  // Faster for speech

  switch (line.type) {
    case 'narration':
      return (
        <Box marginBottom={1} marginTop={0.5}>
          <Box paddingLeft={0}>
            {isTyping ? (
              <TypewriterText
                text={line.text}
                color="white"
                speed={narrationSpeed}
                onComplete={onTypeComplete}
              />
            ) : (
              <Text color="white">{line.text}</Text>
            )}
          </Box>
        </Box>
      );

    case 'internal':
      return (
        <Box marginBottom={1} marginTop={0.5}>
          <Box paddingLeft={2}>
            <Text dimColor>「 </Text>
            {isTyping ? (
              <TypewriterText
                text={line.text}
                color="cyan"
                italic
                speed={internalSpeed}
                onComplete={onTypeComplete}
              />
            ) : (
              <Text color="cyan" italic>
                {line.text}
              </Text>
            )}
            <Text dimColor> 」</Text>
          </Box>
        </Box>
      );

    case 'dialogue':
      const speakerColor = getSpeakerColor(line.speaker);
      const emotion = getEmotionIndicator(line.emotion);
      return (
        <Box marginBottom={1} marginTop={0.5} flexDirection="column">
          <Box>
            <Text color={speakerColor} bold>
              {line.speaker}{emotion}
            </Text>
          </Box>
          <Box paddingLeft={2} marginTop={0.25}>
            <Text dimColor>"</Text>
            {isTyping ? (
              <TypewriterText
                text={line.text}
                color="white"
                speed={dialogueSpeed}
                onComplete={onTypeComplete}
              />
            ) : (
              <Text color="white">{line.text}</Text>
            )}
            <Text dimColor>"</Text>
          </Box>
        </Box>
      );

    case 'system':
      return (
        <Box marginY={1} justifyContent="center">
          <Text color="yellow" bold>
            ═══ {line.text.toUpperCase()} ═══
          </Text>
        </Box>
      );

    case 'instruction':
      return (
        <Box marginY={1}>
          <Text color="gray" dimColor italic>
            {line.text}
          </Text>
        </Box>
      );

    case 'divider':
      const label = line.label || '';
      return (
        <Box marginY={2} justifyContent="center">
          <Text color="cyan" dimColor>
            {'─'.repeat(20)} {label.length > 0 ? label.toUpperCase() : ''} {'─'.repeat(20)}
          </Text>
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
});

interface ContentBlockProps {
  lines: ContentLine[];
  currentIndex?: number;
  showAll?: boolean;
  isTyping?: boolean;
  typewriterSpeed?: number;
  onTypeComplete?: () => void;
}

export const ContentBlock: React.FC<ContentBlockProps> = React.memo(({
  lines,
  currentIndex,
  showAll = false,
  isTyping = false,
  typewriterSpeed = 50,
  onTypeComplete,
}) => {
  const visibleLines = showAll
    ? lines
    : currentIndex !== undefined
    ? lines.slice(0, currentIndex + 1)
    : lines;

  return (
    <Box flexDirection="column">
      {visibleLines.map((line, index) => {
        // Only the last visible line should be typing (if isTyping is true)
        const isLastLine = index === visibleLines.length - 1;
        const shouldType = isTyping && isLastLine && !showAll;

        // Use stable key based on line type and content hash instead of index
        // This prevents React from reusing components incorrectly when list changes
        const contentPreview =
          'text' in line ? line.text?.slice(0, 20) :
          'label' in line ? line.label :
          '';
        const stableKey = `${line.type}-${index}-${contentPreview}`;

        return (
          <ContentRenderer
            key={stableKey}
            line={line}
            isTyping={shouldType}
            typewriterSpeed={typewriterSpeed}
            onTypeComplete={shouldType ? onTypeComplete : undefined}
          />
        );
      })}
    </Box>
  );
});
