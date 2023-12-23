const webhookController = require("../controllers/webhook");
const express = require("express");
const router = express.Router();

router.get("/", webhookController.webhook);

module.exports = router;
