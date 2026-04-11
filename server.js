//SERVER.JS IMPORTA AL SERVIDOR PURO DESDE APP.JS, 
// DONDE SE CONFIGURA EL SERVIDOR CON MIDDLEWARES, RUTAS, ETC. AQUÍ SOLO SE INICIA EL SERVIDOR EN EL PUERTO ESPECIFICADO.

import app from "./app.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});


