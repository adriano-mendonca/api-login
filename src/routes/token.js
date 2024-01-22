const { Router } = require("express");
const verifyJWT = require("../verifyJWT");

const router = Router();

router.post("/validate", verifyJWT, (req, res) => {
  const userInfo = {
    id: req.id,
    username: req.username,
  };
  res.json(userInfo);
});

module.exports = router;
