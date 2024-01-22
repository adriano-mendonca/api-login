const express = require("express");
const ips = require("./routes/ips");
const login = require("./routes/login");
const logout = require("./routes/logout");
const createUser = require("./routes/user");
const token = require("./routes/token");
const cors = require("cors");

require("dotenv-safe").config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3302;

app.use("/login", login);
app.use("/logout", logout);
app.use("/conexoes", ips);
app.use("/user", createUser);
app.use("/token", token);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta: ${PORT}`);
});
