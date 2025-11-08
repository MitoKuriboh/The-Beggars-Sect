#ifndef MENU_H
#define MENU_H

// Return codes for main menu selections
typedef enum {
    MENU_QUIT    = 0,
    MENU_START   = 1,
    MENU_LOAD    = 2,   // future use
    MENU_SETTINGS= 3    // future use
} MenuAction;

MenuAction main_menu(void);

#endif
