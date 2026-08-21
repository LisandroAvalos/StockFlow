import type { CategoryResponse } from './category';
import type { SupplierResponse } from './supplier';

export interface ProductResponse {
  id: number;
  name: string;
  code: string;
  description: string;
  price: number;
  offerPrice: number | null;
  stock: number;
  minStock: number;
  active: boolean;
  category: CategoryResponse;
  supplier: SupplierResponse;
}

export interface ProductCreateRequest {
  name: string;
  code: string;
  description: string;
  price: number;
  offerPrice: number | null;
  initialStock: number;
  minStock: number;
  categoryId: number;
  supplierId: number;
}