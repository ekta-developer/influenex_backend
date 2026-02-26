import express from "express";
import { upload } from "../middlewares/upload.js";
import {
  createBrand,
  getAllBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
} from "../controllers/brandController.js";

const router = express.Router();

router.post("/", upload.single("logo"), createBrand);
router.put("/:id", upload.single("logo"), updateBrand);

router.get("/", getAllBrands);
router.get("/:id", getBrandById);
router.delete("/:id", deleteBrand);

export default router;