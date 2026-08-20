import axiosClient from './axiosClient';
import { SUPPLIER_ENDPOINTS } from './endpoints';
import type { SupplierResponse, SupplierCreateRequest } from '../types/supplier';

export async function getSuppliers(): Promise<SupplierResponse[]> {
  const response = await axiosClient.get<SupplierResponse[]>(SUPPLIER_ENDPOINTS.BASE);
  return response.data;
}

export async function createSupplier(data: SupplierCreateRequest): Promise<SupplierResponse> {
  const response = await axiosClient.post<SupplierResponse>(SUPPLIER_ENDPOINTS.BASE, data);
  return response.data;
}