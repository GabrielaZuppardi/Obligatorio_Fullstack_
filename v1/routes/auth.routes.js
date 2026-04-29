import express from "express";
import {
    registrarUsuario,
    loginUsuario
} from "../controllers/auth.controllers.js";
import { validateBody } from "../middlewares/validateBody.middleware.js";
import { crearUsuarioSchema, loginSchema } from "../validators/usuario.validator.js";


const router = express.Router({ mergeParams: true });

router.post("/registro", validateBody(crearUsuarioSchema), registrarUsuario);
router.post("/login", validateBody(loginSchema), loginUsuario);

export default router;