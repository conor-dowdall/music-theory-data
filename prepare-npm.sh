#!/bin/bash

# This script prepares the project for publishing to npm.
# It creates a directory `npm`, copies the necessary files, and
# generates a `package.json` using the version from `deno.json`.

# Exit immediately if a command exits with a non-zero status.
set -e

# Check if jq is installed, as it's required to parse JSON.
if ! command -v jq &> /dev/null; then
  echo "Error: jq is not installed. Please install it to continue." >&2
  exit 1
fi

# Define the output directory for the npm package
NPM_DIR="npm"

# 1. Create the npm directory, removing it first if it exists to ensure a clean state.
echo "Creating a clean '$NPM_DIR' directory..."
rm -rf "$NPM_DIR"
mkdir -p "$NPM_DIR"

# 2. Read version from deno.json and generate npm/package.json
echo "Creating '$NPM_DIR/package.json'..."

# Read the version from deno.json
VERSION=$(jq -r .version deno.json)

# Define the package.json content.
# The version is dynamically inserted from the variable.
cat > "$NPM_DIR/package.json" <<EOF
{
  "name": "@musodojo/music-theory-data",
  "version": "$VERSION",
  "description": "The musician-friendly TypeScript library for modes, scales, chords, and more.",
  "keywords": [
    "music",
    "theory"
  ],
  "license": "CC0-1.0",
  "author": "Conor Dowdall",
  "type": "module",
  "main": "src/mod.ts",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/conor-dowdall/music-theory-data.git"
  },
  "bugs": {
    "url": "https://github.com/conor-dowdall/music-theory-data/issues"
  }
}
EOF

# 3. Copy the entire 'src' directory, LICENSE, and README.md to 'npm/'
echo "Copying 'src/', 'LICENSE', and 'README.md' to '$NPM_DIR/'..."
cp -r src "$NPM_DIR/"
cp LICENSE README.md "$NPM_DIR/"

echo "NPM package preparation complete. The package is ready in the '$NPM_DIR' directory."