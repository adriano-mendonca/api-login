const { Pool } = require("pg");

const hubsoft = new Pool({ // Conexão com o banco de dados do hubsoft
  host: "177.10.118.77",
  port: 9432,
  database: "hubsoft",
  user: "mega_leitura",
  password: "4630a1512ee8e738f935a73a65cebf75b07fcab5",
});

module.exports = hubsoft