const jwt = require("jsonwebtoken");


const verifyToken = (req, res, next) => {
  const token =
    req.headers.authorization || req.headers.authorization || req.headers["authorization"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token.replace('Bearer ',''), 'my-32-character-ultra-secure-and-ultra-long-secret');
    req.user = decoded;
  } catch (err) {
    console.log(err)
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;
