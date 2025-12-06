# ink-select-input - Menu Selection Component

**Version Used:** 4.0.0
**Purpose:** Interactive selection menu for Ink CLI applications
**Documentation:** https://github.com/vadimdemedes/ink-select-input

---

## Overview

ink-select-input provides a ready-to-use selection menu component for Ink applications. Users can navigate with arrow keys (or j/k) and select with Enter.

---

## Installation

```bash
npm install ink-select-input
```

---

## Basic Usage

```tsx
import React from 'react';
import { render, Box, Text } from 'ink';
import SelectInput from 'ink-select-input';

interface Item {
  label: string;
  value: string;
}

function Menu() {
  const items: Item[] = [
    { label: 'New Game', value: 'new' },
    { label: 'Load Game', value: 'load' },
    { label: 'Settings', value: 'settings' },
    { label: 'Quit', value: 'quit' }
  ];

  const handleSelect = (item: Item) => {
    console.log(`Selected: ${item.value}`);
  };

  return (
    <SelectInput items={items} onSelect={handleSelect} />
  );
}

render(<Menu />);
```

---

## Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `Item[]` | `[]` | Array of items to display |
| `isFocused` | `boolean` | `true` | Whether to listen for input |
| `initialIndex` | `number` | `0` | Initially selected item index |
| `limit` | `number` | - | Max items to show (scrollable) |
| `indicatorComponent` | `Component` | - | Custom selection indicator |
| `itemComponent` | `Component` | - | Custom item renderer |
| `onSelect` | `(item) => void` | - | Called when item is selected |
| `onHighlight` | `(item) => void` | - | Called when item is highlighted |

---

## Item Structure

Each item must have `label` and `value`. Optionally include `key`:

```tsx
interface Item {
  label: string;    // Displayed text
  value: string;    // Value passed to handlers
  key?: string;     // Unique key (defaults to value)
}
```

### Example Items

```tsx
const menuItems = [
  { label: 'Attack', value: 'attack' },
  { label: 'Defend', value: 'defend' },
  { label: 'Use Item', value: 'item' },
  { label: 'Flee', value: 'flee' }
];
```

---

## Navigation

Users can navigate and select using:

| Key | Action |
|-----|--------|
| `↑` / `k` | Move up |
| `↓` / `j` | Move down |
| `Enter` | Select item |
| `1-9` | Select item by number |

---

## Event Handlers

### onSelect

Called when user presses Enter on an item:

```tsx
const handleSelect = (item: Item) => {
  switch (item.value) {
    case 'new':
      startNewGame();
      break;
    case 'load':
      showLoadScreen();
      break;
    case 'quit':
      exit();
      break;
  }
};

<SelectInput items={items} onSelect={handleSelect} />
```

### onHighlight

Called when the highlighted item changes:

```tsx
const [description, setDescription] = useState('');

const handleHighlight = (item: Item) => {
  setDescription(getDescription(item.value));
};

<Box flexDirection="column">
  <SelectInput
    items={items}
    onSelect={handleSelect}
    onHighlight={handleHighlight}
  />
  <Text dimColor>{description}</Text>
</Box>
```

---

## Limiting Visible Items

For long lists, use `limit` to show a scrollable subset:

```tsx
const items = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' },
  { label: 'Item 6', value: '6' },
];

// Only show 3 items at a time, scrolls as user navigates
<SelectInput items={items} limit={3} />
```

---

## Custom Indicator

Replace the default `>` indicator:

```tsx
function CustomIndicator({ isSelected }: { isSelected: boolean }) {
  return (
    <Box marginRight={1}>
      <Text color="cyan">{isSelected ? '→' : ' '}</Text>
    </Box>
  );
}

<SelectInput
  items={items}
  indicatorComponent={CustomIndicator}
/>
```

---

## Custom Item Component

Completely customize how items render:

```tsx
interface ItemProps {
  isSelected: boolean;
  label: string;
}

function CustomItem({ isSelected, label }: ItemProps) {
  return (
    <Text
      color={isSelected ? 'green' : undefined}
      bold={isSelected}
    >
      {label}
    </Text>
  );
}

<SelectInput
  items={items}
  itemComponent={CustomItem}
/>
```

### Full Custom Example

