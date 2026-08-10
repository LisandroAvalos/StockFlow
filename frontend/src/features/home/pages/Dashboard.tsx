import { useAuth } from '../../../context/AuthContext';

export default function Dashboard() {
  const { usuario, logout } = useAuth();

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <p className="text-lg">
          Bienvenido, <strong>{usuario?.nombre}</strong> ({usuario?.rol})
        </p>
        <button
          onClick={logout}
          className="mt-4 rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}