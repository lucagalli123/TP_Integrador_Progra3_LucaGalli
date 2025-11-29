import { Sequelize } from "sequelize";
import { DATABASE, DBUSER, DBPASS } from "../../variablesEntorno.js";

export const sequelize = new Sequelize(DATABASE, DBUSER, DBPASS, {
    host: "localhost",
    dialect: "mysql",
    logging: false, // ver que onda despues esto
});
