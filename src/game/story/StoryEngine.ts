/**
 * Story Engine
 * Manages story progression, scene transitions, and narrative state
 */

import type {
  Chapter,
  Scene,
  SceneBlock,
  ContentLine,
  Choice,
  ChoiceEffect,
  StoryState,
  StoryResult,
  ExplorationArea,
} from '../../types/index';

import { createStoryState } from '../../types/story';

// =============================================================================
// STORY ENGINE
// =============================================================================

export class StoryEngine {
  private chapters: Map<string, Chapter> = new Map();
  private state: StoryState;
  private onStateChange?: (state: StoryState) => void;

  constructor(onStateChange?: (state: StoryState) => void) {
    this.state = createStoryState();
    this.onStateChange = onStateChange;
  }

  // ---------------------------------------------------------------------------
  // CHAPTER/SCENE REGISTRATION
  // ---------------------------------------------------------------------------

  /**
   * Register a chapter with all its scenes
   */
  registerChapter(chapter: Chapter): void {
    this.chapters.set(chapter.id, chapter);
  }

  /**
   * Get a chapter by ID
   */
  getChapter(chapterId: string): Chapter | undefined {
    return this.chapters.get(chapterId);
  }

  /**
   * Get a scene by ID from any chapter
   */
  getScene(sceneId: string): Scene | undefined {
    for (const chapter of this.chapters.values()) {
      const scene = chapter.scenes.find((s) => s.id === sceneId);
      if (scene) return scene;
    }
    return undefined;
  }

  // ---------------------------------------------------------------------------
  // STATE MANAGEMENT
  // ---------------------------------------------------------------------------

  getState(): StoryState {
    return { ...this.state };
  }

  setState(state: StoryState): void {
    this.state = { ...state };
    this.notifyStateChange();
  }

  /**
   * Start or restart the story from the beginning
   */
  startStory(): StoryResult {
    this.state = createStoryState();
    return this.processCurrentPosition();
  }

  /**
   * Jump to a specific scene
   */
  jumpToScene(sceneId: string): StoryResult {
    const scene = this.getScene(sceneId);
    if (!scene) {
      throw new Error(`Scene not found: ${sceneId}`);
    }

    // Find which chapter this scene is in
    for (const chapter of this.chapters.values()) {
      if (chapter.scenes.some((s) => s.id === sceneId)) {
        this.state.currentChapter = chapter.id;
        break;
      }
    }

    this.state.currentScene = sceneId;
    this.state.contentIndex = 0;
    this.notifyStateChange();

    return this.processCurrentPosition();
  }

  // ---------------------------------------------------------------------------
  // STORY PROGRESSION
  // ---------------------------------------------------------------------------

  /**
   * Advance the story (player pressed continue)
   */
  advance(): StoryResult {
    this.state.contentIndex++;
    return this.processCurrentPosition();
  }

  /**
   * Make a choice
   */
  makeChoice(choiceId: string): StoryResult {
    const scene = this.getScene(this.state.currentScene);
    if (!scene) {
      throw new Error(`Current scene not found: ${this.state.currentScene}`);
    }

    // Find the choice block and the selected choice
    const block = scene.content[this.state.contentIndex];
    if (block.type !== 'choice') {
      throw new Error('Not at a choice block');
    }

    const choice = block.choices.find((c) => c.id === choiceId);
    if (!choice) {
      throw new Error(`Choice not found: ${choiceId}`);
    }

    // Record the choice
    this.state.choiceHistory.push({
      sceneId: this.state.currentScene,
      choiceId,
    });

    // Apply effects
    if (choice.effects) {
      this.applyChoiceEffects(choice.effects);
    }

    // If choice has response content, we need to show it first
    // For now, advance to next block
    this.state.contentIndex++;

    // If choice branches to a different scene
    if (choice.nextScene) {
      return this.jumpToScene(choice.nextScene);
    }

    return this.processCurrentPosition();
  }

  /**
   * Complete combat and continue story
   */
  completeCombat(victory: boolean): StoryResult {
    const scene = this.getScene(this.state.currentScene);
    if (!scene) {
      throw new Error(`Current scene not found: ${this.state.currentScene}`);
    }

    const block = scene.content[this.state.contentIndex];
    if (block.type !== 'combat') {
      throw new Error('Not at a combat block');
    }

    if (!victory && block.loseScene) {
      return this.jumpToScene(block.loseScene);
    }

    // Advance past combat
    this.state.contentIndex++;
    return this.processCurrentPosition();
  }

  /**
   * Complete exploration and continue story
   */
  completeExploration(): StoryResult {
    this.state.contentIndex++;
    return this.processCurrentPosition();
  }

  // ---------------------------------------------------------------------------
  // INTERNAL PROCESSING
  // ---------------------------------------------------------------------------

