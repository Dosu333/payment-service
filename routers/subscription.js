const subscriptionController = require("../controllers/subscription");
const express = require("express");
const isAuthenticated = require("../middleware/IsAuthenticated");
const isAdmin = require("../middleware/isAdmin");
const router = express.Router();

router.get('/', subscriptionController.listSubscriptions)

module.exports = router