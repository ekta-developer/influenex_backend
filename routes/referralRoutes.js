import express from "express";
import {
  createReferral,
  getAllReferrals,
  getReferralById,
  updateReferral,
  deleteReferral,
} from "../controller/referralController.js";

const router = express.Router();

router.post("/create", createReferral);

router.get("/all", getAllReferrals);

router.get("/:id", getReferralById);

router.put("/update/:id", updateReferral);

router.delete("/delete/:id", deleteReferral);

export default router;