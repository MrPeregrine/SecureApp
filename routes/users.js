const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const validator = require('validator');

// Registro
router.post('/register', async (req, res) => {
  try {
    let { username, email, password } = req.body;

    if(!username || !email || !password)
      return res.status(400).json({ message: "Todos los campos son obligatorios." });

    if(!validator.isEmail(email))
      return res.status(400).json({ message: "Email inválido." });

    if(!validator.isLength(password, { min: 6 }))
      return res.status(400).json({ message: "La contraseña debe tener mínimo 6 caracteres." });

    username = validator.escape(username.trim());
    email = validator.normalizeEmail(email);
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    await pool.execute(sql, [username, email, hashedPassword]);

    res.status(200).json({ message: "Usuario registrado correctamente." });
  } catch (err) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

// Login
router.post('/login', async (req, res) => {
  try{
    const { email, password } = req.body;
    if(!validator.isEmail(email))
      return res.status(400).json({ message: "Email inválido." });

    const [rows] = await pool.execute("SELECT * FROM users WHERE email = ?", [email]);
    if(rows.length === 0) return res.status(401).json({ message: "Credenciales incorrectas." });

    const match = await bcrypt.compare(password, rows[0].password);
    if(!match) return res.status(401).json({ message: "Credenciales incorrectas." });

    res.status(200).json({ message: "Login exitoso." });
  }catch(err){
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

module.exports = router;