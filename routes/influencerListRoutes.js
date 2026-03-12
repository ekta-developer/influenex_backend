import express from "express";
import { getInfluencerDashboard } from "../controller/influencerListController.js";

const router = express.Router();

router.get("/influencer-dashboard", getInfluencerDashboard);

export default router;