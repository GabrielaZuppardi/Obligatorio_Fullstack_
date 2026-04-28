export const validateBody = schema => (req, res, next) => {
    const { value, error } = schema.validate(req.body, { abortEarly: false,   stripUnknown: true });
    if (error) {
       return res.status(400).json({
       mensaje: "Error en la validación",
       errores: error.details.map(e => e.message)
   });
    }
    //req.validatedBody = value;
    req.body = value; // Sobrescribimos el body con los datos validados y transformados
    next();
}
