// db.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.MYSQLHOST,        // host Railway
  user: process.env.MYSQLUSER,        // usuario
  password: process.env.MYSQLPASSWORD,// contraseña
  database: process.env.MYSQLDATABASE,// nombre de la DB
  port: parseInt(process.env.MYSQLPORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10
});

// Test de conexión
(async () => {
  try {
    console.log("Conexión a MySQL exitosa. Hora DB:", rows[0].fecha);
  } catch (err) {
    console.error("Error al conectar a MySQL:", err.message);
  }
})();

module.exports = pool;