# Ink - React for CLI Applications

**Version Used:** 3.2.0
**Purpose:** Terminal UI framework using React components
**Documentation:** https://github.com/vadimdemedes/ink

---

## Overview

Ink is a React renderer that lets you build CLI applications using React components. Instead of rendering to the browser DOM, Ink renders to the terminal. If you know React, you already know Ink.

### Why Ink?

- **React Mental Model:** Use familiar component-based architecture
- **Flexbox Layouts:** Yoga engine provides CSS-like flexbox in terminal
- **State Management:** useState, useEffect, and all React hooks work
- **Hot Reloading:** Development mode watches for changes
- **Testing:** Jest-compatible for unit testing CLI output

### Who Uses Ink?

- Claude Code (Anthropic)
- Gemini CLI (Google)
- GitHub Copilot CLI
- Cloudflare Wrangler
- Prisma CLI
- Gatsby CLI

---

## Installation

```bash
npm install ink react
npm install --save-dev @types/react  # For TypeScript
```

### Create New Project

```bash
npx create-ink-app my-cli --typescript
```

---

## Built-in Components

### Text

The fundamental component for rendering text. **All text must be wrapped in `<Text>`**.

```tsx
import { Text } from 'ink';

// Basic text
<Text>Hello, World!</Text>

// Styled text
<Text color="green" bold>Success!</Text>
<Text color="red" underline>Error!</Text>
<Text dimColor>Muted text</Text>
```

#### Text Props

| Prop | Type | Description |
|------|------|-------------|
| `color` | string | Text color: "green", "#00ff00", "rgb(0,255,0)" |
| `backgroundColor` | string | Background color (same formats) |
| `bold` | boolean | Bold text |
| `italic` | boolean | Italic text |
| `underline` | boolean | Underlined text |
| `strikethrough` | boolean | Strikethrough text |
| `inverse` | boolean | Swap foreground/background |
| `dimColor` | boolean | Reduced brightness |
| `wrap` | string | "wrap", "truncate", "truncate-start", "truncate-middle", "truncate-end" |

#### Color Values

```tsx
// Named colors
<Text color="red">Named</Text>
<Text color="greenBright">Bright variant</Text>

// Hex colors
<Text color="#ff6b6b">Hex color</Text>

// RGB colors
<Text color="rgb(255, 107, 107)">RGB color</Text>
```

**Available named colors:** black, red, green, yellow, blue, magenta, cyan, white, gray/grey, plus "Bright" variants (redBright, etc.)

---

### Box

The layout container. Every `<Box>` is a flexbox container by default.

```tsx
import { Box, Text } from 'ink';

// Basic box
<Box>
  <Text>Item 1</Text>
  <Text>Item 2</Text>
</Box>

// Column layout
<Box flexDirection="column">
  <Text>Row 1</Text>
  <Text>Row 2</Text>
</Box>

// With border
<Box borderStyle="round" borderColor="cyan" padding={1}>
  <Text>Boxed content</Text>
</Box>
```

#### Box Props - Dimensions

| Prop | Type | Description |
|------|------|-------------|
| `width` | number \| string | Width in characters or percentage |
| `height` | number \| string | Height in lines or percentage |
| `minWidth` | number | Minimum width |
| `minHeight` | number | Minimum height |

```tsx
<Box width={50} height={10}>Fixed size</Box>
<Box width="50%">Half width</Box>
```

#### Box Props - Flexbox

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `flexDirection` | string | "row" | "row" or "column" |
| `flexGrow` | number | 0 | Grow factor |
| `flexShrink` | number | 1 | Shrink factor |
| `flexBasis` | number \| string | - | Base size |
| `alignItems` | string | "stretch" | Cross-axis alignment |
| `alignSelf` | string | - | Individual cross-axis alignment |
| `justifyContent` | string | "flex-start" | Main-axis alignment |
| `gap` | number | 0 | Space between items |

**alignItems/alignSelf values:** "flex-start", "center", "flex-end", "stretch"
**justifyContent values:** "flex-start", "center", "flex-end", "space-between", "space-around", "space-evenly"

```tsx
// Centered content
<Box justifyContent="center" alignItems="center" height={10}>
  <Text>Centered!</Text>
</Box>

// Space between items
<Box justifyContent="space-between" width={50}>
  <Text>Left</Text>
  <Text>Right</Text>
</Box>

// Column with gap
<Box flexDirection="column" gap={1}>
  <Text>Item 1</Text>
  <Text>Item 2</Text>
  <Text>Item 3</Text>
</Box>
```

