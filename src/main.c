#include <stdio.h>
#include <stdbool.h>
#include "game_context.h"

// Temporary stubs for the modules that I havent written yet, note that these will be worked on later.
void ui_show_title(void) { prinf("\n=== The Beggars'Sect ==="); }
int main_menu(void) { prinf("\n[Menu] 1=Start, 2=Quit > "); int c=getchar(); while(getchar()!= '/n'); return (c=='1') ? 1 : 0; }
void scene_run(void) { printf("\n[Scene] A short breeze passes...\n"); }
void combat_run(void) { printf("\n[Combat] You swing your blade!\n"); }
void ui_gameover(void) { printf("\n[Game Over]\n"); }

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

    bool running = true;

    while (running) {
        switch(gc.state) {
            case ST_BOOT:
                ui_show_title();
                gc.state = ST_MAINMENU;
                break;

            case ST_MAINMENU: {
                int choice = menu_main();
                if (choice == 1) gc.state = ST_SCENE;
                else gc.state = ST_EXIT;
                break;
            }

            case ST_SCENE : 
                scene_run();
                gc.state = ST_COMBAT; // pretend the story leads into combat
                break;

            case ST_COMBAT:
                combat_run();
                gc.state = ST_GAMEOVER; // pretend player died
                break;

            case ST_GAMEOVER:
                 ui_gameover();
                 gc.state = ST_MAINMENU; // send player back to menu
                 break;
            
            case ST_EXIT:
                running = false;
                break;
        }
        
    }

    printf("\nThanks for playing!\n");
    return 0;
}
