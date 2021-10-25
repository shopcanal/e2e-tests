import { expect, test } from '@playwright/test';

/**
 * This file contains tests that confirm our main site, https://shopcanal.com, has an
 * FAQ section that's working as expected. Checks each FAQ text for visibility and makes
 * sure it has a collapsible element
 */

const MAIN_SITE = 'https://shopcanal.com/';

// All the FAQs as text
const FAQ_TEXT = [
  'What does Canal do?',
  'What makes Canal unique?',
  'How do you make money?',
  'How does Canal make money?',
  'When will I be able to use Canal?',
  'How do Storefronts handle shipping?',
];

// The button that has text saying "What does Canal do?" inside of it
const BUTTON_SELECTOR = `button:has(:text("${FAQ_TEXT[0]}"))`;

// The element that has "Canal helps D2C brands" within it and is a collapsible element
const COLLAPSIBLE_SELECTOR = '#basic-collapsible:has(:text("Canal helps D2C brands"))';

test('Has all FAQs', async ({ page }) => {
  await page.goto(MAIN_SITE);

  // Captures the parent of the dropdown containers that have inside of them button + basic collapsible elements
  for (const item of FAQ_TEXT) {
    const selector = `button:has(:text('${item}'))`;
    const faq = await page.waitForSelector(selector, {
      state: 'attached',
    });

    const collapsibleElement = await page.waitForSelector(`:below(${selector})`, {
      state: 'attached',
    });

    // Make sure both the FAQ and the collapsible element exists
    expect(faq).toBeTruthy();
    expect(collapsibleElement).toBeTruthy();
  }
});

test('First FAQ dropdown can be clicked on', async ({ page }) => {
  await page.evaluate(() => {
    return new Promise((resolve) => setTimeout(resolve, 0));
  });

  const expandedState = () => page.getAttribute(COLLAPSIBLE_SELECTOR, 'aria-expanded');
  const clickOnFaqLink = () => page.click(BUTTON_SELECTOR);

  const height = async (state: 'attached' | 'visible') => {
    const element = await page.waitForSelector(COLLAPSIBLE_SELECTOR, {
      state,
    });
    const box = await element.boundingBox();
    return box?.height ?? 0;
  };

  await page.goto(MAIN_SITE);

  // Starts out closed and minimized
  expect(await expandedState()).toBe('false');
  expect(await height('attached')).toBe(0);

  // Open the dropdown
  await clickOnFaqLink();

  // Ensure it's open and larger than 0
  expect(await expandedState()).toBe('true');
  expect(await height('visible')).toBeGreaterThan(0);
});
