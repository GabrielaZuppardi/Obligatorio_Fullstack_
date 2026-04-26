import express from "express";
import {obtenerRecetasController,
        obtenerRecetaPorIdController,
        crearRecetaController,
        actualizarRecetaController,
        eliminarRecetaController,
        obtenerMisRecetasController,
        buscarRecetasExternasController,
        generarDescripcionRecetaController,
        generarRecetaController} from "../controllers/recetas.controllers.js";
import { validateBody } from "../middlewares/validateBody.middleware.js";
import { crearRecetaSchema, modificarRecetaSchema } from "../validators/receta.validator.js";
import { authenticateMiddleware } from "../middlewares/authenticate.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { parseArrayFields } from "../middlewares/parseArrayFields.middleware.js";

const router = express.Router();

//express evalua las rutas en orden y ejecuta la primera que coincide, por eso las rutas más específicas deben ir antes que las más generales
router.post("/generar", generarRecetaController);
router.get("/externas", buscarRecetasExternasController);
router.get("/mias", authenticateMiddleware, obtenerMisRecetasController);
router.get("/", obtenerRecetasController);
router.get("/:id", obtenerRecetaPorIdController);


router.post("/",authenticateMiddleware, upload.single("imagen"), parseArrayFields(["ingredientes", "pasos"]), validateBody(crearRecetaSchema), crearRecetaController);
router.patch("/:id", validateBody(modificarRecetaSchema), actualizarRecetaController);
router.delete("/:id", eliminarRecetaController);
router.post("/:id/generar-descripcion", authenticateMiddleware, generarDescripcionRecetaController);




export default router;