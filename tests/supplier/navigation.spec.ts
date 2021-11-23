import { expect, test } from '@playwright/test';
import { logInSuccessfully, logout } from '../../helpers/login';
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
    await logInSuccessfully(page, context, test);

    // Navigate to the overview page of the Supplier app
    await page.goto(SUPPLIER_ROUTES.OVERVIEW);
    await page.waitForSelector('text=Welcome to Canal');
  });

  test.afterEach(async ({ context }) => {
    await logout(context);
  });

  test('renders the SUP Overview page', async ({ page }) => {
    await page.waitForSelector('text=Welcome to Canal');
    await page.waitForSelector('text=The status of products listed on Canal is shown here.');
    await page.waitForSelector('text=The percentage of each sale your storefront partners keep.');
    await page.waitForSelector("text=View Canal's terms and conditions here at any time.");
  });

  test('can navigate successfully to the Settings page from the Settings tab', async ({ page }) => {
    // Click the Settings link in the nav
    await page.click('button#Settings');

    await page.waitForSelector('text=Commission Rate');
    await page.waitForSelector('text=Email address');
    await page.waitForSelector('text=Logo & description');

    // Ensure that the URL is for the SUP settings page
    expect(page.url().includes(SUPPLIER_ROUTES.SETTINGS)).toBeTruthy();
  });

  test('can navigate successfully to the Inventory page from the Inventory tab', async ({
    page,
  }) => {
    // Click the Inventory link in the nav
    await page.click('button#Inventory');

    await page.waitForSelector(
      'text=These products are available on Canal so storefronts can request to sell.',
    );
    await page.waitForSelector(
      'text=Add unlisted products to Canal so storefronts can request to sell.',
    );

    // Ensure that the URL is for the SUP inventory page
    expect(page.url().includes(SUPPLIER_ROUTES.INVENTORY)).toBeTruthy();
  });

  test('can navigate successfully to the Discover page from the Discover tab', async ({ page }) => {
    // Click the Discover link in the nav
    await page.click('button#Discover');

    await page.waitForSelector(
      "text=Pre-approve storefronts so that they don't need to request. You can choose which products to approve.",
    );

    // Ensure that the URL is for the SUP discover page
    expect(page.url().includes(SUPPLIER_ROUTES.DISCOVER)).toBeTruthy();
  });

  test('can navigate successfully to the Requests page from the Requests tab', async ({ page }) => {
    // Click the Requests link in the nav
    await page.click('button#Requests');

    // Expect to see the four tabs for filtering requests
    await page.waitForSelector('button#All-requests-tab');
    await page.waitForSelector('button#Approved-requests-tab');
    await page.waitForSelector('button#Pending-requests-tab');
    await page.waitForSelector('button#Rejected-requests-tab');

    // Ensure that the URL is for the SUP Requests page
    expect(page.url().includes(SUPPLIER_ROUTES.REQUESTS)).toBeTruthy();
  });
});
