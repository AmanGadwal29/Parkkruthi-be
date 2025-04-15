const bcrypt = require("bcrypt");
const { Schema, model } = require("mongoose");
const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../config");
AdminSchema = new Schema({
  AdminName: { type: String },
  Password: { type: String },
});

AdminSchema.pre("save", async function () {
  let salt = await bcrypt.genSalt(10);
  this.Password = await bcrypt.hash(this.Password, salt);
});

AdminSchema.methods.comparePassword = async function (pass) {
  return bcrypt.compare(pass, this.Password);
};
AdminSchema.methods.generateToken = async function () {
  return jwt.sign({ id: this._id }, JWT_KEY, { expiresIn: "5h" });
};

module.exports = model("Admins", AdminSchema, "Admins");
