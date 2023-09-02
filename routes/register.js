const express = require("express");
const bcrypt = require("bcrypt");
const router = express();
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const { User, validateUser } = require("../models/user");
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

  if (user) res.status(400).send("user already exists in database");
  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const token = jwt.sign({ _id: user._id }, "mySecureKey");
  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
