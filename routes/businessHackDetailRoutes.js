import express from "express";
import {
  createBusinessHackDetail,
  getAllBusinessHackDetails,
  getBusinessHackDetailById,
  updateBusinessHackDetail,
  deleteBusinessHackDetail,
} from "../controller/businessHackDetailController.js";

const router = express.Router();

router.post("/create", createBusinessHackDetail);
router.get("/", getAllBusinessHackDetails);
router.get("/:id", getBusinessHackDetailById);
router.put("/:id", updateBusinessHackDetail);
router.delete("/:id", deleteBusinessHackDetail);

export default router;
