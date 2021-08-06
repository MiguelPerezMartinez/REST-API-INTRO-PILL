//User routes
const Router = require("express").Router;
const { userController } = require("../controllers");
// const authMiddleware = require("../middlewares/auth-middleware");

const userRouter = Router();

//get user
userRouter.get("/:id", userController.getUser);

//get all
userRouter.get("/", userController.getUsers);

//register new user
userRouter.post("/register", userController.register);

//authenticate user
userRouter.post("/authenticate", userController.authenticate);

userRouter.patch("/:id", userController.updateUser);

userRouter.delete("/:id", userController.deleteUser);

module.exports = userRouter;
