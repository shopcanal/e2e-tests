import { expect, test } from '@playwright/test';
import {
  logIntoShopkeep,
  logIntoSupplier,
  LOGIN_BUTTON_SELECTOR,
  LOGIN_EMAIL_INPUT_SELECTOR,
  LOGIN_PASSWORD_INPUT_SELECTOR,
} from '../helpers/login';
import { SHOPKEEP_ROUTES } from '../helpers/routes';

test.describe.configure({ mode: 'parallel' });

/**
 * This file contains tests that confirm our login page at /login works correctly.
 */

test.describe('Login', () => {
  /**
   * Every test in this file initially loads the /login page, so we can just
   * do that in a beforeEach instead of doing it in each test
   */
  test.beforeEach(async ({ page }) => {
    await page.goto(SHOPKEEP_ROUTES.LOGIN, { waitUntil: 'networkidle' });
  });

  /**
   * Tests that the user can fill out the email and password inputs, then
   * click login and be redirected to the app
   */
  test('valid email and password logs us into Shopkeep', async ({ context, page }) => {
    await logIntoShopkeep(page, context);
  });

  /**
   * Tests that the user can fill out the email and password inputs, then
   * click login and be redirected to the app
   */
  test('valid email and password logs us into Supplier', async ({ context, page }) => {
    await logIntoSupplier(page, context);
  });

  /**
   * Tests that we display an error and keep the user on the login page if
   * invalid credentials are provided
   */
  test('displays error message when incorrect credentials are provided', async ({ page }) => {
    // Fill out email and password
    await page.fill(LOGIN_EMAIL_INPUT_SELECTOR, 'invalidlogin@shopcanal.com');
    await page.fill(LOGIN_PASSWORD_INPUT_SELECTOR, 'notarealaccountpassword');

    // Click the login button
    const loginButton = page.locator(LOGIN_BUTTON_SELECTOR);
    await loginButton.click();

    // Wait for the error to display
    const locator = page.locator('text=Failed to log in');
    await locator.waitFor();

    // Ensure that the URL is still the login page
    expect(page.url()).toBe(SHOPKEEP_ROUTES.LOGIN);
  });

  /**
   * Tests that the login button is disabled when the email and password
   * inputs are empty.
   */
  test('button cannot be clicked if email and password are not filled out', async ({ page }) => {
    // Get the login button element
    const button = page.locator(LOGIN_BUTTON_SELECTOR);

    // Make sure button is disabled
    expect(await button.isDisabled()).toBeTruthy();
  });
});
