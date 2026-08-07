#!/bin/bash

# Script to install Playwright and its dependencies
set -e

echo "📦 Installing Playwright dependencies..."

# Initialize npm if package.json doesn't exist
if [ ! -f "package.json" ]; then
    echo "Creating package.json..."
    npm init -y
fi

# Install Playwright
echo "Installing @playwright/test..."
npm install -D @playwright/test

# Install Playwright browsers
echo "Installing Playwright browsers (Chromium)..."
npx playwright install --with-deps chromium

echo "✅ Playwright installation complete!"
