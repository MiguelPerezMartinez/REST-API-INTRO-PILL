const authMiddleware = require("./auth-middleware");
const isAdmin = require("./is-admin");

module.exports = {
  authMiddleware: authMiddleware,
  isAdmin: isAdmin,
};
