

const mysql = require("mysql2/promise");

const connection = mysql.createPool({
  user: "root",
  password: "",
  host: "localhost",
  port: 3306,
  database: "",
});

module.exports = connection;

