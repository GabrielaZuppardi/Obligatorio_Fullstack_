 import { obtenerCategoriasService, 
          obtenerCategoriaPorIdService, 
          crearCategoriasService,
          actualizarCategoriaService,
          eliminarCategoriaService } from "../services/categorias.services.js";

//en los controlleers no debo devolver errores

 export const obtenerCategoriasController = async (req, res, next) => {
   
        const { page, limit } = req.query;

        const categorias = await obtenerCategoriasService(page, limit);

        res.status(200).json({
            mensaje: "Categorías obtenidas correctamente",
            ...categorias
        });

};

export const obtenerCategoriaPorIdController = async (req, res, next) => {
   
        const { id } = req.params;

        const categoria = await obtenerCategoriaPorIdService(id);

        res.status(200).json({
            mensaje: "Categoría obtenida correctamente",
            categoria
        });
};

export const crearCategoriaController = async (req, res, next) => {
    
        const categoriaCreada = await crearCategoriasService(req.body);

        res.status(201).json({
            mensaje: "Categoría creada correctamente",
            categoria: categoriaCreada
        });
   };


export const actualizarCategoriaController = async (req, res, next) => {
   
        const { id } = req.params;

        const categoriaActualizada = await actualizarCategoriaService(id, req.body);

        res.status(200).json({
            mensaje: "Categoría actualizada correctamente",
            categoria: categoriaActualizada
        });

};


export const eliminarCategoriaController = async (req, res, next) => {
        const { id } = req.params;

        const categoriaEliminada = await eliminarCategoriaService(id);

        res.status(200).json({
            mensaje: "Categoría eliminada correctamente",
            categoria: categoriaEliminada
        });
};


