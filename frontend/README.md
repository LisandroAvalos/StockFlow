# StockFlow — Frontend

Interfaz web de StockFlow (React + TypeScript + Vite). Consume la API REST del backend.
Las instrucciones para levantar todo el proyecto están en el [README principal](../README.md).

## Scripts

- `npm run dev`: servidor de desarrollo en `http://localhost:5173`
- `npm run build`: chequeo de tipos y build de producción
- `npm run lint`: ESLint

## Estructura de `src/`

| Carpeta | Contenido |
|---|---|
| `api/` | Cliente Axios, constantes de endpoints y una función por request |
| `hooks/` | Hooks de TanStack Query (lecturas) y mutaciones con invalidación de caché |
| `features/` | Pantallas agrupadas por módulo (`products`, `categories`, `suppliers`, `stock`, `sales`, `reports`, `admin`, `home`, `auth`) |
| `types/` | Tipos de TypeScript que reflejan las respuestas y requests del backend |
| `context/` | Contexto de autenticación (usuario, login, logout) |
| `routes/` | Rutas protegidas (`PrivateRoute`, `AdminRoute`) |
| `layout/` | Navbar y layout general |
| `utils/` | Formato de fechas, rangos de fechas y etiquetas de tipos de movimiento |

## Convenciones

- Una capa por responsabilidad: `types → endpoints → api → hooks → pages`.
- Las mutaciones invalidan las claves de caché afectadas (`['products']`, `['stock']`, `['sales']`, etc.).
- Cada sección de una pantalla maneja sus propios estados de carga y error.
- Los mensajes de error se toman del body de la respuesta del backend (`getApiErrorMessage`).
- Los permisos se aplican en la interfaz (navbar y `AdminRoute`), pero el control real está en el backend.
