const AdminSchema = require("../Model/AdminSchema");

exports.addAdmin = async (req, res) => {
  let payload = req.body;
  await AdminSchema.create(payload);
  res.status(201).json({ success: true, message: "Admin Created", payload });
};

exports.adminLogin = async (req, res) => {
  let { AdminName, Password } = req.body;
  if (!AdminName || !Password) {
    res.status(401).json({ succes: false, message: "Fill all the fields" });
  } else {
    let admin = await AdminSchema.findOne({ AdminName: AdminName }).select(
      "+Password"
    );
    if (!admin) {
      res.status(401).json({ succes: false, message: "Admin does not exist" });
    } else {
      let isMatch = await admin.comparePassword(Password);
      if (!isMatch) {
        res.status(401).json({ succes: false, message: "Incorrect password" });
      } else {
        let token = await admin.generateToken();
        res.status(200).json({
          success: true,
          message: "Logged in successfully",
          token,
          adminData: {
            AdminName: admin.AdminName,
          },
        });
      }
    }
  }
};
