import express from "express";
import { verifyToken } from "../middleware/AuthMiddleware.js";
import { getAllBusinessHackData } from "../controller/AllCampaignData.js";

const router = express.Router();

router.get("/get-all-business-hacks",verifyToken, getAllBusinessHackData);

export default router;