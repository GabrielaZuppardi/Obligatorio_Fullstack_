import {obtenerUsuariosService, 
        obtenerUsuarioPorIdService, 
        crearUsuarioService, 
        actualizarUsuarioService, 
        eliminarUsuarioService,
        cambiarPlanAPremiumService} from "../services/usuarios.services.js";

export const obtenerUsuariosController = async (req, res, next) => {
    
        const { page, limit } = req.query;

        const respuesta = await obtenerUsuariosService(page, limit);

        res.status(200).json({
            mensaje: "Usuarios obtenidos correctamente",
            ...respuesta
        });

    
};

export const obtenerUsuarioPorIdController = async (req, res, next) => {
   
        const { id } = req.params;

        const usuarioEncontrado = await obtenerUsuarioPorIdService(id);

        res.status(200).json({
            mensaje: "Usuario obtenido correctamente",
            usuario: usuarioEncontrado
        });

   }; 

export const crearUsuarioController = async (req, res, next) => {
    
        const usuarioCreado = await crearUsuarioService(req.body);

        res.status(201).json({
            mensaje: "Usuario creado correctamente",
            usuario: usuarioCreado
        });
 
}


export const actualizarUsuarioController = async (req, res, next) => {
   
        const { id } = req.params;

        const usuarioActualizado = await actualizarUsuarioService(id, req.body);

        res.status(200).json({
            mensaje: "Usuario actualizado correctamente",
            usuario: usuarioActualizado
        });
   };

export const eliminarUsuarioController = async (req, res, next) => {
 
        const { id } = req.params;

        const usuarioEliminado = await eliminarUsuarioService(id);

        res.status(200).json({
            mensaje: "Usuario eliminado correctamente",
            usuario: usuarioEliminado
        });
   
};

export const cambiarPlanAPremiumController = async (req, res, next) => {
  
    const usuarioId = req.usuario.id;

    const usuarioActualizado = await cambiarPlanAPremiumService(usuarioId);

    res.status(200).json({
      mensaje: "Plan actualizado a premium correctamente",
      usuario: usuarioActualizado
    });

  
};