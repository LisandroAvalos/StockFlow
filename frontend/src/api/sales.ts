import axiosClient from './axiosClient';
import { SALE_ENDPOINTS } from './endpoints';
import type {
  SaleResponse,
  SaleCreateRequest,
  BestSellingProductResponse,
} from '../types/sale';

export async function getSales(): Promise<SaleResponse[]> {
  const response = await axiosClient.get<SaleResponse[]>(SALE_ENDPOINTS.BASE);
  return response.data;
}

export async function createSale(data: SaleCreateRequest): Promise<SaleResponse> {
  const response = await axiosClient.post<SaleResponse>(SALE_ENDPOINTS.BASE, data);
  return response.data;
}

export async function getSaleById(id: number): Promise<SaleResponse> {
  const response = await axiosClient.get<SaleResponse>(SALE_ENDPOINTS.BY_ID(id));
  return response.data;
}

export async function getSalesByDateRange(start: string, end: string): Promise<SaleResponse[]> {
  const response = await axiosClient.get<SaleResponse[]>(SALE_ENDPOINTS.BY_DATE, {
    params: { start, end },
  });
  return response.data;
}

export async function getBestSellingProducts(): Promise<BestSellingProductResponse[]> {
  const response = await axiosClient.get<BestSellingProductResponse[]>(
    SALE_ENDPOINTS.BEST_SELLING
  );
  return response.data;
}
