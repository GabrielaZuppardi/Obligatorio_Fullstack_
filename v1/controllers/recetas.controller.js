import {obtenerRecetasService, 
        obtenerRecetaPorIdService, 
        crearRecetaService, 
        actualizarRecetaService, 
        eliminarRecetaService} from "../services/recetas.service.js";

export const obtenerRecetasController = async(req, res) => {
    const recetas = await obtenerRecetasService();
    res.json({ mensaje: "Obtener todas las recetas", recetas });
}

export const obtenerRecetaPorIdController = async (req, res) => {
    const { id } = req.params;
    const receta = await obtenerRecetaPorIdService(id);
    res.json({ mensaje: receta });
}   

export const crearRecetaController = async (req, res) => {
   const recetaCreada = await crearRecetaService(req.body);
       res.json({ mensaje: `Receta creada`, receta: recetaCreada });
}

export const actualizarRecetaController = async (req, res) => {
    const { id } = req.params;
    const recetaActualizada = await actualizarRecetaService(id, req.body);
    res.json({ mensaje: `Receta actualizada`, receta: recetaActualizada });
}

export const eliminarRecetaController = async(req, res) => {
    const { id } = req.params;
    const recetaEliminada = await eliminarRecetaService(id);
    res.json({ mensaje: `Receta eliminada`, receta: recetaEliminada });
}   
