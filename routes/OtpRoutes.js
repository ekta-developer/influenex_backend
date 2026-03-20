import express from "express";
import { sendOtp, verifyOtp, logout } from "../controller/OtpController.js";
import { verifyToken } from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/logout", verifyToken, logout);

export default router;