## Diagrama de Secuencia — Confirmar Venta
El flujo modela la confirmación de una venta desde que el **Usuario** la dispara hasta que recibe la confirmación, pasando por la validación de stock producto por producto.

### Flujo principal
El **Usuario** invoca `confirmarVenta(detalles[])` sobre el **VentaController**, que delega en **VentaService** mediante `crearVenta(detalles[], usuario)`. A partir de ahí, **VentaService** itera sobre cada detalle de la venta: por cada uno, consulta el producto a **ProductoService** con `obtenerProducto(productoId)` y luego invoca `registrarVenta(producto, cantidad, usuario)` sobre **StockMovementService**, que es quien valida si hay stock suficiente.

### Validación de stock por detalle
Si el stock es **insuficiente**, **StockMovementService** devuelve un error que **VentaService** propaga como excepción hacia **VentaController**, y este responde `400 Bad Request` al Usuario, cortando el flujo completo — ningún detalle procesado hasta ese punto llega a persistirse. Si el stock es **suficiente**, **StockMovementService** descuenta el stock y crea el `MovimientoStock` (tipo `VENTA`) directamente contra la base de datos, y el loop continúa con el siguiente detalle.

### Persistencia de la venta
Recién cuando todos los detalles pasaron la validación de stock, **VentaService** persiste la `Venta` (`total`, `descuentoTotal`) y cada `DetalleVenta` asociado en la base de datos. Confirmada la escritura, **VentaService** devuelve la venta creada a **VentaController**, que responde la confirmación de venta al Usuario.

### Decisiones de diseño relevantes
- **Validación de stock por detalle, no por venta completa:** el chequeo de stock ocurre dentro del loop, ítem por ítem, en lugar de validar todo el pedido antes de empezar a procesar. Esto simplifica el flujo, aunque implica que el corte por stock insuficiente puede ocurrir en cualquier punto del loop.
- **Orden entre movimiento de stock y persistencia de la venta:** el descuento de stock y la creación del `MovimientoStock` (tipo `VENTA`) ocurren antes de crear la `Venta` y sus `DetalleVenta`. La venta como entidad completa (con su total y descuento) solo se registra una vez que se confirmó que hay stock para todos los productos involucrados.
- **Corte inmediato ante stock insuficiente:** no se contempla un flujo de venta parcial — si un solo detalle falla por falta de stock, toda la operación se corta con `400 Bad Request`, consistente con el enfoque transaccional del resto del backend (ABM con soft delete, etc.).
