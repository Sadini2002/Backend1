import User_model from "../Model/User_model.js";

// Get all users

export default async function getAllUsers(req, res) {
  try {
    const users = await User_model.find();

    return res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

// Add new user
export default async function addUser(req, res) {
  const { name, email, age } = req.body;

  try {
    const user = new User_model({
      name,
      email,
      age,
    });

    await user.save();

    return res.status(201).json({ user });
  } catch (error) {
    console.error("Error adding user:", error);

    return res.status(500).json({
      message: "Unable to add user",
      error: error.message,
    });
  }
};

// Get user by ID
export default async function getById(req, res) {
  const id = req.params.id;

  try {
    const user = await User_model.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user by ID:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// Update user details
export default async function updateUser(req, res) {
  const id = req.params.id;

  const { name, email, age } = req.body;

  try {
    const user = await User_model.findByIdAndUpdate(
      id,
      {
        name,
        email,
        age,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!user) {
      return res.status(404).json({
        message: "Unable to update user details. User not found.",
      });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error updating user:", error);

    return res.status(500).json({
      message: "Error updating user",
      error: error.message,
    });
  }
};

// Delete user
export default async function deleteUser(req, res) {
  const id = req.params.id;

  try {
    const user = await User_model.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({
        message: "Unable to delete user. User not found.",
      });
    }

    return res.status(200).json({
      message: "User deleted successfully",
      user,
    });
  } catch (error) {
    console.error("Error deleting user:", error);

    return res.status(500).json({
      message: "Error deleting user",
      error: error.message,
    });
  }
};

