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
 export const crearAdministradorService = async (usuario) => {
    const { email } = usuario;

    const usuarioExistente = await Usuario.findOne({ email });

    if (usuarioExistente) {
        const error = new Error("Ya existe un usuario con ese email");
        error.status = 409;
        throw error;
    }

    const nuevoUsuario = new Usuario({
        ...usuario,
        rol: "administrador"
    });

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

    // 🔹 Sacamos campos sensibles o que requieren tratamiento especial
    const { email, password, plan, ...datosPermitidos } = usuario;

    // 🔹 Solo los campos permitidos pasan directo
    let datosActualizados = { ...datosPermitidos };

    // 🔹 Validar email duplicado (si viene)
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

        datosActualizados.email = email;
    }

    // 🔹 Hashear password (si viene)
    if (password) {
        const passwordHash = await bcrypt.hash(
            password,
            Number(process.env.SALT_ROUNDS)
        );
        datosActualizados.password = passwordHash;
    }

    // 🔹 Actualizar usuario
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

export const cambiarPlanAPremiumService = async (usuarioId) => {
  const usuario = await Usuario.findById(usuarioId);

  if (!usuario) {
    const error = new Error("Usuario no encontrado");
    error.status = 404;
    throw error;
  }

  if (usuario.plan !== "plus") {
    const error = new Error("Solo los usuarios con plan plus pueden cambiar a premium");
    error.status = 400;
    throw error;
  }

  if (usuario.rol !== "usuario") {
  const error = new Error("Este perfil de usuario no puede cambiar de plan");
  error.status = 403;
  throw error;
}

  usuario.plan = "premium";
  await usuario.save();

  const usuarioSinPassword = usuario.toObject();
  delete usuarioSinPassword.password;

  return usuarioSinPassword;
};