import express from "express";
import { obtenerUsuariosController, 
    obtenerUsuarioPorIdController, 
    crearUsuarioController, 
    actualizarUsuarioController, 
    eliminarUsuarioController } from "../controllers/usuarios.controllers.js";
import { validateBody } from "../middlewares/validateBody.middleware.js";
import { crearUsuarioSchema, modificarUsuarioSchema } from "../validators/usuario.validator.js";

const router = express.Router({ mergeParams: true });

router.get("/", obtenerUsuariosController);
router.get("/:id", obtenerUsuarioPorIdController);
router.post("/", validateBody(crearUsuarioSchema), crearUsuarioController);
router.patch("/:id", validateBody(modificarUsuarioSchema), actualizarUsuarioController);
router.delete("/:id", eliminarUsuarioController);


export default router;
