#!/bin/bash

# This script prepares the project for publishing to npm.
# It creates a directory `npm`, copies the necessary files,
# and creates a `package.json` from `package.json.txt`.

# Exit immediately if a command exits with a non-zero status.
set -e

# Define the output directory for the npm package
NPM_DIR="npm"

# 1. Create the npm directory, removing it first if it exists to ensure a clean state.
echo "Creating a clean '$NPM_DIR' directory..."
rm -rf "$NPM_DIR"
mkdir -p "$NPM_DIR"

# 2. Create npm/package.json from package.json.txt
echo "Creating '$NPM_DIR/package.json'..."
cat package.json.txt > "$NPM_DIR/package.json"

# 3. Copy the entire 'src' directory, LICENSE, and README.md to 'npm/'
echo "Copying 'src/', 'LICENSE', and 'README.md' to '$NPM_DIR/'..."
cp -r src "$NPM_DIR/"
cp LICENSE README.md "$NPM_DIR/"

echo "NPM package preparation complete. The package is ready in the '$NPM_DIR' directory."