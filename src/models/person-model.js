const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const PersonSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "The name is required"],
    },
    dateOfBirth: {
      type: Date,
      trim: true,
    },
    placeOfBirth: {
      type: String,
      trim: true,
    },
    roles: {
      type: Array,
      required: [true, "At least one role is required"],
      trim: true,
    },
  },

  {
    timestamps: true,
  },
);

const personModel = mongoose.model("persons", PersonSchema);

module.exports = personModel;
