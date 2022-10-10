import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
    database: "productos",
    username: "root",
    password: "mariajose1922",
    host: "127.0.0.1",
    dialect: "mysql",
    define:{
        timestamps: false
    }
});