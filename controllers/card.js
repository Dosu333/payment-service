const { Card } = require("../models/card");
require("dotenv/config");
const Paystack = require("./utils");

// Create new card
const createCard = async (req, res) => {
    const userCard = await Card.findOne({ user: req.user.id })

    if (userCard) {
        return res.status(403).json({
            success: false,
            error: 'User already has a card. Delete or update current card'
        })
    }
  const paystack = new Paystack();
  const paymentParams = {
    email: req.user.email,
    amount: 100,
    metadata: {
        type: 'cardCreation'
    }
  };
  const paymentResponse = await paystack.initialize(paymentParams);
  return res.status(201).send(paymentResponse);
};

module.exports = {
    createCard,
}
