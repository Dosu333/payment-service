const { PaidSubscription } = require("../models/paidSubscription");
const { Card } = require("../models/card");

const webhook = async (req, res) => {
  try {
    const response = req.body;
    console.log(response);
    if (response.event == "charge.success") {
      if (response.data.metadata.type == "subscriptionPayment") {
        const paidSub = await PaidSubscription.findByIdAndUpdate(
          response.data.reference,
          {
            isActive: true,
            isPaid: true,
          }
        );
      } else if (response.data.metadata.type == "cardCreation") {
        const authData = response.data.authorization;
        const newCard = await new Card({
          authCode: authData.authorization_code,
          bin: authData.bin,
          last4: authData.last4,
          expMonth: authData.exp_month,
          expYear: authData.exp_year,
          channel: authData.channel,
          cardType: authData.card_type,
          bank: authData.bank,
          countryCode: authData.country_code,
          reusable: authData.reusable,
          signature: authData.signature,
          accountName: authData.account_name,
        });
        newCard.save();
      }
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
