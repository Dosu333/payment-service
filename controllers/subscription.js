const { Subscription } = require("../models/subscription");

const listSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find();
    return res.status(200).send(subscriptions);
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

module.exports = {
    listSubscriptions,
}
