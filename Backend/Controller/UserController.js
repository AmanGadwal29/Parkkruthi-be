const webpush = require("web-push");

const UserSchema = require("../Model/UserSchema");

const Subscription = require("../Model/SubscribedUserSchema");

const { PRIVATE_KEY, PUBLIC_KEY } = process.env;

if (PRIVATE_KEY && PUBLIC_KEY) {
  webpush.setVapidDetails(
    "mailto:youremail@example.com",
    PUBLIC_KEY,
    PRIVATE_KEY
  );
}

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

exports.saveSubscription = async (req, res) => {
  const { userId, subscription } = req.body;
  try {
    const existing = await Subscription.findOne({
      endpoint: subscription.endpoint,
    });
    if (!existing) {
      await Subscription.create({
        user: userId,
        endpoint: subscription.endpoint,
        keys: subscription.keys,
      });
    }
    res.status(201).json({ message: "Subscription saved" });
  } catch (err) {
    console.error("Subscription save error:", err);
    res.status(500).json({ message: "Subscription error" });
  }
};
