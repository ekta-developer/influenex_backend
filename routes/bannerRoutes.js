import express from "express";

import {
  createBanner,
  getAllBanners,
  getBannerById,
  updateBanner,
  deleteBanner,
  uploadBanner
} from "../controller/bannerController.js";

const router = express.Router();

router.post("/create", uploadBanner, createBanner);

router.get("/", getAllBanners);

router.get("/:id", getBannerById);

router.put("/update/:id", uploadBanner, updateBanner);

router.delete("/delete/:id", deleteBanner);

export default router;