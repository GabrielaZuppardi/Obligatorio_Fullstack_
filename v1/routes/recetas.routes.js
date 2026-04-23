import express from "express";
import {obtenerRecetasController,
        obtenerRecetaPorIdController,
        crearRecetaController,
        actualizarRecetaController,
        eliminarRecetaController,
        obtenerMisRecetasController} from "../controllers/recetas.controllers.js";
import { validateBody } from "../middlewares/validateBody.middleware.js";
import { crearRecetaSchema, modificarRecetaSchema } from "../validators/receta.validator.js";
import { authenticateMiddleware } from "../middlewares/authenticate.middleware.js";

const router = express.Router();

router.get("/mias", authenticateMiddleware, obtenerMisRecetasController);


router.get("/", obtenerRecetasController);
router.get("/:id", obtenerRecetaPorIdController);
router.post("/",validateBody(crearRecetaSchema), crearRecetaController);
router.patch("/:id", validateBody(modificarRecetaSchema), actualizarRecetaController);
router.delete("/:id", eliminarRecetaController);

export default router;