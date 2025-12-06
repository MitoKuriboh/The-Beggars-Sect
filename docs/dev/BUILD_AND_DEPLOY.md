# Build and Deployment Guide

**Project:** The Beggars Sect
**Version:** 0.2.0
**Last Updated:** 2025-12-06
**Status:** Research Complete - Ready for Implementation

---

## Table of Contents

1. [Current State Analysis](#current-state-analysis)
2. [Build Options](#build-options)
3. [Recommended Approach](#recommended-approach)
4. [Platform-Specific Installers](#platform-specific-installers)
5. [GitHub Actions CI/CD](#github-actions-cicd)
6. [Execution Plan](#execution-plan)
7. [Resources](#resources)

---

## Current State Analysis

### Project Structure

```
the-beggars-sect/
├── src/                    # TypeScript source (~7,500 lines)
├── dist/                   # Build output
│   ├── beggars-sect-win.exe    # 82 MB (pkg)
│   ├── beggars-sect-macos      # 96 MB (pkg)
│   ├── beggars-sect-linux      # 91 MB (pkg)
│   ├── bundle.cjs              # 2.9 MB (esbuild)
│   └── beggars-sect-sea        # 99 MB (Node SEA)
├── package.json
├── tsconfig.json
└── sea-config.json
```

### Current Build Tools

| Tool | Purpose | Status |
|------|---------|--------|
| TypeScript | Compilation | Working |
| [pkg](https://github.com/vercel/pkg) | Standalone executables | Working |
| esbuild | Bundling | Working |
| @vercel/ncc | Single-file bundling | Installed |
| Node SEA | Single Executable App | Experimental |

### Current npm Scripts

```json
{
  "dev": "tsx watch src/index.tsx",
  "build": "tsc",
  "start": "node dist/index.js",
  "package": "npm run build && pkg . --targets node18-win-x64,node18-linux-x64,node18-macos-x64 --output dist/beggars-sect --compress GZip"
}
```

### Current Executable Sizes

| Platform | Size | Notes |
|----------|------|-------|
| Windows (.exe) | 82 MB | pkg with GZip compression |
| macOS | 96 MB | Unsigned, needs codesign |
| Linux | 91 MB | Works on most distributions |
| Node SEA | 99 MB | Experimental approach |

---

## Build Options

### Option 1: pkg (Current - Recommended)

[pkg by Vercel](https://github.com/vercel/pkg) packages Node.js projects into standalone executables.

**Pros:**
- Already working in project
- Cross-compilation support
- Well-documented
- Active fork: [yao-pkg/pkg](https://github.com/yao-pkg/pkg)

**Cons:**
- Large executable sizes (80-100 MB)
- Native modules require special handling
- macOS ARM64 requires code signing

**Configuration (current):**
```json
{
  "pkg": {
    "scripts": ["dist/**/*.js", "node_modules/**/*.js"],
    "assets": ["node_modules/yoga-layout-prebuilt/**/*"],
    "outputPath": "dist"
  }
}
```

### Option 2: Node.js Single Executable Application (SEA)

[Node.js SEA](https://nodejs.org/api/single-executable-applications.html) is the official Node.js solution.

**Pros:**
- Official Node.js feature
- No external dependencies
- Potentially smaller builds

**Cons:**
- Still experimental
- Complex setup process
- Requires Node.js binary manipulation

**Current sea-config.json:**
```json
{
  "main": "dist/ncc-out/index.js",
  "output": "sea-prep.blob",
  "disableExperimentalSEAWarning": true,
  "useSnapshot": false,
  "useCodeCache": true
}
```

### Option 3: esbuild + pkg Hybrid

Use esbuild for bundling, then pkg for packaging.

**Pros:**
- Faster builds
- Better tree-shaking
- Smaller bundle before packaging

**Cons:**
- Two-step process
- May have compatibility issues

---

## Recommended Approach

### Primary: pkg with GitHub Actions

Use pkg for executable creation with GitHub Actions for automated multi-platform builds.

**Rationale:**
1. Already working in project
2. Well-supported by GitHub Actions ([lando/pkg-action](https://github.com/lando/pkg-action))
3. Cross-compilation works
4. Community examples available

### Build Pipeline

```
Source → TypeScript → pkg → Platform Executables → Installers
```

---

## Platform-Specific Installers

### Windows: NSIS or Inno Setup

#### Option A: NSIS (Nullsoft Scriptable Install System)

[NSIS](https://nsis.sourceforge.io/) is a professional open-source installer system.

**Install:** `winget install NSIS.NSIS`

**Basic NSIS Script (setup.nsi):**
```nsis
!include "MUI2.nsh"

Name "The Beggars Sect"
OutFile "BeggarsSecInstaller.exe"
InstallDir "$PROGRAMFILES\BeggarssSect"
RequestExecutionLevel admin

!insertmacro MUI_PAGE_WELCOME
!insertmacro MUI_PAGE_DIRECTORY
!insertmacro MUI_PAGE_INSTFILES
!insertmacro MUI_PAGE_FINISH

!insertmacro MUI_LANGUAGE "English"

Section "Install"
    SetOutPath "$INSTDIR"
    File "dist\beggars-sect-win.exe"

    ; Create Start Menu shortcut
    CreateDirectory "$SMPROGRAMS\The Beggars Sect"
    CreateShortCut "$SMPROGRAMS\The Beggars Sect\The Beggars Sect.lnk" "$INSTDIR\beggars-sect-win.exe"

    ; Create uninstaller
    WriteUninstaller "$INSTDIR\Uninstall.exe"

    ; Registry entries for Add/Remove Programs
    WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\BeggarssSect" "DisplayName" "The Beggars Sect"
    WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\BeggarssSect" "UninstallString" "$INSTDIR\Uninstall.exe"
SectionEnd

Section "Uninstall"
    Delete "$INSTDIR\beggars-sect-win.exe"
    Delete "$INSTDIR\Uninstall.exe"
    RMDir "$INSTDIR"
    Delete "$SMPROGRAMS\The Beggars Sect\The Beggars Sect.lnk"
    RMDir "$SMPROGRAMS\The Beggars Sect"
    DeleteRegKey HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\BeggarssSect"
SectionEnd
```

#### Option B: Inno Setup

[Inno Setup](https://jrsoftware.org/isinfo.php) is easier for simple installers.

**Basic Inno Setup Script (setup.iss):**
```iss
[Setup]
AppName=The Beggars Sect
AppVersion=0.2.0
DefaultDirName={pf}\BeggarssSect
DefaultGroupName=The Beggars Sect
OutputDir=installers
OutputBaseFilename=BeggarsSecInstaller
Compression=lzma2
SolidCompression=yes

[Files]
Source: "dist\beggars-sect-win.exe"; DestDir: "{app}"; Flags: ignoreversion

[Icons]
Name: "{group}\The Beggars Sect"; Filename: "{app}\beggars-sect-win.exe"
Name: "{group}\Uninstall"; Filename: "{uninstallexe}"
Name: "{commondesktop}\The Beggars Sect"; Filename: "{app}\beggars-sect-win.exe"

[Run]
Filename: "{app}\beggars-sect-win.exe"; Description: "Launch The Beggars Sect"; Flags: postinstall nowait
```

### macOS: DMG and PKG

#### Option A: DMG (Disk Image) - Simpler

```bash
# Create DMG from executable
mkdir -p dmg-content
cp dist/beggars-sect-macos dmg-content/
chmod +x dmg-content/beggars-sect-macos

# Create DMG
hdiutil create -volname "The Beggars Sect" \
    -srcfolder dmg-content \
    -ov -format UDZO \
    installers/BeggarsSecInstaller.dmg
```

#### Option B: PKG (Installer Package) - More Professional

```bash
# Sign the executable first (required for distribution)
codesign --sign - --force --preserve-metadata=entitlements,requirements,flags,runtime \
    dist/beggars-sect-macos

# Create PKG
pkgbuild --root dist \
    --identifier com.genkaw.beggarssect \
    --version 0.2.0 \
    --install-location /usr/local/bin \
    installers/BeggarsSecInstaller.pkg
```

**Note:** For proper macOS distribution, you need:
1. Apple Developer account ($99/year)
2. Code signing certificate
3. Notarization with Apple

### Linux: DEB and AppImage

#### Option A: DEB Package (Debian/Ubuntu)

**Directory Structure:**
```
beggars-sect_0.2.0/
├── DEBIAN/
│   └── control
└── usr/
    └── local/
        └── bin/
            └── beggars-sect
```

**DEBIAN/control:**
```
Package: beggars-sect
Version: 0.2.0
Section: games
Priority: optional
Architecture: amd64
Maintainer: Mito <mito@genkaw.com>
Description: A CLI RPG set in the Martial Arts Haven
 The Beggars Sect is a CLI-based Wuxia RPG following Li Wei,
 a mysterious figure who awakens with no memory.
```

**Build Script:**
```bash
#!/bin/bash
mkdir -p beggars-sect_0.2.0/DEBIAN
mkdir -p beggars-sect_0.2.0/usr/local/bin

cp dist/beggars-sect-linux beggars-sect_0.2.0/usr/local/bin/beggars-sect
chmod +x beggars-sect_0.2.0/usr/local/bin/beggars-sect

cat > beggars-sect_0.2.0/DEBIAN/control << EOF
Package: beggars-sect
Version: 0.2.0
Section: games
Priority: optional
Architecture: amd64
Maintainer: Mito <mito@genkaw.com>
Description: A CLI RPG set in the Martial Arts Haven
EOF

dpkg-deb --build beggars-sect_0.2.0
mv beggars-sect_0.2.0.deb installers/beggars-sect_0.2.0_amd64.deb
```

#### Option B: AppImage (Universal Linux)

AppImage is a universal Linux package format.

```bash
# Using appimagetool
# Download from https://github.com/AppImage/AppImageKit

mkdir -p BeggarssSect.AppDir/usr/bin
cp dist/beggars-sect-linux BeggarssSect.AppDir/usr/bin/beggars-sect
chmod +x BeggarssSect.AppDir/usr/bin/beggars-sect

# Create AppRun
cat > BeggarssSect.AppDir/AppRun << 'EOF'
#!/bin/bash
SELF=$(readlink -f "$0")
HERE=${SELF%/*}
exec "${HERE}/usr/bin/beggars-sect" "$@"
EOF
chmod +x BeggarssSect.AppDir/AppRun

# Create .desktop file
cat > BeggarssSect.AppDir/beggars-sect.desktop << EOF
[Desktop Entry]
Name=The Beggars Sect
Exec=beggars-sect
Type=Application
Categories=Game;
EOF

# Build AppImage
appimagetool BeggarssSect.AppDir installers/BeggarssSect-x86_64.AppImage
```

---

## GitHub Actions CI/CD

### Automated Build Workflow

Create `.github/workflows/build.yml`:

```yaml
name: Build and Release

on:
  push:
    tags:
      - 'v*'
  workflow_dispatch:

jobs:
  build:
    strategy:
      matrix:
        include:
          - os: ubuntu-latest
            target: node18-linux-x64
            artifact: beggars-sect-linux
          - os: macos-latest
            target: node18-macos-x64
            artifact: beggars-sect-macos
          - os: windows-latest
            target: node18-win-x64
            artifact: beggars-sect-win.exe

    runs-on: ${{ matrix.os }}

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build TypeScript
        run: npm run build

      - name: Package with pkg
        run: npx pkg . --target ${{ matrix.target }} --output dist/${{ matrix.artifact }} --compress GZip

      - name: Upload artifact
        uses: actions/upload-artifact@v4
        with:
          name: ${{ matrix.artifact }}
          path: dist/${{ matrix.artifact }}

  create-installers:
    needs: build
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Download all artifacts
        uses: actions/download-artifact@v4
        with:
          path: dist/

      - name: Create DEB package
        run: |
          mkdir -p beggars-sect_0.2.0/DEBIAN
          mkdir -p beggars-sect_0.2.0/usr/local/bin
          cp dist/beggars-sect-linux/beggars-sect-linux beggars-sect_0.2.0/usr/local/bin/beggars-sect
          chmod +x beggars-sect_0.2.0/usr/local/bin/beggars-sect
          echo "Package: beggars-sect" > beggars-sect_0.2.0/DEBIAN/control
          echo "Version: 0.2.0" >> beggars-sect_0.2.0/DEBIAN/control
          echo "Architecture: amd64" >> beggars-sect_0.2.0/DEBIAN/control
          echo "Maintainer: Mito <mito@genkaw.com>" >> beggars-sect_0.2.0/DEBIAN/control
          echo "Description: CLI RPG in the Martial Arts Haven" >> beggars-sect_0.2.0/DEBIAN/control
          dpkg-deb --build beggars-sect_0.2.0
          mv beggars-sect_0.2.0.deb installers/

      - name: Upload installers
        uses: actions/upload-artifact@v4
        with:
          name: installers
          path: installers/

  release:
    needs: [build, create-installers]
    runs-on: ubuntu-latest
    if: startsWith(github.ref, 'refs/tags/')

    steps:
      - name: Download all artifacts
        uses: actions/download-artifact@v4
        with:
          path: artifacts/

      - name: Create Release
        uses: softprops/action-gh-release@v1
        with:
          files: |
            artifacts/beggars-sect-linux/*
            artifacts/beggars-sect-macos/*
            artifacts/beggars-sect-win.exe/*
            artifacts/installers/*
          draft: false
          prerelease: false
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### Using lando/pkg-action (Alternative)

```yaml
- name: Build with pkg-action
  uses: lando/pkg-action@v4
  with:
    entrypoint: dist/index.js
    node-version: node18
    arch: x64
    os: ${{ matrix.os }}
    options: --compress GZip
```

---

## Execution Plan

### Phase 1: Local Build Setup (1-2 hours)

1. **Verify current build works**
   ```bash
   npm run build
   npm run package
   ```

2. **Create installers directory**
   ```bash
   mkdir -p installers
   ```

3. **Test executables on each platform**
   - Windows: Run `dist/beggars-sect-win.exe`
   - macOS: Run `./dist/beggars-sect-macos`
   - Linux: Run `./dist/beggars-sect-linux`

### Phase 2: Windows Installer (1-2 hours)

1. **Install Inno Setup** (simpler option)
   - Download from https://jrsoftware.org/isdl.php
   - Or: `winget install JRSoftware.InnoSetup`

2. **Create setup.iss script**
   ```bash
   # Copy from Platform-Specific Installers section above
   ```

3. **Build installer**
   ```bash
   iscc setup.iss
   ```

4. **Test installer**
   - Run generated .exe
   - Verify installation
   - Test uninstall

### Phase 3: Linux DEB Package (1 hour)

1. **Create build script**
   ```bash
   touch scripts/build-deb.sh
   chmod +x scripts/build-deb.sh
   ```

2. **Add script content from above**

3. **Build and test**
   ```bash
   ./scripts/build-deb.sh
   sudo dpkg -i installers/beggars-sect_0.2.0_amd64.deb
   beggars-sect
   ```

### Phase 4: macOS DMG (1-2 hours)

1. **Create build script**
   ```bash
   touch scripts/build-dmg.sh
   chmod +x scripts/build-dmg.sh
   ```

2. **Add hdiutil commands from above**

3. **Build and test**
   ```bash
   ./scripts/build-dmg.sh
   # Open DMG and test
   ```

4. **(Optional) Code signing**
   - Requires Apple Developer account
   - Use `codesign` for signing
   - Use `xcrun notarytool` for notarization

### Phase 5: GitHub Actions (2-3 hours)

1. **Create workflow file**
   ```bash
   mkdir -p .github/workflows
   touch .github/workflows/build.yml
   ```

2. **Add workflow content from above**

3. **Test with manual dispatch**
   - Push changes
   - Go to Actions tab
   - Run workflow manually

4. **Test with tag**
   ```bash
   git tag v0.2.0
   git push origin v0.2.0
   ```

### Phase 6: Distribution (Ongoing)

1. **GitHub Releases**
   - Automated via workflow
   - Manual upload for testing

2. **Website Downloads**
   - Update beggars-sect.genkaw.com/download
   - Link to GitHub Releases

3. **Package Managers (Future)**
   - npm: `npm publish`
   - Homebrew: Create formula
   - AUR: Create PKGBUILD
   - Chocolatey: Create package

---

## Quick Start Commands

### Build Everything Locally

```bash
# 1. Build TypeScript
npm run build

# 2. Create executables
npm run package

# 3. Create Linux DEB (requires dpkg-deb)
./scripts/build-deb.sh

# 4. Create macOS DMG (requires macOS)
./scripts/build-dmg.sh

# 5. Create Windows installer (requires Inno Setup)
iscc setup.iss
```

### Verify Builds

```bash
# Check executable sizes
ls -lh dist/beggars-sect-*

# Check installer sizes
ls -lh installers/
```

---

## Resources

### Official Documentation
- [pkg (Vercel)](https://github.com/vercel/pkg)
- [yao-pkg/pkg (Active Fork)](https://github.com/yao-pkg/pkg)
- [Node.js SEA](https://nodejs.org/api/single-executable-applications.html)

### Installer Tools
- [NSIS](https://nsis.sourceforge.io/)
- [Inno Setup](https://jrsoftware.org/isinfo.php)
- [pkgbuild (macOS)](https://developer.apple.com/library/archive/documentation/DeveloperTools/Reference/pkgbuild_man/pkgbuild.html)
- [dpkg-deb](https://man7.org/linux/man-pages/man1/dpkg-deb.1.html)

### GitHub Actions
- [lando/pkg-action](https://github.com/lando/pkg-action)
- [softprops/action-gh-release](https://github.com/softprops/action-gh-release)
- [karlhorky/vercel-pkg-github-actions-release](https://github.com/karlhorky/vercel-pkg-github-actions-release)

### Tutorials
- [Building binary deb packages](https://www.internalpointers.com/post/build-binary-deb-package-practical-guide)
- [Creating Windows installers with NSIS](https://gist.github.com/mattiasghodsian/a30f50568792939e35e93e6bc2084c2a)
- [Cross-platform release builds](https://electricui.com/blog/github-actions)

---

## Summary

| Platform | Executable | Installer | Tool |
|----------|------------|-----------|------|
| Windows | .exe (82 MB) | .exe installer | Inno Setup |
| macOS | binary (96 MB) | .dmg | hdiutil |
| Linux | binary (91 MB) | .deb | dpkg-deb |

**Recommended Priority:**
1. Windows installer (largest user base)
2. Linux DEB (easy to create)
3. macOS DMG (requires macOS for proper testing)
4. GitHub Actions automation

---

*Document Version: 1.0*
*Last Updated: 2025-12-06*