  /**
   * Process current position and return what to display/do
   */
  private processCurrentPosition(): StoryResult {
    const scene = this.getScene(this.state.currentScene);
    if (!scene) {
      throw new Error(`Scene not found: ${this.state.currentScene}`);
    }

    // Check if we've gone past all content in this scene
    if (this.state.contentIndex >= scene.content.length) {
      return this.completeScene(scene);
    }

    const block = scene.content[this.state.contentIndex];

    switch (block.type) {
      case 'content':
        return {
          action: 'continue',
          state: this.getState(),
          content: block.lines,
        };

      case 'choice':
        // Filter choices based on conditions
        const availableChoices = block.choices.filter((c) =>
          this.checkChoiceCondition(c)
        );
        return {
          action: 'choice',
          state: this.getState(),
          content: block.prompt
            ? [{ type: 'system', text: block.prompt }]
            : undefined,
          choices: availableChoices,
        };

      case 'combat':
        return {
          action: 'combat',
          state: this.getState(),
          enemies: block.enemies,
        };

      case 'exploration':
        return {
          action: 'exploration',
          state: this.getState(),
          areas: block.areas,
        };

      case 'montage':
        // For montage, we flatten all days into content
        const montageContent: ContentLine[] = [];
        for (const day of block.days) {
          montageContent.push({ type: 'divider', label: day.label });
          montageContent.push(...day.content);
        }
        return {
          action: 'continue',
          state: this.getState(),
          content: montageContent,
        };

      default:
        throw new Error(`Unknown block type: ${(block as any).type}`);
    }
  }

  /**
   * Complete a scene and move to the next one
   */
  private completeScene(scene: Scene): StoryResult {
    // Mark scene as completed
    if (!this.state.completedScenes.includes(scene.id)) {
      this.state.completedScenes.push(scene.id);
    }

    // Check if this is a chapter-ending scene
    const chapter = this.getChapter(this.state.currentChapter);
    if (chapter && chapter.endScenes.includes(scene.id)) {
      return this.completeChapter(chapter);
    }

    // Move to next scene
    if (scene.nextScene) {
      return this.jumpToScene(scene.nextScene);
    }

    // No next scene defined - this shouldn't happen in well-designed content
    throw new Error(`Scene ${scene.id} has no nextScene defined`);
  }

  /**
   * Complete a chapter and move to the next one
   */
  private completeChapter(chapter: Chapter): StoryResult {
    // Find the next chapter
    const chapterIds = Array.from(this.chapters.keys());
    const currentIndex = chapterIds.indexOf(chapter.id);

    if (currentIndex >= chapterIds.length - 1) {
      // This was the last chapter
      return {
        action: 'game-end',
        state: this.getState(),
      };
    }

    const nextChapterId = chapterIds[currentIndex + 1];
    const nextChapter = this.chapters.get(nextChapterId);

    if (!nextChapter) {
      throw new Error(`Next chapter not found: ${nextChapterId}`);
    }

    return {
      action: 'chapter-end',
      state: this.getState(),
      nextChapter: nextChapterId,
    };
  }

  // ---------------------------------------------------------------------------
  // CHOICE HANDLING
  // ---------------------------------------------------------------------------

  /**
   * Check if a choice is available based on conditions
   */
  private checkChoiceCondition(choice: Choice): boolean {
    if (!choice.condition) return true;

    const cond = choice.condition;

    switch (cond.type) {
      case 'flag':
        return this.state.flags[cond.flag] === cond.value;

      case 'relationship':
        const rel = this.state.relationships[cond.character] ?? 0;
        if (cond.min !== undefined && rel < cond.min) return false;
        if (cond.max !== undefined && rel > cond.max) return false;
        return true;

      case 'path':
        const pathScore = this.state.pathScores[cond.path];
        return cond.min !== undefined ? pathScore >= cond.min : true;

      case 'item':
        const hasItem = this.state.discoveredItems.includes(cond.itemId);
        return hasItem === cond.has;

      default:
        return true;
    }
  }

  /**
   * Apply effects from a choice
   */
  private applyChoiceEffects(effects: ChoiceEffect[]): void {
    for (const effect of effects) {
      switch (effect.type) {
        case 'relationship':
          this.state.relationships[effect.character] =
            (this.state.relationships[effect.character] ?? 0) + effect.delta;
          break;

        case 'flag':
          this.state.flags[effect.flag] = effect.value;
          break;

        case 'path':
          this.state.pathScores[effect.path] += effect.delta;
          break;

        case 'item':
          if (effect.action === 'add') {
            if (!this.state.discoveredItems.includes(effect.itemId)) {
              this.state.discoveredItems.push(effect.itemId);
            }
          } else {
            this.state.discoveredItems = this.state.discoveredItems.filter(
              (id) => id !== effect.itemId
            );
          }
          break;
      }
    }

    this.notifyStateChange();
  }

  // ---------------------------------------------------------------------------
  // STATE NOTIFICATIONS
  // ---------------------------------------------------------------------------

  private notifyStateChange(): void {
    if (this.onStateChange) {
      this.onStateChange(this.getState());
    }
  }

  // ---------------------------------------------------------------------------
  // FLAGS & QUERIES
  // ---------------------------------------------------------------------------

  /**
   * Set a story flag
   */
  setFlag(flag: string, value: boolean | string | number): void {
    this.state.flags[flag] = value;
    this.notifyStateChange();
  }

  /**
   * Get a story flag
   */
  getFlag(flag: string): boolean | string | number | undefined {
    return this.state.flags[flag];
  }

  /**
   * Check if a scene has been completed
   */
  hasCompletedScene(sceneId: string): boolean {
    return this.state.completedScenes.includes(sceneId);
  }

  /**
   * Get the dominant path based on scores
   */
  getDominantPath(): 'blade' | 'stream' | 'shadow' | 'balanced' {
    const { blade, stream, shadow } = this.state.pathScores;

    if (blade === stream && stream === shadow) {
      return 'balanced';
    }

    if (blade >= stream && blade >= shadow) return 'blade';
    if (stream >= blade && stream >= shadow) return 'stream';
    return 'shadow';
  }

  /**
   * Get relationship level with a character
   */
  getRelationship(character: string): number {
    return this.state.relationships[character] ?? 0;
  }
}
