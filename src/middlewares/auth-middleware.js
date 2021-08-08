const jwt = require("jsonwebtoken");

const { config } = require("../config");
const db = require("../models");

async function authMiddleware(req, res, next) {
  try {
    const token = req.headers["access-token"]; //receive token header

    if (!token) return res.status(403).send({ message: "No token provided" });

    const decoded = jwt.verify(token, config.encrypt.secret); //verify token
    const user = await db.userModel.findById(decoded.id); // Find user from token id
    req.userId = decoded.id;

    if (!user)
      return res.status(404).send({
        message: "User not found",
      });

    next();
  } catch (err) {
    res.status(401).send({
      message: "Unauthorized",
    });
  }
}

module.exports = authMiddleware;
