import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/database.js";
import authRoutes from "./routes/AuthRoutes.js";
import otpRoutes from "./routes/OtpRoutes.js";
import influencerRoutes from "./routes/InfluencerRoutes.js";
import cityRoutes from "./routes/CityRoutes.js"
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/auth", otpRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/influencers", influencerRoutes);
app.use("/api/cities", cityRoutes);


const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully");

    // ✅ This will create City table automatically
    await sequelize.sync({ alter: true });
      console.log("Tables Scanned ...!");
      
    app.listen(process.env.PORT || 5000, () => {
      console.log(
        `Server running on http://localhost:${process.env.PORT || 5000}`,
      );
    });
  } catch (error) {
    console.error("DB Error:", error);
  }
};

startServer();
