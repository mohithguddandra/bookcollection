// Requiring module
const express = require("express");
const mongoose = require("mongoose");
const books = require("./routes/books");
const register = require("./routes/register");
const login = require("./routes/login");
const logout = require("./routes/logout");
// Creating express object
const app = express();
mongoose
  .connect("mongodb://127.0.0.1/books")
  .then(() => console.log("connecting to mongodb database"));

// Handling GET request
app.get("/", (req, res) => {
  res.send("A simple Node App is " + "running on this server");
  res.end();
});

app.use("/api/books", books);
app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/logout", logout);
// Port Number
const PORT = process.env.PORT || 5000;

// Server Setup
app.listen(PORT, console.log(`Server started on port ${PORT}`));
