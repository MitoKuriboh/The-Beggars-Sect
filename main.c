//libraries
#include <stdio.h>
#include <stdlib.h>

//prototypes
void help_screen(void);
void start_new_game(void);
void main_menu(void);
void wait_for_enter(void);
void clear_screen(void);
void erase_line(void);
void titlescreen(void);
void intro(void);

//main function
int main(void)
{
    titlescreen();
    main_menu();
    return 0;
}

//functions
void main_menu(void)
{
    //declare choice variable
    int choice = 0;

    //loop until valid selection
    while (1)
    {
        //choices
        clear_screen();
        printf("=== The Beggars' Path ===\n");
        printf("[1] Start New Game\n");
        printf("[2] Help / How to Play\n");
        printf("[3] Load Game (coming soon)\n");
        printf("[4] Select Chapter (coming soon)\n");
        printf("[5] Quit\n\n");

        printf("Choose (1-5): ");
        if (scanf("%d", &choice) != 1) {
            int ch;
            clearerr(stdin);
            while ((ch = getchar()) != '\n' && ch != EOF) {}
            printf("Please enter a number between 1 and 4.\n");
            wait_for_enter();
            continue;
        }

        // clear the trailing newline
        int ch;
        while ((ch = getchar()) != '\n' && ch != EOF) {}

        // linking choices
        switch (choice)
        {
            case 1:
                start_new_game();
                break;
            case 2:
                help_screen();
                break;
            case 3:
                clear_screen();
                printf("Load Game is not implemented yet.\n");
                printf("We'll add save/load after Chapter 1.\n\n");
                wait_for_enter();
                break;
            case 4: 
                clear_screen();
                printf("Select chapter is not implemented yet.\n");
                printf("We'll add select chapter after Chapter 1.\n\n");
                wait_for_enter();
                break;            
            case 5: {
                // Confirm quit
                char yn = 0;
                printf("\nQuit the game? (y/n): ");
                yn = (char)getchar();
                // flush any extra input
                while ((ch = getchar()) != '\n' && ch != EOF) {}
                if (yn == 'y' || yn == 'Y') {
                    clear_screen();
                    printf("Farewell, wanderer.\n");
                    return; // exit menu → return to main → program ends
                }
                break;
            }
            default:
                printf("That's is not a valid choice. Try 1-4.\n");
                wait_for_enter();
                break;
        }
    }
}

void help_screen(void)
{
    clear_screen();
    printf("=== HELP ===\n\n");
    printf("- This is a text RPG. Read the scene and pick a number.\n");
    printf("- Some choices adjust hidden stats (HP, Reputation).\n");
    printf("- Press Enter when prompted to advance the text.\n");
    printf("- You can open an in-game Menu in scenes later (save/exit).\n\n");
    wait_for_enter();
}

void start_new_game(void)
{
    clear_screen();
    intro();
}

void wait_for_enter(void)
{
    printf("Press Enter to continue!");
    fflush(stdout);
    int c;
    while ((c = getchar()) != '\n' && c != EOF) {}
}

void clear_screen(void)
{
#ifdef _WIN32
    system("cls");
#else
    system("clear");
#endif
}

void erase_line(void)
{
    printf("\033[A\33[2K\r");
    fflush(stdout);
}

void titlescreen(void)
{
    clear_screen();
    printf("Welcome to --The Beggars' Path!--\n\n");
    wait_for_enter();
    clear_screen();
}

// intro + chapters
void intro(void)
{
    printf("To play this game you can choose numbers to progress the story.\n\n");
    printf("Know that every choice matters!\n\n");

    wait_for_enter();
    clear_screen();

    printf("The gutters of the Cradle of Ashes never sleep...\n\n");

    wait_for_enter();
    erase_line();

    printf("Beneath the ancient stone bridges...\n");
    printf("Beggars whisper prayers to bowls instead of gods.\n\n");

    wait_for_enter();
    erase_line();

    printf("You are Li Wei, a young disciple of the Beggars' Sect.\n\n");
    printf("The Beggars' Sect is only sect that trains with empty hands and hungry stomachs.\n\n");

    wait_for_enter();
    erase_line();

    printf("A relic was stolen from the emperor's vault.\n");
    printf("The guards say your people took it...\n\n");

    wait_for_enter();
    erase_line();

    printf("At dawn, the elder beggars gathered in silence.\n");
    printf("They said little, but their words were simple...\n\n");

    wait_for_enter();
    erase_line();

    printf("\"Find the truth, or the sect dies.\"\n\n");

    wait_for_enter();
    erase_line();

    printf("You are no seasoned disciple, and you own almost nothing.\n\n");
    printf("Yet you have been chosen...\n\n");

    wait_for_enter();
    erase_line();

    printf("Is this part of conditioning my progress you wonder...\n");
    printf("\"I will clear the name of the sect!\"\n\n");

    wait_for_enter();
    erase_line();

    printf("\"Those who have nothing can lose nothing. So go, and take everything.\"\n\n");

    wait_for_enter();
    clear_screen();
}