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

    const { nombre } = categoria;

    // validación mínima defensiva 
    if (!nombre) {
        const error = new Error("El nombre de la categoría es obligatorio");
        error.status = 400;
        throw error;
    }

    const nombreNormalizado = nombre.trim().toLowerCase();

    const categoriaExistente = await Categoria.findOne({
        nombre: nombreNormalizado
    });

    if (categoriaExistente) {
        const error = new Error("Ya existe una categoría con ese nombre");
        error.status = 409;
        throw error;
    }

    const nuevaCategoria = new Categoria({
        ...categoria,
        nombre: nombreNormalizado
    });

    await nuevaCategoria.save();

    return nuevaCategoria;
};

export const actualizarCategoriaService = async (id, categoria) => {

    // Validar id
    if (!isValidObjectId(id)) {
        const error = new Error("El id no es válido");
        error.status = 400;
        throw error;
    }

    const { nombre } = categoria;

    let datosActualizados = { ...categoria };

    // Si viene nombre → normalizar y validar duplicado
    if (nombre) {
        const nombreNormalizado = nombre.trim().toLowerCase();

        const categoriaExistente = await Categoria.findOne({
            nombre: nombreNormalizado,
            _id: { $ne: id } // excluir la categoría que se está modificando de la búsqueda de duplicados
        });

        if (categoriaExistente) {
            const error = new Error("Ya existe una categoría con ese nombre");
            error.status = 409;
            throw error;
        }

        datosActualizados.nombre = nombreNormalizado;
    }

    const categoriaActualizada = await Categoria.findByIdAndUpdate(
        id,
        datosActualizados,
        { returnDocument: "after" } 
    );

    // Validar si existe
    if (!categoriaActualizada) {
        const error = new Error("No se encontró la categoría");
        error.status = 404;
        throw error;
    }

    return categoriaActualizada;
};
    
export const eliminarCategoriaService = async (id) => {

    // Validar id
    if (!isValidObjectId(id)) {
        const error = new Error("El id no es válido");
        error.status = 400;
        throw error;
    }

    const categoriaEliminada = await Categoria.findByIdAndDelete(id);

    // Validar existencia
    if (!categoriaEliminada) {
        const error = new Error("No se encontró la categoría");
        error.status = 404;
        throw error;
    }

    return categoriaEliminada;
};
    



