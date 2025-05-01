const { Schema, model }  = require("mongoose");

const baseSchemaFields = {
  Image: { type: String },
  Title: { type: String },
  Description: { type: String },
  Price: { type: Number },
  Stocks: { type: Number },
  Category: { type: String },
};

const modelCache = {};

const getModel = (category) => {
  const modelName = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();

  if (modelCache[modelName]) return modelCache[modelName];

  const schema = new Schema(baseSchemaFields);
  const ProductModel = model(modelName, schema, modelName);
  modelCache[modelName] = ProductModel;

  return ProductModel;
};

module.exports = getModel;
