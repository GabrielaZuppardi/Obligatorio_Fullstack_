import mongoose from "mongoose";

// Database configuration

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Conectado a MongoDB");
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
    process.exit(1); // Detiene la ejecución del servidor si no se puede conectar a la base de datos
  } 
};

export default connectDB;