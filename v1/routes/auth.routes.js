import express from "express";
import {
    registrarUsuario,
    loginUsuario
} from "../controllers/auth.controllers.js";

const router = express.Router({ mergeParams: true });

router.post("/registro", registrarUsuario);
router.post("/login", loginUsuario);

export default router;