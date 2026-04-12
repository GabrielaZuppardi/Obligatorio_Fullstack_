import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import v1Router from "./v1/index.js"; // Importar rutas de la versión 1    
import { notFoundMiddleware } from './v1/middlewares/notFound.middleware.js';
import connectDB from './v1/config/db.config.js'; // Importar función para conectar a la base de datos 

dotenv.config();

const app = express();
connectDB(); // Llamar a la función para conectar a la base de datos

app.use(cors(/*{
  origin:"http://localhost:5500",
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "PUT", "DELETE"] 
}*/ )); //

app.use(express.json()); // Middleware para parsear JSON en las solicitudes

app.use(express.urlencoded({ extended: true })); // Middleware para parsear datos de formularios

// Importar rutas y middlewares 
app.get('/', (req, res) => {
  res.send('Respuesta del servidor a la raiz!');
}); // Ruta de ejemplo para probar el servidor. Endpont para probar si mi servidor responde a la raíz.

app.use('/v1', v1Router); // Usar las rutas de la versión 1
app.use(notFoundMiddleware); // Middleware para manejar rutas no encontradas

export default app;