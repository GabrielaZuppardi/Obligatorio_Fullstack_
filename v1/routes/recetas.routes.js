import express from "express";
import {obtenerRecetasController,
        obtenerRecetaPorIdController,
        crearRecetaController,
        actualizarRecetaController,
        eliminarRecetaController,
        obtenerMisRecetasController,
        buscarRecetasExternasController,
        generarDescripcionRecetaController,
        generarRecetaController,
        obtenerRecetasConFiltrosController
       } from "../controllers/recetas.controllers.js";
       
import { validateBody } from "../middlewares/validateBody.middleware.js";
import { validateQuery } from "../middlewares/validateQuery.middleware.js";
import { authenticateMiddleware } from "../middlewares/authenticate.middleware.js";

import { crearRecetaSchema, modificarRecetaSchema } from "../validators/receta.validator.js";

import { filtrosRecetaSchema } from "../validators/recetaQuery.validator.js";

const router = express.Router();

//express evalua las rutas en orden y ejecuta la primera que coincide, por eso las rutas más específicas deben ir antes que las más generales


// Rutas especiales primero

// Rutas especiales primero
router.get("/filtros", validateQuery(filtrosRecetaSchema), obtenerRecetasConFiltrosController);
//genera una receta con ia al pasarle ingredientes, tiempo y dificultad por query
router.post("/generar", generarRecetaController);
//obtiene recetas externas de una api externa al pasarle una query por query EJEMPLO:{{prod_base_url}}/recetas/externas?query=pollo
router.get("/externas", buscarRecetasExternasController); //busca recetas externas con 3 filtros
router.get("/mias", obtenerMisRecetasController);

// Rutas con :id después
router.post("/:id/generar-descripcion", generarDescripcionRecetaController);

// CRUD base
router.get("/", obtenerRecetasController);
router.get("/:id", obtenerRecetaPorIdController);

router.post("/", validateBody(crearRecetaSchema), crearRecetaController);
router.patch("/:id", validateBody(modificarRecetaSchema), actualizarRecetaController);
router.delete("/:id", eliminarRecetaController);


export default router;