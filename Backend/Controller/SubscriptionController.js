const webpush = require("web-push");

const Subscription = require("../Model/SubscribedUserSchema");

const { PRIVATE_KEY, PUBLIC_KEY } = process.env;

if (PRIVATE_KEY && PUBLIC_KEY) {
  webpush.setVapidDetails(
    "mailto:youremail@example.com",
    PUBLIC_KEY,
    PRIVATE_KEY
  );
}

exports.saveSubscription = async (req, res) => {
  const { userId, subscription } = req.body;

  if (!userId || !subscription || !subscription.endpoint) {
    return res.status(400).json({ message: "Invalid subscription data" });
  }

  try {
    const existing = await Subscription.findOne({
      endpoint: subscription.endpoint,
    });
    if (!existing) {
      await Subscription.create({
        user: userId,
        endpoint: subscription.endpoint,
        keys: subscription.keys,
      });
      return res.status(201).json({ message: "Subscription saved" });
    }
    return res.status(400).json({ message: "Already subscribed" });
  } catch (err) {
    console.error("Subscription save error:", err);
    res.status(500).json({ message: "Subscription error" });
  }
};

