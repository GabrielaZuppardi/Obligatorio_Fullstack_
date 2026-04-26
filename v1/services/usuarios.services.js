import Usuario from '../models/usuario.model.js';
import bcrypt from 'bcryptjs';
import { isValidObjectId } from "mongoose";

export const obtenerUsuariosService = async (page, limit) => {
    limit = Number(limit) || 3;
    page = Number(page) || 1;

    const skip = (page - 1) * limit;

    const totalUsuarios = await Usuario.countDocuments();
    const totalPages = Math.ceil(totalUsuarios / limit);

    const usuarios = await Usuario.find()
        .select("-password")
        .skip(skip)
        .limit(limit);

    return {
        usuarios,
        totalUsuarios,
        totalPages,
        page,
        limit
    };
};


export const obtenerUsuarioPorIdService = async (id) => {

    // 🔹 Validar id
    if (!isValidObjectId(id)) {
        const error = new Error("El id no es válido");
        error.status = 400;
        throw error;
    }

    const usuario = await Usuario.findById(id).select("-password");

    // 🔹 Validar existencia
    if (!usuario) {
        const error = new Error("No se encontró el usuario");
        error.status = 404;
        throw error;
    }

    return usuario;
};  

// Este servicio se puede usar para crear usuarios desde un admin, pero no para el registro público
export const crearAdminService = async (usuario) => {

    const { email } = usuario;

    const usuarioExistente = await Usuario.findOne({ email });

    if (usuarioExistente) {
        const error = new Error("Ya existe un usuario con ese email");
        error.status = 409;
        throw error;
    }

    // Forzar rol admin
    usuario.rol = "administrador";
 

    const nuevoUsuario = new Usuario(usuario);

    await nuevoUsuario.save();

    const usuarioSinPassword = nuevoUsuario.toObject();
    delete usuarioSinPassword.password;

    return usuarioSinPassword;
};

export const actualizarUsuarioService = async (id, usuario) => {

    // 🔹 Validar id
    if (!isValidObjectId(id)) {
        const error = new Error("El id no es válido");
        error.status = 400;
        throw error;
    }

    const { email, password } = usuario;

    let datosActualizados = { ...usuario };

    // 🔹 Control duplicado email
    if (email) {
        const usuarioExistente = await Usuario.findOne({
            email,
            _id: { $ne: id }
        });

        if (usuarioExistente) {
            const error = new Error("Ya existe un usuario con ese email");
            error.status = 409;
            throw error;
        }
    }

    // Si actualizan password → hay que hashear manualmente
    if (password) {
        const passwordHash = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));
        datosActualizados.password = passwordHash;
    }

    const usuarioActualizado = await Usuario.findByIdAndUpdate(
        id,
        datosActualizados,
        { returnDocument: "after" }
    ).select("-password");

    // 🔹 Validar existencia
    if (!usuarioActualizado) {
        const error = new Error("No se encontró el usuario");
        error.status = 404;
        throw error;
    }

    return usuarioActualizado;
};
export const eliminarUsuarioService = async (id) => {

    if (!isValidObjectId(id)) {
        const error = new Error("El id no es válido");
        error.status = 400;
        throw error;
    }

    const usuarioEliminado = await Usuario.findByIdAndDelete(id).select("-password");

    if (!usuarioEliminado) {
        const error = new Error("No se encontró el usuario");
        error.status = 404;
        throw error;
    }

    return usuarioEliminado;
};