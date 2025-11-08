#include "style.h"

static const Move BOXING_MOVES[] = {
    { "Jab",        MOVE_STYLE, 0,  1, 100 },
    { "Cross",      MOVE_STYLE, 0,  2, 100 },
    { "Guard Up",   MOVE_DEFEND,0,  0, 100 },
};

const Style STYLE_BOXING = { "Boxing", BOXING_MOVES, 3 };
