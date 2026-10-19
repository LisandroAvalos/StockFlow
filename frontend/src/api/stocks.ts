import axiosClient from './axiosClient';
import { STOCK_ENDPOINTS } from './endpoints';
import type { StockMovementResponse } from '../types/stockMovement';
import type { StockMovementCreateRequest} from '../types/stockMovement';

export async function getStockMovementsByProduct(
  productId: number
): Promise<StockMovementResponse[]> {
  const response = await axiosClient.get<StockMovementResponse[]>(
    STOCK_ENDPOINTS.BY_PRODUCT(productId)
  );
  return response.data;
}
export async function registerStockEntry(
  data: StockMovementCreateRequest
): Promise<StockMovementResponse> {
  const response = await axiosClient.post<StockMovementResponse>(STOCK_ENDPOINTS.ENTRY, data);
  return response.data;
}

export async function adjustStockPositive(
  data: StockMovementCreateRequest
): Promise<StockMovementResponse> {
  const response = await axiosClient.post<StockMovementResponse>(
    STOCK_ENDPOINTS.ADJUST_POSITIVE,
    data
  );
  return response.data;
}

export async function adjustStockNegative(
  data: StockMovementCreateRequest
): Promise<StockMovementResponse> {
  const response = await axiosClient.post<StockMovementResponse>(
    STOCK_ENDPOINTS.ADJUST_NEGATIVE,
    data
  );
  return response.data;
}

export async function getAllStockMovements(): Promise<StockMovementResponse[]> {
  const response = await axiosClient.get<StockMovementResponse[]>(STOCK_ENDPOINTS.BASE);
  return response.data;
}
