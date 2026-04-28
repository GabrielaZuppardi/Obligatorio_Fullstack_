import {registrarUsuarioService, loginUsuarioService} from "../services/auth.services.js";

export const registrarUsuario = async (req, res, next) => {
  try {
    const { usuario, token } = await registrarUsuarioService(req.body);

    res.status(201).json({
      mensaje: "Usuario registrado correctamente",
      usuario,
      token
    });

  } catch (error) {
    next(error);
  }
};

export const loginUsuario = async (req, res, next) => {

        const { email, password } = req.body;

        const result = await loginUsuarioService(email, password);

        res.status(200).json({
            mensaje: "Usuario logueado correctamente",
            ...result
        });

   
};