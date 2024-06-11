const { Router } = require("express");
const querys = require("../querys");
const bcrypt = require("bcrypt");
const crypto = require("node:crypto");
const verifyJWT = require("../verifyJWT");
const router = Router();

//criar usuário
router.get("/create", verifyJWT, async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const randomSalt = crypto.randomInt(10, 16);
    const passwordHash = await bcrypt.hash(password, randomSalt);
    const query = await querys.addUser(name, email, passwordHash);
    if (query.length === 0) {
      res.status(404).json({ message: "Não foi possível criar o usuário!" });
    } else {
      res.status(200).json(query);
    }
  } catch (error) {
    res.status(500).json({ message: "Erro interno no servidor" });
  }
});

router.get("/info", verifyJWT, async (req, res) => {
  const query = await querys.getUser(req.id);
  try {
    if (!req.id) {
      res.status(404).json({ message: "Dados incompletos!" });
    }

    const userInfo = {
      id: req.id,
      email: req.email,
      name: query[0].name,
    };
    res.status(200).json(userInfo);
  } catch (err) {
    res.status(500).json({ message: "Erro interno no servidor." });
  }
});

// /password/lost

router.post("/password/reset", (req, res) => {
  const { email } = req.body;
  try {
    res.status(200).json({ email: email });
  } catch (err) {
    res.status(500).json({ message: "Erro interno no servidor." });
  }
});

module.exports = router;
