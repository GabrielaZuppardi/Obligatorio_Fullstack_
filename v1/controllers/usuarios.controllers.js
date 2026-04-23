import {obtenerUsuariosService, 
        obtenerUsuarioPorIdService, 
        crearUsuarioService, 
        actualizarUsuarioService, 
        eliminarUsuarioService} from "../services/usuarios.services.js";

export const obtenerUsuariosController = async(req, res) => {
    const usuarios = await obtenerUsuariosService();
    res.json({ mensaje: "Obtener todos los usuarios", usuarios });
}

export const obtenerUsuarioPorIdController = async (req, res) => {
    const { id } = req.params;
    const usuarioEncontrado = await obtenerUsuarioPorIdService(id);
    res.json({ mensaje: `Usuario creado`, usuario: usuarioEncontrado });
}   

export const crearUsuarioController = async (req, res) => {
   const usuarioCreado = await crearUsuarioService(req.body);
       res.json({ mensaje: `Usuario creado`, usuario: usuarioCreado });
}


export const actualizarUsuarioController = async (req, res) => {

    const { id } = req.params;
      const usuarioActualizado = await actualizarUsuarioService(id, req.body);
    res.json({ mensaje: "Usuario actualizado", usuario: usuarioActualizado });
};

export const eliminarUsuarioController = async(req, res) => {
    const { id } = req.params;
    const usuarioEliminado = await eliminarUsuarioService(id);
    res.json({ mensaje: `Usuario eliminado`, usuario: usuarioEliminado });
}   
