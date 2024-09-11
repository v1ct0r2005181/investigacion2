// Importar las dependencias necesarias
const express = require('express');
const app = express();

// Middleware para permitir que la API maneje datos en formato JSON
app.use(express.json());

// Datos simulados (base de datos en memoria)
let datos = [
  { id: 1, nombre: 'Elemento 1' },
  { id: 2, nombre: 'Elemento 2' },
  { id: 3, nombre: 'Elemento 3' }
];

// 1. Obtener todos los datos (GET)
app.get('/api/datos', (req, res) => {
  res.json(datos);
});

// 2. Obtener un dato específico por ID (GET)
app.get('/api/datos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const dato = datos.find(d => d.id === id);

  if (!dato) return res.status(404).json({ error: 'Dato no encontrado' });
  
  res.json(dato);
});

// 3. Crear un nuevo dato (POST)
app.post('/api/datos', (req, res) => {
  const nuevoDato = {
    id: datos.length + 1,  // Genera un nuevo ID automáticamente
    nombre: req.body.nombre
  };
  
  datos.push(nuevoDato);
  res.status(201).json(nuevoDato);  // Devuelve el nuevo dato creado con un código de estado 201
});

// 4. Actualizar un dato existente (PUT)
app.put('/api/datos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const dato = datos.find(d => d.id === id);

  if (!dato) return res.status(404).json({ error: 'Dato no encontrado' });

  // Actualiza el nombre del dato
  dato.nombre = req.body.nombre;
  res.json(dato);
});

// 5. Eliminar un dato (DELETE)
app.delete('/api/datos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = datos.findIndex(d => d.id === id);

  if (index === -1) return res.status(404).json({ error: 'Dato no encontrado' });

  const datoEliminado = datos.splice(index, 1);
  res.json(datoEliminado);
});

// Escuchar en el puerto 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
