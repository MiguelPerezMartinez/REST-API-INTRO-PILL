const db = require("../models");

async function register(req, res, next) {
  const { name, dateOfBirth, placeOfBirth, roles } = req.body;

  try {
    const { _id } = await db.personModel.create({
      name: name,
      dateOfBirth: dateOfBirth,
      placeOfBirth: placeOfBirth,
      roles: roles,
    });

    return res.status(201).send({
      message: "Person created...",
      id: _id,
    });
  } catch (err) {
    return res.status(500).send({
      message: "Error...",
      error: err,
    });
  }
}

module.exports = {
  register: register,
};
