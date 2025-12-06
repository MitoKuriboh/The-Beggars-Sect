#!/bin/bash
# Build DMG installer for The Beggars Sect (macOS)
# Usage: ./scripts/build-dmg.sh
# Note: Must be run on macOS

set -e

# Configuration
APP_NAME="The Beggars Sect"
APP_VERSION="0.2.0"
VOLUME_NAME="The Beggars Sect"
DMG_NAME="BeggarssSect-${APP_VERSION}-macOS"
EXECUTABLE_NAME="beggars-sect"

# Paths
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
BUILD_DIR="$PROJECT_DIR/build-dmg"
OUTPUT_DIR="$PROJECT_DIR/installers"
EXECUTABLE="$PROJECT_DIR/dist/beggars-sect-macos"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Building DMG installer for ${APP_NAME} v${APP_VERSION}${NC}"

# Check if running on macOS
if [[ "$OSTYPE" != "darwin"* ]]; then
    echo -e "${RED}Error: This script must be run on macOS${NC}"
    echo "DMG creation requires macOS tools (hdiutil)."
    exit 1
fi

# Check if executable exists
if [ ! -f "$EXECUTABLE" ]; then
    echo -e "${RED}Error: Executable not found at $EXECUTABLE${NC}"
    echo "Run 'npm run package' first to create the executable."
    exit 1
fi

# Clean previous build
echo -e "${YELLOW}Cleaning previous build...${NC}"
rm -rf "$BUILD_DIR"
mkdir -p "$BUILD_DIR"
mkdir -p "$OUTPUT_DIR"

# Create DMG content directory
echo -e "${YELLOW}Creating DMG content...${NC}"
DMG_CONTENT="$BUILD_DIR/dmg-content"
mkdir -p "$DMG_CONTENT"

# Copy executable
cp "$EXECUTABLE" "$DMG_CONTENT/$EXECUTABLE_NAME"
chmod +x "$DMG_CONTENT/$EXECUTABLE_NAME"

# Sign the executable (ad-hoc signing for local distribution)
echo -e "${YELLOW}Signing executable (ad-hoc)...${NC}"
codesign --sign - --force --preserve-metadata=entitlements,requirements,flags,runtime \
    "$DMG_CONTENT/$EXECUTABLE_NAME" 2>/dev/null || {
    echo -e "${YELLOW}Warning: Code signing skipped (may require Xcode)${NC}"
}

# Create README
cat > "$DMG_CONTENT/README.txt" << EOF
The Beggars Sect v${APP_VERSION}
================================

A CLI RPG set in the Martial Arts Haven

INSTALLATION
------------
1. Drag 'beggars-sect' to your Applications folder, OR
2. Copy it anywhere you like

RUNNING THE GAME
----------------
1. Open Terminal
2. Navigate to where you placed the executable
3. Run: ./beggars-sect

Or add to your PATH:
  sudo cp beggars-sect /usr/local/bin/
  beggars-sect

CONTROLS
--------
- Arrow keys: Navigate menus
- Enter: Select option
- Escape: Go back
- Space: Advance story text

WEBSITE
-------
https://beggars-sect.genkaw.com

Created by Mito (Mitchell Grebe)
With assistance from Claude AI
EOF

# Create Applications symlink for drag-and-drop install
ln -s /Applications "$DMG_CONTENT/Applications" 2>/dev/null || true

# Create temporary DMG
echo -e "${YELLOW}Creating DMG...${NC}"
TEMP_DMG="$BUILD_DIR/temp.dmg"
hdiutil create -volname "$VOLUME_NAME" \
    -srcfolder "$DMG_CONTENT" \
    -ov -format UDRW \
    "$TEMP_DMG"

# Convert to compressed DMG
echo -e "${YELLOW}Compressing DMG...${NC}"
FINAL_DMG="$OUTPUT_DIR/${DMG_NAME}.dmg"
hdiutil convert "$TEMP_DMG" \
    -format UDZO \
    -imagekey zlib-level=9 \
    -o "$FINAL_DMG"

# Clean up
echo -e "${YELLOW}Cleaning up...${NC}"
rm -rf "$BUILD_DIR"

# Verify DMG
echo -e "${YELLOW}Verifying DMG...${NC}"
hdiutil verify "$FINAL_DMG"

# Final output
echo ""
echo -e "${GREEN}=============================================="
echo -e "  DMG installer built successfully!"
echo -e "==============================================${NC}"
echo ""
echo -e "Output: ${YELLOW}$FINAL_DMG${NC}"
echo -e "Size:   ${YELLOW}$(du -h "$FINAL_DMG" | cut -f1)${NC}"
echo ""
echo "To install:"
echo "  1. Double-click the DMG to mount it"
echo "  2. Drag 'beggars-sect' to Applications (or anywhere)"
echo "  3. Open Terminal and run: beggars-sect"
echo ""
echo "Note: Users may need to allow the app in"
echo "System Preferences > Security & Privacy"
echo ""
