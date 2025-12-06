# Terminal Styling Libraries

**Libraries:** Chalk, Figlet, Boxen, cli-spinners
**Purpose:** Colors, ASCII art, boxes, and animations for CLI

---

## Chalk - Terminal Colors

**Version Used:** 5.3.0
**Documentation:** https://github.com/chalk/chalk

### Overview

Chalk styles terminal output with colors and formatting. It has zero dependencies and is used by 100K+ packages.

### Important: Chalk 5 is ESM-Only

Chalk 5+ uses ES Modules. For CommonJS/TypeScript projects, use Chalk 4:

```bash
# ESM projects (import syntax)
npm install chalk

# CommonJS projects (require syntax)
npm install chalk@4
```

### Basic Usage

```javascript
// ESM (Chalk 5)
import chalk from 'chalk';

// CommonJS (Chalk 4)
const chalk = require('chalk');

console.log(chalk.blue('Hello world!'));
console.log(chalk.red('Error!'));
console.log(chalk.green('Success!'));
```

### Chaining Styles

```javascript
// Chain multiple styles
console.log(chalk.red.bold('Bold red'));
console.log(chalk.blue.underline('Underlined blue'));
console.log(chalk.yellow.bgBlack('Yellow on black'));

// Order doesn't matter for conflicts (last wins)
console.log(chalk.red.yellow.green('This is green'));
```

### Available Styles

**Modifiers:**
- `bold` - Bold text
- `dim` - Dimmed text
- `italic` - Italic (not widely supported)
- `underline` - Underlined text
- `inverse` - Swap foreground/background
- `hidden` - Hidden text
- `strikethrough` - Strikethrough text
- `visible` - Only visible when chalk is enabled

**Colors:**
- `black`, `red`, `green`, `yellow`, `blue`, `magenta`, `cyan`, `white`, `gray`/`grey`
- Bright variants: `blackBright`, `redBright`, `greenBright`, etc.

**Background Colors:**
- `bgBlack`, `bgRed`, `bgGreen`, `bgYellow`, `bgBlue`, `bgMagenta`, `bgCyan`, `bgWhite`
- Bright variants: `bgBlackBright`, `bgRedBright`, etc.

### RGB and Hex Colors

```javascript
// RGB colors
console.log(chalk.rgb(255, 136, 0)('Orange'));
console.log(chalk.bgRgb(15, 100, 204)('Blue background'));

// Hex colors
console.log(chalk.hex('#FF8800')('Orange'));
console.log(chalk.bgHex('#DEADED')('Custom background'));
```

### Combining with Strings

```javascript
// Template literals
console.log(`
  CPU: ${chalk.red('90%')}
  RAM: ${chalk.green('40%')}
  DISK: ${chalk.yellow('70%')}
`);

// Nested styles
console.log(chalk.red('Red', chalk.bold.underline('bold underline'), 'red again'));
```

### Example: Combat Log

```javascript
function logCombatMessage(type, message) {
  switch (type) {
    case 'damage':
      console.log(chalk.red(`💥 ${message}`));
      break;
    case 'heal':
      console.log(chalk.green(`💚 ${message}`));
      break;
    case 'miss':
      console.log(chalk.gray(`💨 ${message}`));
      break;
    case 'critical':
      console.log(chalk.yellow.bold(`⚡ CRITICAL! ${message}`));
      break;
  }
}
```

---

## Figlet - ASCII Art Text

**Version Used:** 1.7.0
**Documentation:** https://github.com/patorjk/figlet.js

### Overview

Figlet converts text into ASCII art using FIGfonts. Great for title screens and dramatic headers.

### Installation

```bash
npm install figlet
npm install --save-dev @types/figlet  # TypeScript types
```

### Basic Usage

```javascript
import figlet from 'figlet';

// Callback style
figlet('Hello!', (err, data) => {
  if (err) {
    console.log('Error:', err);
    return;
  }
  console.log(data);
});

// Async/Await
const text = await figlet.text('Hello!');
console.log(text);

// Synchronous
const text = figlet.textSync('Hello!');
console.log(text);
```

### Output Example

```
  _   _      _ _       _
 | | | | ___| | | ___ | |
 | |_| |/ _ \ | |/ _ \| |
 |  _  |  __/ | | (_) |_|
 |_| |_|\___|_|_|\___/(_)
```

