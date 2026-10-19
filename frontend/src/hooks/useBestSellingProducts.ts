import { useQuery } from '@tanstack/react-query';
import { getBestSellingProducts } from '../api/sales';

export function useBestSellingProducts() {
  return useQuery({
    queryKey: ['sales', 'best-selling'],
    queryFn: getBestSellingProducts,
  });
}
