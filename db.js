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

module.exports = pool;