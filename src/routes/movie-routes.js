//movie routes
const Router = require("express").Router;
const { movieController } = require("../controllers");
const { authMiddleware, isAdmin } = require("../middlewares");

const movieRouter = Router();

//get movie
movieRouter.get("/:id", movieController.getMovie);

//get all
movieRouter.get("/", movieController.getMovies);

//register new movie
movieRouter.post(
  "/register",
  [authMiddleware, isAdmin],
  movieController.register,
);

movieRouter.patch(
  "/:id",
  [authMiddleware, isAdmin],
  movieController.updateMovie,
);

movieRouter.delete(
  "/:id",
  [authMiddleware, isAdmin],
  movieController.deleteMovie,
);

module.exports = movieRouter;
