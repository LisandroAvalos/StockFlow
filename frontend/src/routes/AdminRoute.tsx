import type { ReactNode } from 'react';
import { useAuth } from '../context/AuthContext';
import PrivateRoute from './PrivateRoute';

interface AdminRouteProps {
  children: ReactNode;
}

function RequireAdminRole({ children }: AdminRouteProps) {
  const { usuario } = useAuth();

  // Si llegamos hasta acá, PrivateRoute ya garantizó que usuario no es null.
  if (usuario?.rol !== 'ADMIN') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg text-red-600">
          No tenés permisos para acceder a esta sección.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}

export default function AdminRoute({ children }: AdminRouteProps) {
  return (
    <PrivateRoute>
      <RequireAdminRole>{children}</RequireAdminRole>
    </PrivateRoute>
  );
}