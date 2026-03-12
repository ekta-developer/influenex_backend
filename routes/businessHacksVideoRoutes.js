import express from "express";
import {
  createBusinessHack,
  getAllBusinessHacks,
  getBusinessHackById,
  updateBusinessHack,
  deleteBusinessHack,
} from "../controller/businessHacksVideoController.js";

const router = express.Router();

router.post("/create", createBusinessHack);

router.get("/all", getAllBusinessHacks);

router.get("/:id", getBusinessHackById);

router.put("/update/:id", updateBusinessHack);

router.delete("/delete/:id", deleteBusinessHack);

export default router;