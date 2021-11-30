import { test } from '@playwright/test';
import { logInSuccessfully } from '../../helpers/login';

/**
 * This file contains tests that confirm we can add and modify Shopify products
 * from within the Canal app
 */
test.describe('Shopkeep Inventory Management', () => {
  /**
   * We need to be logged in for each test, so we should log in before this test suite runs.
   */
  test.beforeEach(async ({ context, page }) => {
    await logInSuccessfully(page, context, test);

    await page.waitForLoadState('networkidle');
  });

  // /**
  //  * Tests that we can change a product in Inventory from 'Draft' to 'Active'
  //  */
  // test('can open Manage Product modal and change product status to active', async ({ page }) => {
  //   // Click the 'Activate' button
  //   await page.click('text=Activate');

  //   // Wait for the product management modal to display
  //   await page.waitForSelector('text=Manage product');

  //   // We expect the 'Save' button to be disabled
  //   let button = await page.$('button#save-product-status-button');
  //   if (button) expect(await button.isDisabled()).toBeTruthy();

  //   // Select "Active" in the product status dropdown
  //   const dropdown = await page.$('select#PolarisSelect1');
  //   await dropdown?.selectOption('ACTIVE');

  //   // We expect the 'Save' button to be active now
  //   button = await page.$('button#save-product-status-button');
  //   if (button) expect(await button.isDisabled()).toBeFalsy();
  // });

  // /**
  //  * Tests that we can add an approved product to Shopify as a Draft from Inventory,
  //  * as well as add a payment method
  //  */
  // test('can successfully add a product to Shopify as a Draft', async ({ page, browserName }) => {
  //   // Click the 'Add to Shopify as Draft' button
  //   await page.click('text=Add to Shopify as Draft');

  //   // Wait for the payment information modal to display
  //   await page.waitForSelector('text=Provide payment information to proceed');

  //   // Expect the 'Save & Agree' button to be disabled
  //   let button = await page.$('text=Save & Agree');
  //   if (button) expect(await button.isDisabled()).toBeTruthy();

  //   // Enter test card number into the payment info iframe
  //   const iframe = page.frames().find((frame) => frame.name().includes('privateStripeFrame'));
  //   if (iframe) {
  //     await iframe.waitForLoadState('domcontentloaded');
  //     await iframe.fill('[aria-label="Credit or debit card number"]', '4242424242424242');
  //     await iframe.fill('[aria-label="Credit or debit card expiration date"]', '424');
  //     await iframe.fill('[aria-label="Credit or debit card CVC/CVV"]', '242');
  //     await iframe.fill('[aria-label="ZIP"]', '42424');
  //   }

  //   // For some reason,this piece often fails on Webkit (Safari). We will ignore this conditional
  //   // on Webkit for now until we can resolve it.
  //   if (browserName !== 'webkit') {
  //     // Expect the 'Save & Agree' button to be enabled now
  //     button = await page.$('text=Save & Agree');
  //     if (button) expect(await button.isDisabled()).toBeFalsy();
  //   }
  // });
});
