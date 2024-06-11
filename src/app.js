const express = require("express");
const login = require("./routes/login");
const logout = require("./routes/logout");
const createUser = require("./routes/user");
const token = require("./routes/token");
const cors = require("cors");
const api = require("./routes/api");
const conta = require("./routes/conta")

require("dotenv-safe").config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3302;

app.use("/login", login);
app.use("/logout", logout);
app.use("/user", createUser);
app.use("/token", token);
app.use("/api", api);
app.use("/conta", conta);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta: ${PORT}`);
});
