import type { ProductResponse } from './product';

export type StockMovementType = 'COMPRA' | 'AJUSTE_POSITIVO' | 'AJUSTE_NEGATIVO' | 'VENTA';

export interface StockMovementResponse {
  id: number;
  type: StockMovementType;
  quantity: number;
  date: string;
  product: ProductResponse;
  userId: number;
  userName: string;
}