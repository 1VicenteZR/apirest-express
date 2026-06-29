const express = require('express');
const app = express();
app.use(express.json());

let usuarios = [
  { id: 1, usuario: 'admin', password: '1234', rol: 'administrador' },
  { id: 2, usuario: 'juan', password: 'abcd', rol: 'usuario' },
  { id: 3, usuario: 'maria', password: 'xyz9', rol: 'usuario' },
];

// GET todos
app.get('/usuarios', (req, res) => {
  res.json(usuarios);
});

// GET por id
app.get('/usuarios/:id', (req, res) => {
  const user = usuarios.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
  res.json(user);
});

// POST crear
app.post('/usuarios', (req, res) => {
  const nuevo = {
    id: usuarios.length + 1,
    usuario: req.body.usuario,
    password: req.body.password,
    rol: req.body.rol
  };
  usuarios.push(nuevo);
  res.status(201).json(nuevo);
});

// PUT actualizar
app.put('/usuarios/:id', (req, res) => {
  const index = usuarios.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
  usuarios[index] = { ...usuarios[index], ...req.body };
  res.json(usuarios[index]);
});

// DELETE eliminar
app.delete('/usuarios/:id', (req, res) => {
  const index = usuarios.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
  const eliminado = usuarios.splice(index, 1);
  res.json({ mensaje: 'Usuario eliminado', usuario: eliminado[0] });
});

app.listen(3000, '0.0.0.0', () => {
  console.log('API corriendo en http://0.0.0.0:3000');
});
