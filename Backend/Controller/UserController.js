const UserSchema = require("../Model/UserSchema");

//! Add User Handler Function----------------------------------
exports.addUser = async (req, res) => {
  let payload = req.body;
  UserSchema.create(payload);
  res
    .status(201)
    .json({ status: "Success", message: "User Created", data: { payload } });
};

//! User Login Handler Function----------------------------------
exports.userLogin = async (req, res) => {
  let { Name, Password } = req.body;
  if (!Name || !Password) {
    res
      .status(401)
      .json({ status: "Failed", message: "Please fill all the fields" });
  } else {
    let user = await UserSchema.findOne({ Name: Name }).select("+Password");
    if (!user) {
      res
        .status(401)
        .json({ status: "Failed", message: "User does not exist" });
    } else {
      let isMatch = await user.comparePassword(Password);
      if (!isMatch) {
        res
          .status(401)
          .json({ status: "Failed", message: "Incorrect password" });
      } else {
        let token = await user.generateToken();
        res.status(200).json({
          status: "Success",
          message: "Logged in successfully",
          data: {
            UserName: user.Name,
            token,
          },
        });
      }
    }
  }
};
