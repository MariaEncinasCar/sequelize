import { STRING, FLOAT, BIGINT, DATE } from "sequelize";
import { sequelize } from "../data/connection.sequelize.js";

export const Producto = sequelize.define(
  "Producto",
  {
    codigo: { type: STRING, max: 6, primaryKey: true, allowNull: false, unique: true },
    nombre: { type: STRING, max: 100, allowNull: false },
    precio: { type: FLOAT, allowNull: false },
    stock: { type: BIGINT, allowNull: false },
    surtido: {type: DATE, allowNull: false},

  },
  { tableName: "producto" }
);

(async () => {
  await Producto.sync()
    .then((data) => {
      console.log("Table and model synced succesfully");
    })
    .catch((err) => {
      console.log("Error syncing the table nad model");
    });
})();