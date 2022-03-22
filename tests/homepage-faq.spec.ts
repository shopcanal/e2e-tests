import { expect, test } from '@playwright/test';

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
const EXPANDED_SELECTOR = `:below(text=${FAQ_TEXT[0]}) .react-reveal`;

test('Has all FAQs', async ({ page }) => {
  await page.goto(MAIN_SITE);

  // Captures the parent of the dropdown containers that have inside of them button + basic collapsible elements
  for (const item of FAQ_TEXT) {
    const selector = `button:has(:text("${item}"))`;
    const faq = page.locator(selector);
    await faq.waitFor({
      state: 'attached',
    });

    const collapsibleElement = page.locator(`:below(${selector})`);
    await collapsibleElement.waitFor({ state: 'attached' });

    // Make sure both the FAQ and the collapsible element exists
    expect(faq).toBeTruthy();
  }
});

test('First FAQ dropdown can be clicked on', async ({ page }) => {
  const height = async () => {
    const locator = page.locator(EXPANDED_SELECTOR);
    await page.pause();
    const box = await locator.boundingBox();
    return box?.height ?? 0;
  };

  await page.goto(MAIN_SITE);

  // Starts out closed and minimized
  expect(await height()).toBe(0);

  // Open the dropdown and wait till it's onscreen and the bounding box has stopped changing
  await page.click(`text=${FAQ_TEXT[0]}`);
  const locator = page.locator(EXPANDED_SELECTOR);
  await locator.waitFor({
    state: 'visible',
  });

  // Ensure it's now visible and larger than 0
  expect(await height()).toBeGreaterThan(0);
});
