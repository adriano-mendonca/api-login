const { Router } = require("express");
const querys = require("../querys");
const router = Router();
const verifyJWT = require("../verifyJWT");

router.get("/intervalo", verifyJWT, async (req, res) => {
  try {
    const { data_inicio, data_fim } = req.body;
    const query = await querys.getIpByDate(data_inicio, data_fim);
    if (query.length === 0) {
      res
        .status(404)
        .json({ message: "Nenhum IP encontrado no intervalo especificado" });
    } else {
      res.status(200).json(query);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

router.get("", verifyJWT, async (req, res) => {
  try {
    const query = await querys.getAllUsers();
    if (query.length === 0) {
      res.status(404).json({ message: "Nenhum IP encontrado" });
    } else {
      res.status(200).json(query);
    }
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

module.exports = router;
