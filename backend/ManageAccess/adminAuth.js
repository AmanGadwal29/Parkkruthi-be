const AdminSchema = require("../Model/AdminSchema");
const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../config");

exports.adminAccess = async function (req, res, next) {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];

    try {
      const decoded = jwt.verify(token, JWT_KEY);
      const admin = await AdminSchema.findOne({ _id: decoded.id });

      if (!admin) {
        return res
          .status(401)
          .json({ success: false, message: "Admin not found" });
      }

      req.Admin = admin; // store the actual admin object
      next();
    } catch (err) {
      console.error("JWT Error:", err.message);
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
  } else {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized: No token" });
  }
};
