const db = require("../models");

async function register(req, res, next) {
  const { name, lastName, email, password } = req.body;

  try {
    const { _id } = await db.userModel.create({
      name: name,
      lastName: lastName,
      email: email,
      password: password,
    });

    return res.status(201).send({
      id: _id,
    });
  } catch (err) {
    return res.status(500).send({
      error: err,
    });
  }
}

async function signIn(req, res) {}

async function getUsers(req, res, next) {
  try {
    const users = await db.userModel.find();
    return res.status(200).send({
      users: users,
    });
  } catch (err) {
    return res.status(500).send("Error");
  }
}

module.exports = {
  register: register,
  signIn: signIn,
  getUsers: getUsers,
};
