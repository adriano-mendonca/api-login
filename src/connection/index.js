// const { Client } = require("pg");

// require("dotenv").config();

// const connection = new Client({
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   database: process.env.DB_BASE,
// });

// connection.connect();

// module.exports = connection;

const mysql = require("mysql2/promise");

const connection = mysql.createPool({
  user: "root",
  password: "Mega@0227",
  host: "localhost",
  port: 3306,
  database: "megahistory",
});

module.exports = connection;

// // Execute uma consulta SQL
// async function teste() {
//   connection.connect();
//   const results = await connection.query(
//     "SELECT COUNT(*) FROM radacct_convidado"
//   );

//   // Imprima os resultados da consulta
//   console.log(results.rows);

//   connection.end();
// }

// teste();
