/**
 * Reusable Decorative Components
 * Borders, dividers, headers, etc.
 */

import React from 'react';
import { Box, Text } from 'ink';

// =============================================================================
// TYPES
// =============================================================================

export interface DividerProps {
  type?: 'light' | 'heavy' | 'dotted' | 'double';
  color?: string;
  length?: number;
}

export interface HeaderProps {
  title: string;
  icon?: string;
  color?: string;
}

export interface BorderProps {
  icon?: string;
  color?: string;
}

// =============================================================================
// COMPONENTS
// =============================================================================

/**
 * Divider Line
 * Consistent divider styling across the app
 */
export const Divider: React.FC<DividerProps> = ({
  type = 'light',
  color = 'gray',
  length = 55,
}) => {
  const chars = {
    light: '─',
    heavy: '━',
    dotted: '·',
    double: '═',
  };

  const line = chars[type].repeat(length);

  return (
    <Box>
      <Text color={color}>{line}</Text>
    </Box>
  );
};

/**
 * Section Header
 * Consistent header with optional icon
 */
export const Header: React.FC<HeaderProps> = ({
  title,
  icon,
  color = 'cyan',
}) => {
  return (
    <Box flexDirection="column" alignItems="center">
      {icon && (
        <Text bold color={color}>
          {icon} {title} {icon}
        </Text>
      )}
      {!icon && (
        <Text bold color={color}>
          {title}
        </Text>
      )}
    </Box>
  );
};

/**
 * Top Border with Icons
 * Decorative top border
 */
export const TopBorder: React.FC<BorderProps> = ({
  icon,
  color = 'yellow',
}) => {
  const border = icon
    ? `${icon}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${icon}`
    : '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━';

  return (
    <Box marginBottom={1}>
      <Text color={color}>{border}</Text>
    </Box>
  );
};

/**
 * Spacer
 * Consistent spacing component
 */
export const Spacer: React.FC<{ size?: number }> = ({ size = 1 }) => {
  return <Box marginTop={size} />;
};
