import { useQuery } from '@tanstack/react-query';
import { getSaleById } from '../api/sales';

export function useSale(id: number) {
  return useQuery({
    queryKey: ['sales', id],
    queryFn: () => getSaleById(id),
  });
}