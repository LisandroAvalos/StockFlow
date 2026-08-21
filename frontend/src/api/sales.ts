import axiosClient from './axiosClient';
import { SALE_ENDPOINTS } from './endpoints';
import type { SaleResponse, SaleCreateRequest } from '../types/sale';

export async function getSales(): Promise<SaleResponse[]> {
  const response = await axiosClient.get<SaleResponse[]>(SALE_ENDPOINTS.BASE);
  return response.data;
}

export async function createSale(data: SaleCreateRequest): Promise<SaleResponse> {
  const response = await axiosClient.post<SaleResponse>(SALE_ENDPOINTS.BASE, data);
  return response.data;
}