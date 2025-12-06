/**
 * Story Screen
 * Main UI for story content display and interaction
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Box, Text, useInput } from 'ink';
import type {
  Character,
  Enemy,
  ContentLine,
  Choice,
  StoryState,
  StoryResult,
  ExplorationArea,
} from '../../types/index';
import { StoryEngine, PROLOGUE } from '../../game/story';
import { createEnemy } from '../../game/factories/CharacterFactory';

import { ContentBlock } from './ContentRenderer';
import { ChoiceMenu } from './ChoiceMenu';
import { ExplorationMenu } from './ExplorationMenu';

// =============================================================================
// TYPES
// =============================================================================

type StoryPhase =
  | 'content'       // Displaying content, waiting for space
  | 'choice'        // Player choosing from options
  | 'exploration'   // Player exploring an area
  | 'combat'        // Transitioning to combat
  | 'chapter-end'   // Chapter completed
  | 'game-end';     // Story completed

interface StoryScreenProps {
  player: Character;
  onCombatStart: (enemies: Enemy[]) => void;
  onGameEnd: (state: StoryState) => void;
}

// =============================================================================
// STORY SCREEN
// =============================================================================

export const StoryScreen: React.FC<StoryScreenProps> = ({
  player,
  onCombatStart,
  onGameEnd,
}) => {
  // Story engine
  const engineRef = useRef<StoryEngine | null>(null);

  // State
  const [phase, setPhase] = useState<StoryPhase>('content');
  const [content, setContent] = useState<ContentLine[]>([]);
  const [contentIndex, setContentIndex] = useState(0);
  const [choices, setChoices] = useState<Choice[]>([]);
  const [choicePrompt, setChoicePrompt] = useState<string>('');
  const [areas, setAreas] = useState<ExplorationArea[]>([]);
  const [sceneTitle, setSceneTitle] = useState('');
  const [location, setLocation] = useState('');
  const [isPaused, setIsPaused] = useState(false);

  // Initialize story engine
  useEffect(() => {
    const engine = new StoryEngine();
    engine.registerChapter(PROLOGUE);
    engineRef.current = engine;

    // Start the story
    const result = engine.startStory();
    handleResult(result);
  }, []);

  // Handle story result
  const handleResult = useCallback((result: StoryResult) => {
    const scene = engineRef.current?.getScene(result.state.currentScene);
    if (scene) {
      setSceneTitle(scene.title);
      setLocation(scene.location || '');
    }

    switch (result.action) {
      case 'continue':
        setPhase('content');
        setContent(result.content || []);
        setContentIndex(0);
        break;

      case 'choice':
        setPhase('choice');
        setContent(result.content || []);
        setContentIndex((result.content?.length || 1) - 1);
        setChoices(result.choices || []);
        setChoicePrompt('');
        break;

      case 'exploration':
        setPhase('exploration');
        setAreas(result.areas || []);
        break;

      case 'combat':
        setPhase('combat');
        // Create enemy instances
        const enemies = (result.enemies || []).map((id) => createEnemy(id));
        onCombatStart(enemies);
        break;

      case 'chapter-end':
        setPhase('chapter-end');
        setContent([
          { type: 'system', text: 'Chapter Complete' },
          { type: 'instruction', text: 'Press [SPACE] to continue to the next chapter' },
        ]);
        setContentIndex(1);
        break;

      case 'game-end':
        setPhase('game-end');
        onGameEnd(result.state);
        break;
    }
  }, [onCombatStart, onGameEnd]);

  // Handle content advancement
  const advanceContent = useCallback(() => {
    if (isPaused) return;

    const currentLine = content[contentIndex];

    // Handle pause effect
    if (currentLine?.type === 'pause') {
      setIsPaused(true);
      setTimeout(() => {
        setIsPaused(false);
        if (contentIndex < content.length - 1) {
          setContentIndex((i) => i + 1);
        } else {
          // End of content block, advance story
          const result = engineRef.current?.advance();
          if (result) handleResult(result);
        }
      }, currentLine.duration);
      return;
    }

    // Advance to next line
    if (contentIndex < content.length - 1) {
      setContentIndex((i) => i + 1);
    } else {
      // End of content block, advance story
      const result = engineRef.current?.advance();
      if (result) handleResult(result);
    }
  }, [content, contentIndex, isPaused, handleResult]);

  // Handle choice selection
  const handleChoice = useCallback((choiceId: string) => {
    const result = engineRef.current?.makeChoice(choiceId);
    if (result) handleResult(result);
  }, [handleResult]);

  // Handle exploration completion
  const handleExplorationComplete = useCallback(() => {
    const result = engineRef.current?.completeExploration();
    if (result) handleResult(result);
  }, [handleResult]);

  // Handle chapter transition
  const handleChapterContinue = useCallback(() => {
    // For now, just advance - would load next chapter
    const result = engineRef.current?.advance();
    if (result) handleResult(result);
  }, [handleResult]);

  // Input handling
  useInput((input, key) => {
    if (phase === 'content' && (key.return || input === ' ')) {
      advanceContent();
    } else if (phase === 'chapter-end' && (key.return || input === ' ')) {
      handleChapterContinue();
    }
  });

  // Render
  return (
    <Box flexDirection="column" padding={1}>
      {/* Header */}
      <Box marginBottom={1} flexDirection="column">
        <Text bold color="magenta">
          ═══ {sceneTitle.toUpperCase()} ═══
        </Text>
        {location && (
          <Text dimColor>
            📍 {location}
          </Text>
        )}
      </Box>

      {/* Content area */}
      <Box
        flexDirection="column"
        minHeight={15}
        borderStyle="single"
        borderColor="gray"
        padding={1}
      >
        {phase === 'content' && (
          <>
            <ContentBlock
              lines={content}
              currentIndex={contentIndex}
            />
            {!isPaused && contentIndex === content.length - 1 && (
              <Box marginTop={1}>
                <Text dimColor>
                  Press [SPACE] to continue...
                </Text>
              </Box>
            )}
          </>
        )}

        {phase === 'choice' && (
          <>
            <ContentBlock lines={content} showAll />
            <ChoiceMenu
              choices={choices}
              onSelect={handleChoice}
              prompt={choicePrompt}
            />
          </>
        )}

        {phase === 'exploration' && (
          <ExplorationMenu
            areas={areas}
            onComplete={handleExplorationComplete}
          />
        )}

        {phase === 'chapter-end' && (
          <ContentBlock lines={content} showAll />
        )}

        {phase === 'game-end' && (
          <Box flexDirection="column" alignItems="center">
            <Text bold color="green">
              ═══ THE END ═══
            </Text>
            <Text>Thank you for playing.</Text>
          </Box>
        )}
      </Box>
    </Box>
  );
};
