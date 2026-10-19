import { useQuery } from '@tanstack/react-query';
import { getAllStockMovements, getStockMovementsByProduct } from '../api/stocks';

export function useStockMovementsByProduct(productId: number) {
  return useQuery({
    queryKey: ['stock', productId],
    queryFn: () => getStockMovementsByProduct(productId),
  });
}

export function useAllStockMovements() {
  return useQuery({
    queryKey: ['stock', 'all'],
    queryFn: getAllStockMovements,
  });
}
