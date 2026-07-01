const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');
const { JWT_SECRET } = require('../config');

// POST /login - Verifica credenciales, guarda sesion y devuelve token JWT
router.post('/login', async (req, res) => {
  try {
    // Busca el usuario en MongoDB
    const usuario = await Usuario.findOne({ usuario: req.body.usuario });
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

    // Verifica la password encriptada
    const passwordValida = await bcrypt.compare(req.body.password, usuario.password);
    if (!passwordValida) return res.status(401).json({ mensaje: 'Password incorrecta' });

    // Guarda datos en sesion
    req.session.usuario = { id: usuario._id, usuario: usuario.usuario, rol: usuario.rol };

    // Genera token JWT
    const token = jwt.sign(
      { id: usuario._id, usuario: usuario.usuario, rol: usuario.rol },
      JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({ mensaje: 'Login exitoso', token, sesion: req.session.usuario });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error en login', error: err.message });
  }
});

// GET /sesion - Verifica si hay una sesion activa
router.get('/sesion', (req, res) => {
  if (req.session.usuario) {
    res.json({ activa: true, usuario: req.session.usuario });
  } else {
    res.json({ activa: false, mensaje: 'No hay sesion activa' });
  }
});

// POST /logout - Cierra la sesion
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ mensaje: 'Error al cerrar sesion' });
    res.json({ mensaje: 'Sesion cerrada correctamente' });
  });
});

module.exports = router;
