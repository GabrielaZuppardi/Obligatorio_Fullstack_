import {obtenerRecetasService, 
        obtenerRecetaPorIdService, 
        crearRecetaService, 
        actualizarRecetaService, 
        eliminarRecetaService,
        obtenerMisRecetasService,
        buscarRecetasExternasService,
        generarRecetaService} from "../services/recetas.services.js";

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
}
 export const generarRecetaController = async (req, res) => {
    console.log("Entró al controller de generar receta IA");
    console.log("Body recibido:", req.body);
    try {
        const { ingredientes, dificultad, tiempoMaximo } = req.body;

        const receta = await generarRecetaService({
            ingredientes,
            dificultad,
            tiempoMaximo
        });

        res.json({
            message: "Receta generada",
            receta
        });

    } catch (error) {
        console.error(error);

        // 🔥 fallback obligatorio
        res.status(200).json({
            message: "IA no disponible, usando fallback",
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


