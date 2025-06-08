const { Schema, model } = require("mongoose");
const pluralize = require("pluralize"); // make sure it's imported

const AddressSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  FirstName: { type: String },
  LastName: { type: String },
  Phone: { type: Number },
  Street1: { type: String },
  Street2: { type: String },
  Landmark: { type: String },
  City: { type: String },
  State: { type: String },
  Pincode: { type: String },
});

const modelName = "Address";
const collectionName = pluralize(modelName).toLowerCase();

module.exports = model(modelName, AddressSchema, collectionName);