### Font Options

```javascript
figlet.text('Beggars Sect', {
  font: 'Standard',      // Font name
  horizontalLayout: 'default',
  verticalLayout: 'default',
  width: 80,
  whitespaceBreak: true
}, callback);
```

**Layout Options:**
- `default` - Font designer's intention
- `full` - Full letter spacing
- `fitted` - Letters almost touch
- `controlled smushing` - Controlled overlap
- `universal smushing` - Maximum compression

### Popular Fonts

| Font | Style |
|------|-------|
| `Standard` | Default, clean |
| `Big` | Large block letters |
| `Slant` | Italicized |
| `Small` | Compact |
| `Banner` | Wide banner style |
| `Ghost` | Spooky |
| `Doom` | Bold, game-like |
| `Ivrit` | Hebrew-style |

### List Available Fonts

```javascript
figlet.fonts((err, fonts) => {
  console.log(fonts); // Array of ~250+ font names
});

// Synchronous
const fonts = figlet.fontsSync();
```

### Example: Game Title Screen

```javascript
import figlet from 'figlet';
import chalk from 'chalk';

function renderTitle() {
  const title = figlet.textSync('BEGGARS\nSECT', {
    font: 'Doom',
    horizontalLayout: 'default'
  });

  console.log(chalk.yellow(title));
  console.log(chalk.gray('A Martial Arts Haven Story'));
  console.log();
}
```

### Using in Ink/React

```tsx
import React, { useState, useEffect } from 'react';
import { Text, Box } from 'ink';
import figlet from 'figlet';

function TitleScreen() {
  const [titleArt, setTitleArt] = useState('');

  useEffect(() => {
    figlet.text('BEGGARS SECT', { font: 'Doom' }, (err, data) => {
      if (!err && data) {
        setTitleArt(data);
      }
    });
  }, []);

  return (
    <Box flexDirection="column" alignItems="center">
      <Text color="yellow">{titleArt}</Text>
      <Text dimColor>Press ENTER to start</Text>
    </Box>
  );
}
```

---

## Boxen - Terminal Boxes

**Version Used:** 7.1.1
**Documentation:** https://github.com/sindresorhus/boxen

### Overview

Boxen draws styled boxes around text in the terminal. Useful for highlighting important information.

### Important: Boxen 6+ is ESM-Only

```bash
# ESM projects
npm install boxen

# CommonJS projects
npm install boxen@5
```

### Basic Usage

```javascript
import boxen from 'boxen';

console.log(boxen('Hello World', { padding: 1 }));
```

Output:
```
┌─────────────────┐
│                 │
│   Hello World   │
│                 │
└─────────────────┘
```

### Options

```javascript
boxen('Content', {
  padding: 1,           // Padding inside box
  margin: 1,            // Margin outside box
  borderStyle: 'round', // Border style
  borderColor: 'green', // Border color
  backgroundColor: 'black',
  title: 'Title',       // Box title
  titleAlignment: 'center',
  dimBorder: false,     // Dim the border
  float: 'center',      // Box position
  width: 50             // Fixed width
});
```

### Border Styles

| Style | Appearance |
|-------|------------|
| `single` | `┌──┐` |
| `double` | `╔══╗` |
| `round` | `╭──╮` |
| `bold` | Thick lines |
| `singleDouble` | Mixed |
| `doubleSingle` | Mixed |
| `classic` | `+--+` |
| `arrow` | Arrows |

### Padding/Margin Options

```javascript
// Single value (all sides)
{ padding: 1 }

// Object (individual sides)
{
  padding: {
    top: 0,
    right: 2,
    bottom: 0,
    left: 2
  }
}
```

### Example: Status Box

```javascript
import boxen from 'boxen';
import chalk from 'chalk';

function showStatus(player) {
  const content = `
${chalk.bold('LI WEI')} - Level ${player.level}
${'═'.repeat(20)}
HP: ${chalk.red(player.hp)}/${player.maxHp}
Chi: ${chalk.blue(player.chi)}/${player.maxChi}
Gold: ${chalk.yellow(player.gold)}
`;

  console.log(boxen(content, {
    padding: 1,
    borderStyle: 'round',
    borderColor: 'cyan'
  }));
}
```

