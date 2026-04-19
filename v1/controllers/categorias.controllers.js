 import { obtenerCategoriasService, 
          obtenerCategoriaPorIdService, 
          crearCategoriasService,
          actualizarCategoriaService,
          eliminarCategoriaService } from "../services/categorias.services.js";



export const obtenerCategoriasController = async(req, res) => {
    const categorias = await obtenerCategoriasService();
    res.json({ mensaje: "Obtener todas las categorías", categorias });
}   

export const obtenerCategoriaPorIdController = async (req, res) => {
    const { id } = req.params;
    const categoria = await obtenerCategoriaPorIdService(id);
    res.json({ mensaje: categoria });
}   

export const crearCategoriaController = async (req, res) => {
   const categoriaCreada = await crearCategoriasService(req.body);
       res.json({ mensaje: `Producto creado`, producto: categoriaCreada });
} 


export const actualizarCategoriaController = async (req, res) => {
    const { id } = req.params;
    const categoriaActualizada = await actualizarCategoriaService(id, req.body);
    res.json({ mensaje: `Categoría actualizada`, categoria: categoriaActualizada });
}



export const eliminarCategoriaController = async(req, res) => {
    const { id } = req.params;
    const categoriaEliminada = await eliminarCategoriaService(id);
    res.json({ mensaje: `Categoría eliminada`, categoria: categoriaEliminada });
}

/*ACA DEJO UN EJEMPLO DE UNA BUSQUEDA POR RANGO
export const obtenerProductosPorRangoPrecioController = async (req, res) => {
    const { min, max } = req.params;
    const productos = await obtenerProductosPorRangoPrecioService(min, max);
    res.json({ mensaje: "Productos obtenidos por rango de precio", productos });
}
*/