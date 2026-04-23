import Usuario from '../models/usuario.model.js';

export const obtenerUsuariosService = async (page, limit) => {
    limit=Number(limit) || 3;
    page=Number(page) || 1;
    const skip = (page - 1) * limit;
    const totalUsuarios = await Usuario.countDocuments();
    const totalPages = Math.ceil(totalUsuarios / limit);
    const usuarios = await Usuario.find()
        .skip(skip)
        .limit(limit);
    return { usuarios, totalPages, page, limit };
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