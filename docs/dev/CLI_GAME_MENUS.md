# CLI Game Menu Design Research

**Created:** 2025-12-06
**Purpose:** Comprehensive research on menu design patterns, navigation, accessibility, and UX for CLI/terminal games
**Status:** Reference Document

---

## Table of Contents

1. [Design Principles](#design-principles)
2. [Menu Types & Patterns](#menu-types--patterns)
3. [Navigation Schemes](#navigation-schemes)
4. [Visual Design & ASCII Art](#visual-design--ascii-art)
5. [Framework-Specific Implementation](#framework-specific-implementation)
6. [Accessibility](#accessibility)
7. [Roguelike Menu Patterns](#roguelike-menu-patterns)
8. [Interactive Prompts](#interactive-prompts)
9. [Best Practices](#best-practices)
10. [Resources & References](#resources--references)

---

## Design Principles

### Core UX Guidelines for CLI Menus

Based on research from [Command Line Interface Guidelines](https://clig.dev/) and [Atlassian's CLI Design Principles](https://www.atlassian.com/blog/it-teams/10-design-principles-for-delightful-clis):

#### 1. Human-First Design
- If a command/menu is primarily used by humans, design for humans first
- Follow patterns that already exist to make CLIs intuitive and guessable
- Consistency makes users efficient

#### 2. Information Balance
- **Don't say too little:** A command hanging for minutes makes users wonder if it's broken
- **Don't say too much:** Pages of debugging output overwhelms users
- If everything is highlighted, nothing is highlighted

#### 3. Provide Clear Exit Pathways
- Unlike GUIs, CLIs have no visible way to stop tasks other than closing the terminal
- Always remind users about `Ctrl+C` to exit
- Provide clearly marked back/escape options in menus

#### 4. Use Color Sparingly
- Most terminals support significant colors and emojis
- Use these to highlight **important** information only
- Reserve special formatting for critical states

#### 5. Progressive Disclosure
- Don't throw errors for missing information
- Prompt users to enter outstanding information interactively
- Guide users through complex operations step by step

---

## Menu Types & Patterns

### 1. Single-Selection Menus

The most common menu type. User selects one option from a list.

```
Main Menu
=========
> [1] New Game
  [2] Continue
  [3] Options
  [4] Quit

Use arrow keys to navigate, Enter to select
```

**Key Features:**
- Visual indicator (>, arrow, highlight) shows current selection
- Numbered hotkeys for quick access
- Clear instructions at bottom

### 2. Multi-Selection Menus (Checkboxes)

Allow multiple items to be selected.

```
Select Techniques to Practice
============================
[x] Flowing Palm
[ ] Iron Skin
[x] Wind Step
[ ] Tiger Strike

Space to toggle, Enter to confirm
```

### 3. Hub-and-Spoke Navigation

Central hub with multiple topics to explore, returning to hub after each.

```
Village Square
==============
You stand in the bustling village square.

> Talk to the merchant
  Visit the training hall
  Check the notice board
  Rest at the inn
  [Leave village]

(Yellow options advance story, white options explore)
```

**Use Cases:**
- Information gathering in RPGs
- Town/location exploration
- Non-linear content exploration

### 4. Nested/Hierarchical Menus

Menus within menus for complex option trees.

```
Main Menu > Options > Audio
===========================
  Music Volume    [████████░░] 80%
  SFX Volume      [██████░░░░] 60%
  Voice Volume    [██████████] 100%

  [Back]
```

**Breadcrumb Pattern:**
```
Main Menu > Combat > Techniques > Flowing Stance
```

### 5. Context Menus

Appear based on current game state/situation.

```
Combat Actions (vs Bandit Leader)
=================================
> Attack
  Defend
  Techniques >
  Items >
  Flee (50% chance)

Chi: 15/20 | HP: 80/100
```

### 6. Radial/Quick Menus

Hotkey-based instant access menus.

```
Quick Actions:
[A]ttack  [D]efend  [T]echnique  [I]tem

Press key to execute
```

---

## Navigation Schemes

### Arrow Key Navigation (Most Common)

```javascript
// Standard Pattern
Up/Down Arrow    - Move selection
Enter/Return     - Select/Confirm
Escape          - Back/Cancel
```

**Pros:** Universal, intuitive for most users
**Cons:** Requires taking hands off home row

### Vim-Style Navigation (hjkl)

```javascript
// Vim Pattern
h - Left     j - Down     k - Up     l - Right
Enter/Space  - Select
q            - Quit/Back
```

**Pros:**
- Efficient for power users
- Hands stay on home row
- Well-established in developer tools

**Cons:**
- Learning curve for non-vim users
- Should be optional, not mandatory

**Reference:** [VIM Adventures](https://vim-adventures.com/) - Learn vim through a game

### Number/Letter Hotkeys

```
Combat Menu
===========
[1] Attack
[2] Defend
[3] Techniques
[4] Items
[Q] Flee

Press 1-4 or Q
```

**Pros:**
- Fastest selection method
- No navigation needed
- Accessible (works with screen readers)

**Cons:**
- Limited by available keys
- Can be hard to remember many hotkeys

### Combined Navigation

Best approach: Support multiple schemes simultaneously.

```javascript
// Example: Support all common navigation patterns
function handleInput(key) {
  switch(key) {
    // Arrow keys
    case 'up':
    case 'k':      // Vim
      moveUp();
      break;
    case 'down':
    case 'j':      // Vim
      moveDown();
      break;
    // Hotkeys
    case '1': case '2': case '3':
      selectByNumber(parseInt(key));
      break;
    // Confirm
    case 'return':
    case 'space':
      confirm();
      break;
    // Cancel
    case 'escape':
    case 'q':
      goBack();
      break;
  }
}
```

---

## Visual Design & ASCII Art

### Title Screen Anatomy

Based on research from [Cogmind's ASCII Title Screen](https://www.gridsagegames.com/blog/2014/11/anatomy-ascii-title-screen/):

**Design Philosophy:**
- Maximum immersion wherever possible
- Avoid game-y interface elements that break immersion
- Use animated transitions to make "non-game-world space" less jarring

```
╔══════════════════════════════════════════════════════════╗
║                                                          ║
║      ████████╗██╗  ██╗███████╗                          ║
║      ╚══██╔══╝██║  ██║██╔════╝                          ║
║         ██║   ███████║█████╗                            ║
║         ██║   ██╔══██║██╔══╝                            ║
║         ██║   ██║  ██║███████╗                          ║
║         ╚═╝   ╚═╝  ╚═╝╚══════╝                          ║
║                                                          ║
║               BEGGARS SECT                               ║
║                                                          ║
║           ═══════════════════                            ║
║           │  > New Game    │                            ║
║           │    Continue    │                            ║
║           │    Options     │                            ║
║           │    Quit        │                            ║
║           ═══════════════════                            ║
║                                                          ║
║        Press Enter to select, Arrows to navigate         ║
╚══════════════════════════════════════════════════════════╝
```

### Menu Box Styles

```
Simple:                    Double Border:              Rounded:
┌─────────────┐           ╔═════════════╗             ╭─────────────╮
│  Option 1   │           ║  Option 1   ║             │  Option 1   │
│  Option 2   │           ║  Option 2   ║             │  Option 2   │
└─────────────┘           ╚═════════════╝             ╰─────────────╯

Heavy:                     ASCII Only:                 Minimal:
┏━━━━━━━━━━━━━┓           +-------------+
┃  Option 1   ┃           |  Option 1   |             > Option 1
┃  Option 2   ┃           |  Option 2   |               Option 2
┗━━━━━━━━━━━━━┛           +-------------+
```

### Selection Indicators

```
Arrow:          Bracket:        Highlight:       Checkbox:
> Option 1      [ Option 1 ]    ████ Option 1    [x] Option 1
  Option 2        Option 2           Option 2    [ ] Option 2

Star:           Cursor:         Underline:
* Option 1      █ Option 1      Option 1
  Option 2        Option 2      ────────
                                Option 2
```

### Color Schemes for Menus

| Element | Recommended Color | Purpose |
|---------|-------------------|---------|
| Normal option | White/Default | Standard state |
| Selected option | Cyan/Green + Bold | Current selection |
| Disabled option | Gray/Dim | Unavailable |
| Dangerous action | Red | Warning (Quit, Delete) |
| Important action | Yellow | Key story choices |
| Hotkey letter | Cyan/Underline | Quick access hint |

### Tools for ASCII Art

- **figlet** - ASCII art text banners
- **boxes** - Draw boxes around text
- **toilet** - Color ASCII art text

```bash
# Generate ASCII title
npx figlet "MENU"

# Output:
#  __  __ _____ _   _ _   _
# |  \/  | ____| \ | | | | |
# | |\/| |  _| |  \| | | | |
# | |  | | |___| |\  | |_| |
# |_|  |_|_____|_| \_|\___/
```

---

## Framework-Specific Implementation

### Ink (React for CLI)

Based on [Ink GitHub](https://github.com/vadimdemedes/ink) and [Ink UI](https://github.com/vadimdemedes/ink-ui):

**Key Components:**
- `<Box>` - Flexbox layout container
- `<Text>` - Styled text
- `useInput()` - Handle keyboard input
- `useFocus()` - Focus management

```typescript
import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';

interface MenuItem {
  label: string;
  value: string;
  disabled?: boolean;
}

function Menu({ items, onSelect }: { items: MenuItem[], onSelect: (value: string) => void }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useInput((input, key) => {
    if (key.upArrow || input === 'k') {
      setSelectedIndex(prev => Math.max(0, prev - 1));
    }
    if (key.downArrow || input === 'j') {
      setSelectedIndex(prev => Math.min(items.length - 1, prev + 1));
    }
    if (key.return) {
      const item = items[selectedIndex];
      if (!item.disabled) {
        onSelect(item.value);
      }
    }
  });

  return (
    <Box flexDirection="column">
      {items.map((item, index) => (
        <Text
          key={item.value}
          color={item.disabled ? 'gray' : index === selectedIndex ? 'cyan' : 'white'}
          bold={index === selectedIndex}
          dimColor={item.disabled}
        >
          {index === selectedIndex ? '> ' : '  '}
          {item.label}
        </Text>
      ))}
    </Box>
  );
}
```

**Focus Management:**

```typescript
import { useFocus } from 'ink';

function FocusableMenu() {
  const { isFocused } = useFocus();

  // Only handle input when focused
  useInput((input, key) => {
    if (!isFocused) return;
    // ... handle input
  });
}
```

**SideBar Navigation (from tutorials):**

```typescript
// Navigation menu based on given items
function SideBar({ items, onSelect }) {
  return (
    <Box flexDirection="column" borderStyle="single" paddingX={1}>
      {items.map((item, index) => (
        <MenuItem
          key={item.id}
          item={item}
          isSelected={index === selectedIndex}
          onSelect={() => onSelect(item)}
        />
      ))}
    </Box>
  );
}
```

### ink-select-input

Pre-built selection component:

```typescript
import SelectInput from 'ink-select-input';

const items = [
  { label: 'Attack', value: 'attack' },
  { label: 'Defend', value: 'defend' },
  { label: 'Flee', value: 'flee' },
];

function CombatMenu() {
  const handleSelect = (item) => {
    console.log(`Selected: ${item.value}`);
  };

  return <SelectInput items={items} onSelect={handleSelect} />;
}
```

### Inquirer.js

Based on [Inquirer.js GitHub](https://github.com/SBoudrias/Inquirer.js):

**List/Select Prompt:**

```typescript
import { select } from '@inquirer/prompts';

const answer = await select({
  message: 'Choose your action',
  choices: [
    { name: 'Attack', value: 'attack' },
    { name: 'Defend', value: 'defend' },
    { name: 'Use Technique', value: 'technique' },
    new Separator(),  // Visual divider
    { name: 'Flee', value: 'flee' },
  ],
});
```

**Checkbox (Multi-select):**

```typescript
import { checkbox } from '@inquirer/prompts';

const answers = await checkbox({
  message: 'Select techniques to practice',
  choices: [
    { name: 'Flowing Palm', value: 'flowing_palm' },
    { name: 'Iron Skin', value: 'iron_skin', disabled: 'Not yet learned' },
    { name: 'Wind Step', value: 'wind_step' },
  ],
});
```

### Enquirer

Alternative to Inquirer with modern features:

```typescript
import { Select } from 'enquirer';

const prompt = new Select({
  name: 'action',
  message: 'What do you want to do?',
  choices: ['Attack', 'Defend', 'Technique', 'Item', 'Flee'],
});

const answer = await prompt.run();
```

---

## Accessibility

Based on research from [GitHub's Accessible CLI](https://github.blog/engineering/user-experience/building-a-more-accessible-github-cli/) and [ACM Research on CLI Accessibility](https://dl.acm.org/doi/fullHtml/10.1145/3411764.3445544):

### Screen Reader Considerations

**Challenges:**
- Non-alphanumeric visual cues confuse speech synthesis
- Constant screen redraws are tricky to interpret as speech
- Unstructured text means linear parsing (inefficient)

**Solutions:**

1. **Align to ANSI 4-bit colors:**
   - Users can completely customize their terminal's 16-color palette
   - Ensures readability across preferences

2. **Provide text alternatives:**
   ```
   // Visual: ████████░░
   // Screen reader: "Health: 80 percent"

   // Visual: ★★★☆☆
   // Screen reader: "Rating: 3 out of 5 stars"
   ```

3. **Avoid relying solely on color:**
   ```
   // Bad: Red text = error, Green text = success
   // Good: [ERROR] message, [OK] message + color
   ```

4. **Support keyboard-only navigation:**
   - Never require mouse interaction
   - Provide hotkey alternatives to arrow navigation

### Colorblind Accessibility

**Color Palette Recommendations:**

```
Instead of Red/Green:
- Use Red/Blue
- Use Orange/Cyan
- Add patterns or symbols alongside colors

Status Indicators:
- Success: Green + [OK] or checkmark
- Error: Red + [X] or [ERROR]
- Warning: Yellow + [!] or [WARN]
```

**Terminal Color Configuration:**
- Most terminals allow custom color schemes
- Recommend high-contrast themes
- Document how users can adjust colors

### Low Vision Support

1. **High contrast options:**
   - Bold text for important elements
   - Clear visual separation between sections

2. **Configurable text:**
   - Support terminal font size (inherits from terminal)
   - Avoid fixed-width assumptions that break at large sizes

3. **Clear spacing:**
   ```
   // Cramped (hard to read):
   [Attack][Defend][Technique][Item]

   // Clear spacing:
   [Attack]   [Defend]   [Technique]   [Item]
   ```

### Recommended Practices

| Feature | Implementation |
|---------|----------------|
| Color independence | Always pair color with text/symbol |
| Keyboard navigation | Support multiple schemes (arrows, vim, hotkeys) |
| Screen reader mode | Option to disable animations/redraws |
| Focus indicators | Clear visual showing current selection |
| Error messages | Descriptive text, not just red color |
| Progress feedback | Text updates, not just spinners |

---

## Roguelike Menu Patterns

Classic roguelikes have evolved sophisticated menu systems over decades.

### NetHack Style

**Single-letter commands:**
```
Commands:
e - eat      w - wield    d - drop     i - inventory
r - read     q - quaff    z - zap      t - throw
```

**Inventory as Menu:**
```
Inventory:
a) +1 sword (weapon in hand)
b) leather armor (being worn)
c) 3 food rations
d) potion of healing

What do you want to use? [abcd or ?*]
```

### Dwarf Fortress Style

**Nested context menus:**
```
d: Designations >
  d: Mine
  h: Channel
  u: Upward stairway
  j: Downward stairway
  ...
```

**Key Characteristics:**
- Deep hierarchical menus
- Mode-based interface
- Context-sensitive options
- Dense information display

### Angband Style

**Structured sub-menus:**
```
[Angband Main Menu]
a) New game
b) Open saved game
c) Character dump
d) Options
e) Quit
```

**Status Bars:**
```
HP: 45/100  MP: 20/50  AC: 15  Depth: 500ft
```

### Common Roguelike Patterns

1. **Modal Interfaces:**
   - Movement mode (arrow keys move character)
   - Command mode (keys trigger actions)
   - Menu mode (keys select options)

2. **Single-Key Shortcuts:**
   - Most actions bound to memorable single letters
   - Shift+letter for related but different action
   - Example: `g` = get, `G` = get all

3. **Context-Sensitive Options:**
   ```
   // Standing on item:
   g) Get [sword]

   // No item present:
   (nothing to pick up)
   ```

4. **Message Log:**
   ```
   You hit the goblin. (3 damage)
   The goblin misses you.
   You kill the goblin!

   --MORE-- (Space to continue)
   ```

5. **Look/Examine Mode:**
   ```
   Press 'l' to look around
   Use arrow keys to move cursor
   [Cursor on enemy]
   Goblin warrior - HP: ???
   Wielding: rusty sword
   ```

---

## Interactive Prompts

### Progress Displays

Based on [Evil Martians CLI UX Best Practices](https://evilmartians.com/chronicles/cli-ux-best-practices-3-patterns-for-improving-progress-displays):

**Three Main Patterns:**

1. **Spinner** - For indeterminate progress
   ```
   ⠋ Loading game data...
   ⠙ Loading game data...
   ⠹ Loading game data...
   ```

2. **X of Y** - For countable progress
   ```
   Loading assets... 3/10
   Loading assets... 4/10
   ```

3. **Progress Bar** - For percentage progress
   ```
   Loading: [████████░░░░░░░░] 50%
   ```

**Key Principle:** Never leave users staring at a blinking cursor. Always show meaningful status updates.

### Confirmation Prompts

```typescript
// Simple yes/no
const confirmed = await confirm({
  message: 'Are you sure you want to quit?',
  default: false,  // 'n' is default
});

// Dangerous action - require typing
const reallyConfirmed = await input({
  message: 'Type "DELETE" to confirm:',
  validate: (input) => input === 'DELETE' || 'Must type DELETE exactly',
});
```

### Form-style Input

```typescript
// Multiple inputs in sequence
const character = await prompt([
  {
    type: 'input',
    name: 'name',
    message: 'Enter your character name:',
  },
  {
    type: 'select',
    name: 'class',
    message: 'Choose your path:',
    choices: ['Blade', 'Stream', 'Shadow'],
  },
]);
```

---

## Best Practices

### Menu Design Checklist

- [ ] Clear visual indication of current selection
- [ ] Instructions visible (how to navigate, how to select)
- [ ] Escape/back option always available
- [ ] Disabled items clearly indicated
- [ ] Hotkeys for frequent actions
- [ ] Consistent navigation across all menus
- [ ] Color used meaningfully, not just decoratively
- [ ] Accessible without relying on color alone

### Common Mistakes to Avoid

1. **Hidden Exit:**
   ```
   // Bad: No visible way to go back
   > Option 1
     Option 2
     Option 3

   // Good: Explicit exit option
   > Option 1
     Option 2
     Option 3
     [Back]
   ```

2. **Unclear Selection:**
   ```
   // Bad: Which is selected?
   Option 1
   Option 2
   Option 3

   // Good: Clear indicator
   > Option 1 <
     Option 2
     Option 3
   ```

3. **Too Many Options:**
   ```
   // Bad: Wall of options
   1. Attack  2. Defend  3. Magic  4. Item  5. Run  6. Status  7. Equipment  8. Save  9. Options

   // Good: Categorized
   Combat: [Attack] [Defend] [Magic]
   System: [Menu]
   ```

4. **No Feedback:**
   ```
   // Bad: Selection happens, nothing shown
   // Good: "You selected Attack. Choose target..."
   ```

5. **Inconsistent Controls:**
   ```
   // Bad: Different keys in different menus
   // Main menu: arrows + enter
   // Combat: numbers only
   // Shop: mouse only

   // Good: Same controls everywhere
   ```

### Performance Considerations

1. **Minimize redraws:**
   - Only update changed portions of screen
   - Use Ink's `<Static>` for unchanging content

2. **Efficient key handling:**
   - Debounce rapid key presses
   - Don't block on every keystroke

3. **Lazy loading:**
   - Don't load all menu content upfront
   - Load sub-menus when accessed

---

## Resources & References

### Design Guidelines
- [Command Line Interface Guidelines](https://clig.dev/) - Comprehensive CLI design philosophy
- [Atlassian's 10 Design Principles for CLIs](https://www.atlassian.com/blog/it-teams/10-design-principles-for-delightful-clis) - Modern CLI principles
- [Unix Interface Design Patterns](http://www.catb.org/~esr/writings/taoup/html/ch11s06.html) - Classic patterns including roguelike

### Framework Documentation
- [Ink GitHub](https://github.com/vadimdemedes/ink) - React for CLI
- [Ink UI Components](https://github.com/vadimdemedes/ink-ui) - Pre-built Ink components
- [Inquirer.js](https://github.com/SBoudrias/Inquirer.js) - Interactive prompts
- [Enquirer](https://github.com/enquirer/enquirer) - Modern prompts

### Accessibility
- [Building a More Accessible GitHub CLI](https://github.blog/engineering/user-experience/building-a-more-accessible-github-cli/)
- [ACM: Accessibility of Command Line Interfaces](https://dl.acm.org/doi/fullHtml/10.1145/3411764.3445544)
- [The State of Linux CLI Accessibility](https://blindcomputing.org/linux/state-of-cli-accessibility/)

### Game-Specific
- [Cogmind ASCII Title Screen Anatomy](https://www.gridsagegames.com/blog/2014/11/anatomy-ascii-title-screen/)
- [VIM Adventures](https://vim-adventures.com/) - Learn vim navigation through gaming
- [vim-keybindings-everywhere](https://github.com/erikw/vim-keybindings-everywhere-the-ultimate-list)

### Tutorials
- [DigitalOcean: Interactive CLI Prompts with Inquirer.js](https://www.digitalocean.com/community/tutorials/nodejs-interactive-command-line-prompts)
- [LogRocket: Using Ink UI with React](https://blog.logrocket.com/using-ink-ui-react-build-interactive-custom-clis/)
- [Medium: Terminal App with Ink + React + TypeScript](https://medium.com/@pixelreverb/creating-a-terminal-application-with-ink-react-typescript-an-introduction-da49f3c012a8)

---

## Changelog

| Date | Changes |
|------|---------|
| 2025-12-06 | Initial research compilation |

---

**This document serves as a comprehensive reference for CLI game menu design. Update as new patterns and techniques are discovered.**
