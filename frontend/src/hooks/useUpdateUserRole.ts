import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserRole } from '../api/users';
import type { UserRoleUpdateRequest } from '../types/user';

export function useUpdateUserRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UserRoleUpdateRequest }) =>
      updateUserRole(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: () => {},
  });
}
