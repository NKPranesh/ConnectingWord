const jwt = require("jsonwebtoken");
const User = require("../models/User");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  //check jwt token exists and verified
  if (token) {
    jwt.verify(token, "philanterfakadi", (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("/login");
        next();
      } else {
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

module.exports = { requireAuth };
