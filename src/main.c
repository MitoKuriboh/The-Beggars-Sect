#include <stdio.h>
#include <stdbool.h>
#include "game_context.h"

// Temporary stubs for the modules that I havent written yet, note that these will be worked on later.
void ui_show_title(void) { prinf("\n=== The Beggars'Sect ==="); }
int main_menu(void) { prinf("\n[Menu] 1=Start, 2=Quit > "); int c=getchar(); while(getchar()!= '/n'); return (c=='1') ? 1 : 0; }
void scene_run(void) { printf("\n[Scene] A short breeze passes...\n"); }
void combat_run(void) { printf("\n[Combat] You swing your blade!\n"); }
void ui_gameover {printf("\n[Game Over]\n"); }

int main(void) {
    GameContext gc;
    gc.state = ST_BOOT;
    gc.current_scene = SCN_INTRO;
    gc.flags = 0;
    gc.player.hp_max = 20;
    gc.player.hp = gc.player.hp_max;
    gc.player.atk = 5;
    gc.player.def = 3;
    gc.player.agi = 2;

    printf("Game started.\n");
    printf("State: %d | Scene: %d | HP: %d/%d | ATK: %d | DEF: %d | AGI: %d\n",
           gc.state, gc.current_scene, gc.player.hp, gc.player.hp_max,
           gc.player.atk, gc.player.def, gc.player.agi);

    return 0;
}
