const UserSchema = require("../Model/UserSchema");
const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../config");

exports.userAccess = async function (req, res, next) {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    try {
      let decode = jwt.verify(token, JWT_KEY);
      req.user = UserSchema.findOne({ _id: decode.id });
      if (!req.user) {
        res.status(401).json({ succes: false, message: "User Not found" });
      } else {
        next();
      }
    } catch (err) {
      console.error(err);
    }
  } else {
    res.status(401).json({ succes: false, message: "Unthorized" });
  }
};
