import axios from "axios";
import {obtenerRecetasService, 
        obtenerRecetaPorIdService, 
        crearRecetaService, 
        actualizarRecetaService, 
        eliminarRecetaService,
        obtenerMisRecetasService,
        buscarRecetasExternasService, generarDescripcionRecetaService} from "../services/recetas.services.js";

 export const obtenerMisRecetasController = async (req, res) => {
    const{page, limit} = req.query;
    const usuarioId = req.usuario.id;
    const respuesta = await obtenerMisRecetasService(usuarioId, page, limit);
    console.log(req.usuario);
    res.status(200).json({ mensaje: "Recetas del usuario", ...respuesta });
}
        
export const obtenerRecetasController = async(req, res) => {
     const{page, limit} = req.query;
    const recetas = await obtenerRecetasService(page, limit);
    res.status(200).json({ mensaje: "Obtener todas las recetas", recetas });
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

export const buscarRecetasExternasController = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ mensaje: "La query es obligatoria" });
    }

    const resultado = await buscarRecetasExternasService(query);

    res.status(200).json({
      mensaje: "Recetas externas obtenidas correctamente",
      ...resultado
    });

  } catch (error) {
    res.status(error.status || 500).json({
      mensaje: error.message || "Error interno"
    });
  }
};

export const generarDescripcionRecetaController = async (req, res) => {
  try {
    const { id } = req.params;

    const receta = await obtenerRecetaPorIdService(id);

    if (!receta) {
      return res.status(404).json({
        mensaje: "Receta no encontrada"
      });
    }

    // 👉 ahora delegás
    const descripcionGenerada = await generarDescripcionRecetaService(receta);

    if (!descripcionGenerada) {
      return res.status(200).json({
        mensaje: "No se pudo generar la descripción con IA. La receta no fue modificada."
      });
    }

    const recetaActualizada = await actualizarRecetaService(id, {
      description: descripcionGenerada
    });

    return res.status(200).json({
      mensaje: "Descripción generada y guardada correctamente",
      receta: recetaActualizada
    });

  } catch (error) {
    return res.status(500).json({
      mensaje: "Error interno"
    });
  }
};