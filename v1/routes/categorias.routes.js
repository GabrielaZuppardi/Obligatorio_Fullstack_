import express from 'express';
import {obtenerCategoriasController, 
        obtenerCategoriaPorIdController, 
        crearCategoriaController, 
        actualizarCategoriaController, 
        eliminarCategoriaController} from "../controllers/categorias.controllers.js";
import { validateBody } from "../middlewares/validateBody.middleware.js";
import { crearCategoriaSchema, modificarCategoriaSchema } from "../validators/categoria.validator.js";
import { authorizeRoles } from '../middlewares/authorizeRoles.middleware.js';

const router = express.Router({mergeParams: true });

router.get("/", obtenerCategoriasController);
router.get("/:id", obtenerCategoriaPorIdController);
router.post("/", authorizeRoles("administrador"), validateBody(crearCategoriaSchema), crearCategoriaController);
router.patch("/:id",  authorizeRoles("administrador"), validateBody(modificarCategoriaSchema), actualizarCategoriaController);
router.delete("/:id", authorizeRoles("administrador"), eliminarCategoriaController);

export default router;