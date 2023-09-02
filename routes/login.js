const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const router = express();
const Joi = require("joi");
const _ = require("lodash");
const { User } = require("../models/user");
const { required } = require("@hapi/joi/lib/base");
router.use(express.json());
router.get("/", async (req, res) => {
  const users = await User.find().sort("name");
  res.send(users);
});

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) res.status(400).send(error.details[0].message);
  let user = await User.findOne({
    email: req.body.email,
  });

  if (!user) res.status(400).send("invalid email or password");
  console.log(user, " this is user");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) res.status(400).send("invalid email or password");

  //const token = user.genrateAuthToken();
  const token = jwt.sign({ _id: user._id }, "mySecureKey");
  res.send(token);
});
function validateUser(user) {
  const schema = Joi.object({
    email: Joi.string().min(3).max(255).required().email(),
    password: Joi.string().min(3).max(255).required(),
  });
  return schema.validate(user);
}

module.exports = router;
