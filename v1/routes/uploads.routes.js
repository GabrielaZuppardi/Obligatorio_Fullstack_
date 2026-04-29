import express from 'express';
import { subirImagen } from '../controllers/uploads.controllers.js';

const router = express.Router({mergeParams: true });

// Aquí puedes definir las rutas relacionadas con las subidas de archivos a Cloudinary

router.post("/", subirImagen);



export default router;