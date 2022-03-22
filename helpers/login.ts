import type { BrowserContext, Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { LOGIN_PAGE, SHOPKEEP_ROUTES, SUPPLIER_ROUTES } from './routes';

/**
 * Selectors used for logging in
 */
export const LOGIN_EMAIL_INPUT_SELECTOR = 'input#email';
export const LOGIN_PASSWORD_INPUT_SELECTOR = 'input#password';
export const LOGIN_BUTTON_SELECTOR = 'button#login';

const E2E_ACCOUNT_LOGIN = 'e2e_tester@shopcanal.com';

/**
 * Use this to log a user in and make sure they land on a given page.
 */
const logIn = async (
  page: Page,
  context: BrowserContext,
  firstLoggedInPageUrl: string,
): Promise<void> => {
  if (process.env.APP_TEST_PASSWORD) {
    // Make sure browser is logged out before attempting to go through login flow
    await logout(context);

    // Navigate to login page and wait for login button to load
    await page.goto(LOGIN_PAGE);
    await page.waitForSelector(LOGIN_BUTTON_SELECTOR);

    // Fill out email and password
    await page.fill(LOGIN_EMAIL_INPUT_SELECTOR, E2E_ACCOUNT_LOGIN);
    await page.fill(LOGIN_PASSWORD_INPUT_SELECTOR, process.env.APP_TEST_PASSWORD || '');

    // Then click the login button
    await page.click(LOGIN_BUTTON_SELECTOR);
    await page.waitForURL(firstLoggedInPageUrl);
  } else {
    console.warn('Could not log in because no APP_TEST_PASSWORD was provided. Failing test.');
    expect(true).toBe(false);
  }
};

/**
 * Logs a user into the shopkeep landing page
 */
export const logIntoShopkeep = async (page: Page, context: BrowserContext): Promise<void> =>
  logIn(page, context, SHOPKEEP_ROUTES.INVENTORY);

/**
 * Logs a user into the supplier landing page
 */
export const logIntoSupplier = async (page: Page, context: BrowserContext): Promise<void> =>
  logIn(page, context, SUPPLIER_ROUTES.OVERVIEW);

/**
 * Simulates a log out by clearing cookies. With a refresh, this should be enough
 * to fully log out.
 */
export const logout = async (context: BrowserContext): Promise<void> => {
  await context.clearCookies();
};
