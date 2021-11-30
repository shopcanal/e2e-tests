import { test } from '@playwright/test';
import { logInSuccessfully, logout } from '../../helpers/login';

/**
 * This file contains tests that confirm we can successfully navigate around the
 * SK app using the left-hand nav
 */

test.describe('Shopkeep Navigation', () => {
  /**
   * We need to be logged in for each test, so we should log in before this test suite runs.
   */
  test.beforeEach(async ({ context, page }) => {
    await logInSuccessfully(page, context, test);
  });

  test.afterEach(async ({ context }) => {
    await logout(context);
  });

  // test('can navigate successfully to the Inventory page from the Overview tab', async ({
  //   page,
  // }) => {
  //   // Click the Overview link in the nav
  //   await page.click('#navOverview');

  //   await page.waitForSelector('text=Inventory');

  //   // Ensure that the URL is for the SK inventory page
  //   expect(page.url().includes(SHOPKEEP_ROUTES.INVENTORY)).toBeTruthy();
  // });

  // test('can navigate successfully to the Discover page from the Discover tab', async ({
  //   page,
  //   browserName,
  // }) => {
  //   test.skip(browserName === 'webkit', 'Flaky test on webkit - skipping for now');

  //   // Click the Discover link in the nav
  //   await page.click('#navDiscover');

  //   await page.waitForSelector('text=Discover');

  //   // Ensure that the URL is for the SK discover page
  //   expect(page.url().includes(SHOPKEEP_ROUTES.DISCOVER)).toBeTruthy();
  // });

  // test('can navigate successfully to the Requests page from the Requests tab', async ({
  //   page,
  //   browserName,
  // }) => {
  //   test.skip(browserName === 'webkit', 'Flaky test on webkit - skipping for now');

  //   // Click the Requests link in the nav
  //   await page.click('#navRequests');

  //   await page.waitForSelector('text=Requests');

  //   // Ensure that the URL is for the SK requests page
  //   expect(page.url().includes(SHOPKEEP_ROUTES.REQUESTS)).toBeTruthy();
  // });

  // test('can navigate successfully to the Orders page from the Orders tab', async ({
  //   page,
  //   browserName,
  // }) => {
  //   test.skip(browserName === 'webkit', 'Flaky test on webkit - skipping for now');

  //   // Click the Orders link in the nav
  //   await page.click('#navOrders');

  //   await page.waitForSelector("text=This is where you'll see your Orders");

  //   // Ensure that the URL is for the SK orders page
  //   expect(page.url().includes(SHOPKEEP_ROUTES.ORDERS)).toBeTruthy();
  // });

  // test('can navigate successfully to the Settings page from the Settings tab', async ({ page }) => {
  //   // Click the Settings link in the nav
  //   await page.click('#navSettings');

  //   await page.waitForSelector('text=Email address');

  //   // Ensure that the URL is for the SK settings page
  //   expect(page.url()).toBe(SHOPKEEP_ROUTES.SETTINGS);
  // });

  // test('can navigate successfully to the FAQ page from the FAQ tab', async ({ page }) => {
  //   // Click the FAQ link in the nav
  //   await page.click('#navFAQ');

  //   await page.waitForSelector('text=Frequently Asked Questions');

  //   // Ensure that the URL is for the SK FAQ page
  //   expect(page.url()).toBe(SHOPKEEP_ROUTES.FAQ);
  // });
});
