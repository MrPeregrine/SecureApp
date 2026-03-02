const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: parseInt(process.env.MYSQLPORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10
});

// Reintentos de conexión
(async () => {
  let connected = false;
  let attempts = 0;

  while (!connected && attempts < 5) {
    try {
      attempts++;
      const [rows] = await pool.query("SELECT 1");
      console.log("Conexión a MySQL exitosa");
      connected = true;
    } catch (err) {
      console.error(`Intento ${attempts}: No se pudo conectar a MySQL.`, err.code);
      await new Promise(r => setTimeout(r, 3000)); // espera 3 segundos
    }
  }

  if (!connected) {
    console.error("No se pudo conectar a MySQL después de varios intentos");
  }
})();

module.exports = pool;