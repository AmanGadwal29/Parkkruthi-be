const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../config");

//! Schema-------------------------------
AdminSchema = new Schema({
  AdminName: { type: String },
  Password: { type: String },
});

//! Password Hashing-------------------------------
AdminSchema.pre("save", async function () {
  let salt = await bcrypt.genSalt(10);
  this.Password = await bcrypt.hash(this.Password, salt);
});

//! Authentication-------------------------------
AdminSchema.methods.comparePassword = async function (pass) {
  return bcrypt.compare(pass, this.Password);
};

//! JWT Token Generation-------------------------------
AdminSchema.methods.generateToken = async function () {
  return jwt.sign({ id: this._id }, JWT_KEY, { expiresIn: "5h" });
};

module.exports = model("Admins", AdminSchema, "Admins");
