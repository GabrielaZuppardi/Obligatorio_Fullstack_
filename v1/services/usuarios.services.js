import Usuario from '../models/usuario.model.js';

export const obtenerUsuariosService = async () => {
    const usuarios = await Usuario.find();
    return usuarios;
}

export const obtenerUsuarioPorIdService = async (id) => {
    const usuario = await Usuario.findById(id);
    return usuario;
}   

export const crearUsuarioService = async (usuario) => {
    let nuevoUsuario = new Usuario(usuario);
    await nuevoUsuario.save();
    return nuevoUsuario;
}   

export const actualizarUsuarioService = async (id, usuario) => {
    const usuarioActualizado = await Usuario.findByIdAndUpdate(id, usuario, { returnDocument: "after" });
    return usuarioActualizado;
}

export const eliminarUsuarioService = async (id) => {
   const usuarioEliminado = await Usuario.findByIdAndDelete(id);
    return usuarioEliminado;
}