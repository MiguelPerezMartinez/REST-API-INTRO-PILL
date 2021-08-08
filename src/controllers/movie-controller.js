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

async function getMovies(req, res) {
  try {
    const movies = await db.movieModel.find().populate(["cast", "crew"]);
    return res.status(200).send({
      movies: movies,
    });
  } catch (err) {
    return res.status(500).send("Error");
  }
}

async function getMovie(req, res) {
  const id = req.params.id;
  try {
    const movie = await db.movieModel
      .find({ _id: id })
      .populate(["cast", "crew"]);
    return res.status(200).send({
      movie: movie,
    });
  } catch (err) {
    return res.status(500).send(`Error trying to find ${id} movie`);
  }
}

async function updateMovie(req, res) {
  const id = req.params.id;
  const body = req.body;

  try {
    const movie = await db.movieModel.update({ _id: id }, { $set: body });
    return res.status(200).send(`Movie ${id} updated correctly`);
  } catch (err) {
    return res.status(500).send({
      message: `Error trying to patch ${id} movie`,
      error: err,
    });
  }
}

async function deleteMovie(req, res) {
  const id = req.params.id;
  try {
    const movie = await db.movieModel.remove({ _id: id });
    return res.status(200).send(`Movie ${id} deleted correctly`);
  } catch (err) {
    return res.status(500).send(`Error trying to delete ${id} movie`);
  }
}

module.exports = {
  register: register,
  getMovie: getMovie,
  getMovies: getMovies,
  updateMovie: updateMovie,
  deleteMovie: deleteMovie,
};
