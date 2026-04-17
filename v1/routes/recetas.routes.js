import express from "express";
import {obtenerRecetasController,
        obtenerRecetaPorIdController,
        crearRecetaController,
        actualizarRecetaController,
        eliminarRecetaController} from "../controllers/recetas.controllers.js";
import { validateBody } from "../middlewares/validateBody.middleware.js";
import { crearRecetaSchema, modificarRecetaSchema } from "../validators/receta.validator.js";

const router = express.Router();

router.get("/", obtenerRecetasController);
router.get("/:id", obtenerRecetaPorIdController);
router.post("/",validateBody(crearRecetaSchema), crearRecetaController);
router.patch("/:id", validateBody(modificarRecetaSchema), actualizarRecetaController);
router.delete("/:id", eliminarRecetaController);

export default router;