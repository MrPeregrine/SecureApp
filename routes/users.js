const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const validator = require('validator');


// ================= REGISTRO =================
router.post('/register', async (req, res, next) => {
    try {
        let { username, email, password } = req.body;

        // VALIDACIÓN
        if (!username || !email || !password) {
            return res.status(400).json({ message: "Todos los campos son obligatorios." });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Email inválido." });
        }

        if (!validator.isLength(password, { min: 6 })) {
            return res.status(400).json({ message: "La contraseña debe tener mínimo 6 caracteres." });
        }

        // SANITIZACIÓN
        username = validator.escape(username.trim());
        email = validator.normalizeEmail(email);

        // HASH DE CONTRASEÑA
        const hashedPassword = await bcrypt.hash(password, 10);

        // CONSULTA PARAMETRIZADA (ANTI SQL INJECTION)
        const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
        await pool.execute(sql, [username, email, hashedPassword]);

        res.json({ message: "Usuario registrado correctamente." });

    } catch (error) {
        next(error);
    }
});


// ================= LOGIN =================
router.post('/login', async (req, res, next) => {
    try {
        let { email, password } = req.body;

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Email inválido." });
        }

        const sql = "SELECT * FROM users WHERE email = ?";
        const [rows] = await pool.execute(sql, [email]);

        if (rows.length === 0) {
            return res.status(401).json({ message: "Credenciales incorrectas." });
        }

        const user = rows[0];

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({ message: "Credenciales incorrectas." });
        }

        res.json({ message: "Login exitoso." });

    } catch (error) {
        next(error);
    }
});

module.exports = router;