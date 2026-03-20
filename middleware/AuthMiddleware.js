import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "yourSecretKey";

export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = decoded;

    next();

  } catch (error) {
    console.log("JWT ERROR:", error.message);

    // ✅ Clean error handling
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired",
        tokenExpired: true, // 👈 IMPORTANT
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};