const { Router } = require("express");
const verifyJWT = require("../verifyJWT");
const querys = require("../querys");
const { storage } = require("../multerConfig");
const multer = require("multer");

const router = Router();
const upload = multer({ storage: storage });
router.post("", verifyJWT, upload.single("file"), async (req, res) => {
  try {
    const {
      centro,
      fornecedor,
      valor,
      descricao,
      observacao,
      aprovador,
      solicitante,
    } = JSON.parse(req.body.json);
    const path = req.file.filename;
    const query = await querys.postConta(
      centro,
      fornecedor,
      valor,
      descricao,
      observacao,
      solicitante,
      aprovador,
      path
    );
    if (query.length === 0) {
      res.status(409).json({ message: "Não foi possível adicionar a conta!" });
    }
    res.status(201).json({ message: "Cadastro realizado com sucesso!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Erro interno no servidor!" });
  }
});

router.get("/lista", verifyJWT, async (req, res) => {
  const id = req.id;
  try {
    const query = await querys.getContas(id, id);
    res.status(200).json(query);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Erro interno no servidor!" });
  }
});

router.post("/alterstatus", verifyJWT, async (req, res) => {
  const { status, id_conta } = req.body;
  try {
    const query = await querys.alterStatus(status, id_conta);
    res.status(201).json({ message: "Status alterado!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Erro interno no servidor!" });
  }
});

module.exports = router;
