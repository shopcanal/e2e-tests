import { expect, test } from '@playwright/test';
import { logIntoShopkeep, logout } from '../../helpers/login';
import { LOGIN_PAGE, SHOPKEEP_ROUTES } from '../../helpers/routes';

test.describe.configure({ mode: 'parallel' });

/**
 * This file contains tests that confirm we can successfully navigate around the
 * SK app using the left-hand nav
 */

test.describe('Shopkeep Navigation', () => {
  /**
   * We need to be logged in for each test, so we should log in before this test suite runs.
   */
  test.beforeEach(async ({ context, page }) => {
    await logIntoShopkeep(page, context);
    await page.waitForLoadState('networkidle');
  });

  test.afterEach(async ({ context }) => {
    await logout(context);
  });

  test('can navigate to Inventory from Discover', async ({ page }) => {
    const discoverTab = page.locator('button >> text=Discover');
    const inventoryTab = page.locator('button >> text=Inventory');

    // We start on the Inventory page so navigate to Discover to make sure we can get back
    expect(page.url().includes(SHOPKEEP_ROUTES.INVENTORY)).toBeTruthy();
    await Promise.all([discoverTab.click(), page.waitForNavigation()]);
    expect(page.url().includes(SHOPKEEP_ROUTES.DISCOVER)).toBeTruthy();

    // Navigate back to Inventory
    await Promise.all([inventoryTab.click(), page.waitForNavigation()]);

    // Ensure that the URL is for the SK inventory page
    expect(page.url().includes(SHOPKEEP_ROUTES.INVENTORY)).toBeTruthy();
  });

  test('can navigate to Discover from Inventory', async ({ page }) => {
    const tab = page.locator('button >> text=Discover');

    // Navigate via clicking the tab in the nav
    expect(page.url().includes(SHOPKEEP_ROUTES.INVENTORY)).toBeTruthy();
    await Promise.all([tab.click(), page.waitForNavigation()]);

    // Ensure that the URL is for the SK discover page
    expect(page.url().includes(SHOPKEEP_ROUTES.DISCOVER)).toBeTruthy();
    await page.pause();
  });

  test('can navigate to Suppliers from Inventory', async ({ page }) => {
    const tab = page.locator('button >> text="My Suppliers"');

    // Navigate via clicking the tab in the nav
    expect(page.url().includes(SHOPKEEP_ROUTES.INVENTORY)).toBeTruthy();
    await Promise.all([tab.click(), page.waitForNavigation()]);

    // Ensure that the URL is for the SK suppliers page
    expect(page.url().includes(SHOPKEEP_ROUTES.SUPPLIERS)).toBeTruthy();
  });

  test('can navigate to Proposals from Inventory', async ({ page }) => {
    const tab = page.locator('button >> text="Proposals"');

    // Navigate via clicking the tab in the nav
    expect(page.url().includes(SHOPKEEP_ROUTES.INVENTORY)).toBeTruthy();
    await Promise.all([tab.click(), page.waitForNavigation()]);

    // Ensure that the URL is for the SK proposals page
    expect(page.url().includes(SHOPKEEP_ROUTES.PROPOSALS)).toBeTruthy();
  });

  test('can navigate to Invite from Inventory', async ({ page }) => {
    const tab = page.locator('button >> text="Invite a Brand"');

    // Navigate via clicking the tab in the nav
    expect(page.url().includes(SHOPKEEP_ROUTES.INVENTORY)).toBeTruthy();
    await Promise.all([tab.click(), page.waitForNavigation()]);

    // Ensure that the URL is for the SK invite page
    expect(page.url().includes(SHOPKEEP_ROUTES.INVITE)).toBeTruthy();
  });

  test('can log out via dropdown', async ({ page }) => {
    // The button that has the user's name is the dropdown in the upper right to log out
    const profileDropdown = page.locator('button:has-text("e2e_tester")');
    const button = page.locator('button:has-text("Log Out")');

    expect(page.url().includes(SHOPKEEP_ROUTES.INVENTORY)).toBeTruthy();

    // Open the profile dropdown then click the button
    await profileDropdown.click();
    await Promise.all([button.click(), page.waitForNavigation()]);

    // Ensure that the URL is for the login page
    expect(page.url().includes(LOGIN_PAGE)).toBeTruthy();
  });

  test('can navigate to Settings via dropdown', async ({ page }) => {
    // The button that has the user's name is the dropdown in the upper right to log out
    const profileDropdown = page.locator('button:has-text("e2e_tester")');
    const button = page.locator('button:has-text("Settings") >> nth=0');

    expect(page.url().includes(SHOPKEEP_ROUTES.INVENTORY)).toBeTruthy();

    // Open the profile dropdown then click the button
    await profileDropdown.click();
    await Promise.all([button.click(), page.waitForNavigation()]);

    // Ensure that the URL is for the settings page
    expect(page.url().includes(SHOPKEEP_ROUTES.SETTINGS)).toBeTruthy();
  });

  test('can navigate to external FAQs via dropdown', async ({ page, context }) => {
    // The button that has the user's name is the dropdown in the upper right to log out
    const profileDropdown = page.locator('button:has-text("e2e_tester")');
    const button = page.locator('button:has-text("FAQs")');

    expect(page.url().includes(SHOPKEEP_ROUTES.INVENTORY)).toBeTruthy();

    // Open the profile dropdown then click the button (which opens a new page)
    await profileDropdown.click();
    const [newPage] = await Promise.all([context.waitForEvent('page'), button.click()]);

    // Ensure that the new page's URL is for the external FAQ page and the existing page didn't change
    expect(page.url().includes(SHOPKEEP_ROUTES.INVENTORY)).toBeTruthy();
    expect(newPage.url().includes('https://faq.shopcanal.com/en/')).toBeTruthy();
  });

  test('can navigate to external Become a Supplier via dropdown', async ({ page, context }) => {
    // The button that has the user's name is the dropdown in the upper right to log out
    const profileDropdown = page.locator('button:has-text("e2e_tester")');
    const button = page.locator('button:has-text("Become a Supplier")');

    expect(page.url().includes(SHOPKEEP_ROUTES.INVENTORY)).toBeTruthy();

    // Open the profile dropdown then click the button (which opens a new page)
    await profileDropdown.click();
    const [newPage] = await Promise.all([context.waitForEvent('page'), button.click()]);

    // Ensure that the new page's URL is for the external sign up form page and the existing page didn't change
    expect(page.url().includes(SHOPKEEP_ROUTES.INVENTORY)).toBeTruthy();
    expect(newPage.url().includes('https://develop.shopcanal.com/request-invitation')).toBeTruthy();
  });

  test('can navigate to external Give Feedback via dropdown', async ({ page, context }) => {
    // The button that has the user's name is the dropdown in the upper right to log out
    const profileDropdown = page.locator('button:has-text("e2e_tester")');
    const button = page.locator('button:has-text("Give feedback")');

    expect(page.url().includes(SHOPKEEP_ROUTES.INVENTORY)).toBeTruthy();

    // Open the profile dropdown then click the button (which opens a new page)
    await profileDropdown.click();
    const [newPage] = await Promise.all([context.waitForEvent('page'), button.click()]);

    // Ensure that the new page's URL is for the external FAQ page and the existing page didn't change
    expect(page.url().includes(SHOPKEEP_ROUTES.INVENTORY)).toBeTruthy();
    expect(
      newPage.url().includes('https://form.asana.com/?k=ZJZ2VpGVKmafm1ZSbF71jQ&d=1199691950954316'),
    ).toBeTruthy();
  });
});