#### Box Props - Spacing

| Prop | Type | Description |
|------|------|-------------|
| `padding` | number | All sides padding |
| `paddingX` | number | Horizontal padding |
| `paddingY` | number | Vertical padding |
| `paddingTop/Right/Bottom/Left` | number | Individual padding |
| `margin` | number | All sides margin |
| `marginX` | number | Horizontal margin |
| `marginY` | number | Vertical margin |
| `marginTop/Right/Bottom/Left` | number | Individual margin |

```tsx
<Box padding={2} margin={1}>
  <Text>Padded and margined</Text>
</Box>
```

#### Box Props - Border

| Prop | Type | Description |
|------|------|-------------|
| `borderStyle` | string | Border style |
| `borderColor` | string | Border color |
| `borderTop/Right/Bottom/Left` | boolean | Individual borders |

**Border styles:** "single", "double", "round", "bold", "singleDouble", "doubleSingle", "classic"

```tsx
<Box borderStyle="round" borderColor="green" padding={1}>
  <Text>Rounded green border</Text>
</Box>

<Box borderStyle="double" borderColor="yellow">
  <Text>Double yellow border</Text>
</Box>
```

---

### Newline

Renders a newline character.

```tsx
import { Newline, Text } from 'ink';

<Text>
  Line 1
  <Newline />
  Line 2
</Text>
```

---

### Spacer

Flexible space that expands to fill available space.

```tsx
import { Box, Text, Spacer } from 'ink';

<Box width={50}>
  <Text>Left</Text>
  <Spacer />
  <Text>Right</Text>
</Box>
```

---

### Static

Renders content once without re-rendering. Use for logs or output that shouldn't change.

```tsx
import { Static, Box, Text } from 'ink';

function App() {
  const [logs, setLogs] = useState<string[]>([]);

  return (
    <>
      <Static items={logs}>
        {(log, index) => (
          <Text key={index}>{log}</Text>
        )}
      </Static>
      <Box>
        <Text>Current status...</Text>
      </Box>
    </>
  );
}
```

---

### Transform

Transforms all text content within.

```tsx
import { Transform, Text } from 'ink';

<Transform transform={(output) => output.toUpperCase()}>
  <Text>this becomes uppercase</Text>
</Transform>
```

---

## Hooks

### useInput

Capture keyboard input.

```tsx
import { useInput } from 'ink';

function App() {
  useInput((input, key) => {
    // input: the character pressed
    // key: object with special key info

    if (input === 'q') {
      // Quit
    }

    if (key.upArrow) {
      // Navigate up
    }

    if (key.return) {
      // Enter pressed
    }
  });

  return <Text>Press q to quit</Text>;
}
```

#### Key Object Properties

| Property | Type | Description |
|----------|------|-------------|
| `upArrow` | boolean | Up arrow pressed |
| `downArrow` | boolean | Down arrow pressed |
| `leftArrow` | boolean | Left arrow pressed |
| `rightArrow` | boolean | Right arrow pressed |
| `return` | boolean | Enter/Return pressed |
| `escape` | boolean | Escape pressed |
| `ctrl` | boolean | Ctrl held |
| `shift` | boolean | Shift held |
| `meta` | boolean | Meta/Cmd held |
| `tab` | boolean | Tab pressed |
| `backspace` | boolean | Backspace pressed |
| `delete` | boolean | Delete pressed |

```tsx
useInput((input, key) => {
  if (key.upArrow || input === 'k') {
    moveUp();
  }
  if (key.downArrow || input === 'j') {
    moveDown();
  }
  if (key.return) {
    select();
  }
  if (key.escape || input === 'q') {
    exit();
  }
});
```

### useInput Options

```tsx
// Only listen when focused
useInput(handler, { isActive: isFocused });
```

---

### useApp

Access the Ink application instance.

```tsx
import { useApp } from 'ink';

function App() {
  const { exit } = useApp();

  useInput((input) => {
    if (input === 'q') {
      exit(); // Exit the application
    }
  });

  return <Text>Press q to quit</Text>;
}
```

#### useApp Methods

| Method | Description |
|--------|-------------|
| `exit(error?)` | Exit the application, optionally with error |

---

### useFocus

Manage focus state for a component.

```tsx
import { useFocus, Box, Text } from 'ink';

function FocusableItem({ label }: { label: string }) {
  const { isFocused } = useFocus();

  return (
    <Box>
      <Text color={isFocused ? 'green' : undefined}>
        {isFocused ? '>' : ' '} {label}
      </Text>
    </Box>
  );
}
```

