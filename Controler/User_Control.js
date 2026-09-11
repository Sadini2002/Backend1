const User_model = require("../Model/User_model");

// Get all users
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User_model.find();
    return res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Add new user
const addUsers = async (req, res, next) => {
  const { name, email, age } = req.body;
  try {
    const user = new User_model({ name, email, age });
    await user.save();
    return res.status(201).json({ user });
  } catch (err) {
    console.error("Error adding user:", err);
    return res.status(500).json({ message: "Unable to add user", error: err.message });
  }
};

// Get user by ID
const getById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await User_model.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (err) {
    console.error("Error fetching user by ID:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Update user details
const updateUser = async (req, res, next) => {
  const id = req.params.id;
  const { name, email, age } = req.body;

  try {
    const user = await User_model.findByIdAndUpdate(
      id,
      { name, email, age },
      { new: true, runValidators: true }
    );
    if (!user) {
      return res.status(404).json({ message: "Unable to update user details. User not found." });
    }
    return res.status(200).json({ user });
  } catch (err) {
    console.error("Error updating user:", err);
    return res.status(500).json({ message: "Error updating user", error: err.message });
  }
};

// Delete user
const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await User_model.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "Unable to delete user. User not found." });
    }
    return res.status(200).json({ message: "User deleted successfully", user });
  } catch (err) {
    console.error("Error deleting user:", err);
    return res.status(500).json({ message: "Error deleting user", error: err.message });
  }
};

exports.getAllUsers = getAllUsers;
exports.addUser = addUsers;
exports.getById = getById;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