---

## cli-spinners - Loading Animations

**Version Used:** 2.9.2
**Documentation:** https://github.com/sindresorhus/cli-spinners

### Overview

Collection of spinner animations for loading states.

### Usage

```javascript
import cliSpinners from 'cli-spinners';

// Access spinner by name
const dots = cliSpinners.dots;
// { interval: 80, frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'] }

// Animate
let i = 0;
const spinner = cliSpinners.dots;
const interval = setInterval(() => {
  process.stdout.write(`\r${spinner.frames[i]} Loading...`);
  i = (i + 1) % spinner.frames.length;
}, spinner.interval);

// Stop
clearInterval(interval);
process.stdout.write('\r✓ Done!     \n');
```

### Popular Spinners

| Name | Preview |
|------|---------|
| `dots` | ⠋ ⠙ ⠹ ⠸ ⠼ ⠴ ⠦ ⠧ ⠇ ⠏ |
| `line` | - \ \| / |
| `star` | ✶ ✸ ✹ ✺ ✹ ✷ |
| `hamburger` | ☱ ☲ ☴ |
| `growVertical` | ▁ ▃ ▄ ▅ ▆ ▇ █ |
| `bouncingBar` | [    ] [=   ] [==  ] ... |
| `clock` | 🕐 🕑 🕒 🕓 ... |

### Using with Ink

```tsx
import React, { useState, useEffect } from 'react';
import { Text } from 'ink';
import cliSpinners from 'cli-spinners';

function Spinner({ type = 'dots' }: { type?: string }) {
  const [frame, setFrame] = useState(0);
  const spinner = cliSpinners[type];

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame(f => (f + 1) % spinner.frames.length);
    }, spinner.interval);
    return () => clearInterval(interval);
  }, [spinner]);

  return <Text color="cyan">{spinner.frames[frame]}</Text>;
}

// Usage
<Spinner type="dots" />
```

---

## Combining Libraries

### Fancy Combat Message

```javascript
import chalk from 'chalk';
import boxen from 'boxen';

function showDamage(attacker, target, damage, isCritical) {
  const header = isCritical
    ? chalk.yellow.bold('⚡ CRITICAL HIT!')
    : chalk.red('💥 Attack!');

  const content = `
${header}
${chalk.white(attacker)} strikes ${chalk.white(target)}
Damage: ${chalk.red.bold(damage)}
`;

  console.log(boxen(content, {
    padding: 1,
    borderStyle: isCritical ? 'double' : 'single',
    borderColor: isCritical ? 'yellow' : 'red'
  }));
}
```

### Styled Title with Subtitle

```javascript
import figlet from 'figlet';
import chalk from 'chalk';
import boxen from 'boxen';

function showTitle() {
  const title = figlet.textSync('BEGGARS\nSECT', { font: 'Doom' });

  const content = `
${chalk.yellow(title)}

${chalk.gray('A Martial Arts Haven Story')}
${chalk.dim('Version 0.2.0')}
`;

  console.log(boxen(content, {
    padding: 1,
    borderStyle: 'round',
    borderColor: 'yellow',
    float: 'center'
  }));
}
```

---

## Note on Ink Integration

When using Ink, you often don't need these libraries directly because Ink's `<Text>` component handles colors and `<Box>` handles borders. However, they're useful for:

1. **Figlet** - ASCII art titles (not built into Ink)
2. **Chalk** - Complex string coloring before passing to `<Text>`
3. **Boxen** - One-off console.log outputs outside Ink render

For Ink-native styling:

```tsx
// Instead of chalk
<Text color="red" bold>Error!</Text>

// Instead of boxen
<Box borderStyle="round" borderColor="cyan" padding={1}>
  <Text>Content</Text>
</Box>
```

---

## Resources

- **Chalk:** https://github.com/chalk/chalk
- **Figlet:** https://github.com/patorjk/figlet.js
- **Figlet Font Preview:** http://patorjk.com/software/taag/
- **Boxen:** https://github.com/sindresorhus/boxen
- **cli-spinners:** https://github.com/sindresorhus/cli-spinners

---

**Last Updated:** 2025-12-06
