const express = require('express');
const app = express();
const usersRouter = require('./routes/users');

// Middleware para JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos desde "public"
app.use(express.static('public'));

// Rutas
app.use('/', usersRouter);

// Servir HTML
app.get('/', (req, res) => res.sendFile(__dirname + '/views/index.html'));
app.get('/register.html', (req, res) => res.sendFile(__dirname + '/views/register.html'));

// Iniciar servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));