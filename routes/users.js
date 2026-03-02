const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const validator = require('validator');

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password)
      return res.status(400).json({ message: "Todos los campos son obligatorios." });

    if (!validator.isEmail(email))
      return res.status(400).json({ message: "Email inválido." });

    if (!validator.isLength(password, { min: 6 }))
      return res.status(400).json({ message: "La contraseña debe tener mínimo 6 caracteres." });

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    await pool.execute(sql, [username, email, hashedPassword]);

    res.status(200).json({ message: "Usuario registrado correctamente." });

  } catch (err) {
    console.error("Error DB:", err.message);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const [rows] = await pool.execute("SELECT * FROM users WHERE email = ?", [email]);
    if (rows.length === 0) return res.status(401).json({ message: "Credenciales incorrectas." });

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Credenciales incorrectas." });

    res.status(200).json({ message: "Login exitoso." });

  } catch (err) {
    console.error("Error DB:", err.message);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

module.exports = router;