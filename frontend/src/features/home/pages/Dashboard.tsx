import { useAuth } from '../../../context/AuthContext';

export default function Dashboard() {
  const { usuario } = useAuth();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">
        Bienvenido, {usuario?.nombre}
      </h1>
      <p className="mt-2 text-gray-600">
        Placeholder — acá van los indicadores generales del negocio.
      </p>
    </div>
  );
}