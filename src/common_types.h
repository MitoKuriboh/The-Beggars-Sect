#pragma once

// These enums define the main modes the game can be in.
typedef enum {
    ST_BOOT = 0,     // Starting up
    ST_MAINMENU,     // Main menu (new/load/quit)
    ST_SCENE,        // Narrative scene
    ST_COMBAT,       // Battle mode
    ST_GAMEOVER,     // When the player loses
    ST_EXIT          // End the game
} GameState;

// Identify which story scene you're currently in.
typedef enum {
    SCN_INTRO = 0,
    SCN_CH1_START
    // add more later as your story grows
} SceneId;
