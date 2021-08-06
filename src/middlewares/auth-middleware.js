async function authMiddleware(req, res, next) {
  if (req.body) {
    next();
  }
  return res.status(401).send("Not authorized");
}

module.exports = {
  authMiddleware: authMiddleware,
};
