import { expect, test } from '@playwright/test';
import { logInSuccessfully } from '../helpers/login';
import { SK_FAQ_PAGE, SK_INVENTORY_PAGE, SK_SETTINGS_PAGE } from '../helpers/routes';

/**
 * This file contains tests that confirm we can successfully navigate around the
 * SK app using the left-hand nav
 */

test.describe('Navigation', () => {
  /**
   * We need to be logged in for each test, so we should log in before each one.
   */
  test.beforeEach(async ({ page }) => {
    await logInSuccessfully(page);
  });

  test('can navigate successfully to the Inventory page from the Overview tab', async ({
    page,
  }) => {
    // Click the Overview link in the nav
    await page.click('#navOverview');

    await page.waitForSelector('text=Inventory');

    // Ensure that the URL is for the SK inventory page
    expect(page.url().includes(SK_INVENTORY_PAGE)).toBeTruthy();
  });

  test('can navigate successfully to the Settings page from the Settings tab', async ({ page }) => {
    // Click the Settings link in the nav
    await page.click('#navSettings');

    await page.waitForSelector('text=Email address');

    // Ensure that the URL is for the SK settings page
    expect(page.url()).toBe(SK_SETTINGS_PAGE);
  });

  test('can navigate successfully to the FAQ page from the FAQ tab', async ({ page }) => {
    // Click the FAQ link in the nav
    await page.click('#navFAQ');

    await page.waitForSelector('text=Frequently Asked Questions');

    // Ensure that the URL is for the SK FAQ page
    expect(page.url()).toBe(SK_FAQ_PAGE);
  });
});
