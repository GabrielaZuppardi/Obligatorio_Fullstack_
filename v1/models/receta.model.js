import mongoose from "mongoose";

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

    //falta asociarlo con CATEGORIA y USUARIO, pero eso lo haré después
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Receta', recipeSchema);