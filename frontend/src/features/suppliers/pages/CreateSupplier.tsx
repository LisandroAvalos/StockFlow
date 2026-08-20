import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useCreateSupplier } from '../../../hooks/useCreateSupplier';
import { getApiErrorMessage } from '../../../api/errorHandling';

const supplierSchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio'),
  telephone: z.string().min(1, 'El teléfono es obligatorio'),
  email: z.string().min(1, 'El email es obligatorio').email('Formato de email inválido'),
});

type SupplierFormData = z.infer<typeof supplierSchema>;

export default function CreateSupplier() {
  const navigate = useNavigate();
  const createSupplierMutation = useCreateSupplier();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SupplierFormData>({
    resolver: zodResolver(supplierSchema),
  });

  async function onSubmit(data: SupplierFormData) {
    try {
      await createSupplierMutation.mutateAsync(data);
      navigate('/proveedores');
    } catch {
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Nuevo proveedor</h1>

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
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
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
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        {createSupplierMutation.isError && (
          <p className="text-sm text-red-600">
            {getApiErrorMessage(createSupplierMutation.error)}
          </p>
        )}

        <button
          type="submit"
          disabled={createSupplierMutation.isPending}
          className="w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {createSupplierMutation.isPending ? 'Guardando...' : 'Crear proveedor'}
        </button>
      </form>
    </div>
  );
}