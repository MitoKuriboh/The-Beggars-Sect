# pkg - Binary Packaging for Node.js

**Version Used:** 5.8.1
**Purpose:** Package Node.js apps into standalone executables
**Documentation:** https://github.com/vercel/pkg

---

## Overview

pkg compiles your Node.js project into a single executable that runs without Node.js installed. This is perfect for:

- **Distribution:** Share your game without requiring users to install Node.js
- **Portability:** Single file instead of hundreds of node_modules
- **Cross-compilation:** Build for Windows, macOS, and Linux from any platform
- **Deployment:** Simple deployment without dependency management

---

## Installation

```bash
npm install --save-dev pkg
```

---

## How It Works

1. pkg uses pre-compiled "base binaries" (Node.js with patches)
2. Your code and dependencies are bundled into a virtual filesystem
3. The base binary + virtual filesystem = standalone executable
4. Native modules require special handling (see Limitations)

---

## Basic Usage

### Command Line

```bash
# Build for current platform
npx pkg .

# Build for specific target
npx pkg . --target node18-win-x64

# Build for multiple targets
npx pkg . --targets node18-win-x64,node18-linux-x64,node18-macos-x64

# Custom output path
npx pkg . --output dist/my-app
```

### Package.json Configuration

```json
{
  "name": "the-beggars-sect",
  "version": "0.2.0",
  "bin": "dist/index.js",
  "pkg": {
    "scripts": [
      "dist/**/*.js",
      "node_modules/**/*.js"
    ],
    "assets": [
      "node_modules/yoga-layout-prebuilt/**/*"
    ],
    "targets": [
      "node18-win-x64",
      "node18-linux-x64",
      "node18-macos-x64"
    ],
    "outputPath": "releases"
  },
  "scripts": {
    "package": "npm run build && pkg . --compress GZip"
  }
}
```

---

## Target Format

Targets follow this pattern:
```
node<version>-<platform>-<arch>
```

### Node Versions

| Version | Status |
|---------|--------|
| `node18` | Current LTS, recommended |
| `node20` | Latest LTS |
| `node16` | Older LTS |

### Platforms

| Platform | Value |
|----------|-------|
| Windows | `win` |
| macOS | `macos` |
| Linux | `linux` |

### Architectures

| Architecture | Value |
|--------------|-------|
| 64-bit Intel/AMD | `x64` |
| ARM64 (M1/M2 Macs, ARM servers) | `arm64` |

### Common Targets

```bash
# Windows 64-bit
node18-win-x64

# macOS Intel
node18-macos-x64

# macOS Apple Silicon
node18-macos-arm64

# Linux 64-bit
node18-linux-x64

# Linux ARM (Raspberry Pi, etc.)
node18-linux-arm64
```

---

## Configuration Options

### scripts

