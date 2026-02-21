import Otp from "../models/Otp.js";

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
      return res.status(400).json({ message: "Phone number is required" });
    }

    const otpCode = generateOTP();

    const expiryTime = new Date();
    expiryTime.setMinutes(expiryTime.getMinutes() + 5); // 5 min expiry

    // Delete previous OTP for this phone
    await Otp.destroy({ where: { phone } });

    // Save new OTP
    await Otp.create({
      phone,
      otp_code: otpCode,
      expires_at: expiryTime,
    });

    console.log("Generated OTP:", otpCode); // 🔥 Replace with SMS service later

    res.json({
      message: "OTP sent successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to send OTP",
      error: error.message,
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
        message: "Phone and OTP are required",
      });
    }

    const record = await Otp.findOne({ where: { phone } });

    if (!record) {
      return res.status(400).json({
        message: "OTP not found",
      });
    }

    // Check expiry
    if (new Date() > record.expires_at) {
      return res.status(400).json({
        message: "OTP expired",
      });
    }

    // Check match
    if (record.otp_code !== otp) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    // Mark as verified
    record.is_verified = true;
    await record.save();

    res.json({
      message: "OTP verified successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "OTP verification failed",
      error: error.message,
    });
  }
};