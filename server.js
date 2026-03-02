const express = require('express');
const path = require('path');
const usersRouter = require('./routes/users');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use('/api', usersRouter);

// HTML routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views/index.html')));
app.get('/index.html', (req, res) => res.sendFile(path.join(__dirname, 'views/index.html')));
app.get('/register.html', (req, res) => res.sendFile(path.join(__dirname, 'views/register.html')));
app.get('/success.html', (req, res) => res.sendFile(path.join(__dirname, 'views/success.html')));
app.get('/dashboard.html', (req, res) => res.sendFile(path.join(__dirname, 'views/dashboard.html')));

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));