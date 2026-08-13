import axiosClient from './axiosClient';
import { SUPPLIER_ENDPOINTS } from './endpoints';
import type { SupplierResponse } from '../types/product';

export async function getSuppliers(): Promise<SupplierResponse[]> {
  const response = await axiosClient.get<SupplierResponse[]>(SUPPLIER_ENDPOINTS.BASE);
  return response.data;
}