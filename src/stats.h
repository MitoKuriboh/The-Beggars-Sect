#ifndef STATS_H
#define STATS_H
typedef struct {
    int hp, hp_max;
    int atk, def, spd;   // spd = turn order
    int stamina, stamina_max; // optional; for styles later
} Stats;
#endif
