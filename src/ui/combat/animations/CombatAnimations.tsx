/**
 * Combat Animations
 * Frame-based ASCII animations for combat actions
 */

import React, { useState, useEffect } from 'react';
import { Box, Text } from 'ink';

// =============================================================================
// ANIMATION FRAMES
// =============================================================================

export const ATTACK_FRAMES = [
  '    ',
  ' >  ',
  ' >> ',
  '>>> ',
  '>>>>',
  '-->>',
  '--*>',
  '  * ',
  '   !',
  '    ',
];

export const CRITICAL_FRAMES = [
  '     ',
  '  *  ',
  ' *** ',
  '*****',
  '★★★★★',
  '*****',
  ' *** ',
  '  *  ',
  '     ',
];

export const TECHNIQUE_FRAMES = [
  '     ',
  '  ~  ',
  ' ~~~ ',
  '~~~~~',
  '≋≋≋≋≋',
  '~~~~~',
  ' ~~~ ',
  '  ~  ',
  '     ',
];

export const DEFEND_FRAMES = [
  '     ',
  '  |  ',
  ' ||| ',
  '|||||',
  '█████',
  '|||||',
  ' ||| ',
  '  |  ',
  '     ',
];

export const CHI_FRAMES = [
  '     ',
  '  ○  ',
  ' ◔◔◔ ',
  '◑◑◑◑◑',
  '●●●●●',
  '◑◑◑◑◑',
  ' ◔◔◔ ',
  '  ○  ',
  '     ',
];

export const IMPACT_FRAMES = [
  '     ',
  '  !  ',
  ' !!! ',
  '!!!!!',
  '‼‼‼‼‼',
  '!!!!!',
  ' !!! ',
  '     ',
];

// =============================================================================
// ANIMATION TYPES
// =============================================================================

export type AnimationType =
  | 'attack'
  | 'critical'
  | 'technique'
  | 'defend'
  | 'chi'
  | 'impact'
  | 'miss';

export interface AnimationConfig {
  type: AnimationType;
  actorName: string;
  targetName?: string;
  color?: string;
  duration?: number; // ms per frame
  onComplete?: () => void;
}

// =============================================================================
// ANIMATION COMPONENT
// =============================================================================

interface CombatAnimationProps {
  config: AnimationConfig;
}

export const CombatAnimation: React.FC<CombatAnimationProps> = ({ config }) => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Select frames based on animation type
  const getFrames = (): string[] => {
    switch (config.type) {
      case 'attack': return ATTACK_FRAMES;
      case 'critical': return CRITICAL_FRAMES;
      case 'technique': return TECHNIQUE_FRAMES;
      case 'defend': return DEFEND_FRAMES;
      case 'chi': return CHI_FRAMES;
      case 'impact': return IMPACT_FRAMES;
      case 'miss': return ['     ', '  x  ', ' xxx ', '  x  ', '     '];
      default: return ATTACK_FRAMES;
    }
  };

  const frames = getFrames();
  const frameDuration = config.duration ?? 80; // ms per frame
  const color = config.color ?? 'white';

  useEffect(() => {
    if (!isPlaying) return;

    if (currentFrame >= frames.length) {
      setIsPlaying(false);
      if (config.onComplete) {
        config.onComplete();
      }
      return;
    }

    const timer = setTimeout(() => {
      setCurrentFrame(currentFrame + 1);
    }, frameDuration);

    return () => clearTimeout(timer);
  }, [currentFrame, isPlaying, frames.length, frameDuration, config]);

  if (!isPlaying || currentFrame >= frames.length) {
    return null;
  }

  const frame = frames[currentFrame] ?? '';

  return (
    <Box>
      <Text color={color}>{frame}</Text>
    </Box>
  );
};

// =============================================================================
// DIRECTIONAL ATTACK ANIMATION
// =============================================================================

interface DirectionalAttackProps {
  actorName: string;
  targetName: string;
  isCritical?: boolean;
  onComplete?: () => void;
}

export const DirectionalAttack: React.FC<DirectionalAttackProps> = ({
  actorName,
  targetName,
  isCritical = false,
  onComplete,
}) => {
  const [phase, setPhase] = useState<'windup' | 'strike' | 'impact' | 'done'>('windup');

  const frames = {
    windup: [
      `[${actorName}]              [${targetName}]`,
      `[${actorName}] >            [${targetName}]`,
      `[${actorName}] >>           [${targetName}]`,
    ],
    strike: [
      `[${actorName}] >>>>         [${targetName}]`,
      `[${actorName}] >>>>>>       [${targetName}]`,
      `[${actorName}] >>>>>>>>     [${targetName}]`,
    ],
    impact: isCritical ? [
      `[${actorName}]          ★   [${targetName}]`,
      `[${actorName}]         ★★★  [${targetName}]`,
      `[${actorName}]        ★★★★★ [${targetName}]`,
      `[${actorName}]              [${targetName}] !!!`,
    ] : [
      `[${actorName}]          *   [${targetName}]`,
      `[${actorName}]              [${targetName}] !`,
    ],
  };

  const [frameIndex, setFrameIndex] = useState(0);

  useEffect(() => {
    const currentFrames = phase === 'windup' ? frames.windup
      : phase === 'strike' ? frames.strike
      : phase === 'impact' ? frames.impact
      : [];

    if (phase === 'done') {
      if (onComplete) onComplete();
      return;
    }

    if (frameIndex >= currentFrames.length) {
      // Move to next phase
      if (phase === 'windup') {
        setPhase('strike');
        setFrameIndex(0);
      } else if (phase === 'strike') {
        setPhase('impact');
        setFrameIndex(0);
      } else if (phase === 'impact') {
        setPhase('done');
      }
      return;
    }

    const timer = setTimeout(() => {
      setFrameIndex(frameIndex + 1);
    }, 60); // 60ms per frame

    return () => clearTimeout(timer);
  }, [frameIndex, phase, onComplete]);

  if (phase === 'done') {
    return null;
  }

  const currentFrames = phase === 'windup' ? frames.windup
    : phase === 'strike' ? frames.strike
    : frames.impact;

  const frame = currentFrames[frameIndex] ?? '';
  const color = isCritical && phase === 'impact' ? 'yellow' : 'white';

  return (
    <Box>
      <Text color={color}>{frame}</Text>
    </Box>
  );
};

// =============================================================================
// TECHNIQUE CHARGE ANIMATION
// =============================================================================

interface TechniqueChargeProps {
  actorName: string;
  techniqueName: string;
  onComplete?: () => void;
}

export const TechniqueCharge: React.FC<TechniqueChargeProps> = ({
  actorName,
  techniqueName,
  onComplete,
}) => {
  const [frame, setFrame] = useState(0);

  const frames = [
    `[${actorName}]  ○`,
    `[${actorName}]  ◔`,
    `[${actorName}]  ◑`,
    `[${actorName}]  ◕`,
    `[${actorName}]  ●`,
    `[${actorName}]  ≋≋≋  ${techniqueName}!`,
  ];

  useEffect(() => {
    if (frame >= frames.length) {
      if (onComplete) onComplete();
      return;
    }

    const timer = setTimeout(() => {
      setFrame(frame + 1);
    }, 100);

    return () => clearTimeout(timer);
  }, [frame, frames.length, onComplete]);

  if (frame >= frames.length) {
    return null;
  }

  return (
    <Box>
      <Text color="cyan">{frames[frame]}</Text>
    </Box>
  );
};

// =============================================================================
// EXPORTS
// =============================================================================

export default CombatAnimation;
