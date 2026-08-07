#!/bin/bash

# Script to create Playwright configuration
set -e

echo "📝 Creating Playwright configuration..."

cat > playwright.config.js << 'EOF'
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  use: {
    baseURL: 'http://localhost:3000',
    browserName: 'chromium',
    headless: true,
  },
  webServer: {
    command: 'npx serve . -p 3000',
    port: 3000,
    timeout: 60000,
    reuseExistingServer: !process.env.CI,
  },
});
EOF

echo "✅ Playwright configuration created!"
