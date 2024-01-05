const { response } = require("express");
const { PaidSubscription } = require("../models/paidSubscription");

const webhook = async (req, res) => {
  try {
    const response = req.body;
    if (response.event == "charge.success") {
      const paidSub = await PaidSubscription.findByIdAndUpdate(
        response.data.reference,
        {
          isActive: true,
        }
      );
      return res.status(200);
    }
  } catch (error) {
    console.log("Error in webhook: ", error);
    return res.status(400);
  }
};

module.exports = {
  webhook,
};
