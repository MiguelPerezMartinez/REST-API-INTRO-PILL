const db = require("../models");

async function isAdmin(req, res, next) {
  try {
    const userId = req.userId;
    const user = await db.userModel.findById(userId); // Find user from request id

    if (!user.admin)
      return res.status(404).send({
        message: "the user must be an administrator",
      });

    console.log("User is admin");
    next();
  } catch (err) {
    console.log("Verify admin error");
  }
}

module.exports = isAdmin;
