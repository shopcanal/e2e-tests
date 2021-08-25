import { expect, test } from '@playwright/test';

/**
 * This file contains tests that confirm our login page at /login works correctly.
 */

/**
 * URLs used in this test file
 */
const LOGIN_PAGE = 'https://develop.shopcanal.com/login';
const INVENTORY_PAGE = 'https://develop.shopcanal.com/shopkeep/inventory?page=1';

/**
 * Selectors used in this test file
 */
const EMAIL_INPUT_SELECTOR = 'input#email';
const PASSWORD_INPUT_SELECTOR = 'input#password';
const BUTTON_SELECTOR = 'button#login';

test.describe('Login', () => {
  /**
   * Every test in this file initially loads the /login page, so we can just
   * do that in a beforeEach instead of doing it in each test
   */
  test.beforeEach(async ({ page }) => {
    await page.goto(LOGIN_PAGE);
  });

  /**
   * Tests that the user can fill out the email and password inputs, then
   * click login and be redirected to the app
   */
  test('can fill out valid email and password and successfully log in', async ({ page }) => {
    if (process.env.APP_TEST_PASSWORD) {
      // Fill out email and password
      await page.fill(EMAIL_INPUT_SELECTOR, 'clay+canalshopkeep@shopcanal.com');
      await page.fill(PASSWORD_INPUT_SELECTOR, process.env.APP_TEST_PASSWORD || '');

      // Click the login button
      await page.click(BUTTON_SELECTOR);

      // Wait for the page to change by checking for the "Overview" text
      await page.waitForSelector('text=Overview');

      // Ensure that the URL is now the URL of the Inventory page
      expect(page.url()).toBe(INVENTORY_PAGE);
    } else {
      console.log('Could not log in because no APP_TEST_PASSWORD was provided');
    }
  });

  /**
   * Tests that we display an error and keep the user on the login page if
   * invalid credentials are provided
   */
  test('displays error message when incorrect credentials are provided', async ({ page }) => {
    // Fill out email and password
    await page.fill(EMAIL_INPUT_SELECTOR, 'invalidlogin@shopcanal.com');
    await page.fill(PASSWORD_INPUT_SELECTOR, 'notarealaccountpassword');

    // Click the login button
    await page.click(BUTTON_SELECTOR);

    // Wait for the error to display
    await page.waitForSelector('text=Failed to log in');

    // Ensure that the URL is still the login page
    expect(page.url()).toBe(LOGIN_PAGE);
  });

  /**
   * Tests that the login button is disabled when the email and password
   * inputs are empty.
   */
  test('button cannot be clicked if email and password are not filled out', async ({ page }) => {
    // Get the login button element
    const button = await page.$(BUTTON_SELECTOR);

    // Check if the button is disabled
    if (button) expect(await button.isDisabled()).toBeTruthy();
  });
});
