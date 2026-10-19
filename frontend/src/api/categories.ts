import axiosClient from './axiosClient';
import { CATEGORY_ENDPOINTS } from './endpoints';
import type {
  CategoryResponse,
  CategoryCreateRequest,
  CategoryUpdateRequest,
} from '../types/category';

export async function getCategories(): Promise<CategoryResponse[]> {
  const response = await axiosClient.get<CategoryResponse[]>(CATEGORY_ENDPOINTS.BASE);
  return response.data;
}

export async function createCategory(data: CategoryCreateRequest): Promise<CategoryResponse> {
  const response = await axiosClient.post<CategoryResponse>(CATEGORY_ENDPOINTS.BASE, data);
  return response.data;
}

export async function updateCategory(
  id: number,
  data: CategoryUpdateRequest
): Promise<CategoryResponse> {
  const response = await axiosClient.put<CategoryResponse>(
    CATEGORY_ENDPOINTS.MUTATE_BY_ID(id),
    data
  );
  return response.data;
}

export async function deleteCategory(id: number): Promise<void> {
  await axiosClient.delete(CATEGORY_ENDPOINTS.MUTATE_BY_ID(id));
}
