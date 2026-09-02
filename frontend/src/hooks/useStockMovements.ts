// src/hooks/useStockMovements.ts (nuevo)
import { useQuery } from '@tanstack/react-query';
import { getStockMovementsByProduct } from '../api/stocks';

export function useStockMovementsByProduct(productId: number) {
  return useQuery({
    queryKey: ['stock', productId],
    queryFn: () => getStockMovementsByProduct(productId),
  });
}