#!/bin/bash

# Script to start the development server
set -e

echo "🚀 Starting server..."

# Install serve if not already installed
if ! command -v npx &> /dev/null; then
    echo "❌ Node.js is not installed"
    exit 1
fi

# Start the server on port 3000
npx serve . -p 3000
