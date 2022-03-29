import type { Page } from '@playwright/test';

/**
 * Intercepts requests on the page to disable requesting fonts, or any third
 * party resource. We do this to better control the flakiness of the tests and
 * avoid some third party request from affecting things. EVERY test should call
 * this function via a before each.
 */
export const intercept = async (page: Page): Promise<void> => {
  await page.route(
    /.*(?:clarity.ms)|(?:crisp.chat)|(?:cdn.shopify)|(?:shopify.com)|(?:heapanalytics)|(?:facebook)|(?:googletagmanager)|(?:google-analytics)|(?:bing.com)|(?:stripe)|(?:sentry).*/,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    (route) => route.abort(),
  );
  await page.route(
    '**.{woff2}',
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    (route) => route.abort(),
  );
};
