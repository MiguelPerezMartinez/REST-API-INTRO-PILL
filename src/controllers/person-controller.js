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

async function getPersons(req, res) {
  try {
    const persons = await db.personModel.find();
    return res.status(200).send({
      persons: persons,
    });
  } catch (err) {
    return res.status(500).send("Error");
  }
}

async function getPerson(req, res) {
  const id = req.params.id;
  try {
    const person = await db.personModel.find({ _id: id });
    return res.status(200).send({
      person: person,
    });
  } catch (err) {
    return res.status(500).send(`Error trying to find ${id} the person`);
  }
}

async function updatePerson(req, res) {
  const id = req.params.id;
  const body = req.body;

  try {
    const person = await db.personModel.update({ _id: id }, { $set: body });
    return res.status(200).send(`Person ${id} updated correctly`);
  } catch (err) {
    return res.status(500).send({
      message: `Error trying to patch ${id}`,
      error: err,
    });
  }
}

async function deletePerson(req, res) {
  const id = req.params.id;
  try {
    const person = await db.personModel.remove({ _id: id });
    return res.status(200).send(`Person ${id} deleted correctly`);
  } catch (err) {
    return res.status(500).send("Error trying to find the person");
  }
}

module.exports = {
  register: register,
  getPerson: getPerson,
  getPersons: getPersons,
  updatePerson: updatePerson,
  deletePerson: deletePerson,
};
