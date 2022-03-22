import { expect, test } from '@playwright/test';
import { logIntoSupplier, logout } from '../../helpers/login';
import { SUPPLIER_ROUTES } from '../../helpers/routes';

/**
 * This file contains tests that confirm we can successfully navigate around the
 * SUP app using the top nav
 */

test.describe('Supplier Navigation', () => {
  /**
   * We need to be logged in for each test, so we should log in before this test suite runs.
   */
  test.beforeEach(async ({ page, context }) => {
    await logIntoSupplier(page, context);

    // Navigate to the overview page of the Supplier app
    await page.goto(SUPPLIER_ROUTES.OVERVIEW);
    const locator = page.locator('text=Welcome to Canal');
    await locator.waitFor();
    await page.waitForLoadState('networkidle');
  });

  test.afterEach(async ({ context }) => {
    await logout(context);
  });

  test('renders the SUP Overview page', async ({ page }) => {
    let locator = page.locator('text=Welcome to Canal');
    await locator.waitFor();
    locator = page.locator('text=The status of products listed on Canal is shown here.');
    await locator.waitFor();
    locator = page.locator('text=The percentage of each sale your storefront partners keep.');
    await locator.waitFor();
    locator = page.locator("text=View Canal's terms and conditions here at any time.");
    await locator.waitFor();
  });

  test('can navigate successfully to the Settings page from the Settings tab', async ({ page }) => {
    // Click the Settings link in the nav
    await page.click('button#Settings');

    let locator = page.locator('text=Commission Rate');
    await locator.waitFor();
    locator = page.locator('text=Email address');
    await locator.waitFor();
    locator = page.locator('text=Logo & description');
    await locator.waitFor();

    // Ensure that the URL is for the SUP settings page
    expect(page.url().includes(SUPPLIER_ROUTES.SETTINGS)).toBeTruthy();
  });

  test('can navigate successfully to the Inventory page from the Inventory tab', async ({
    page,
  }) => {
    // Click the Inventory link in the nav
    await page.click('button#Inventory');

    let locator = page.locator(
      'text=These products are available on Canal so storefronts can request to sell.',
    );
    await locator.waitFor();
    locator = page.locator(
      'text=Add unlisted products to Canal so storefronts can request to sell.',
    );
    await locator.waitFor();

    // Ensure that the URL is for the SUP inventory page
    expect(page.url().includes(SUPPLIER_ROUTES.INVENTORY)).toBeTruthy();
  });

  test('can navigate successfully to the Discover page from the Discover tab', async ({ page }) => {
    // Click the Discover link in the nav
    await page.click('button#Discover');

    const locator = page.locator(
      "text=Pre-approve storefronts so that they don't need to request. You can choose which products to approve.",
    );
    await locator.waitFor();

    // Ensure that the URL is for the SUP discover page
    expect(page.url().includes(SUPPLIER_ROUTES.DISCOVER)).toBeTruthy();
  });

  test('can navigate successfully to the Requests page from the Requests tab', async ({ page }) => {
    // Click the Requests link in the nav
    await page.click('button#Requests');

    // Expect to see the four tabs for filtering requests
    let locator = page.locator('button#All-requests-tab');
    await locator.waitFor();
    locator = page.locator('button#Approved-requests-tab');
    await locator.waitFor();
    locator = page.locator('button#Pending-requests-tab');
    await locator.waitFor();
    locator = page.locator('button#Rejected-requests-tab');
    await locator.waitFor();

    // Ensure that the URL is for the SUP Requests page
    expect(page.url().includes(SUPPLIER_ROUTES.REQUESTS)).toBeTruthy();
  });
});
