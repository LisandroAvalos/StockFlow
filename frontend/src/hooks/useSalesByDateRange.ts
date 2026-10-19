import { useQuery } from '@tanstack/react-query';
import { getSalesByDateRange } from '../api/sales';

interface Options {
  enabled?: boolean;
}

export function useSalesByDateRange(start: string, end: string, options: Options = {}) {
  return useQuery({
    queryKey: ['sales', 'range', start, end],
    queryFn: () => getSalesByDateRange(start, end),
    enabled: options.enabled ?? true,
  });
}
