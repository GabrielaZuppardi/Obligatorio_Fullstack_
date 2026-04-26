import {obtenerUsuariosService, 
        obtenerUsuarioPorIdService, 
        crearUsuarioService, 
        actualizarUsuarioService, 
        eliminarUsuarioService,
        cambiarPlanAPremiumService} from "../services/usuarios.services.js";

export const obtenerUsuariosController = async (req, res, next) => {
    try {
        const { page, limit } = req.query;

        const respuesta = await obtenerUsuariosService(page, limit);

        res.status(200).json({
            mensaje: "Usuarios obtenidos correctamente",
            ...respuesta
        });

    } catch (error) {
        next(error);
    }
};

export const obtenerUsuarioPorIdController = async (req, res, next) => {
    try {
        const { id } = req.params;

        const usuarioEncontrado = await obtenerUsuarioPorIdService(id);

        res.status(200).json({
            mensaje: "Usuario obtenido correctamente",
            usuario: usuarioEncontrado
        });

    } catch (error) {
        next(error);
    }
}; 

export const crearUsuarioController = async (req, res, next) => {
    try {
        const usuarioCreado = await crearUsuarioService(req.body);

        res.status(201).json({
            mensaje: "Usuario creado correctamente",
            usuario: usuarioCreado
        });

    } catch (error) {
        next(error);
    }
}


export const actualizarUsuarioController = async (req, res, next) => {
    try {
        const { id } = req.params;

        const usuarioActualizado = await actualizarUsuarioService(id, req.body);

        res.status(200).json({
            mensaje: "Usuario actualizado correctamente",
            usuario: usuarioActualizado
        });

    } catch (error) {
        next(error);
    }
};

export const eliminarUsuarioController = async (req, res, next) => {
    try {
        const { id } = req.params;

        const usuarioEliminado = await eliminarUsuarioService(id);

        res.status(200).json({
            mensaje: "Usuario eliminado correctamente",
            usuario: usuarioEliminado
        });

    } catch (error) {
        next(error);
    }
};

export const cambiarPlanAPremiumController = async (req, res, next) => {
  try {
    const usuarioId = req.usuario.id;

    const usuarioActualizado = await cambiarPlanAPremiumService(usuarioId);

    res.status(200).json({
      mensaje: "Plan actualizado a premium correctamente",
      usuario: usuarioActualizado
    });

  } catch (error) {
    next(error);
  }
};