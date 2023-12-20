const authController = require("../controllers/auth");
const express = require("express");
const router = express.Router();

router.post('/login', authController.userLogin)
router.post('/refresh', authController.getNewAccessToken)

module.exports = router;
