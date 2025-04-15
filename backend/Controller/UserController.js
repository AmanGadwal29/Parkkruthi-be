const UserSchema = require("../Model/UserSchema");

exports.addUser = async (req, res) => {
  let payload = req.body;
  UserSchema.create(payload);
  res.status(201).json({ success: true, message: "User Created", payload });
};

exports.userLogin = async (req, res) => {
  let { Name, Password } = req.body;
  if (!Name || !Password) {
    res.status(401).json({ succes: false, message: "Fill the fields" });
  } else {
    let user = await UserSchema.findOne({ Name: Name }).select("+Password");
    if (!user) {
      res.status(401).json({ succes: false, message: "User does not exist" });
    } else {
      let isMatch = await user.comparePassword(Password);
      if (!isMatch) {
        res
          .status(401)
          .json({ succes: false, message: "Password is not correct" });
      } else {
        let token = await user.generateToken();
        res
          .status(200)
          .json({ success: true, message: "Successfully login", token });
      }
    }
  }
};
