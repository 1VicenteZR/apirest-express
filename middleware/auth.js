const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

// Middleware que verifica el token en cada peticion protegida
module.exports = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ mensaje: 'Token requerido' });

  try {
    // Verifica y decodifica el token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (err) {
    res.status(401).json({ mensaje: 'Token invalido o expirado' });
  }
};
