import type { ProductResponse } from './product';

export interface SaleDetailResponse {
  id: number;
  product: ProductResponse;
  quantity: number;
  unitPrice: number;
  discount: number;
  subtotal: number;
}

export interface SaleResponse {
  id: number;
  date: string;
  total: number;
  totalDiscount: number;
  userId: number;
  userName: string;
  details: SaleDetailResponse[];
}

export interface SaleDetailCreateRequest {
  productId: number;
  quantity: number;
  discount?: number;
}

export interface SaleCreateRequest {
  details: SaleDetailCreateRequest[];
}