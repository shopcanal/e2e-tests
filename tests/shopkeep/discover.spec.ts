import { test } from '@playwright/test';
import { logIntoShopkeep } from '../../helpers/login';
import { SHOPKEEP_ROUTES } from '../../helpers/routes';

test.describe.configure({ mode: 'parallel' });

/**
 * This file contains tests that verify the Discover pages are working
 * as intended
 */
test.describe('Shopkeep Discover', () => {
  /**
   * We need to be logged in for each test, so we should log in before each one
   * and then navigate to the Discover page
   */
  test.beforeEach(async ({ context, page }) => {
    await logIntoShopkeep(page, context);
    await page.goto(SHOPKEEP_ROUTES.DISCOVER, { waitUntil: 'networkidle' });
  });

  // TODO: add tests once this page is ready to be launched
});
