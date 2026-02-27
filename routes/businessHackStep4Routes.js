import express from "express";
import {
  createBusinessHackStep4,
  getAllBusinessHackStep4,
  updateBusinessHackStep4,
  deleteBusinessHackStep4,
  uploadMedia,
} from "../controller/businessHackStep4Controller.js";

const router = express.Router();

router.post("/create", uploadMedia, createBusinessHackStep4);
router.get("/", getAllBusinessHackStep4);
router.put("/:id", uploadMedia, updateBusinessHackStep4);
router.delete("/:id", deleteBusinessHackStep4);

export default router;