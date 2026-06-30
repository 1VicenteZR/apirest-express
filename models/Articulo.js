const mongoose = require('mongoose');

// Esquema de articulo
const articuloSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String },
  precio: { type: Number, required: true },
  stock: { type: Number, default: 0 }
});

module.exports = mongoose.model('Articulo', articuloSchema);
