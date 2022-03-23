import { expect, test } from '@playwright/test';
import { logIntoSupplier, logout } from '../../helpers/login';
import { SUPPLIER_ROUTES } from '../../helpers/routes';

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
    await page.waitForLoadState('networkidle');
  });

  test.afterEach(async ({ context }) => {
    await logout(context);
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
    const discoverTab = page.locator('button >> text=Discover');
    const overviewTab = page.locator('button >> text=Overview');

    // We start on the Overview page so navigate to Discover to make sure we can get back
    expect(page.url().includes(SUPPLIER_ROUTES.OVERVIEW)).toBeTruthy();
    await Promise.all([discoverTab.click(), page.waitForNavigation()]);
    expect(page.url().includes(SUPPLIER_ROUTES.DISCOVER)).toBeTruthy();

    // Navigate back to Overview
    await Promise.all([overviewTab.click(), page.waitForNavigation()]);

    // Ensure that the URL is for the SUP inventory page
    expect(page.url().includes(SUPPLIER_ROUTES.OVERVIEW)).toBeTruthy();
  });

  test('can navigate to Discover from Overview', async ({ page }) => {
    const tab = page.locator('button >> text=Discover');

    // Navigate via clicking the tab in the nav
    expect(page.url().includes(SUPPLIER_ROUTES.OVERVIEW)).toBeTruthy();
    await Promise.all([tab.click(), page.waitForNavigation()]);

    // Ensure that the URL is for the SUP discover page
    expect(page.url().includes(SUPPLIER_ROUTES.DISCOVER)).toBeTruthy();
  });

  test('can navigate to Inventory from Overview', async ({ page }) => {
    const tab = page.locator('button >> text=Inventory');

    // Navigate via clicking the tab in the nav
    expect(page.url().includes(SUPPLIER_ROUTES.OVERVIEW)).toBeTruthy();
    await Promise.all([tab.click(), page.waitForNavigation()]);

    // Ensure that the URL is for the SUP inventory page
    expect(page.url().includes(SUPPLIER_ROUTES.INVENTORY)).toBeTruthy();
  });

  test('can navigate to Storefronts from Overview', async ({ page }) => {
    const tab = page.locator('button >> text="My Storefronts"');

    // Navigate via clicking the tab in the nav
    expect(page.url().includes(SUPPLIER_ROUTES.OVERVIEW)).toBeTruthy();
    await Promise.all([tab.click(), page.waitForNavigation()]);

    // Ensure that the URL is for the SUP storefronts page
    expect(page.url().includes(SUPPLIER_ROUTES.STOREFRONTS)).toBeTruthy();
  });

  test('can navigate to Proposals from Overview', async ({ page }) => {
    const tab = page.locator('button >> text=Proposals');

    // Navigate via clicking the tab in the nav
    expect(page.url().includes(SUPPLIER_ROUTES.OVERVIEW)).toBeTruthy();
    await Promise.all([tab.click(), page.waitForNavigation()]);

    // Ensure that the URL is for the SUP proposals page
    expect(page.url().includes(SUPPLIER_ROUTES.PROPOSALS)).toBeTruthy();
  });

  test('can navigate to Settings via dropdown', async ({ page }) => {
    // The button that has the user's name is the dropdown in the upper right to log out
    const profileDropdown = page.locator('button:has-text("e2e_tester")');
    const button = page.locator('button:has-text("Settings") >> nth=0');

    expect(page.url().includes(SUPPLIER_ROUTES.OVERVIEW)).toBeTruthy();

    // Open the profile dropdown then click the button
    await profileDropdown.click();
    await Promise.all([button.click(), page.waitForNavigation()]);

    // Ensure that the URL is for the settings page
    expect(page.url().includes(SUPPLIER_ROUTES.SETTINGS)).toBeTruthy();
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
});
