const { Router } = require("express");
const querys = require("../querys");
const jwt = require("jsonwebtoken");

const router = Router();

router.post("", async (req, res, next) => {
  const { username, password } = req.body;
  const query = await querys.verifyUser(username, password);

  try {
    if (!query.valid) {
      res.status(404).json({ message: "Usuário/Senha inválido!" });
    } else {
      const id = query.id_usuario;
      const token = jwt.sign({ id, username }, process.env.SECRET, {
        expiresIn: 5000,
      });
      return res.json({ auth: true, token: token, id_usuario: id });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

module.exports = router;
