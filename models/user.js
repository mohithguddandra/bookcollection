const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    minlenght: 3,
    maxlength: 25,
  },
  email: {
    type: String,
    require: true,
    minlenght: 3,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    minlenght: 3,
    maxlength: 255,
  },
  isAdmin: Boolean,
});
userSchema.methods.genrateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.get("jwtPrivateKey")
  );
  return token;
};
const User = new mongoose.model("users", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().min(3).max(255).required().email(),
    password: Joi.string().min(3).max(255).required(),
  });
  return schema.validate(user);
}
exports.User = User;
exports.validateUser = validateUser;
