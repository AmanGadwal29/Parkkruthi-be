const { model, Schema } = require("mongoose");

const subscriptionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  endpoint: { type: String, required: true },
  keys: {
    p256dh: { type: String, required: true },
    auth: { type: String, required: true },
  },
});

module.exports = model("Subscription", subscriptionSchema, "Subscription");
