const jwt = require("jsonwebtoken");
function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) res.status(401).send("Access denied, no token is assigned");
  try {
    const decode = jwt.verify(token, "mySecureKey");
    req.user = decode;
    next();
  } catch (ex) {
    res.status(400).send("Invalid  token");
  }
}
module.exports = auth;
