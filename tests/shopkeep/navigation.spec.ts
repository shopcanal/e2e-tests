import { expect, test } from '@playwright/test';
import { logIntoShopkeep, logout } from '../../helpers/login';
import { SHOPKEEP_ROUTES } from '../../helpers/routes';

/**
 * This file contains tests that confirm we can successfully navigate around the
 * SK app using the left-hand nav
 */

test.describe('Shopkeep Navigation', () => {
  /**
   * We need to be logged in for each test, so we should log in before this test suite runs.
   */
  test.beforeEach(async ({ context, page }) => {
    await logIntoShopkeep(page, context);
    await page.waitForLoadState('networkidle');
  });

  test.afterEach(async ({ context }) => {
    await logout(context);
  });

  test('can navigate successfully to the Inventory page from the Overview tab', async ({
    page,
  }) => {
    // Click the Overview link in the nav
    await page.click('#navOverview');

    const locator = page.locator('text=Inventory');
    await locator.waitFor();

    // Ensure that the URL is for the SK inventory page
    expect(page.url().includes(SHOPKEEP_ROUTES.INVENTORY)).toBeTruthy();
  });

  test('can navigate successfully to the Discover page from the Discover tab', async ({ page }) => {
    // Click the Discover link in the nav
    await page.click('#navDiscover');

    const locator = page.locator('text=Discover');
    await locator.waitFor();

    // Ensure that the URL is for the SK discover page
    expect(page.url().includes(SHOPKEEP_ROUTES.DISCOVER)).toBeTruthy();
  });

  test('can navigate successfully to the Requests page from the Requests tab', async ({ page }) => {
    // Click the Requests link in the nav
    await page.click('#navRequests');

    const locator = page.locator('text=Requests');
    await locator.waitFor();

    // Ensure that the URL is for the SK requests page
    expect(page.url().includes(SHOPKEEP_ROUTES.REQUESTS)).toBeTruthy();
  });

  test('can navigate successfully to the Orders page from the Orders tab', async ({ page }) => {
    // Click the Orders link in the nav
    await page.click('#navOrders');

    const locator = page.locator("text=This is where you'll see your Orders");
    await locator.waitFor();

    // Ensure that the URL is for the SK orders page
    expect(page.url().includes(SHOPKEEP_ROUTES.ORDERS)).toBeTruthy();
  });

  test('can navigate successfully to the Settings page from the Settings tab', async ({ page }) => {
    // Click the Settings link in the nav
    await page.click('#navSettings');

    const locator = page.locator('text=Email address');
    await locator.waitFor();

    // Ensure that the URL is for the SK settings page
    expect(page.url()).toBe(SHOPKEEP_ROUTES.SETTINGS);
  });

  test('can navigate successfully to the FAQ page from the FAQ tab', async ({ page }) => {
    // Click the FAQ link in the nav
    await page.click('#navFAQ');

    const locator = page.locator('text=Frequently Asked Questions');
    await locator.waitFor();

    // Ensure that the URL is for the SK FAQ page
    expect(page.url()).toBe(SHOPKEEP_ROUTES.FAQ);
  });
});
