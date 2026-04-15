import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import path from "path";
import sequelize from "./config/database.js";
import cookieParser from "cookie-parser";
// ❌ REMOVE bodyParser (not needed)
// import bodyParser from "body-parser";

dotenv.config();

const app = express();

app.use(cookieParser());

/* ================== 🔒 SECURITY ================== */

// ✅ Helmet
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

/* ================== 🔥 RATE LIMIT FIX ================== */

// ⚠️ This can BLOCK Flutter testing → increase limit
const authLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 50, // 🔥 increased from 5 → prevents blocking
  message: "Too many attempts, try again later",
});
app.use("/api/auth", authLimiter);

/* ================== 🪵 DEBUG ================== */

app.use((req, res, next) => {
  console.log("👉 Incoming:", req.method, req.url);
  next();
});

/* ================== 🔥 CORS FIX ================== */

// ❌ OLD (too restrictive)
// origin: process.env.FRONTEND_URL || "http://localhost:3000"

// ✅ NEW (Flutter + Web safe)
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);

/* ================== 🔥 BODY LIMIT FIX ================== */

// increase limit (Flutter images/json may fail on 10kb)
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

/* ================== 📁 STATIC ================== */

app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads"), {
    maxAge: "1d",
    dotfiles: "deny",
  })
);

/* ================== TEST ROUTE ================== */

app.get("/", (req, res) => {
  res.send("InfluenceX Backend Running 🚀");
});

/* ================== 🌐 ROUTES ================== */

// (NO CHANGE HERE — your routes are fine)
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

/* ================== ❌ ERROR HANDLER ================== */

app.use((err, req, res, next) => {
  console.error("❌ Error:", err.stack);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

/* ================== 🚀 SERVER START ================== */

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully");

    await sequelize.sync({ alter: false });
    console.log("✅ Tables synced");

    await seedCampaignTypes();

    const PORT = process.env.PORT || 5000;

    // 🔥 MOST IMPORTANT FIX (EC2 ISSUE)
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
    });

  } catch (error) {
    console.error("❌ DB Error:", error.message);
  }
};

startServer();

/* ================== 🔻 SHUTDOWN ================== */

const shutdown = async (signal) => {
  console.log(`⚠️ Received ${signal}`);

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

process.on("SIGUSR2", async () => {
  console.log("🔄 Nodemon restart...");
  await sequelize.close();
  process.kill(process.pid, "SIGUSR2");
});