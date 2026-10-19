export const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
};

export const PRODUCT_ENDPOINTS = {
  BASE: '/products',
  BY_ID: (id: number) => `/products/id/${id}`,
  MUTATE_BY_ID: (id: number) => `/products/${id}`,
  LOW_STOCK: '/products/low-stock',
};

export const STOCK_ENDPOINTS = {
  BASE: '/stock',
  BY_PRODUCT: (productId: number) => `/stock/product/${productId}`,
  ENTRY: '/stock/entry',
  ADJUST_POSITIVE: '/stock/adjust/positive',
  ADJUST_NEGATIVE: '/stock/adjust/negative',
};

export const CATEGORY_ENDPOINTS = {
  BASE: '/categories',
  MUTATE_BY_ID: (id: number) => `/categories/${id}`,
};

export const SUPPLIER_ENDPOINTS = {
  BASE: '/suppliers',
  MUTATE_BY_ID: (id: number) => `/suppliers/${id}`,
};

export const SALE_ENDPOINTS = {
  BASE: '/sales',
  BY_ID: (id: number) => `/sales/${id}`,
  BY_DATE: '/sales/date',
  BEST_SELLING: '/sales/best-selling',
};

export const USER_ENDPOINTS = {
  BASE: '/users',
  MUTATE_BY_ID: (id: number) => `/users/${id}`,
  ROLE: (id: number) => `/users/${id}/role`,
};
