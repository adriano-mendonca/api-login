const express = require("express");
const login = require("./routes/login");
const logout = require("./routes/logout");
const createUser = require("./routes/user");
const token = require("./routes/token");
const cors = require("cors");
const api = require("./routes/api");
const conta = require("./routes/conta");
// const https = require('https');
// const fs = require('fs');

require("dotenv-safe").config();

const app = express();

// const options = {
//   key: fs.readFileSync('/etc/letsencrypt/live/apicontas.megalinkpiaui.com.br/privkey.pem'),
//   cert: fs.readFileSync('/etc/letsencrypt/live/apicontas.megalinkpiaui.com.br/cert.pem'),
// }

app.use(cors());
app.use(express.json());

const PORT = 8443;

app.use("/login", login);
app.use("/logout", logout);
app.use("/user", createUser);
app.use("/token", token);
app.use("/api", api);
app.use("/conta", conta);
app.use("/files", express.static("uploads"));

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta: ${PORT}`);
});

// https.createServer(options, app).listen(PORT, () => {
//   console.log(`Servidor rodando em https://apicontas.megalinkpiaui:${PORT}.com.br`)
// })
