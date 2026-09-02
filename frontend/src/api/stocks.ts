import axiosClient from './axiosClient';
import { STOCK_ENDPOINTS } from './endpoints';
import type { StockMovementResponse } from '../types/stockMovement';

export async function getStockMovementsByProduct(
  productId: number
): Promise<StockMovementResponse[]> {
  const response = await axiosClient.get<StockMovementResponse[]>(
    STOCK_ENDPOINTS.BY_PRODUCT(productId)
  );
  return response.data;
}