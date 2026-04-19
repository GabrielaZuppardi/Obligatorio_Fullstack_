import express from 'express';
import {obtenerCategoriasController, 
        obtenerCategoriaPorIdController, 
        crearCategoriaController, 
        actualizarCategoriaController, 
        eliminarCategoriaController} from "../controllers/categorias.controllers.js";
import { validateBody } from "../middlewares/validateBody.middleware.js";
import { crearCategoriaSchema, modificarCategoriaSchema } from "../validators/categoria.validator.js";

const router = express.Router({mergeParams: true });

router.get("/", obtenerCategoriasController);
router.get("/:id", obtenerCategoriaPorIdController);
router.post("/", validateBody(crearCategoriaSchema), crearCategoriaController);
router.patch("/:id", validateBody(modificarCategoriaSchema), actualizarCategoriaController);
router.delete("/:id", eliminarCategoriaController);


/*ACA DEJO UN EJEMPLO DE UNA BUSQUEDA POR RANGO
router.get("/precio/:min/:max", obtenerProductosPorRangoPrecioController);
*/

export default router;