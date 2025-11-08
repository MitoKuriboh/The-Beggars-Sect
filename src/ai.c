#include "actor.h"
#include "move.h"
const Move* ai_pick_move(const Actor *enemy, const Actor *player) {
    // naive: prefer ATTACK/STYLE over DEFEND
    for (int i=0;i<enemy->style->move_count;i++) {
        const Move *m = &enemy->style->moves[i];
        if (m->type != MOVE_DEFEND) return m;
    }
    return &enemy->style->moves[0];
}
