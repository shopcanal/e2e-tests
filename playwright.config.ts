import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  // Runs before the entire test suite
  globalSetup: require.resolve('./global-setup'),

  // Minute for each test should be enough. When many tests are run at once, some take up to 45 seconds
  timeout: 60000,

  use: {
    // Capture screenshots of failed runs
    screenshot: 'only-on-failure',
  },
};

export default config;
