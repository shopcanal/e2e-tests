import { devices, PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  // 1 minute timeout per test
  timeout: 60000,

  // No test.only on CI
  forbidOnly: !!process.env.CI,

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
