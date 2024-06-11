const { Router } = require("express");
const querys = require("../querys");
const verifyJWT = require("../verifyJWT");

const router = Router();

router.get("/fornecedor", verifyJWT, async (req, res) => {
  try {
    const query = await querys.getFornecedor();
    if (query.length === 0) {
      return res.status(403).json({ message: "Erro interno no servidor!" });
    } else {
      return res.status(200).json(query);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

router.get("/aprovador", verifyJWT, async (req, res) => {
  try {
    const query = await querys.getAprovador();
    if (query.length === 0) {
      return res.status(403).json({ message: "Erro interno no servidor!" });
    } else {
      return res.status(200).json(query);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

module.exports = router;
