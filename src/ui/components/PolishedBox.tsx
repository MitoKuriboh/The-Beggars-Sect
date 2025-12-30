/**
 * Reusable Polished UI Components
 * Consistent styling across all screens
 */

import React, { useState } from "react";
import { Box, Text } from "ink";

// =============================================================================
// TYPES
// =============================================================================

export interface PolishedBoxProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  borderColor?: string;
  icon?: string;
  footer?: string;
  width?: number;
}

export interface CenteredScreenProps {
  children: React.ReactNode;
}

// =============================================================================
// HOOKS
// =============================================================================

/**
 * Hook to get terminal height for centering
 */
export const useTerminalHeight = () => {
  const [terminalHeight, setTerminalHeight] = useState(
    process.stdout.rows || 24,
  );

  React.useEffect(() => {
    const handleResize = () => {
      setTerminalHeight(process.stdout.rows || 24);
    };
    process.stdout.on("resize", handleResize);
    return () => {
      process.stdout.off("resize", handleResize);
    };
  }, []);

  return terminalHeight;
};

// =============================================================================
// COMPONENTS
// =============================================================================

/**
 * Centered Screen Container
 * Handles vertical and horizontal centering
 */
export const CenteredScreen: React.FC<CenteredScreenProps> = ({ children }) => {
  const terminalHeight = useTerminalHeight();

  return (
    <Box
      flexDirection="column"
      width="100%"
      height={terminalHeight}
      justifyContent="center"
      alignItems="center"
    >
      {children}
    </Box>
  );
};

/**
 * Polished Box with consistent styling
 * Includes title, subtitle, decorative borders, and footer
 */
export const PolishedBox: React.FC<PolishedBoxProps> = ({
  children,
  title,
  subtitle,
  borderColor = "cyan",
  icon,
  footer,
  width = 68,
}) => {
  // Generate decorative borders
  const topBorder = icon
    ? `${icon} ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ${icon}`
    : "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━";

  const divider = "╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍";

  return (
    <Box
      flexDirection="column"
      alignItems="center"
      borderStyle="double"
      borderColor={borderColor}
      paddingX={3}
      paddingY={1}
      width={width}
    >
      {/* Top decorative border with breathing room */}
      {icon && (
        <Box marginY={1}>
          <Text color="yellow" bold>
            {topBorder}
          </Text>
        </Box>
      )}

      {/* Title and subtitle with clear hierarchy */}
      {(title || subtitle) && (
        <>
          <Box
            flexDirection="column"
            alignItems="center"
            marginTop={icon ? 0 : 1}
          >
            {title && (
              <Box marginBottom={subtitle ? 1 : 0}>
                <Text color="yellow">╔</Text>
                <Text bold color="yellow" backgroundColor="black">
                  {" "}
                  {title}{" "}
                </Text>
                <Text color="yellow">╗</Text>
              </Box>
            )}
            {subtitle && (
              <Box marginBottom={1}>
                <Text color="cyan" italic>
                  {subtitle}
                </Text>
              </Box>
            )}
          </Box>
          <Box marginBottom={2}>
            <Text color="cyan">{divider}</Text>
          </Box>
        </>
      )}

      {/* Content with breathing room */}
      <Box flexDirection="column" alignItems="center" width="100%" paddingX={2}>
        {children}
      </Box>

      {/* Footer with clear separation */}
      {footer && (
        <>
          <Box marginTop={2} marginBottom={1}>
            <Text color="cyan">{divider}</Text>
          </Box>
          <Box marginBottom={1}>
            <Text dimColor italic>
              {footer}
            </Text>
          </Box>
        </>
      )}
    </Box>
  );
};

/**
 * Message Box for success/error messages
 */
export const MessageBox: React.FC<{
  message: string;
  type: "success" | "error" | "warning" | "info";
}> = ({ message, type }) => {
  const _terminalHeight = useTerminalHeight();

  const colors = {
    success: "green",
    error: "red",
    warning: "yellow",
    info: "cyan",
  };

  const icons = {
    success: "✓",
    error: "✗",
    warning: "⚠",
    info: "ℹ",
  };

  return (
    <CenteredScreen>
      <Box
        flexDirection="column"
        alignItems="center"
        borderStyle="round"
        borderColor={colors[type]}
        paddingX={4}
        paddingY={2}
      >
        <Text bold color={colors[type]}>
          {icons[type]} {message}
        </Text>
      </Box>
    </CenteredScreen>
  );
};

/**
 * Confirmation Dialog
 */
export const ConfirmationBox: React.FC<{
  title: string;
  message: string;
  type?: "warning" | "info";
  children: React.ReactNode;
}> = ({ title, message, type = "info", children }) => {
  const _terminalHeight = useTerminalHeight();
  const borderColor = type === "warning" ? "yellow" : "cyan";

  return (
    <CenteredScreen>
      <Box
        flexDirection="column"
        alignItems="center"
        borderStyle="round"
        borderColor={borderColor}
        paddingX={4}
        paddingY={2}
        width={68}
      >
        <Text bold color={borderColor === "yellow" ? "yellow" : "cyan"}>
          {title}
        </Text>
        <Box marginTop={2} marginBottom={2}>
          <Text dimColor>{message}</Text>
        </Box>
        <Box flexDirection="column" alignItems="center">
          {children}
        </Box>
      </Box>
    </CenteredScreen>
  );
};
