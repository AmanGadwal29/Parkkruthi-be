const { Schema, model } = require("mongoose");

//! Schema-------------------------------
PlantsSchema = new Schema(
  {
    Image: {
      data: Buffer,
      contentType: String,
    },
    Title: { type: String },
    Description: { type: String },
    Price: { type: Number },
    Stocks: { type: Number },
    Category: { type: String },
  },
  { strict: false }
);

module.exports = model("Plants", PlantsSchema, "Plants");
