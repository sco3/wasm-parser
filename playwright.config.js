import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    headless: true,
  },
  webServer: {
    command: 'npx serve . -l 3000',
    port: 3000,
    timeout: 5000,
  },
});