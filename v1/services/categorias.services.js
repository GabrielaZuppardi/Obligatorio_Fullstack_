 //importo el modelo correspondiente a Categoria
 import Categoria from '../models/categoria.model.js';
 
 export const obtenerCategoriasService = async () => {
    const categorias = await Categoria.find();
    return categorias;
}

export const obtenerCategoriaPorIdService = async (id) => {
    const categoria = await Categoria.findById(id);
    return categoria;
}

 export const crearCategoriasService = async (categoria) => {
    let nuevaCategoria = new Categoria(categoria);
    await nuevaCategoria.save();
    return nuevaCategoria;
     
}

export const actualizarCategoriaService = async (id, categoria) => {
    const categoriaActualizada = await Categoria.findByIdAndUpdate(id, categoria, { returnDocument: "after" });
    return categoriaActualizada;
}
    
export const eliminarCategoriaService = async (id) => {
   const categoriaEliminada = await Categoria.findByIdAndDelete(id);
    return categoriaEliminada;
}
    

/*ACA DEJO UN EJEMPLO DE UNA BUSQUEDA POR RANGO
export const obtenerProductosPorRangoPrecioService = async (min, max) => {
    const productos = await Producto.find({ precio: { $gte: min, $lte: max } });
    return productos;
}

*/