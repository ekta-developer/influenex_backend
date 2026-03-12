import Otp from "../models/Otp.js";
import BusinessRegistration from "../models/Business.js";
import InfluencerUser from "../models/InfluencerUser.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "yourSecretKey";

/* =========================
   Generate Random 6 Digit OTP
========================= */
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

/* =========================
   SEND OTP
========================= */
export const sendOtp = async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(200).json({
        status: false,
        message: "Phone number is required",
      });
    }

    // Check phone in BOTH tables
    const business = await BusinessRegistration.findOne({
      where: { mobileNumber: phone },
    });

    const influencer = await InfluencerUser.findOne({
      where: { mobileNumber: phone },
    });

    if (!business && !influencer) {
      return res.status(200).json({
        status: false,
        message: "Mobile number is not registered",
      });
    }

    // Generate OTP
    const otp = generateOTP();

    const expiresAt = new Date(Date.now() + 60 * 1000);

    await Otp.create({
      phone,
      otp_code: otp,
      expires_at: expiresAt,
      is_verified: false,
    });

    return res.status(200).json({
      status: true,
      message: "OTP sent successfully",
      otp: otp, // remove in production
      expiresAt: expiresAt,
    });
  } catch (error) {
    return res.status(200).json({
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

    record.is_verified = true;
    await record.save();

    const token = jwt.sign(
      {
        phone,
        otpVerified: true,
      },
      JWT_SECRET,
      { expiresIn: "1m" },
    );

    res.json({
      status: true,
      message: "OTP verified successfully",
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message || "OTP verification failed",
    });
  }
};
