//User routes
const Router = require("express").Router;
const { personController } = require("../controllers");
const { authMiddleware, isAdmin } = require("../middlewares");

const personRouter = Router();

//get user
personRouter.get("/:id", personController.getPerson);

//get all
personRouter.get("/", personController.getPersons);

//register new user
personRouter.post(
  "/register",
  [authMiddleware, isAdmin],
  personController.register,
);

personRouter.patch(
  "/:id",
  [authMiddleware, isAdmin],
  personController.updatePerson,
);

personRouter.delete(
  "/:id",
  [authMiddleware, isAdmin],
  personController.deletePerson,
);

module.exports = personRouter;
