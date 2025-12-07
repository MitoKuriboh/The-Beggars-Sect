# Changelog

All notable changes to The Beggars Sect will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.7] - 2025-12-07

### Added
- **Full Arrow-Key Navigation**: Game is now completely playable with only arrow keys, enter, and spacebar
  - No letter keys required for any navigation or menu interaction
  - Arrow keys navigate all menus and cycle through tabs
  - Enter opens status menu during story, confirms selections
  - Spacebar advances story content
- **Enhanced Title Screen**: Full-screen centered layout with decorative CLI art
  - Added crossed swords (⚔️) and dragon emblems (🐉)
  - Integrated version number display
  - Added tagline: "A tale of honor, chi, and redemption in the Martial Arts Haven"
  - Decorative separator lines for visual hierarchy
- **Polished Main Menu**: Centered, bordered menu with live game status
  - Shows current character name, stance, chapter, and scene when game is active
  - Added icons to all menu items (▸ Continue Journey, ⚡ New Game, 📂 Load Game, etc.)
  - Double-border frame with Chinese characters (丐 帮)
  - Helpful footer: "Use ↑↓ arrows and Enter to select"
- **Enhanced Credits Screen**: Full-screen centered with rounded border
  - Displays game title in both English and Chinese
  - Shows version number and tech stack
  - Consistent visual style with other screens
- **Initial Stance Selection**: Choose your stance at the start of combat (before first turn)
  - Helpful text explaining stance effects
  - Doesn't consume a turn
- **Quit to Main Menu Warning**: Confirmation dialog when quitting from status menu
  - Warns "Any unsaved progress will be lost!"
  - Uses SelectInput menu instead of y/n keys

### Changed
- **Combat Balance**: Replaced 2 desperate thugs with 1 tankier alley-brawler in prologue
  - More balanced difficulty for first combat encounter
  - Updated all dialogue and narrative to reflect single opponent
- **Status Menu Navigation**: Left/right arrows cycle through tabs instead of number keys
  - Updated visual indicators (▸ Tab ◂ instead of [1])
  - Updated footer hint to show arrow key controls
- **All Confirmation Dialogs**: Converted from y/n keypresses to SelectInput menus
  - New Game confirmation
  - Save overwrite confirmations
  - Delete save confirmations
  - All confirmations now use arrow keys + enter
- **Combat Screen Polish**:
  - Added constants for timing values (reduced magic numbers)
  - Added useMemo for performance optimization
  - Enhanced message system with color coding (damage/heal/status)
  - Improved turn indicators with directional arrows (⟹/⟸)
  - Better bordered message boxes

### Removed
- **Defend and Chi Focus Actions**: Removed from combat
  - These mechanics are now handled through stance system
  - Simplified action menu
- **Item System**: Removed from combat UI
  - Preparing for future inventory rework
- **Combat Log**: Removed as it wasn't providing useful information
  - Freed up screen space for clearer combat UI
- **Letter Key Shortcuts**: Removed 'i' key for status menu, number keys for tabs
  - Replaced with arrow-based navigation

### Fixed
- **Game Initialization Error**: Fixed crash when launching game for first time
  - Main menu now properly checks if game is initialized before accessing state
  - Prevents "Game not initialized" error on startup

## [0.3.6] - Previous Release

### Features
- Full Prologue playable (~25 minutes)
- ATB combat system with 55+ techniques
- Save/load system with 3 manual slots + auto-save
- Three stance system (Flowing, Weathered, Hungry)
- Status menu with stats, paths, relationships, and progress tracking
- Typewriter text effect with configurable speed
- Settings menu with typewriter toggle

---

## Release Notes

### v0.3.7 - "Polished Navigation"
This release focuses on accessibility and visual polish, making the game fully playable with just directional controls. The entire UI has been redesigned to use the full terminal window with centered, decorated screens. All keyboard navigation now uses arrow keys and enter/spacebar, eliminating the need for letter key shortcuts.

**Key Highlights:**
- 🎮 Full arrow-key navigation throughout the entire game
- 🎨 Polished, full-screen UI with decorative CLI art
- ⚔️ Enhanced combat balance and initial stance selection
- 📋 All confirmation dialogs use arrow-navigable menus
- 🗑️ Simplified combat by removing defend/chi-focus/items
