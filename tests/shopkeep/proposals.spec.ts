import { expect, test } from '@playwright/test';
import { logIntoShopkeep, logout } from '../../helpers/login';
import { SHOPKEEP_ROUTES } from '../../helpers/routes';

test.describe.configure({ mode: 'parallel' });

/**
 * This file contains tests that verify the Proposals pages are working
 * as intended
 */

const ITEM_SELECTOR = 'button:has-text("Ee2e_testerYou edited the proposal.")';
const ALL_FILTER = 'button:has-text("All")';
const PENDING_FILTER = 'button:has-text("Pending")';
const APPROVED_FILTER = 'button:has-text("Approved")';

test.describe('Shopkeep Proposals', () => {
  /**
   * We need to be logged in for each test, so we should log in before each one
   * and then navigate to the Discover page
   */
  test.beforeEach(async ({ context, page }) => {
    await logIntoShopkeep(page, context);
    await page.goto(SHOPKEEP_ROUTES.PROPOSALS);

    expect(page.url().includes(SHOPKEEP_ROUTES.PROPOSALS)).toBeTruthy();

    // Wait for the request data to load before continuing
    await page.waitForLoadState('networkidle');
  });

  test.afterEach(async ({ context }) => {
    await logout(context);
  });

  test('display a proposal and buttons for filtering by status', async ({ page }) => {
    const filters = [
      page.locator(ALL_FILTER),
      page.locator(PENDING_FILTER),
      page.locator(APPROVED_FILTER),
    ];
    const proposal = page.locator(ITEM_SELECTOR);

    // Make sure we have one proposal and the three filter buttons
    await proposal.waitFor();
    await Promise.all(filters.map((filter) => filter.waitFor()));
  });

  test('clicking the Pending filter shows one pending request', async ({ page }) => {
    const tab = page.locator(PENDING_FILTER);
    const item = page.locator(ITEM_SELECTOR);

    // Click the filter and make sure we navigate
    await Promise.all([tab.click(), page.waitForLoadState('networkidle')]);

    // Check that there is one list item still
    await item.waitFor();
  });

  test('clicking the Approved filter shows no requests', async ({ page }) => {
    const tab = page.locator(APPROVED_FILTER);
    const item = page.locator(ITEM_SELECTOR);

    // Click the filter and make sure we navigate
    await Promise.all([tab.click(), page.waitForLoadState('networkidle')]);

    // Make sure there's no list item
    await item.waitFor({ state: 'detached' });
  });

  test('clicking the Approved filter shows no requests, then clicking All shows one request', async ({
    page,
  }) => {
    const allTab = page.locator(ALL_FILTER);
    const tab = page.locator(APPROVED_FILTER);
    const item = page.locator(ITEM_SELECTOR);

    // Click the filter and make sure we navigate and there's no item
    await Promise.all([tab.click(), page.waitForLoadState('networkidle')]);
    await item.waitFor({ state: 'detached' });

    // Navigate back to all and make sure there's an item back
    await Promise.all([allTab.click(), page.waitForLoadState('networkidle')]);
    await item.waitFor();
  });

  // TODO: click on the line item action buttons and test the request response pages
});
