import express from 'express';
import {obtenerCategoriasController, 
        obtenerCategoriaPorIdController, 
        crearCategoriaController, 
        actualizarCategoriaController, 
        eliminarCategoriaController} from "../controllers/categorias.controllers.js";


const router = express.Router({mergeParams: true });

router.get("/", obtenerCategoriasController);
router.get("/:id", obtenerCategoriaPorIdController);
router.post("/", crearCategoriaController);
router.patch("/:id", actualizarCategoriaController);
router.delete("/:id", eliminarCategoriaController);

export default router;