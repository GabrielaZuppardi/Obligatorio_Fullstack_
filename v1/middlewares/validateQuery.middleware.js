export const validateQuery = schema => (req, res, next) => {
  const { value, error } = schema.validate(req.query, {
    abortEarly: false,
    stripUnknown: true
  });

  if (error) {
    return res.status(400).json({
      mensaje: "Error en la validación de query",
      errores: error.details.map(e => e.message)
    });
  }

   req.validatedQuery = value;
  next();
};