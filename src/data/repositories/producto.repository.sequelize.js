import { Producto } from "../../models/producto.sequelize.js";
import { or } from "sequelize";

export class ProductoRepository {

  /**
   * Esta función guarda un producto en 
   * la base de datos de MySQL con sequelize.
   * 
   * @param {Producto} producto producto a guardar.
   * @returns 
   */
  guardar = async (producto) => {
    await Producto.create(producto);

    console.log("Producto guardado con éxito");
  };

  /**
   * Esta función actualiza un producto en 
   * la base de datos de MySQL con sequelize.
   * 
   * @param {Producto} producto producto a actualizar.
   * @returns 
   */
   actualizar = async (producto) => {
    await Producto.update(
      {
        nombre: producto.nombre,
        percio: producto.precio,
        stock: producto.stock,
        surtido: producto.surtido
      },
      {
        where: { code: producto.codigo },
      }
    );
    console.log("Producto actualizado");
  };

 /**
   * Esta función elimina un producto en 
   * la base de datos de MySQL con sequelize.
   * 
   * @param {String} codigo codigo del producto a eliminar.
   * @returns
   */
 eliminar = async (codigo) => {
    let a = await Producto.destroy({
        where: { codigo },
    });
    console.log("Producto eliminado con éxito");
 };

  /**
   * Esta función busca un producto en 
   * la base de datos de MySQL con sequelize.
   * 
   * @param {String} buscar nombre o codigo 
   * del producto a buscar.
   * @returns registro encontrado de ser así.
   */
  buscarProducto = async (buscar) => {
    const producto = await Producto.findOne({
      where: or({ codigo: buscar }, { nombre: buscar }),
    });
    return producto;
  };

  /**
   * Esta función recupera todos los
   * productos en la base de datos de MySQL
   * con sequelize.
   * 
   * @returns todos los productos en mysql.
   */
   buscarTodos = async () => {
    const products = await Producto.findAll({
      attributes: ["codigo", "nombre", "precio", "stock", "surtido"],
    });
    return products;
  };

}