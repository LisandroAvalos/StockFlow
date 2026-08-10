import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import type { LoginRequest } from '../../../types/auth';

const loginSchema = z.object({
  email: z.string().min(1, 'El email es obligatorio'),
  password: z.string().min(1, 'La contraseña es obligatoria'),
});

export default function Login() {
  const { usuario, login } = useAuth();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: zodResolver(loginSchema),
  });

  // Si ya hay sesión activa (login exitoso, o el usuario ya estaba logueado
  // y navegó/refrescó sobre /login a mano), lo mandamos a /dashboard.
  useEffect(() => {
    if (usuario) {
      navigate('/dashboard', { replace: true });
    }
  }, [usuario, navigate]);

  async function onSubmit(data: LoginRequest) {
    setLoginError('');
    setIsSubmitting(true);
    try {
      await login(data);
      // La redirección la dispara el useEffect de arriba cuando "usuario" cambie.
    } catch (err) {
      setLoginError('Email o contraseña incorrectos');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-bold">Iniciar sesión</h1>

        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="text"
            {...register('email')}
            className="mt-1 w-full rounded border px-3 py-2"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            {...register('password')}
            className="mt-1 w-full rounded border px-3 py-2"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        {loginError && <p className="text-sm text-red-600">{loginError}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>
    </div>
  );
}