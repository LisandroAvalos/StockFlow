export const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
};

export const PRODUCT_ENDPOINTS = {
  BASE: '/products',
  BY_ID: (id: number) => `/products/id/${id}`,       
  MUTATE_BY_ID: (id: number) => `/products/${id}`,
};

export const STOCK_ENDPOINTS = {
  BY_PRODUCT: (productId: number) => `/stock/product/${productId}`,
};

export const CATEGORY_ENDPOINTS = {
  BASE: '/categories',
};

export const SUPPLIER_ENDPOINTS = {
  BASE: '/suppliers',
};

export const SALE_ENDPOINTS = {
  BASE: '/sales',
  BY_ID: (id: number) => `/sales/${id}`,
};