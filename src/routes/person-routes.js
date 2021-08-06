//User routes
const Router = require("express").Router;
const { personController } = require("../controllers");

const personRouter = Router();

personRouter.post("/", personController.register);

module.exports = personRouter;
