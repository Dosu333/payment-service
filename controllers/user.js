const { User } = require("../models/user");
const bcrypt = require("bcryptjs");

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
    const newUser = await User.findById(user.id).select("-password");
    return res.status(201).send(newUser);
  } catch (error) {
    console.error("Error creating users:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

// Retrieve user
const userDetail = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    return res.status(200).send(user);
  } catch (error) {
    console.error("Error fetching user:", error);
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
      isActive: req.body.isActive,
    });
    const user = await User.findById(req.params.id).select("-password");
    return res.status(200).send(user);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

// Regular update user
const updateUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      fullname: req.body.fullname,
      phone: req.body.phone,
    });
    const user = await User.findById(req.user.id).select("-password");
    return res.status(200).send(user);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

// Admin delete user
const adminDeleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    return res.status(204).send("");
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

module.exports = {
  listUsers,
  createUser,
  adminUpdateUser,
  updateUser,
  adminDeleteUser,
  userDetail
};
