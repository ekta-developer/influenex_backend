import express from "express";
import {
  createInfluencer,
  getAllInfluencers,
  getInfluencerById,
  updateInfluencer,
  deleteInfluencer,
} from "../controller/InfluencerUserController.js";

const router = express.Router();

router.post("/user-create", createInfluencer);
router.get("/", getAllInfluencers);
router.get("/:id", getInfluencerById);
router.put("/:id", updateInfluencer);
router.delete("/:id", deleteInfluencer);

export default router;
