const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  uri: process.env.MYSQL_PUBLIC_URL, // URL pública de Railway
  waitForConnections: true,
  connectionLimit: 10
});

module.exports = pool;

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