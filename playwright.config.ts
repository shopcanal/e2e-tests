import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  // Runs before the entire test suite
  globalSetup: require.resolve('./global-setup'),
};

export default config;
