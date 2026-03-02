const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  uri: process.env.MYSQL_PUBLIC_URL,
  connectionLimit: 10
});

// Reintentos de conexión
(async () => {
  let connected = false, attempts = 0;
  while(!connected && attempts < 5){
    try{
      attempts++;
      await pool.query("SELECT 1");
      console.log("Conexión a MySQL exitosa");
      connected = true;
    }catch(err){
      console.error(`Intento ${attempts}: No se pudo conectar a MySQL.`, err.code);
      await new Promise(r => setTimeout(r, 3000));
    }
  }
  if(!connected) console.error("No se pudo conectar a MySQL después de varios intentos");
})();

module.exports = pool;