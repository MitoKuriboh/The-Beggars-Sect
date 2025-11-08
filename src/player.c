#include "actor.h"
extern const Style STYLE_BOXING;

void player_init(Actor *p) {
    *p = (Actor){
        .name = "Li Wei",
        .faction = FACTION_PLAYER,
        .stats = { .hp=20, .hp_max=20, .atk=5, .def=3, .spd=8, .stamina=0, .stamina_max=0 },
        .style = &STYLE_BOXING
    };
}
