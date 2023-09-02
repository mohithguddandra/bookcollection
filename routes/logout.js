const express = require("express");
const router = express();
const { tokenBlacklist } = require("../middleware/verifyToken");
router.post("/", (req, res) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(400).json({ message: "No token provided" });
  }

  // Add the token to the blacklist
  tokenBlacklist.add(token);

  res.status(200).json({ message: "Logout successful" });
});

module.exports = router;
