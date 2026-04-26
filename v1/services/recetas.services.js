//importo el modelo correspondiente a Receta
import Receta from '../models/receta.model.js';
import axios from "axios";
import { isValidObjectId } from 'mongoose';
import Usuario from '../models/usuario.model.js';
import Categoria from '../models/categoria.model.js';

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

    return { recetas, totalRecetas, totalPages, page, limit };
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

    return { recetas, totalRecetas, totalPages, page, limit };
}

export const obtenerRecetaPorIdService = async (id) => {

    // 🔹 Validar id
    if (!isValidObjectId(id)) {
        const error = new Error("El id no es válido");
        error.status = 400;
        throw error;
    }

    const receta = await Receta.findById(id)
        .populate("usuario", "nombre")
        .populate("categoria", "nombre");

    // 🔹 Validar existencia
    if (!receta) {
        const error = new Error("No se encontró la receta");
        error.status = 404;
        error.details = { id };
        throw error;
    }

    return receta;
}; 

export const crearRecetaService = async (receta, usuarioId) => {

    const { categoria, titulo } = receta;

    if (!isValidObjectId(usuarioId)) {
        const error = new Error("El id del usuario no es válido");
        error.status = 400;
        throw error;
    }

    if (!isValidObjectId(categoria)) {
        const error = new Error("El id de la categoría no es válido");
        error.status = 400;
        throw error;
    }

    const usuarioExiste = await Usuario.findById(usuarioId);

    if (!usuarioExiste) {
        const error = new Error("No se encontró el usuario");
        error.status = 404;
        throw error;
    }

    const categoriaExiste = await Categoria.findById(categoria);

    if (!categoriaExiste) {
        const error = new Error("No se encontró la categoría");
        error.status = 404;
        throw error;
    }

    const recetaExistente = await Receta.findOne({
        titulo: titulo.trim(),
        usuario: usuarioId
    });

    if (recetaExistente) {
        const error = new Error("Ya existe una receta con ese título para este usuario");
        error.status = 409;
        throw error;
    }

    if (usuarioExiste.plan === "plus") {
        const cantidadRecetas = await Receta.countDocuments({
            usuario: usuarioId
        });

        if (cantidadRecetas >= 4) {
            const error = new Error("Límite de recetas alcanzado para plan plus");
            error.status = 403;
            throw error;
        }
    }
console.log("ANTES DE CREAR RECETA");
    const nuevaReceta = new Receta({
        ...receta,
        titulo: titulo.trim(),
        usuario: usuarioId
    });

    await nuevaReceta.save();
console.log("RECETA GUARDADA:", nuevaReceta._id);
    return nuevaReceta;
};

export const actualizarRecetaService = async (id, receta, usuarioId) => {
    if (!isValidObjectId(id)) {
        const error = new Error("El id no es válido");
        error.status = 400;
        throw error;
    }

    const recetaExistente = await Receta.findById(id);

    if (!recetaExistente) {
        const error = new Error("No se encontró la receta");
        error.status = 404;
        throw error;
    }

    if (!recetaExistente.usuario.equals(usuarioId)) {
        const error = new Error("No tenés permiso para modificar esta receta");
        error.status = 403;
        throw error;
    }

    const { categoria, titulo } = receta;

    const datosActualizados = { ...receta };

    if (categoria) {
        if (!isValidObjectId(categoria)) {
            const error = new Error("El id de la categoría no es válido");
            error.status = 400;
            throw error;
        }

        const categoriaExiste = await Categoria.findById(categoria);

        if (!categoriaExiste) {
            const error = new Error("No se encontró la categoría");
            error.status = 404;
            throw error;
        }
    }

    if (titulo) {
        const recetaDuplicada = await Receta.findOne({
            titulo: titulo.trim().toLowerCase(),
            usuario: usuarioId,
            _id: { $ne: id }
        });

        if (recetaDuplicada) {
            const error = new Error("Ya existe una receta con ese título para este usuario");
            error.status = 409;
            throw error;
        }

        datosActualizados.titulo = titulo.trim();
    }

    delete datosActualizados.usuario;

    const recetaActualizada = await Receta.findByIdAndUpdate(
        id,
        datosActualizados,
        { returnDocument: "after" }
    );

    return recetaActualizada;
};

export const eliminarRecetaService = async (id) => {

    // Validar id
    if (!isValidObjectId(id)) {
        const error = new Error("El id no es válido");
        error.status = 400;
        throw error;
    }

    const recetaEliminada = await Receta.findByIdAndDelete(id);

    // Validar existencia
    if (!recetaEliminada) {
        const error = new Error("No se encontró la receta");
        error.status = 404;
        throw error;
    }

    return recetaEliminada;
};

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

export const generarDescripcionRecetaService = async (receta) => {
  const ingredientes = Array.isArray(receta.ingredientes)
    ? receta.ingredientes.join(", ")
    : "";

  const prompt = `
Generá una descripción breve (máximo 2 líneas) para esta receta:

Título: ${receta.titulo}
Categoría: ${receta.categoria?.nombre || "Sin categoría"}
Ingredientes: ${ingredientes}
`;

  const API_KEY = process.env.GEMINI_25_API_KEY;

  if (!API_KEY) {
    throw new Error("Falta GEMINI_25_API_KEY");
  }

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`,
      {
        contents: [{ parts: [{ text: prompt }] }]
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": API_KEY
        }
      }
    );

    console.log("RESPUESTA IA:", JSON.stringify(response.data, null, 2));

    return response.data?.candidates?.[0]?.content?.parts?.[0]?.text || null;

  } catch (error) {
    console.error("Error IA completo:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    });

    return null;
  }
};

export const generarRecetaService = async ({ ingredientes, dificultad, tiempoMaximo }) => {
  try {
    console.log("ESTE ES MI SERVER LOCAL");

    const API_KEY = process.env.GEMINI_25_API_KEY;

    if (!API_KEY) {
      throw new Error("No existe GEMINI_25_API_KEY en el .env");
    }

    const MODEL = "gemini-2.5-flash";
    const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

    const headers = {
      "Content-Type": "application/json",
      "x-goog-api-key": API_KEY
    };

    const prompt = `
Generá una receta en formato JSON.

Ingredientes: ${(ingredientes || []).join(", ")}
Dificultad: ${dificultad}
Tiempo máximo: ${tiempoMaximo} minutos

Respondé SOLO en JSON con:
{
  "titulo": "",
  "descripcion": "",
  "ingredientes": [],
  "pasos": [],
  "tiempoPreparacion": 0,
  "dificultad": "",
  "porciones": 0
}
`;

    const body = {
      contents: [
        {
          parts: [{ text: prompt }]
        }
      ]
    };

    const response = await axios.post(ENDPOINT, body, { headers });

    const textoIA = response.data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!textoIA) {
      throw new Error("Gemini no devolvió texto válido");
    }

    const textoLimpio = textoIA
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(textoLimpio);

  } catch (error) {
    console.error("Error IA completo:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    });

    return null;
  }
};