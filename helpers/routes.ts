const DOMAIN = 'https://develop.shopcanal.com';
const SHOPKEEP = `${DOMAIN}/shopkeep`;
const SUPPLIER = `${DOMAIN}/supplier`;

/**
 * App URLs used across our various test files
 */
export const LOGIN_PAGE = `${DOMAIN}/login`;

export const SHOPKEEP_ROUTES = {
  INVENTORY: `${SHOPKEEP}/inventory`,
  DISCOVER: `${SHOPKEEP}/discover`,
  REQUESTS: `${SHOPKEEP}/requests`,
  ORDERS: `${SHOPKEEP}/orders`,
  SETTINGS: `${SHOPKEEP}/settings`,
  FAQ: `${SHOPKEEP}/faq`,
};

export const SUPPLIER_ROUTES = {
  OVERVIEW: `${SUPPLIER}/overview`,
  INVENTORY: `${SUPPLIER}/inventory`,
  DISCOVER: `${SUPPLIER}/discover`,
  REQUESTS: `${SUPPLIER}/requests`,
  SETTINGS: `${SUPPLIER}/settings`,
  FAQ: `${SUPPLIER}/faq`,
};
