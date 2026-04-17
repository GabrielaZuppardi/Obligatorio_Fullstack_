import express from "express";
import {obtenerRecetasController,
        obtenerRecetaPorIdController,
        crearRecetaController,
        actualizarRecetaController,
        eliminarRecetaController} from "../controllers/recetas.controllers.js";

const router = express.Router();

router.get("/", obtenerRecetasController);
router.get("/:id", obtenerRecetaPorIdController);
router.post("/", crearRecetaController);
router.put("/:id", actualizarRecetaController);
router.delete("/:id", eliminarRecetaController);

export default router;