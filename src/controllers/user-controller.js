const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { config } = require("../config");

async function comparePassword(receivedPassword, userPassword) {
  const comparedPassword = await bcrypt.compare(receivedPassword, userPassword);
  return comparedPassword;
}

function getToken(savedUser) {
  return jwt.sign({ id: savedUser._id }, config.encrypt.secret, {
    expiresIn: 86400, // 24 horas
  });
}

async function register(req, res) {
  const { name, lastName, email, password, admin } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const savedUser = await db.userModel.create({
      name: name,
      lastName: lastName,
      email: email,
      password: hashedPassword,
      admin: admin,
    });

    const token = getToken(savedUser);

    return res.status(201).send({
      message: "User created...",
      id: savedUser._id,
      token: token,
    });
  } catch (err) {
    return res.status(500).send({
      message: "Error...",
      error: err,
    });
  }
}

async function authenticate(req, res) {
  const { email, password } = req.body;

  const user = await db.userModel.find({ email });
  const hashedPassword = await comparePassword(password, user[0].password);

  if (!hashedPassword)
    return res.status(403).send({
      message: "Incorrect password",
    });

  const token = await getToken(user[0]);

  return res.status(200).send({
    token: token,
  });
}

async function getUsers(req, res) {
  try {
    const users = await db.userModel.find();
    return res.status(200).send({
      users: users,
    });
  } catch (err) {
    return res.status(500).send("Error");
  }
}

async function getUser(req, res) {
  const id = req.params.id;
  try {
    const user = await db.userModel.find({ _id: id });
    return res.status(200).send({
      user: user,
    });
  } catch (err) {
    return res.status(500).send(`Error trying to find ${id} the user`);
  }
}

async function updateUser(req, res) {
  const id = req.params.id;
  const body = req.body;

  if (body.password) {
    body.password = await bcrypt.hash(body.password, 10);
  }

  try {
    const user = await db.userModel.update({ _id: id }, { $set: body });
    return res.status(200).send(`User ${id} updated correctly`);
  } catch (err) {
    return res.status(500).send({
      message: `Error trying to patch ${id}`,
      error: err,
    });
  }
}

async function deleteUser(req, res) {
  const id = req.params.id;
  try {
    const user = await db.userModel.remove({ _id: id });
    return res.status(200).send(`User ${id} deleted correctly`);
  } catch (err) {
    return res.status(500).send("Error trying to find the user");
  }
}

module.exports = {
  register: register,
  authenticate: authenticate,
  getUsers: getUsers,
  getUser: getUser,
  updateUser: updateUser,
  deleteUser: deleteUser,
};
