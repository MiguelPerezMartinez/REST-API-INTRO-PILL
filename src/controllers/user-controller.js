const db = require("../models");

async function register(req, res) {
  const { name, lastName, email, password, admin } = req.body;

  try {
    const { _id } = await db.userModel.create({
      name: name,
      lastName: lastName,
      email: email,
      password: password,
      admin: admin,
    });

    return res.status(201).send({
      message: "User created...",
      id: _id,
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
  try {
    const user = await db.userModel.find({ email: email });
    if (user[0].email === email) {
      console.log(user.email);
      if (user[0].password === password) {
        console.log(user.password);
        return res.status(200).send({
          user: user,
        });
      }
    }
    return res.status(403).send({
      message: "Incorrect user or password",
    });
  } catch (err) {
    return res.status(500).send("Error");
  }
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
