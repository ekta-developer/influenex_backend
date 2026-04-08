import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import path from "path";
import sequelize from "./config/database.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
dotenv.config();

// ROUTES
import authRoutes from "./routes/AuthRoutes.js";
import otpRoutes from "./routes/OtpRoutes.js";
import influencerRoutes from "./routes/InfluencerRoutes.js";
import cityRoutes from "./routes/CityRoutes.js";
import businessTypeRoutes from "./routes/businessTypeRoutes.js";
import businessRoutes from "./routes/businessRoutes.js";
import campaignRoutes from "./routes/campaignRoutes.js";
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
import inhacksRoutes from "./routes/inhacksRoutes.js";
import businessHacksRoutes from "./routes/businessHacksVideoRoutes.js";
import referralRoutes from "./routes/referralRoutes.js";
import bannerRoutes from "./routes/bannerRoutes.js";
import influencerDashboardRoutes from "./routes/influencerDashboardRoutes.js";
import campaignDataRoutes from "./routes/getCampaignRoute.js";
import productRoutes from "./routes/productRoutes.js";
import allCampaignDataRoutes from "./routes/AllCampaignDataRoute.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import dealRoutes from "./routes/dealRoutes.js";

// SEEDERS
import { seedCampaignTypes } from "./seeders/seedCampaignTypes.js";

const app = express();

app.use(cookieParser());

/* ================== 🔒 SECURITY MIDDLEWARE ================== */

// ✅ 1. Helmet (ADVANCED CONFIG)
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  }),
);

// ✅ 2. Rate Limiting (GLOBAL)
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
//   standardHeaders: true,
//   legacyHeaders: false,
// });
// app.use("/api", limiter);

// 🔥 EXTRA: STRICT LIMIT FOR AUTH (OTP / LOGIN)
const authLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 5, // only 5 attempts
  message: "Too many attempts, try again later",
});
app.use("/api/auth", authLimiter);

//added log to check that the business-types hit or not
app.use((req, res, next) => {
  console.log("👉 Incoming:", req.method, req.url);
  next();
});

// ✅ 3. CORS (SECURE)
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

// ✅ 4. Body Limit
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// ❌ REMOVE THIS (duplicate parsing)
// app.use(bodyParser.json());

// ================== 📁 STATIC FILE SECURITY ==================

// ✅ Serve uploads safely (ONLY ONCE)
app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads"), {
    maxAge: "1d", // cache control
    dotfiles: "deny", // block hidden files
  }),
);

// app.use(bodyParser.json());

// ================== ROUTE TO Test Backend is running or not ==================

app.get("/", (req, res) => {
  res.send("InfluenceX Backend Running 🚀");
});

// ================== 🌐 ROUTES ==================
app.use("/api/auth", otpRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/influencers", influencerRoutes);
app.use("/api/cities", cityRoutes);
app.use("/api", businessTypeRoutes);
app.use("/api/business", businessRoutes);
app.use("/api/campaigns", campaignRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/campaigns-step1", businessHackRoutes);
app.use("/api/campaigns-details", businessHackDetailRoutes);
app.use("/api/campaigns-step3", businessHackStep3Routes);
app.use("/api/campaigns-step4", businessHackStep4Routes);
app.use("/api/influencers-user", influencerUserRoutes);
app.use("/api/categories", influencerCategoryRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/business-profile", BusinessRoutes);
app.use("/api/city", cityRoutesTwo);
app.use("/api", influencerListRoutes);
app.use("/api/inhacks", inhacksRoutes);
app.use("/api/business-hacks-video", businessHacksRoutes);
app.use("/api/referrals", referralRoutes);
app.use("/api/banners", bannerRoutes);
app.use("/api/influencer-dashboard", influencerDashboardRoutes);
app.use("/api/data", campaignDataRoutes);
app.use("/api/products", productRoutes);
app.use("/api/all-detail", allCampaignDataRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/deals", dealRoutes);

// ================== ❌ GLOBAL ERROR HANDLER ==================

app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

// ================== 🚀 SERVER START ==================

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully");

    await sequelize.sync({ alter: false }); // ⚠️ safer in production
    console.log("✅ Tables synced");

    await seedCampaignTypes();

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ DB Error:", error.message);
  }
};

startServer();
// ================== 🔻 GRACEFUL SHUTDOWN ==================

const shutdown = async (signal) => {
  console.log(`\n⚠️ Received ${signal}`);

  try {
    await sequelize.close();
    console.log("✅ DB connection closed");

    process.exit(0);
  } catch (err) {
    console.error("❌ Error closing DB:", err.message);
    process.exit(1);
  }
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

// 🔥 VERY IMPORTANT FOR NODEMON
process.on("SIGUSR2", async () => {
  console.log("🔄 Nodemon restart...");

  await sequelize.close();
  console.log("✅ DB closed before restart");
  process.kill(process.pid, "SIGUSR2");
});
