const express = require('express');
const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Ruta para la raíz
app.get('/', (req, res) => {
    res.send('Bienvenido a la API de estudiantes!');
});

// Datos de ejemplo
let students = [
    { id: 1, name: 'Victor Rivas', age: 18, major: 'Desarollo de software' },
    { id: 2, name: 'Josue Mejia', age: 18, major: 'Desarollo de software' }
];

// Obtener todos los estudiantes
app.get('/students', (req, res) => {
    res.json(students);
});

// Obtener un estudiante por ID
app.get('/students/:id', (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));
    if (!student) return res.status(404).send('Estudiante no encontrado.');
    res.json(student);
});

// Crear un nuevo estudiante
app.post('/students', (req, res) => {
    const { name, age, major } = req.body;
    const newStudent = {
        id: students.length + 1,
        name,
        age,
        major
    };
    students.push(newStudent);
    res.status(201).json(newStudent);
});

// Actualizar un estudiante
app.put('/students/:id', (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));
    if (!student) return res.status(404).send('Estudiante no encontrado.');

    const { name, age, major } = req.body;
    student.name = name || student.name;
    student.age = age || student.age;
    student.major = major || student.major;

    res.json(student);
});

// Eliminar un estudiante
app.delete('/students/:id', (req, res) => {
    const studentIndex = students.findIndex(s => s.id === parseInt(req.params.id));
    if (studentIndex === -1) return res.status(404).send('Estudiante no encontrado.');

    students.splice(studentIndex, 1);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});