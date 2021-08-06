//User routes
const Router = require("express").Router;
const { movieController } = require("../controllers");
// const authMiddleware = require("../middlewares/auth-middleware");

const movieRouter = Router();

//get by id
movieRouter.get("/:id", (req, res) => {
  //Response ok con mensaje
  res.status(200).send({
    message: "Movie Hello world",
  });
});

movieRouter.post("/", /*authMiddleware,*/ movieController.register);

module.exports = movieRouter;
