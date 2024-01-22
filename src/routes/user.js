const { Router } = require("express");
const querys = require("../querys");
const bcrypt = require("bcrypt");
const crypto = require("node:crypto");
const verifyJWT = require("../verifyJWT");
const router = Router();

//criar usuário
router.get("/create", verifyJWT ,async (req, res) => {
  try {
    const { username, password } = req.body;
    const randomSalt = crypto.randomInt(10, 16);
    const passwordHash = await bcrypt.hash(password, randomSalt);
    const query = await querys.addUser(username, passwordHash);
    if (query.length === 0) {
      res.status(404).json({ message: "Não foi possível criar o usuário!" });
    } else {
      res.status(200).json(query);
    }
  } catch (error) {
    res.status(500).json({ message: "Erro interno no servidor" });
  }
});

router.get("/info", verifyJWT, (req, res) => {
  try {
    if(!req.id){
      res.status(404).json({message: "Dados incompletos!"})
    }
    const userInfo = {
      id: req.id,
      username: req.username,
    };
    res.status(200).json(userInfo);
  } catch(err){
    res.status(500).json({message:"Erro interno no servidor."})
  }
});

// /password/lost

router.post("/password/reset", (req, res) => {
  const {username} = req.body
  try {
    res.status(200).json({username: username});
  } catch(err){
    res.status(500).json({message:"Erro interno no servidor."})
  }
});

module.exports = router;
