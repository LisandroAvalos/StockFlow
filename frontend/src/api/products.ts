import axiosClient from './axiosClient';
import { PRODUCT_ENDPOINTS } from './endpoints';
import type { ProductResponse, ProductCreateRequest, ProductUpdateRequest } from '../types/product';

export async function getProducts(): Promise<ProductResponse[]> {
  const response = await axiosClient.get<ProductResponse[]>(PRODUCT_ENDPOINTS.BASE);
  return response.data;
}

export async function createProduct(data: ProductCreateRequest): Promise<ProductResponse> {
  const response = await axiosClient.post<ProductResponse>(PRODUCT_ENDPOINTS.BASE, data);
  return response.data;
}

export async function getProductById(id: number): Promise<ProductResponse> {
  const response = await axiosClient.get<ProductResponse>(PRODUCT_ENDPOINTS.BY_ID(id));
  return response.data;
}

export async function deleteProduct(id: number): Promise<void> {
  await axiosClient.delete(PRODUCT_ENDPOINTS.MUTATE_BY_ID(id));
}

export async function updateProduct(
  id: number,
  data: ProductUpdateRequest
): Promise<ProductResponse> {
  const response = await axiosClient.put<ProductResponse>(
    PRODUCT_ENDPOINTS.MUTATE_BY_ID(id),
    data
  );
  return response.data;
}