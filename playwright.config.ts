import { devices, PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  // 1 minute timeout per test
  timeout: 60000,

  // Every test in every file is run in parallel
  fullyParallel: true,

  // No test.only on CI
  forbidOnly: !!process.env.CI,

  // Only 2 workers on CI for less flakiness hopefully
  workers: process.env.CI ? 2 : undefined,

  // 2 retries on CI since it appears that Playwright has problems with locators
  retries: process.env.CI ? 2 : 0,

  // Huge timeouts for actions + navgation to avoid flakiness, plus no HTTPS errors affecting it
  use: {
    ignoreHTTPSErrors: true,
    actionTimeout: 60000,
    navigationTimeout: 60000,
  },

  // Named projects for convenience
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
};

export default config;
