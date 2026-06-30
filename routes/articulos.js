const router = require('express').Router();
const Articulo = require('../models/Articulo');

// GET - Obtener todos los articulos
router.get('/', async (req, res) => {
  try {
    const articulos = await Articulo.find();
    res.json(articulos);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener articulos' });
  }
});

// GET por ID - Obtener articulo por id
router.get('/:id', async (req, res) => {
  try {
    const articulo = await Articulo.findById(req.params.id);
    if (!articulo) return res.status(404).json({ mensaje: 'Articulo no encontrado' });
    res.json(articulo);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al buscar articulo' });
  }
});

// POST - Crear nuevo articulo
router.post('/', async (req, res) => {
  try {
    const nuevo = new Articulo(req.body);
    await nuevo.save();
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(400).json({ mensaje: 'Error al crear articulo', error: err.message });
  }
});

// PUT - Actualizar articulo por id
router.put('/:id', async (req, res) => {
  try {
    const actualizado = await Articulo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!actualizado) return res.status(404).json({ mensaje: 'Articulo no encontrado' });
    res.json(actualizado);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al actualizar articulo' });
  }
});

// DELETE - Eliminar articulo por id
router.delete('/:id', async (req, res) => {
  try {
    const eliminado = await Articulo.findByIdAndDelete(req.params.id);
    if (!eliminado) return res.status(404).json({ mensaje: 'Articulo no encontrado' });
    res.json({ mensaje: 'Articulo eliminado' });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al eliminar articulo' });
  }
});

module.exports = router;
