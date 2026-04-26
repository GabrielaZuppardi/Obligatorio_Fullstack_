import Usuario from "../models/usuario.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registrarUsuarioService = async (usuario) => {
  const { email } = usuario;

  const usuarioExistente = await Usuario.findOne({ email });

  if (usuarioExistente) {
    const error = new Error("Ya existe un usuario con ese email");
    error.status = 409;
    throw error;
  }

  const nuevoUsuario = new Usuario(usuario);

  await nuevoUsuario.save(); // acá se ejecuta el pre-save

  const token = jwt.sign(
    {
      id: nuevoUsuario._id,
      email: nuevoUsuario.email,
      rol: nuevoUsuario.rol
    },
    process.env.SECRET_KEY,
    { expiresIn: "1d" }
  );

  return {
    usuario: nuevoUsuario,
    token
  };
};

export const loginUsuarioService = async (email, password) => {
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
        const error = new Error("Credenciales incorrectas");
        error.status = 401;
        throw error;
    }

    const isMatch = bcrypt.compareSync(password, usuario.password);

    if (!isMatch) {
        const error = new Error("Credenciales incorrectas");
        error.status = 401;
        throw error;
    }

    const token = jwt.sign(
        {
            id: usuario._id,
            email: usuario.email,
            rol: usuario.rol   
        },
        process.env.SECRET_KEY,
        { expiresIn: "1d" }
    );

    const usuarioSinPassword = usuario.toObject();
    delete usuarioSinPassword.password;

    return {
        usuario: usuarioSinPassword,
        token
    };
};