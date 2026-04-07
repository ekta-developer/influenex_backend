import Otp from "../models/Otp.js";
import BusinessRegistration from "../models/Business.js";
import InfluencerUser from "../models/InfluencerUser.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../HelperFunction/Tokens.js";
import { setAuthCookies } from "../utility/setCookies.js";

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
      return res.status(400).json({
        status: false,
        message: "OTP not found",
      });
    }

    if (record.is_verified) {
      return res.status(400).json({
        status: false,
        message: "OTP already used",
      });
    }

    if (new Date() > record.expires_at) {
      return res.status(400).json({
        status: false,
        message: "OTP expired",
      });
    }

    if (String(record.otp_code) !== String(otp)) {
      return res.status(400).json({
        status: false,
        message: "Invalid OTP",
      });
    }

    // ✅ mark verified & delete
    await record.destroy();

    const { user, userType } = await findUserByPhone(phone);

    if (!user) {
      return res.status(400).json({
        status: false,
        message: "User not found",
      });
    }

    const payload = {
      phone,
      userId: user.id,
      uuid: user.uuid,
      userType,
    };

    // 🔁 Reuse refreshToken if exists
    let refreshToken = user.refreshToken;

    if (!refreshToken) {
      refreshToken = generateRefreshToken(payload);
      await user.update({
        access_token: accessToken,
        refresh_token: refreshToken,
      });
    }

    const accessToken = generateAccessToken(payload);

    // 🍪 Set cookies
    setAuthCookies(res, accessToken, refreshToken);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      accessToken: accessToken, // 🔥 added
      refreshToken: refreshToken, // 🔥 added
      user: {
        id: user.id.toString(),
        uuid: user.uuid,
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
    // 🔥 Get refresh token from body OR header
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

    // 🔍 Verify refresh token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.REFRESH_SECRET);
    } catch (err) {
      return res.status(403).json({
        success: false,
        message: "Invalid or expired refresh token",
      });
    }

    const { userId, userType } = decoded;

    // 🔎 Find user
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

    // 🔐 Match refresh token with DB (VERY IMPORTANT)
    if (user.refreshToken !== token) {
      return res.status(403).json({
        success: false,
        message: "Refresh token mismatch",
      });
    }

    // 🎟️ Generate new access token
    const newAccessToken = generateAccessToken({
      userId: user.id,
      phone: decoded.phone,
      uuid: user.uuid,
      userType,
    });

    // ✅ (Optional) Rotate refresh token
    // const newRefreshToken = generateRefreshToken(decoded);
    await user.update({
      access_token: newAccessToken,
    });
    return res.status(200).json({
      success: true,
      message: "Access token refreshed",
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
