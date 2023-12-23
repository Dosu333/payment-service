const paidSubscriptionController = require("../controllers/paidSubscription");
const express = require("express");
const isAuthenticated = require("../middleware/IsAuthenticated");
const isAdmin = require("../middleware/IsAdmin");
const router = express.Router();

router.get(
  "/",
  isAuthenticated,
  paidSubscriptionController.listPaidSubscriptions
);
router.get(
  "/:subscriptionId",
  isAuthenticated,
  paidSubscriptionController.subscribe
);
router.delete(
  "/:paidSubId",
  isAuthenticated,
  isAdmin,
  paidSubscriptionController.deleteSubscription
);

module.exports = router;
