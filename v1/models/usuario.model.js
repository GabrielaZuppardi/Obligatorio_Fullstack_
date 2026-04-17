import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        enum: ["usuario", "administrador"],
        default: "usuario"
    },
    plan: {
        type: String,
        enum: ["plus", "premium"],
        default: "plus"
    }
},
/* {
    timestamps: true
}*/ //sugerencia del chat: timestamps → agrega createdAt y updatedAt automáticamente

);

export default mongoose.model("Usuario", usuarioSchema);