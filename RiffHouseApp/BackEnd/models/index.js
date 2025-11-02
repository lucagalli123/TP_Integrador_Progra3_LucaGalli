import { Producto } from "./producto.js";
import { Usuario } from "./usuario.js";
import { Venta } from "./venta.js";
import { DetalleVenta } from "./detalleVenta.js";

// relaciones ================================================

// Producto y Venta

Producto.belongsToMany(Venta, { through: "DetalleVenta" });
Venta.belongsToMany(Producto, { through: "DetalleVenta" });

Producto.hasMany(DetalleVenta);
DetalleVenta.belongsTo(Producto);

Venta.hasMany(DetalleVenta);
DetalleVenta.belongsTo(Venta);

export { Producto, Venta, DetalleVenta, Usuario };
