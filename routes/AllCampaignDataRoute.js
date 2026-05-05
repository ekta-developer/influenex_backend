import express from "express";
import { verifyToken } from "../middleware/AuthMiddleware.js";
import {
  getAllBusinessHackData,
  getBusinessUserCampaigns,
} from "../controller/AllCampaignData.js";

const router = express.Router();
// ✅ New API - fetch ALL campaigns (admin/influencer)
router.get("/get-all-business-hacks", verifyToken, getAllBusinessHackData);

// ✅ New API - fetch only logged-in user's campaigns
router.get("/get-my-business-hacks", verifyToken, getBusinessUserCampaigns);

export default router;
