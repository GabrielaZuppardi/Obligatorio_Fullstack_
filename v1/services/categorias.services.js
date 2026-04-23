 //importo el modelo correspondiente a Categoria
 import { isValidObjectId } from 'mongoose';
import Categoria from '../models/categoria.model.js';
 
 export const obtenerCategoriasService = async (page, limit) => {
    limit=Number(limit) || 3;
    page=Number(page) || 1;
    const skip = (page - 1) * limit;
    const totalCategorias = await Categoria.countDocuments();
    const totalPages = Math.ceil(totalCategorias / limit);
    const categorias = await Categoria.find()
        .skip(skip)
        .limit(limit);
    return { categorias, totalCategorias, totalPages, page, limit };
}

export const obtenerCategoriaPorIdService = async (id) => {
    //La validación del id inválido tiene que hacerse antes de consultar la base.
    if (!isValidObjectId(id)) {
        const errorId = new Error("El id no es válido");
        errorId.status = 400;
        throw errorId;
    }

    const categoria = await Categoria.findById(id);

    if (!categoria) {
        const errorId = new Error("No se encontró la categoría con el id proporcionado");
        errorId.status = 404;
        errorId.details = { id };
        throw errorId;
    }

    return categoria;
};
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