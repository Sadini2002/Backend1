import express from "express";

import {
  createUser,
  loginUser,
  loginWithGoogle,
  sendOTP,
  verifyOTP,
  getAllUsers,
  deleteUser,
  getUserById,
  updateUser,
  getMyProfile,
  resetPassword
} from "../Controler/userController.js";

const router = express.Router();


// ===============================
// AUTH
// ===============================

router.post("/register", createUser);

router.post("/login", loginUser);

router.post("/google-login", loginWithGoogle);

router.post("/send-otp", sendOTP);

router.post("/verify-otp", verifyOTP);

router.post("/reset-password", resetPassword);




router.get("/", getAllUsers);

router.get("/profile", getMyProfile);

router.get("/:id", getUserById);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);


export default router;