/**
 * Menu Container Component
 * Standardized container for all menu UIs
 *
 * Following AAA UI design principles:
 * - Consistent visual language across all menus
 * - Predictable layout and spacing
 * - Clear information hierarchy
 *
 * Design Pattern: Compound Component
 * - Composable parts (header, body, footer)
 * - Flexible but consistent
 */

import React from "react";
import { Box, Text } from "ink";

export interface MenuContainerProps {
  /** Menu title (displayed at top) */
  title?: string;

  /** Title icon/emoji */
  titleIcon?: string;

  /** Border color (default: cyan) */
  color?: "cyan" | "red" | "yellow" | "magenta" | "green" | "white" | "gray";

  /** Border style (default: round) */
  borderStyle?: "single" | "double" | "round" | "bold" | "classic";

  /** Container width (default: 70) */
  width?: number;

  /** Minimum height */
  minHeight?: number;

  /** Footer hint text */
  footer?: string;

  /** Menu content */
  children: React.ReactNode;

  /** Center content horizontally */
  centerContent?: boolean;

  /** Additional padding */
  paddingX?: number;
  paddingY?: number;
}

/**
 * Standard menu container with consistent styling
 *
 * @example
 * ```tsx
 * <MenuContainer
 *   title="Select Action"
 *   titleIcon="⚡"
 *   color="cyan"
 *   footer="SPACE or ENTER to select  •  ESC to cancel"
 * >
 *   <SelectInput items={items} onSelect={handleSelect} />
 * </MenuContainer>
 * ```
 */
export const MenuContainer: React.FC<MenuContainerProps> = React.memo(
  ({
    title,
    titleIcon,
    color = "cyan",
    borderStyle = "round",
    width = 70,
    minHeight,
    footer,
    children,
    centerContent = true,
    paddingX = 2,
    paddingY = 1,
  }) => {
    return (
      <Box
        flexDirection="column"
        borderStyle={borderStyle}
        borderColor={color}
        paddingX={paddingX}
        paddingY={paddingY}
        alignItems={centerContent ? "center" : undefined}
        width={width}
        minHeight={minHeight}
      >
        {/* Title */}
        {title && (
          <Box marginBottom={1}>
            <Text bold color={color}>
              {titleIcon && `${titleIcon} `}
              {title}
            </Text>
          </Box>
        )}

        {/* Content */}
        {children}

        {/* Footer */}
        {footer && (
          <Box marginTop={1} height={1}>
            <Text dimColor italic>
              {footer}
            </Text>
          </Box>
        )}
      </Box>
    );
  },
);

MenuContainer.displayName = "MenuContainer";

/**
 * Screen-level container (larger, full-featured)
 *
 * @example
 * ```tsx
 * <ScreenBox
 *   title="COMBAT"
 *   color="red"
 *   width={84}
 * >
 *   <CombatContent />
 * </ScreenBox>
 * ```
 */
export const ScreenBox: React.FC<MenuContainerProps> = React.memo(
  ({ title, color = "cyan", width = 84, children, ...rest }) => {
    return (
      <Box
        flexDirection="column"
        borderStyle="double"
        borderColor={color}
        paddingX={2}
        paddingY={0}
        width={width}
        {...rest}
      >
        {/* Title */}
        {title && (
          <Box justifyContent="center" marginY={1}>
            <Text bold color={color}>
              {title}
            </Text>
          </Box>
        )}

        {/* Content */}
        {children}
      </Box>
    );
  },
);

ScreenBox.displayName = "ScreenBox";

/**
 * Message display box with type-based styling
 */
export interface MessageDisplayProps {
  /** Message text */
  message: string;

  /** Message type determines color */
  type?:
    | "normal"
    | "damage"
    | "heal"
    | "status"
    | "error"
    | "success"
    | "warning";

  /** Show the message */
  visible?: boolean;

  /** Allow text wrapping */
  wrap?: boolean;
}

/**
 * Standardized message display
 *
 * @example
 * ```tsx
 * <MessageDisplay
 *   message="You dealt 45 damage!"
 *   type="damage"
 *   visible={showMessage}
 * />
 * ```
 */
export const MessageDisplay: React.FC<MessageDisplayProps> = React.memo(
  ({ message, type = "normal", visible = true, wrap = true }) => {
    if (!visible || !message) return null;

    const getColor = (): string => {
      switch (type) {
        case "damage":
          return "red";
        case "heal":
          return "green";
        case "status":
          return "cyan";
        case "error":
          return "red";
        case "success":
          return "green";
        case "warning":
          return "yellow";
        default:
          return "white";
      }
    };

    const color = getColor();

    return (
      <Box
        marginY={1}
        borderStyle="round"
        borderColor={color}
        paddingY={1}
        paddingX={2}
      >
        <Text color={color} wrap={wrap ? "wrap" : undefined}>
          {message}
        </Text>
      </Box>
    );
  },
);

MessageDisplay.displayName = "MessageDisplay";

/**
 * Section header with divider
 */
export interface SectionHeaderProps {
  /** Header text */
  title: string;

  /** Header color */
  color?: string;

  /** Show divider below */
  showDivider?: boolean;

  /** Divider character */
  dividerChar?: string;

  /** Divider length */
  dividerLength?: number;
}

/**
 * Section header component
 *
 * @example
 * ```tsx
 * <SectionHeader
 *   title="Player Stats"
 *   color="cyan"
 *   showDivider
 * />
 * ```
 */
export const SectionHeader: React.FC<SectionHeaderProps> = React.memo(
  ({
    title,
    color = "white",
    showDivider = true,
    dividerChar = "─",
    dividerLength = 65,
  }) => {
    return (
      <Box flexDirection="column" alignItems="center">
        <Text bold color={color}>
          {title}
        </Text>
        {showDivider && (
          <Box marginTop={1}>
            <Text color={color} dimColor>
              {dividerChar.repeat(dividerLength)}
            </Text>
          </Box>
        )}
      </Box>
    );
  },
);

SectionHeader.displayName = "SectionHeader";
