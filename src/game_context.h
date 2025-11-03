#pragma once
#include "common_types.h"

// Temporary player struct — we’ll move it to player.h later.
typedef struct {
    int hp, hp_max;
    int atk, def, agi;
} Player;

// The single struct that carries your whole game’s state.
typedef struct {
    GameState state;        // what part of the game is running
    SceneId current_scene;  // which scene you’re in
    int flags;              // simple on/off conditions (optional)
    Player player;          // player stats
} GameContext;
