require('dotenv').config();
const express = require('express');
const app = express();
const userRoutes = require('./routes/users');
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', userRoutes);

// Manejo seguro de errores
app.use((err, req, res, next) => {
    console.error("Error interno:", err.message);
    res.status(500).json({ message: "Ocurrió un error interno." });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en puerto ${PORT}`);
});