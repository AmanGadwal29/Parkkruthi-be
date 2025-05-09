const AdminSchema = require("../Model/AdminSchema");

//! Add Admin Handler Function----------------------------------
exports.addAdmin = async (req, res) => {
  let payload = req.body;
  await AdminSchema.create(payload);
  res
    .status(201)
    .json({ status: "Success", message: "Admin Created", data: { payload } });
};

//! Admin Login Handler Function----------------------------------
exports.adminLogin = async (req, res) => {
  let { AdminName, Password } = req.body;
  if (!AdminName || !Password) {
    res
      .status(401)
      .json({ status: "Failed", message: "Please fill all the fields" });
  } else {
    let admin = await AdminSchema.findOne({ AdminName: AdminName }).select(
      "+Password"
    );
    if (!admin) {
      res
        .status(401)
        .json({ status: "Failed", message: "Admin does not exist" });
    } else {
      let isMatch = await admin.comparePassword(Password);
      if (!isMatch) {
        res
          .status(401)
          .json({ status: "Failed", message: "Incorrect password" });
      } else {
        let token = await admin.generateToken();
        res.status(200).json({
          status: "Success",
          message: "Logged in successfully",
          data: {
            AdminName: admin.AdminName,
            token,
          },
        });
      }
    }
  }
};
