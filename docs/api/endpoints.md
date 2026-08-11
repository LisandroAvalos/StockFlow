# StockFlow - Referencia de Endpoints

Base URL: http://localhost:8080/api
Todos los endpoints salvo login requieren Header Authorization: Bearer <token>.

## Auth
POST /auth/login (Público. Login con email y password. Devuelve token, id, nombre, email, rol)

## Categorías
GET /categories (Autenticado. Listar categorías activas)
GET /categories/{id} (Autenticado. Buscar por ID)
GET /categories/name/{name} (Autenticado. Buscar por nombre exacto)
POST /categories (ADMIN. Crear categoría con name)
PUT /categories/{id} (ADMIN. Actualizar nombre)
DELETE /categories/{id} (ADMIN. Baja lógica)

## Proveedores
GET /suppliers (Autenticado. Listar proveedores activos)
GET /suppliers/id/{id} (Autenticado. Buscar por ID)
GET /suppliers/name/{name} (Autenticado. Buscar por nombre exacto)
GET /suppliers/email/{email} (Autenticado. Buscar por email)
POST /suppliers (ADMIN. Crear proveedor con name, telephone, email)
PUT /suppliers/{id} (ADMIN. Actualizar datos)
DELETE /suppliers/{id} (ADMIN. Baja lógica)

## Productos
GET /products (Autenticado. Listar productos activos)
GET /products/id/{id} (Autenticado. Buscar por ID)
GET /products/code/{code} (Autenticado. Buscar por código)
GET /products/name?name= (Autenticado. Búsqueda parcial por nombre)
GET /products/category/{categoryId} (Autenticado. Filtrar por categoría)
GET /products/supplier/{supplierId} (Autenticado. Filtrar por proveedor)
GET /products/price-range?minPrice=&maxPrice= (Autenticado. Filtrar por rango de precio)
GET /products/low-stock (Autenticado. Listar productos con stock menor o igual al mínimo)
POST /products (ADMIN. Crear producto con name, code, description, price, offerPrice, initialStock, minStock, categoryId, supplierId. Si initialStock > 0 dispara automáticamente movimiento COMPRA)
PUT /products/{id} (ADMIN. Actualizar datos sin incluir stock)
DELETE /products/{id} (ADMIN. Baja lógica)

Nota de stock: El stock nunca se modifica vía PUT, únicamente por los endpoints de /stock o al crear el producto con initialStock.

## Gestión de stock
GET /stock (ADMIN. Historial completo de movimientos)
GET /stock/product/{productId} (ADMIN. Movimientos de un producto)
GET /stock/user/{userId} (ADMIN. Movimientos de un usuario)
GET /stock/type/{type} (ADMIN. Filtrar por tipo COMPRA, AJUSTE_POSITIVO, AJUSTE_NEGATIVO, VENTA)
GET /stock/date?start=&end= (ADMIN. Filtrar por rango de fechas ISO LocalDateTime)
POST /stock/entry (Autenticado. Registrar ingreso de mercadería con productId y quantity, genera tipo COMPRA)
POST /stock/adjust/positive (ADMIN. Ajuste positivo con productId y quantity)
POST /stock/adjust/negative (ADMIN. Ajuste negativo con productId y quantity, valida stock suficiente)

## Ventas
GET /sales (Autenticado. Listar ventas)
GET /sales/{id} (Autenticado. Buscar por ID)
GET /sales/user/{userId} (Autenticado. Ventas de un usuario)
GET /sales/date?start=&end= (Autenticado. Ventas por rango de fechas)
GET /sales/best-selling (Autenticado. Top 10 productos más vendidos)
POST /sales (Autenticado. Crear venta pasando array de details con productId, quantity y discount opcional. El precio unitario se toma del producto, descuenta stock y valida disponible por línea)

Ejemplo de respuesta de venta:
{
  "id": 1,
  "date": "2026-07-27T21:12:17.09",
  "total": 70500.00,
  "totalDiscount": 4500.00,
  "userId": 1,
  "userName": "Admin",
  "details": [
    {
      "id": 1,
      "product": { },
      "quantity": 3,
      "unitPrice": 15000.00,
      "discount": 10,
      "subtotal": 40500.00
    }
  ]
}

## Usuarios
GET /users (ADMIN. Listar todos los usuarios activos e inactivos)
GET /users/active (ADMIN. Listar solo usuarios activos)
GET /users/{id} (ADMIN. Buscar por ID)
POST /users (ADMIN. Crear usuario con name, email, password. Asigna rol EMPLEADO por defecto)
PATCH /users/{id}/role (ADMIN. Cambiar rol a ADMIN o EMPLEADO)
DELETE /users/{id} (ADMIN. Baja lógica)

## Notas generales
Soft delete: Category, Supplier, Product y User no se borran físicamente, el campo active pasa a false.
Errores: Manejo global. 404 para recursos no encontrados, 400 para validaciones o reglas de negocio, 401 para credenciales inválidas.
CORS: Habilitado para http://localhost:5173
Fechas: Formato LocalDateTime ISO 8601 (YYYY-MM-DDTHH:mm:ss)
