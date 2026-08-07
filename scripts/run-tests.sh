#!/bin/bash

# Script to run Playwright tests
set -e

echo "🧪 Running Playwright tests..."

npx playwright test --project=chromium
