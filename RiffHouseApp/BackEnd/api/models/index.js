import { Producto } from "./producto.js";
import { Usuario } from "./usuario.js";
import { Venta } from "./venta.js";
import { VentaProducto } from "./ventaProducto.js";

// relaciones ================================================

// Producto y Venta

Producto.belongsToMany(Venta, { through: "VentaProducto", foreignKey: "idProducto" });
Venta.belongsToMany(Producto, { through: "VentaProducto", foreignKey: "idVenta" });

Producto.hasMany(VentaProducto, { foreignKey: "idProducto" });
VentaProducto.belongsTo(Producto, { foreignKey: "idProducto" });

Venta.hasMany(VentaProducto, { foreignKey: "idVenta" });
VentaProducto.belongsTo(Venta, { foreignKey: "idVenta" });

export { Producto, Venta, VentaProducto, Usuario };

// ============================================
