export const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
};

export const PRODUCT_ENDPOINTS = {
  BASE: '/products',
  // Se van sumando a medida que se implementen: BY_ID, BY_CODE, BY_NAME,
  // BY_CATEGORY, BY_SUPPLIER, PRICE_RANGE, LOW_STOCK, etc.
};

// A medida que implementes otros dominios, sumás su grupo acá
// siguiendo el mismo patrón (BASE + funciones para path variables).