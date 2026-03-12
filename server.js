import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/database.js";
import authRoutes from "./routes/AuthRoutes.js";
import otpRoutes from "./routes/OtpRoutes.js";
import influencerRoutes from "./routes/InfluencerRoutes.js";
import cityRoutes from "./routes/CityRoutes.js";
import BusinessType from "./models/BusinessTypes.js";
import businessTypeRoutes from "./routes/businessTypeRoutes.js";
import businessRoutes from "./routes/businessRoutes.js";
import CampaignType from "./models/CampaignType.js";
import { seedCampaignTypes } from "./seeders/seedCampaignTypes.js";
import campaignRoutes from "./routes/campaignRoutes.js";
import path from "path";
import brandRoutes from "./routes/brandRoutes.js";
import businessHackRoutes from "./routes/businessHackRoutes.js";
import businessHackDetailRoutes from "./routes/businessHackDetailRoutes.js";
import businessHackStep3Routes from "./routes/businessHackDetail2Routes.js";
import businessHackStep4Routes from "./routes/businessHackStep4Routes.js";
import influencerUserRoutes from "./routes/InfluencerUserRoutes.js";
import influencerCategoryRoutes from "./routes/InfluencerCategoryRoutes.js";
import profileRoutes from "./routes/ProfileRoutes.js";
import BusinessRoutes from "./routes/BusinessProfileRoutes.js";
import cityRoutesTwo from "./routes/CityRoutesTwo.js";
import influencerListRoutes from "./routes/influencerListRoutes.js";
import { seedInfluencerList } from "./seeders/influencerListSeeder.js";
import inhacksRoutes from "./routes/inhacksRoutes.js";
import businessHacksRoutes from "./routes/businessHacksVideoRoutes.js";
import referralRoutes from "./routes/referralRoutes.js";
import bannerRoutes from "./routes/bannerRoutes.js";
import influencerDashboardRoutes from "./routes/influencerDashboardRoutes.js";

dotenv.config();

const app = express(); // ✅ FIRST create app

// ================== MIDDLEWARES ==================
app.use(cors());
app.use(bodyParser.json());

// ✅ Serve uploads folder (ONLY ONCE)
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/uploads", express.static("uploads"));
// ================== ROUTES ==================
app.use("/api/auth", otpRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/influencers", influencerRoutes);
app.use("/api/cities", cityRoutes);
app.use("/api", businessTypeRoutes);
app.use("/api/business", businessRoutes);
app.use("/api/campaigns", campaignRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/business-hacks", businessHackRoutes);
app.use("/api/business-hack-details", businessHackDetailRoutes);
app.use("/api/business-hack-step3", businessHackStep3Routes);
app.use("/api/business-hack-step4", businessHackStep4Routes);
app.use("/uploads", express.static("uploads"));
app.use("/api/influencers", influencerUserRoutes);
app.use("/api/categories", influencerCategoryRoutes);
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/api/profiles", profileRoutes);
app.use("/api/business-profile", BusinessRoutes);
app.use('/api/city', cityRoutesTwo);
app.use("/api", influencerListRoutes);
app.use("/api/inhacks", inhacksRoutes);
app.use("/api/business-hacks-video", businessHacksRoutes);
app.use("/api/referrals", referralRoutes);
app.use("/api/banners", bannerRoutes);
app.use("/api/influencer-dashboard", influencerDashboardRoutes);
// ================== SERVER START ==================
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully");

    await sequelize.sync({ alter: true });
    console.log("Tables Scanned ...!");

    await seedCampaignTypes();
    console.log("Campaign Table data inserted successfully!");

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
