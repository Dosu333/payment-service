const cardController = require("../controllers/card");
const isAuthenticated = require("../middleware/IsAuthenticated");
const express = require("express");
const router = express.Router();

router.get('/', isAuthenticated, cardController.createCard)

module.exports = router;
