#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include "combat.h"

typedef struct {
    const char *name;
    int hp;
    int atk;
    int def;
    int spd;
} Enemy;

CombatResult combat_run(GameContext *gc) {
    Enemy enemy = {"Wandering Bandit", 25, 4, 2, 10}; // test numbers

    printf("\n[Combat] %s appears!\n", enemy.name);

    srand((unsigned)time(NULL));

    while (gc->player.hp > 0 && enemy.hp > 0) {
        printf("\n-- Turn Start --\n");
        printf("Your HP: %d/%d | Enemy HP: %d\n",
               gc->player.hp, gc->player.hp_max, enemy.hp);

        printf("Choose action:\n");
        printf("1) Attack\n");
        printf("2) Defend\n");
        printf("3) Run\n");
        printf("> ");

        int c = getchar();
        int ch; while ((ch = getchar()) != '\n' && ch != EOF) {}

        int player_def_buff = 0;
        int player_action = 0; // 1=attack, 2=defend, 3=run

        switch (c) {
            case '1': player_action = 1; break;
            case '2': player_action = 2; player_def_buff = 2; break;
            case '3': player_action = 3; break;
            default: printf("Invalid choice.\n"); continue;
        }

        if (player_action == 3) {
            printf("You flee from battle!\n");
            return COMBAT_RESULT_ESCAPE;
        }

        // decide who attacks first
        int player_first = 0;
        if (gc->player.agi > enemy.spd)
            player_first = 1;
        else if (gc->player.agi == enemy.spd)
            player_first = (rand() % 2); // random tie-breaker

        // damage calculations
        int player_dmg = gc->player.atk - enemy.def;
        if (player_dmg < 1) player_dmg = 1;

        int enemy_dmg = enemy.atk - (gc->player.def + player_def_buff);
        if (enemy_dmg < 1) enemy_dmg = 1;

        // execute turn
        if (player_first) {
            if (player_action == 1) {
                printf("You strike the %s for %d damage!\n", enemy.name, player_dmg);
                enemy.hp -= player_dmg;
                if (enemy.hp <= 0) goto enemy_dead;
            } else if (player_action == 2) {
                printf("You brace yourself! (+%d DEF this turn)\n", player_def_buff);
            }

            printf("%s attacks!\n", enemy.name);
            gc->player.hp -= enemy_dmg;
            printf("%s hits you for %d damage!\n", enemy.name, enemy_dmg);
        } else {
            printf("%s attacks first!\n", enemy.name);
            gc->player.hp -= enemy_dmg;
            printf("%s hits you for %d damage!\n", enemy.name, enemy_dmg);
            if (gc->player.hp <= 0) break;

            if (player_action == 1) {
                printf("You strike back for %d damage!\n", player_dmg);
                enemy.hp -= player_dmg;
            } else if (player_action == 2) {
                printf("You brace yourself! (+%d DEF this turn)\n", player_def_buff);
            }
        }

        if (gc->player.hp <= 0) break;
        if (enemy.hp <= 0) {
        enemy_dead:
            printf("\nYou defeated the %s!\n", enemy.name);
            return COMBAT_RESULT_WIN;
        }
    }

    if (gc->player.hp <= 0) {
        printf("\nYou were defeated by the %s...\n", enemy.name);
        return COMBAT_RESULT_LOSE;
    }

    return COMBAT_RESULT_WIN;
}
