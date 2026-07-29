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
- **ABM de usuarios:** alta (todo usuario nace con rol EMPLEADO), baja (lógica) y modificación de usuarios del sistema. La asignación de rol es un caso de uso separado (**Cambiar rol de usuario**), no parte del alta.
- **Cambiar rol de usuario:** actualización del rol asignado a un usuario existente (por ejemplo, promover a un EMPLEADO a ADMIN). Se modela como una acción independiente del ABM de usuarios para evitar que la creación de un usuario pueda definir su propio nivel de permisos.
- **ABM de productos:** alta, baja (lógica) y modificación de productos. Este caso de uso incluye (*include*) **Seleccionar categoría y proveedor**, ya que todo producto debe asociarse obligatoriamente a una categoría y un proveedor existentes. El alta de un producto también incluye (*include*) **Registrar ingreso de mercadería** cuando se especifica un stock inicial mayor a cero, generando un `MovimientoStock` de tipo `COMPRA` de forma automática.
- **ABM de proveedores:** alta, baja (lógica) y modificación de proveedores.
- **Ajustes manuales de stock:** corrección del stock de un producto fuera del flujo normal de compra o venta (por ejemplo, error de conteo o devolución). Genera un `MovimientoStock` de tipo `AJUSTE_POSITIVO` o `AJUSTE_NEGATIVO`. A diferencia del ingreso de mercadería, esta operación queda restringida a Admin porque representa una excepción que requiere mayor control y trazabilidad.

### Decisiones de diseño relevantes

- **Registrar ingreso de mercadería vs. Ajustes manuales de stock:** ambos modifican el `stockActual`, pero representan conceptos distintos. El primero es un evento esperado del negocio (reposición), mientras que el segundo es una corrección excepcional. Por eso se diferencian en el modelo (`tipo` en `MovimientoStock`) y en el nivel de permiso requerido.
- **Usuario que registra la venta:** no se modela como un paso explícito del caso de uso, ya que se obtiene automáticamente de la sesión activa del Usuario Registrado al momento de loguearse.
- **Detalle de venta:** la selección de productos y cantidades dentro de una venta es parte del flujo interno de **Registrar ventas**, no se modela como un caso de uso independiente.
- **Stock inicial al crear un producto:** el alta de un producto no asigna `stockActual` directamente — nace en cero y, si se indica una cantidad inicial, se dispara automáticamente el mismo mecanismo de `MovimientoStock` (tipo `COMPRA`) usado para reposiciones posteriores. Esto garantiza que todo cambio de stock, sin excepción, quede registrado en el historial de movimientos.
- **Alta de usuario vs. Cambiar rol:** se separan en dos casos de uso distintos por la misma razón que "Registrar ingreso de mercadería" está separado de "Ajustes manuales de stock" — evitar que una operación de rutina (crear un usuario) pueda otorgar accidentalmente o maliciosamente permisos elevados. Todo usuario nace con el rol de menor privilegio (EMPLEADO), y solo un Admin puede promoverlo explícitamente.