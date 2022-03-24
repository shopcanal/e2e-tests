import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  // Runs before the entire test suite
  globalSetup: require.resolve('./global-setup'),

  // 4 minute for each test to really stress test
  timeout: 240000,

  use: {
    // Capture screenshots of failed runs
    screenshot: 'only-on-failure',
  },
};

export default config;
