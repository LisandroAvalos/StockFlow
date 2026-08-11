export interface CategoryResponse {
    id: number;
    name: string;
    active: boolean;
  }
  
  export interface SupplierResponse {
    id: number;
    name: string;
    telephone: string;
    email: string;
    active: boolean;
  }
  
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