#### useFocus Options

```tsx
const { isFocused } = useFocus({
  autoFocus: true,  // Focus on mount
  isActive: true,   // Whether focusable
  id: 'my-item'     // Unique identifier
});
```

---

### useFocusManager

Programmatically manage focus across components.

```tsx
import { useFocusManager } from 'ink';

function App() {
  const { focusNext, focusPrevious, focus } = useFocusManager();

  useInput((input, key) => {
    if (key.tab) {
      if (key.shift) {
        focusPrevious();
      } else {
        focusNext();
      }
    }
  });

  return (
    <Box flexDirection="column">
      <FocusableItem label="Item 1" />
      <FocusableItem label="Item 2" />
      <FocusableItem label="Item 3" />
    </Box>
  );
}
```

---

### useStdin / useStdout / useStderr

Access standard streams.

```tsx
import { useStdout } from 'ink';

function App() {
  const { stdout } = useStdout();

  // stdout.columns - terminal width
  // stdout.rows - terminal height

  return <Text>Terminal: {stdout.columns}x{stdout.rows}</Text>;
}
```

---

## Common Patterns

### Screen Management

```tsx
type Screen = 'menu' | 'game' | 'settings';

function App() {
  const [screen, setScreen] = useState<Screen>('menu');

  switch (screen) {
    case 'menu':
      return <MenuScreen onNavigate={setScreen} />;
    case 'game':
      return <GameScreen onBack={() => setScreen('menu')} />;
    case 'settings':
      return <SettingsScreen onBack={() => setScreen('menu')} />;
  }
}
```

### Loading State

```tsx
function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData().then(() => setLoading(false));
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return <MainContent />;
}
```

### Menu Selection

```tsx
function Menu() {
  const [selected, setSelected] = useState(0);
  const items = ['New Game', 'Load Game', 'Settings', 'Quit'];

  useInput((input, key) => {
    if (key.upArrow) {
      setSelected(s => Math.max(0, s - 1));
    }
    if (key.downArrow) {
      setSelected(s => Math.min(items.length - 1, s + 1));
    }
    if (key.return) {
      handleSelect(items[selected]);
    }
  });

  return (
    <Box flexDirection="column">
      {items.map((item, i) => (
        <Text key={item} color={i === selected ? 'green' : undefined}>
          {i === selected ? '> ' : '  '}{item}
        </Text>
      ))}
    </Box>
  );
}
```

---

## Project Usage (The Beggars Sect)

### Entry Point (src/index.tsx)

```tsx
import React from 'react';
import { render } from 'ink';
import App from './ui/App.js';

render(<App />);
```

### Component Example (CombatScreen)

```tsx
import React from 'react';
import { Box, Text } from 'ink';

function CombatScreen() {
  return (
    <Box flexDirection="column" padding={1}>
      <Box borderStyle="round" borderColor="red" padding={1}>
        <Text bold>COMBAT</Text>
      </Box>
      <Box marginTop={1}>
        <HealthBar current={80} max={100} />
      </Box>
      <Box marginTop={1}>
        <ActionMenu onSelect={handleAction} />
      </Box>
    </Box>
  );
}
```

---

## Debugging Tips

1. **Console.log works** - Output appears above the Ink render
2. **Use React DevTools** - `react-devtools-core` in devDependencies
3. **Check terminal size** - Some layouts break in small terminals
4. **Test incrementally** - Build UI piece by piece

---

## Common Issues

### "Text string must be rendered inside <Text>"

All text must be wrapped in `<Text>`:

```tsx
// Wrong
<Box>Hello</Box>

// Right
<Box><Text>Hello</Text></Box>
```

### Layout Not Working

Remember Ink uses flexbox. Default is `flexDirection="row"`:

```tsx
// Horizontal (default)
<Box>
  <Text>A</Text>
  <Text>B</Text>
</Box>

// Vertical
<Box flexDirection="column">
  <Text>A</Text>
  <Text>B</Text>
</Box>
```

### Input Not Working

Make sure stdin is enabled and component is focused:

```tsx
// Check if input handler is active
useInput(handler, { isActive: true });
```

---

## Resources

- **GitHub:** https://github.com/vadimdemedes/ink
- **npm:** https://www.npmjs.com/package/ink
- **Examples:** https://github.com/vadimdemedes/ink/tree/master/examples
- **Awesome Ink:** https://github.com/vadimdemedes/awesome-ink

---

**Last Updated:** 2025-12-06
