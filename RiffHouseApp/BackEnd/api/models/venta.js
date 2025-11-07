import { DataTypes } from "sequelize";
import { sequelize } from "../database/index.js";

export const Venta = sequelize.define(
    "Venta",
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        cliente: { type: DataTypes.STRING, allowNull: false },
        fecha: { type: DataTypes.STRING, allowNull: false },
        total: { type: DataTypes.DECIMAL(8, 2), allowNull: false },
    },
    {
        tableName: "Ventas",
    }
);
