//importo el modelo correspondiente a Receta
import Receta from '../models/receta.model.js';

export const obtenerRecetasService = async () => {
    const recetas = await Receta.find();
    return recetas;
}

export const obtenerRecetaPorIdService = async (id) => {
    const receta = await Receta.findById(id);
    return receta;
}   

export const crearRecetaService = async (receta) => {
    let nuevaReceta = new Receta(receta);
    await nuevaReceta.save();
    return nuevaReceta;
}   

export const actualizarRecetaService = async (id, receta) => {
    const recetaActualizada = await Receta.findByIdAndUpdate(id, receta, { returnDocument: "after" });
    return recetaActualizada;
}

export const eliminarRecetaService = async (id) => {
   const recetaEliminada = await Receta.findByIdAndDelete(id);
    return recetaEliminada;
}