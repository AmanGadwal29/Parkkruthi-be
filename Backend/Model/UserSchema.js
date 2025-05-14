const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../config");

//! Schema-------------------------------
let UserSchema = new Schema({
  Name: { type: String },
  Email: { type: String },
  Phone: { type: Number },
  Ref: { type: String },
  Password: { type: String },
});

//! Password Hashing-------------------------------
UserSchema.pre("save", async function () {
  let salt = await bcrypt.genSalt(10);
  this.Password = await bcrypt.hash(this.Password, salt);
});

//! Authentication-------------------------------
UserSchema.methods.comparePassword = async function (pass) {
  return bcrypt.compare(pass, this.Password);
};

//! JWT Token Generation-------------------------------
UserSchema.methods.generateToken = async function () {
  return jwt.sign({ id: this._id }, JWT_KEY, { expiresIn: "5h" });
};

module.exports = model("Users", UserSchema, "Users");
