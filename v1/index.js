import express from 'express';
import { authenticateMiddleware } from './middlewares/authenticate.middleware.js';
import categoriasRouter from './routes/categorias.routes.js';
import authRouter from "./routes/auth.routes.js";
import recetasRouter from './routes/recetas.routes.js';
import usuariosRouter from './routes/usuarios.routes.js';
import uploadsRouter from './routes/uploads.routes.js';


const router = express.Router({mergeParams: true });

//rutas desprotegidas
router.use("/auth", authRouter);

router.use(authenticateMiddleware); //todas las rutas debajo de esta línea estarán protegidas por el middleware de autenticación

//rutas protegidas
//router.use("/uploads", uploadsRouter);  //no se usa actualmente

router.use("/usuarios", usuariosRouter);
router.use("/categorias", categoriasRouter);
router.use("/recetas", recetasRouter);  


export default router;