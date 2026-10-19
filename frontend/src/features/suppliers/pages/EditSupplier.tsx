import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useParams, useNavigate } from 'react-router-dom';
import { useSuppliers } from '../../../hooks/useSuppliers';
import { useUpdateSupplier } from '../../../hooks/useUpdateSupplier';
import { getApiErrorMessage } from '../../../api/errorHandling';
import type { SupplierResponse } from '../../../types/supplier';

const supplierSchema = z.object({
  name: z.string().trim().min(1, 'El nombre es obligatorio'),
  telephone: z.string().trim().min(1, 'El teléfono es obligatorio'),
  email: z.string().min(1, 'El email es obligatorio').email('Formato de email inválido'),
});

type SupplierFormData = z.infer<typeof supplierSchema>;

export default function EditSupplier() {
  const { id } = useParams<{ id: string }>();
  const supplierId = Number(id);

  const { data: suppliers, isLoading, isError, error } = useSuppliers();

  if (isLoading) {
    return <div className="p-8">Cargando proveedor...</div>;
  }

  if (isError) {
    return (
      <div className="p-8 text-red-600">
        Error al cargar el proveedor: {getApiErrorMessage(error)}
      </div>
    );
  }

  const supplier = suppliers?.find((s) => s.id === supplierId);

  if (!supplier) {
    return <div className="p-8">Proveedor no encontrado.</div>;
  }

  return <EditSupplierForm supplier={supplier} />;
}

function EditSupplierForm({ supplier }: { supplier: SupplierResponse }) {
  const navigate = useNavigate();
  const updateSupplierMutation = useUpdateSupplier();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SupplierFormData>({
    resolver: zodResolver(supplierSchema),
    defaultValues: {
      name: supplier.name,
      telephone: supplier.telephone,
      email: supplier.email,
    },
  });

  async function onSubmit(data: SupplierFormData) {
    try {
      await updateSupplierMutation.mutateAsync({ id: supplier.id, data });
      navigate('/proveedores');
    } catch {
      // El error queda en updateSupplierMutation.error y se muestra abajo.
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Editar proveedor</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 max-w-lg space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Nombre
          </label>
          <input
            id="name"
            type="text"
            {...register('name')}
            className="mt-1 w-full rounded border px-3 py-2"
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="telephone" className="block text-sm font-medium">
            Teléfono
          </label>
          <input
            id="telephone"
            type="text"
            {...register('telephone')}
            className="mt-1 w-full rounded border px-3 py-2"
          />
          {errors.telephone && (
            <p className="mt-1 text-sm text-red-600">{errors.telephone.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register('email')}
            className="mt-1 w-full rounded border px-3 py-2"
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
        </div>

        {updateSupplierMutation.isError && (
          <p className="text-sm text-red-600">{getApiErrorMessage(updateSupplierMutation.error)}</p>
        )}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={updateSupplierMutation.isPending}
            className="flex-1 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {updateSupplierMutation.isPending ? 'Guardando...' : 'Guardar cambios'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/proveedores')}
            className="flex-1 rounded border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
