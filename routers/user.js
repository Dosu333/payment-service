const userController = require("../controllers/user");
const express = require("express");
const isAuthenticated = require("../middleware/IsAuthenticated");
const isAdmin = require("../middleware/IsAdmin");
const router = express.Router();

router.get("/", isAuthenticated, isAdmin, userController.listUsers); // List all users
router.post('/', userController.createUser); // Create user
router.put('/:id', isAuthenticated, isAdmin, userController.adminUpdateUser); // Admin update user
router.put('/', isAuthenticated, userController.updateUser) // Regular update user
router.delete('/:id', isAuthenticated, isAdmin, userController.adminDeleteUser) // Admin delete user
router.get('/:id', isAuthenticated, userController.userDetail) // Retrieve a user

module.exports = router;
