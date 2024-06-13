const { Router } = require("express");
const querys = require("../querys");
const jwt = require("jsonwebtoken");

const router = Router();

router.post("", async (req, res, next) => {
  const { email, password } = req.body;
  const query = await querys.verifyUser(email, password);
  try {
    if (query.valid === false) {
      res.json({ok: false});
    } else {
      const id = query.id_usuario;
      const token = jwt.sign({ id, email }, process.env.SECRET, {
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
