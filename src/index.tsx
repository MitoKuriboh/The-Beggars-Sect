#!/usr/bin/env node
import React from 'react';
import { render } from 'ink';
import { App } from './ui/App';

// Enable alternative screen buffer to prevent flickering
// This creates a separate screen that we can swap to/from cleanly
process.stdout.write('\x1b[?1049h'); // Enable alternative buffer

// Hide cursor during rendering to reduce flicker
process.stdout.write('\x1b[?25l'); // Hide cursor

// Clear console before rendering to avoid duplicate display
console.clear();

// Enable stdout buffering to reduce write syscalls and flickering
// Cork buffering - all writes are batched in memory
if (typeof process.stdout.cork === 'function') {
  process.stdout.cork();
  // Uncork after initial render to flush buffered data
  setImmediate(() => {
    if (typeof process.stdout.uncork === 'function') {
      process.stdout.uncork();
    }
  });
}

// Main entry point with optimized render settings
const { waitUntilExit } = render(<App />, {
  // Disable console patching for better performance
  // Prevents Ink from intercepting console.log calls
  patchConsole: false,

  // Explicitly set debug to false for production
  debug: false,

  // Enable experimental mode for 60fps cap and optimized reconciliation
  // This dramatically reduces flickering on frequent updates
  experimental: true,
});

// Cleanup and restore terminal state on exit
waitUntilExit().then(() => {
  // Show cursor again
  process.stdout.write('\x1b[?25h'); // Show cursor

  // Disable alternative buffer (return to normal screen)
  process.stdout.write('\x1b[?1049l'); // Disable alternative buffer

  process.exit(0);
});
