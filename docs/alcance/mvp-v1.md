## Funcionalidades

### Usuario y Seguridad
- Inicio de sesión.
- Roles (ADMIN, EMPLEADO).
- Gestión de usuarios (solo ADMIN).
- Permisos por rol:
  - ADMIN: acceso completo.
  - EMPLEADO: puede registrar ventas y ver reportes.

### Productos
- Alta de productos.
- Baja lógica de productos.
- Modificación de productos.
- Búsqueda por nombre, código, categoría o proveedor.
- Búsqueda por rango de precio.
- Stock mínimo configurable.
- Precio de venta y precio de oferta (opcional).
- Un proveedor por producto.

### Categorías
- Crear y administrar categorías de productos.

### Proveedores
- Registrar proveedores.
- Consultar proveedores.
- Asociar productos a proveedores.

### Gestión de stock
- Registrar ingreso de mercadería (tipo: COMPRA).
- Ajustes manuales de stock positivos y negativos (solo ADMIN) (tipo: AJUSTE_POSITIVO, AJUSTE_NEGATIVO).
- Descuento automático de stock al confirmar una venta (tipo: VENTA).
- Historial de movimientos con tipo, cantidad, fecha y usuario.
- Al crear un producto, se puede indicar un stock inicial, que genera automáticamente un movimiento de tipo COMPRA.
- Validación de stock insuficiente al realizar un ajuste negativo.

### Ventas
- Crear una venta con uno o más detalles.
- Cada detalle incluye: producto, cantidad y descuento (opcional, en porcentaje).
- El precio unitario de cada detalle se toma automáticamente del producto (precio de oferta si existe, si no el precio de lista); nunca se recibe del cliente.
- Total de la venta calculado automáticamente como suma de los subtotales netos (ya con descuento aplicado) de cada detalle.
- Descuento total de la venta calculado automáticamente como suma de los montos descontados en cada detalle.
- Descontar stock automáticamente al confirmar la venta, generando un MovimientoStock de tipo VENTA por cada detalle.
- Validación de stock insuficiente al confirmar una venta.
- Registrar fecha y usuario que realizó la venta.

### Reportes básicos
- Productos con bajo stock.
- Ventas por período.
- Productos más vendidos.