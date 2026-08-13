import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProduct } from '../api/products';

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      // Invalida el caché de la lista de productos, para que la próxima
      // vez que se muestre, TanStack Query la vuelva a pedir al backend.
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: () => {
      // No hace falta lógica acá: el componente ya lee
      // createProductMutation.isError / .error para mostrar el mensaje.
      // Este callback solo evita que TanStack Query marque la mutación
      // como "no manejada" internamente.
    },
  });
}