const { Schema, model } = require("mongoose");

PotsSchema = new Schema({
  Image: { type: String },
  Title: { type: String },
  Description: { type: String },
  Price: { type: Number },
  Stocks: { type: Number },
  Category: { type: String },
});

module.exports = model("Pots", PotsSchema, "Pots");
