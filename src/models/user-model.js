const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const { config } = require("../config");

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

// UserSchema.statics.encryptPassword = async (password) => {
//   const salt = await bcrypt.genSalt(10);
//   return await bcrypt.hash(password, config.encrypt.salt);
// };

// UserSchema.statics.comparePassword = async (password, receivedPassword) => {
//   return await bcrypt.compare(password, receivedPassword);
// };

const userModel = mongoose.model("users", UserSchema);

module.exports = userModel;
