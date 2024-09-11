const express = require('express');
const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Datos de ejemplo
let books = [
    { id: 1, title: '1984', author: 'George Orwell', year: 1949 },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960 }
];

// Obtener todos los libros
app.get('/books', (req, res) => {
    res.json(books);
});

// Obtener un libro por ID
app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).send('Libro no encontrado.');
    res.json(book);
});

// Crear un nuevo libro
app.post('/books', (req, res) => {
    const { title, author, year } = req.body;
    const newBook = {
        id: books.length + 1,
        title,
        author,
        year
    };
    books.push(newBook);
    res.status(201).json(newBook);
});

// Actualizar un libro
app.put('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).send('Libro no encontrado.');

    const { title, author, year } = req.body;
    book.title = title || book.title;
    book.author = author || book.author;
    book.year = year || book.year;

    res.json(book);
});

// Eliminar un libro
app.delete('/books/:id', (req, res) => {
    const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
    if (bookIndex === -1) return res.status(404).send('Libro no encontrado.');

    books.splice(bookIndex, 1);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
