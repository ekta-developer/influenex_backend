import jwt from "jsonwebtoken";

export const generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1d", // 🔥 increased from 15m
  });
};

export const generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_SECRET, {
    expiresIn: "30d", // 🔥 increased from 7d
  });
};
