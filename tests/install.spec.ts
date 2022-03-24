/**
 * Tests here are meant to check that our install flow is working correctly, to
 * the extent possible without manually going into Shopify with a test store.
 */

import { expect, test } from '@playwright/test';
import { SK_APP_URL } from '../helpers/routes';

test.describe.configure({ mode: 'parallel' });

const SHOPIFY_AUTH_URL_RE = /https:\/\/accounts.shopify.com\/lookup/;

test.describe('Visit to the Shopify App Url', () => {
  test.beforeEach(async ({ page }) => {
    // Append query parameters to App URL just like Shopify would when
    // redirecting users during an install.
    const url = new URL(SK_APP_URL);
    // hmac needs to be 64 characters long for our own FE validation.
    url.searchParams.set(
      'hmac',
      '1234567890123456789012345678901234567890123456789012345678901234',
    );
    url.searchParams.set('host', 'anexamplehostvalue');
    // Anything with a myshopify.com suffix works here.
    url.searchParams.set('shop', 'canal-felipe-test-store.myshopify.com');
    url.searchParams.set('timestamp', Date.now().toString());
    await page.goto(url.toString());
  });

  test('sends users to Shopify login page', async ({ page }) => {
    await expect(page).toHaveURL(SHOPIFY_AUTH_URL_RE);
  });
});
