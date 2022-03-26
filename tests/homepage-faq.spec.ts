import { expect, test } from '@playwright/test';
import { intercept } from '../helpers/intercept';

test.beforeEach(async ({ page }) => intercept(page));

/**
 * This file contains tests that confirm our main dev site, https://develop.shopcanal.com, has an
 * FAQ section that's working as expected. Checks each FAQ text for visibility and makes
 * sure it has a collapsible element
 */

const MAIN_SITE = 'https://develop.shopcanal.com/';

// All the FAQs as text
const FAQ_TEXT = [
  'What does Canal do?',
  'What makes Canal unique?',
  'How do you make money?',
  'How does Canal make money?',
  'When will I be able to use Canal?',
  'What is the Canal Network?',
  "How do I access Canal's network of brands?",
];

// The element that shows up when we click on an FAQ element has the class react-reveal, so it should be hidden to start with, then show up when clicked
test('Has all FAQs', async ({ page }) => {
  await page.goto(MAIN_SITE);

  // Makes sure each of the FAQs exist, but the collapsible items aren't yet visible
  for (const item of FAQ_TEXT) {
    const selector = `button:has-text("${item}")`;
    const faq = page.locator(selector);
    await faq.waitFor();

    // There's two, the second is the cookie banner
    const collapsibleElement = page.locator(`.react-reveal:below(${selector}) >> nth=0`);
    await collapsibleElement.waitFor({ state: 'detached' });
  }
});

test('First FAQ dropdown can be clicked on', async ({ page }) => {
  const faqText = page.locator(`button:has-text("${FAQ_TEXT[0]}")`);
  // There's two, the second is the cookie banner
  const collapsibleElement = page.locator(
    `.react-reveal:below(button:has-text("${FAQ_TEXT[0]}")) >> nth=0`,
  );

  await page.goto(MAIN_SITE);

  // Starts out unattached in the DOM
  await collapsibleElement.waitFor({ state: 'detached' });

  // Open the dropdown and wait till it's onscreen and the bounding box has stopped changing
  await faqText.click();
  await collapsibleElement.waitFor({
    state: 'visible',
  });

  // Ensure it's now visible and height is larger than 0
  const box = await collapsibleElement.boundingBox();
  expect(box?.height).toBeGreaterThan(0);
});
