import { useQuery } from '@tanstack/react-query';
import { getLowStockProducts } from '../api/products';

export function useLowStockProducts() {
  return useQuery({
    // Cuelga de ['products'] para que los ingresos de stock y las ventas lo refresquen solo.
    queryKey: ['products', 'low-stock'],
    queryFn: getLowStockProducts,
  });
}
