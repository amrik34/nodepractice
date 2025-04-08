const jwt = require("jsonwebtoken");

const jwtAuthMiddleWare = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) return res.status(401).json({ error: "invalid token" });
  //Extracte Jwt
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorization" });
  try {
    // verify jwt token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // attach  user information to the request object
    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "invaild token" });
  }
};
// function to generate jwt token
const generateToken = (userData) => {
  // Generate a new jwt token using user data
  return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: 30000 });
};

module.exports = { jwtAuthMiddleWare, generateToken };
