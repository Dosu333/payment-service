const userController = require("../controllers/user");
const express = require("express");
const isAuthenticated = require("../middleware/IsAuthenticated");
const isAdmin = require("../middleware/isAdmin");
const router = express.Router();

router.get("/", isAuthenticated, isAdmin, userController.listUsers); // List all users
router.post('/', userController.createUser); // Create user

module.exports = router;
