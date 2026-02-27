import express from "express";
import {
  createBusinessHackStep3,
  getAllBusinessHackStep3,
  getBusinessHackStep3ById,
  updateBusinessHackStep3,
  deleteBusinessHackStep3,
} from "../controller/businessHackDetail2Controller.js";

const router = express.Router();

router.post("/create", createBusinessHackStep3);
router.get("/", getAllBusinessHackStep3);
router.get("/:id", getBusinessHackStep3ById);
router.put("/:id", updateBusinessHackStep3);
router.delete("/:id", deleteBusinessHackStep3);

export default router;