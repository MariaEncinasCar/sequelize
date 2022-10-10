import { Controller } from "./controller/controller.sequelize.js";
import { Producto } from "./models/producto.sequelize.js";
//import { Producto } from "./models/producto.js";
import { question } from "readline-sync";
import moment from "moment";

const controller = new Controller();

const printProduct = (producto) => {
  const { codigo, nombre, precio, stock, surtido } = producto.dataValues;
  console.log(
    `Producto: 
      code: ${codigo},
      name: ${nombre},
      price: ${precio},
      stock: ${stock},
      surtido: ${moment(surtido).format("MMMM Do YYYY, h:mm:ss a")},`);
};

let terminar = false;

console.log(`\nEl programa registra, actualiza, elimina, busca y muestrar productos registrados con MySQL. 
Los campos son obligatorios:
    Código debe ser un string de 6 caracteres, no repetible).
    Nombre (string de 100 caracteres).
    Precio (número flotante).
    Stock (número entero).
    Última fecha de surtido (Date).`);
  

while (terminar != true) {
    console.log(`\nMenu
    1. Registrar un Producto nuevo.
    2. Actualizar un Producto según su código.
    3. Eliminar un Producto según su código.
    4. Buscar un Producto por código o nombre.
    5. Consultar la lista de Productos.
    6. Terminar.\n`);

    const m = question("Eliga la operacion que desea realizar: ");

    switch (m) {
    case "1":
      try {
        let codigo = question("Ingresa el codigo del producto: ");

        let result = await controller.buscarProducto(codigo);
        
        if (!result) {
            let nombre = question("Ingresa el nombre del producto: ");
            let precio = question("Ingresa el precio del producto: ");
            let stock = question("Ingresa el stock del producto: ");
            let surtido = moment().format('YYYY-MM-DD hh:mm:ss');

            let producto = Product.build({ codigo, nombre, precio, stock, surtido}).dataValues;

            await controller.guardar(producto);
        }else{
            console.log("El producto ya existe")
        }
      } catch (err) {
        console.error(err.message);
      }
      break;

    case "2":
      try {
        let codigo = question("\nIngrese el codigo del producto a actualizar: ");
        let result = await controller.buscarProducto(codigo);

        if (result) {
            let nombre = question("Ingresa el nombre del producto: ");
            let precio = question("Ingresa el precio del producto: ");
            let stock = question("Ingresa el stock del producto: ");
            let surtidoDate = moment().format('YYYY-MM-DD hh:mm:ss');

            let producto = new Producto(codigo, nombre, precio, stock, surtidoDate);

            await controller.actualizar(producto);
        } else {
          console.log("El producto no existe");
        }
        
      } catch (error) {
        console.error(error.message);
      }
      break;

    case "3":
      try {
        let codigo = question("\nIngrese el codigo del producto a eliminar: ");
        let result = await controller.buscarProducto(codigo);

        if (result) {
            await controller.borrar(codigo);
        }else{
            console.log("El producto no existe");
        }

      } catch (error) {
        console.error(error.message);
      }
      break;

    case "4":
      try {
        let result = await controller.buscarProducto(question("\nEscriba el codigo/nombre del producto a buscar: "));

        if (result) {
          printProduct(result);
        }
      } catch (error) {
        console.error(error.message);
      }
      break;

    case "5":
      try {
        let result = await controller.buscarTodos();

        if (result) {
          result.map(
            (row) => {
              printProduct(row)
            }
          );
        } else {
          console.log("No hay productos");
        }
      } catch (err) {
        console.error(err.message);
      }
      break;

      case "6":
        terminar = true;
        break;
  
      default:
        console.log("Ingrese una opción válida\n");
    }
}