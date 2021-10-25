import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  // Runs before the entire test suite
  globalSetup: require.resolve('./global-setup'),

  // Each test is given 60 seconds
  timeout: 60000,
};

export default config;
