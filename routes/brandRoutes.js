import express from "express";
import {
  createBrand,
  getAllBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
  uploadLogo,
} from "../controller/BrandController.js";

const router = express.Router();

router.post("/", uploadLogo, createBrand);
router.get("/", getAllBrands);
router.get("/:id", getBrandById);
router.put("/:id", uploadLogo, updateBrand);
router.delete("/:id", deleteBrand);

export default router;
