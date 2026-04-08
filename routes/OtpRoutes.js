import express from "express";
import {
  sendOtp,
  verifyOtp,
  logout,
  refreshAccessToken,
} from "../controller/OtpController.js";
import { verifyToken } from "../middleware/AuthMiddleware.js";

const router = express.Router();

// 🔐 Auth routes
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);

// 🔄 Refresh token route (NO verifyToken here)
router.post("/refresh-token", refreshAccessToken);

// 🚪 Logout (protected)
router.post("/logout", verifyToken, logout);

export default router;
