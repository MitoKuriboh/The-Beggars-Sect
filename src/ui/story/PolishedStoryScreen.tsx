/**
 * Polished Story Screen Layout
 * Reusable layout components for story scenes
 */

import React from 'react';
import { Box, Text } from 'ink';
import { CenteredScreen } from '../components/PolishedBox';

// =============================================================================
// SCENE HEADER
// =============================================================================

interface SceneHeaderProps {
  title: string;
  location?: string;
  progress: { current: number; total: number };
}

export const SceneHeader: React.FC<SceneHeaderProps> = ({
  title,
  location,
  progress,
}) => {
  return (
    <Box flexDirection="column" marginBottom={1}>
      <Box justifyContent="space-between">
        <Text bold color="cyan">
          📖 {title.toUpperCase()}
        </Text>
        <Text dimColor>
          Scene {progress.current}/{progress.total}
        </Text>
      </Box>
      {location && location.length > 0 && (
        <Box marginTop={0}>
          <Text dimColor>📍 {location}</Text>
        </Box>
      )}
    </Box>
  );
};

// =============================================================================
// SCENE CONTAINER
// =============================================================================

interface SceneContainerProps {
  children: React.ReactNode;
  width?: number;
}

export const SceneContainer: React.FC<SceneContainerProps> = ({
  children,
  width = 84,
}) => {
  return (
    <CenteredScreen>
      <Box
        flexDirection="column"
        borderStyle="double"
        borderColor="cyan"
        paddingX={2}
        paddingY={1}
        width={width}
      >
        {children}
      </Box>
    </CenteredScreen>
  );
};

// =============================================================================
// CONTENT AREA
// =============================================================================

interface ContentAreaProps {
  children: React.ReactNode;
  minHeight?: number;
}

export const ContentArea: React.FC<ContentAreaProps> = ({
  children,
  minHeight = 20,
}) => {
  return (
    <Box
      flexDirection="column"
      minHeight={minHeight}
      borderStyle="single"
      borderColor="gray"
      paddingX={2}
      paddingY={1}
    >
      {children}
    </Box>
  );
};

// =============================================================================
// ACTION HINT
// =============================================================================

interface ActionHintProps {
  action: string;
  description?: string;
  isPaused?: boolean;
  isTyping?: boolean;
}

export const ActionHint: React.FC<ActionHintProps> = ({
  action,
  description = '',
  isPaused = false,
  isTyping = false,
}) => {
  let text: string;
  let style: 'normal' | 'italic' = 'normal';

  if (isPaused) {
    text = '... [SPACE] skip';
    style = 'italic';
  } else if (isTyping) {
    text = '[SPACE] skip';
    style = 'italic';
  } else {
    const desc = description.length > 0 ? ` ${description}` : '';
    text = `[${action.toUpperCase()}]${desc}`;
  }

  return (
    <Box marginTop={1}>
      <Text dimColor italic={style === 'italic'}>
        {text}
      </Text>
    </Box>
  );
};

// =============================================================================
// DIVIDER
// =============================================================================

interface DividerProps {
  width?: number;
  color?: string;
}

export const Divider: React.FC<DividerProps> = ({
  width = 76,
  color = 'cyan',
}) => {
  const line = '─'.repeat(width);
  return (
    <Box justifyContent="center">
      <Text color={color} dimColor>{line}</Text>
    </Box>
  );
};

// =============================================================================
// STATUS BAR
// =============================================================================

interface StatusBarProps {
  hints?: Array<{ key: string; label: string }>;
}

export const StatusBar: React.FC<StatusBarProps> = ({ hints = [] }) => {
  const defaultHints = hints.length > 0 ? hints : [
    { key: 'Enter', label: 'Status' },
  ];

  const text = defaultHints
    .map((hint, idx) => {
      const prefix = idx > 0 ? ' • ' : '';
      return `${prefix}[${hint.key}] ${hint.label}`;
    })
    .join('');

  return (
    <Box marginTop={1}>
      <Text dimColor>{text}</Text>
    </Box>
  );
};
