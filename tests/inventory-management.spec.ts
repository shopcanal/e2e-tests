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

  //   // Wait for the modal to display
  //   await page.waitForSelector('text=Manage product');

  //   // Select "Active" in the product status dropdown
  //   const dropdown = await page.$('select#PolarisSelect1');
  //   await dropdown?.selectOption('ACTIVE')

  //   // Click the "Save" button to save the product state
  //   await page.click('button#save-product-status-button')

  //   // We expect the modal to be closed
  //   expect(await page.$('text=Manage product')).toBeFalsy();

  //   // We expect the 'Activate' button and 'Draft' status label to be gone
  //   expect(await page.$('text=Activate')).toBeFalsy();
  //   expect(await page.$('text=Draft')).toBeFalsy();
  // });
});
