//importo el modelo correspondiente a Receta
import Receta from '../models/receta.model.js';
import axios from "axios";

export const obtenerMisRecetasService = async (usuarioId, page, limit) => {
    limit=Number(limit) || 3; //si no se envía un límite, se establece en 10 por defecto
    page=Number(page) || 1; //si no se envía un número de página, se establece en 1 por defecto
    const skip = (page - 1) * limit; //calcula cuántos documentos saltar según la página y el límite
    const totalRecetas = await Receta.countDocuments({ usuario: usuarioId }); //cuenta el total de recetas del usuario
    const totalPages = Math.ceil(totalRecetas / limit); //calcula el total de páginas
    const recetas = await Receta.find({ usuario: usuarioId })
        .skip(skip) //saltea las primeras 2 recetas
        .limit(limit);//limita el resultado a 3 recetas 
       /* console.log("usuarioId:", usuarioId);
        console.log("page:", page);
        console.log("limit:", limit);
        console.log("skip:", skip);*/

    return { recetas, totalPages, page, limit };
}

export const obtenerRecetasService = async (page, limit) => {

    limit=Number(limit) || 3; //si no se envía un límite, se establece en 10 por defecto
    page=Number(page) || 1; //si no se envía un número de página, se establece en 1 por defecto
    const skip = (page - 1) * limit; //calcula cuántos documentos saltar según la página y el límite
    const totalRecetas = await Receta.countDocuments(); //cuenta el total de recetas del usuario
    const totalPages = Math.ceil(totalRecetas / limit); //calcula el total de páginas
    const recetas = await Receta.find()
    .populate("usuario", "nombre") //populate el campo "usuario" con el campo "nombre"
    .populate("categoria", "nombre") //populate el campo "categoria" con el campo "nombre"
        .skip(skip) //saltea las primeras 2 recetas
        .limit(limit);//limita el resultado a 3 recetas 

    return { recetas, totalPages, page, limit };
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

export const buscarRecetasExternasService = async (query) => {
  const response = await axios.get(
    "https://api.spoonacular.com/recipes/complexSearch",
    {
      params: {
        query,
        apiKey: process.env.SPOONACULAR_API_KEY
      }
    }
  );

  return response.data;
};