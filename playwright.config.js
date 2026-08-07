import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 60000,
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
  },
  webServer: {
    command: "npx serve . -l 3000",
    port: 3000,
    timeout: 10000,
    reuseExistingServer: !process.env.CI,
  },
});
