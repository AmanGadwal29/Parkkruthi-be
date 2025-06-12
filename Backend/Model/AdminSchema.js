const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../config");

//! Schema
const AdminSchema = new Schema({
  AdminName: { type: String },
  Password: { type: String, select: false },
});

//! Password Hashing
AdminSchema.pre("save", async function (next) {
  if (!this.isModified("Password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.Password = await bcrypt.hash(this.Password, salt);
  next();
});

//! Authentication
AdminSchema.methods.comparePassword = async function (pass) {
  return bcrypt.compare(pass, this.Password);
};

//! JWT Token Generation
AdminSchema.methods.generateToken = async function () {
  return jwt.sign({ id: this._id }, JWT_KEY, { expiresIn: "30d" });
};

module.exports = model("Admins", AdminSchema, "Admins");
