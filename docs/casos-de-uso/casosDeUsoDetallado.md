## Diagrama de Casos de Uso

El sistema StockFlow define dos actores: **Usuario Registrado** (rol EMPLEADO) y **Admin** (rol ADMIN). El Admin hereda todos los permisos del Usuario Registrado y además tiene acceso a la gestión completa del sistema (ABM de entidades maestras y ajustes de stock).

### Usuario Registrado

- **Iniciar sesión:** acceso al sistema mediante email y contraseña.
- **Registrar ventas:** permite crear una venta, agregando uno o más productos con su cantidad correspondiente. Al confirmar la venta, se dispara automáticamente el caso de uso **Descontar stock auto.** (relación *include*), que actualiza el `stockActual` de cada producto vendido y genera el `MovimientoStock` correspondiente con tipo `VENTA`.
- **Ver reportes:** consulta de reportes básicos del sistema (productos con bajo stock, ventas por período, productos más vendidos).
- **Filtrar productos:** búsqueda de productos por nombre, código, categoría, proveedor o rango de precio.
- **Registrar ingreso de mercadería:** carga de stock entrante por reposición de un proveedor. Genera un `MovimientoStock` de tipo `COMPRA`. Se considera una operación de rutina del negocio, por lo que no requiere permisos de Admin.

### Admin

- **ABM de categorías:** alta, baja (lógica) y modificación de categorías de productos.
- **ABM de usuarios:** alta, baja (lógica) y modificación de usuarios del sistema, incluyendo la asignación de rol.
- **ABM de productos:** alta, baja (lógica) y modificación de productos. Este caso de uso incluye (*include*) **Seleccionar categoría y proveedor**, ya que todo producto debe asociarse obligatoriamente a una categoría y un proveedor existentes.
- **ABM de proveedores:** alta, baja (lógica) y modificación de proveedores.
- **Ajustes manuales de stock:** corrección del stock de un producto fuera del flujo normal de compra o venta (por ejemplo, error de conteo o devolución). Genera un `MovimientoStock` de tipo `AJUSTE_POSITIVO` o `AJUSTE_NEGATIVO`. A diferencia del ingreso de mercadería, esta operación queda restringida a Admin porque representa una excepción que requiere mayor control y trazabilidad.

### Decisiones de diseño relevantes

- **Registrar ingreso de mercadería vs. Ajustes manuales de stock:** ambos modifican el `stockActual`, pero representan conceptos distintos. El primero es un evento esperado del negocio (reposición), mientras que el segundo es una corrección excepcional. Por eso se diferencian en el modelo (`tipo` en `MovimientoStock`) y en el nivel de permiso requerido.
- **Usuario que registra la venta:** no se modela como un paso explícito del caso de uso, ya que se obtiene automáticamente de la sesión activa del Usuario Registrado al momento de loguearse.
- **Detalle de venta:** la selección de productos y cantidades dentro de una venta es parte del flujo interno de **Registrar ventas**, no se modela como un caso de uso independiente.