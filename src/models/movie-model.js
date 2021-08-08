const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const MovieSchema = Schema(
  {
    title: {
      type: String,
      required: [true, "The title is required"],
      trim: true,
      unique: true,
    },
    releaseYear: {
      type: String,
      trim: true,
      required: [true, "The release year is required"],
    },
    genres: {
      type: Array,
      required: [true, "At least one genre is required"],
      trim: true,
    },
    duration: {
      type: String,
      trim: true,
    },
    cast: [
      {
        ref: "persons",
        type: Schema.Types.ObjectId,
      },
    ],
    crew: [
      {
        ref: "persons",
        type: Schema.Types.ObjectId,
      },
    ],
  },

  {
    timestamps: true,
  },
);

const movieModel = mongoose.model("movies", MovieSchema);

module.exports = movieModel;
