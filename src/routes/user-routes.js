//User routes
const Router = require("express").Router;
const { userController } = require("../controllers");
// const authMiddleware = require("../middlewares/auth-middleware");

const userRouter = Router();

//get by id
userRouter.get("/:id", (req, res) => {
  //Response ok con mensaje
  res.status(200).send({
    message: "Hello world",
  });
});

//get all
userRouter.get("/", userController.getUsers);

userRouter.post("/", /*authMiddleware,*/ userController.register);

userRouter.patch("/", (req, res) => {
  //Response ok con mensaje
  res.status(200).send({
    message: "Hello world",
  });
});

userRouter.delete("/:id", (req, res) => {
  //Response ok con mensaje
  res.status(200).send({
    message: "Hello world",
  });
});

module.exports = {
  userRouter: userRouter,
};
