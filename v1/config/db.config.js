

import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    return;
  }

  try {
    const uri =
      process.env.NODE_ENV === "production"
        ? process.env.MONGO_URI_ATLAS
        : process.env.MONGO_URI;
console.log("URI:", uri);
    console.log("NODE_ENV:", process.env.NODE_ENV);
    console.log("Conectando a MongoDB...");

    await mongoose.connect(uri);

    isConnected = true;
    console.log("Conectado a MongoDB");
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error.message);
    throw error;
  }
};

export default connectDB;


/*import mongoose from "mongoose";

// Database configuration

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI_ATLAS);
    console.log("Conectado a MongoDB");
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
    process.exit(1); // Detiene la ejecución del servidor si no se puede conectar a la base de datos
  } 
};

export default connectDB;*/


/*
const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI_ATLAS || process.env.MONGO_URI;

    console.log("Conectando a:", uri);

    await mongoose.connect(uri);

    if (uri.includes("mongodb+srv") || uri.includes("mongodb://gz331760_db_user")) {
      console.log("Conectado a MongoDB Atlas ☁️");
    } else {
      console.log("Conectado a MongoDB Local 💻");
    }

  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
    process.exit(1);
  } 
};*/
/*
const connectDB = async () => {
  try {
    const uri =
      process.env.NODE_ENV === "production"
        ? process.env.MONGO_URI_ATLAS
        : process.env.MONGO_URI;

    console.log("Conectando a:", uri);

    await mongoose.connect(uri);

    console.log("Conectado a MongoDB");
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
    process.exit(1);
  }
};*/