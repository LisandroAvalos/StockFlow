## Entidades

### Rol
- id
- nombre (ADMIN, EMPLEADO)

### Usuario
- id
- nombre
- email
- password (hasheado con BCrypt; nunca se expone en las respuestas de la API)
- activo (baja lógica)
- rol (ManyToOne → Rol; todo usuario nace como EMPLEADO, el cambio a ADMIN se hace con un endpoint separado)

### Proveedor
- id
- nombre
- email
- telefono
- activo (baja lógica)

### Categoria
- id
- nombre
- activo (baja lógica)

### Producto
- id
- nombre
- codigo (String, único)
- descripcion
- precio (BigDecimal)
- precioOferta (BigDecimal, nullable)
- stockActual (solo se modifica a través de MovimientoStock; nace en 0 y se carga con el stock inicial al momento de la creación)
- stockMinimo (para el aviso)
- activo (baja lógica)
- categoria (ManyToOne → Categoria)
- proveedor (ManyToOne → Proveedor)

### Venta
- id
- fecha
- total (calculado; suma de subtotales netos de todos los detalles)
- descuentoTotal (calculado; suma de los descuentos aplicados en los detalles, nunca nulo)
- usuario (ManyToOne → Usuario)

### DetalleVenta
- id
- venta (ManyToOne → Venta)
- producto (ManyToOne → Producto)
- cantidad
- precioUnitario (tomado del producto al momento de la venta — usa precioOferta si existe, si no precio; nunca lo envía el cliente)
- descuento (porcentaje, nullable en el request pero siempre se guarda un valor, 0 por defecto)

### MovimientoStock
- id
- producto (ManyToOne → Producto)
- tipo (COMPRA, AJUSTE_POSITIVO, AJUSTE_NEGATIVO, VENTA)
- cantidad
- fecha
- usuario (ManyToOne → Usuario)