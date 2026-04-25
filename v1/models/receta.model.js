import mongoose from "mongoose";
//imports de modelos con los que se vincula el modelo receta, no utilizado pero recomendado
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
  //no lo ponemos requerido porque lo agrega el backend al crear la receta, no lo envía el cliente, pero es importante que esté para mantener la relación entre receta y usuario.
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

export default mongoose.model('Receta', recipeSchema); //como tercer parámetro puedo porner el nombre explicito de la colección, si no se pone, mongoose lo toma del nombre del modelo y lo pluraliza, en este caso sería "recetas".