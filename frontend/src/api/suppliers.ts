import axiosClient from './axiosClient';
import { SUPPLIER_ENDPOINTS } from './endpoints';
import type {
  SupplierResponse,
  SupplierCreateRequest,
  SupplierUpdateRequest,
} from '../types/supplier';

export async function getSuppliers(): Promise<SupplierResponse[]> {
  const response = await axiosClient.get<SupplierResponse[]>(SUPPLIER_ENDPOINTS.BASE);
  return response.data;
}

export async function createSupplier(data: SupplierCreateRequest): Promise<SupplierResponse> {
  const response = await axiosClient.post<SupplierResponse>(SUPPLIER_ENDPOINTS.BASE, data);
  return response.data;
}

export async function updateSupplier(
  id: number,
  data: SupplierUpdateRequest
): Promise<SupplierResponse> {
  const response = await axiosClient.put<SupplierResponse>(
    SUPPLIER_ENDPOINTS.MUTATE_BY_ID(id),
    data
  );
  return response.data;
}

export async function deleteSupplier(id: number): Promise<void> {
  await axiosClient.delete(SUPPLIER_ENDPOINTS.MUTATE_BY_ID(id));
}
