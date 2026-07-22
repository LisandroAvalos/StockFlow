## Entidades

### Rol
- id
- nombre (ADMIN, EMPLEADO)

### Usuario
- id
- nombre
- email
- password
- rol (ManyToOne → Rol)

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
- total
- descuentoTotal (nullable)
- usuario (ManyToOne → Usuario)

### DetalleVenta
- id
- venta (ManyToOne → Venta)
- producto (ManyToOne → Producto)
- cantidad
- precioUnitario
- descuento (nullable)

### MovimientoStock
- id
- producto (ManyToOne → Producto)
- tipo (COMPRA, AJUSTE_POSITIVO, AJUSTE_NEGATIVO, VENTA)
- cantidad
- fecha
- usuario (ManyToOne → Usuario)