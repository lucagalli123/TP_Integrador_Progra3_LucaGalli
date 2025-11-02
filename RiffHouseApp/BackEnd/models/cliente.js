import { DataTypes } from "sequelize";
import { sequelize } from "../database";

export const Cliente = sequelize.define("Cliente", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
});
