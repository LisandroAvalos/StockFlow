import { Link } from 'react-router-dom';
import { useUsers } from '../../../hooks/useUsers';
import { useUpdateUserRole } from '../../../hooks/useUpdateUserRole';
import { useDeleteUser } from '../../../hooks/useDeleteUser';
import { useAuth } from '../../../context/AuthContext';
import { getApiErrorMessage } from '../../../api/errorHandling';
import type { UserResponse, UserRole } from '../../../types/user';

const ROLES: UserRole[] = ['EMPLEADO', 'ADMIN'];

export default function Users() {
  const { data: users, isLoading, isError, error } = useUsers();
  const updateRoleMutation = useUpdateUserRole();
  const deleteUserMutation = useDeleteUser();
  const { usuario } = useAuth();

  const actionError = updateRoleMutation.error ?? deleteUserMutation.error;
  const isActionPending = updateRoleMutation.isPending || deleteUserMutation.isPending;

  function handleRoleChange(user: UserResponse, newRole: UserRole) {
    if (newRole === user.role) return;

    const confirmed = window.confirm(
      `¿Cambiar el rol de "${user.name}" de ${user.role} a ${newRole}?`
    );
    if (!confirmed) return;

    updateRoleMutation.reset();
    deleteUserMutation.reset();
    updateRoleMutation.mutate({ id: user.id, data: { roleName: newRole } });
  }

  function handleDelete(user: UserResponse) {
    const confirmed = window.confirm(`¿Seguro que querés dar de baja a "${user.name}"?`);
    if (!confirmed) return;

    updateRoleMutation.reset();
    deleteUserMutation.reset();
    deleteUserMutation.mutate(user.id);
  }

  if (isLoading) {
    return <div className="p-8">Cargando usuarios...</div>;
  }

  if (isError) {
    return (
      <div className="p-8 text-red-600">
        Error al cargar usuarios: {getApiErrorMessage(error)}
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Usuarios</h1>
        <Link
          to="/usuarios/nuevo"
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Nuevo usuario
        </Link>
      </div>

      {actionError && (
        <p className="mt-4 text-sm text-red-600">{getApiErrorMessage(actionError)}</p>
      )}

      <table className="mt-4 w-full border-collapse text-left">
        <thead>
          <tr className="border-b">
            <th className="py-2 pr-4">Nombre</th>
            <th className="py-2 pr-4">Email</th>
            <th className="py-2 pr-4">Rol</th>
            <th className="py-2 pr-4">Estado</th>
            <th className="py-2 pr-4">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => {
            // Un admin no puede cambiarse el rol ni darse de baja a sí mismo:
            // se quedaría sin acceso y el backend no lo impide.
            const isSelf = usuario?.id === user.id;
            return (
              <tr key={user.id} className={`border-b ${user.active ? '' : 'text-gray-400'}`}>
                <td className="py-2 pr-4">
                  {user.name}
                  {isSelf && <span className="ml-2 text-xs text-gray-500">(vos)</span>}
                </td>
                <td className="py-2 pr-4">{user.email}</td>
                <td className="py-2 pr-4">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user, e.target.value as UserRole)}
                    disabled={isSelf || !user.active || isActionPending}
                    className="rounded border px-2 py-1 text-sm disabled:opacity-60"
                  >
                    {ROLES.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="py-2 pr-4">
                  <span
                    className={`rounded px-2 py-0.5 text-xs font-medium ${
                      user.active ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {user.active ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td className="py-2 pr-4">
                  {user.active && !isSelf && (
                    <button
                      onClick={() => handleDelete(user)}
                      disabled={isActionPending}
                      className="text-sm text-red-600 hover:underline disabled:opacity-50"
                    >
                      Dar de baja
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
