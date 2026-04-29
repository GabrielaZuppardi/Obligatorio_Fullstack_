import axios from "axios";
import usuarioModel from "../models/usuario.model.js";
import {obtenerRecetasService, 
        obtenerRecetaPorIdService, 
        crearRecetaService, 
        actualizarRecetaService, 
        eliminarRecetaService,
        obtenerMisRecetasService,
        buscarRecetasExternasService, 
        generarDescripcionRecetaService,
        generarDescripcionParaRecetaService,
        generarRecetaService,
        obtenerRecetasConFiltrosService} from "../services/recetas.services.js";
import { runMulterSingle } from "../utils/multer.util.js";
import { upload } from "../middlewares/multer.middleware.js";
import cloudinary from "../config/cloudinary.js";
import { uploadBufferToCloudinary } from "../utils/cloudinary.util.js";
 
 export const obtenerMisRecetasController = async (req, res, next) => {
    
        const { page, limit } = req.query;
        const usuarioId = req.usuario.id;

        const respuesta = await obtenerMisRecetasService(usuarioId, page, limit);

        res.status(200).json({
            mensaje: "Recetas del usuario obtenidas correctamente",
            ...respuesta
        });

};
        
export const obtenerRecetasController = async (req, res, next) => {
    
        const { page, limit } = req.query;

        const respuesta = await obtenerRecetasService(page, limit);

        res.status(200).json({
            mensaje: "Recetas obtenidas correctamente",
            ...respuesta
        });

};

export const obtenerRecetaPorIdController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const receta = await obtenerRecetaPorIdService(id, req.usuario);

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

        // Procesar imagen con multer
        await runMulterSingle(upload, "imagen", req, res);

        let imagenUrl = null;
        let imagenPublicId = null;

        if (req.file) {
            const result = await uploadBufferToCloudinary(
                cloudinary,
                req.file.buffer,
                {
                    resource_type: "auto",
                    folder: "recetas"
                }
            );

            imagenUrl = result.secure_url;
            imagenPublicId = result.public_id;
        }

        const datosReceta = {
            ...req.body,
            imagenUrl,
            imagenPublicId
        };

        const recetaCreada = await crearRecetaService(datosReceta, usuarioId);

        res.status(201).json({
            mensaje: "Receta creada correctamente",
            receta: recetaCreada
        });

    } catch (error) {
        next(error);
    }
};

/*
export const actualizarRecetaController = async (req, res, next) => {
   
        const { id } = req.params;

        const recetaActualizada = await actualizarRecetaService(id, req.body);

        res.status(200).json({
            mensaje: "Receta actualizada correctamente",
            receta: recetaActualizada
        });

};*/

export const actualizarRecetaController = async (req, res, next) => {
  const { id } = req.params;

  const recetaActualizada = await actualizarRecetaService(
    id,
    req.body,
    req.usuario
  );

  res.status(200).json({
    mensaje: "Receta actualizada correctamente",
    receta: recetaActualizada
  });
};

export const eliminarRecetaController = async (req, res, next) => {
    
        const { id } = req.params;

        const recetaEliminada = await eliminarRecetaService(id, req.usuario);

        res.status(200).json({
            mensaje: "Receta eliminada correctamente",
            receta: recetaEliminada
        });
};

export const buscarRecetasExternasController = async (req, res, next) => {
  try {
    const { query } = req.query;

    if (!query) {
      const error = new Error("La query es obligatoria");
      error.status = 400;
      throw error;
    }

    const resultado = await buscarRecetasExternasService(req.query);

    res.status(200).json({
      mensaje: "Recetas externas obtenidas correctamente",
      ...resultado
    });

  } catch (error) {
    next(error);
  }
};

export const generarDescripcionRecetaController = async (req, res, next) => {
  const { id } = req.params;

  const recetaActualizada = await generarDescripcionParaRecetaService(
    id,
    req.usuario
  );

  res.status(200).json({
    mensaje: "Descripción generada y guardada correctamente",
    receta: recetaActualizada
  });
};

export const generarRecetaController = async (req, res) => {
  const { ingredientes, dificultad, tiempoMaximo } = req.body;

  const resultado = await generarRecetaService({
    ingredientes,
    dificultad,
    tiempoMaximo
  });

  res.status(resultado.fallback ? 503 : 200).json({
    mensaje: resultado.fallback
      ? "Servicio de IA no disponible. Se devuelve una sugerencia alternativa."
      : "Receta generada con IA",
    fallback: resultado.fallback,
    receta: resultado.receta
  });
};

export const obtenerRecetasConFiltrosController = async (req, res, next) => {
  try {
    const resultado = await obtenerRecetasConFiltrosService(req.query);

    res.status(200).json({
      mensaje: "Recetas filtradas correctamente",
      ...resultado
    });

  } catch (error) {
    next(error);
  }
};