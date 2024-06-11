

const mysql = require("mysql2/promise");

const connection = mysql.createPool({
  user: "root",
  password: "Mega@0227",
  host: "localhost",
  port: 3306,
  database: "megahistory",
});

module.exports = connection;