JavaScript files to include (beyond what's statically analyzable):

```json
"pkg": {
  "scripts": [
    "dist/**/*.js",
    "lib/**/*.js"
  ]
}
```

Use this when pkg can't detect dynamically required files.

### assets

Non-JavaScript files to include:

```json
"pkg": {
  "assets": [
    "fonts/**/*",
    "data/**/*.json",
    "node_modules/yoga-layout-prebuilt/**/*"
  ]
}
```

### outputPath

Default output directory:

```json
"pkg": {
  "outputPath": "releases"
}
```

### targets

Default build targets:

```json
"pkg": {
  "targets": [
    "node18-win-x64",
    "node18-linux-x64",
    "node18-macos-x64"
  ]
}
```

---

## Compression

Reduce executable size with compression:

```bash
# GZip compression (faster, good compression)
npx pkg . --compress GZip

# Brotli compression (slower, better compression)
npx pkg . --compress Brotli
```

**Trade-offs:**
- GZip: ~40-50% size reduction, minimal startup impact
- Brotli: ~50-60% size reduction, slightly slower startup

---

## The Beggars Sect Configuration

### package.json

```json
{
  "name": "the-beggars-sect",
  "version": "0.2.0",
  "description": "A CLI RPG set in the Martial Arts Haven universe",
  "main": "dist/index.js",
  "bin": {
    "beggars-sect": "dist/index.js"
  },
  "pkg": {
    "scripts": [
      "dist/**/*.js",
      "node_modules/**/*.js"
    ],
    "assets": [
      "node_modules/yoga-layout-prebuilt/**/*"
    ],
    "targets": [
      "node18-win-x64",
      "node18-linux-x64",
      "node18-macos-x64"
    ]
  },
  "scripts": {
    "build": "tsc",
    "package": "npm run build && pkg . --targets node18-win-x64,node18-linux-x64,node18-macos-x64 --output dist/beggars-sect --compress GZip"
  }
}
```

### Build Command

```bash
npm run package
```

This will:
1. Compile TypeScript to JavaScript (`npm run build`)
2. Package into three executables with GZip compression

### Output Files

```
dist/
├── beggars-sect-win.exe    (~79 MB)
├── beggars-sect-linux      (~87 MB)
├── beggars-sect-macos      (~92 MB)
└── *.js                    (compiled JS, not needed for distribution)
```

---

## File System Access

### Snapshot Filesystem (Read-Only)

Files bundled with pkg are in a virtual filesystem:

```javascript
// This works - reading bundled assets
const data = fs.readFileSync(__dirname + '/data/config.json');

// Path will be something like:
// /snapshot/project/data/config.json
```

### Real Filesystem (Read-Write)

For saves, logs, and user data, write outside the snapshot:

```javascript
import os from 'os';
import path from 'path';
import fs from 'fs';

// User's home directory - always writable
const saveDir = path.join(os.homedir(), '.beggars-sect', 'saves');

// Ensure directory exists
if (!fs.existsSync(saveDir)) {
  fs.mkdirSync(saveDir, { recursive: true });
}

// Write save file
fs.writeFileSync(
  path.join(saveDir, 'slot1.json'),
  JSON.stringify(saveData)
);
```

### Common Save Locations

| Platform | Recommended Path |
|----------|-----------------|
| Windows | `%USERPROFILE%\.beggars-sect\` |
| macOS | `~/.beggars-sect/` |
| Linux | `~/.beggars-sect/` |

Cross-platform code:

```javascript
const homeDir = os.homedir();
const appDir = path.join(homeDir, '.beggars-sect');
```

---

## Limitations

### Dynamic Requires

pkg uses static analysis. Dynamic requires may not be detected:

```javascript
// This might not work
const module = require(`./${dynamicPath}`);

// Solution: Use full path or add to pkg.scripts
const module = require('./known/path/module');
```

### Native Modules

C++ addons compiled for specific Node.js versions:

```javascript
// Native modules (problematic)
const sqlite3 = require('sqlite3');  // Has native bindings
```

**Solutions:**
1. Avoid native modules when possible
2. Bundle native binaries separately
3. Use pure JavaScript alternatives

**Ink workaround:** yoga-layout-prebuilt is native, so include it in assets:

```json
"assets": [
  "node_modules/yoga-layout-prebuilt/**/*"
]
```

### ES Modules

pkg works best with CommonJS. If using ESM:

```json
// tsconfig.json
{
  "compilerOptions": {
    "module": "CommonJS"  // Not "ESNext"
  }
}
```

---

## Debugging

### Verbose Output

```bash
npx pkg . --debug
```

### Check What's Included

The executable logs its virtual filesystem structure on errors. To see what's bundled:

1. Run with intentionally wrong path
2. Check error message showing filesystem structure

### Common Issues

**"Cannot find module"**

```bash
# Add to pkg.scripts or pkg.assets
"pkg": {
  "scripts": ["missing/module.js"]
}
```

**"ENOENT: no such file or directory"**

File isn't bundled. Add to assets:

```json
"pkg": {
  "assets": ["path/to/file.json"]
}
```

**Large executable size**

- Enable compression: `--compress GZip`
- Check for unnecessary files in assets
- Ensure node_modules isn't duplicated

---

## Distribution

### GitHub Releases

1. Build all platforms: `npm run package`
2. Create GitHub release
3. Upload executables as release assets

Example GitHub Actions workflow:

```yaml
name: Release
on:
  push:
    tags: ['v*']

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run package
      - uses: softprops/action-gh-release@v1
        with:
          files: |
            dist/beggars-sect-win.exe
            dist/beggars-sect-linux
            dist/beggars-sect-macos
```

### User Instructions

**Windows:**
1. Download `beggars-sect-win.exe`
2. Double-click to run
3. Or run from command line: `.\beggars-sect-win.exe`

**macOS:**
1. Download `beggars-sect-macos`
2. Open Terminal, navigate to download location
3. Make executable: `chmod +x beggars-sect-macos`
4. Run: `./beggars-sect-macos`

**Linux:**
1. Download `beggars-sect-linux`
2. Make executable: `chmod +x beggars-sect-linux`
3. Run: `./beggars-sect-linux`

---

## Alternatives

| Tool | Pros | Cons |
|------|------|------|
| **pkg** | Battle-tested, cross-compile | Maintenance uncertain |
| **nexe** | Similar to pkg | Unmaintained since 2017 |
| **Node SEA** | Official Node.js | Node 20+, limited |
| **@vercel/ncc** | Bundles but doesn't compile | Still needs Node.js |
| **esbuild** | Fast bundling | Doesn't create executables |

---

## Resources

- **GitHub:** https://github.com/vercel/pkg
- **npm:** https://www.npmjs.com/package/pkg
- **Node SEA Docs:** https://nodejs.org/api/single-executable-applications.html

---

**Last Updated:** 2025-12-06
