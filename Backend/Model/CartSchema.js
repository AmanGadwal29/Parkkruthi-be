const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const cartSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
        // productType: {
        //   type: String,
        //   required: true,
        // },
        title: { type: String },
        quantity: {
          type: Number,
          default: 1,
        },
        price: { type: Number },
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("Cart", cartSchema, "Cart");
