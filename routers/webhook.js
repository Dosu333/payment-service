const webhookController = require("../controllers/webhook");
const express = require("express");
const router = express.Router();

router.post("/", webhookController.webhook);

module.exports = router;
