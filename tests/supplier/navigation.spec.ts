import { expect, test } from '@playwright/test';
import { logIntoSupplier } from '../../helpers/login';
import { SHOPKEEP_ROUTES, SUPPLIER_ROUTES } from '../../helpers/routes';

test.describe.configure({ mode: 'parallel' });

/**
 * This file contains tests that confirm we can successfully navigate around the
 * SUP app using the top nav
 */

test.describe('Supplier Navigation', () => {
  /**
   * We need to be logged in for each test, so we should log in before this test suite runs.
   */
  test.beforeEach(async ({ page, context }) => {
    await logIntoSupplier(page, context);
  });

  test('renders the SUP Overview page', async ({ page }) => {
    const items = [
      page.locator('text="Welcome to Canal"'),
      page.locator(
        'text="Manage the availability of your products on Canal so that Storefronts can start selling."',
      ),
      page.locator('text="Terms and conditions"'),
    ];
    await Promise.all(items.map((item) => item.waitFor()));
  });

  test('can navigate to Overview from Discover', async ({ page }) => {
    const tab = page.locator('button >> text=Overview');
    const result = page.locator('text="Welcome to Canal"');

    // We start on the Overview page so navigate to Discover
    await page.goto(SUPPLIER_ROUTES.DISCOVER);
    await tab.waitFor();
    expect(page.url().includes(SUPPLIER_ROUTES.DISCOVER)).toBeTruthy();

    // Navigate back to Overview
    await tab.click();
    await result.waitFor();

    // Ensure that the URL is for the SUP inventory page
    expect(page.url().includes(SUPPLIER_ROUTES.OVERVIEW)).toBeTruthy();
  });

  test('can navigate to Discover from Overview', async ({ page }) => {
    const tab = page.locator('button >> text=Discover');
    const result = page.locator(
      'text="Pre-approve storefronts so that they don\'t need to request. You can choose which products to approve."',
    );

    // Navigate via clicking the tab in the nav
    expect(page.url().includes(SUPPLIER_ROUTES.OVERVIEW)).toBeTruthy();
    await tab.click();
    await result.waitFor();

    // Ensure that the URL is for the SUP discover page
    expect(page.url().includes(SUPPLIER_ROUTES.DISCOVER)).toBeTruthy();
  });

  test('can navigate to Inventory from Overview', async ({ page }) => {
    const tab = page.locator('button >> text=Inventory');
    const result = page.locator('text="All of your active products in Shopify are listed here."');

    // Navigate via clicking the tab in the nav
    expect(page.url().includes(SUPPLIER_ROUTES.OVERVIEW)).toBeTruthy();
    await tab.click();
    await result.waitFor();

    // Ensure that the URL is for the SUP inventory page
    expect(page.url().includes(SUPPLIER_ROUTES.INVENTORY)).toBeTruthy();
  });

  test('can navigate to Storefronts from Overview', async ({ page }) => {
    const tab = page.locator('button >> text="My Storefronts"');
    const result = page.locator('text="1 Storefront"');

    // Navigate via clicking the tab in the nav
    expect(page.url().includes(SUPPLIER_ROUTES.OVERVIEW)).toBeTruthy();
    await tab.click();
    await result.waitFor();

    // Ensure that the URL is for the SUP storefronts page
    expect(page.url().includes(SUPPLIER_ROUTES.STOREFRONTS)).toBeTruthy();
  });

  test('can navigate to Proposals from Overview', async ({ page }) => {
    const tab = page.locator('button >> text=Proposals');
    const result = page.locator('text="Proposal from e2e_tester"');

    // Navigate via clicking the tab in the nav
    expect(page.url().includes(SUPPLIER_ROUTES.OVERVIEW)).toBeTruthy();
    await tab.click();
    await result.waitFor();

    // Ensure that the URL is for the SUP proposals page
    expect(page.url().includes(SUPPLIER_ROUTES.PROPOSALS)).toBeTruthy();
  });

  test('can navigate to Settings via dropdown', async ({ page }) => {
    // The button that has the user's name is the dropdown in the upper right to log out
    const profileDropdown = page.locator('button:has-text("e2e_tester")');
    const button = page.locator('button:has-text("Settings")');
    const result = page.locator(
      'text="Set the percentage you wish to give to your Storefront partners. You can change this at any time."',
    );

    expect(page.url().includes(SUPPLIER_ROUTES.OVERVIEW)).toBeTruthy();

    // Open the profile dropdown then click the button
    await profileDropdown.click();
    await button.click();
    await result.waitFor();

    // Ensure that the URL is for the settings page
    expect(page.url().includes(SUPPLIER_ROUTES.SETTINGS)).toBeTruthy();
  });

  test('can log out via dropdown', async ({ page }) => {
    // The button that has the user's name is the dropdown in the upper right to log out
    const profileDropdown = page.locator('button:has-text("e2e_tester")');
    const button = page.locator('button:has-text("Log Out")');
    const result = page.locator('button#login');

    expect(page.url().includes(SUPPLIER_ROUTES.OVERVIEW)).toBeTruthy();

    // Open the profile dropdown then click the button
    await profileDropdown.click();
    await button.click();
    await result.waitFor();

    // Ensure that the URL is for the login page (uses the shopkeep URL, not the supplier one!!)
    expect(page.url().includes(SHOPKEEP_ROUTES.LOGIN)).toBeTruthy();
  });

  test('can navigate to invite brands modal via dropdown', async ({ page }) => {
    const profileDropdown = page.locator('button:has-text("e2e_tester")');
    const button = page.locator('button:has-text("Invite a Brand")');
    const result = page.locator('text="Invite brands to join the Canal network"');

    expect(page.url().includes(SUPPLIER_ROUTES.OVERVIEW)).toBeTruthy();

    // Open the profile dropdown then click the button
    await profileDropdown.click();
    await button.click();
    await result.waitFor();

    // Make sure we haven't navigated but the dropdown is visible but now closed
    await profileDropdown.waitFor();
    await button.waitFor({ state: 'detached' });
    expect(page.url().includes(SUPPLIER_ROUTES.OVERVIEW)).toBeTruthy();
  });

  test('can navigate to external FAQs via dropdown', async ({ page, context }) => {
    // The button that has the user's name is the dropdown in the upper right to log out
    const profileDropdown = page.locator('button:has-text("e2e_tester")');
    const button = page.locator('button:has-text("FAQs")');

    expect(page.url().includes(SUPPLIER_ROUTES.OVERVIEW)).toBeTruthy();

    // Open the profile dropdown then click the button (which opens a new page)
    await profileDropdown.click();
    const [newPage] = await Promise.all([context.waitForEvent('page'), button.click()]);

    // Ensure that the new page's URL is for the external FAQ page and the existing page didn't change
    expect(page.url().includes(SUPPLIER_ROUTES.OVERVIEW)).toBeTruthy();
    expect(newPage.url().includes('https://faq.shopcanal.com/en/')).toBeTruthy();
  });

  test('can navigate to external Switch to Storefront via dropdown', async ({ page, context }) => {
    // The button that has the user's name is the dropdown in the upper right to log out
    const profileDropdown = page.locator('button:has-text("e2e_tester")');
    const button = page.locator('button:has-text("Switch to Storefront")');

    expect(page.url().includes(SUPPLIER_ROUTES.OVERVIEW)).toBeTruthy();

    // Open the profile dropdown then click the button (which opens a new page)
    await profileDropdown.click();
    const [newPage] = await Promise.all([context.waitForEvent('page'), button.click()]);

    // Ensure that the new page's URL is for the external FAQ page and the existing page didn't change
    expect(page.url().includes(SUPPLIER_ROUTES.OVERVIEW)).toBeTruthy();
    expect(newPage.url().includes('https://apps.shopify.com/canal-for-storefronts')).toBeTruthy();
  });

  test('can navigate to external Give Feedback via dropdown', async ({ page, context }) => {
    // The button that has the user's name is the dropdown in the upper right to log out
    const profileDropdown = page.locator('button:has-text("e2e_tester")');
    const button = page.locator('button:has-text("Give feedback")');

    expect(page.url().includes(SUPPLIER_ROUTES.OVERVIEW)).toBeTruthy();

    // Open the profile dropdown then click the button (which opens a new page)
    await profileDropdown.click();
    const [newPage] = await Promise.all([context.waitForEvent('page'), button.click()]);

    // Ensure that the new page's URL is for the external FAQ page and the existing page didn't change
    expect(page.url().includes(SUPPLIER_ROUTES.OVERVIEW)).toBeTruthy();
    expect(
      newPage.url().includes('https://form.asana.com/?k=ZJZ2VpGVKmafm1ZSbF71jQ&d=1199691950954316'),
    ).toBeTruthy();
  });
});
