import axiosClient from './axiosClient';
import { CATEGORY_ENDPOINTS } from './endpoints';
import type { CategoryResponse } from '../types/product';

export async function getCategories(): Promise<CategoryResponse[]> {
  const response = await axiosClient.get<CategoryResponse[]>(CATEGORY_ENDPOINTS.BASE);
  return response.data;
}