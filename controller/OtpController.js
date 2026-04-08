import Otp from "../models/Otp.js";
import BusinessRegistration from "../models/Business.js";
import InfluencerUser from "../models/InfluencerUser.js";
import User from "../models/User.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../HelperFunction/Tokens.js";
import { setAuthCookies } from "../utility/setCookies.js";
import jwt from "jsonwebtoken";

console.log("User model:", User);

/* =========================
   COMMON: FIND USER BY PHONE
========================= */
const findUserByPhone = async (phone) => {
  let user = await BusinessRegistration.findOne({
    where: { mobileNumber: phone },
  });

  if (user) return { user, userType: "business" };

  user = await InfluencerUser.findOne({
    where: { mobileNumber: phone },
  });

  if (user) return { user, userType: "influencer" };

  return { user: null, userType: null };
};

/* =========================
   Generate Random OTP
========================= */
const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

/* =========================
   SEND OTP
========================= */
export const sendOtp = async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({
        status: false,
        message: "Phone number is required",
      });
    }

    const { user } = await findUserByPhone(phone);

    if (!user) {
      return res.status(400).json({
        status: false,
        message: "Mobile number is not registered",
      });
    }

    // ✅ Delete old OTPs
    await Otp.destroy({ where: { phone } });

    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await Otp.create({
      phone,
      otp_code: otp,
      expires_at: expiresAt,
      is_verified: false,
    });

    return res.status(200).json({
      status: true,
      message: "OTP sent successfully",
      // ❌ remove in production
      otp,
      expiresAt,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message || "Failed to send OTP",
    });
  }
};

/* =========================
   VERIFY OTP
========================= */
export const verifyOtp = async (req, res) => {
  try {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
      return res.status(400).json({
        status: false,
        message: "Phone and OTP are required",
      });
    }

    const record = await Otp.findOne({
      where: { phone },
      order: [["id", "DESC"]],
    });

    if (!record) {
      return res.status(400).json({ status: false, message: "OTP not found" });
    }

    if (new Date() > record.expires_at) {
      return res.status(400).json({ status: false, message: "OTP expired" });
    }

    if (String(record.otp_code) !== String(otp)) {
      return res.status(400).json({ status: false, message: "Invalid OTP" });
    }

    await record.destroy();

    // 🔍 Find user
    const { user, userType } = await findUserByPhone(phone);

    if (!user) {
      return res.status(400).json({ status: false, message: "User not found" });
    }

    // ====================================================
    // ✅ CREATE / UPDATE USER TABLE FIRST
    // ====================================================
    let existingUser = await User.findOne({ where: { phone } });

    let dbUser;

    if (!existingUser) {
      dbUser = await User.create({
        name: user.fullName || "User",
        email: user.email || `${phone}@temp.com`,
        phone,
        password_hash: "default_hashed_password_123456",
        role: userType === "business" ? "brand" : "influencer",
        status: "approved",
      });

      console.log("✅ User created:", dbUser.id);
    } else {
      dbUser = existingUser;
    }

    // ====================================================
    // 🎟️ TOKENS USING USER TABLE ID (IMPORTANT)
    // ====================================================
    const payload = {
      userId: dbUser.id, // ✅ FIXED (INTEGER)
      phone,
      userType,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    // ✅ SAVE TOKENS IN USER TABLE
    await dbUser.update({
      access_token: accessToken,
      refresh_token: refreshToken,
    });

    return res.json({
      success: true,
      message: "Login successful",
      accessToken,
      refreshToken,
      user: {
        id: dbUser.id, // ✅ always from Users table
        type: userType,
      },
    });
  } catch (error) {
    console.log("VERIFY OTP ERROR:", error);

    return res.status(500).json({
      status: false,
      message: error.message || "OTP verification failed",
    });
  }
};

//logout and refresh token functions are added here for better cohesion with OTP login/logout flow

export const logout = async (req, res) => {
  try {
    const { userId, userType } = req.user;

    let user;

    if (userType === "business") {
      user = await BusinessRegistration.findByPk(userId);
    } else {
      user = await InfluencerUser.findByPk(userId);
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ❌ Remove refresh token from DB
    await user.update({
      access_token: accessToken,
      refresh_token: refreshToken,
    });
    // 🍪 CLEAR COOKIES
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    return res.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================
   REFRESH TOKEN API
========================= */
export const refreshAccessToken = async (req, res) => {
  try {
    const token =
      req.body.refreshToken ||
      req.headers["x-refresh-token"] ||
      req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Refresh token is required",
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    } catch (err) {
      return res.status(403).json({
        success: false,
        message: "Invalid or expired refresh token",
      });
    }

    const user = await User.findByPk(decoded.userId); // ✅ INTEGER

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.refresh_token !== token) {
      return res.status(403).json({
        success: false,
        message: "Refresh token mismatch",
      });
    }

    const newAccessToken = generateAccessToken({
      userId: user.id,
      phone: decoded.phone,
      userType: decoded.userType,
    });

    await user.update({
      access_token: newAccessToken,
    });

    return res.json({
      success: true,
      accessToken: newAccessToken,
    });
  } catch (error) {
    console.log("REFRESH TOKEN ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to refresh token",
    });
  }
};
