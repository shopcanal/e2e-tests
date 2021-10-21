import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  const dataSetupUrl = process.env.E2E_DATA_SETUP_URL;
  if (dataSetupUrl) {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto(dataSetupUrl);
    await browser.close();
  } else {
    console.log('No URL for data setup provided - skipping this step.');
  }
}

export default globalSetup;
