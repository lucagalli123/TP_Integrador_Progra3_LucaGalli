import { Cliente } from "./cliente.js";
import { Producto } from "./producto.js";
import { Usuario } from "./usuario.js";
import { Venta } from "./venta.js";
import { VentaProducto } from "./ventaProducto.js";

// relaciones ================================================

// cliente y venta

Cliente.hasMany(Venta, { foreignKey: "idCliente" });
Venta.belongsTo(Cliente, { foreignKey: "idCliente" });

// producto y venta

Producto.belongsToMany(Venta, { through: "VentaProducto" });
Venta.belongsToMany(Producto, { through: "VentaProducto" });

Producto.hasMany(VentaProducto);
VentaProducto.belongsTo(Producto);

Venta.hasMany(VentaProducto);
VentaProducto.belongsTo(Venta);

export { Cliente, Producto, Venta, VentaProducto, Usuario };
