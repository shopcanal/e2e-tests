import { test } from '@playwright/test';
import { logInSuccessfully } from '../helpers/login';

/**
 * This file contains tests that confirm we can add and modify Shopify products
 * from within the Canal app
 */

test.describe('Inventory Management', () => {
  /**
   * We need to be logged in for each test, so we should log in before each one.
   */
  test.beforeEach(async ({ page }) => {
    await logInSuccessfully(page);
  });

  /**
   * Tests that we can change a product in Inventory from 'Draft' to 'Active'
   */
  // test('can open Manage Product modal and change product status to active', async ({ page }) => {
  //   // Click the 'Activate' button
  //   await page.click('text=Activate');

  //   // Wait for the product management modal to display
  //   await page.waitForSelector('text=Manage product');

  //   // Select "Active" in the product status dropdown
  //   const dropdown = await page.$('select#PolarisSelect1');
  //   await dropdown?.selectOption('ACTIVE')

  //   // Click the "Save" button to save the product state
  //   await page.click('button#save-product-status-button')

  //   // We expect the modal to be closed
  //   expect(await page.$('text=Manage product')).toBeFalsy();

  //   // We expect the 'Activate' button to be gone
  //   expect(await page.$('text=Activate')).toBeFalsy();
  // });

  /**
   * Tests that we can add an approved product to Shopify as a Draft from Inventory
   */
  // test('can successfully add a product to Shopify as a Draft', async ({ page }) => {
  //   // Click the 'Add to Shopify as Draft' button
  //   await page.click('text=Add to Shopify as Draft');

  //   // Wait for the payment information modal to display
  //   await page.waitForSelector('text=Provide payment information to proceed');

  //   // Expect the 'Save & Agree' button to be disabled
  //   const button = await page.$('text=Save & Agree');
  //   if (button) expect(await button.isDisabled()).toBeTruthy();

  //   // Enter test card number into the payment info iframe
  //   await page.click('iframe')
  //   await page.keyboard.insertText('4242424242424242');
  //   await page.keyboard.insertText('424')
  //   await page.keyboard.insertText('242')
  //   await page.keyboard.insertText('42424')

  //   // Expect the 'Save & Agree' button to be enabled now
  //   if (button) expect(await button.isDisabled()).toBeFalsy();

  //   // // Click the "Save" button to save the product state
  //   // await page.click('button#save-product-status-button')

  //   // // We expect the modal to be closed
  //   // expect(await page.$('text=Manage product')).toBeFalsy();

  //   // // We expect the 'Activate' button to be gone
  //   // expect(await page.$('text=Activate')).toBeFalsy();
  // });
});
