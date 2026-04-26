import express from "express";
import { obtenerUsuariosController, 
    obtenerUsuarioPorIdController, 
    crearAdminController, 
    actualizarUsuarioController, 
    eliminarUsuarioController } from "../controllers/usuarios.controllers.js";
import { validateBody } from "../middlewares/validateBody.middleware.js";
import { crearUsuarioSchema, modificarUsuarioSchema } from "../validators/usuario.validator.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.middleware.js";

const router = express.Router({ mergeParams: true });

router.get("/",  authorizeRoles("administrador"),  obtenerUsuariosController);
router.get("/:id",  authorizeRoles("administrador"), obtenerUsuarioPorIdController);
router.post("/", authorizeRoles("administrador"), validateBody(crearUsuarioSchema), crearAdminController);
router.patch("/:id",  authorizeRoles("administrador"), validateBody(modificarUsuarioSchema), actualizarUsuarioController);
router.delete("/:id",  authorizeRoles("administrador"), eliminarUsuarioController);


export default router;
