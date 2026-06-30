const router = require('express').Router();
const Cliente = require('../models/Cliente');

// GET - Obtener todos los clientes
router.get('/', async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.json(clientes);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener clientes' });
  }
});

// GET por ID - Obtener cliente por id
router.get('/:id', async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    res.json(cliente);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al buscar cliente' });
  }
});

// POST - Crear nuevo cliente
router.post('/', async (req, res) => {
  try {
    const nuevo = new Cliente(req.body);
    await nuevo.save();
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(400).json({ mensaje: 'Error al crear cliente', error: err.message });
  }
});

// PUT - Actualizar cliente por id
router.put('/:id', async (req, res) => {
  try {
    const actualizado = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!actualizado) return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    res.json(actualizado);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al actualizar cliente' });
  }
});

// DELETE - Eliminar cliente por id
router.delete('/:id', async (req, res) => {
  try {
    const eliminado = await Cliente.findByIdAndDelete(req.params.id);
    if (!eliminado) return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    res.json({ mensaje: 'Cliente eliminado' });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al eliminar cliente' });
  }
});

module.exports = router;
