import { expect, test } from '@playwright/test';
import {
  logInSuccessfully,
  LOGIN_BUTTON_SELECTOR,
  LOGIN_EMAIL_INPUT_SELECTOR,
  LOGIN_PASSWORD_INPUT_SELECTOR,
} from '../helpers/login';
import { LOGIN_PAGE } from '../helpers/routes';

/**
 * This file contains tests that confirm our login page at /login works correctly.
 */

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
    await logInSuccessfully(page);
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
    await page.click(LOGIN_BUTTON_SELECTOR);

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
    const button = await page.$(LOGIN_BUTTON_SELECTOR);

    // Check if the button is disabled
    if (button) expect(await button.isDisabled()).toBeTruthy();
  });
});
