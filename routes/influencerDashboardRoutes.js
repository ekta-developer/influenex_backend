import express from "express";
import { getInfluencerDashboard } from "../controller/influencerDashboardController.js";

const router = express.Router();

router.post("/influencer-dashboard-main", getInfluencerDashboard);

export default router;