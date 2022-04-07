const DOMAIN = 'https://develop.shopcanal.com';
const SHOPKEEP = `${DOMAIN}/shopkeep`;
const SUPPLIER = `${DOMAIN}/supplier`;

/**
 * This must match the "App Url" setting of our Shopify App in order to test the
 * userflow of embedded users.
 */
export const SK_APP_URL = `${DOMAIN}/shopkeep/inventory?embedded=true&canal_app_name=storefront`;

export const SHOPKEEP_ROUTES = {
  LOGIN: `${DOMAIN}/login`,
  ROOT: SHOPKEEP,
  DISCOVER: `${SHOPKEEP}/discover`,
  INVENTORY: `${SHOPKEEP}/inventory`,
  SUPPLIERS: `${SHOPKEEP}/suppliers`,
  PROPOSALS: `${SHOPKEEP}/proposals`,
  INVITE: `${SHOPKEEP}/invite`,
  SETTINGS: `${SHOPKEEP}/settings`,
};

export const SUPPLIER_ROUTES = {
  LOGIN: `${DOMAIN}/login?next=/supplier`,
  OVERVIEW: `${SUPPLIER}/overview`,
  DISCOVER: `${SUPPLIER}/discover`,
  INVENTORY: `${SUPPLIER}/inventory`,
  STOREFRONTS: `${SUPPLIER}/storefronts`,
  PROPOSALS: `${SUPPLIER}/proposals`,
  SETTINGS: `${SUPPLIER}/settings`,
};
