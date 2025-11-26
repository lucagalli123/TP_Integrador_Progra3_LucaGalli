import { DataTypes } from "sequelize";
import { sequelize } from "../database/index.js";

export const Producto = sequelize.define(
    "Producto",
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        marca: { type: DataTypes.STRING, allowNull: false },
        modelo: { type: DataTypes.STRING, allowNull: false },
        categoria: { type: DataTypes.STRING, allowNull: false },
        imagen: { type: DataTypes.STRING, allowNull: false },
        precio: { type: DataTypes.DECIMAL(8, 2) },
        activo: { type: DataTypes.BOOLEAN, allowNull: false },
    },
    {
        tableName: "Productos",
    }
);
