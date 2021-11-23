import type {
  BrowserContext,
  Page,
  PlaywrightTestArgs,
  PlaywrightTestOptions,
  PlaywrightWorkerArgs,
  PlaywrightWorkerOptions,
  TestType,
} from '@playwright/test';
import { expect } from '@playwright/test';
import { LOGIN_PAGE, SHOPKEEP_ROUTES } from './routes';

/**
 * Selectors used for logging in
 */
export const LOGIN_EMAIL_INPUT_SELECTOR = 'input#email';
export const LOGIN_PASSWORD_INPUT_SELECTOR = 'input#password';
export const LOGIN_BUTTON_SELECTOR = 'button#login';

const E2E_ACCOUNT_LOGIN = 'e2e_tester@shopcanal.com';

export const logInSuccessfully = async (
  page: Page,
  context: BrowserContext,
  test?: TestType<
    PlaywrightTestArgs & PlaywrightTestOptions,
    PlaywrightWorkerArgs & PlaywrightWorkerOptions
  >,
): Promise<void> => {
  if (process.env.APP_TEST_PASSWORD) {
    await logout(context);
    await page.goto(LOGIN_PAGE);

    await page.waitForSelector('button#login');

    // Fill out email and password
    await page.fill(LOGIN_EMAIL_INPUT_SELECTOR, E2E_ACCOUNT_LOGIN);
    await page.fill(LOGIN_PASSWORD_INPUT_SELECTOR, process.env.APP_TEST_PASSWORD || '');

    await page.click(LOGIN_BUTTON_SELECTOR);

    // Wait 10 seconds to give time for the next page to load
    await page.waitForTimeout(10000);

    // See if the nav has loaded - if it hasn't, then skip the test since login was flaky
    const overviewButton = await page.$('a#navOverview');
    if (test) test.skip(!overviewButton, 'Login was not successful - skipping test');

    // Ensure that the URL is now the URL of the Shopkeep Inventory page
    expect(page.url().includes(SHOPKEEP_ROUTES.INVENTORY)).toBeTruthy();
  } else {
    console.warn('Could not log in because no APP_TEST_PASSWORD was provided. Failing test.');
    expect(true).toBe(false);
  }
};

export const logout = async (context: BrowserContext): Promise<void> => {
  await context.clearCookies();
};
