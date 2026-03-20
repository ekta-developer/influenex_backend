import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controller/productController.js";

import upload from "../middleware/productUpload.js";
import { verifyToken } from "../middleware/AuthMiddleware.js";

const router = express.Router();
router.post("/", upload.single("image"),verifyToken, createProduct);
router.get("/",verifyToken, getAllProducts);
router.get("/:id",verifyToken, getProductById);
router.put("/:id",verifyToken, upload.single("image"), updateProduct);
router.delete("/:id",verifyToken, deleteProduct);

export default router;
