import { defineConfig, devices } from '@playwright/test';
import process from "node:process";

const FRONTEND_PORT = process.env.FRONTEND_PORT || '5173';

export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  expect: { timeout: 10_000 },
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL: `http://127.0.0.1:${FRONTEND_PORT}`,
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'node scripts/start-test-servers.mjs',
    url: `http://127.0.0.1:${FRONTEND_PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
