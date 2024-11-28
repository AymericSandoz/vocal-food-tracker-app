const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.body.token;
  if (token) {
    jwt.verify(token, process.env.KEY_JWT, async (err, decodedToken) => {
      if (err) {
        res.status(401).json("No token");
      } else {
        res.status(200).json(decodedToken.userId);
        next();
      }
    });
  } else {
    console.log("No token");
  }
};
