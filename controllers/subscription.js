const { Subscription } = require("../models/subscription");

// List subscriptions
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

// Admin create subscriptions
const createSubscription = async (req, res) => {
  try {
    // Check if the name already exists
    const existingSubscription = await Subscription.findOne({
      name: req.body.name,
    });
    if (existingSubscription) {
      return res.status(409).json({
        success: false,
        error: "Subscription already exists",
      });
    }
    let subscription = await new Subscription({
      name: req.body.name,
      price: req.body.price,
      durationInDays: req.body.durationInDays,
      firstTimeUserDiscount: req.body.firstTimeUserDiscount,
    });

    if (!subscription) {
      return res.status(401).json({
        success: false,
        error: "subscription could not be created",
      });
    }
    subscription.save();
    return res.status(201).send(subscription);
  } catch (error) {
    console.error("Error creating subscription:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

// Admin delete subscription
const deleteSubscription = async (req, res) => {
    try {
      await Subscription.findByIdAndDelete(req.params.id);
      return res.status(204).send("");
    } catch (error) {
      console.error("Error deleting subscription:", error);
      res.status(500).json({
        success: false,
        error: "Internal Server Error",
      });
    }
  };

module.exports = {
  listSubscriptions,
  createSubscription,
  deleteSubscription
};
