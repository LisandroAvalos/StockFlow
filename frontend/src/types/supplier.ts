export interface SupplierResponse {
    id: number;
    name: string;
    telephone: string;
    email: string;
    active: boolean;
  }
  
  export type SupplierCreateRequest = Omit<SupplierResponse, 'id' | 'active'>;