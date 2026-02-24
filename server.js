import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/database.js";
import authRoutes from "./routes/AuthRoutes.js";
import otpRoutes from "./routes/OtpRoutes.js";
import influencerRoutes from "./routes/InfluencerRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/api/auth", otpRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/influencers", influencerRoutes);
app.use("/uploads", express.static("uploads"));
//here alter true is used to make valid changes in the database
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database connected");
    app.listen(process.env.PORT, () => {
      console.log(`Server running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => console.log("DB Error:", err));
