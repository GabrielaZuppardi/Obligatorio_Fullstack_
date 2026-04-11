import express from 'express';
import { authenticateMiddleware } from './middlewares/authenticate.middleware.js'
import categoriasRouter from './routes/categorias.routes.js';

const router = express.Router({mergeParams: true });

//rutas desprotegidas

router.use ("/categorias", categoriasRouter);


router.use(authenticateMiddleware); //todas las rutas debajo de esta línea estarán protegidas por el middleware de autenticación

//rutas protegidas

export default router;