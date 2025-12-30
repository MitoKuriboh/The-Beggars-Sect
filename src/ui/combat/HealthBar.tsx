/**
 * Health Bar Component
 * Visual HP/Chi display with high-resolution progress bars
 */

import React, { memo } from "react";
import { Box, Text } from "ink";
import { createHealthBar, createChiBar } from "../theme/progressBars";

interface HealthBarProps {
  current: number;
  max: number;
  label: string;
  color: string;
  width?: number;
}

export const HealthBar = memo<HealthBarProps>(
  ({ current, max, label, color, width = 20 }) => {
    // Use high-res progress bars based on label type
    const isHP = label === "HP";
    const isChi = label === "Chi" || label === "逆";

    let barData: { bar: string; color: string };

    if (isHP) {
      barData = createHealthBar(current, max, width);
    } else if (isChi) {
      barData = createChiBar(current, max, width);
    } else {
      // Fallback for custom labels
      const percentage = max > 0 ? (current / max) * 100 : 0;
      const fillAmount = (percentage / 100) * width;
      const fullBlocks = Math.floor(fillAmount);
      const remainder = fillAmount - fullBlocks;
      const eighthBlocks = ["", "▏", "▎", "▍", "▌", "▋", "▊", "▉", "█"];
      const eighthIndex = Math.floor(remainder * 8);
      const partialBlock = eighthBlocks[eighthIndex] ?? "";
      const filledPart = "█".repeat(fullBlocks);
      const emptyPart = "░".repeat(
        Math.max(0, width - fullBlocks - (partialBlock ? 1 : 0)),
      );

      barData = {
        bar: filledPart + partialBlock + emptyPart,
        color: color,
      };
    }

    // Pad label to fixed width (accounting for wide characters like 逆)
    const getLabelPadding = () => {
      if (label === "逆") return `${label} `; // Wide char (2 spaces) + 1 space = 3 display width
      return label.padEnd(3, " "); // Regular chars
    };

    return (
      <Box>
        <Text dimColor>{getLabelPadding()}:</Text>
        <Text color={barData.color}> [{barData.bar}]</Text>
        <Text dimColor>
          {" "}
          {current}/{max}
        </Text>
      </Box>
    );
  },
);

HealthBar.displayName = "HealthBar";

// Get descriptive health state based on HP percentage
const getHealthDescription = (
  current: number,
  max: number,
): { text: string; color: string; icon: string } => {
  const percent = current / max;
  if (percent >= 0.9) return { text: "Healthy", color: "green", icon: "●" };
  if (percent >= 0.7) return { text: "Hurt", color: "green", icon: "●" };
  if (percent >= 0.5) return { text: "Wounded", color: "yellow", icon: "◐" };
  if (percent >= 0.3) return { text: "Critical", color: "yellow", icon: "◑" };
  if (percent >= 0.1) return { text: "Dying", color: "red", icon: "○" };
  return { text: "Death's Door", color: "red", icon: "○" };
};

interface CharacterStatusProps {
  name: string;
  hp: number;
  maxHp: number;
  chi: number;
  maxChi: number;
  stance: string;
  isPlayer?: boolean;
  inverseChi?: number;
  maxInverseChi?: number;
}

export const CharacterStatus = memo<CharacterStatusProps>(
  ({
    name,
    hp,
    maxHp,
    chi,
    maxChi,
    stance,
    isPlayer = false,
    inverseChi = 0,
    maxInverseChi = 0,
  }) => {
    const _healthState = getHealthDescription(hp, maxHp);

    return (
      <Box flexDirection="column" paddingY={1}>
        {/* Character Name */}
        <Box marginBottom={1}>
          <Text color={isPlayer ? "cyan" : "red"}>
            {isPlayer ? "人" : "敵"}
          </Text>
          <Text bold color={isPlayer ? "cyan" : "red"}>
            {" "}
            {name}
          </Text>
        </Box>

        <Box flexDirection="column">
          <HealthBar
            current={hp}
            max={maxHp}
            label="HP"
            color="green"
            width={15}
          />
          <HealthBar
            current={chi}
            max={maxChi}
            label="Chi"
            color="blue"
            width={15}
          />
          {isPlayer && maxInverseChi > 0 && (
            <HealthBar
              current={inverseChi}
              max={maxInverseChi}
              label="逆"
              color="magenta"
              width={15}
            />
          )}
          <Text dimColor>
            Stance: <Text color="cyan">{stance}</Text>
          </Text>
        </Box>
      </Box>
    );
  },
);

CharacterStatus.displayName = "CharacterStatus";
