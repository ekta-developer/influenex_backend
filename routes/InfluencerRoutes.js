import express from "express";
import {
  createInfluencer,
  getAllInfluencers,
  getInfluencerById,
  updateInfluencer,
  deleteInfluencer,
} from "../controller/InfluencerControllers.js";
import {upload} from "../middleware/upload.js"
const router = express.Router();

router.post("/create", upload.single("profilePhoto"), createInfluencer);
router.get("/", getAllInfluencers);
router.get("/:id", getInfluencerById);
router.put("/:id", updateInfluencer);
router.delete("/:id", deleteInfluencer);

export default router;