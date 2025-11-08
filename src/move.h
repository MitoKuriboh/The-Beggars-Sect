#ifndef MOVE_H
#define MOVE_H
#include "stats.h"

typedef enum { MOVE_ATTACK, MOVE_DEFEND, MOVE_STYLE } MoveType;

typedef struct {
    const char *name;
    MoveType type;
    int stamina_cost;     // 0 for basic moves
    int power;            // base modifier (used in formula)
    int accuracy;         // 0..100 (apply later; start at 100)
} Move;
#endif
