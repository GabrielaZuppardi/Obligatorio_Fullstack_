import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import v1Router from "./v1/index.js"; // Importar rutas de la versión 1   
import { notFoundMiddleware } from './v1/middlewares/notFound.middleware.js';
import { errorMiddleware } from './v1/middlewares/error.middleware.js'; 
import connectDB from './v1/config/db.config.js';
dotenv.config();

const app = express();


await connectDB();
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

app.get("/health", (req, res) => {
  res.json({
    ok: true,
    nodeEnv: process.env.NODE_ENV,
    mongoUri: process.env.MONGO_URI_ATLAS ? "existe" : "no existe"
  });
});

app.use('/v1', v1Router); // Usar las rutas de la versión 1
app.use(notFoundMiddleware); // Middleware para manejar rutas no encontradas

app.use(errorMiddleware); // Middleware para manejar errores

export default app;