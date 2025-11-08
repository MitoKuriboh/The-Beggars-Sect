#ifndef ACTOR_H
#define ACTOR_H
#include "stats.h"
#include "style.h"

typedef enum { FACTION_PLAYER, FACTION_ENEMY } Faction;

typedef struct {
    const char *name;
    Faction faction;
    Stats stats;
    const Style *style;     // NULL means basic Attack/Defend only
} Actor;
#endif
