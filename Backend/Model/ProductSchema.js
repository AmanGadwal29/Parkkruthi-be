// Model/CommonProductModel.js
const mongoose = require("mongoose");
const pluralize = require("pluralize");

const ProductSchema = new mongoose.Schema(
  {
    ImageURL: [{ type: String }],
    Title: { type: String },
    Description: { type: String },
    Price: { type: Number },
    Stocks: { type: Number },
    Category: { type: String },
  },
  { strict: false }
);

const schemaManager = (type) => {
  const normalizedType = type.toLowerCase();
  const modelName = `Product_${normalizedType}`;
  const collectionName = pluralize(normalizedType);

  if (mongoose.models[modelName]) {
    return mongoose.models[modelName];
  }

  return mongoose.model(modelName, ProductSchema, collectionName);
};

module.exports = schemaManager;
