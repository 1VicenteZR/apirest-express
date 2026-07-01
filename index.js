const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const auth = require('./middleware/auth');

const app = express();

// CORS - permite peticiones desde cualquier origen
app.use(cors());
app.use(express.json());

// Configuracion de sesion
app.use(session({
  secret: 'sesion_secreta_2026',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 8 * 60 * 60 * 1000 } // 8 horas
}));

// Conexion a MongoDB con Mongoose
mongoose.connect('mongodb://127.0.0.1:27017/apidb')
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error de conexion:', err));

// Rutas publicas - no requieren token
app.use('/', require('./routes/auth'));

// Rutas protegidas - requieren token JWT
app.use('/usuarios', auth, require('./routes/usuarios'));
app.use('/articulos', auth, require('./routes/articulos'));
app.use('/clientes', auth, require('./routes/clientes'));

app.listen(3000, '0.0.0.0', () => {
  console.log('Servidor corriendo en http://0.0.0.0:3000');
});
