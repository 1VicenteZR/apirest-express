const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Conexion a MongoDB con Mongoose
mongoose.connect('mongodb://127.0.0.1:27017/apidb')
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error de conexion:', err));

// Rutas de cada coleccion
app.use('/usuarios', require('./routes/usuarios'));
app.use('/articulos', require('./routes/articulos'));
app.use('/clientes', require('./routes/clientes'));

app.listen(3000, '0.0.0.0', () => {
  console.log('Servidor corriendo en http://0.0.0.0:3000');
});
