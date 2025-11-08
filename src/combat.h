#ifndef COMBAT_H
#define COMBAT_H

#include "game_context.h"

typedef enum {
    COMBAT_RESULT_WIN,
    COMBAT_RESULT_LOSE,
    COMBAT_RESULT_ESCAPE
} CombatResult;

// Run a combat encounter and return the result.
CombatResult combat_run(GameContext *gc);

#endif
