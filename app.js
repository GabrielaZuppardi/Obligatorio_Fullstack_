import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Respuesta del servidor a la raiz!');
});

export default app;