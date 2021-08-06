const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const { isEmail } = require("validator");

const UserSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "The name is required"],
    },
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "The email is required"],
      trim: true,
      unique: true,
      validate: {
        validator: (value) => isEmail(value),
        message: (props) => `The email ${props.value} is not valid`,
      },
    },
    password: {
      type: String,
      required: [true, "The password is required"],
      trim: true,
    },
    admin: {
      type: Boolean,
      required: [true, "Is admin? Is required"],
      default: false,
    },
  },

  {
    timestamps: true,
  },
);

const userModel = mongoose.model("users", UserSchema);

module.exports = userModel;
