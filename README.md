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
- React
- TypeScript
- Vite

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
En desarrollo. Backend completo.

### Completado
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

### En progreso / próximos pasos
- Frontend (React)