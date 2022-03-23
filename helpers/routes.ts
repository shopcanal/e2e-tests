const DOMAIN = 'https://develop.shopcanal.com';
const SHOPKEEP = `${DOMAIN}/shopkeep`;
const SUPPLIER = `${DOMAIN}/supplier`;

/**
 * App URLs used across our various test files
 */
export const LOGIN_PAGE = `${DOMAIN}/login`;

/**
 * This must match the "App Url" setting of our Shopify App in order to test the
 * userflow of embedded users.
 */
export const SK_APP_URL = `${DOMAIN}/shopkeep/inventory?embedded=true&canal_app_name=storefront`;

export const SHOPKEEP_ROUTES = {
  DISCOVER: `${SHOPKEEP}/discover`,
  INVENTORY: `${SHOPKEEP}/inventory`,
  SUPPLIERS: `${SHOPKEEP}/suppliers`,
  PROPOSALS: `${SHOPKEEP}/proposals`,
  INVITE: `${SHOPKEEP}/invite`,
  SETTINGS: `${SHOPKEEP}/settings`,
};

export const SUPPLIER_ROUTES = {
  OVERVIEW: `${SUPPLIER}/overview`,
  INVENTORY: `${SUPPLIER}/inventory`,
  DISCOVER: `${SUPPLIER}/discover`,
  REQUESTS: `${SUPPLIER}/requests`,
  SETTINGS: `${SUPPLIER}/settings`,
  FAQ: `${SUPPLIER}/faq`,
};
