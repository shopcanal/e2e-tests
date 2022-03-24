import { devices, PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  // Runs before the entire test suite
  globalSetup: require.resolve('./global-setup'),

  // 1 minute timeout per test
  timeout: 60000,

  // No test.only on CI
  forbidOnly: !!process.env.CI,

  // Two retries on CI env
  // TODO: @dgattey turn this back on when ready
  // retries: process.env.CI ? 2 : 0,

  // Traces turned on if we retry
  use: {
    trace: 'on-first-retry',
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
