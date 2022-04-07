import type { BrowserContext, Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { SHOPKEEP_ROUTES, SUPPLIER_ROUTES } from './routes';

/**
 * Selectors used for logging in
 */
export const LOGIN_EMAIL_INPUT_SELECTOR = 'input#email';
export const LOGIN_PASSWORD_INPUT_SELECTOR = 'input#password';
export const LOGIN_BUTTON_SELECTOR = 'button#login';

const E2E_ACCOUNT_LOGIN = 'e2e_tester@shopcanal.com';

/**
 * Use this to log a user in and make sure they land on a given page.
 *
 * @param loginUrl
 * @param firstLoggedInPageUrl When passed, check that the user lands on this page.
 */
const logIn = async (
  page: Page,
  context: BrowserContext,
  loginUrl: string,
  firstLoggedInPageUrl: string | null = null,
): Promise<void> => {
  const loginButton = page.locator(LOGIN_BUTTON_SELECTOR);
  const profileDropdown = page.locator('button:has-text("e2e_tester")');

  if (!process.env.APP_TEST_PASSWORD) {
    console.warn('Could not log in because no APP_TEST_PASSWORD was provided. Failing test.');
    expect(true).toBe(false);
  }

  // Make sure browser is logged out before attempting to go through login flow
  await logout(page, context);

  // Navigate to login page and wait for login button to load
  await page.goto(loginUrl);
  await loginButton.waitFor();

  // Fill out email and password
  await page.fill(LOGIN_EMAIL_INPUT_SELECTOR, E2E_ACCOUNT_LOGIN);
  await page.fill(LOGIN_PASSWORD_INPUT_SELECTOR, process.env.APP_TEST_PASSWORD || '');

  // Then click the login button and make sure we navigate
  await loginButton.click();

  // Make sure the profile dropdown shows, as this appears on both sides once logged in
  await profileDropdown.waitFor();

  // Make sure we're no longer in the login
  expect(page.url().includes(loginUrl)).toBeFalsy();

  // Make sure this is the page we want
  if (firstLoggedInPageUrl) {
    expect(page.url().includes(firstLoggedInPageUrl)).toBeTruthy();
  }
};

/**
 * Logs a user into the shopkeep landing page
 */
export const logIntoShopkeep = async (page: Page, context: BrowserContext): Promise<void> =>
  logIn(page, context, SHOPKEEP_ROUTES.LOGIN);

/**
 * Logs a user into the supplier landing page
 */
export const logIntoSupplier = async (page: Page, context: BrowserContext): Promise<void> =>
  logIn(page, context, SUPPLIER_ROUTES.LOGIN, SUPPLIER_ROUTES.OVERVIEW);

/**
 * Simulates a log out by clearing cookies. On next page nav, we'll refresh.
 */
export const logout = async (page: Page, context: BrowserContext): Promise<void> => {
  await context.clearCookies();
};
