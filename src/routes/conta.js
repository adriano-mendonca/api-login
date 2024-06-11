const { Router } = require("express");
const verifyJWT = require("../verifyJWT");
const querys = require("../querys");

const router = Router();

router.post("", verifyJWT, async (req, res) => {
  try {
    const {
      centro,
      fornecedor,
      valor,
      nf,
      descricao,
      observacao,
      aprovador,
      solicitante,
    } = req.body;

    const query = await querys.postConta(
      centro,
      fornecedor,
      valor,
      nf,
      descricao,
      observacao,
      solicitante,
      aprovador
    );

    if(query.length === 0) {
      res.status(409).json({message: "Não foi possível adicionar a conta!"})
    }
    res.status(201).json({ message: "Conta adicionado com sucesso!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Erro interno no servidor!" });
  }
});

router.get("/lista", verifyJWT, async (req, res) => {
  const id = req.id;
  try {
    const query = await querys.getContas(id);
    res.status(200).json(query);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Erro interno no servidor!" });
  }
});

module.exports = router;
