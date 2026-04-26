import {obtenerUsuariosService, 
        obtenerUsuarioPorIdService, 
        crearAdminService, 
        actualizarUsuarioService, 
        eliminarUsuarioService} from "../services/usuarios.services.js";

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

export const crearAdminController = async (req, res, next) => {
    try {
        const adminCreado = await crearAdminService(req.body);

        res.status(201).json({
            mensaje: "Administrador creado correctamente",
            usuario: adminCreado
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
