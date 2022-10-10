import {ProductoRepository} from "../data/repositories/producto.repository.sequelize.js";
const productoRepository = new ProductoRepository();

/**
 * Clase ProductoServices que 
 * representa a los servicios de
 * que ofrecidos para productos.
 * 
 */
export class ProductoServices {

  /**
   * Constructor de la clase.
   */
   constructor(){

  }

  /**
   * Esta función guarda un producto.
   * 
   * @param producto producto a guardar.
   * @returns 
   */
   async guardarProducto (producto){
    await productoRepository.guardar(producto);
  }

  /**
   * Esta función busca un producto.
   * 
   * @param buscar nombre o codigo del producto.
   * @returns el prodcuto encontrado.
   */
   async buscarProducto(buscar) {
    let result = await productoRepository.buscarProducto(buscar);

    if (result.length === 0){
      throw new Error("El producto no existe");
    } 
    return result;
  }

  /**
   * Esta función actualiza un producto.
   * 
   * @param producto producto a actualizar.
   * @returns
   */
  async actualizarProducto(producto) {
    let productoActualizar = await productoRepository.buscarProducto(producto.code);

    if(productoActualizar === undefined){
      throw new Error("El producto no se encuentra definido y no se puede actualizar");
    }
    else if(productoActualizar === null){
      throw new Error("El producto es nulo y no se puede actualizar");
    }
      
    await productoRepository.actualizar(producto);
  }

  /**
   * Esta función elimina un producto.
   * 
   * @param codigo codigo del producto a borrar. 
   * @returns 
   */
   async borrarProducto(codigo){
    let productoEliminar = await productoRepository.buscarProducto(codigo);

    if(productoEliminar === undefined){
      throw new Error("El producto no se encuentra definido y no se puede eliminar");
    }
    else if(productoEliminar === null){
      throw new Error("El producto es nulo y no se puede eliminar");
    } 
    else if(productoEliminar.length === 0){
      throw new Error("No se encontró el producto y no se puede eliminar");
    }
    await productoRepository.eliminar(codigo);
  }

  /**
   * Esta función recupera todos los
   * productos guardados.
   * 
   * @returns todos los productos.
   */
   async buscarTodos(){
    let lista = await productoRepository.buscarTodos();

    if(!lista){
      throw new Error("Ocurrió un error al consultar");
    }

    return lista;
  };

}