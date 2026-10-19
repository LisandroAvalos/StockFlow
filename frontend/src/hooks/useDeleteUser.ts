import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteUser } from '../api/users';

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: () => {},
  });
}
