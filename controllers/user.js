const { User } = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { use } = require("../routers/user");

const listUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

// Create user
const createUser = async (req, res) => {
  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: "Email already exists",
      });
    }
    let user = await new User({
      fullname: req.body.fullname,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      lastLogin: new Date(),
      isAdmin: req.body.isAdmin || false,
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        error: "user could not be created",
      });
    }
    user.save();
    return res.status(201).send(user);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

// Admin update user
const adminUpdateUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, {
      fullname: req.body.fullname,
      phone: req.body.phone,
      isAdmin: req.body.isAdmin,
      isVerified: req.body.isVerified,
      isActive: req.body.isActive
    })
    const user = await User.findById(req.params.id).select('-password')
    return res.status(200).send(user)
  } catch(error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
}

module.exports = {
  listUsers,
  createUser,
  adminUpdateUser
};
