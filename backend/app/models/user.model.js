const mongoose = require("mongoose");
const crypto = require("crypto");
const uniqueValidator = require("mongoose-unique-validator");
const UserSchema = mongoose.Schema(
  {
    firstname: { type: String },
    lastname: { type: String },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String },
    amount: { type: Number },
    logs: [],
  },
  {
    timestamps: true,
  }
);

UserSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User", UserSchema);
