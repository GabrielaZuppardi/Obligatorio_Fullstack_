import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import receta from "./receta.model.js";

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
    },
   
  
},
/* {
    timestamps: true
}*/ //sugerencia del chat: timestamps → agrega createdAt y updatedAt automáticamente

);

usuarioSchema.pre("save", function () {
    if (!this.isModified("password")) return;

    const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUNDS));
    this.password = bcrypt.hashSync(this.password, salt);
});

export default mongoose.model("Usuario", usuarioSchema); 