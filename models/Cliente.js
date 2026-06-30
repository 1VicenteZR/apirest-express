const mongoose = require('mongoose');

// Esquema de cliente
const clienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  telefono: { type: String },
  direccion: { type: String }
});

module.exports = mongoose.model('Cliente', clienteSchema);
