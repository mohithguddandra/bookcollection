const jwt = require("jsonwebtoken");

const tokenBlacklist = new Set();

function verifyToken(req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied, no token provided" });
  }

  if (tokenBlacklist.has(token)) {
    return res
      .status(401)
      .json({ message: "Token revoked, please log in again" });
  }

  try {
    const decoded = jwt.verify(token, "mySecureKey");

    next();
  } catch (ex) {
    res.status(400).json({ message: "Invalid token" });
  }
}
module.exports = {
  tokenBlacklist,
  verifyToken,
};
