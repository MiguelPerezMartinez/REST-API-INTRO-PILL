const db = require("../models");

async function register(req, res, next) {
  const { title, releaseYear, genres, duration, cast, crew } = req.body;

  try {
    const { _id } = await db.movieModel.create({
      title: title,
      releaseYear: releaseYear,
      genres: genres,
      duration: duration,
      cast: cast,
      crew: crew,
    });

    return res.status(201).send({
      message: "Movie created...",
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
