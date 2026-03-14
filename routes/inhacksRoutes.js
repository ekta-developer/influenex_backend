import express from "express";
import upload from "../middleware/uploadInhacks.js";

import {
  createInhack,
  getAllInhacks,
  getSingleInhack,
  updateInhack,
  deleteInhack,
} from "../controller/inhacksController.js";

const router = express.Router();

router.post(
  "/create",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  createInhack,
);

router.get("/list", getAllInhacks);
router.get("/:id", getSingleInhack);

router.put(
  "/update/:id",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  updateInhack,
);

router.delete("/delete/:id", deleteInhack);

export default router;
