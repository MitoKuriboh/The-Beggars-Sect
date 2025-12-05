#!/usr/bin/env node
'use strict';

// CommonJS entry point for pkg bundling
// This loads the ESM module dynamically

async function main() {
  try {
    await import('./index.js');
  } catch (error) {
    console.error('Failed to start game:', error.message);
    process.exit(1);
  }
}

main();
