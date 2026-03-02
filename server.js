const express = require('express');
const app = express();
const path = require('path');
const usersRouter = require('./routes/users');

// Middleware para JSON y URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos desde "public"
app.use(express.static(path.join(__dirname, 'public')));

// Rutas de la API
app.use('/api', usersRouter); // cambiamos a /api para no mezclar con HTML

// Rutas de páginas HTML
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views', 'index.html')));
app.get('/index.html', (req, res) => res.sendFile(path.join(__dirname, 'views', 'index.html')));
app.get('/register.html', (req, res) => res.sendFile(path.join(__dirname, 'views', 'register.html')));
app.get('/success.html', (req, res) => res.sendFile(path.join(__dirname, 'views', 'success.html')));
app.get('/dashboard.html', (req, res) => res.sendFile(path.join(__dirname, 'views', 'dashboard.html')));

// Iniciar servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));