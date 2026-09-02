import { useQuery } from '@tanstack/react-query';
import { getProductById } from '../api/products';

export function useProduct(id: number) {
  return useQuery({
    queryKey: ['products', id],
    queryFn: () => getProductById(id),
  });
}