#!/usr/bin/env node
import React from 'react';
import { render } from 'ink';
import { App } from './ui/App';

// Main entry point
const { waitUntilExit } = render(<App />);

// Keep the process alive until the user quits
waitUntilExit().then(() => {
  process.exit(0);
});
