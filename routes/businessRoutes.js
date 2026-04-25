import express from "express";
import {
  createBusiness,
  getAllBusinesses,
  getBusinessByUUID,
  updateBusiness,
  deleteBusiness,
} from "../controller/businessController.js";
import { verifyToken } from "../middleware/AuthMiddleware.js";
const router = express.Router();

router.post("/register", createBusiness);
router.get("/", verifyToken, getAllBusinesses);
router.get("/:id", verifyToken, getBusinessByUUID);
router.put("/:id", verifyToken, updateBusiness);
router.delete("/:id", verifyToken, deleteBusiness);

export default router;
