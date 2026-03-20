import express from "express";
import {
  createBusinessHackStep4,
  getAllBusinessHackStep4,
  updateBusinessHackStep4,
  deleteBusinessHackStep4,
} from "../controller/businessHackStep4Controller.js";
import uploadStep4 from "../middleware/uploadStep4.js";

const router = express.Router();

router.post("/create", uploadStep4, createBusinessHackStep4);
router.get("/", getAllBusinessHackStep4);
router.put("/:id", uploadStep4, updateBusinessHackStep4);
router.delete("/:id", deleteBusinessHackStep4);

export default router;