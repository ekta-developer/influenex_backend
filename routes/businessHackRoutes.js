import express from "express";
import {
  createBusinessHack,
  getAllBusinessHacks,
  getBusinessHackById,
  updateBusinessHack,
  deleteBusinessHack,
} from "../controller/businessHackController.js";

const router = express.Router();

router.post("/", createBusinessHack);
router.get("/", getAllBusinessHacks);
router.get("/:id", getBusinessHackById);
router.put("/:id", updateBusinessHack);
router.delete("/:id", deleteBusinessHack);

export default router;