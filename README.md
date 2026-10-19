# StockFlow

Sistema de gestión de inventario y ventas desarrollado como una aplicación web full-stack.

## Tecnologías

### Backend
- Java 21
- Spring Boot
- Maven
- Spring Security
- JPA / Hibernate

### Frontend
- React + TypeScript + Vite
- React Router, TanStack Query, Axios
- React Hook Form + Zod
- Tailwind CSS

### Base de datos
- MySQL

### Herramientas y DevOps
- Git y GitHub
- Docker (próximamente)

## Estructura del proyecto
StockFlow/
├── backend/
├── frontend/
└── docs/

## Estado del proyecto
Backend y frontend completos (versión MVP).

### Backend
- Autenticación JWT (login, roles ADMIN/EMPLEADO, endpoints protegidos por rol)
- Manejo global de excepciones (GlobalExceptionHandler)
- Gestión de usuarios (alta siempre como EMPLEADO, cambio de rol, listado, soft delete — solo ADMIN)
- Gestión de categorías (CRUD + soft delete)
- Gestión de proveedores (CRUD + soft delete)
- Gestión de productos (CRUD + soft delete, búsqueda por nombre/código/categoría/proveedor/rango de precio, reporte de bajo stock)
- Gestión de stock (ingreso de mercadería, ajustes positivos/negativos, historial de movimientos, stock inicial al crear un producto)
- Ventas (creación con múltiples detalles, precio tomado del producto, descuentos por línea, cálculo automático de totales, descuento automático de stock)
- Reportes (bajo stock, ventas por período, productos más vendidos)
- CORS configurado para el frontend

### Frontend
- Login y rutas protegidas por rol
- Dashboard con indicadores (productos activos, bajo stock, ventas del día y del mes)
- Productos: listado, detalle con historial de movimientos, alta, edición y baja (ADMIN), ingreso de mercadería y ajustes de stock
- Categorías y proveedores: listado, alta, edición y baja (ADMIN)
- Movimientos de stock: historial completo, visible para ADMIN y EMPLEADO
- Ventas: listado, detalle y alta con múltiples productos y descuentos
- Reportes: bajo stock, ventas por período y más vendidos
- Usuarios (ADMIN): listado, alta, cambio de rol y baja

El frontend consume solo una parte de la API: los endpoints de búsqueda y filtrado
(por nombre, categoría, proveedor, rango de precio, usuario, tipo de movimiento, etc.)
están implementados y disponibles en el backend, pero la interfaz todavía no los usa.
Ver [docs/api/endpoints.md](docs/api/endpoints.md).

## Cómo ejecutarlo

### Requisitos
- Java 21
- Node.js
- MySQL con una base de datos vacía creada

### Backend
Crear un archivo `.env` en `backend/` con:

```
DB_URL=jdbc:mysql://localhost:3306/<nombre_de_la_base>
DB_USER=<usuario>
DB_PASSWORD=<contraseña>
JWT_KEY=<clave secreta para firmar los tokens>
```

Luego, desde `backend/`:

```
./mvnw spring-boot:run
```

La API queda en `http://localhost:8080/api`. En el primer arranque se crea un usuario
administrador de desarrollo: `admin@stockflow.com` / `admin123`.

### Frontend
Desde `frontend/`:

```
npm install
npm run dev
```

La aplicación queda en `http://localhost:5173` (el origen habilitado por CORS en el backend).

## Documentación
- [docs/alcance](docs/alcance): alcance del MVP y definición de entidades
- [docs/casos-de-uso](docs/casos-de-uso): casos de uso
- [docs/modelos](docs/modelos): DER y diagrama de secuencia de venta
- [docs/api/endpoints.md](docs/api/endpoints.md): referencia de endpoints

## Próximos pasos
- Filtros de búsqueda en la interfaz (productos y movimientos de stock)
- Docker
