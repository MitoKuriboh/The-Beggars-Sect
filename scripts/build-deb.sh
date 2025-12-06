#!/bin/bash
# Build DEB package for The Beggars Sect
# Usage: ./scripts/build-deb.sh

set -e

# Configuration
APP_NAME="beggars-sect"
APP_VERSION="0.3.6"
MAINTAINER="Mito <mito@genkaw.com>"
DESCRIPTION="A CLI RPG set in the Martial Arts Haven"
LONG_DESCRIPTION=" The Beggars Sect is a CLI-based Wuxia RPG following Li Wei,
 a mysterious figure who awakens in the Martial Arts Haven with no memory.
 Through three chapters, players discover his true identity while mastering
 martial arts techniques and making choices that shape the story."
ARCHITECTURE="amd64"
SECTION="games"
PRIORITY="optional"
HOMEPAGE="https://beggars-sect.genkaw.com"

# Paths
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
BUILD_DIR="$PROJECT_DIR/build-deb"
OUTPUT_DIR="$PROJECT_DIR/installers"
EXECUTABLE="$PROJECT_DIR/dist/beggars-sect-linux"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Building DEB package for ${APP_NAME} v${APP_VERSION}${NC}"

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

# Create directory structure
echo -e "${YELLOW}Creating directory structure...${NC}"
PACKAGE_DIR="$BUILD_DIR/${APP_NAME}_${APP_VERSION}_${ARCHITECTURE}"
mkdir -p "$PACKAGE_DIR/DEBIAN"
mkdir -p "$PACKAGE_DIR/usr/local/bin"
mkdir -p "$PACKAGE_DIR/usr/share/applications"
mkdir -p "$PACKAGE_DIR/usr/share/doc/$APP_NAME"

# Copy executable
echo -e "${YELLOW}Copying executable...${NC}"
cp "$EXECUTABLE" "$PACKAGE_DIR/usr/local/bin/$APP_NAME"
chmod 755 "$PACKAGE_DIR/usr/local/bin/$APP_NAME"

# Get installed size (in KB)
INSTALLED_SIZE=$(du -sk "$PACKAGE_DIR" | cut -f1)

# Create control file
echo -e "${YELLOW}Creating control file...${NC}"
cat > "$PACKAGE_DIR/DEBIAN/control" << EOF
Package: $APP_NAME
Version: $APP_VERSION
Section: $SECTION
Priority: $PRIORITY
Architecture: $ARCHITECTURE
Installed-Size: $INSTALLED_SIZE
Maintainer: $MAINTAINER
Homepage: $HOMEPAGE
Description: $DESCRIPTION
$LONG_DESCRIPTION
EOF

# Create desktop entry (for terminal-based app)
echo -e "${YELLOW}Creating desktop entry...${NC}"
cat > "$PACKAGE_DIR/usr/share/applications/$APP_NAME.desktop" << EOF
[Desktop Entry]
Name=The Beggars Sect
Comment=$DESCRIPTION
Exec=$APP_NAME
Terminal=true
Type=Application
Categories=Game;RolePlaying;
Keywords=rpg;cli;martial-arts;wuxia;
EOF

# Create copyright file
echo -e "${YELLOW}Creating documentation...${NC}"
cat > "$PACKAGE_DIR/usr/share/doc/$APP_NAME/copyright" << EOF
Format: https://www.debian.org/doc/packaging-manuals/copyright-format/1.0/
Upstream-Name: $APP_NAME
Upstream-Contact: $MAINTAINER
Source: $HOMEPAGE

Files: *
Copyright: 2025 Mito (Mitchell Grebe)
License: Proprietary
 This software is proprietary. All rights reserved.
 See $HOMEPAGE for more information.
EOF

# Create changelog
cat > "$PACKAGE_DIR/usr/share/doc/$APP_NAME/changelog.Debian" << EOF
$APP_NAME ($APP_VERSION) stable; urgency=low

  * Initial release
  * Complete combat system with 55+ techniques
  * Non-linear story with 3 paths and 3 endings
  * Save system with auto-save

 -- $MAINTAINER  $(date -R)
EOF
gzip -9 -n "$PACKAGE_DIR/usr/share/doc/$APP_NAME/changelog.Debian"

# Create postinst script
cat > "$PACKAGE_DIR/DEBIAN/postinst" << 'EOF'
#!/bin/bash
set -e

echo ""
echo "=============================================="
echo "  The Beggars Sect installed successfully!"
echo "=============================================="
echo ""
echo "Run 'beggars-sect' in your terminal to play."
echo ""
echo "Controls:"
echo "  Arrow keys - Navigate menus"
echo "  Enter      - Select option"
echo "  Escape     - Go back"
echo ""

exit 0
EOF
chmod 755 "$PACKAGE_DIR/DEBIAN/postinst"

# Create prerm script
cat > "$PACKAGE_DIR/DEBIAN/prerm" << 'EOF'
#!/bin/bash
set -e
echo "Removing The Beggars Sect..."
exit 0
EOF
chmod 755 "$PACKAGE_DIR/DEBIAN/prerm"

# Set permissions
echo -e "${YELLOW}Setting permissions...${NC}"
find "$PACKAGE_DIR" -type d -exec chmod 755 {} \;
find "$PACKAGE_DIR/DEBIAN" -type f -exec chmod 644 {} \;
chmod 755 "$PACKAGE_DIR/DEBIAN/postinst"
chmod 755 "$PACKAGE_DIR/DEBIAN/prerm"

# Build package
echo -e "${YELLOW}Building DEB package...${NC}"
dpkg-deb --root-owner-group --build "$PACKAGE_DIR"

# Move to output directory
DEB_FILE="${APP_NAME}_${APP_VERSION}_${ARCHITECTURE}.deb"
mv "$BUILD_DIR/$DEB_FILE" "$OUTPUT_DIR/"

# Verify package
echo -e "${YELLOW}Verifying package...${NC}"
dpkg-deb --info "$OUTPUT_DIR/$DEB_FILE"

# Clean up
echo -e "${YELLOW}Cleaning up...${NC}"
rm -rf "$BUILD_DIR"

# Final output
echo ""
echo -e "${GREEN}=============================================="
echo -e "  DEB package built successfully!"
echo -e "==============================================${NC}"
echo ""
echo -e "Output: ${YELLOW}$OUTPUT_DIR/$DEB_FILE${NC}"
echo -e "Size:   ${YELLOW}$(du -h "$OUTPUT_DIR/$DEB_FILE" | cut -f1)${NC}"
echo ""
echo "To install:"
echo "  sudo dpkg -i $OUTPUT_DIR/$DEB_FILE"
echo ""
echo "To uninstall:"
echo "  sudo dpkg -r $APP_NAME"
echo ""
