const { PaidSubscription } = require("../models/paidSubscription");
const { Subscription } = require("../models/subscription");
require('dotenv/config')
const Paystack = require("./utils");

// Subscribe to subscription
const subscribe = async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.subscriptionId);
    const userPaidSubscriptions = await PaidSubscription.countDocuments({
      user: req.user.id,
    });
    const isFirstSubscription = userPaidSubscriptions <= 0;

    // Check if user has active subscription
    if (!isFirstSubscription) {
      const currentSubscription = await PaidSubscription.findOne({
        user: req.user.id,
        isActive: true,
      });

      if (currentSubscription) {
        return res.status(409).json({
          success: false,
          error: "You have an active subscription",
        });
      }
    }
    const expiryDate = new Date();
    const paidSub = await new PaidSubscription({
      subscription: subscription.id,
      user: req.user.id,
      expiryDate: expiryDate.setDate(
        expiryDate.getDate() + subscription.durationInDays
      ),
      isFirstSubscription: isFirstSubscription,
    });

    if (!paidSub) {
      return res.status(401).json({
        success: false,
        error: "paid subscription could not be created",
      });
    }

    var amount = subscription.price;

    if (isFirstSubscription) {
      amount = amount + amount * subscription.firstTimeUserDiscount;
    }
    paidSub.save();
    const paymentParams = {
      email: req.user.email,
      amount: parseInt(amount),
      reference: paidSub.id,
      callback_url: process.env.PAYSTACK_CALLBACK
    };
    const paystack = new Paystack();
    const paymentResponse = await paystack.initialize(paymentParams);
    return res.status(201).send(paymentResponse);
  } catch (error) {
    console.error("Error creating paid subscription:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

const deleteSubscription = async (req, res) => {
  try {
    await PaidSubscription.findByIdAndDelete(req.params.paidSubId);
    return res.status(204).send("");
  } catch (error) {
    console.error("Error cancelling subscription:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

const listPaidSubscriptions = async (req, res) => {
  try {
    var paidSubs
    if (req.user.isAdmin) {
      paidSubs = await PaidSubscription.find();
    } else {
      paidSubs = await PaidSubscription.find({ user: req.user.id });
    }
    return res.status(200).send(paidSubs);
  } catch (error) {
    console.error("Error fetching subscription:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};
module.exports = {
  subscribe,
  deleteSubscription,
  listPaidSubscriptions,
};
