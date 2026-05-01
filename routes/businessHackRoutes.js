import express from "express";

import {
  createBusinessHack,
  getAllBusinessHacks,
  getBusinessHackById,
  updateBusinessHack,
  deleteBusinessHack,
} from "../controller/businessHacksVideoController.js";

import { verifyToken } from "../middleware/AuthMiddleware.js";

import { uploadBusinessHack } from "../middleware/uploadBusinessHacksMedia.js";

const router = express.Router();

router.post(
  "/create",
  verifyToken,
  uploadBusinessHack.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  createBusinessHack
);

router.get("/", verifyToken, getAllBusinessHacks);

router.get("/:id", verifyToken, getBusinessHackById);

router.put(
  "/:id",
  verifyToken,
  uploadBusinessHack.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  updateBusinessHack
);

router.delete("/:id", verifyToken, deleteBusinessHack);

export default router;