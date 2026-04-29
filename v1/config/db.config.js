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


