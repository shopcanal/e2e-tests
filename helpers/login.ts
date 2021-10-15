import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { LOGIN_PAGE, SK_INVENTORY_PAGE } from './routes';

/**
 * Selectors used for logging in
 */
export const LOGIN_EMAIL_INPUT_SELECTOR = 'input#email';
export const LOGIN_PASSWORD_INPUT_SELECTOR = 'input#password';
export const LOGIN_BUTTON_SELECTOR = 'button#login';

const E2E_ACCOUNT_LOGIN = 'e2e_tester@shopcanal.com';

export const logInSuccessfully = async (page: Page): Promise<void> => {
  if (process.env.APP_TEST_PASSWORD) {
    await page.goto(LOGIN_PAGE);

    // Fill out email and password
    // await page.fill(LOGIN_EMAIL_INPUT_SELECTOR, 'clay+canalshopkeep@shopcanal.com');
    await page.fill(LOGIN_EMAIL_INPUT_SELECTOR, E2E_ACCOUNT_LOGIN);
    await page.fill(LOGIN_PASSWORD_INPUT_SELECTOR, process.env.APP_TEST_PASSWORD || '');

    // Click the login button
    await page.click(LOGIN_BUTTON_SELECTOR);

    // Wait for the page to change by checking for the "Overview" text
    await page.waitForSelector('text=Overview');

    // Ensure that the URL is now the URL of the Shopkeep Inventory page
    expect(page.url().includes(SK_INVENTORY_PAGE)).toBeTruthy();
  } else {
    console.warn('Could not log in because no APP_TEST_PASSWORD was provided. Failing test.');
    expect(true).toBe(false);
  }
};
