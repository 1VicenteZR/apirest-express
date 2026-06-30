const router = require('express').Router();
const Usuario = require('../models/Usuario');

// GET - Obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const usuarios = await Usuario.find().select('-password');
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener usuarios' });
  }
});

// GET por ID - Obtener usuario por id
router.get('/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id).select('-password');
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al buscar usuario' });
  }
});

// POST - Crear nuevo usuario (password se encripta automaticamente en el modelo)
router.post('/', async (req, res) => {
  try {
    const nuevo = new Usuario(req.body);
    await nuevo.save();
    res.status(201).json({ mensaje: 'Usuario creado', id: nuevo._id });
  } catch (err) {
    res.status(400).json({ mensaje: 'Error al crear usuario', error: err.message });
  }
});

// PUT - Actualizar usuario por id
router.put('/:id', async (req, res) => {
  try {
    const actualizado = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
    if (!actualizado) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    res.json(actualizado);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al actualizar usuario' });
  }
});

// DELETE - Eliminar usuario por id
router.delete('/:id', async (req, res) => {
  try {
    const eliminado = await Usuario.findByIdAndDelete(req.params.id);
    if (!eliminado) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    res.json({ mensaje: 'Usuario eliminado' });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al eliminar usuario' });
  }
});

module.exports = router;
