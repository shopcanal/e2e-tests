import { expect, test } from '@playwright/test';
import { logInSuccessfully, logout } from '../../helpers/login';
import { SHOPKEEP_ROUTES } from '../../helpers/routes';

/**
 * This file contains tests that verify the Request pages are working
 * as intended
 */

const LIST_ITEM_SELECTOR = 'li.Polaris-ResourceItem__ListItem';
const ALL_TAB_SELECTOR = 'button#All-requests-tab';
const APPROVED_TAB_SELECTOR = 'button#Approved-requests-tab';
const PENDING_TAB_SELECTOR = 'button#Pending-requests-tab';
const REJECTED_TAB_SELECTOR = 'button#Rejected-requests-tab';

test.describe('Shopkeep Requests', () => {
  /**
   * We need to be logged in for each test, so we should log in before each one
   * and then navigate to the Discover page
   */
  test.beforeEach(async ({ context, page }) => {
    await logInSuccessfully(page, context);
    await page.goto(SHOPKEEP_ROUTES.REQUESTS);

    expect(page.url().includes(SHOPKEEP_ROUTES.REQUESTS)).toBeTruthy();

    // Wait for the request data to load before continuing
    await page.waitForSelector('text=Showing 2 product requests');
  });

  test.afterEach(async ({ context }) => {
    await logout(context);
  });

  test('displays two requests and tabs for filtering requests by status', async ({ page }) => {
    // Check that there are two list items
    const requestLineItems = await page.$$(LIST_ITEM_SELECTOR);
    expect(requestLineItems.length).toBe(2);

    // Check that we have all four filtering buttons - All, Approved, Pending, Rejected
    await page.waitForSelector(ALL_TAB_SELECTOR);
    await page.waitForSelector(APPROVED_TAB_SELECTOR);
    await page.waitForSelector(PENDING_TAB_SELECTOR);
    await page.waitForSelector(REJECTED_TAB_SELECTOR);
  });

  test('clicking the Pending tab shows only one pending request', async ({ page }) => {
    // Click the "Pending" tab and make sure it is selected
    await page.click(PENDING_TAB_SELECTOR);

    // Wait for the request data to load before continuing
    await page.waitForSelector('text=Showing 1 product request');

    // Check that there is one list item
    const requestLineItems = await page.$$(LIST_ITEM_SELECTOR);
    expect(requestLineItems.length).toBe(1);
  });

  test('clicking the Rejected tab shows no requests, then clicking All shows two requests', async ({
    page,
  }) => {
    // Click the "Rejected" tab and wait for the empty state to appear
    await page.click(REJECTED_TAB_SELECTOR);
    await page.waitForSelector("text=This is where you'll view your requests");

    // Check that there are no list items
    let requestLineItems = await page.$$(LIST_ITEM_SELECTOR);
    expect(requestLineItems.length).toBe(0);

    // Click the "All" tab
    await page.click(ALL_TAB_SELECTOR);
    await page.waitForSelector('text=Showing 2 product requests');

    // Check that there are two list items
    requestLineItems = await page.$$(LIST_ITEM_SELECTOR);
    expect(requestLineItems.length).toBe(2);
  });

  // TODO: click on the line item action buttons and test the request response pages
});
