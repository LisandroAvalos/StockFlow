import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useCreateUser } from '../../../hooks/useCreateUser';
import { getApiErrorMessage } from '../../../api/errorHandling';

const userSchema = z.object({
  name: z.string().trim().min(1, 'El nombre es obligatorio'),
  email: z.string().min(1, 'El email es obligatorio').email('Formato de email inválido'),
  password: z.string().min(1, 'La contraseña es obligatoria'),
});

type UserFormData = z.infer<typeof userSchema>;

export default function CreateUser() {
  const navigate = useNavigate();
  const createUserMutation = useCreateUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  async function onSubmit(data: UserFormData) {
    try {
      await createUserMutation.mutateAsync(data);
      navigate('/usuarios');
    } catch {
      // El error queda en createUserMutation.error y se muestra abajo.
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Nuevo usuario</h1>
      <p className="mt-1 text-sm text-gray-500">
        Todo usuario nuevo se crea con rol EMPLEADO. Para promoverlo a ADMIN, cambiá su rol desde
        el listado.
      </p>

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

        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            {...register('password')}
            className="mt-1 w-full rounded border px-3 py-2"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        {createUserMutation.isError && (
          <p className="text-sm text-red-600">{getApiErrorMessage(createUserMutation.error)}</p>
        )}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={createUserMutation.isPending}
            className="flex-1 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {createUserMutation.isPending ? 'Guardando...' : 'Crear usuario'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/usuarios')}
            className="flex-1 rounded border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
