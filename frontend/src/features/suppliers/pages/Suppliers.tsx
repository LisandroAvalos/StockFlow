import { Link } from 'react-router-dom';
import { useSuppliers } from '../../../hooks/useSuppliers';
import { useAuth } from '../../../context/AuthContext';
import { getApiErrorMessage } from '../../../api/errorHandling';

export default function Suppliers() {
  const { data: suppliers, isLoading, isError, error } = useSuppliers();
  const { usuario } = useAuth();

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
        {usuario?.rol === 'ADMIN' && (
          <Link
            to="/proveedores/nuevo"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Nuevo proveedor
          </Link>
        )}
      </div>
      <table className="mt-4 w-full border-collapse text-left">
        <thead>
          <tr className="border-b">
            <th className="py-2 pr-4">Nombre</th>
            <th className="py-2 pr-4">Teléfono</th>
            <th className="py-2 pr-4">Email</th>
          </tr>
        </thead>
        <tbody>
          {suppliers?.map((supplier) => (
            <tr key={supplier.id} className="border-b">
              <td className="py-2 pr-4">{supplier.name}</td>
              <td className="py-2 pr-4">{supplier.telephone}</td>
              <td className="py-2 pr-4">{supplier.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}