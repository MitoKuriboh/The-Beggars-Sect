#include <stdio.h>
#include <string.h>
#include <ctype.h>
#include "menu.h"

// --- local helpers (keep it self-contained for now) ---
static int readline_trim(char *buf, int sz) {
    if (!fgets(buf, sz, stdin)) return 0;             // EOF / error
    // strip trailing \n and \r\n
    size_t n = strlen(buf);
    while (n && (buf[n-1]=='\n' || buf[n-1]=='\r')) buf[--n] = '\0';
    return 1;
}
static int first_nonspace(const char *s) {
    while (*s && isspace((unsigned char)*s)) ++s;
    return (unsigned char)*s;
}
// ------------------------------------------------------

MenuAction main_menu(void) {
    for (;;) {
        // draw
        printf("\n=== The Beggars' Sect ===\n");
        printf("[Menu]\n");
        printf("1) Start New Game\n");
        // printf("2) Load Game\n");     // uncomment when implemented
        // printf("3) Settings\n");
        printf("0) Quit\n");
        printf("> ");

        // read
        char line[64];
        if (!readline_trim(line, sizeof line)) {
            // On EOF (e.g., Ctrl+D), exit gracefully
            return MENU_QUIT;
        }

        // accept first non-space char; allow letters as shortcuts
        int c = first_nonspace(line);
        switch (c) {
            case '1': case 's': case 'S':
                return MENU_START;
            // case '2': return MENU_LOAD;      // enable when ready
            // case '3': return MENU_SETTINGS;  // enable when ready
            case '0': case 'q': case 'Q':
                return MENU_QUIT;
            default:
                printf("Choose a valid option (1 or 0).\n");
        }
    }
}
