import { test } from '@playwright/test';
import { intercept } from '../helpers/intercept';

test.beforeEach(async ({ page }) => intercept(page));

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

test('Home - take screenshots', async ({ page }) => {
  for (const screenshotName of Object.keys(SCREENSHOTS)) {
    await page.goto(SCREENSHOTS[screenshotName]);
    await page.screenshot({ path: `screenshots/${screenshotName}.png`, fullPage: true });
  }
});
