import axios from "axios";
import usuarioModel from "../models/usuario.model.js";
import {obtenerRecetasService, 
        obtenerRecetaPorIdService, 
        crearRecetaService, 
        actualizarRecetaService, 
        eliminarRecetaService,
        obtenerMisRecetasService,
        buscarRecetasExternasService, generarDescripcionRecetaService, generarRecetaService} from "../services/recetas.services.js";
import cloudinary from "../config/cloudinary.js";
import { uploadBufferToCloudinary } from "../utils/cloudinary.util.js";
 
 export const obtenerMisRecetasController = async (req, res, next) => {
    try {
        const { page, limit } = req.query;
        const usuarioId = req.usuario.id;

        const respuesta = await obtenerMisRecetasService(usuarioId, page, limit);

        res.status(200).json({
            mensaje: "Recetas del usuario obtenidas correctamente",
            ...respuesta
        });

    } catch (error) {
        next(error);
    }
};
        
export const obtenerRecetasController = async (req, res, next) => {
    try {
        const { page, limit } = req.query;

        const respuesta = await obtenerRecetasService(page, limit);

        res.status(200).json({
            mensaje: "Recetas obtenidas correctamente",
            ...respuesta
        });

    } catch (error) {
        next(error);
    }
};

export const obtenerRecetaPorIdController = async (req, res, next) => {
    try {
        const { id } = req.params;

        const receta = await obtenerRecetaPorIdService(id);

        res.status(200).json({
            mensaje: "Receta obtenida correctamente",
            receta
        });

    } catch (error) {
        next(error);
    }
}; 



export const crearRecetaController = async (req, res, next) => {
    try {
        const usuarioId = req.usuario.id;

        let imageUrl = null;

        // 👇 si viene imagen, subirla
        if (req.file) {
            const result = await uploadBufferToCloudinary(
                cloudinary,
                req.file.buffer,
                {
                    resource_type: "auto",
                    folder: "recetas"
                }
            );

            imageUrl = result.secure_url;
        }

        // 👇 agregar imageUrl al body
        const recetaData = {
            ...req.body,
            imageUrl
        };

        const recetaCreada = await crearRecetaService(recetaData, usuarioId);

        res.status(201).json({
            mensaje: "Receta creada correctamente",
            receta: recetaCreada
        });

    } catch (error) {
        next(error);
    }
};

export const actualizarRecetaController = async (req, res, next) => {
    try {
        const { id } = req.params;

        const recetaActualizada = await actualizarRecetaService(id, req.body);

        res.status(200).json({
            mensaje: "Receta actualizada correctamente",
            receta: recetaActualizada
        });

    } catch (error) {
        next(error);
    }
};

export const eliminarRecetaController = async (req, res, next) => {
    try {
        const { id } = req.params;

        const recetaEliminada = await eliminarRecetaService(id);

        res.status(200).json({
            mensaje: "Receta eliminada correctamente",
            receta: recetaEliminada
        });

    } catch (error) {
        next(error);
    }
};

export const buscarRecetasExternasController = async (req, res, next) => {
  try {
    const { query } = req.query;

    if (!query) {
      const error = new Error("La query es obligatoria");
      error.status = 400;
      throw error;
    }

    const resultado = await buscarRecetasExternasService(query);

    res.status(200).json({
      mensaje: "Recetas externas obtenidas correctamente",
      ...resultado
    });

  } catch (error) {
    next(error);
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
 export const generarRecetaController = async (req, res) => {
    try {
        const { ingredientes, dificultad, tiempoMaximo } = req.body;

        const receta = await generarRecetaService({
            ingredientes,
            dificultad,
            tiempoMaximo
        });

        res.status(200).json({
            mensaje: "Receta generada con IA",
            receta
        });

    } catch (error) {

        // fallback en caso de error en el servicio de IA
        res.status(200).json({
            mensaje: "Servicio de IA no disponible. Se devuelve una sugerencia alternativa.",
            fallback: true,
            receta: {
                titulo: "Receta sugerida manual",
                descripcion: "Podés crear una receta con los ingredientes proporcionados.",
                ingredientes: req.body.ingredientes || [],
                pasos: [
                    "Seleccionar ingredientes",
                    "Definir método de cocción",
                    "Preparar y cocinar",
                    "Servir"
                ],
                tiempoPreparacion: req.body.tiempoMaximo || 30,
                dificultad: req.body.dificultad || "media",
                porciones: 2
            }
        });
    }
};

