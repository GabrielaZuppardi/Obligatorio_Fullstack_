import mongoose from "mongoose";
//imports no utilizado pero recomendado
import usuario from "./usuario.model.js";
import categoria from "./categoria.model.js";

const recipeSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: true,
      trim: true
    },
    descripcion: {
      type: String,
      required: true,
      trim: true,
      maxlength: 300
    },
    ingredientes: {
      type: [String],
      required: true
    },
    pasos: {
      type: [String],  
      required: true
    },
    tiempoPreparacion: {
      type: Number,
      required: true,
      min: 1
    },
    
    dificultad: {
      type: String,
      enum: ["facil", "media", "dificil"],
      required: true
    },
    porciones: {
      type: Number,
      required: true,
      min: 1
    },
    imageUrl: {
      type: String
    },

    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true
    },
    categoria: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categoria",
      required: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Receta', recipeSchema);