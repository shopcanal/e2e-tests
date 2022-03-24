import { chromium } from '@playwright/test';

async function globalSetup() {
  // If you need to hit an endpoint to populate data before running your test suite,
  // you can pass in the URL through the E2E_DATA_SETUP_URL environment variable
  const dataSetupUrl = process.env.E2E_DATA_SETUP_URL;
  if (dataSetupUrl) {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    const mainBody = page.locator('body');

    // Make sure the page loads and we have some HTML
    await page.goto(dataSetupUrl);
    await mainBody.waitFor();
    await browser.close();
  } else {
    console.log('No URL for data setup provided - skipping this step.');
  }
}

export default globalSetup;
