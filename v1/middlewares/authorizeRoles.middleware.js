export const authorizeRoles = (...rolesPermitidos) => {
    return (req, res, next) => {
        if (!req.usuario) {
            const error = new Error("Usuario no autenticado");
            error.status = 401;
            return next(error);
        }

        if (!rolesPermitidos.includes(req.usuario.rol)) {
            const error = new Error("No tenés permisos para realizar esta acción");
            error.status = 403;
            return next(error);
        }

        next();
    };
};