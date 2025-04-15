const { adminAccess } = require("./adminAuth");
const { userAccess } = require("./userAuth");

// Middleware that proceeds if either adminAccess OR userAccess passes
module.exports = adminOrUserAccess = async (req, res, next) => {
  // Helper to clone request headers because middlewares might mutate them
  const originalHeaders = { ...req.headers };

  // Try adminAccess
  try {
    req.headers = { ...originalHeaders }; // reset
    await new Promise((resolve, reject) => {
      adminAccess(req, res, (err) => (err ? reject(err) : resolve()));
    });
    return next(); // Admin passed
  } catch (err) {
    console.error(err);
  }

  // Try userAccess
  try {
    req.headers = { ...originalHeaders }; // reset
    await new Promise((resolve, reject) => {
      userAccess(req, res, (err) => (err ? reject(err) : resolve()));
    });
    return next(); // User passed
  } catch (err) {
    // Both failed
    return res.status(403).json({ success: false, message: "Access denied" });
  }
};

// module.exports = adminOrUserAccess;
