// db.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.MYSQLHOST || 'mysql.railway.internal',       // host de la DB
  user: process.env.MYSQLUSER || 'root',                          // usuario
  password: process.env.MYSQLPASSWORD,                            // contraseña
  database: process.env.MYSQLDATABASE,                            // nombre de la DB
  port: process.env.MYSQLPORT || 3306,                            // puerto
  waitForConnections: true,
  connectionLimit: 10
});

// Test de conexión al iniciar
(async () => {
  try {
    const [rows] = await pool.query("SELECT NOW() AS fecha");
    console.log("Conexión a MySQL exitosa. Hora DB:", rows[0].fecha);
  } catch (err) {
    console.error("Error al conectar a MySQL:", err.message);
  }
})();

module.exports = pool;