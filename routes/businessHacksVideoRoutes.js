import express from "express";
import {
  createBusinessHack,
  updateBusinessHack,
  getAllBusinessHacks,
  getBusinessHackById,
  deleteBusinessHack,
} from "../controller/businessHacksVideoController.js";

import { uploadBusinessHack } from "../middleware/uploadBusinessHacksMedia.js";

const router = express.Router();

router.post(
  "/create",
  uploadBusinessHack.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  createBusinessHack,
);

router.put(
  "/update/:id",
  uploadBusinessHack.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  updateBusinessHack,
);

router.get("/videos", getAllBusinessHacks);

router.get("/video/:id", getBusinessHackById);

router.delete("/video/:id", deleteBusinessHack);

export default router;
