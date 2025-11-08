#include "actor.h"
extern const Style STYLE_BOXING;

Actor enemy_bandit(void) {
    Actor a = {
        .name = "Wandering Bandit",
        .faction = FACTION_ENEMY,
        .stats = { .hp=20, .hp_max=20, .atk=4, .def=2, .spd=10, .stamina=0, .stamina_max=0 },
        .style = &STYLE_BOXING
    };
    return a;
}
