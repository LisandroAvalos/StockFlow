import { Link } from 'react-router-dom';
import { useSuppliers } from '../../../hooks/useSuppliers';
import { useDeleteSupplier } from '../../../hooks/useDeleteSupplier';
import { useAuth } from '../../../context/AuthContext';
import { getApiErrorMessage } from '../../../api/errorHandling';
import type { SupplierResponse } from '../../../types/supplier';

export default function Suppliers() {
  const { data: suppliers, isLoading, isError, error } = useSuppliers();
  const deleteSupplierMutation = useDeleteSupplier();
  const { usuario } = useAuth();
  const isAdmin = usuario?.rol === 'ADMIN';

  function handleDelete(supplier: SupplierResponse) {
    const confirmed = window.confirm(
      `¿Seguro que querés eliminar al proveedor "${supplier.name}"?`
    );
    if (!confirmed) return;

    deleteSupplierMutation.reset();
    deleteSupplierMutation.mutate(supplier.id);
  }

  if (isLoading) {
    return <div className="p-8">Cargando proveedores...</div>;
  }

  if (isError) {
    return (
      <div className="p-8 text-red-600">
        Error al cargar proveedores: {getApiErrorMessage(error)}
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Proveedores</h1>
        {isAdmin && (
          <Link
            to="/proveedores/nuevo"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Nuevo proveedor
          </Link>
        )}
      </div>

      {deleteSupplierMutation.isError && (
        <p className="mt-4 text-sm text-red-600">
          {getApiErrorMessage(deleteSupplierMutation.error)}
        </p>
      )}

      <table className="mt-4 w-full border-collapse text-left">
        <thead>
          <tr className="border-b">
            <th className="py-2 pr-4">Nombre</th>
            <th className="py-2 pr-4">Teléfono</th>
            <th className="py-2 pr-4">Email</th>
            {isAdmin && <th className="py-2 pr-4">Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {suppliers?.map((supplier) => {
            const isDeleting =
              deleteSupplierMutation.isPending && deleteSupplierMutation.variables === supplier.id;
            return (
              <tr key={supplier.id} className="border-b">
                <td className="py-2 pr-4">{supplier.name}</td>
                <td className="py-2 pr-4">{supplier.telephone}</td>
                <td className="py-2 pr-4">{supplier.email}</td>
                {isAdmin && (
                  <td className="py-2 pr-4">
                    <div className="flex gap-3 text-sm">
                      <Link
                        to={`/proveedores/${supplier.id}/editar`}
                        className="text-blue-600 hover:underline"
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => handleDelete(supplier)}
                        disabled={deleteSupplierMutation.isPending}
                        className="text-red-600 hover:underline disabled:opacity-50"
                      >
                        {isDeleting ? 'Eliminando...' : 'Eliminar'}
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
