import axiosClient from './axiosClient';
import { PRODUCT_ENDPOINTS } from './endpoints';
import type { ProductResponse } from '../types/product';

export async function getProducts(): Promise<ProductResponse[]> {
  const response = await axiosClient.get<ProductResponse[]>(PRODUCT_ENDPOINTS.BASE);
  return response.data;
}