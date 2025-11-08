#ifndef STYLE_H
#define STYLE_H
#include "move.h"

typedef struct {
    const char *name;
    const Move *moves;   // pointer to an array
    int move_count;
} Style;
#endif
