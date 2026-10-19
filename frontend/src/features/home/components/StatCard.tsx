import { Link } from 'react-router-dom';

interface StatCardProps {
  title: string;
  value: string;
  detail?: string;
  isLoading: boolean;
  isError: boolean;
  to: string;
}

// Cada tarjeta maneja su propio estado de carga/error: si una consulta falla,
// las demás siguen mostrándose.
export default function StatCard({ title, value, detail, isLoading, isError, to }: StatCardProps) {
  return (
    <Link to={to} className="block rounded border bg-white p-4 hover:bg-gray-50">
      <p className="text-sm text-gray-500">{title}</p>
      {isLoading && <p className="mt-2 text-sm">Cargando...</p>}
      {isError && <p className="mt-2 text-sm text-red-600">No se pudo cargar</p>}
      {!isLoading && !isError && (
        <>
          <p className="mt-1 text-2xl font-bold">{value}</p>
          {detail && <p className="mt-1 text-sm text-gray-500">{detail}</p>}
        </>
      )}
    </Link>
  );
}
