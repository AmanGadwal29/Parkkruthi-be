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
      const decoded = jwt.verify(token, JWT_KEY);

      const user = await UserSchema.findOne({ _id: decoded.id });

      if (!user) {
        return res
          .status(401)
          .json({ success: false, message: "User not found" });
      }

      req.user = user; // Attach the full user object
      next();
    } catch (err) {
      console.error(err);
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
  } else {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};
