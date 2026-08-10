import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface NavLinkConfig {
  label: string;
  path: string;
  roles: string[]; // roles que pueden ver este link
}

const NAV_LINKS: NavLinkConfig[] = [
  { label: 'Dashboard', path: '/dashboard', roles: ['ADMIN', 'EMPLEADO'] },
  { label: 'Productos', path: '/productos', roles: ['ADMIN', 'EMPLEADO'] },
  { label: 'Ventas', path: '/ventas', roles: ['ADMIN', 'EMPLEADO'] },
  { label: 'Reportes', path: '/reportes', roles: ['ADMIN', 'EMPLEADO'] },
  { label: 'Usuarios', path: '/usuarios', roles: ['ADMIN'] },
];

export default function Navbar() {
  const { usuario, logout } = useAuth();

  const visibleLinks = NAV_LINKS.filter((link) =>
    usuario ? link.roles.includes(usuario.rol) : false
  );

  return (
    <nav className="flex items-center justify-between border-b bg-white px-6 py-3">
      <div className="flex items-center gap-6">
        <span className="text-lg font-bold">StockFlow</span>
        {visibleLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              isActive
                ? 'font-semibold text-blue-600'
                : 'text-gray-600 hover:text-blue-600'
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>

      <div className="flex items-center gap-4">
        {usuario && (
          <span className="text-sm text-gray-500">
            {usuario.nombre} ({usuario.rol})
          </span>
        )}
        <button
          onClick={logout}
          className="rounded bg-red-600 px-3 py-1.5 text-sm text-white hover:bg-red-700"
        >
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
}