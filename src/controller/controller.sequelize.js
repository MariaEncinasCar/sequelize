import { ProductoServices } from "../services/producto.services.sequelize.js";
const servicio = new ProductoServices();

export class Controller {

  async guardar(producto){
    try {
        await servicio.guardarProducto(producto);
    } catch (error) {
        console.error("A ver", error.message);
    }
  }

  async buscarProducto(buscar){
    try {
        const result = await servicio.buscarProducto(buscar);
        return result[0];
    } catch (error) {
        console.error(error.message);
    }
  }

  async actualizar(producto){
    try {
        await servicio.actualizarProducto(producto);
    } catch (error) {
        console.error(error.message);
    }
  }

  async borrar(codigo){
    try {
        await servicio.borrarProducto(codigo);
    } catch (error) {
        console.error(error.message);
    }
  }

  async buscarTodos(){
    try {
      const result = await servicio.buscarTodos();
      return result;
    } catch (error) {
        console.error(error.message);
    }
  }
}