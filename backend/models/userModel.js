const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please Add a Username!"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please Add an Email!"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please Add a Password!"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
