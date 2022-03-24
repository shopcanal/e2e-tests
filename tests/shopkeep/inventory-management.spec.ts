import { expect, test } from '@playwright/test';
import { logIntoShopkeep } from '../../helpers/login';

test.describe.configure({ mode: 'parallel' });

/**
 * This file contains tests that confirm we can add and modify Shopify products
 * from within the Canal app
 */
test.describe('Shopkeep Inventory Management', () => {
  /**
   * We need to be logged in for each test, so we should log in before this test suite runs.
   */
  test.beforeEach(async ({ context, page }) => {
    await logIntoShopkeep(page, context);
  });

  /**
   * Tests that we can change a product in Inventory from 'Draft' to 'Active'
   */
  test('can open Manage Product modal and change product status to active', async ({ page }) => {
    // Click the 'Activate' button
    const activate = page.locator('text=Activate');
    await activate.click();

    // Wait for the product management modal to display
    const locator = page.locator('text=Manage product');
    await locator.waitFor();

    // We expect the 'Save' button to be disabled
    let button = page.locator('button#save-product-status-button');
    if (button) expect(await button.isDisabled()).toBeTruthy();

    // Select "Active" in the product status dropdown
    const dropdown = page.locator('select#PolarisSelect1');
    await dropdown?.selectOption('ACTIVE');

    // We expect the 'Save' button to be active now
    button = page.locator('button#save-product-status-button');
    if (button) expect(await button.isDisabled()).toBeFalsy();
  });

  /**
   * Tests that we can add an approved product to Shopify as a Draft from Inventory,
   * as well as add a payment method
   */
  test('can successfully add a product to Shopify as a Draft', async ({ page }) => {
    test.skip(true, '@TODO: needs to be updated');

    // Click the 'Add to Shopify as Draft' button
    const addToShopify = page.locator('text=Add to Shopify as Draft');
    await addToShopify.click();

    // Wait for the payment information modal to display
    const locator = page.locator('text=Provide payment information to proceed');
    await locator.waitFor();

    // Expect the 'Save & Agree' button to be disabled
    let button = page.locator('text=Save & Agree');
    if (button) expect(await button.isDisabled()).toBeTruthy();

    // Enter test card number into the payment info iframe
    const iframe = page.frames().find((frame) => frame.name().includes('privateStripeFrame'));
    if (iframe) {
      await iframe.waitForLoadState('domcontentloaded');
      await iframe.fill('[aria-label="Credit or debit card number"]', '4242424242424242');
      await iframe.fill('[aria-label="Credit or debit card expiration date"]', '424');
      await iframe.fill('[aria-label="Credit or debit card CVC/CVV"]', '242');
      await iframe.fill('[aria-label="ZIP"]', '42424');
    }

    button = page.locator('text=Save & Agree');
    if (button) expect(await button.isDisabled()).toBeFalsy();
  });
});
