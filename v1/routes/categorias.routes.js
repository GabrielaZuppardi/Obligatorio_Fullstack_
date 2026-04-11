import express from 'express';
import {obtenerCategorias, 
        obtenerCategoriaPorId, 
        crearCategoria, 
        actualizarCategoria, 
        eliminarCategoria} from "../controllers/categorias.controllers.js";


const router = express.Router({mergeParams: true });

router.get("/", obtenerCategorias);
router.get("/:id", obtenerCategoriaPorId);
router.post("/", crearCategoria);
router.patch("/:id", actualizarCategoria);
router.delete("/:id", eliminarCategoria);

export default router;