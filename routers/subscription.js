const subscriptionController = require("../controllers/subscription");
const express = require("express");
const isAuthenticated = require("../middleware/IsAuthenticated");
const isAdmin = require("../middleware/IsAdmin");
const router = express.Router();

router.get("/", subscriptionController.listSubscriptions); // List subscriptions
router.post(
  "/",
  isAuthenticated,
  isAdmin,
  subscriptionController.createSubscription
); // Create subscription
router.get(
  "/:id",
  isAuthenticated,
  isAdmin,
  subscriptionController.subscriptionDetail
); // Retrieve subscription
router.put(
  "/:id",
  isAuthenticated,
  isAdmin,
  subscriptionController.updateSubscription
); // Update subscription
router.delete(
  "/:id",
  isAuthenticated,
  isAdmin,
  subscriptionController.deleteSubscription
); // Delete subscription

module.exports = router;
