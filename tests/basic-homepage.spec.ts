import { expect, test } from '@playwright/test';

test.describe.configure({ mode: 'parallel' });

/**
 * This file contains tests that confirm our main site, https://shopcanal.com, is up and
 * running as intended. Just the basics.
 */

const MAIN_SITE = 'https://shopcanal.com';
const EXPECTED_PAGE_TITLE = 'Revolutionizing e-commerce | Canal';
const EXPECTED_CAREERS_LINK = 'https://shopcanal.com/careers';

test('Home - Correct page title', async ({ page }) => {
  await page.goto(MAIN_SITE);
  const pageTitle = await page.title();

  expect(pageTitle).toBe(EXPECTED_PAGE_TITLE);
});

test('Home - Careers link is correct', async ({ page }) => {
  await page.goto(MAIN_SITE);
  const careersRoute = await page.getAttribute('text=Careers', 'href'); // expected to be "/careers"
  const careersLink = `${MAIN_SITE}${careersRoute ?? ''}`;

  expect(careersLink).toBe(EXPECTED_CAREERS_LINK);
});
