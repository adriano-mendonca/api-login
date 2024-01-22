const jwt = require("jsonwebtoken");

function verifyJWT(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ auth: false, message: "No token provided." });
  }

  try {
    jwt.verify(token, process.env.SECRET, function (err, decoded) {
      if (err) {
        return res
          .status(403)
          .json({ auth: false, message: "Failed to authenticate token" });
      } else {
        req.id = decoded.id;
        req.username = decoded.username;
        next();
      }
    });
  } catch (error) {
    console.error("Erro durante a verificação do token:", error);
    return res
      .status(500)
      .json({ auth: false, message: "Internal server error" });
  }
}

module.exports = verifyJWT;
