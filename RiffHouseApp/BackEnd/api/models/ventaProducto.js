import { DataTypes } from "sequelize";
import { sequelize } from "../database/index.js";

export const VentaProducto = sequelize.define(
    "VentaProducto",
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        cantidad: { type: DataTypes.INTEGER, allowNull: false },
        precioUnitario: { type: DataTypes.DECIMAL(8, 2), allowNull: false },
    },
    {
        tableName: "VentaProductos",
    }
);