```tsx
function FancyItem({ isSelected, label }: ItemProps) {
  return (
    <Box>
      <Box width={3}>
        <Text color="cyan">{isSelected ? '▶' : ' '}</Text>
      </Box>
      <Box
        borderStyle={isSelected ? 'round' : undefined}
        borderColor={isSelected ? 'green' : undefined}
        paddingX={isSelected ? 1 : 0}
      >
        <Text
          color={isSelected ? 'greenBright' : 'white'}
          bold={isSelected}
        >
          {label}
        </Text>
      </Box>
    </Box>
  );
}
```

---

## Focus Management

When you have multiple input components, use `isFocused`:

```tsx
function DualMenu() {
  const [activeMenu, setActiveMenu] = useState<'left' | 'right'>('left');

  return (
    <Box>
      <Box flexDirection="column" marginRight={2}>
        <Text bold>Actions</Text>
        <SelectInput
          items={actionItems}
          isFocused={activeMenu === 'left'}
          onSelect={handleAction}
        />
      </Box>
      <Box flexDirection="column">
        <Text bold>Targets</Text>
        <SelectInput
          items={targetItems}
          isFocused={activeMenu === 'right'}
          onSelect={handleTarget}
        />
      </Box>
    </Box>
  );
}
```

---

## Common Patterns

### Menu with Back Option

```tsx
function SubMenu({ onBack }: { onBack: () => void }) {
  const items = [
    { label: 'Option 1', value: 'opt1' },
    { label: 'Option 2', value: 'opt2' },
    { label: '← Back', value: 'back' }
  ];

  const handleSelect = (item: Item) => {
    if (item.value === 'back') {
      onBack();
    } else {
      handleOption(item.value);
    }
  };

  return <SelectInput items={items} onSelect={handleSelect} />;
}
```

### Dynamic Items

```tsx
function InventoryMenu({ items }: { items: InventoryItem[] }) {
  const menuItems = items.map(item => ({
    label: `${item.name} (x${item.quantity})`,
    value: item.id
  }));

  return <SelectInput items={menuItems} onSelect={handleUse} />;
}
```

### Confirm Dialog

```tsx
function ConfirmDialog({
  message,
  onConfirm,
  onCancel
}: ConfirmProps) {
  const items = [
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' }
  ];

  const handleSelect = (item: Item) => {
    if (item.value === 'yes') {
      onConfirm();
    } else {
      onCancel();
    }
  };

  return (
    <Box flexDirection="column">
      <Text>{message}</Text>
      <SelectInput items={items} onSelect={handleSelect} />
    </Box>
  );
}
```

---

## Project Usage (The Beggars Sect)

### Main Menu (App.tsx)

```tsx
import SelectInput from 'ink-select-input';

function MainMenu() {
  const items = [
    { label: 'New Game', value: 'new' },
    { label: 'Load Game', value: 'load' },
    { label: 'Quit', value: 'quit' }
  ];

  return (
    <Box flexDirection="column" alignItems="center">
      <Text bold>THE BEGGARS SECT</Text>
      <Box marginTop={1}>
        <SelectInput items={items} onSelect={handleMenuSelect} />
      </Box>
    </Box>
  );
}
```

### Combat Action Menu

```tsx
function ActionMenu({ onSelect }: ActionMenuProps) {
  const items = [
    { label: 'Attack', value: 'attack' },
    { label: 'Technique', value: 'technique' },
    { label: 'Defend', value: 'defend' },
    { label: 'Chi Focus', value: 'chi' },
    { label: 'Stance', value: 'stance' },
    { label: 'Flee', value: 'flee' }
  ];

  return (
    <Box borderStyle="single" padding={1}>
      <SelectInput items={items} onSelect={onSelect} />
    </Box>
  );
}
```

---

## TypeScript Types

```tsx
// If using @types/ink-select-input
interface Item<V = string> {
  key?: string;
  label: string;
  value: V;
}

interface SelectInputProps<V = string> {
  items?: Item<V>[];
  isFocused?: boolean;
  initialIndex?: number;
  limit?: number;
  indicatorComponent?: React.ComponentType<{ isSelected: boolean }>;
  itemComponent?: React.ComponentType<{ isSelected: boolean; label: string }>;
  onSelect?: (item: Item<V>) => void;
  onHighlight?: (item: Item<V>) => void;
}
```

---

## Resources

- **GitHub:** https://github.com/vadimdemedes/ink-select-input
- **npm:** https://www.npmjs.com/package/ink-select-input
- **Types:** https://www.npmjs.com/package/@types/ink-select-input

---

**Last Updated:** 2025-12-06
