import mongoose from "mongoose";

//acá se definen las propiedades de la categoría

const categoriaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        unique: true
    },

    descripcion: {
        type: String,
        required: true
    }});

export default mongoose.model('Categoria', categoriaSchema);