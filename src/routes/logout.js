const { Router } = require("express");
const router = Router();

router.post("", async (req, res) => {
  res.json({ auth: false, token: null });
});

module.exports = router;
