import { expect, test } from '@playwright/test';
import { logIntoShopkeep } from '../../helpers/login';
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
    // Look for the proposals text below the profile dropdown, not next to it
    const locator = page.locator(':below(button:has-text("e2e_tester")):text("Proposals")');

    await logIntoShopkeep(page, context);
    await page.goto(SHOPKEEP_ROUTES.PROPOSALS);
    await locator.waitFor();
    expect(page.url()).toEqual(SHOPKEEP_ROUTES.PROPOSALS);
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

  test('clicking the Pending filter still shows one pending request', async ({ page }) => {
    const tab = page.locator(PENDING_FILTER);
    const item = page.locator(ITEM_SELECTOR);
    await item.waitFor();

    // Click the filter
    await tab.click();

    // Check that there is one list item still
    await item.waitFor();
  });

  test('clicking the Approved filter shows no requests, then clicking All shows one request', async ({
    page,
  }) => {
    const allTab = page.locator(ALL_FILTER);
    const tab = page.locator(APPROVED_FILTER);
    const item = page.locator(ITEM_SELECTOR);

    // Click the filter and make sure we navigate and there's no item
    await item.waitFor();
    await tab.click();
    await item.waitFor({ state: 'detached' });

    // Navigate back to all and make sure there's an item back
    await allTab.click();
    await item.waitFor();
  });
});
