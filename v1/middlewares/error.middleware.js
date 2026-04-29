//middleware de errores es una función que tiene 4 parámetros
//el primer parámetro es el error que se ha producido, 
// el segundo es la solicitud, 
// el tercero es la respuesta y 
// el cuarto es la función next que se utiliza para pasar al siguiente middleware en la cadena de middlewares.

//evitar en produccion

export const errorMiddleware = (err, req, res, next) => {
  console.error(err.stack);
  const status = err.status || 500;
  const response = {
    message: err.message || "Error interno del servidor"
  };

  if (err.details) {
    response.details = err.details;
  }
  res.status(status).json(response);
}; 