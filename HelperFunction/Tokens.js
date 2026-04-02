import jwt from "jsonwebtoken";

export const generateAccessToken = (payload) => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    console.error("❌ JWT_SECRET is missing");
    throw new Error("Server misconfiguration: JWT_SECRET not set");
  }

  return jwt.sign(payload, secret, {
    expiresIn: "1d", // adjust if needed
  });
};

export const generateRefreshToken = (payload) => {
  const refreshSecret = process.env.JWT_REFRESH_SECRET;

  if (!refreshSecret) {
    console.error("❌ JWT_REFRESH_SECRET is missing");
    throw new Error("Server misconfiguration: JWT_REFRESH_SECRET not set");
  }

  return jwt.sign(payload, refreshSecret, {
    expiresIn: "7d",
  });
};