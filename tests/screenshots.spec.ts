import { test } from '@playwright/test';

/**
 * This file contains tests that confirm our main site, https://shopcanal.com, is up and
 * running as intended. Just the basics.
 */

// Maps screenshot names to the path that should be rendered into that screenshot name
const SCREENSHOTS: Record<string, string> = {
  homepage: 'https://shopcanal.com/',
  privacy: 'https://shopcanal.com/privacy',
  terms: 'https://shopcanal.com/terms',
};

test.describe.configure({ mode: 'parallel' });

test('Home - take screenshots', async ({ page }) => {
  for (const screenshotName of Object.keys(SCREENSHOTS)) {
    await page.goto(SCREENSHOTS[screenshotName]);
    await page.screenshot({ path: `screenshots/${screenshotName}.png`, fullPage: true });
  }
});
